import { ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 bg-gradient-to-b from-background via-background to-background/50">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Badge */}
        <div className="inline-block mb-6 px-4 py-2 bg-accent/40 rounded-full border border-primary/40">
          <span className="text-primary font-medium text-sm flex items-center gap-2">
            <Zap className="w-4 h-4" /> No uploads • 100% private
          </span>
        </div>

        <p className="mb-4 py-5 text-5xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          DigiWorks <span className="text-primary">PicX</span>
        </p>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
          Convert, upscale, and more — all processed locally on your device.
          No uploads, no limits, and no data ever leaves your computer.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:opacity-90 gap-2 h-12"
            asChild
          >
            <a href="#converter" className="flex items-center gap-2">
              Start Converting <ArrowRight className="w-5 h-5" />
            </a>
          </Button>

          <Button size="lg" variant="outline" className="h-12 bg-transparent" asChild>
            <a href="#how-it-works">
              How It Works
            </a>
          </Button>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 pt-8 border-t border-border">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-primary">0%</div>
            <div className="text-sm text-muted-foreground">Image uploaded</div>
          </div>

          <div>
            <div className="text-2xl md:text-3xl font-bold text-primary">∞</div>
            <div className="text-sm text-muted-foreground">Unlimited conversions</div>
          </div>

          <div>
            <div className="text-2xl md:text-3xl font-bold text-primary">2s</div>
            <div className="text-sm text-muted-foreground">Average processing</div>
          </div>
        </div>

      </div>
    </section>
  )
}