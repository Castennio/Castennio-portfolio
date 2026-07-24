"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── Business types that cycle in the heading ───────────────────────
const BUSINESS_TYPES = [
  "clínicas",
  "gimnasios",
  "restaurantes",
  "veterinarias",
  "tiendas de ropa",
  "venta de autos",
  "tu negocio",
];

// ── Cycling text component ─────────────────────────────────────────
function CyclingBusiness() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % BUSINESS_TYPES.length);
        setFade(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="inline-block transition-all duration-300 bg-gradient-to-r from-[#14B8A6] to-[#2DD4BF] bg-clip-text text-transparent"
      style={{
        opacity: fade ? 1 : 0,
        transform: fade ? "translateY(0)" : "translateY(8px)",
      }}
    >
      {BUSINESS_TYPES[index]}
    </span>
  );
}

// ── Code lines shader for monitor screen ───────────────────────────
const ScreenVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ScreenFragmentShader = `
  varying vec2 vUv;
  uniform float uTime;

  float hash(float n) { return fract(sin(n) * 43758.5453); }

  void main() {
    vec2 uv = vUv;
    vec3 bg = vec3(0.04, 0.06, 0.06);

    float lineHeight = 0.035;
    float scrollOffset = uTime * 0.15;
    float lineIndex = floor((uv.y + scrollOffset) / lineHeight);

    float lineWidth = 0.15 + hash(lineIndex * 1.1) * 0.55;
    float lineStart = 0.05 + hash(lineIndex * 2.2) * 0.05;
    float indent = floor(hash(lineIndex * 3.3) * 3.0) * 0.06;

    float lineFrac = fract((uv.y + scrollOffset) / lineHeight);
    float isLine = step(0.25, lineFrac) * step(lineFrac, 0.75);
    float isInLine = step(lineStart + indent, uv.x) * step(uv.x, lineStart + indent + lineWidth);

    float colorChoice = hash(lineIndex * 4.4);
    vec3 lineColor = mix(
      vec3(0.08, 0.72, 0.65),
      vec3(0.55, 0.65, 0.63),
      step(0.4, colorChoice)
    );
    lineColor = mix(lineColor, vec3(0.96, 0.62, 0.04), step(0.8, colorChoice));

    float cursorLine = floor((uv.y + scrollOffset) / lineHeight);
    float cursorBlink = step(0.5, fract(uTime * 1.5));
    float isCursor = step(abs(cursorLine - floor(scrollOffset / lineHeight + 12.0)), 0.5)
                   * step(abs(uv.x - 0.45), 0.004) * cursorBlink;

    vec3 col = bg + lineColor * isLine * isInLine * 0.8;
    col += vec3(0.08, 0.72, 0.65) * isCursor;
    col *= 0.95 + 0.05 * sin(uv.y * 400.0);

    float vig = 1.0 - length((uv - 0.5) * 1.2) * 0.3;
    col *= vig;

    gl_FragColor = vec4(col, 1.0);
  }
`;

