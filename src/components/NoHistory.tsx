import { ArrowRight } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { Button } from './ui/button'
import { loadDatabase, runFullValidation } from '@/lib/database-validator'
import { EXPECTED_STRUCTURE } from '@/lib/format'

const NoHistory = () => {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isValidating, setIsValidating] = useState(false)
  const navigate = useNavigate({ from: '/history' })
  const [_, setValidationStatus] = useState<'idle' | 'success' | 'error'>('idle')

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
    setIsValidating(true)
    setValidationStatus('idle')
    
    try {
      console.log('Loading database:', file.name)
      const loadedDb = await loadDatabase(file)
      
      if (!loadedDb) {
        setValidationStatus('error')
        alert('Failed to load database file')
        return
      }
      
      await runFullValidation(loadedDb)
      
      console.log('✅ Database validated successfully!')        
      const root = await navigator.storage.getDirectory()

      const dbFileHandle = await root.getFileHandle(`${EXPECTED_STRUCTURE.database}.sqlite3`, {
        create: true
      })

      const writable = await dbFileHandle.createWritable()

      await writable.write(await file.arrayBuffer())
      await writable.close()

      setValidationStatus('success')
      navigate({to: "/history"});     
    } catch (error) {
      console.error('Error processing file:', error)
      setValidationStatus('error')
      alert('An error occurred while processing the file')
    } finally {
      setIsValidating(false)
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
        {isValidating ? 'Processing...' : 'No conversions yet'}
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
        disabled={isValidating}
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
