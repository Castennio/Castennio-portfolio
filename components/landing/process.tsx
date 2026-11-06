import { processSteps } from "@/lib/content/landing";

export function Process() {
  return (
    <section id="proceso" className="py-16 md:py-24 px-4 sm:px-6 bg-secondary">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
            Cómo trabajamos
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Un proceso claro, sin sorpresas, pensado para que entiendas cada paso.
          </p>
        </div>

        <div className="space-y-6">
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="bg-background border border-border rounded-xl p-6 md:p-8 flex gap-5 items-start"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-semibold">
                {step.number}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
