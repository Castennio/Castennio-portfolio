import Navbar from "../components/Navbar";
import Team from "../components/Team";
import Experience from "../components/Experience";
import Footer from "../components/Footer";

export const metadata = {
  title: "Equipo | Castennio",
  description: "Conoce al equipo detrás de Castennio y los proyectos que hemos desarrollado.",
};

export default function EquipoPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0f] pt-24">
        <Team />
        <Experience />
      </main>
      <Footer />
    </>
  );
}
