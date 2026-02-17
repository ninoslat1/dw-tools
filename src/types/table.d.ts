interface ImageTable {
  uid: string
  timestamp: string
  imageUrl: string | null
  imageBlob: Uint8Array | null
  sourceFormat: string
  targetFormat: string
}

interface Database {
  image: ImageTable
}

type TableInfoRow = [
  cid: number,
  name: string,
  type: string,
  notnull: number,
  dflt_value: any,
  pk: number,
]
