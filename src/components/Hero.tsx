import { ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 bg-gradient-to-b from-background via-background to-background/50">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Badge */}
        <div className="inline-block text-is mb-6 px-4 py-2 bg-linear-to-r from-violet-soft to-blue-soft text-transparent bg-clip-text rounded-full">
          <span className="font-medium text-sm flex items-center gap-2">
            <Zap className="w-4 h-4" /> No uploads • 100% private
          </span>
        </div>

        <p className="mb-4 py-5 text-5xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          <span className="text-violet-soft font-is">PicX</span>
        </p>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-violet-soft max-w-2xl mx-auto mb-8 text-balance font-is">
          <span className="font-dm font-bold">Convert</span>,{" "}
          <span className="font-dm font-bold">upscale</span>, and more — locally on your device.{" "} No uploads, no limits, and{" "}
          <span className="inline-block animate-slide-collide">
            no data ever leaves your computer.
          </span>
        </p>


        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-violet-soft text-primary-foreground hover:bg-violet-soft/90 gap-2 h-12"
            asChild
          >
            <a href="#converter" className="flex items-center gap-2">
              Start Converting <ArrowRight className="w-5 h-5" />
            </a>
          </Button>

          <Button size="lg" variant="outline" className="h-12 bg-transparent hover:bg-blue-100 text-blue-soft hover:text-blue-soft/90" asChild>
            <a href="#how-it-works">
              How It Works
            </a>
          </Button>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 pt-8 border-t border-border">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-green-500/50">0%</div>
            <div className="text-sm text-muted-foreground">Image uploaded</div>
          </div>

          <div>
            <div className="text-2xl md:text-3xl font-bold text-blue-soft/50">∞</div>
            <div className="text-sm text-muted-foreground">Unlimited conversions</div>
          </div>

          <div>
            <div className="text-2xl md:text-3xl font-bold text-yellow-500/50">2s</div>
            <div className="text-sm text-muted-foreground">Average processing</div>
          </div>
        </div>

      </div>
    </section>
  )
}