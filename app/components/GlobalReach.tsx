"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import FadeIn from "./FadeIn";
import { WordReveal, GradientReveal } from "./TextReveal";

// ponytail: points generated once, static array — add real client locations when available
const POINTS = (() => {
  const coords: [number, number][] = [
    // Latin America
    [19.4, -99.1], [4.7, -74.1], [-34.6, -58.4], [-12.0, -77.0],
    [-23.5, -46.6], [10.5, -66.9], [-33.4, -70.6], [-0.2, -78.5],
    [-15.8, -47.9], [14.6, -90.5], [9.9, -84.1], [18.5, -69.9],
    [6.2, -75.6], [20.0, -75.8], [25.7, -100.3], [21.2, -89.6],
    // USA / Canada
    [40.7, -74.0], [34.0, -118.2], [41.9, -87.6], [29.8, -95.4],
    [37.8, -122.4], [33.4, -112.1], [25.8, -80.2], [45.5, -73.6],
    [43.7, -79.4], [49.3, -123.1], [47.6, -122.3], [39.7, -105.0],
    // Europe
    [51.5, -0.1], [48.9, 2.3], [40.4, -3.7], [52.5, 13.4],
    [41.9, 12.5], [55.8, 37.6], [59.3, 18.1], [52.4, 4.9],
    // Asia
    [35.7, 139.7], [37.6, 127.0], [22.3, 114.2], [1.4, 103.9],
    [28.6, 77.2], [31.2, 121.5], [39.9, 116.4], [13.8, 100.5],
    // Others
    [-33.9, 151.2], [36.8, 10.2], [-1.3, 36.8], [30.0, 31.2],
    [33.6, -7.6], [-26.2, 28.0],
  ];
  return coords.map(([lat, lon]) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const r = 1.5;
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
  });
})();

function Globe() {
  const globeRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const wireframeGeo = useMemo(() => new THREE.SphereGeometry(1.5, 36, 24), []);

  const pointsGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(POINTS.length * 3);
    POINTS.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    });
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  const pointsMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color("#2DD4BF"),
        size: 0.06,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
      }),
    []
  );

  // ponytail: simple auto-rotate, add scroll-driven rotation when needed
  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Wireframe sphere */}
      <lineSegments>
        <edgesGeometry args={[wireframeGeo]} />
        <lineBasicMaterial color="#14B8A6" transparent opacity={0.08} />
      </lineSegments>

      {/* Solid dark sphere inside */}
      <mesh>
        <sphereGeometry args={[1.48, 36, 24]} />
        <meshBasicMaterial color="#050A0A" transparent opacity={0.95} />
      </mesh>

      {/* City points */}
      <points ref={pointsRef} geometry={pointsGeo} material={pointsMat} />

      {/* Glow */}
      <mesh ref={glowRef} scale={1.65}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#14B8A6" transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <Globe />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
}

export default function GlobalReach() {
  // ponytail: lazy-load Canvas to avoid SSR issues with three.js
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="alcance" className="py-16 lg:py-24 px-6 bg-[#050A0A] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <FadeIn>
              <p className="text-[13px] text-white/50 tracking-widest uppercase mb-4">
                Alcance global
              </p>
            </FadeIn>
            <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.02em] mb-6">
              <WordReveal as="span" className="text-white/90 block" delay={0.1}>
                Tu negocio visible
              </WordReveal>
              <GradientReveal
                as="span"
                className="block"
                delay={0.3}
                gradientFrom="#14B8A6"
                gradientTo="#2DD4BF"
              >
                en todo el mundo
              </GradientReveal>
            </h2>
            <p className="text-white/55 text-[15px] leading-relaxed mb-8 max-w-md">
              No importa dónde estés. Creamos presencia digital que llega a
              clientes en cualquier parte del planeta. Tu próximo cliente
              podría estar al otro lado del mundo.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "24/7", label: "Tu sitio siempre activo" },
                { value: "100%", label: "Responsive & rápido" },
                { value: "SEO", label: "Optimizado para Google" },
              ].map((stat) => (
                <div key={stat.label} className="border border-white/[0.06] rounded-xl p-4 bg-[#0D1414]">
                  <div className="text-2xl font-semibold text-teal-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[13px] text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Globe */}
          <div className="h-[400px] md:h-[500px] relative">
            {mounted && (
              <Canvas
                camera={{ position: [0, 0, 4.2], fov: 45 }}
                style={{ background: "transparent" }}
                gl={{ alpha: true, antialias: true }}
              >
                <Scene />
              </Canvas>
            )}
            {/* Radial glow behind globe */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-teal-500/[0.06] rounded-full blur-[80px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
