export type THistorySearch = {
  page: number
  pageSize: number
  search: string
  sort: SortColumn
  dir: 'asc' | 'desc'
}

export type TSortColumn =
  | 'timestamp'
  | 'imageUrl'
  | 'sourceFormat'
  | 'targetFormat'

