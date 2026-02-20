import { useEffect, useRef, useState } from 'react'
import { Download, Loader2, Upload, X } from 'lucide-react'
import { toast } from 'sonner'

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
import { TOAST_DURATION } from '@/lib/format'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog'
import { Label } from '../ui/label'
import { Progress } from '../ui/progress'

export default function Dropzone() {
  const [file, setFile] = useState<File | null>(null)
  const [selectedFormat, setSelectedFormat] = useState<
    'png' | 'jpeg' | 'jpg' | 'webp' | 'avif' | ''
  >('')
  const [preview, setPreview] = useState<boolean>(false)
  const [previewData, setPreviewData] = useState<{
    blob: Blob | null
    name: string
  }>({ blob: null, name: '' })
  const [isConverting, setIsConverting] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [targetProgress, setTargetProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const availableFormat = ['png', 'jpeg', 'jpg', 'webp', 'avif']
  const format = file?.name.split('.').pop()?.toLowerCase()
  const [compressMode, setCompressMode] = useState<
    'basic' | 'normal' | 'ultra' | 'none'
  >('none')
  const formatToMimeMap: Record<
    'png' | 'jpeg' | 'jpg' | 'webp',
    TSupportedMimeType
  > = {
    png: 'image/png',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    webp: 'image/webp',
  }

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

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const selected = e.dataTransfer.files[0]
    if (selected) {
      setFile(selected)
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
    if (!file || !selectedFormat) return

    setIsConverting(true)
    setTargetProgress(5)

    try {
      const originalName = file.name.split('.').slice(0, -1).join('.')
      const newFilename = `${originalName}.${selectedFormat}`

      let finalBlob = await convertImage(file, selectedFormat)
      setTargetProgress(30)

      if (
        compressMode !== 'none' &&
        ['jpeg', 'webp', 'png'].includes(selectedFormat)
      ) {
        if (selectedFormat in formatToMimeMap) {
          finalBlob = await compressImageBlob(finalBlob, {
            outputType:
              formatToMimeMap[selectedFormat as keyof typeof formatToMimeMap],
            mode: compressMode,
          })
        }
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

      setPreviewData({
        blob: finalBlob,
        name: newFilename,
      })

      setPreview(true)
      setTargetProgress(100)
    } catch (error) {
      toast.error('Fail Convert Image', {
        description:
          error instanceof Error ? error.message : 'Internal Server Error',
        duration: TOAST_DURATION,
      })

      setTargetProgress(0)
    } finally {
      setIsConverting(false)
    }
  }

  useEffect(() => {
    if (!previewData.blob) return

    const url = URL.createObjectURL(previewData.blob)
    setPreviewUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [previewData.blob])

  return (
    <>
      <Dialog open={preview} onOpenChange={setPreview}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Preview Image</DialogTitle>
          </DialogHeader>

          {previewUrl && (
            <div className="flex justify-center">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-100 rounded-lg object-contain"
              />
            </div>
          )}

          <DialogFooter className="flex gap-2 justify-end mt-4">
            <Button variant="outline" onClick={() => setPreview(false)}>
              Cancel
            </Button>

            <Button
              onClick={() => {
                if (previewData.blob) {
                  downloadBlob(previewData.blob, previewData.name)
                }
                setPreview(false)
              }}
            >
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <section
        className="
          py-20 h-212.5 px-4 
          bg-gray/5
          "
        id="converter"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="
              text-4xl md:text-5xl font-bold mb-4 py-2
              bg-linear-to-r from-dark to-gray 
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

          {!file ? (
            <Card
              className="
      border-2 border-dashed border-dark/30 
      bg-white/60 backdrop-blur-sm
      p-12 rounded-2xl
      hover:border-dark 
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
                  bg-linear-to-br from-dark/20 to-gray/20
                  flex items-center justify-center mb-6
                "
                >
                  <Upload className="w-8 h-8 text-dark" />
                </div>

                <h3 className="text-2xl font-bold mb-2 font-dm text-dark">
                  Drop your image here
                </h3>
                <p className="text-muted-foreground mb-4 font-is font-sm">
                  or click to browse
                </p>

                <Button
                  variant={'outline'}
                  className="
    border border-gray 
    text-gray 
    bg-white 
    hover:bg-gray/10
    hover:text-gray
    hover:cursor-pointer
    rounded-xl
    transition
  "
                >
                  Select File
                </Button>
              </div>
            </Card>
          ) : file ? (
            <Card className="p-8 bg-card border border-border">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground font-dm">
                    Image{' '}
                    <span className="ml-2 text-xs bg-dark/10 text-dark px-2 py-1 rounded-full">
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
                      onValueChange={(
                        v: 'basic' | 'normal' | 'ultra' | 'none',
                      ) => setCompressMode(v)}
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
                      className="h-2 rounded-full bg-dark/10 [&>div]:bg-dark [&>div]:rounded-full"
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
                    }}
                    className="flex items-center gap-2 hover:cursor-pointer"
                  >
                    <X className="w-4 h-4" /> Remove
                  </Button>

                  <Button
                    variant={'outline'}
                    className="
    bg-dark text-white 
    hover:bg-black 
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
                        Convert & Preview
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ) : null}
        </div>
      </section>
    </>
  )
}
