import { ArrowRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section
      className="
  min-h-screen flex items-center justify-center 
  pt-20 px-4 
  bg-gradient-to-b from-violet-soft/10 via-blue-soft/5 to-background
  "
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div
          className="
          inline-flex items-center mb-6 px-4 py-2 
          bg-white/60 backdrop-blur-sm
          border border-violet-soft/20
          rounded-full shadow-sm
          "
        >
          <span className="font-medium text-sm flex items-center gap-2 text-violet-soft">
            <Zap className="w-4 h-4 text-blue-soft" />
            No uploads • 100% private
          </span>
        </div>

        <h1
          className="
          mb-4 text-6xl md:text-7xl font-bold tracking-wide 
          bg-gradient-to-r from-violet-soft to-blue-soft 
          bg-clip-text text-transparent font-is
          "
        >
          PicX
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto mb-8 text-balance font-is">
          <span className="font-dm font-bold text-violet-soft">Convert</span>,{' '}
          <span className="font-dm font-bold text-violet-soft">upscale</span>,
          and more — locally on your device. No uploads, no limits, and{' '}
          <span className="font-bold text-blue-soft inline-block animate-slide-collide">
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
            <a
              href="#converter"
              className="
  bg-violet-soft text-white 
  hover:bg-violet-600 
  gap-2 h-12 rounded-xl
  shadow-md hover:shadow-lg transition
"
            >
              Start Converting <ArrowRight className="w-5 h-5" />
            </a>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="
  h-12 border border-blue-soft 
  text-blue-soft bg-white 
  hover:bg-blue-soft/10 
  rounded-xl transition
  hover:text-blue-soft
"
            asChild
          >
            <a href="#how-it-works">How It Works</a>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 pt-8 border-t border-border">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-violet-soft/70">
              0%
            </div>

            <div className="text-sm text-muted-foreground">Image uploaded</div>
          </div>

          <div>
            <div className="text-2xl md:text-3xl font-bold text-blue-soft/70">
              ∞
            </div>

            <div className="text-sm text-muted-foreground">
              Unlimited conversions
            </div>
          </div>

          <div>
            <div className="text-2xl md:text-3xl font-bold text-violet-soft/70">
              2s
            </div>

            <div className="text-sm text-muted-foreground">
              Average processing
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
