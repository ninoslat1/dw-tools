import { useRef, useState } from 'react'
import { Loader2, Upload } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EXPECTED_STRUCTURE, TOAST_DURATION } from '@/lib/format'
import { loadDatabase, runFullValidation } from '@/lib/database-validator'

export default function Importzone() {
  const [file, setFile] = useState<File | null>(null)
  const navigate = useNavigate()
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
          success: '!bg-violet-soft/10 !text-violet-soft !font-is',
          description: '!text-violet-soft/75',
        },
      })
      navigate({
        to: '/history',
        search: {
          page: 0,
          pageSize: 10,
          sort: 'timestamp',
          dir: 'desc',
          search: '',
        },
      })
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
    <section
      className="
        py-20 px-4 h-[600px]
        bg-gradient-to-b from-violet-soft/10 via-blue-soft/5 to-background
      "
      id="import"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="
              text-4xl font-bold mb-4
              bg-gradient-to-r from-violet-soft to-blue-soft 
              bg-clip-text text-transparent
              font-dm
            "
          >
            Import Database
          </h2>

          <p className="text-lg text-muted-foreground font-is">
            Drag and drop your SQLite database file below
          </p>
        </div>

        <Card
          className="
            border-2 border-dashed border-violet-soft/30 
            bg-white/60 backdrop-blur-sm
            p-12 rounded-2xl
            hover:border-violet-soft 
            transition-all duration-200
            hover:shadow-lg
            text-center cursor-pointer
          "
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <Input
            ref={inputRef}
            type="file"
            accept=".sqlite3"
            className="hidden"
            onChange={handleFileSelect}
          />

          <div className="flex flex-col items-center justify-center">
            <div
              className="
                w-16 h-16 rounded-full 
                bg-gradient-to-br from-violet-soft/20 to-blue-soft/20
                flex items-center justify-center mb-6
              "
            >
              {isDragging ? (
                <Loader2 className="w-8 h-8 animate-spin text-violet-soft" />
              ) : (
                <Upload className="w-8 h-8 text-violet-soft" />
              )}
            </div>

            <h3 className="text-2xl font-bold mb-2 font-dm text-violet-soft">
              Drop your database file here
            </h3>

            <p className="text-muted-foreground mb-4 font-is">
              or click to browse your device
            </p>

            <Button
              variant="outline"
              className="
                border border-blue-soft 
                text-blue-soft 
                bg-white 
                hover:bg-blue-soft/10
                hover:text-blue-soft
                rounded-xl
                transition
              "
            >
              Select Database File
            </Button>

            {file && (
              <p className="mt-6 text-sm text-muted-foreground font-is">
                Selected file: <span className="font-medium">{file.name}</span>
              </p>
            )}
          </div>
        </Card>
      </div>
    </section>
  )
}
