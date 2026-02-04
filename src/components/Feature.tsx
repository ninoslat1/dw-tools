
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: '⚡',
    bg: "bg-yellow-100/50",
    title: "Lightning Fast",
    description: "Transform your images in seconds with an optimized, local-first engine.",
  },
  {
    icon: '🔒',
    bg: "bg-yellow-100/50",
    title: "Secure & Private",
    description: "Everything runs directly in your browser-no uploads, no tracking.",
  },
  {
    icon: '📱',
    bg: "bg-sky-100/50",
    title: "Mobile Friendly",
    description: "A smooth and responsive experience on desktop, tablet, and mobile devices.",
  },
  {
    icon: '♾️',
    bg: "bg-fuchsia-100/50",
    title: "Unlimited Conversions",
    description: "Transform as many images as you want-no limits, no restrictions.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        
        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-violet-soft font-dm">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-is">
            Designed to give you a seamless, fast, and private image conversion experience.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className={`${feature.bg} border-none text-black font-dm`}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-is">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}
