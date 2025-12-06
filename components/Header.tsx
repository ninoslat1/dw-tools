import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">BDS</span>
          </div>
          <span className="font-bold text-xl"></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="hover:text-primary transition">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-primary transition">
            How It Works
          </a>
        </div>
        <Button className="bg-primary text-primary-foreground hover:opacity-90 gap-2">
          Try Now <ArrowRight className="w-4 h-4" />
        </Button>
      </nav>
    </header>
  )
}
