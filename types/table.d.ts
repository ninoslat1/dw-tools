// db/types.ts
import type { Generated } from 'kysely'

export interface ImageTable {
  uid: string
  timestamp: string
  imageUrl: string | null
  imageBlob: Uint8Array | null
  sourceFormat: string
  targetFormat: string
}

export interface Database {
  image: ImageTable
}
