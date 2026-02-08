import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowRight, ChevronLeft, ChevronRight, DeleteIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { Input } from './ui/input'
import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table'
import { conversionService } from '@/services/conversion'
import { ConversionTableSchema } from '@/schemas/conversion'
import { Link } from '@tanstack/react-router'

const columnHelper = createColumnHelper<TRecord>()

const HistoryTable = () => {
  const [conversions, setConversions] = useState<Array<TRecord>>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [nameFilter, setNameFilter] = useState('')

  const loadConversionHistory = useCallback(async () => {
    try {
      const storedData = await conversionService.getConversion()

      if (storedData && storedData.length > 0) {
        const processedHistory: Array<TRecord> = storedData.map((item: any) => {
          let finalUrl = ''
          let blob: Blob | null = null

          if (item.imageBlob) {
            try {
              blob = new Blob([item.imageBlob], {
                type: `image/${item.targetFormat.toLowerCase()}`,
              })
              finalUrl = URL.createObjectURL(blob)
            } catch (e) {
              console.error('Gagal membuat Blob URL:', e)
            }
          }

          const filename = `${item.imageUrl}`

          return {
            id: item.uid,
            timestamp: new Date(item.timestamp).getTime(),
            sourceFormat: item.sourceFormat,
            targetFormat: item.targetFormat,
            filename,
            imageBlob: blob!,
            imageUrl: finalUrl,
          }
        })

        setConversions(processedHistory)
      }
    } catch (error) {
      console.error('Failed to load conversion history:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleDelete = useCallback(async (id: string) => {
    try {
      setConversions((prev) => {
        const record = prev.find((c) => c.id === id)
        if (record?.imageUrl) {
          URL.revokeObjectURL(record.imageUrl)
        }
        return prev.filter((c) => c.id !== id)
      })

      await conversionService.deleteConversion(id)
      toast.success('Cached Image Deleted', {
        description: 'Cached image deleted successfully from device',
        icon: <DeleteIcon size={16} />,
        classNames: {
          toast: 'gap-4',
          icon: 'mt-1',
          title: 'text-sm font-medium',
          description: 'text-xs text-muted-foreground',
        },
      })
    } catch (error) {
      console.error('Failed to delete conversion:', error)
    }
  }, [])

  const filteredConversions = useMemo(() => {
    if (!nameFilter) return conversions

    return conversions.filter((conversion) => {
      return conversion.filename
        .toLowerCase()
        .includes(nameFilter.toLowerCase())
    })
  }, [conversions, nameFilter])

  const handleDownload = useCallback((record: TConversionRecord) => {
    const link = document.createElement('a')
    link.href = record.imageUrl
    link.download = record.filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  const columns = useMemo(
    () => ConversionTableSchema(columnHelper, handleDelete, handleDownload),
    [handleDelete, handleDownload],
  )

  const table = useReactTable({
    data: filteredConversions,
    columns,
    state: { sorting, pagination, columnFilters },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }, [nameFilter])

  useEffect(() => {
    loadConversionHistory()
  }, [loadConversionHistory])

  useEffect(() => {
    return () => {
      conversions.forEach((conv) => {
        if (conv.imageUrl) {
          URL.revokeObjectURL(conv.imageUrl)
        }
      })
    }
  }, [conversions])

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <p className="text-foreground font-semibold font-is">Loading conversion history...</p>
      </div>
    )
  }

  if (conversions.length === 0) {
    return (
      <div className="p-12 text-center">
        <h3 className="text-lg font-semibold mb-2">No conversions yet</h3>
        <p className="text-muted-foreground mb-6">
          Start converting images to see your history here
        </p>
        <Button
          // to="/" 
          className="
            bg-violet-soft text-white 
            hover:bg-violet-600 
            rounded-xl shadow-sm
            gap-2
          "
        >
          <Link to="/" className='flex items-center gap-5'>
            <ArrowRight className="w-4 h-4" />
            Start Converting
          </Link>
        </Button>

      </div>
    )
  }

  return (
    <div className="
  w-full py-8 px-4 
  min-h-screen
  bg-gradient-to-b from-violet-soft/8 via-blue-soft/5 to-background
">

      <div className="
  overflow-x-auto space-y-4
  bg-white/60 backdrop-blur-sm 
  border border-violet-soft/10 
  rounded-2xl shadow-sm p-4
">

        <div className="flex gap-3 items-center px-5">
          <Button
    variant="ghost"
    size="sm"
    className="gap-1 text-violet-soft hover:text-violet-soft duration-200 hover:bg-violet-soft/10"
  >
    <Link to='/'>
      ← Back
    </Link>
  </Button>


          <Input
            type="text"
            placeholder="Filter by file name..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="
  max-w-sm
  rounded-xl
  border-violet-soft/20
  focus-visible:ring-0
  focus-visible:ring-offset-0
  focus:shadow-none
  focus:outline-none
"

          />

          {nameFilter && (
            <div className="flex items-center justify-between w-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setNameFilter('')}
                className="text-blue-soft hover:bg-blue-soft/10 hover:text-blue-soft hover:cursor-pointer"
              >
                Clear
              </Button>

              <div className="text-sm text-muted-foreground block">
                Showing {filteredConversions.length} of {conversions.length}{' '}
                results
              </div>
            </div>
          )}
        </div>

        <table className="w-full text-sm border-separate border-spacing-0">
          <thead className="border-b border-violet-soft/10 bg-violet-soft/5 font-is font-extrabold">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left font-semibold text-violet-soft"
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      cursor: header.column.getCanSort()
                        ? 'pointer'
                        : 'default',
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="
  border-b border-violet-soft/10 
  hover:bg-violet-soft/5 
  transition-colors
"

                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={table.getAllLeafColumns().length}
                  className="text-center py-10"
                >
                  No conversion history
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-4 p-4">
        <div className="text-sm text-violet-soft/80 font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
        <div className="flex gap-2">
          <Button
  variant="outline"
  size="sm"
  onClick={() => table.previousPage()}
  disabled={!table.getCanPreviousPage()}
  className="
    gap-1 rounded-xl
    border-violet-soft/30
    text-violet-soft
    hover:bg-violet-soft/10
  "
>

            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button
  variant="outline"
  size="sm"
  onClick={() => table.nextPage()}
  disabled={!table.getCanNextPage()}
  className="
    gap-1 rounded-xl
    border-blue-soft/30
    text-blue-soft
    hover:bg-blue-soft/10
  "
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
