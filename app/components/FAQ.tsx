"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";
import { WordReveal, GradientReveal } from "./TextReveal";

const faqs = [
  {
    question: "¿Cuánto cuesta un proyecto?",
    answer:
      "El precio depende del alcance y complejidad. Después de una breve conversación, enviamos una propuesta detallada con precio fijo. Sin sorpresas.",
  },
  {
    question: "¿Cuánto tiempo toma el desarrollo?",
    answer:
      "Una landing page: 1-2 semanas. Un sistema completo: 4-8 semanas. Te damos fechas claras desde el inicio y cumplimos.",
  },
  {
    question: "¿Qué incluye el soporte post-lanzamiento?",
    answer:
      "Ajustes menores, resolución de dudas y acompañamiento inicial. Para mantenimiento continuo, ofrecemos planes mensuales.",
  },
  {
    question: "¿Puedo ver avances durante el desarrollo?",
    answer:
      "Sí. Trabajamos con sprints semanales. Cada semana ves avances reales y puedes dar feedback antes de continuar.",
  },
  {
    question: "¿Necesito conocimientos técnicos?",
    answer:
      "No. Nos encargamos de todo lo técnico. Solo necesitas contarnos tu idea y objetivos de negocio.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onClick,
  index,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <div className="border-b border-white/[0.08]">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left cursor-pointer group"
      >
        <div className="flex items-center gap-6">
          <span className="text-sm text-white/35 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`text-lg font-medium transition-colors duration-300 ${
              isOpen ? "text-white" : "text-white/60 group-hover:text-white/80"
            }`}
          >
            {faq.question}
          </span>
        </div>
        <div
          className={`w-8 h-8 flex items-center justify-center transition-all duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          <svg
            className={`w-4 h-4 transition-colors duration-300 ${
              isOpen ? "text-white" : "text-white/30"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-48 opacity-100 pb-6" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-white/55 text-[15px] leading-relaxed pl-12 max-w-2xl">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 px-6 bg-[#0a0a0f] relative">
      {/* Subtle border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <p className="text-[13px] text-white/50 tracking-widest uppercase mb-4">
              Preguntas Frecuentes
            </p>
          </FadeIn>
          <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.02em]">
            <WordReveal as="span" className="text-white/90" delay={0.1}>
              Dudas
            </WordReveal>{" "}
            <GradientReveal
              as="span"
              className="inline-block"
              delay={0.3}
              gradientFrom="#3b82f6"
              gradientTo="#8b5cf6"
            >
              resueltas
            </GradientReveal>
          </h2>
        </div>

        {/* FAQ List */}
        <FadeIn delay={0.2}>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </FadeIn>

        {/* Additional help */}
        <div className="mt-16 text-center">
          <p className="text-white/50 text-[15px] mb-4">¿Otra pregunta?</p>
          <a
            href="https://wa.me/51999999999"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Chat"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 text-[15px]"
          >
            Escríbenos
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
