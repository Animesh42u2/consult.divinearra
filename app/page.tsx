// app/page.tsx
import Hero from "@/components/Hero";
import FeelingUncertain from "@/components/Feelinguncertain";
import WhatCanWeDiscuss from "@/components/Whatcanwediscuss";
import WhyDifferent from "@/components/Whydifferent";
import HowItWorks from "@/components/Howitworks";
import ConsultationOffer from "@/components/Consultationoffer ";
import WhyChooseUs from "@/components/Whychooseus";
import AboutAstrologer from "@/components/Aboutastrologer";
import FAQ from "@/components/Faq";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/Cta";
import Scrollbutton from "@/components/Scrollbutton";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeelingUncertain />
      <WhatCanWeDiscuss />
      <WhyDifferent />
      <HowItWorks />
      <ConsultationOffer />
      <WhyChooseUs />
      <AboutAstrologer />
      <Testimonials />
      <FAQ />
      <CTA />
      <Scrollbutton />
    </main>
  );
}