// ── Isometric desk scene ───────────────────────────────────────────
function DeskScene() {
  const groupRef = useRef<THREE.Group>(null);

  const screenMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: ScreenVertexShader,
        fragmentShader: ScreenFragmentShader,
        uniforms: { uTime: { value: 0 } },
      }),
    []
  );

  useFrame(({ clock }) => {
    screenMaterial.uniforms.uTime.value = clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.15) * 0.05 + 0.4;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.5, 0.4, 0]} position={[0, -0.3, 0]} scale={0.9}>
      {/* Desk surface */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[3.5, 0.08, 2]} />
        <meshStandardMaterial color="#1a1f1f" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Desk legs */}
      {[[-1.6, -0.6, -0.85], [1.6, -0.6, -0.85], [-1.6, -0.6, 0.85], [1.6, -0.6, 0.85]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.06, 1.1, 0.06]} />
          <meshStandardMaterial color="#0f1414" metalness={0.4} roughness={0.5} />
        </mesh>
      ))}

      {/* Monitor stand */}
      <mesh position={[0, 0.15, -0.5]}>
        <boxGeometry args={[0.3, 0.3, 0.06]} />
        <meshStandardMaterial color="#111" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.05, -0.5]}>
        <boxGeometry args={[0.5, 0.04, 0.25]} />
        <meshStandardMaterial color="#111" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Monitor frame */}
      <mesh position={[0, 0.85, -0.55]}>
        <boxGeometry args={[2.2, 1.3, 0.06]} />
        <meshStandardMaterial color="#0a0e0e" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Monitor screen with code */}
      <mesh position={[0, 0.85, -0.515]} material={screenMaterial}>
        <planeGeometry args={[2.0, 1.12]} />
      </mesh>

      {/* Screen glow */}
      <pointLight position={[0, 0.85, 0.2]} color="#14B8A6" intensity={0.8} distance={3} />

      {/* Keyboard */}
      <mesh position={[0, 0.02, 0.2]}>
        <boxGeometry args={[1.2, 0.04, 0.45]} />
        <meshStandardMaterial color="#151a1a" metalness={0.5} roughness={0.4} />
      </mesh>
      {[0, 0.08, 0.16, -0.08].map((z, row) =>
        Array.from({ length: 10 + (row === 3 ? -2 : 0) }, (_, i) => {
          const x = -0.45 + i * 0.1 + (row === 3 ? 0.1 : 0);
          return (
            <mesh key={`${row}-${i}`} position={[x, 0.05, 0.08 + z]}>
              <boxGeometry args={[0.07, 0.02, 0.06]} />
              <meshStandardMaterial color="#1e2828" metalness={0.3} roughness={0.5} />
            </mesh>
          );
        })
      )}

      {/* Mouse */}
      <mesh position={[0.9, 0.02, 0.25]}>
        <boxGeometry args={[0.15, 0.04, 0.25]} />
        <meshStandardMaterial color="#151a1a" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Coffee cup */}
      <group position={[-1.2, 0.2, 0.3]}>
        <mesh>
          <cylinderGeometry args={[0.1, 0.08, 0.22, 16]} />
          <meshStandardMaterial color="#1a2020" metalness={0.3} roughness={0.6} />
        </mesh>
        <mesh position={[0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.06, 0.015, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#1a2020" metalness={0.3} roughness={0.6} />
        </mesh>
        <pointLight position={[0, 0.2, 0]} color="#ffffff" intensity={0.15} distance={0.5} />
      </group>

      {/* Small plant */}
      <group position={[1.4, 0.2, -0.5]}>
        <mesh>
          <cylinderGeometry args={[0.1, 0.08, 0.18, 8]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.8} />
        </mesh>
        {[0, 1.2, 2.4, 3.6, 4.8].map((angle, i) => (
          <mesh key={i} position={[Math.cos(angle) * 0.06, 0.15 + i * 0.04, Math.sin(angle) * 0.06]} rotation={[0.3, angle, 0.2]}>
            <sphereGeometry args={[0.05, 8, 6]} />
            <meshStandardMaterial color="#14B8A6" transparent opacity={0.5 + i * 0.1} />
          </mesh>
        ))}
      </group>

      {/* Teal accent strip on monitor */}
      <mesh position={[0, 0.21, -0.52]}>
        <boxGeometry args={[2.2, 0.015, 0.065]} />
        <meshBasicMaterial color="#14B8A6" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// ── Stars ──────────────────────────────────────────────────────────
function Stars() {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = -Math.random() * 10 - 3;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.elapsedTime * 0.003;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#ffffff" size={0.02} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

// ── Scene ──────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 5, 4]} intensity={0.7} />
      <directionalLight position={[-2, 3, 2]} intensity={0.3} color="#14B8A6" />
      <Stars />
      <DeskScene />
    </>
  );
}

// ── Process milestones ─────────────────────────────────────────────
const MILESTONES = [
  { threshold: 0.15, title: "Nos reunimos contigo", desc: "Entendemos tu negocio y objetivos" },
  { threshold: 0.4, title: "Diseñamos tu solución", desc: "Propuesta visual a medida para tu rubro" },
  { threshold: 0.65, title: "Desarrollamos", desc: "Código limpio, avances que puedes ver cada semana" },
  { threshold: 0.85, title: "Lanzamos juntos", desc: "Tu negocio visible para el mundo" },
];

export default function RocketLaunch() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height - window.innerHeight;
      if (sectionHeight <= 0) return;
      const raw = -rect.top / sectionHeight;
      scrollProgress.current = Math.max(0, Math.min(1, raw));
      setProgress(scrollProgress.current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050A0A]"
      style={{ height: "300vh" }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 grid lg:grid-cols-2">
          {/* Left: Text */}
          <div className="flex flex-col justify-center px-8 md:px-16 z-10">
            <p className="text-[13px] text-white/50 tracking-widest uppercase mb-4">
              Tu negocio despega
            </p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.02em] mb-3">
              <span className="text-white/90 block">Creamos webs para</span>
              <CyclingBusiness />
            </h2>
            <p className="text-white/40 text-[15px] mb-10 max-w-sm">
              No importa tu rubro. Si necesitas presencia digital, lo construimos para ti.
            </p>

            <div className="space-y-7 max-w-sm">
              {MILESTONES.map((m, i) => {
                const active = progress >= m.threshold;
                const isCurrent =
                  active && (i === MILESTONES.length - 1 || progress < MILESTONES[i + 1].threshold);
                return (
                  <div
                    key={m.title}
                    className="flex items-start gap-4 transition-all duration-700"
                    style={{
                      opacity: active ? 1 : 0.2,
                      transform: active ? "translateX(0)" : "translateX(-20px)",
                    }}
                  >
                    <div
                      className="mt-1.5 w-3 h-3 rounded-full border-2 flex-shrink-0 transition-all duration-500"
                      style={{
                        borderColor: active ? "#14B8A6" : "#1E2A2A",
                        background: isCurrent ? "#14B8A6" : "transparent",
                        boxShadow: isCurrent ? "0 0 12px rgba(20,184,166,0.5)" : "none",
                      }}
                    />
                    <div>
                      <h3 className="text-lg font-medium text-white/90">{m.title}</h3>
                      <p className="text-[14px] text-white/45">{m.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="mt-12 w-48">
              <div className="h-px bg-white/10 relative">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-500 to-teal-400 transition-all duration-100"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right: 3D Desk */}
          <div className="relative hidden lg:block">
            {mounted && (
              <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                style={{ background: "transparent" }}
                gl={{ alpha: true, antialias: true }}
              >
                <Scene />
              </Canvas>
            )}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
              style={{
                background: `radial-gradient(circle, rgba(20,184,166,${0.03 + progress * 0.06}), transparent 70%)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
