"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import MagneticButton from "../MagneticButton";
import type { DiagnosisResult as DiagnosisResultType } from "./data";

interface DiagnosisResultProps {
  result: DiagnosisResultType;
  onReset: () => void;
}

const urgencyConfig = {
  alta: {
    label: "Urgencia alta",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
  },
  media: {
    label: "Urgencia media",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
  baja: {
    label: "Sin prisa",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  },
};

const projectIcons = {
  landing: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  website: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  redesign: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  migration: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
};

export default function DiagnosisResult({ result, onReset }: DiagnosisResultProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const config = urgencyConfig[result.urgencyLevel];

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll(".animate-in"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  const whatsappMessage = `Hola! Acabo de hacer el diagnóstico en su web.

Mi resultado:
- Proyecto recomendado: ${result.projectLabel}
- Tiempo estimado: ${result.timeEstimate}
- Funcionalidades: ${result.suggestedFeatures.join(", ") || "Por definir"}

Me gustaría recibir una propuesta para mi proyecto.`;

  const whatsappUrl = `https://wa.me/51998162677?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div ref={containerRef} className="relative">
      {/* Project type recommendation */}
      <div className="text-center mb-8 animate-in">
        <p className="text-white/40 text-[13px] uppercase tracking-wider mb-4">
          Te recomendamos
        </p>

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-white/[0.08] text-blue-400 mb-4">
          {projectIcons[result.projectType]}
        </div>

        <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
          {result.projectLabel}
        </h3>
        <p className="text-white/55 text-[15px] max-w-md mx-auto leading-relaxed">
          {result.projectDescription}
        </p>
      </div>

      {/* Key info cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-8 animate-in">
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-white/40 text-[13px]">Tiempo estimado</p>
          </div>
          <p className="text-2xl font-semibold text-white">{result.timeEstimate}</p>
        </div>

        <div className={`p-5 rounded-xl ${config.bgColor} border ${config.borderColor}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-2 h-2 rounded-full ${config.color.replace("text-", "bg-")}`} />
            <p className={`text-[13px] ${config.color}`}>{config.label}</p>
          </div>
          <p className="text-[15px] text-white/70 leading-relaxed">
            {result.urgencyMessage}
          </p>
        </div>
      </div>

      {/* Suggested features */}
      {result.suggestedFeatures.length > 0 && (
        <div className="mb-8 animate-in">
          <p className="text-white/40 text-[13px] uppercase tracking-wider mb-4">
            Funcionalidades incluidas
          </p>
          <div className="flex flex-wrap gap-2">
            {result.suggestedFeatures.map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[13px]"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Next steps */}
      <div className="mb-8 animate-in">
        <p className="text-white/40 text-[13px] uppercase tracking-wider mb-4">
          Siguientes pasos
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center text-white/40 text-[12px] flex-shrink-0 mt-0.5">1</div>
            <p className="text-white/60 text-[15px]">Nos escribes por WhatsApp con tu resultado</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center text-white/40 text-[12px] flex-shrink-0 mt-0.5">2</div>
            <p className="text-white/60 text-[15px]">Conversamos 10 minutos para entender mejor tu negocio</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center text-white/40 text-[12px] flex-shrink-0 mt-0.5">3</div>
            <p className="text-white/60 text-[15px]">Te enviamos una propuesta con precio fijo y tiempos claros</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center animate-in">
        <MagneticButton
          as="a"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          strength={0.4}
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium text-base rounded-full transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Solicitar propuesta gratis
        </MagneticButton>

        <p className="mt-4 text-white/40 text-[13px]">
          Sin compromiso. Te respondemos en menos de 24 horas.
        </p>

        <button
          onClick={onReset}
          className="block mx-auto mt-6 text-white/40 hover:text-white/60 text-[14px] transition-colors"
        >
          Volver a hacer el diagnóstico
        </button>
      </div>
    </div>
  );
}
