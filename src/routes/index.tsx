import CTA from '@/components/CTA'
import Features from '@/components/Feature'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/Step'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      {/* <Dropzone/> */}
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  )
}
