"use client"

import { Card } from "@/components/ui/card"
import { Upload, CheckCircle2, FileImage, X, Loader2 } from "lucide-react"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"

export default function Dropzone() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const availableFormat: string[] = ["png", "jpeg", "jpg", "webp"]
  const format = file && file.name.split(".").pop()?.toLowerCase()
  const onDrop = useCallback((accepted: File[]) => {
    const selected = accepted[0]
    if (!selected) return

    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/webp": [], "image/png": [], "image/jpg": [], "image/jpeg": [] },
    maxFiles: 1,
  })

  return (
    <section
      id="converter"
      className="py-20 px-4 bg-gradient-to-b from-background/50 to-background"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            Image Converter
          </h2>
          <p className="text-lg text-muted-foreground">
            Drop a file or click to upload — we’ll convert it instantly.
          </p>
        </div>

        <Card
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-xl p-10 transition cursor-pointer
            ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-border bg-card/50"
            }
          `}
        >
          <input {...getInputProps()} />

          {!file ? (
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>

              <h3 className="text-2xl font-semibold mb-2">
                {isDragActive ? "Drop your image…" : "Drag an image here"}
              </h3>

              <p className="text-muted-foreground mb-4">or click to browse</p>

              <div className="text-sm text-muted-foreground">
                Max size 40MB
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-6 w-full">
              {preview && (
                <div className="flex justify-between w-full">

                  <div className="rounded-lg overflow-hidden border">
                    <Image
                      src={preview}
                      alt="preview"
                      width={240}
                      height={240}
                      className="object-cover"
                    />
                  </div>


                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="font-semibold text-lg">Filename</p>
                      <p className="text-muted-foreground">{file.name}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-lg">Format</p>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Format</SelectLabel>
                            {availableFormat.filter((availableFormat) => availableFormat !== format).map((val) => {
                              return (
                                <SelectItem value={val}>{val.toUpperCase()}</SelectItem>
                              )
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setFile(null)
                          setPreview(null)
                        }}
                      >
                        <X className="w-4 h-4 mr-1" /> Remove
                      </Button>

                      <Button
                        size="sm"
                        disabled={!file || loading}
                        onClick={(e) => {
                          e.stopPropagation()
                          setLoading(true)
                          setTimeout(() => setLoading(false), 1200)
                        }}
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <FileImage className="w-4 h-4 mr-2" />
                        )}
                        Convert
                      </Button>
                    </div>
                  </div>
                </div>
              )}


              
            </div>
          )}
        </Card>
      </div>
    </section>
  )
}
