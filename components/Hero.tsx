import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 bg-gradient-to-b from-background via-background to-background/50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-accent/40 rounded-full border border-primary/40">
          <span className="text-primary font-medium text-sm flex items-center gap-2">
            <Zap className="w-4 h-4" /> Instant conversion • No upload limits
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
          Convert your image
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> instantly</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
          Transform your images in seconds. No downloads, no registration. <span className="text-yellow-600 font-semibold">Fast</span>, <span className="font-semibold text-lime-600">free</span>, and completely <span className="font-semibold text-red-500">secure</span> image
          conversion at your fingertips.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-primary text-primary-foreground hover:opacity-90 gap-2 h-12">
            Start Converting <ArrowRight className="w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="h-12 bg-transparent">
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 pt-8 border-t border-border">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-primary">∞</div>
            <div className="text-sm text-muted-foreground">Local Save</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-primary">100%</div>
            <div className="text-sm text-muted-foreground">Free & secure</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-primary">2s</div>
            <div className="text-sm text-muted-foreground">Average time</div>
          </div>
        </div>
      </div>
    </section>
  )
}
