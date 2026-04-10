"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import { questions, type DiagnosisAnswer, type Question } from "./data";

interface DiagnosisQuizProps {
  currentStep: number;
  answers: DiagnosisAnswer[];
  onAnswer: (questionId: string, optionId: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function DiagnosisQuiz({
  currentStep,
  answers,
  onAnswer,
  onNext,
  onBack,
}: DiagnosisQuizProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const question = questions[currentStep];
  const currentAnswer = answers.find((a) => a.questionId === question.id);
  const hasSelection = currentAnswer && currentAnswer.selectedOptions.length > 0;

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".option-card");
      gsap.fromTo(
        cards,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [currentStep]);

  const handleSelect = (optionId: string) => {
    onAnswer(question.id, optionId);
  };

  const isSelected = (optionId: string) => {
    return currentAnswer?.selectedOptions.includes(optionId) || false;
  };

  return (
    <div ref={containerRef}>
      <ProgressBar currentStep={currentStep} totalSteps={questions.length} />

      {/* Question header */}
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-medium text-white/90 mb-2">
          {question.question}
        </h3>
        <p className="text-white/50 text-[15px]">{question.subtitle}</p>
      </div>

      {/* Options grid */}
      <div
        className={`grid gap-3 mb-8 ${
          question.options.length <= 4
            ? "md:grid-cols-2"
            : "md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {question.options.map((option, index) => (
          <QuestionCard
            key={option.id}
            option={option}
            isSelected={isSelected(option.id)}
            onSelect={() => handleSelect(option.id)}
            index={index}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-medium transition-all duration-300 ${
            currentStep === 0
              ? "text-white/20 cursor-not-allowed"
              : "text-white/60 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Anterior
        </button>

        <button
          onClick={onNext}
          disabled={!hasSelection}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium transition-all duration-300 ${
            hasSelection
              ? "bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              : "bg-white/10 text-white/30 cursor-not-allowed"
          }`}
        >
          {currentStep === questions.length - 1 ? "Ver mi diagnóstico" : "Siguiente"}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
