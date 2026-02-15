import Importzone from '@/components/ImportZone'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/import')({
  component: ImportZoneComponent,
})

function ImportZoneComponent() {
  return (
    <Importzone/>
  ) 
}
