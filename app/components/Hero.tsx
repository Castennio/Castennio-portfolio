"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import FadeIn from "./FadeIn";

// ── Neural Network Background ──────────────────────────────────────
function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let w = 0, h = 0;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ponytail: 90 nodes, O(n²) connections — spatial hash if >200
    const NODE_COUNT = 90;
    const CONNECTION_DIST = 160;
    const MOUSE_RADIUS = 220;

    interface Node { x: number; y: number; vx: number; vy: number; r: number }

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.8,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Draw connections first (behind nodes)
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > CONNECTION_DIST) continue;

          const midX = (nodes[i].x + nodes[j].x) / 2;
          const midY = (nodes[i].y + nodes[j].y) / 2;
          const mouseDist = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2);
          const mouseBoost = Math.max(0, 1 - mouseDist / (MOUSE_RADIUS * 1.5));
          const fade = 1 - dist / CONNECTION_DIST;

          const alpha = fade * (0.08 + mouseBoost * 0.35);
          const width = 0.5 + mouseBoost * 1.5;

          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(45, 212, 191, ${alpha})`;
          ctx.lineWidth = width;
          ctx.stroke();
        }
      }

      // Update & draw nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;

        const dx = node.x - mx;
        const dy = node.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Mouse repulsion
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.025;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }
        node.vx *= 0.998;
        node.vy *= 0.998;

        const proximity = Math.max(0, 1 - dist / MOUSE_RADIUS);
        const radius = node.r + proximity * 3;
        const alpha = 0.25 + proximity * 0.75;

        // Outer glow
        if (proximity > 0.1) {
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0, node.x, node.y, radius + 8
          );
          gradient.addColorStop(0, `rgba(45, 212, 191, ${proximity * 0.3})`);
          gradient.addColorStop(1, "rgba(45, 212, 191, 0)");
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 8, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, ${alpha})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
}

// Hook to detect theme
function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}

// Animated "web" text with teal glow
function AnimatedWebText() {
  return (
    <span className="relative inline-block">
      <span
        className="absolute inset-0 blur-2xl opacity-50"
        style={{
          background: "radial-gradient(ellipse, rgba(20, 184, 166, 0.5) 0%, transparent 70%)",
        }}
      />
      <span
        className="relative"
        style={{
          color: "#2DD4BF",
          textShadow: "0 0 40px rgba(20, 184, 166, 0.4)",
        }}
      >
        web
      </span>
    </span>
  );
}

// Browser mockup with animated content
function BrowserMockup() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const screens = [
    { label: "Landing", color: "#14B8A6" },
    { label: "E-commerce", color: "#F59E0B" },
    { label: "Dashboard", color: "#2DD4BF" },
  ];

  return (
    <div className="relative w-full max-w-[500px] mx-auto">
      {/* Glow behind */}
      <div
        className="absolute -inset-8 opacity-30 blur-3xl transition-colors duration-1000"
        style={{ background: `radial-gradient(ellipse, ${screens[activeTab].color}40 0%, transparent 70%)` }}
      />

      {/* Browser window */}
      <div className="relative bg-[#0D1414] border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl">
        {/* Browser chrome */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#080C0C] border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-[#152020] rounded-md px-3 py-1.5 text-[11px] text-white/30 text-center">
              tunegocio.com
            </div>
          </div>
          <div className="w-16" />
        </div>

        {/* Tab indicators */}
        <div className="flex gap-1 px-4 py-2 bg-[#0A0E0E]">
          {screens.map((screen, i) => (
            <button
              key={screen.label}
              onClick={() => setActiveTab(i)}
              className={`px-3 py-1 text-[10px] rounded-md transition-all duration-300 ${
                activeTab === i
                  ? "text-white/90"
                  : "text-white/30 hover:text-white/50"
              }`}
              style={{
                background: activeTab === i ? `${screen.color}20` : "transparent",
                color: activeTab === i ? screen.color : undefined,
              }}
            >
              {screen.label}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="relative h-[280px] md:h-[320px] overflow-hidden">
          {/* Screen 0: Landing */}
          <div
            className={`absolute inset-0 p-6 transition-all duration-500 ${
              activeTab === 0 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="space-y-4">
              <div className="h-4 w-3/4 rounded bg-gradient-to-r from-teal-500/30 to-transparent" />
              <div className="h-3 w-1/2 rounded bg-white/[0.06]" />
              <div className="h-3 w-2/3 rounded bg-white/[0.04]" />
              <div className="mt-6 flex gap-3">
                <div className="h-10 w-32 rounded-full bg-gradient-to-r from-amber-500/80 to-amber-600/80" />
                <div className="h-10 w-28 rounded-full border border-white/[0.1]" />
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="h-20 rounded-lg bg-white/[0.03] border border-white/[0.05]" />
                <div className="h-20 rounded-lg bg-white/[0.03] border border-white/[0.05]" />
                <div className="h-20 rounded-lg bg-white/[0.03] border border-white/[0.05]" />
              </div>
            </div>
          </div>

          {/* Screen 1: E-commerce */}
          <div
            className={`absolute inset-0 p-6 transition-all duration-500 ${
              activeTab === 1 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-4 w-24 rounded bg-white/[0.08]" />
                <div className="h-8 w-8 rounded-full bg-amber-500/20 border border-amber-500/30" />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="rounded-lg bg-white/[0.02] border border-white/[0.05] p-3">
                    <div className="h-16 rounded bg-gradient-to-br from-white/[0.04] to-transparent mb-2" />
                    <div className="h-2 w-3/4 rounded bg-white/[0.06]" />
                    <div className="h-2 w-1/2 rounded bg-amber-500/30 mt-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Screen 2: Dashboard */}
          <div
            className={`absolute inset-0 p-6 transition-all duration-500 ${
              activeTab === 2 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1 h-16 rounded-lg bg-teal-500/10 border border-teal-500/20 p-3">
                  <div className="h-2 w-12 rounded bg-teal-500/40 mb-2" />
                  <div className="h-4 w-16 rounded bg-teal-500/60" />
                </div>
                <div className="flex-1 h-16 rounded-lg bg-amber-500/10 border border-amber-500/20 p-3">
                  <div className="h-2 w-12 rounded bg-amber-500/40 mb-2" />
                  <div className="h-4 w-16 rounded bg-amber-500/60" />
                </div>
              </div>
              <div className="h-32 rounded-lg bg-white/[0.02] border border-white/[0.05] p-4">
                <div className="flex items-end justify-between h-full gap-2">
                  {[40, 65, 45, 80, 55, 70, 90, 60].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t transition-all duration-500"
                      style={{
                        height: `${h}%`,
                        background: `linear-gradient(to top, ${screens[2].color}60, ${screens[2].color}20)`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute -right-4 top-1/4 w-20 h-20 rounded-xl bg-[#0D1414] border border-white/[0.08] p-3 shadow-xl animate-float">
        <div className="text-[10px] text-white/40 mb-1">Visitas</div>
        <div className="text-lg font-semibold text-teal-400">+247%</div>
      </div>

      <div className="absolute -left-4 bottom-1/4 w-24 h-16 rounded-xl bg-[#0D1414] border border-white/[0.08] p-3 shadow-xl animate-float-delayed">
        <div className="text-[10px] text-white/40 mb-1">Conversión</div>
        <div className="text-lg font-semibold text-amber-400">12.4%</div>
      </div>
    </div>
  );
}

// Client logos
function ClientLogos() {
  const logos = [
    "TechStart",
    "Sonríe",
    "ImportaLima",
    "MR Contable",
    "+8 más",
  ];

  return (
    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-[11px] text-white/30 tracking-wide">
      {/*
      <span className="text-white/20">Confían en nosotros:</span>
      {logos.map((logo, i) => (
        <span
          key={logo}
          className={`${i === logos.length - 1 ? "text-teal-500/50" : ""}`}
        >
          {logo}
        </span>
      ))}
      */}
    </div>
  );
}

export default function Hero() {
  const theme = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      className={`relative min-h-[100svh] md:min-h-screen flex items-center overflow-hidden py-20 md:py-0 transition-colors duration-500 ${
        isDark ? "bg-[#050A0A]" : "bg-[#ffffff]"
      }`}
    >
      {/* Neural network background */}
      {mounted && <NeuralBackground />}

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-teal-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text content */}
          <div className="order-2 lg:order-1">
           

            <FadeIn delay={0.2}>
              <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-medium tracking-[-0.03em] leading-[1.1] mb-6">
                <span className={isDark ? "text-white/90" : "text-black/90"}>
                  Creamos tu <AnimatedWebText />
                </span>
                <br />
                <span className="text-gradient">para que crezcas</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p
                className={`text-base md:text-lg max-w-md mb-8 leading-relaxed ${
                  isDark ? "text-white/50" : "text-black/50"
                }`}
              >
                Nos encargamos del diseño, desarrollo e integraciones.
                <span className="text-white/70"> Tú solo apruebas.</span>
              </p>
            </FadeIn>

            {/* CTA buttons */}
            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a
                  href="#diagnostico"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                    color: "#050A0A",
                    boxShadow: "0 4px 24px rgba(245, 158, 11, 0.3)",
                  }}
                >
                  <span>Diagnóstico gratuito</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>

                <a
                  href="#portafolio"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-medium rounded-full border border-white/[0.1] text-white/70 hover:text-white hover:border-white/[0.2] transition-all duration-300"
                >
                  <span>Ver proyectos</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </div>
            </FadeIn>

           

            {/* Client logos */}
            <FadeIn delay={0.6}>
              <ClientLogos />
            </FadeIn>
          </div>

          {/* Right: Visual mockup */}
          <div className="order-1 lg:order-2">
            <FadeIn delay={0.3} y={30}>
              <BrowserMockup />
            </FadeIn>
          </div>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 4s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
