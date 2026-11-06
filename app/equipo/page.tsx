import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import Team from "../components/Team";
import Experience from "../components/Experience";

export const metadata = {
  title: "Equipo | Castennio",
  description: "Conoce al equipo detrás de Castennio y los proyectos que hemos desarrollado.",
};

export default function EquipoPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Team />
        <Experience />
      </main>
      <Footer />
    </>
  );
}
