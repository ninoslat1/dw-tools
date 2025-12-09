"use client"

import { useState, useRef, DragEvent } from "react"
import { Card } from "@/components/ui/card"
import { Upload, X, RefreshCw, Download, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select"
import { convertImage, downloadBlob } from "@/lib/converter"
import { SQLocal } from 'sqlocal';

export default function Dropzone() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedFormat, setSelectedFormat] = useState<"png" | "jpeg" | "jpg" | "webp" | "avif" | "">("")
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const availableFormat = ["png", "jpeg", "jpg", "webp"]
  const format = file?.name.split(".").pop()?.toLowerCase()
  const { getDatabaseFile } = new SQLocal({
    databasePath: 'dwimgconv.sqlite3',
    onInit: (sql) => {
      sql`CREATE TABLE image (uid STRING PRIMARY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, imageUrl STRING, imageBlob BLOB, sourceFormat STRING, targetFormat STRING)`;
    }
  });
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const selected = e.dataTransfer.files?.[0]
    if (selected) {
      setFile(selected)
      setPreview(URL.createObjectURL(selected))
    }
  }

  const preventDefaults = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const openFileDialog = () => {
    inputRef.current?.click()
  }

  const handleConvert = async () => {
    // if (!file || !selectedFormat) return;

    const databaseFile = await getDatabaseFile();
    if(databaseFile) {
      
    }

    // setIsConverting(true);
    // try {
    //   const blob = await convertImage(file, selectedFormat);
    //   const originalName = file.name.split('.').slice(0, -1).join('.');
    //   const newFilename = `${originalName}.${selectedFormat}`;
      
    //   downloadBlob(blob, newFilename);
    // } catch (error) {
    //   console.error('Conversion failed:', error);
    //   alert('Failed to convert image. Please try again.');
    // } finally {
    //   setIsConverting(false);
    // }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background/50 to-background">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Start Converting Now</h2>
          <p className="text-lg text-muted-foreground">Drag and drop your image below</p>
        </div>

        {!file ? (
          <Card
            className="
              border-2 border-dashed border-border p-12 bg-card/50 
              hover:border-primary transition text-center cursor-pointer
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
                  setPreview(URL.createObjectURL(selected))
                }
              }}
            />

            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                <Upload className="w-8 h-8 text-primary" />
              </div>

              <h3 className="text-2xl font-bold mb-2">Drop your image here</h3>
              <p className="text-muted-foreground mb-4">or click to browse</p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500" />
                Instant PNG download
              </div>

              <Button className="mt-6">Select File</Button>
            </div>
          </Card>
        ) : (
          <Card className="p-8 bg-card border border-border">
            <div className="space-y-6">

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Image Selected</label>
                <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg border border-border">
                  <div className="flex-1 truncate">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Convert to Format</label>
                <Select 
                  value={selectedFormat} 
                  onValueChange={(val: string) => {
                    setSelectedFormat(val as "png" | "jpeg" | "jpg" | "webp" | "avif" | "")
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select output type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Formats</SelectLabel>
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

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setFile(null)
                    setPreview(null)
                  }}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" /> Remove
                </Button>

                {/* <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    openFileDialog
                  }}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Change Image
                </Button> */}

                <Button 
                  className="flex items-center gap-2 flex-1 sm:flex-none" 
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
                      Start Converting
                    </>
                  )}
                </Button>
              </div>

            </div>
          </Card>
        )}

      </div>
    </section>
  )
}
