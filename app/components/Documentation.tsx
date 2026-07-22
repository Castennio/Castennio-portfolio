"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";
import { WordReveal, GradientReveal } from "./TextReveal";

const tabs = [
  { id: "proceso", label: "Proceso" },
  { id: "garantias", label: "Garantías" },
];

// Proceso detallado
function ProcesoContent() {
  const steps = [
    {
      phase: "Descubrimiento",
      duration: "Día 1-2",
      items: [
        "Llamada inicial de 30 min para entender tu negocio",
        "Análisis de tu competencia y mercado",
        "Definición de objetivos medibles",
        "Propuesta detallada con precio fijo",
      ],
    },
    {
      phase: "Diseño",
      duration: "Semana 1",
      items: [
        "Wireframes de estructura y navegación",
        "Diseño visual en Figma (2 rondas de revisión)",
        "Definición de paleta, tipografía e imágenes",
        "Aprobación antes de desarrollo",
      ],
    },
    {
      phase: "Desarrollo",
      duration: "Semana 2-3",
      items: [
        "Desarrollo en ambiente de staging",
        "Revisiones semanales con demo en vivo",
        "Implementación de formularios e integraciones",
        "Optimización de velocidad y SEO técnico",
      ],
    },
    {
      phase: "Lanzamiento",
      duration: "Semana 4",
      items: [
        "Testing en múltiples dispositivos",
        "Migración a producción sin downtime",
        "Configuración de analytics y tracking",
        "Capacitación de uso (video + documento)",
      ],
    },
    {
      phase: "Post-lanzamiento",
      duration: "30 días",
      items: [
        "Soporte incluido para ajustes menores",
        "Monitoreo de performance",
        "Resolución de bugs sin costo adicional",
        "Opción de plan de mantenimiento mensual",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <div
          key={step.phase}
          className="relative pl-8 pb-6 border-l border-white/[0.06] last:border-l-transparent last:pb-0"
        >
          {/* Timeline dot */}
          <div
            className="absolute left-0 top-0 w-3 h-3 rounded-full -translate-x-1.5 border-2"
            style={{
              borderColor: index === 0 ? "#14B8A6" : "#1E2A2A",
              background: index === 0 ? "#14B8A6" : "#0D1414",
            }}
          />

          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="md:w-48 flex-shrink-0">
              <h4 className="text-white/90 font-medium">{step.phase}</h4>
              <p className="text-[12px] text-teal-500/70">{step.duration}</p>
            </div>
            <ul className="flex-1 space-y-2">
              {step.items.map((item, i) => (
                <li key={i} className="text-sm text-white/50 flex items-start gap-2">
                  <svg
                    className="w-4 h-4 text-teal-500/40 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

// Tecnologías
function TecnologiasContent() {
  const categories = [
    {
      name: "Frontend",
      description: "Interfaces rápidas y modernas",
      techs: [
        { name: "Next.js 14", desc: "Framework React con SSR y optimizaciones automáticas" },
        { name: "React", desc: "Librería UI para interfaces interactivas" },
        { name: "Tailwind CSS", desc: "Estilos utilitarios para diseño consistente" },
        { name: "TypeScript", desc: "JavaScript tipado para código más robusto" },
      ],
    },
    {
      name: "Backend & APIs",
      description: "Lógica de negocio y datos",
      techs: [
        { name: "Node.js", desc: "Runtime JavaScript para servidor" },
        { name: "PostgreSQL", desc: "Base de datos relacional robusta" },
        { name: "Prisma", desc: "ORM moderno para manejo de datos" },
        { name: "REST / GraphQL", desc: "APIs según necesidad del proyecto" },
      ],
    },
    {
      name: "Infraestructura",
      description: "Hosting y despliegue",
      techs: [
        { name: "Vercel", desc: "Deploy automático, CDN global, SSL incluido" },
        { name: "AWS / GCP", desc: "Para proyectos que requieren más control" },
        { name: "Cloudflare", desc: "CDN y protección DDoS" },
        { name: "GitHub Actions", desc: "CI/CD automatizado" },
      ],
    },
    {
      name: "Integraciones",
      description: "Conexiones con terceros",
      techs: [
        { name: "Stripe / MercadoPago", desc: "Procesamiento de pagos" },
        { name: "Google Calendar", desc: "Sistema de reservas y citas" },
        { name: "WhatsApp Business", desc: "Atención al cliente automatizada" },
        { name: "Google Analytics 4", desc: "Tracking y métricas" },
      ],
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {categories.map((category) => (
        <div
          key={category.name}
          className="bg-[#0D1414] border border-white/[0.06] rounded-xl p-5"
        >
          <h4 className="text-white/90 font-medium mb-1">{category.name}</h4>
          <p className="text-[12px] text-white/40 mb-4">{category.description}</p>
          <ul className="space-y-3">
            {category.techs.map((tech) => (
              <li key={tech.name} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500/50 mt-2 flex-shrink-0" />
                <div>
                  <span className="text-sm text-white/70">{tech.name}</span>
                  <p className="text-[12px] text-white/35">{tech.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// Precios
function PreciosContent() {
  const tiers = [
    {
      name: "Landing Page",
      price: "desde S/. 1,500",
      duration: "2-3 semanas",
      description: "Página única de alto impacto para captar clientes",
      features: [
        "Diseño personalizado",
        "Responsive (móvil, tablet, desktop)",
        "Formulario de contacto",
        "Integración WhatsApp",
        "SEO básico",
        "Hosting 1 año incluido",
        "SSL gratuito",
      ],
      highlight: false,
    },
    {
      name: "Web Profesional",
      price: "desde S/. 3,500",
      duration: "3-4 semanas",
      description: "Sitio completo para negocios establecidos",
      features: [
        "Todo lo de Landing Page",
        "Hasta 5 páginas",
        "Blog integrado",
        "Google Analytics",
        "Optimización de velocidad",
        "Panel de administración",
        "Soporte 30 días",
      ],
      highlight: true,
    },
    {
      name: "E-commerce / Sistema",
      price: "desde S/. 6,000",
      duration: "4-6 semanas",
      description: "Tienda online o sistema a medida",
      features: [
        "Todo lo de Web Profesional",
        "Catálogo de productos",
        "Carrito de compras",
        "Pasarela de pagos",
        "Gestión de inventario",
        "Notificaciones email",
        "Dashboard de métricas",
      ],
      highlight: false,
    },
  ];

  return (
    <div className="space-y-6">
      <p className="text-sm text-white/50 mb-6">
        Precios referenciales en soles peruanos. Cada proyecto se cotiza según sus necesidades específicas.
        <span className="text-teal-500/70"> El diagnóstico es gratuito y sin compromiso.</span>
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-xl p-5 border transition-all duration-300 ${
              tier.highlight
                ? "bg-gradient-to-b from-teal-500/[0.08] to-transparent border-teal-500/20"
                : "bg-[#0D1414] border-white/[0.06]"
            }`}
          >
            {tier.highlight && (
              <span className="inline-block text-[10px] text-teal-400 tracking-wider uppercase mb-3">
                Más popular
              </span>
            )}
            <h4 className="text-white/90 font-medium text-lg">{tier.name}</h4>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-2xl font-semibold text-white/90">{tier.price}</span>
            </div>
            <p className="text-[12px] text-white/40 mt-1">{tier.duration}</p>
            <p className="text-sm text-white/50 mt-3 mb-4">{tier.description}</p>

            <ul className="space-y-2">
              {tier.features.map((feature, i) => (
                <li key={i} className="text-[13px] text-white/50 flex items-start gap-2">
                  <svg
                    className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                      tier.highlight ? "text-teal-500/60" : "text-white/20"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-[#0D1414] border border-white/[0.06] rounded-xl p-5 mt-6">
        <h4 className="text-white/70 font-medium mb-3">Mantenimiento mensual (opcional)</h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-white/50">Básico</span>
            <span className="text-white/70 ml-2">S/. 150/mes</span>
            <p className="text-[12px] text-white/35 mt-1">Hosting, SSL, backups, actualizaciones de seguridad</p>
          </div>
          <div>
            <span className="text-white/50">Pro</span>
            <span className="text-white/70 ml-2">S/. 350/mes</span>
            <p className="text-[12px] text-white/35 mt-1">Todo básico + 4 horas de cambios menores, reportes</p>
          </div>
          <div>
            <span className="text-white/50">Enterprise</span>
            <span className="text-white/70 ml-2">A medida</span>
            <p className="text-[12px] text-white/35 mt-1">Soporte dedicado, SLA, desarrollo continuo</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Garantías
function GarantiasContent() {
  const guarantees = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: "Garantía de satisfacción",
      description:
        "Si en los primeros 7 días no estás conforme con el diseño inicial, devolvemos tu adelanto. Sin preguntas.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
      ),
      title: "30 días de soporte",
      description:
        "Después del lanzamiento, tienes 30 días de soporte incluido para ajustes menores y resolución de dudas.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Cumplimiento de plazos",
      description:
        "Nos comprometemos con fechas concretas. Si nos retrasamos por nuestra responsabilidad, el soporte se extiende.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      ),
      title: "Precio fijo garantizado",
      description:
        "El precio que cotizamos es el precio final. Sin costos ocultos ni sorpresas. Lo que acordamos es lo que pagas.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      ),
      title: "Código de tu propiedad",
      description:
        "Al finalizar el proyecto, todo el código fuente es tuyo. Te entregamos acceso completo a repositorio y hosting.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      ),
      title: "Bugs corregidos gratis",
      description:
        "Si encontramos un bug después del lanzamiento, lo corregimos sin costo adicional. Es nuestra responsabilidad.",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {guarantees.map((guarantee) => (
        <div
          key={guarantee.title}
          className="bg-[#0D1414] border border-white/[0.06] rounded-xl p-5 flex gap-4"
        >
          <div className="text-teal-500/60 flex-shrink-0">{guarantee.icon}</div>
          <div>
            <h4 className="text-white/90 font-medium mb-1">{guarantee.title}</h4>
            <p className="text-sm text-white/45 leading-relaxed">{guarantee.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Documentation() {
  const [activeTab, setActiveTab] = useState("proceso");

  const renderContent = () => {
    switch (activeTab) {
      case "proceso":
        return <ProcesoContent />;
      case "garantias":
        return <GarantiasContent />;
      default:
        return null;
    }
  };

  return (
    <section id="documentacion" className="py-16 lg:py-20 px-6 bg-[#050A0A] relative">
      {/* Subtle top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <FadeIn>
            <p className="text-[13px] text-white/50 tracking-widest uppercase mb-4">
              Para los detallistas
            </p>
          </FadeIn>
          <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.02em]">
            <WordReveal as="span" className="text-white/90" delay={0.1}>
              Todo lo que
            </WordReveal>{" "}
            <GradientReveal
              as="span"
              className="inline-block"
              delay={0.3}
              gradientFrom="#14B8A6"
              gradientTo="#2DD4BF"
            >
              necesitas saber
            </GradientReveal>
          </h2>
        </div>

        {/* Tabs */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                    : "text-white/50 hover:text-white/70 border border-transparent hover:border-white/[0.08]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Content */}
        <FadeIn delay={0.3}>
          <div className="min-h-[400px]">{renderContent()}</div>
        </FadeIn>

        {/* Bottom CTA */}
        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <p className="text-white/40 text-sm mb-4">
              ¿Tienes más preguntas? Hablemos.
            </p>
            <a
              href="#diagnostico"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-[#050A0A] font-semibold text-sm rounded-full transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:scale-105"
            >
              <span>Agendar diagnóstico gratuito</span>
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
