"use client";

import { useState, useRef, useEffect } from "react";
import FadeIn, { StaggerFadeIn } from "./FadeIn";
import { WordReveal, GradientReveal } from "./TextReveal";

// Hook to detect theme
function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };

    checkTheme();

    const observer = new MutationObserver(() => {
      requestAnimationFrame(checkTheme);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}

// Datos de los integrantes con su trayectoria y proyectos
const teamMembers = [
  {
    id: "dani",
    name: "Dani",
    role: "Desarrollo Frontend",
    image: "/images/pixel-art/dani.png",
    bio: "Desarrollador frontend con 2 años de experiencia creando interfaces modernas y responsivas. Apasionado por las animaciones y la experiencia de usuario.",
    projects: [
      {
        title: "INK BUSINESS - Finanzas personales con escritura natural",
        description: "Es una aplicación de finanzas personales que transforma la forma tradicional de registrar ingresos y gastos, por medio de la detección de dibujos.",
        image: "/images/projects/placeholder-1.png",
        technologies: ["React", "Next.js", "TypeScript", "Tailwind"],
        link: "https://ink-business.vercel.app",
      },
      {
        title: "Proyecto completo - Dr. Cirujano",
        description: "Landing Page + Panel administrativo + Gestión de reservas (Google Calendar) + Catálogo de servicios + Reportes + CMS de Blogs + Videos integrados + Login/Register",
        image: "/images/projects/placeholder-2.png",
        technologies: ["React", "Next.js", "TypeScript", "Tailwind"],
        link: "https://drmanuelsinchi.com",
      },
       {
        title: "VERIFICARLO - Revisión de autos de segunda, para que compres con confianza",
        description: "Landing Page + Panel administrativo + Gestión de inspecciones + Catálogo de servicios + Mensajes al correo + CMS de Blogs + Videos integrados + Login/Register",
        image: "/images/projects/placeholder-3.png",
        technologies: ["React", "Next.js", "TypeScript", "Tailwind"],
        link: "https://verificarlo.com",
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
        title: "Lifeli - Plataforma de bienestar",
        description: "Sitio web enfocado en promover un estilo de vida saludable con recursos y contenido sobre bienestar integral.",
        image: "/images/projects/lifeli.png",
        technologies: ["Google Sites", "SEO", "Content Design"],
        link: "https://sites.google.com/view/lifeli/nosotros",
      },
      {
        title: "D & S Full Deport",
        description: "Tienda de artículos deportivos con catálogo de productos y sección de contacto para ventas.",
        image: "/images/projects/fulldeport.png",
        technologies: ["Google Sites", "E-commerce", "UX Design"],
        link: "https://sites.google.com/view/dys-full-deport/nosotros",
      },
      {
        title: "Multinet - Plataforma digital",
        description: "Aplicación web moderna con interfaz interactiva y diseño responsive para múltiples dispositivos.",
        image: "/images/projects/multinet.png",
        technologies: ["React", "Next.js", "Vercel", "Tailwind"],
        link: "https://multinet-lovat.vercel.app/",
      },
      {
        title: "Explora - Portal educativo",
        description: "Plataforma educativa interactiva diseñada para facilitar el aprendizaje y la exploración de contenidos.",
        image: "/images/projects/explora.png",
        technologies: ["Google Sites", "Education", "UX Research"],
        link: "https://sites.google.com/view/capa-test/inicio?authuser=3",
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
  const theme = useTheme();
  const isDark = theme === "dark";

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
    <section id="proyectos" className="py-32 px-6 bg-[#0a0a0f] relative ambient-glow">
      {/* Subtle top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <p className="text-[13px] text-white/50 tracking-widest uppercase mb-4">
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
            <p className="text-white/55 text-[15px] mt-4 max-w-xl mx-auto">
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
            <div
              className="mb-12 p-6 rounded-2xl border"
              style={{
                background: isDark
                  ? "linear-gradient(to bottom right, #14151a, #0f1015)"
                  : "linear-gradient(to bottom right, #ffffff, #f8f9fa)",
                borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
              }}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative w-24 h-24 shrink-0">
                  <div
                    className="w-full h-full rounded-xl overflow-hidden border"
                    style={{
                      borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                      backgroundColor: isDark ? "#0a0a0a" : "#f0f0f5",
                    }}
                  >
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
                  <h3
                    className="text-xl font-medium"
                    style={{ color: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.9)" }}
                  >
                    {currentMember.name}
                  </h3>
                  <p className="text-[13px] text-blue-500 mb-3">{currentMember.role}</p>
                  <p
                    className="text-[14px] leading-relaxed max-w-xl"
                    style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)" }}
                  >
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
                <ProjectCard project={project} index={index} isDark={isDark} />
              </div>
            ))}
          </div>

          {/* Scroll hint for mobile */}
          <div className="flex justify-center mt-6 md:hidden">
            <p className="text-white/45 text-[12px] flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m-12 6h12m-12 6h12M4 7h.01M4 13h.01M4 19h.01" />
              </svg>
              Desliza para ver más
            </p>
          </div>
        </div>

        {/* Note */}
        <FadeIn delay={0.6}>
          <p className="text-center text-white/40 text-[13px] mt-16">
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
  isDark: boolean;
}

function ProjectCard({ project, index, isDark }: ProjectCardProps) {
  return (
    <div
      className="group h-full"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className="h-full rounded-2xl border overflow-hidden transition-all duration-500"
        style={{
          background: isDark
            ? "linear-gradient(to bottom right, #14151a, #0f1015)"
            : "linear-gradient(to bottom right, #ffffff, #f8f9fa)",
          borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        }}
      >
        {/* Project image */}
        <div
          className="relative h-48 overflow-hidden"
          style={{ backgroundColor: isDark ? "#0a0a0a" : "#f0f0f5" }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Hover overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-60"
            style={{ background: `linear-gradient(to top, ${isDark ? "#0a0a0f" : "#ffffff"}, transparent)` }}
          />

          {/* Author badge */}
          <div
            className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1.5 rounded-full backdrop-blur-sm border"
            style={{
              backgroundColor: isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.8)",
              borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={project.authorImage}
              alt={project.author}
              className="w-4 h-4 rounded-full"
              style={{ imageRendering: "pixelated" }}
            />
            <span
              className="text-[11px] font-medium"
              style={{ color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)" }}
            >
              {project.author}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3
            className="text-[17px] font-medium mb-2 transition-colors"
            style={{ color: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.9)" }}
          >
            {project.title}
          </h3>
          <p
            className="text-[13px] leading-relaxed mb-4 line-clamp-2"
            style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.6)" }}
          >
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-[10px] rounded-md border"
                style={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                  color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
                  borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Link */}
          <a
            href={project.link}
            className="inline-flex items-center gap-1.5 text-[13px] text-blue-500 hover:text-blue-400 transition-colors group/link"
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
