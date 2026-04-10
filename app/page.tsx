import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Challenges from "./components/Challenges";
import Diagnosis from "./components/Diagnosis";
import Process from "./components/Process";
import Pricing from "./components/Pricing";
import WhyUs from "./components/WhyUs";
import Team from "./components/Team";
import Experience from "./components/Experience";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-[#050505]">
        <Hero />
        <Challenges />
        <Diagnosis />
        <Process />
        <Pricing />
        <WhyUs />
        <Team />
        <Experience />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
