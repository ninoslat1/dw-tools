import { createFileRoute } from '@tanstack/react-router'
import Importzone from '@/components/ImportZone'

export const Route = createFileRoute('/import')({
  component: ImportZoneComponent,
})

function ImportZoneComponent() {
  return <Importzone />
}
