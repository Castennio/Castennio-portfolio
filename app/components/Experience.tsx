"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    id: "dani",
    name: "Daniel",
    role: "Desarrollo Frontend",
    image: "/images/pixel-art/dani.png",
    bio: "Desarrollador frontend creando interfaces modernas y responsivas. Apasionado por las animaciones y la experiencia de usuario.",
    projects: [
      {
        title: "INK BUSINESS - Finanzas personales con escritura natural",
        description:
          "Aplicación de finanzas personales que transforma la forma tradicional de registrar ingresos y gastos, por medio de la detección de dibujos.",
        image: "/images/projects/placeholder-1.png",
        technologies: ["React", "Next.js", "TypeScript", "Tailwind"],
        link: "https://ink-business.vercel.app",
      },
      {
        title: "Proyecto clínica - Dr. Cirujano",
        description:
          "Landing Page + Panel administrativo + Gestión de reservas (Google Calendar) + Catálogo de servicios + Reportes + CMS de Blogs",
        image: "/images/projects/placeholder-2.png",
        technologies: ["React", "Next.js", "TypeScript", "Tailwind"],
        link: "https://drmanuelsinchi.com",
      },
      {
        title: "VERIFICARLO - Revisión de autos de segunda",
        description:
          "Landing Page + Panel administrativo + Gestión de inspecciones + Catálogo de servicios + Mensajes al correo + CMS de Blogs",
        image: "/images/projects/placeholder-3.png",
        technologies: ["React", "Next.js", "TypeScript", "Tailwind"],
        link: "https://verificarlo.com",
      },
    ],
  },
  {
    id: "josue",
    name: "Josue",
    role: "Desarrollo",
    image: "/images/pixel-art/josue.png",
    bio: "Desarrollador fullstack con experiencia en tecnologías modernas. Apasionado por crear soluciones innovadoras y de alta calidad.",
    projects: [],
  },
];

const allProjects = teamMembers.flatMap((member) =>
  member.projects.map((project) => ({
    ...project,
    author: member.name,
    authorImage: member.image,
  }))
);

export default function Experience() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const currentMember = teamMembers.find((m) => m.id === selectedMember);
  const displayProjects = selectedMember
    ? allProjects.filter((p) => p.author === currentMember?.name)
    : allProjects;

  useEffect(() => {
    carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [selectedMember]);

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-4">
            Portafolio
          </p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight">
            Nuestras experiencias
          </h2>
          <p className="text-muted-foreground text-sm mt-4 max-w-xl mx-auto">
            Proyectos destacados de nuestro equipo antes de formar Castennio
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <Button
            variant={!selectedMember ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setSelectedMember(null)}
          >
            Todos
          </Button>
          {teamMembers.map((member) => (
            <Button
              key={member.id}
              variant={selectedMember === member.id ? "default" : "outline"}
              size="sm"
              className="rounded-full gap-2"
              onClick={() => setSelectedMember(member.id)}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-4 h-4 rounded-full"
                style={{ imageRendering: "pixelated" }}
              />
              {member.name}
            </Button>
          ))}
        </div>

        {/* Member bio */}
        {selectedMember && currentMember && (
          <div className="mb-10 p-6 rounded-xl border border-border bg-card">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-5">
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-border bg-secondary shrink-0">
                <img
                  src={currentMember.image}
                  alt={currentMember.name}
                  className="w-full h-full object-cover"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg font-medium">{currentMember.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{currentMember.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                  {currentMember.bio}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Carousel */}
        <div className="relative">
          {displayProjects.length > 3 && (
            <>
              <button
                onClick={() => carouselRef.current?.scrollBy({ left: -340, behavior: "smooth" })}
                className="absolute -left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-border bg-background flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => carouselRef.current?.scrollBy({ left: 340, behavior: "smooth" })}
                className="absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-border bg-background flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto scroll-smooth pb-4 px-1 md:px-10 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {displayProjects.map((project, i) => (
              <div key={`${project.author}-${i}`} className="flex-shrink-0 w-[300px] sm:w-[340px] snap-start">
                <div className="h-full rounded-xl border border-border bg-card overflow-hidden group">
                  <div className="relative h-48 overflow-hidden bg-secondary">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border text-xs font-medium">
                      <img
                        src={project.authorImage}
                        alt={project.author}
                        className="w-4 h-4 rounded-full"
                        style={{ imageRendering: "pixelated" }}
                      />
                      {project.author}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-medium text-base mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] rounded-md bg-secondary border border-border text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                    >
                      Ver proyecto
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-muted-foreground text-xs mt-12">
          Proyectos realizados individualmente antes de formar el equipo
        </p>
      </div>
    </section>
  );
}
