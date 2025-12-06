'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Shield, Smartphone, Settings } from "lucide-react"

const features = [
  {
    icon: '⚡',
    title: "Lightning Fast",
    description: "Convert images in just seconds with our optimized processing engine",
  },
  {
    icon: '🔒',
    title: "Secure & Private",
    description: "All conversions happen locally. Your images never leave your device",
  },
  {
    icon: '📱',
    title: "Mobile Friendly",
    description: "Works perfectly on desktop, tablet, and mobile devices",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for seamless image conversion
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            
            return (
              <Card key={feature.title} className="bg-card border-border hover:border-primary/50 transition">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
