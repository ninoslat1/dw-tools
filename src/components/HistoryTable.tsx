

import { useEffect, useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  type PaginationState,
} from "@tanstack/react-table"
import { Card } from './ui/card'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { conversionService } from '@/services/conversion'
import { ConversionTableSchema } from '@/schemas/conversion'

const HistoryTable = () => {
  const [conversions, setConversions] = useState<TConversionRecord[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [isLoading, setIsLoading] = useState(true)
  const columnHelper = createColumnHelper<TConversionRecord>()

  const loadConversionHistory = async () => {
      try {
        const storedData = await conversionService.getConversion();
        
        if (storedData && storedData.length > 0) {
          const processedHistory: TConversionRecord[] = storedData.map((item: any) => {
            let finalUrl = "";

            if (item.imageBlob) {
              try {
                const blob = new Blob([item.imageBlob], { 
                  type: `image/${item.targetFormat.toLowerCase()}` 
                });
                finalUrl = URL.createObjectURL(blob);
              } catch (e) {
                console.error("Gagal membuat Blob URL:", e);
              }
            }

            return {
              ...item,
              id: item.uid,
              timestamp: new Date(item.timestamp).getTime(),
              imageUrl: finalUrl,
            };
          });

          setConversions(processedHistory);
          setIsLoading(false)
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Failed to load conversion history:", error);
      }
  }
  const handleDelete = (id: string) => {
    const updated = conversions.filter((conv) => conv.id !== id)
    setConversions(updated)
    localStorage.setItem("conversionHistory", JSON.stringify(updated))
  }

  const handleDownload = (record: TConversionRecord) => {
    const link = document.createElement("a")
    link.href = record.imageUrl
    link.download = record.imageUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const table = useReactTable({
    data: conversions,
    columns: ConversionTableSchema(columnHelper, handleDelete, handleDownload),
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  useEffect(() => {
    loadConversionHistory()
  }, [])

  if (isLoading) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Loading conversion history...</p>
      </Card>
    )
  }

  if (table.getAllLeafColumns().length === 0) {
    return (
      <Card className="p-12 text-center">
        <h3 className="text-lg font-semibold mb-2">No conversions yet</h3>
        <p className="text-muted-foreground mb-6">Start converting images to see your history here</p>
        <Button className="gap-2">
          <a href="/" className="flex gap-2">
            Start Converting
          </a>
        </Button>
      </Card>
    )
  }

  return (
    <div className="space-y-4 min-h-screen">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left font-semibold text-foreground"
                      onClick={header.column.getToggleSortingHandler()}
                      style={{
                        cursor: header.column.getCanSort() ? "pointer" : "default",
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {
              table.getRowModel().rows.length > 0 ? 
              (table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))) : (
                <tr>
                  <td colSpan={table.getAllLeafColumns().length} className="text-center py-10">
                    No conversion history
                  </td>
                </tr>
              )
              }
            </tbody>
          </table>
        </div>

      <div className="flex items-center justify-between gap-4 p-4">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="gap-1"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HistoryTable