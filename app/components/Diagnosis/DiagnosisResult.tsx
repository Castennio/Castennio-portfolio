"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import MagneticButton from "../MagneticButton";
import type { DiagnosisResult as DiagnosisResultType } from "./data";

interface DiagnosisResultProps {
  result: DiagnosisResultType;
  onReset: () => void;
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const countRef = useRef({ value: 0 });

  useEffect(() => {
    gsap.to(countRef.current, {
      value,
      duration: 2,
      ease: "power3.out",
      onUpdate: () => {
        setCount(Math.round(countRef.current.value));
      },
    });
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

function GaugeChart({ percentage }: { percentage: number }) {
  const pathRef = useRef<SVGCircleElement>(null);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    if (pathRef.current) {
      gsap.fromTo(
        pathRef.current,
        { strokeDashoffset: circumference },
        { strokeDashoffset: offset, duration: 2, ease: "power3.out" }
      );
    }
  }, [offset, circumference]);

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          ref={pathRef}
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
        />
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span className="text-3xl font-bold text-white">
            <AnimatedCounter value={percentage} suffix="%" />
          </span>
          <p className="text-[11px] text-white/40 mt-1">automatizable</p>
        </div>
      </div>
    </div>
  );
}

function Confetti() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const colors = ["#3b82f6", "#8b5cf6", "#22c55e", "#f59e0b"];
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute w-2 h-2 rounded-full";
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = `${50 + (Math.random() - 0.5) * 40}%`;
      particle.style.top = "50%";
      containerRef.current.appendChild(particle);
      particles.push(particle);

      gsap.to(particle, {
        y: -200 - Math.random() * 200,
        x: (Math.random() - 0.5) * 300,
        rotation: Math.random() * 720,
        opacity: 0,
        duration: 1.5 + Math.random() * 0.5,
        ease: "power2.out",
      });
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden" />;
}

const categoryConfig = {
  critico: {
    label: "Necesitas automatizar YA",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
  },
  moderado: {
    label: "Buen potencial de mejora",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
  optimizado: {
    label: "Vas por buen camino",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  },
};

export default function DiagnosisResult({ result, onReset }: DiagnosisResultProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const config = categoryConfig[result.category];
  const showConfetti = result.hoursRecoverable >= 10;

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
- Horas que podría automatizar: ${result.hoursRecoverable}h/semana
- Potencial de automatización: ${result.automationPotential}%
- Categoría: ${result.category}

Me gustaría recibir el diagnóstico completo para mi negocio.`;

  const whatsappUrl = `https://wa.me/51998162677?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div ref={containerRef} className="relative">
      {showConfetti && <Confetti />}

      {/* Hero result */}
      <div className="text-center mb-10 animate-in">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${config.bgColor} ${config.borderColor} border mb-6`}
        >
          <div className={`w-2 h-2 rounded-full ${config.color.replace("text-", "bg-")}`} />
          <span className={`text-[13px] font-medium ${config.color}`}>{config.label}</span>
        </div>

        <h3 className="text-5xl md:text-6xl font-bold text-white mb-3">
          <AnimatedCounter value={result.hoursRecoverable} />
          <span className="text-3xl md:text-4xl text-white/60 ml-2">hrs/semana</span>
        </h3>
        <p className="text-white/50 text-lg">de trabajo que puedes automatizar</p>
      </div>

      {/* Gauge and metrics */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="animate-in flex justify-center items-center">
          <GaugeChart percentage={result.automationPotential} />
        </div>

        <div className="space-y-4 animate-in">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <p className="text-white/40 text-[13px] mb-1">Horas perdidas actualmente</p>
            <p className="text-2xl font-semibold text-white">
              <AnimatedCounter value={result.totalHoursLost} suffix="h" />
              <span className="text-white/40 text-base ml-1">/semana</span>
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <p className="text-white/40 text-[13px] mb-1">Horas que puedes recuperar</p>
            <p className="text-2xl font-semibold text-green-400">
              +<AnimatedCounter value={result.hoursRecoverable} suffix="h" />
              <span className="text-white/40 text-base ml-1">/semana</span>
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="mb-10 animate-in">
          <p className="text-white/50 text-[13px] uppercase tracking-wider mb-4">
            Te recomendamos implementar:
          </p>
          <div className="flex flex-wrap gap-2">
            {result.recommendations.map((rec, index) => (
              <span
                key={index}
                className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[13px]"
              >
                {rec}
              </span>
            ))}
          </div>
        </div>
      )}

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
          Recibir diagnóstico completo
        </MagneticButton>

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
