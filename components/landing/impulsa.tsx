import Image from "next/image";

const challenges = [
  {
    name: "Apparka",
    logo: "/images/empresas/apparka.jpg",
    description:
      "Propuestas de solución estratégica para mejorar la experiencia del servicio de estacionamiento urbano.",
  },
  {
    name: "OXXO",
    logo: "/images/empresas/oxxo.png",
    description:
      "Desarrollo de una app móvil inspirada en inDrive para optimizar la logística de entregas y pedidos.",
  },
  {
    name: "NTT DATA",
    logo: "/images/empresas/nttdata.png",
    description:
      "Sistema bancario accesible donde menos es más: interfaces simplificadas para adultos mayores y personas con discapacidades.",
  },
];

export function Impulsa() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs sm:text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            Programa IMPULSA
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
            3 retos. 3 victorias.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Empresas reales nos plantearon problemas reales. Nuestra solución fue elegida como la mejor en cada uno.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border rounded-xl overflow-hidden">
          {challenges.map((c) => (
            <div key={c.name} className="bg-background p-6 md:p-8 flex flex-col items-center text-center gap-4">
              <div className="relative h-10 w-28 grayscale opacity-70">
                <Image
                  src={c.logo}
                  alt={c.name}
                  fill
                  className="object-contain"
                  sizes="112px"
                />
              </div>
              <h3 className="font-semibold text-lg">{c.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {c.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
