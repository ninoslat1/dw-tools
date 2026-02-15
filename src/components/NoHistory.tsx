import { ArrowRight } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Button } from './ui/button'

const NoHistory = () => {
  const navigate = useNavigate()
  
  return (
    <div
      className={`p-12 text-center transition-colors bg-violet-50 w-full min-h-screen`}
    >
      <h3 className="text-lg font-semibold font-dm py-2 text-violet-soft">
        No conversions yet
      </h3>
      <p className="text-muted-foreground py-2 font-is">
        Start converting images to see your history here
      </p>
      <p className="text-sm font-is mb-6 text-muted-foreground">
        or import the SQLite file{' '}
        <span onClick={() => navigate({to:"/import"})} className="underline hover:cursor-pointer">
          here
        </span>
      </p>

      <Button
        className="
                    bg-violet-soft text-white 
                    hover:bg-violet-600 
                    rounded-xl shadow-sm
                    gap-2
                    font-is
                "
      >
        <Link to="/" className="flex items-center gap-5">
          <ArrowRight className="w-4 h-4" />
          Start Converting
        </Link>
      </Button>
    </div>
  )
}

export default NoHistory
