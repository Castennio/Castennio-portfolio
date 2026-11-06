"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { featureTabs } from "@/lib/content/landing";

export function FeaturesTabs() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const interval = setInterval(() => {
      if (!mounted.current) return;
      setProgress((p) => {
        if (p >= 100) {
          setActive((c) => (c + 1) % featureTabs.length);
          return 0;
        }
        return p + 2;
      });
    }, 100);
    return () => {
      mounted.current = false;
      clearInterval(interval);
    };
  }, []);

  const handleClick = (i: number) => {
    setActive(i);
    setProgress(0);
  };

  return (
    <section id="funcionalidades" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Image area */}
        <div className="aspect-[16/10] rounded-xl border border-border bg-card shadow-sm mb-8 overflow-hidden relative">
          {featureTabs.map((tab, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-500 ${
                active === i ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={tab.image}
                alt={tab.imageAlt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 960px"
              />
            </div>
          ))}
        </div>

        {/* Tab buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-border rounded-xl overflow-hidden">
          {featureTabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`relative text-left p-5 md:p-6 transition-colors ${
                active === i ? "bg-card" : "bg-background hover:bg-card/50"
              } ${i < featureTabs.length - 1 ? "border-b md:border-b-0 md:border-r border-border" : ""}`}
            >
              {active === i && (
                <div className="absolute top-0 left-0 w-full h-0.5 bg-border">
                  <div
                    className="h-full bg-foreground transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
              <h3 className="font-semibold text-sm mb-1">{tab.title}</h3>
              <p className="text-muted-foreground text-[13px] leading-relaxed">
                {tab.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
