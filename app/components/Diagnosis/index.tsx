"use client";

import { useState, useRef } from "react";
import FadeIn from "../FadeIn";
import { WordReveal, GradientReveal, BlurReveal } from "../TextReveal";
import DiagnosisQuiz from "./DiagnosisQuiz";
import DiagnosisResult from "./DiagnosisResult";
import CalculatingOverlay from "./CalculatingOverlay";
import {
  questions,
  calculateDiagnosis,
  type DiagnosisAnswer,
  type DiagnosisResult as DiagnosisResultType,
} from "./data";

interface DiagnosisState {
  started: boolean;
  currentStep: number;
  answers: DiagnosisAnswer[];
  isCalculating: boolean;
  showResult: boolean;
  result: DiagnosisResultType | null;
}

export default function Diagnosis() {
  const [state, setState] = useState<DiagnosisState>({
    started: false,
    currentStep: 0,
    answers: [],
    isCalculating: false,
    showResult: false,
    result: null,
  });

  const sectionRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    setState((prev) => ({ ...prev, started: true }));
  };

  const handleAnswer = (questionId: string, optionId: string) => {
    setState((prev) => {
      const question = questions.find((q) => q.id === questionId);
      const existingAnswer = prev.answers.find((a) => a.questionId === questionId);

      if (question?.multiSelect) {
        // Multi-select: toggle option
        if (existingAnswer) {
          const isSelected = existingAnswer.selectedOptions.includes(optionId);
          return {
            ...prev,
            answers: prev.answers.map((a) =>
              a.questionId === questionId
                ? {
                    ...a,
                    selectedOptions: isSelected
                      ? a.selectedOptions.filter((id) => id !== optionId)
                      : [...a.selectedOptions, optionId],
                  }
                : a
            ),
          };
        } else {
          return {
            ...prev,
            answers: [...prev.answers, { questionId, selectedOptions: [optionId] }],
          };
        }
      } else {
        // Single select: replace
        if (existingAnswer) {
          return {
            ...prev,
            answers: prev.answers.map((a) =>
              a.questionId === questionId ? { ...a, selectedOptions: [optionId] } : a
            ),
          };
        } else {
          return {
            ...prev,
            answers: [...prev.answers, { questionId, selectedOptions: [optionId] }],
          };
        }
      }
    });
  };

  const handleNext = () => {
    if (state.currentStep < questions.length - 1) {
      setState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
    } else {
      // Last step - calculate result
      setState((prev) => ({ ...prev, isCalculating: true }));
    }
  };

  const handleBack = () => {
    if (state.currentStep > 0) {
      setState((prev) => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const handleCalculationComplete = () => {
    const result = calculateDiagnosis(state.answers);
    setState((prev) => ({
      ...prev,
      isCalculating: false,
      showResult: true,
      result,
    }));
  };

  const handleReset = () => {
    setState({
      started: false,
      currentStep: 0,
      answers: [],
      isCalculating: false,
      showResult: false,
      result: null,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="diagnostico"
      className="py-32 px-6 bg-[#050505] relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.04)_0%,_transparent_60%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-3xl mx-auto">
        {!state.started && !state.showResult && (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <FadeIn>
                <p className="text-[13px] text-white/50 tracking-widest uppercase mb-4">
                  Diagnóstico gratuito
                </p>
              </FadeIn>
              <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.02em] mb-6">
                <WordReveal as="span" className="text-white/90" delay={0.1}>
                  ¿Cuánto tiempo
                </WordReveal>{" "}
                <GradientReveal
                  as="span"
                  className="inline-block"
                  delay={0.3}
                  gradientFrom="#3b82f6"
                  gradientTo="#8b5cf6"
                >
                  estás perdiendo?
                </GradientReveal>
              </h2>
              <BlurReveal
                as="p"
                className="text-white/55 text-lg max-w-xl mx-auto leading-relaxed"
                delay={0.4}
                stagger={0.01}
              >
                Responde 4 preguntas rápidas y descubre cuántas horas a la semana
                podrías recuperar automatizando tu negocio.
              </BlurReveal>
            </div>

            {/* Start CTA */}
            <FadeIn delay={0.5}>
              <div className="text-center">
                <button
                  onClick={handleStart}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium text-base rounded-full transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
                >
                  <span>Comenzar diagnóstico</span>
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>

                <div className="mt-6 flex items-center justify-center gap-6 text-white/40 text-[13px]">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    2 minutos
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    100% gratis
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Sin datos personales
                  </span>
                </div>
              </div>
            </FadeIn>
          </>
        )}

        {state.started && !state.showResult && (
          <FadeIn>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-10">
              <DiagnosisQuiz
                currentStep={state.currentStep}
                answers={state.answers}
                onAnswer={handleAnswer}
                onNext={handleNext}
                onBack={handleBack}
              />
            </div>
          </FadeIn>
        )}

        {state.showResult && state.result && (
          <FadeIn>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-10">
              <DiagnosisResult result={state.result} onReset={handleReset} />
            </div>
          </FadeIn>
        )}
      </div>

      {/* Calculating overlay */}
      {state.isCalculating && (
        <CalculatingOverlay onComplete={handleCalculationComplete} />
      )}
    </section>
  );
}
