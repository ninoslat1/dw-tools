import HistoryTable from '@/components/HistoryTable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/history')({
  component: HistoryComponent,
})

function HistoryComponent() {
  return (
    <HistoryTable/>
  ) 
}
