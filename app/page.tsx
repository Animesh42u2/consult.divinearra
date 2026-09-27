// app/page.tsx
import Hero from "@/components/Hero";
import FeelingUncertain from "@/components/Feelinguncertain";
import ConsultationIntro from "@/components/Consultationintro";
import WhyDifferent from "@/components/Whydifferent";
import HowItWorks from "@/components/Howitworks";
import ConsultationOffer from "@/components/Consultationoffer ";
import AboutAstrologer from "@/components/Aboutastrologer";
import FAQ from "@/components/Faq";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/Cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeelingUncertain />
      <ConsultationIntro />
      <WhyDifferent />
      <HowItWorks />
      <ConsultationOffer />
      <AboutAstrologer />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  );
}