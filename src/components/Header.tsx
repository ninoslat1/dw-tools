import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-background/50 backdrop-blur-sm border-b border-border z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-3 items-center">
        <div>
          <img src="/company-icon.svg" />
        </div>

        <div className="flex items-center justify-center gap-5">
          
        </div>

        <div className="flex justify-end">
          <Link
            to="/history"
            search={{
              page: 0,
              pageSize: 10,
              search: '',
              sort: 'timestamp',
              dir: 'desc',
            }}
            className="flex items-center gap-2 font-is text-violet-soft"
          >
            Images
          </Link>
        </div>
      </nav>
    </header>
  )
}
