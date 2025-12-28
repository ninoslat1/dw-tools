import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DownloadIcon, RefreshCwIcon, UploadCloudIcon } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "Upload Your Image",
    icon: <UploadCloudIcon width={32} height={32}/>,
    description: "Choose or drag and drop your image file",
  },
  {
    step: "02",
    title: "Instant Processing",
    icon: <RefreshCwIcon width={32} height={32}/>,
    description: "Our converter processes your image in real-time",
  },
  {
    step: "03",
    title: "Download Your Image",
    icon: <DownloadIcon width={32} height={32}/>,
    description: "Get your converted image file instantly",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Simple step to transforming your images</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {steps.map((item) => (
            <Card key={item.step} className="relative bg-card border-border">
              <CardHeader>
                <div className="text-4xl font-bold text-primary/30 mb-4 flex space-x-5 items-center justify-between">{item.step}<span className="text-slate-900">{item.icon}</span></div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}