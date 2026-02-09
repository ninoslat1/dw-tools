import { useEffect, useRef, useState } from 'react'
import { Download, Loader2, Upload, X } from 'lucide-react'
import { Label } from './ui/label'
import { Progress } from './ui/progress'
import type { DragEvent } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { compressImageBlob, convertImage, downloadBlob } from '@/lib/converter'
import { conversionService } from '@/services/conversion'
import { animateTo } from '@/lib/animate'

export default function Dropzone() {
  const [file, setFile] = useState<File | null>(null)
  // const [preview, setPreview] = useState<string | null>(null)
  // const [isDownload, setIsDownload] = useState<boolean>(false)
  const [selectedFormat, setSelectedFormat] = useState<
    'png' | 'jpeg' | 'jpg' | 'webp' | 'avif' | ''
  >('')
  const [isConverting, setIsConverting] = useState(false)
  const [dbReady, setDbReady] = useState(false)
  const [getDatabaseFile, setGetDatabaseFile] = useState<
    (() => Promise<File>) | null
  >(null)
  // const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null)
  // const [originalBlob, setOriginalBlob] = useState<Blob | null>(null)
  // const MAX_BASE64_SIZE = 5_000_000
  // const [_, setProgress] = useState(0)
  const [targetProgress, setTargetProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const availableFormat = ['png', 'jpeg', 'jpg', 'webp', 'avif']
  const format = file?.name.split('.').pop()?.toLowerCase()
  const [compressMode, setCompressMode] = useState<
    'basic' | 'normal' | 'ultra' | 'none'
  >('none')

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return

      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const blob = item.getAsFile()
          if (!blob) continue

          const filename = blob.name || 'pasted-image'
          const file = new File([blob], `${filename}`, {
            type: blob.type,
          })

          setFile(file)
          return
        }
      }
    }

    window.addEventListener('paste', handlePaste)
    return () => window.removeEventListener('paste', handlePaste)
  }, [])

  useEffect(() => {
    let mounted = true

    const initDB = async () => {
      try {
        // Dynamic import sqlocal
        const { SQLocal } = await import('sqlocal')

        if (mounted) {
          const db = new SQLocal({ databasePath: 'dwimgconv.sqlite3' })
          setGetDatabaseFile(() => db.getDatabaseFile)
          setDbReady(true)
        }
      } catch (error) {
        console.error('Failed to initialize database:', error)
      }
    }

    initDB()

    return () => {
      mounted = false
    }
  }, [])

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const selected = e.dataTransfer.files[0]
    if (selected) {
      setFile(selected)
      // setOriginalBlob(selected)
    }
  }

  useEffect(() => {
    if (!isConverting) return

    const timer = setInterval(() => {
      animateTo(setTargetProgress, targetProgress)
    }, 50)

    return () => clearInterval(timer)
  }, [isConverting, targetProgress])

  const preventDefaults = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const openFileDialog = () => {
    inputRef.current?.click()
  }

  const handleConvert = async () => {
    if (!file || !selectedFormat || !getDatabaseFile) return

    setIsConverting(true)
    setTargetProgress(5)

    try {
      const databaseFile = await getDatabaseFile()
      const originalName = file.name.split('.').slice(0, -1).join('.')
      const newFilename = `${originalName}.${selectedFormat}`
      const blob = await convertImage(file, selectedFormat)
      setTargetProgress(30)
      if (databaseFile) {
        let finalBlob = blob

        if (
          compressMode != 'none' &&
          (selectedFormat === 'jpeg' ||
            selectedFormat === 'webp' ||
            selectedFormat === 'png')
        ) {
          finalBlob = await compressImageBlob(blob, {
            outputType: `image/${selectedFormat}`,
          })
          setTargetProgress(60)
        }

        await conversionService.cacheConversion({
          uid: crypto.randomUUID(),
          imageUrl: newFilename,
          imageBlob: new Uint8Array(await finalBlob.arrayBuffer()),
          sourceFormat: file.type,
          targetFormat: selectedFormat,
          timestamp: new Date().toISOString(),
        })
        setTargetProgress(85)
        downloadBlob(finalBlob, newFilename)
        setTargetProgress(100)
      } else {
        await conversionService.cacheConversion({
          uid: crypto.randomUUID(),
          imageUrl: newFilename,
          imageBlob: new Uint8Array(await blob.arrayBuffer()),
          sourceFormat: file.type,
          targetFormat: selectedFormat,
          timestamp: new Date().toISOString(),
        })
        setTargetProgress(85)
        downloadBlob(blob, newFilename)
        setTargetProgress(100)
      }
    } catch (error) {
      alert('Failed to convert image. Please try again.')
      setTargetProgress(0)
    } finally {
      setIsConverting(false)
    }
  }

  return (
    <section
      className="
        py-20 h-[850px] px-4 
        bg-gradient-to-b from-violet-soft/10 via-blue-soft/5 to-background
        "
      id="converter"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="
            text-4xl md:text-5xl font-bold mb-4 py-2
            bg-gradient-to-r from-violet-soft to-blue-soft 
            bg-clip-text text-transparent
            font-dm
          "
          >
            Start Converting Now
          </h2>

          <p className="text-lg text-muted-foreground font-is">
            Drag and drop your image below
          </p>
        </div>

        {/* {!dbReady && (
          <div className="text-center py-8">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Initializing database...</p>
          </div>
        )} */}

        {dbReady && !file ? (
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
            onDrop={handleDrop}
            onDragOver={preventDefaults}
            onDragEnter={preventDefaults}
            onClick={openFileDialog}
          >
            <Input
              ref={inputRef}
              type="file"
              accept=".webp,.png,.jpg,.jpeg"
              className="hidden"
              onChange={(e) => {
                const selected = e.target.files?.[0]
                if (selected) {
                  setFile(selected)
                }
              }}
            />

            <div className="flex flex-col items-center justify-center">
              <div
                className="
                w-16 h-16 rounded-full 
                bg-gradient-to-br from-violet-soft/20 to-blue-soft/20
                flex items-center justify-center mb-6
              "
              >
                <Upload className="w-8 h-8 text-violet-soft" />
              </div>

              <h3 className="text-2xl font-bold mb-2 font-dm text-violet-soft">
                Drop your image here
              </h3>
              <p className="text-muted-foreground mb-4 font-is font-sm">
                or click to browse
              </p>

              <Button
                variant={'outline'}
                className="
  border border-blue-soft 
  text-blue-soft 
  bg-white 
  hover:bg-blue-soft/10
  hover:text-blue-soft
  hover:cursor-pointer
  rounded-xl
  transition
"
              >
                Select File
              </Button>
            </div>
          </Card>
        ) : dbReady && file ? (
          <Card className="p-8 bg-card border border-border">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground font-dm">
                  Image{' '}
                  <span className="ml-2 text-xs bg-violet-soft/10 text-violet-soft px-2 py-1 rounded-full">
                    Selected
                  </span>
                </Label>
                <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg border border-border">
                  <div className="flex-1 truncate">
                    <p className="font-medium truncate font-dm text-foreground">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground font-is font-thin">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground font-dm">
                  Convert to Format
                </Label>
                <Select
                  value={selectedFormat}
                  onValueChange={(val: string) => {
                    setSelectedFormat(
                      val as 'png' | 'jpeg' | 'jpg' | 'webp' | 'avif' | '',
                    )
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select output type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className="font-is">Formats</SelectLabel>
                      {availableFormat
                        .filter((fmt) => fmt !== format)
                        .map((fmt) => (
                          <SelectItem key={fmt} value={fmt}>
                            {fmt.toUpperCase()}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {['jpeg', 'webp', 'png'].includes(selectedFormat) && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground font-dm">
                    Compression Mode (Optional)
                  </Label>

                  <Select
                    value={compressMode}
                    onValueChange={(v: 'basic' | 'normal' | 'ultra' | 'none') =>
                      setCompressMode(v)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="No compression" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="font-is">Mode</SelectLabel>

                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="ultra">Ultra</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {isConverting && (
                <div className="flex items-center gap-3">
                  <Progress
                    value={targetProgress}
                    className="h-2 rounded-full bg-violet-soft/10 [&>div]:bg-violet-soft [&>div]:rounded-full"
                  />

                  <p className="text-xs text-muted-foreground w-10 text-right">
                    {targetProgress}%
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setFile(null)
                    // setConvertedBlob(null)
                    // setIsDownload(false)
                  }}
                  className="flex items-center gap-2 hover:cursor-pointer"
                >
                  <X className="w-4 h-4" /> Remove
                </Button>

                <Button
                  variant={'outline'}
                  className="
  bg-violet-soft text-white 
  hover:bg-violet-600 
  rounded-xl
  shadow-md hover:shadow-lg
  hover:text-white
  hover:cursor-pointer
  transition
  duration-200
"
                  onClick={handleConvert}
                  disabled={!selectedFormat || isConverting}
                >
                  {isConverting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Convert & Download
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        ) : null}
      </div>
    </section>
  )
}
