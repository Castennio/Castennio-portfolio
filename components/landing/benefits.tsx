import { benefits } from "@/lib/content/landing";

export function Benefits() {
  return (
    <section id="beneficios" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
            Por qué tu negocio lo necesita
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Herramientas simples que resuelven problemas reales del día a día.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-xl overflow-hidden">
          {benefits.map((benefit, i) => (
            <div key={i} className="bg-background p-6 md:p-10">
              <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
