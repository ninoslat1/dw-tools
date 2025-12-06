import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function CTA() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to convert?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Start converting your images today. It's free, fast, and requires no registration.
        </p>
        <Button size="lg" className="bg-primary text-primary-foreground hover:opacity-90 gap-2 h-12">
          <Link href="/img-converter" className="flex items-center gap-2">
            Convert Your Images <ArrowRight className="w-5 h-5" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
