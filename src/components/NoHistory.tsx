import { ArrowRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { SQLocal } from 'sqlocal'
import { Button } from './ui/button'
import { validateDatabase } from '@/lib/database-validator'
import { TARGET_DB_NAME } from '@/lib/format'

const NoHistory = () => {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileProcess, setFileProcess] = useState<boolean>(false)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.name.endsWith('.sqlite3')) {
      processFile(selectedFile)
    } else {
      alert('Please select a valid SQLite file (.sqlite or .db)')
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
    if (droppedFile.name.endsWith('.sqlite3')) {
      processFile(droppedFile)
    } else {
      alert('Please drop a valid SQLite file (.sqlite or .db)')
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const processFile = async (file: File) => {
    let tempDbInstance: SQLocal | null = null

    try {
      setFileProcess(true)

      const arrayBuffer = await file.arrayBuffer()
      const uint8Array = new Uint8Array(arrayBuffer)

      const tempDbName = `temp_${Date.now()}.sqlite`
      const opfs = await navigator.storage.getDirectory()

      const tempFileHandle = await opfs.getFileHandle(file.name, {
        create: true,
      })
      const writable = await tempFileHandle.createWritable()

      await writable.write(uint8Array)
      await writable.close()

      tempDbInstance = new SQLocal(tempDbName)
      const { sql: tempSql } = tempDbInstance

      try {
        await validateDatabase(tempSql)
      } catch (validationError: any) {
        try {
          await opfs.removeEntry(tempDbName)
        } catch (e) {
          alert(
            `Failed to clean up temp file: ${e instanceof Error ? e.message : 'Internal Server Error'}`,
          )
        }
      }

      if (tempDbInstance && typeof tempDbInstance.destroy === 'function') {
        await tempDbInstance.destroy()
      }

      await new Promise((resolve) => setTimeout(resolve, 100))

      await opfs.removeEntry(tempDbName)
      await opfs.removeEntry(TARGET_DB_NAME)
      await new Promise((resolve) => setTimeout(resolve, 100))

      const finalFileHandle = await opfs.getFileHandle(TARGET_DB_NAME, {
        create: true,
      })
      const finalWritable = await finalFileHandle.createWritable()
      await finalWritable.write(uint8Array)
      await finalWritable.close()

      await new Promise((resolve) => setTimeout(resolve, 100))
      alert(`✓ SQLite file successfully imported!`)
    } catch (error) {
    } finally {
      window.location.reload()
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
