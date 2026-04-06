"use client";

import { useState, useRef, useEffect } from "react";
import FadeIn, { StaggerFadeIn } from "./FadeIn";
import { WordReveal, GradientReveal } from "./TextReveal";

// Datos de los integrantes con su trayectoria y proyectos
const teamMembers = [
  {
    id: "dani",
    name: "Dani",
    role: "Desarrollo Frontend",
    image: "/images/pixel-art/dani.png",
    bio: "Desarrollador frontend con 3 años de experiencia creando interfaces modernas y responsivas. Apasionado por las animaciones y la experiencia de usuario.",
    projects: [
      {
        title: "E-commerce Fashion Store",
        description: "Tienda online completa con carrito de compras, pasarela de pagos y panel de administración.",
        image: "/images/projects/placeholder-1.jpg",
        technologies: ["React", "Next.js", "Stripe", "Tailwind"],
        link: "#",
      },
      {
        title: "Dashboard Analytics",
        description: "Panel de control con visualización de datos en tiempo real y reportes automatizados.",
        image: "/images/projects/placeholder-2.jpg",
        technologies: ["Vue.js", "D3.js", "Firebase"],
        link: "#",
      },
    ],
  },
  {
    id: "brack",
    name: "Brack",
    role: "Diseño UI/UX",
    image: "/images/pixel-art/brack.png",
    bio: "Diseñador UI/UX con enfoque en crear experiencias digitales memorables. Especializado en design systems y prototipado interactivo.",
    projects: [
      {
        title: "App Fintech Redesign",
        description: "Rediseño completo de aplicación bancaria mejorando la usabilidad y modernizando la interfaz.",
        image: "/images/projects/placeholder-3.jpg",
        technologies: ["Figma", "Principle", "Design System"],
        link: "#",
      },
      {
        title: "Plataforma Educativa",
        description: "Diseño de plataforma e-learning con gamificación y seguimiento de progreso.",
        image: "/images/projects/placeholder-4.jpg",
        technologies: ["Figma", "Framer", "Lottie"],
        link: "#",
      },
    ],
  },
  {
    id: "alonso",
    name: "Alonso",
    role: "Backend Developer",
    image: "/images/pixel-art/alonso.png",
    bio: "Desarrollador backend especializado en arquitecturas escalables y APIs robustas. Experiencia en sistemas de alta disponibilidad.",
    projects: [
      {
        title: "API Gateway Microservicios",
        description: "Sistema de microservicios con autenticación centralizada y balanceo de carga.",
        image: "/images/projects/placeholder-5.jpg",
        technologies: ["Node.js", "Docker", "Redis", "PostgreSQL"],
        link: "#",
      },
      {
        title: "Sistema de Reservas",
        description: "Backend para sistema de reservas en tiempo real con notificaciones push.",
        image: "/images/projects/placeholder-6.jpg",
        technologies: ["Python", "FastAPI", "MongoDB", "WebSockets"],
        link: "#",
      },
    ],
  },
  {
    id: "gabriel",
    name: "Gabriel",
    role: "Fullstack Developer",
    image: "/images/pixel-art/gabriel.png",
    bio: "Desarrollador fullstack con visión integral de productos digitales. Experiencia desde el diseño de bases de datos hasta interfaces de usuario.",
    projects: [
      {
        title: "CRM Inmobiliario",
        description: "Sistema completo de gestión de propiedades con portal para clientes y agentes.",
        image: "/images/projects/placeholder-7.jpg",
        technologies: ["Next.js", "Prisma", "PostgreSQL", "AWS"],
        link: "#",
      },
      {
        title: "App de Delivery",
        description: "Aplicación de delivery con tracking en tiempo real y sistema de pagos integrado.",
        image: "/images/projects/placeholder-8.jpg",
        technologies: ["React Native", "Node.js", "Socket.io", "Stripe"],
        link: "#",
      },
    ],
  },
  {
    id: "josue",
    name: "Josue",
    role: "Desarrollo",
    image: "/images/pixel-art/josue.jpeg",
    bio: "Desarrollador con pasión por crear soluciones eficientes y código limpio. Enfocado en buenas prácticas y arquitectura de software.",
    projects: [
      {
        title: "Sistema de Inventarios",
        description: "Aplicación web para gestión de inventarios con reportes en tiempo real y alertas de stock.",
        image: "/images/projects/placeholder-9.jpg",
        technologies: ["React", "Node.js", "MySQL", "Chart.js"],
        link: "#",
      },
      {
        title: "Portal de Noticias",
        description: "Plataforma de contenido con CMS personalizado y sistema de suscripciones.",
        image: "/images/projects/placeholder-10.jpg",
        technologies: ["Next.js", "Sanity", "Tailwind", "Vercel"],
        link: "#",
      },
    ],
  },
];

