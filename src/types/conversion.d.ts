type TConversionRecord = {
  id: string
  timestamp: number
  sourceFormat: string
  targetFormat: string
  imageBlob: Blob
  imageUrl: string
  filename: string
}

type TRecord = {
  id: string
  timestamp: number
  sourceFormat: string
  targetFormat: string
  filename: string
  imageBlob: Blob
  imageUrl: string
}

type TCompressOptions = {
  quality?: number
  maxWidth?: number
  maxHeight?: number
  outputType?: 'image/jpeg' | 'image/webp' | 'image/png'
  mode?: 'basic' | 'normal' | 'ultra' | ''
}
