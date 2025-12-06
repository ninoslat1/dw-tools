import CTA from "@/components/CTA";
import Dropzone from "@/components/Dropzone";
import Features from "@/components/Feature";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/Step";

export default function Home() {
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
  );
}
