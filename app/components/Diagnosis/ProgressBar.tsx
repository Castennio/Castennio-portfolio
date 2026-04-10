"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const percentage = ((currentStep + 1) / totalSteps) * 100;

  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${percentage}%`,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [percentage]);

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[13px] text-white/50 font-medium">
          Paso {currentStep + 1} de {totalSteps}
        </span>
        <span className="text-[13px] text-white/30">{Math.round(percentage)}%</span>
      </div>
      <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
          style={{ width: 0 }}
        />
      </div>
    </div>
  );
}
