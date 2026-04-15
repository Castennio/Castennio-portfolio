"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Check for mobile/touch device once
const isMobileDevice = () => {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(max-width: 768px)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
};

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
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    setIsReady(true);

    const isMobile = isMobileDevice();

    // On mobile: use native IntersectionObserver with CSS transitions (much lighter)
    if (isMobile) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Small delay to stagger animations naturally
            setTimeout(() => setIsVisible(true), delay * 1000);
            if (once) observer.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
      );

      observer.observe(ref.current);
      return () => observer.disconnect();
    }

    // Desktop: use GSAP with ScrollTrigger for smooth animations
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          y: y,
          x: x,
        },
        {
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
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, duration, y, x, once]);

  // Mobile uses CSS transitions instead of GSAP
  const isMobile = typeof window !== "undefined" && isMobileDevice();

  return (
    <div
      ref={ref}
      className={className}
      style={
        isMobile
          ? {
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "none" : `translateY(${y}px)`,
              transition: `opacity ${duration}s ease-out, transform ${duration}s ease-out`,
            }
          : {
              opacity: isReady ? undefined : 1,
              transform: isReady ? undefined : "none",
            }
      }
    >
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
  const [isReady, setIsReady] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!containerRef.current) return;

    setIsReady(true);
    const isMobile = isMobileDevice();

    // On mobile: use IntersectionObserver with CSS transitions
    if (isMobile) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const items = containerRef.current?.querySelectorAll(".stagger-item");
            items?.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => new Set([...prev, index]));
              }, (delay + index * stagger) * 1000);
            });
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }

    // Desktop: use GSAP
    const items = containerRef.current.querySelectorAll(".stagger-item");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 40,
        },
        {
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
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [stagger, delay]);

  const isMobile = typeof window !== "undefined" && isMobileDevice();

  return (
    <div ref={containerRef} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              className={`stagger-item ${childClassName}`}
              style={
                isMobile
                  ? {
                      opacity: visibleItems.has(index) ? 1 : 0,
                      transform: visibleItems.has(index) ? "none" : "translateY(40px)",
                      transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                    }
                  : {
                      opacity: isReady ? undefined : 1,
                      transform: isReady ? undefined : "none",
                    }
              }
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