// Todos los proyectos para el carrusel inicial
const allProjects = teamMembers.flatMap((member) =>
  member.projects.map((project) => ({
    ...project,
    author: member.name,
    authorRole: member.role,
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

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  // Reset scroll when changing member
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [selectedMember]);

  const closeMemberView = () => {
    setSelectedMember(null);
  };

  return (
    <section id="experiencias" className="py-32 px-6 bg-[#050505] relative">
      {/* Subtle top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <p className="text-[13px] text-white/30 tracking-widest uppercase mb-4">
              Portafolio
            </p>
          </FadeIn>
          <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.02em]">
            <WordReveal as="span" className="text-white/90" delay={0.1}>
              Nuestras
            </WordReveal>{" "}
            <GradientReveal
              as="span"
              className="inline-block"
              delay={0.3}
              gradientFrom="#3b82f6"
              gradientTo="#8b5cf6"
            >
              experiencias
            </GradientReveal>
          </h2>
          <FadeIn delay={0.4}>
            <p className="text-white/40 text-[15px] mt-4 max-w-xl mx-auto">
              Proyectos destacados de nuestro equipo antes de formar Castennio
            </p>
          </FadeIn>
        </div>

        {/* Team member filter buttons */}
        <FadeIn delay={0.5}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={closeMemberView}
              className={`px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                !selectedMember
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-white/10"
              }`}
            >
              Todos
            </button>
            {teamMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => setSelectedMember(member.id)}
                className={`px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedMember === member.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-white/10"
                }`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-5 h-5 rounded-full"
                  style={{ imageRendering: "pixelated" }}
                />
                {member.name}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Member bio panel */}
        {selectedMember && currentMember && (
          <FadeIn>
            <div className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06]">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative w-24 h-24 shrink-0">
                  <div className="w-full h-full rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
                    <img
                      src={currentMember.image}
                      alt={currentMember.name}
                      className="w-full h-full object-cover"
                      style={{ imageRendering: "pixelated" }}
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-medium text-white/90">{currentMember.name}</h3>
                  <p className="text-[13px] text-blue-400 mb-3">{currentMember.role}</p>
                  <p className="text-white/50 text-[14px] leading-relaxed max-w-xl">
                    {currentMember.bio}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Projects Carousel */}
        <div className="relative">
          {/* Navigation arrows */}
          {displayProjects.length > 3 && (
            <>
              <button
                onClick={scrollLeft}
                className="absolute -left-4 md:left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={scrollRight}
                className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Carousel container with native scroll */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 px-1 md:px-12 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {displayProjects.map((project, index) => (
              <div
                key={`${project.author}-${project.title}-${index}`}
                className="flex-shrink-0 w-[300px] sm:w-[340px] snap-start"
              >
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>

          {/* Scroll hint for mobile */}
          <div className="flex justify-center mt-6 md:hidden">
            <p className="text-white/30 text-[12px] flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m-12 6h12m-12 6h12M4 7h.01M4 13h.01M4 19h.01" />
              </svg>
              Desliza para ver más
            </p>
          </div>
        </div>

        {/* Note */}
        <FadeIn delay={0.6}>
          <p className="text-center text-white/20 text-[13px] mt-16">
            Proyectos realizados individualmente antes de formar el equipo
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// Project Card Component
interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    link: string;
    author: string;
    authorRole: string;
    authorImage: string;
  };
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <div
      className="group h-full"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="h-full rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] overflow-hidden transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.02]">
        {/* Project image */}
        <div className="relative h-48 overflow-hidden bg-[#0a0a0a]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <svg className="w-16 h-16 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />

          {/* Author badge */}
          <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
            <img
              src={project.authorImage}
              alt={project.author}
              className="w-4 h-4 rounded-full"
              style={{ imageRendering: "pixelated" }}
            />
            <span className="text-[11px] text-white/80 font-medium">{project.author}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-[17px] font-medium text-white/90 mb-2 group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p className="text-[13px] text-white/40 leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-[10px] rounded-md bg-white/5 text-white/50 border border-white/[0.06]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Link */}
          <a
            href={project.link}
            className="inline-flex items-center gap-1.5 text-[13px] text-blue-400 hover:text-blue-300 transition-colors group/link"
          >
            Ver proyecto
            <svg
              className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
