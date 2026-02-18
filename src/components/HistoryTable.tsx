import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowLeft, ChevronLeft, ChevronRight, DeleteIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'
import { Input } from './ui/input'
import NoHistory from './NoHistory'
import LoadingHistory from './LoadingHistory'
import ExportButton from './ExportButton'
import type { PaginationState, SortingState } from '@tanstack/react-table'
import type { TSortColumn } from '@/types/page-query'
import { conversionService } from '@/services/conversion'
import { ConversionTableSchema } from '@/schemas/conversion'
import { TOAST_DURATION } from '@/lib/format'
import { Route } from '@/routes/history.route'

const HistoryTable = () => {
  const columnHelper = createColumnHelper<TRecord>()
  const searchParams = Route.useSearch()
  const navigate = Route.useNavigate()

  const { page, pageSize, search, sort, dir } = searchParams
  const [conversions, setConversions] = useState<Array<TRecord>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [inputValue, setInputValue] = useState(search)

  const allowedSortColumns: Array<TSortColumn> = [
    'timestamp',
    'imageUrl',
    'sourceFormat',
    'targetFormat',
  ]

  useEffect(() => {
    setInputValue(search)
  }, [search])

  const pagination: PaginationState = {
    pageIndex: page,
    pageSize,
  }

  const sorting: SortingState = [
    {
      id: sort,
      desc: dir === 'desc',
    },
  ]

  const loadConversionHistory = useCallback(async () => {
    try {
      setIsLoading(true)

      const { rows, total } = await conversionService.getConversions({
        pageIndex: page,
        pageSize,
        sortColumn: sort,
        sortDirection: dir.toUpperCase(),
        nameFilter: search,
      })

      const processed = rows.map((item: any) => {
        let finalUrl = ''
        let blob: Blob | null = null

        if (item.imageBlob) {
          blob = new Blob([item.imageBlob], {
            type: `image/${item.targetFormat.toLowerCase()}`,
          })
          finalUrl = URL.createObjectURL(blob)
        }

        return {
          id: item.uid,
          timestamp: new Date(item.timestamp).getTime(),
          sourceFormat: item.sourceFormat,
          targetFormat: item.targetFormat,
          filename: item.imageUrl,
          imageBlob: blob!,
          imageUrl: finalUrl,
        }
      })

      setConversions(processed)
      setTotalCount(total)
    } catch (error) {
      console.error(error)
      toast.warning('Error Load Conversion', {
        description: `Failed to load conversion history: ${error instanceof Error ? error.message : 'Internal Server Error'}`,
        duration: TOAST_DURATION,
        classNames: {
          warning: '!bg-yellow-300/10 !text-black !font-is',
          description: '!text-black',
        },
      })
    } finally {
      setIsLoading(false)
    }
  }, [page, pageSize, sort, dir, search])

  const handleDelete = useCallback(
    async (id: string) => {
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
            description: 'text-xs text-muted-foreground !text-violet-soft/75',
            success: '!bg-violet-soft/10 !text-violet-soft !font-is',
          },
        })

        if (conversions.length === 1 && page > 0) {
          navigate({
            search: (prev) => ({
              ...prev,
              page: page - 1,
            }),
          })
        } else {
          await loadConversionHistory()
        }
      } catch (error) {
        toast.warning('Error Delete Conversion', {
          description: `Failed to delete conversion history: ${error instanceof Error ? error.message : 'Internal Server Error'}`,
          duration: TOAST_DURATION,
          classNames: {
            warning: '!bg-yellow-300/10 !text-black !font-is',
            description: '!text-yellow-300/75',
          },
        })
      }
    },
    [loadConversionHistory],
  )

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
    data: conversions,
    columns,
    pageCount: Math.ceil(totalCount / pagination.pageSize),
    state: { pagination, sorting },
    manualPagination: true,
    manualSorting: true,
    onPaginationChange: (updater) => {
      const next = typeof updater === 'function' ? updater(pagination) : updater

      navigate({
        search: (prev) => ({
          ...prev,
          page: next.pageIndex,
          pageSize: next.pageSize,
        }),
      })
    },
    onSortingChange: (updater) => {
      const next = typeof updater === 'function' ? updater(sorting) : updater

      const first = next[0]

      const safeSort: TSortColumn =
        first && allowedSortColumns.includes(first.id as TSortColumn)
          ? (first.id as TSortColumn)
          : 'timestamp'

      navigate({
        search: (prev) => ({
          ...prev,
          sort: safeSort,
          dir: first?.desc ? 'desc' : 'asc',
        }),
      })
    },
    getCoreRowModel: getCoreRowModel(),
  })

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
    return <LoadingHistory />
  }

  if (!isLoading && totalCount === 0 && search === "") {
    return <NoHistory />
  }

  return (
    <div
      className="
  w-full py-8 px-4 
  min-h-screen
  bg-gradient-to-b from-violet-soft/8 via-blue-soft/5 to-background
"
    >
      <div
        className="
  overflow-x-auto space-y-4
  bg-white/60 backdrop-blur-sm 
  border border-violet-soft/10 
  rounded-2xl shadow-sm p-4
"
      >
        <div className="flex gap-3 items-center px-5">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-violet-soft hover:text-violet-soft duration-200 hover:bg-violet-soft/10 font-is"
          >
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft /> Back
            </Link>
          </Button>

          <Input
            type="text"
            placeholder="Filter by file name..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                navigate({
                  search: (prev) => ({
                    ...prev,
                    search: inputValue,
                    page: 0,
                  }),
                })
              }
            }}
            className="
  max-w-sm
  rounded-xl
  border-violet-soft/20
  focus-visible:ring-0
  focus-visible:ring-offset-0
  focus:shadow-none
  focus:outline-none
  font-is
"
          />

          {search && (
            <div className="flex items-center justify-between w-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      search: '',
                      page: 0,
                    }),
                  })
                }
                className="text-blue-soft hover:bg-blue-soft/10 hover:text-blue-soft hover:cursor-pointer"
              >
                Clear
              </Button>

              <div className="text-sm text-muted-foreground block">
                Showing {conversions.length} of {totalCount} results
              </div>
            </div>
          )}
          <div className="ml-auto">
            <ExportButton />
          </div>
        </div>

        <table className="w-full text-sm border-separate border-spacing-0 table-fixed">
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
    hover:cursor-pointer
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
    border-violet-soft/30
    text-violet-soft
    hover:bg-violet-soft/10
    hover:cursor-pointer
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
