import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: '⚡',
    accent: 'violet',
    title: 'Lightning Fast',
    description:
      'Transform your images in seconds with an optimized, local-first engine.',
  },
  {
    icon: '🔒',
    accent: 'blue',
    title: 'Secure & Private',
    description:
      'Everything runs directly in your browser—no uploads, no tracking.',
  },
  {
    icon: '📱',
    accent: 'violet',
    title: 'Mobile Friendly',
    description:
      'A smooth and responsive experience on desktop, tablet, and mobile devices.',
  },
  {
    icon: '♾️',
    accent: 'blue',
    title: 'Unlimited Conversions',
    description:
      'Transform as many images as you want—no limits, no restrictions.',
  },
]

export default function Features() {
  return (
    <section
      id="features"
      className="
  py-20 px-4 
  bg-gradient-to-b from-background via-violet-soft/5 to-blue-soft/5
  "
    >
      <div className="max-w-6xl mx-auto">
        {/* Headline */}
        <div className="text-center mb-16">
          <h2
            className="
  text-4xl md:text-5xl font-bold mb-4 
  bg-gradient-to-r from-violet-soft to-blue-soft 
  bg-clip-text text-transparent font-dm
  "
          >
            Powerful Features
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-is">
            Designed for a seamless, fast, and private image conversion
            experience.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="
              hover:cursor-pointer
  bg-white/60 backdrop-blur-sm 
  border border-violet-soft/10 
  rounded-2xl 
  shadow-sm hover:shadow-md 
  hover:-translate-y-1
  transition-all duration-200
"
            >
              <CardHeader>
                <div
                  className={`
                    w-12 h-12 rounded-xl 
                    flex items-center justify-center mb-4
                    ${
                      feature.accent === 'violet'
                        ? 'bg-violet-soft/15'
                        : 'bg-blue-soft/15'
                    }
                  `}
                >
                  <span
                    className={`text-2xl ${
                      feature.accent === 'violet'
                        ? 'text-violet-soft'
                        : 'text-blue-soft'
                    }`}
                  >
                    {feature.icon}
                  </span>
                </div>

                <CardTitle className="font-dm text-xl font-bold text-violet-soft">
                  {feature.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm font-is text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
