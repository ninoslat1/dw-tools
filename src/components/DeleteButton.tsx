import { useRef } from "react"
import { DeleteIcon, type DeleteIconHandle } from "./ui/delete"
import { Button } from "./ui/button"

export function DeleteActionButton({
  onClick,
}: {
  onClick: () => void
}) {
  const ref = useRef<DeleteIconHandle>(null)

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="text-destructive hover:text-destructive hover:cursor-pointer"
      onMouseEnter={() => ref.current?.startAnimation()}
      onMouseLeave={() => ref.current?.stopAnimation()}
    >
      <DeleteIcon ref={ref} className="w-4 h-4" />
      <span className="hidden sm:inline">Delete</span>
    </Button>
  )
}
