import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { EXPECTED_STRUCTURE, TOAST_DURATION } from '@/lib/format'
import { loadDatabase, runFullValidation } from '@/lib/database-validator'
import { useState, useRef } from 'react'

const NoHistory = () => {
  const [file, setFile] = useState<File | null>(null)
    const params = new URLSearchParams({
      page: '0',
      pageSize: '10',
      sort: 'timestamp',
      dir: 'desc',
      search: '',
    })
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [isDragging, setIsDragging] = useState<boolean>(false)
  
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0]
      if (selectedFile && selectedFile.name.endsWith('.sqlite3')) {
        setFile(selectedFile)
        processFile(selectedFile)
      } else {
        toast.warning('Error processing file', {
          description: `Please drop a valid SQLite file`,
          duration: TOAST_DURATION,
        })
      }
    }
  
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(true)
    }
  
    const openFileDialog = () => {
      inputRef.current?.click()
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
        setFile(droppedFile)
        processFile(droppedFile)
      } else {
        toast.warning('File Process Failed', {
          description: `Please drop a valid SQLite file`,
          duration: TOAST_DURATION,
          classNames: {
            warning: '!bg-yellow-300/10 !text-black !font-is',
            description: '!text-yellow-300/75',
          },
        })
      }
    }
  
    const processFile = async (file: File) => {
      try {
        const loadedDb = await loadDatabase(file)
  
        if (!loadedDb) {
          toast.error('Load Database File', {
            description: 'Failed to load database file',
            duration: TOAST_DURATION,
            classNames: {
              error: '!bg-red-400/10 !text-black !font-is',
              description: '!text-red-400/75',
            },
          })
          return
        }
  
        await runFullValidation(loadedDb)
  
        const root = await navigator.storage.getDirectory()
  
        const dbFileHandle = await root.getFileHandle(
          `${EXPECTED_STRUCTURE.database}.sqlite3`,
          {
            create: true,
          },
        )
  
        const writable = await dbFileHandle.createWritable()
  
        await writable.write(await file.arrayBuffer())
        await writable.close()
  
        toast.success('Database Imported', {
          description: 'Database imported successfully',
          duration: TOAST_DURATION,
          classNames: {
            success: '!bg-dark/10 !text-dark !font-is',
            description: '!text-dark/75',
          },
        })
        window.location.href = `/converter/history?${params.toString()}`
      } catch (error) {
        toast.error('Error processing file', {
          description: `An error occurred while processing the file: ${error instanceof Error ? error.message : 'Internal Server Error'}`,
          duration: TOAST_DURATION,
          classNames: {
            error: '!bg-red-400/10 !black !font-is',
            description: '!text-red-400/75',
          },
        })
      }
    }
    
  return (
    <div
      className={`p-12 text-center transition-colors bg-gray/10 w-full min-h-screen`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h3 className="text-lg font-semibold font-dm py-2 text-dark">
        No conversions yet
      </h3>
      <p className="text-muted-foreground py-2 font-is">
        Start converting images to see your history here
      </p>
      <p className="text-sm font-is mb-6 text-muted-foreground">
        or import the SQLite file{' '}
        <span
          // onClick={() => window.location.href = "/converter/import"}
          onClick={openFileDialog}
          className="underline hover:cursor-pointer"
        >
          here
        </span>
      </p>

      <input
        ref={inputRef}
        type="file"
        accept=".sqlite3"
        className="hidden"
        onChange={handleFileSelect}
      />

      <Button
        className="
                    max-w-sm
                    rounded-xl
                    border-dark/20
                    focus-visible:ring-0
                    focus-visible:ring-offset-0
                    focus:shadow-none
                    focus:outline-none
                    font-is
                "
      >
        <a href="/#converter" className="flex items-center gap-5">
          <ArrowRight className="w-4 h-4" />
          Start Converting
        </a>
      </Button>
    </div>
  )
}

export default NoHistory