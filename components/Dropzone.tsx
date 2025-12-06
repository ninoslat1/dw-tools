"use client"

import { Card } from "@/components/ui/card"
import { Upload, Check } from "lucide-react"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

export default function Dropzone() {
  const [file, setFile] = useState<File[]>([])
  const onDrop = useCallback((accFile: File[]) => {
    setFile(accFile)
  },[])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <section id="converter" className="py-20 px-4 bg-gradient-to-b from-background/50 to-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Start Converting Now</h2>
          <p className="text-lg text-muted-foreground">Drag and drop your WebP image below</p>
        </div>

        <Card
          className="border-2 border-dashed border-border hover:border-primary transition p-12 bg-card/50 hover:cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6">
              <Upload className="w-8 h-8 text-primary" />
            </div>

            <h3 className="text-2xl font-bold mb-2">
              {isDragActive ? "Drop your WebP here" : "Pull your file over here"}
            </h3>

            <p className="text-muted-foreground mb-6">
              or click to browse
            </p>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { label: "WebP Input", value: "Up to 100MB" },
            { label: "PNG Output", value: "High quality" },
            { label: "Processing", value: "Real-time" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-lg font-semibold text-primary">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
