import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Challenges from "./components/Challenges";
import Services from "./components/Services";
import Process from "./components/Process";
import Diagnosis from "./components/Diagnosis";
import WhyUs from "./components/WhyUs";
import Team from "./components/Team";
import Experience from "./components/Experience";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0f]">
        <Hero />
        <Challenges />
        <Services />
        <Process />
        <Diagnosis />
        <WhyUs />
        <Team />
        <Experience />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
