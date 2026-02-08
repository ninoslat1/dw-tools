import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CTA() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold">
          Convert Your Images Instantly
        </h2>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Fast, high-quality conversion with zero setup — no login, no limits,
          completely free forever.
        </p>

        <Button
          asChild
          size="lg"
          className="bg-primary text-primary-foreground hover:opacity-90 gap-2 h-12 px-8"
        >
          <Link to="/history" className="flex items-center gap-2">
            Start Converting Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </Button>

        <p className="text-sm text-muted-foreground">
          Takes less than 5 seconds.
        </p>
      </div>
    </section>
  )
}
