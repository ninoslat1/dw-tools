import { createFileRoute } from '@tanstack/react-router'
import type { THistorySearch, TSortColumn } from '@/types/page-query'
import HistoryTable from '@/components/HistoryTable'

export const Route = createFileRoute('/history')({
  component: HistoryComponent,
  validateSearch: (search): THistorySearch => {
    const allowedColumns: Array<TSortColumn> = [
      'timestamp',
      'imageUrl',
      'sourceFormat',
      'targetFormat',
    ]

    const sort = allowedColumns.includes(search.sort as TSortColumn)
      ? (search.sort as TSortColumn)
      : 'timestamp'

    return {
      page: Number(search.page ?? 0),
      pageSize: Number(search.pageSize ?? 10),
      search: String(search.search ?? ''),
      sort,
      dir: search.dir === 'asc' ? 'asc' : 'desc',
    }
  },
})

function HistoryComponent() {
  return <HistoryTable />
}
