import { Download } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { EXPECTED_STRUCTURE, TOAST_DURATION } from '@/lib/format'

export default function ExportButton() {
  const handleDownload = async () => {
    try {
      const root = await navigator.storage.getDirectory()

      const fileHandle = await root.getFileHandle(
        `${EXPECTED_STRUCTURE.database}.sqlite3`,
      )

      const file = await fileHandle.getFile()
      const blob = new Blob([await file.arrayBuffer()], {
        type: 'application/x-sqlite3',
      })

      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `${EXPECTED_STRUCTURE.database}.sqlite3`
      document.body.appendChild(a)
      a.click()
      a.remove()

      URL.revokeObjectURL(url)

      toast.success('Database Downloaded', {
        description: 'Database downloaded successfully.',
        duration: TOAST_DURATION,
        classNames: {
          success: '!bg-violet-soft/10 !text-violet-soft !font-is',
          description: '!text-violet-soft/75',
        },
      })
    } catch (error) {
      toast.error('Download Failed', {
        description:
          error instanceof Error ? error.message : 'Database file not found.',
        duration: TOAST_DURATION,
        classNames: {
          warning: '!bg-red-400/10 !text-black !font-is',
          description: '!text-red-400/75',
        },
      })
    }
  }

  return (
    <Button
      onClick={handleDownload}
      className="
        bg-violet-soft/80 text-white
        hover:bg-black
        rounded-xl
        shadow-md hover:shadow-lg
        transition duration-200
        hover:cursor-pointer
      "
    >
      <Download className="w-4 h-4 mr-2" />
      Export
    </Button>
  )
}
