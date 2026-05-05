import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problems from "./components/Problems";
import Plans from "./components/Plans";
import Services from "./components/Services";
import Process from "./components/Process";
import Diagnosis from "./components/Diagnosis";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0f]">
        <Hero />
        <Problems />
        <Plans />
        <Services />
        <Process />
        <Diagnosis />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
