
import Header from "../components/Header";
import CTA from "../components/CTA";
import Features from "../components/Feature";
import Footer from "../components/Footer";

import Hero from "../components/Hero";
import HowItWorks from "../components/Step";

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
