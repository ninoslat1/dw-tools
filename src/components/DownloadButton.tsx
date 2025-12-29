import { useRef } from "react"
import { DownloadIcon, type DownloadIconHandle } from "./ui/download"
import { Button } from "./ui/button"

export function DownloadActionButton({
  onClick,
}: {
  onClick: () => void
}) {
  const ref = useRef<DownloadIconHandle>(null)

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="gap-1 hover:cursor-pointer"
      onMouseEnter={() => ref.current?.startAnimation()}
      onMouseLeave={() => ref.current?.stopAnimation()}
    >
      <DownloadIcon ref={ref} className="w-4 h-4" />
      <span className="hidden sm:inline">Download</span>
    </Button>
  )
}
