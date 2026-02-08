import { createFileRoute } from '@tanstack/react-router'
import HistoryTable from '@/components/HistoryTable'

export const Route = createFileRoute('/_history/history/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <HistoryTable />
}
