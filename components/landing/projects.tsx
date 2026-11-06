import Image from "next/image";
import { projects } from "@/lib/content/landing";

export function Projects() {
  if (projects.length === 0) return null;

  return (
    <section id="proyectos" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
            Proyectos
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Plataformas que hemos construido para negocios reales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <a
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-border rounded-xl overflow-hidden bg-card hover:shadow-md transition-shadow"
            >
              <div className="aspect-[3/2] relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="text-xs font-medium text-muted-foreground mb-1">
                  {project.type}
                </div>
                <h3 className="font-semibold text-lg mb-2">{project.client}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
