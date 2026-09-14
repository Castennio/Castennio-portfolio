'use client';

import { useState, useCallback, useEffect } from 'react';
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

export default function CotizacionPage() {
  const [formState, setFormState] = useState<QuoteFormState>({
    selectedPlan: null,
    selectedClientType: null,
    selectedUrgency: null,
    selectedAddons: [],
  });

  const [quote, setQuote] = useState<QuoteCalculation | null>(null);
  const [clientName, setClientName] = useState('');

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
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white/90">Calculadora de Cotizaciones</h1>
        <p className="text-[13px] text-white/40 mt-1">Genera cotizaciones para tus clientes</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6">
            <PlanSelector selected={formState.selectedPlan} onSelect={handlePlanSelect} />
          </section>
          <section className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6">
            <ClientTypeSelector selected={formState.selectedClientType} onSelect={handleClientTypeSelect} disabled={!formState.selectedPlan} />
          </section>
          <section className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6">
            <UrgencySelector selected={formState.selectedUrgency} onSelect={handleUrgencySelect} selectedPlan={formState.selectedPlan} disabled={!formState.selectedClientType} />
          </section>
          <section className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6">
            <AddonsSelector selected={formState.selectedAddons} onToggle={handleAddonToggle} disabled={!formState.selectedUrgency} selectedPlan={formState.selectedPlan} />
          </section>
        </div>
        <div className="lg:col-span-1">
          <QuoteSummary quote={quote} onReset={handleReset} isComplete={isComplete} clientName={clientName} onClientNameChange={setClientName} />
        </div>
      </div>
      <p className="text-center text-white/30 text-[12px] mt-12">
        Herramienta interna de cotización. Los precios son estimados y pueden variar según el alcance final del proyecto.
      </p>
    </div>
  );
}
