import { Trash2 } from 'lucide-react'

export const DeleteActionButton = ({
  onClick,
  className = '',
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
      <Trash2 className="w-4 h-4" />
    </button>
  )
}
