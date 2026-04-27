'use client';

import { useState, useCallback, useEffect } from 'react';
import AdminGuard from '@/app/components/admin/AdminGuard';
import {
  PlanSelector,
  ClientTypeSelector,
  UrgencySelector,
  AddonsSelector,
  QuoteSummary,
} from '@/app/components/admin/calculator';
import { calculateQuote, isQuoteComplete } from '@/lib/pricing';
import type {
  PlanId,
  ClientType,
  UrgencyLevel,
  AddonId,
  QuoteCalculation,
  QuoteFormState,
} from '@/types/pricing';

function CalculatorContent() {
  const [formState, setFormState] = useState<QuoteFormState>({
    selectedPlan: null,
    selectedClientType: null,
    selectedUrgency: null,
    selectedAddons: [],
  });

  const [quote, setQuote] = useState<QuoteCalculation | null>(null);
  const [clientName, setClientName] = useState('');

  // Calculate quote whenever form state changes
  useEffect(() => {
    if (formState.selectedPlan && formState.selectedClientType && formState.selectedUrgency) {
      setQuote(calculateQuote(
        formState.selectedPlan,
        formState.selectedClientType,
        formState.selectedUrgency,
        formState.selectedAddons
      ));
    } else {
      setQuote(null);
    }
  }, [formState.selectedPlan, formState.selectedClientType, formState.selectedUrgency, formState.selectedAddons]);

  const handlePlanSelect = useCallback((planId: PlanId) => {
    setFormState((prev) => ({ ...prev, selectedPlan: planId }));
  }, []);

  const handleClientTypeSelect = useCallback((clientType: ClientType) => {
    setFormState((prev) => ({ ...prev, selectedClientType: clientType }));
  }, []);

  const handleUrgencySelect = useCallback((urgency: UrgencyLevel) => {
    setFormState((prev) => ({ ...prev, selectedUrgency: urgency }));
  }, []);

  const handleAddonToggle = useCallback((addonId: AddonId) => {
    setFormState((prev) => {
      const newAddons = prev.selectedAddons.includes(addonId)
        ? prev.selectedAddons.filter((id) => id !== addonId)
        : [...prev.selectedAddons, addonId];
      return { ...prev, selectedAddons: newAddons };
    });
  }, []);

  const handleReset = useCallback(() => {
    setFormState({
      selectedPlan: null,
      selectedClientType: null,
      selectedUrgency: null,
      selectedAddons: [],
    });
    setClientName('');
  }, []);

  const isComplete = isQuoteComplete(
    formState.selectedPlan,
    formState.selectedClientType,
    formState.selectedUrgency
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center hover:bg-[#7C3AED]/20 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-[#7C3AED]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </a>
              <div>
                <h1 className="text-xl font-semibold text-white/90">
                  Calculadora de Cotizaciones
                </h1>
                <p className="text-[13px] text-white/40">
                  Panel administrativo CASTENNIO
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 text-[11px] font-medium tracking-wider uppercase bg-[#7C3AED]/10 text-[#A78BFA] rounded-full">
                Admin
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Selectors */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6">
              <PlanSelector
                selected={formState.selectedPlan}
                onSelect={handlePlanSelect}
              />
            </section>

            <section className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6">
              <ClientTypeSelector
                selected={formState.selectedClientType}
                onSelect={handleClientTypeSelect}
                disabled={!formState.selectedPlan}
              />
            </section>

            <section className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6">
              <UrgencySelector
                selected={formState.selectedUrgency}
                onSelect={handleUrgencySelect}
                selectedPlan={formState.selectedPlan}
                disabled={!formState.selectedClientType}
              />
            </section>

            <section className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6">
              <AddonsSelector
                selected={formState.selectedAddons}
                onToggle={handleAddonToggle}
                disabled={!formState.selectedUrgency}
              />
            </section>
          </div>

          {/* Right column - Summary */}
          <div className="lg:col-span-1">
            <QuoteSummary
              quote={quote}
              onReset={handleReset}
              isComplete={isComplete}
              clientName={clientName}
              onClientNameChange={setClientName}
            />
          </div>
        </div>

        <p className="text-center text-white/30 text-[12px] mt-12">
          Herramienta interna de cotización. Los precios son estimados y pueden variar según el alcance final del proyecto.
        </p>
      </main>
    </div>
  );
}

export default function CalculadoraPage() {
  return (
    <AdminGuard>
      <CalculatorContent />
    </AdminGuard>
  );
}
