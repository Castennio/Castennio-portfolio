"use client";

import { useRef, useState, useEffect } from "react";
import FadeIn, { StaggerFadeIn } from "./FadeIn";
import { WordReveal, GradientReveal, BlurReveal } from "./TextReveal";

const services = [
  {
    id: "redesign",
    number: "01",
    title: "Rediseño de sitios existentes",
    description:
      "Si ya tienes web pero se ve anticuada o no convierte, la renovamos con un diseno profesional.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    details: {
      fullDescription: "Transformamos tu sitio web actual en una experiencia moderna que refleje la calidad de tu negocio y genere mas conversiones.",
      includes: [
        "Analisis de tu sitio actual",
        "Nuevo diseno visual completo",
        "Mejora de velocidad de carga",
        "Optimizacion de conversion",
        "Migracion de contenido existente",
        "Redireccionamientos SEO",
      ],
      timeline: "2-3 semanas",
      ideal: "Negocios con web desactualizada o que no genera resultados",
    },
  },
  {
    id: "migration",
    number: "02",
    title: "Migraciones",
    description:
      "Pasamos tu sitio a tecnología moderna (NextJS) para que sea rápido, seguro y facil de mantener.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    details: {
      fullDescription: "Migramos tu sitio de WordPress, Wix, o cualquier plataforma a tecnologia moderna que carga 10x mas rápido.",
      includes: [
        "Analisis de arquitectura actual",
        "Migracion completa de contenido",
        "Optimizacion de rendimiento",
        "Setup de hosting moderno",
        "Testing exhaustivo",
        "Capacitacion de uso",
      ],
      timeline: "2-4 semanas",
      ideal: "Sitios lentos en WordPress, Wix, Squarespace",
    },
  },
  {
    id: "integrations",
    number: "03",
    title: "Integraciones",
    description:
      "Conectamos tu sitio con pagos, agenda (Google Calendar), formularios y lo que tu negocio necesite.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    details: {
      fullDescription: "Automatizamos tu negocio conectando tu sitio web con las herramientas que ya usas o necesitas implementar.",
      includes: [
        "Pasarelas de pago (Stripe, PayPal)",
        "Agenda online (Google Calendar)",
        "CRM y email marketing",
        "WhatsApp Business",
        "Analytics avanzado",
        "Automatizaciones personalizadas",
      ],
      timeline: "1-2 semanas",
      ideal: "Negocios que quieren automatizar procesos",
    },
  },
];

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
  onClick: () => void;
}

function ServiceCard({ service, index, onClick }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlowPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTransform("");
    setGlowPosition({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group relative cursor-pointer"
      style={{
        transform,
        transition: transform ? "none" : "transform 0.5s ease-out",
      }}
    >
      {/* Animated gradient border */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #3b82f6)",
          backgroundSize: "200% 200%",
          animation: "gradientFlow 3s ease infinite",
        }}
      />

      {/* Card content */}
      <div className="relative h-full p-8 rounded-2xl bg-[#0f1015] border border-white/[0.06] group-hover:border-transparent transition-colors duration-500">
        {/* Glow effect following cursor */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
          }}
        />

        {/* Number */}
        <span className="absolute top-6 right-6 text-[11px] font-mono text-white/20 tracking-wider">
          {service.number}
        </span>

        {/* Icon with animation */}
        <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-white/[0.06] flex items-center justify-center text-white/50 group-hover:text-blue-400 transition-all duration-500 mb-6 group-hover:scale-110 group-hover:rotate-3">
          <div className="transition-transform duration-500 group-hover:scale-110">
            {service.icon}
          </div>
          {/* Icon glow */}
          <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-medium text-white/90 mb-3 group-hover:text-white transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-[15px] text-white/50 leading-relaxed group-hover:text-white/60 transition-colors duration-300">
          {service.description}
        </p>

        {/* Click indicator */}
        <div className="mt-6 flex items-center gap-2 text-[13px] text-white/30 group-hover:text-blue-400/70 transition-colors duration-300">
          <span>Ver detalles</span>
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>

        {/* Bottom line accent */}
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
}

interface ServiceModalProps {
  service: typeof services[0] | null;
  isOpen: boolean;
  onClose: () => void;
}

function ServiceModal({ service, isOpen, onClose }: ServiceModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!service) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0f1015] border border-white/[0.08] shadow-2xl transition-all duration-500 ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Header gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 z-10"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="relative p-8 md:p-12">
          {/* Number & Icon */}
          <div className="flex items-start gap-6 mb-8">
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-white/[0.08] flex items-center justify-center text-blue-400">
              {service.icon}
              <div className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-xl" />
            </div>
            <div>
              <span className="text-[12px] font-mono text-white/30 tracking-wider">{service.number}</span>
              <h3 className="text-2xl md:text-3xl font-medium text-white mt-1">{service.title}</h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/60 text-[16px] leading-relaxed mb-10">
            {service.details.fullDescription}
          </p>

          {/* Info grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* Includes */}
            <div>
              <h4 className="text-[13px] text-white/40 uppercase tracking-wider mb-4">Incluye</h4>
              <ul className="space-y-3">
                {service.details.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] text-white/70">
                    <svg className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Timeline & Ideal */}
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <h4 className="text-[13px] text-white/40 uppercase tracking-wider mb-2">Tiempo estimado</h4>
                <p className="text-xl font-medium text-white">{service.details.timeline}</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <h4 className="text-[13px] text-white/40 uppercase tracking-wider mb-2">Ideal para</h4>
                <p className="text-[15px] text-white/70">{service.details.ideal}</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contacto"
              onClick={onClose}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity duration-300"
            >
              Solicitar este servicio
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#diagnostico"
              onClick={onClose}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-white/80 font-medium rounded-xl border border-white/[0.08] transition-all duration-300"
            >
              Hacer diagnostico gratis
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  return (
    <section id="servicios" className="py-32 px-6 bg-[#0a0a0f] relative">
      {/* Subtle border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-20">
          <FadeIn>
            <p className="text-[13px] text-white/50 tracking-widest uppercase mb-4">
              Servicios adicionales
            </p>
          </FadeIn>
          <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.02em] mb-6">
            <WordReveal as="span" className="text-white/90" delay={0.1}>
              Ya tienes web?
            </WordReveal>{" "}
            <GradientReveal
              as="span"
              className="inline-block"
              delay={0.3}
              gradientFrom="#3b82f6"
              gradientTo="#8b5cf6"
            >
              La mejoramos
            </GradientReveal>
          </h2>
          <BlurReveal
            as="p"
            className="text-white/55 text-[15px] max-w-md mx-auto"
            delay={0.4}
            stagger={0.01}
          >
            Rediseno, migracion e integraciones para llevar tu sitio actual al siguiente nivel.
          </BlurReveal>
        </div>

        {/* Services grid */}
        <StaggerFadeIn className="grid md:grid-cols-2 gap-6" stagger={0.12}>
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onClick={() => openModal(service)}
            />
          ))}
        </StaggerFadeIn>

        {/* CTA */}
        <FadeIn delay={0.5}>
          <div className="text-center mt-16">
            <p className="text-white/40 text-[15px] mb-6">
              No sabes que necesitas? El diagnostico gratuito te lo dice.
            </p>
            <a
              href="#diagnostico"
              className="inline-flex items-center gap-2 text-blue-400/80 hover:text-blue-400 transition-colors duration-300 text-[15px] font-medium group"
            >
              Hacer diagnostico
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
