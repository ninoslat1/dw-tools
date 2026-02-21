import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'

const NoHistory = () => {

  return (
    <div
      className={`p-12 text-center transition-colors bg-gray/10 w-full min-h-screen`}
    >
      <h3 className="text-lg font-semibold font-dm py-2 text-dark">
        No conversions yet
      </h3>
      <p className="text-muted-foreground py-2 font-is">
        Start converting images to see your history here
      </p>
      <p className="text-sm font-is mb-6 text-muted-foreground">
        or import the SQLite file{' '}
        <span
          onClick={() => window.location.href = "/converter/import"}
          className="underline hover:cursor-pointer"
        >
          here
        </span>
      </p>

      <Button
        className="
                    max-w-sm
                    rounded-xl
                    border-dark/20
                    focus-visible:ring-0
                    focus-visible:ring-offset-0
                    focus:shadow-none
                    focus:outline-none
                    font-is
                "
      >
        <a href="/#converter" className="flex items-center gap-5">
          <ArrowRight className="w-4 h-4" />
          Start Converting
        </a>
      </Button>
    </div>
  )
}

export default NoHistory