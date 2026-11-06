import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { FeaturesTabs } from "@/components/landing/features-tabs";
import { Benefits } from "@/components/landing/benefits";
import { Process } from "@/components/landing/process";
import { Projects } from "@/components/landing/projects";
import { Testimonial } from "@/components/landing/testimonial";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturesTabs />
        <Benefits />
        <Process />
        <Projects />
        <Testimonial />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
