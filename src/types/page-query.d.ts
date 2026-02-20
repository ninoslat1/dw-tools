export type THistorySearch = {
  page: number
  pageSize: number
  search: string
  sort: TSortColumn
  dir: 'asc' | 'desc'
}

export type TSortColumn =
  | 'timestamp'
  | 'imageUrl'
  | 'sourceFormat'
  | 'targetFormat'
