"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";
import { WordReveal, GradientReveal } from "./TextReveal";

const projects = [
  {
    id: 1,
    title: "TechStart",
    category: "Landing Page",
    description: "Página de captación para startup de software",
    image: "/images/portfolio/techstart.jpg",
    metrics: { label: "+120%", description: "conversiones" },
    tags: ["Next.js", "Tailwind", "Vercel"],
    color: "#14B8A6",
  },
  {
    id: 2,
    title: "Clínica Dental Sonríe",
    category: "Web + Reservas",
    description: "Sistema de citas online integrado con Google Calendar",
    image: "/images/portfolio/clinica.jpg",
    metrics: { label: "+85%", description: "citas online" },
    tags: ["React", "Node.js", "Calendar API"],
    color: "#F59E0B",
  },
  {
    id: 3,
    title: "Importadora Lima",
    category: "E-commerce",
    description: "Tienda online con catálogo de 500+ productos",
    image: "/images/portfolio/ecommerce.jpg",
    metrics: { label: "3x", description: "ventas mensuales" },
    tags: ["Shopify", "Custom Theme", "SEO"],
    color: "#2DD4BF",
  },
  {
    id: 4,
    title: "Estudio Contable MR",
    category: "Web Corporativa",
    description: "Presencia digital profesional con blog integrado",
    image: "/images/portfolio/contable.jpg",
    metrics: { label: "+200%", description: "tráfico orgánico" },
    tags: ["WordPress", "SEO", "Blog"],
    color: "#14B8A6",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <FadeIn delay={index * 0.1}>
      <div
        className="group relative rounded-2xl overflow-hidden bg-[#0D1414] border border-white/[0.06] hover:border-teal-500/20 transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#152020]">
          {/* Placeholder gradient - replace with actual images */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `linear-gradient(135deg, ${project.color}40 0%, transparent 50%)`,
            }}
          />

          {/* Mockup placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[80%] h-[70%] rounded-lg bg-[#1E2A2A] border border-white/[0.08] shadow-2xl overflow-hidden">
              {/* Browser chrome mockup */}
              <div className="h-6 bg-[#152020] border-b border-white/[0.06] flex items-center px-3 gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
              </div>
              <div className="p-4 space-y-2">
                <div className="h-3 w-1/3 rounded bg-white/[0.06]" />
                <div className="h-2 w-2/3 rounded bg-white/[0.04]" />
                <div className="h-2 w-1/2 rounded bg-white/[0.04]" />
                <div className="mt-4 h-16 rounded bg-white/[0.03]" />
              </div>
            </div>
          </div>

          {/* Hover overlay with metrics */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-[#050A0A] via-[#050A0A]/80 to-transparent flex items-end justify-center pb-8 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="text-center">
              <div
                className="text-4xl font-bold mb-1"
                style={{ color: project.color }}
              >
                {project.metrics.label}
              </div>
              <div className="text-sm text-white/60">{project.metrics.description}</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p
                className="text-[11px] uppercase tracking-wider mb-1"
                style={{ color: project.color }}
              >
                {project.category}
              </p>
              <h3 className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">
                {project.title}
              </h3>
            </div>
            {/* Arrow */}
            <div
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                isHovered
                  ? "border-teal-500/30 bg-teal-500/10"
                  : "border-white/[0.08] bg-transparent"
              }`}
            >
              <svg
                className={`w-4 h-4 transition-all duration-300 ${
                  isHovered ? "text-teal-400 translate-x-0.5 -translate-y-0.5" : "text-white/30"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
          </div>

          <p className="text-sm text-white/50 mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/40 bg-white/[0.03] border border-white/[0.06] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default function Portfolio() {
  return (
    <section id="portafolio" className="py-16 lg:py-20 px-6 bg-[#050A0A] relative">
      {/* Subtle top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <FadeIn>
              <p className="text-[13px] text-white/50 tracking-widest uppercase mb-4">
                Proyectos
              </p>
            </FadeIn>
            <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.02em]">
              <WordReveal as="span" className="text-white/90" delay={0.1}>
                Resultados
              </WordReveal>{" "}
              <GradientReveal
                as="span"
                className="inline-block"
                delay={0.3}
                gradientFrom="#14B8A6"
                gradientTo="#2DD4BF"
              >
                que hablan
              </GradientReveal>
            </h2>
          </div>

          <FadeIn delay={0.2}>
            <a
              href="#diagnostico"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
            >
              <span>Quiero resultados así</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </FadeIn>
        </div>

        {/* Projects Grid */}
        
        <div className="grid md:grid-cols-2 gap-6">
          
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <p className="text-white/40 text-sm mb-4">
              Cada proyecto es único. El tuyo también lo será.
            </p>
            <a
              href="#diagnostico"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-[#050A0A] font-semibold text-sm rounded-full transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:scale-105"
            >
              <span>Empezar mi proyecto</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
