"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  once?: boolean;
}

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  y = 30,
  x = 0,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.set(ref.current, {
      opacity: 0,
      y: y,
      x: x,
    });

    gsap.to(ref.current, {
      opacity: 1,
      y: 0,
      x: 0,
      duration: duration,
      delay: delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 90%",
        once: once,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [delay, duration, y, x, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// Staggered children fade in
interface StaggerFadeInProps {
  children: React.ReactNode;
  className?: string;
  childClassName?: string;
  stagger?: number;
  delay?: number;
}

export function StaggerFadeIn({
  children,
  className = "",
  childClassName = "",
  stagger = 0.1,
  delay = 0,
}: StaggerFadeInProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".stagger-item");

    gsap.set(items, {
      opacity: 0,
      y: 40,
    });

    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: stagger,
      delay: delay,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [stagger, delay]);

  return (
    <div ref={containerRef} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div key={index} className={`stagger-item ${childClassName}`}>
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
