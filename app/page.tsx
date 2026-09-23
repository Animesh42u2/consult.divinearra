// app/page.tsx
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/Whychooseus";
import AboutAstrologer from "@/components/Aboutastrologer";
import CTA from "@/components/Cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <WhyChooseUs />
      <AboutAstrologer />
      <CTA />
    </main>
  );
}