import { ArrowRight } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { SQLocal } from 'sqlocal'
import { Button } from './ui/button'
import { validateDatabase } from '@/lib/database-validator'
import { TARGET_DB_NAME } from '@/lib/format'

const NoHistory = () => {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileProcess, setFileProcess] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.name.endsWith('.sqlite3')) {
      processFile(selectedFile)
    } else {
      alert('Please select a valid SQLite file (.sqlite3)')
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.name.endsWith('.sqlite3')) {
      processFile(droppedFile)
    } else {
      alert('Please drop a valid SQLite file (.sqlite3)')
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const processFile = async (file: File) => {
    let tempDbInstance: SQLocal | null = null
    const tempDbName = `temp_validation_${Date.now()}.sqlite`

    try {
      setFileProcess(true)
      setError(null)

      const arrayBuffer = await file.arrayBuffer()
      const uint8Array = new Uint8Array(arrayBuffer)

      const opfs = await navigator.storage.getDirectory()

      // Write temp file for validation
      const tempFileHandle = await opfs.getFileHandle(tempDbName, {
        create: true,
      })
      const tempWritable = await tempFileHandle.createWritable()
      await tempWritable.write(uint8Array)
      await tempWritable.close()

      await new Promise((resolve) => setTimeout(resolve, 100))

      // Validate the database
      tempDbInstance = new SQLocal(tempDbName)
      const { sql: tempSql } = tempDbInstance

      try {
        await validateDatabase(tempSql)
      } catch (validationError: any) {
        // Cleanup on validation failure
        if (tempDbInstance && typeof tempDbInstance.destroy === 'function') {
          await tempDbInstance.destroy()
        }
        await new Promise((resolve) => setTimeout(resolve, 100))
        try {
          await opfs.removeEntry(tempDbName)
        } catch (e) {
          console.error('Failed to clean up temp file:', e)
        }
        throw validationError
      }

      // Close temp database
      if (tempDbInstance && typeof tempDbInstance.destroy === 'function') {
        await tempDbInstance.destroy()
      }

      await new Promise((resolve) => setTimeout(resolve, 100))

      // Remove temp file
      try {
        await opfs.removeEntry(tempDbName)
      } catch (e) {
        console.warn('Could not remove temp file:', e)
      }

      // Remove old target database if exists
      try {
        await opfs.removeEntry(TARGET_DB_NAME)
      } catch (e) {
        // File doesn't exist, that's fine
      }

      await new Promise((resolve) => setTimeout(resolve, 100))

      // Write final database
      const finalFileHandle = await opfs.getFileHandle(TARGET_DB_NAME, {
        create: true,
      })
      const finalWritable = await finalFileHandle.createWritable()
      await finalWritable.write(uint8Array)
      await finalWritable.close()

      await new Promise((resolve) => setTimeout(resolve, 100))

      // Verify final database
      const finalDb = new SQLocal(TARGET_DB_NAME)
      const records = await finalDb.sql`SELECT COUNT(*) as count FROM image`

      console.log(`Database imported successfully with ${records[0].count} records`)
      
      alert(`✓ SQLite file successfully imported!\nRecords: ${records[0].count}`)

      // Navigate to history page instead of reloading
      navigate({ to: '/history' })
      
    } catch (error: any) {
      console.error('Error processing file:', error)
      setError(error.message || 'Failed to process SQLite file')
      alert(`❌ Error: ${error.message || 'Failed to process SQLite file'}`)
    } finally {
      setFileProcess(false)
    }
  }

  return (
    <div
      className={`p-12 text-center transition-colors ${isDragging ? 'bg-violet-50' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".sqlite,.db,.sqlite3"
        onChange={handleFileSelect}
        className="hidden"
      />

      <h3 className="text-lg font-semibold font-dm py-2 text-violet-soft">
        {fileProcess ? 'Processing...' : 'No conversions yet'}
      </h3>
      <p className="text-muted-foreground py-2 font-is">
        Start converting images to see your history here
      </p>
      <p className="text-sm font-is mb-6 text-muted-foreground">
        or drop the SQLite file{' '}
        <span onClick={handleClick} className="underline hover:cursor-pointer">
          here
        </span>
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 rounded border border-red-200 inline-block max-w-md">
          <p className="text-sm text-red-800">❌ {error}</p>
        </div>
      )}

      <Button
        className="
          bg-violet-soft text-white 
          hover:bg-violet-600 
          rounded-xl shadow-sm
          gap-2
          font-is
        "
        disabled={fileProcess}
      >
        <Link to="/" className="flex items-center gap-5">
          <ArrowRight className="w-4 h-4" />
          Start Converting
        </Link>
      </Button>
    </div>
  )
}

export default NoHistory