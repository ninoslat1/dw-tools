import { Button } from "@/components/ui/button"
import { DownloadIcon } from "@/components/ui/download"
import { type ColumnHelper } from "@tanstack/react-table"
import { Download, Trash2 } from "lucide-react"

export const ConversionTableSchema = (columnHelper: ColumnHelper<TConversionRecord>, handleDelete: (id: string) => void, handleDownload: (record: TConversionRecord) => void) => {
    const columns = [
    columnHelper.accessor("timestamp", {
      header: "Date & Time",
      cell: (info) => {
        const date = new Date(info.getValue())
        return (
          <div className="text-sm">
            <div className="font-medium">{date.toLocaleDateString()}</div>
            <div className="text-muted-foreground">{date.toLocaleTimeString()}</div>
          </div>
        )
      },
      enableSorting: true,
    }),
    columnHelper.accessor("imageUrl", {
      header: "Preview",
      cell: (info) => (
        <div className="flex">
          <img
            src={info.getValue() || "/placeholder.svg"}
            alt="Converted"
            className="w-16 h-16 object-cover rounded-md border border-border"
          />
        </div>
      ),
      enableSorting: false,
    }),
    columnHelper.accessor((row) => `${row.sourceFormat} → ${row.targetFormat}`, {
      id: "conversion",
      header: "Conversion",
      cell: (info) => (
        <div className="text-sm">
          <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleDownload(info.row.original)} className="gap-1 hover:cursor-pointer">
            <DownloadIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(info.row.original.id)}
            className="text-destructive hover:text-destructive hover:cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </div>
      ),
    }),
  ]

  return columns
}