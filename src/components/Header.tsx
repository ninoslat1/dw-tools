import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import CompanyIcon from "./CompanyIcon"
import { Link } from "@tanstack/react-router"

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <CompanyIcon/>
        
        <Link to="/docs" className="flex items-center gap-2">
            Documentation
          </Link>

        <Button className="bg-primary text-primary-foreground hover:opacity-90 gap-2">
          <Link to="/convert" className="flex items-center gap-2">
            Try Now <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </nav>
    </header>
  )
}