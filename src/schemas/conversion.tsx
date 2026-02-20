import type { ColumnHelper } from '@tanstack/react-table'
import { DeleteActionButton } from '@/components/react/DeleteButton'
import { DownloadActionButton } from '@/components/react/DownloadButton'

export const ConversionTableSchema = (
  columnHelper: ColumnHelper<TRecord>,
  handleDelete: (id: string) => void,
  handleDownload: (record: TConversionRecord) => void,
) => {
  const columns = [
    columnHelper.accessor('filename', {
      header: 'File Name',
      size: 350,
      cell: (info) => {
        const row = info.row.original
        return (
          <div className="flex items-center gap-3">
            <img
              src={row.imageUrl}
              alt={info.getValue()}
              className="w-10 h-10 object-cover rounded border"
            />
            <div>
              <p className="text-sm font-medium font-dm text-bold">
                {info.getValue()}
              </p>
              <p className="text-xs text-foreground font-is">
                {row.sourceFormat.toUpperCase()} →{' '}
                {row.targetFormat.toUpperCase()}
              </p>
            </div>
          </div>
        )
      },
      enableSorting: true,
    }),
    columnHelper.accessor('timestamp', {
      header: 'Date & Time',
      cell: (info) => {
        const date = new Date(info.getValue())
        return (
          <div className="text-sm">
            <div className="font-xl text-bold font-dm text-dark">
              {date.toLocaleDateString()}
            </div>
            <div className="text-muted-foreground font-is">
              {date.toLocaleTimeString()}
            </div>
          </div>
        )
      },
      enableSorting: true,
    }),
    // columnHelper.accessor("imageUrl", {
    //   header: "Preview",
    //   cell: (info) => (
    //     <div className="flex">
    //       <img
    //         src={info.getValue() || "/placeholder.svg"}
    //         alt="Converted"
    //         className="w-16 h-16 object-cover rounded-md border border-border"
    //       />
    //     </div>
    //   ),
    //   enableSorting: false,
    // }),
    // columnHelper.accessor((row) => `${row.sourceFormat} → ${row.targetFormat}`, {
    //   id: "conversion",
    //   header: "Conversion",
    //   cell: (info) => (
    //     <div className="text-sm">
    //       <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">{info.getValue()}</span>
    //     </div>
    //   ),
    // }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => (
        <div className="flex items-center gap-2">
          <DownloadActionButton
            onClick={() => handleDownload(info.row.original)}
            className="
          p-2 rounded-xl
          bg-dark/10 text-dark
          hover:bg-dark hover:text-white
          transition-colors
        "
          />
          <DeleteActionButton
            onClick={() => handleDelete(info.row.original.id)}
            className="
          p-2 rounded-xl
          bg-red-50 text-red-500
          hover:bg-red-500 hover:text-white
          transition-colors
        "
          />
        </div>
      ),
    }),
  ]

  return columns
}