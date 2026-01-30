import { createFileRoute } from '@tanstack/react-router'
import Features from '@/components/Feature'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Dropzone from '@/components/Dropzone'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      {/* <HowItWorks /> */}
      <Dropzone/>
      {/* <CTA /> */}
      <Footer />
    </div>
  )
}
