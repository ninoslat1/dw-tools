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

type TSupportedMimeType = 'image/jpeg' | 'image/png' | 'image/webp'

type TCompressOptions = {
  quality?: number
  maxWidth?: number
  maxHeight?: number
  outputType?: TSupportedMimeType
  mode?: 'basic' | 'normal' | 'ultra' | ''
}
