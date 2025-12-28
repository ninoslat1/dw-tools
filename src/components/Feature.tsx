
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: '⚡',
    title: "Lightning Fast",
    description: "Convert large images in seconds with an optimized, local-first engine.",
  },
  {
    icon: '🔒',
    title: "Secure & Private",
    description: "Everything runs directly in your browser—no uploads, no tracking, no servers.",
  },
  {
    icon: '📱',
    title: "Mobile Friendly",
    description: "A smooth and responsive experience on desktop, tablet, and mobile devices.",
  },
  {
    icon: '♾️',
    title: "Unlimited Conversions",
    description: "Convert as many images as you want with zero limits and zero restrictions.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        
        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Designed to give you a seamless, fast, and private image conversion experience.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-card border-border hover:border-primary/50 transition">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}
