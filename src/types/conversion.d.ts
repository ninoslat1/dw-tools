type TConversionRecord = {
    id: string
    timestamp: number
    sourceFormat: string
    targetFormat: string
    imageBlob: Blob
    imageUrl: string
}

type TRecord = {
    id: string
    timestamp: number
    sourceFormat: string
    targetFormat: string
    filename: string,
    imageBlob: Blob
    imageUrl: string
}

type TCompressOptions = {
    quality?: number
    maxWidth?: number
    maxHeight?: number
    outputType?: "image/jpeg" | "image/webp" | "image/png"
}