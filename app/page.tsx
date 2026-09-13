import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problems from "./components/Problems";
import Process from "./components/Process";
import GlobalReach from "./components/GlobalReach";
import RocketLaunch from "./components/RocketLaunch";
import PreviewCTA from "./components/PreviewCTA";
import Documentation from "./components/Documentation";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import NeuralBackground from "./components/NeuralBackground";

export default function Home() {
  return (
    <>
      <NeuralBackground />
      <Navbar />
      <main className="relative z-[1]">
        <Hero />
        <Problems />
        <Process />
        <GlobalReach />
        <RocketLaunch />
        <PreviewCTA />
        <Documentation />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
