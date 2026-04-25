"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  baseSpeedX: number;
  baseSpeedY: number;
  opacity: number;
  opacitySpeed: number;
  opacityDirection: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

interface MousePosition {
  x: number;
  y: number;
}

interface SparkleParticlesProps {
  count?: number;
  className?: string;
}

export default function SparkleParticles({ count = 50, className = "" }: SparkleParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef<MousePosition>({ x: -1000, y: -1000 });
  const [isDark, setIsDark] = useState(true);

  // Detect theme
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? Math.floor(count * 0.5) : count;

    for (let i = 0; i < particleCount; i++) {
      const speedX = (Math.random() - 0.5) * 0.3;
      const speedY = (Math.random() - 0.5) * 0.3 - 0.1;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedX,
        speedY,
        baseSpeedX: speedX,
        baseSpeedY: speedY,
        opacity: Math.random() * 0.5 + 0.1,
        opacitySpeed: Math.random() * 0.008 + 0.003,
        opacityDirection: Math.random() > 0.5 ? 1 : -1,
        hue: Math.random() > 0.5 ? 220 : 270, // Blue or purple
        pulse: 0,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    particlesRef.current = particles;
  }, [count]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      initParticles(rect.width, rect.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const mouse = mouseRef.current;
      const interactionRadius = 150;

      particlesRef.current.forEach((particle) => {
        // Calculate distance from mouse
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Mouse interaction - particles flow away from cursor
        if (distance < interactionRadius && distance > 0) {
          const force = (interactionRadius - distance) / interactionRadius;
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force * -2;
          const pushY = Math.sin(angle) * force * -2;

          particle.speedX = particle.baseSpeedX + pushX;
          particle.speedY = particle.baseSpeedY + pushY;

          // Boost opacity when near mouse
          if (particle.opacity < 0.7) {
            particle.opacity += 0.02;
          }
        } else {
          // Gradually return to base speed
          particle.speedX += (particle.baseSpeedX - particle.speedX) * 0.05;
          particle.speedY += (particle.baseSpeedY - particle.speedY) * 0.05;
        }

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Update pulse
        particle.pulse += particle.pulseSpeed;

        // Update opacity with twinkle effect
        particle.opacity += particle.opacitySpeed * particle.opacityDirection;
        if (particle.opacity >= 0.8) {
          particle.opacityDirection = -1;
        } else if (particle.opacity <= 0.05) {
          particle.opacityDirection = 1;
        }

        // Wrap around edges
        if (particle.x < -10) particle.x = rect.width + 10;
        if (particle.x > rect.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = rect.height + 10;
        if (particle.y > rect.height + 10) particle.y = -10;

        // Calculate pulsing size
        const pulseSize = particle.size + Math.sin(particle.pulse) * 0.5;

        // Draw glow
        const glowSize = pulseSize * 4;
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowSize
        );

        if (isDark) {
          gradient.addColorStop(0, `hsla(${particle.hue}, 80%, 70%, ${particle.opacity * 0.8})`);
          gradient.addColorStop(0.3, `hsla(${particle.hue}, 70%, 60%, ${particle.opacity * 0.3})`);
          gradient.addColorStop(1, `hsla(${particle.hue}, 60%, 50%, 0)`);
        } else {
          gradient.addColorStop(0, `hsla(${particle.hue}, 90%, 55%, ${particle.opacity * 0.6})`);
          gradient.addColorStop(0.3, `hsla(${particle.hue}, 80%, 50%, ${particle.opacity * 0.2})`);
          gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 45%, 0)`);
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw core sparkle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `hsla(${particle.hue}, 100%, 90%, ${particle.opacity})`
          : `hsla(${particle.hue}, 100%, 60%, ${particle.opacity * 0.8})`;
        ctx.fill();

        // Draw star cross effect for brighter particles
        if (particle.opacity > 0.4) {
          const crossSize = pulseSize * 3;
          const crossOpacity = (particle.opacity - 0.4) * 1.5;

          ctx.strokeStyle = isDark
            ? `hsla(${particle.hue}, 100%, 85%, ${crossOpacity * 0.3})`
            : `hsla(${particle.hue}, 100%, 55%, ${crossOpacity * 0.2})`;
          ctx.lineWidth = 0.5;

          // Horizontal line
          ctx.beginPath();
          ctx.moveTo(particle.x - crossSize, particle.y);
          ctx.lineTo(particle.x + crossSize, particle.y);
          ctx.stroke();

          // Vertical line
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y - crossSize);
          ctx.lineTo(particle.x, particle.y + crossSize);
          ctx.stroke();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation with slight delay for smooth init
    const timeoutId = setTimeout(() => {
      animate();
    }, 100);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
      clearTimeout(timeoutId);
    };
  }, [isDark, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute top-0 left-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity: isDark ? 0.7 : 0.5 }}
    />
  );
}
