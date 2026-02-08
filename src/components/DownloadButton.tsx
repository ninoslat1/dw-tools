import { DownloadIcon } from 'lucide-react'
import { Button } from './ui/button'

export function DownloadActionButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="gap-1 hover:cursor-pointer"
    >
      <DownloadIcon className="w-4 h-4" />
      <span className="hidden sm:inline">Download</span>
    </Button>
  )
}
