import { Download } from "lucide-react"

export const DownloadActionButton = ({
  onClick,
  className = "",
}: {
  onClick: () => void
  className?: string
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center hover:cursor-pointer
        ${className}
      `}
    >
      <Download className="w-4 h-4" />
    </button>
  )
}
