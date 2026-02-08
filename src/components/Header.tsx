import { ArrowRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { $page } from '@/stores/$store'

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-3 items-center">
        {/* Kiri */}
        <div>
          <img src="/company-icon.svg" />
        </div>

        {/* Tengah (BENAR-BENAR CENTER) */}
        <div className="flex items-center justify-center gap-5">
          <Link
            to="/history"
            className="flex items-center gap-2 font-is text-violet-soft"
          >
            History
          </Link>
        </div>

        {/* Kanan */}
        <div className="flex justify-end">
          <Button
            className="bg-violet-soft text-primary-foreground hover:bg-violet-soft/90 gap-2"
            onClick={() => $page.set('convert')}
          >
            <a href="#converter" className="flex items-center gap-2 font-dm">
              Try Now <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </nav>
    </header>
  )
}
