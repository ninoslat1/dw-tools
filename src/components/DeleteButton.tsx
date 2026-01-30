import { DeleteIcon } from "lucide-react"
import { Button } from "./ui/button"

export function DeleteActionButton({
  onClick,
}: {
  onClick: () => void
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="text-destructive hover:text-destructive hover:cursor-pointer"
    >
      <DeleteIcon className="w-4 h-4" />
      <span className="hidden sm:inline">Delete</span>
    </Button>
  )
}
