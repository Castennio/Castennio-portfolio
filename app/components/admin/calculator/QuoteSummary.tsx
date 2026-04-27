'use client';

import { useState } from 'react';
import { formatCurrency, formatPercentage } from '@/lib/pricing';
import { downloadQuotePDF } from './QuotePDF';
import type { QuoteCalculation } from '@/types/pricing';

interface QuoteSummaryProps {
  quote: QuoteCalculation | null;
  onReset: () => void;
  isComplete: boolean;
  clientName: string;
  onClientNameChange: (name: string) => void;
}

function SummaryRow({
  label,
  value,
  variant = 'default',
}: {
  label: string;
  value: string;
  variant?: 'default' | 'adjustment' | 'total';
}) {
  return (
    <div
      className={`
        flex items-center justify-between py-3
        ${variant === 'total'
          ? 'border-t border-white/[0.08] pt-4 mt-2'
          : ''
        }
      `}
    >
      <span
        className={`
          ${variant === 'total'
            ? 'text-white/90 font-medium'
            : variant === 'adjustment'
              ? 'text-white/50 text-sm pl-4'
              : 'text-white/60'
          }
        `}
      >
        {label}
      </span>
      <span
        className={`
          font-mono
          ${variant === 'total'
            ? 'text-[#A78BFA] text-xl font-semibold'
            : variant === 'adjustment'
              ? 'text-amber-400/80 text-sm'
              : 'text-white/80'
          }
        `}
      >
        {value}
      </span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/[0.02] flex items-center justify-center">
        <svg
          className="w-7 h-7 text-white/20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      </div>
      <p className="text-white/40 text-sm mb-1">Sin cotización</p>
      <p className="text-white/25 text-xs">
        Selecciona las opciones para ver el resumen
      </p>
    </div>
  );
}

export default function QuoteSummary({
  quote,
  onReset,
  isComplete,
  clientName,
  onClientNameChange,
}: QuoteSummaryProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    if (!quote) return;
    setIsGenerating(true);
    try {
      await downloadQuotePDF(quote, clientName.trim() || undefined);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Intenta de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-[#0f1015] border border-white/[0.06] rounded-2xl overflow-hidden h-fit sticky top-6">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/[0.06] bg-gradient-to-r from-[#7C3AED]/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#7C3AED]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white/90">Resumen</h3>
            <p className="text-[12px] text-white/40">Cotización estimada</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {!quote ? (
          <EmptyState />
        ) : (
          <div className="space-y-1">
            {/* Selected options */}
            <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-white/40 uppercase tracking-wider">Plan</span>
                  <span className="text-sm text-white/80 font-medium">{quote.plan.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-white/40 uppercase tracking-wider">Cliente</span>
                  <span className="text-sm text-white/80">{quote.clientType.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-white/40 uppercase tracking-wider">Urgencia</span>
                  <span className="text-sm text-white/80">{quote.urgency.name}</span>
                </div>
              </div>
            </div>

            {/* Delivery time */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-[#7C3AED]/5 border border-[#7C3AED]/10 mb-6">
              <svg
                className="w-5 h-5 text-[#7C3AED] flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="text-[12px] text-white/40">Tiempo estimado</p>
                <p className="text-[#A78BFA] font-medium">{quote.deliveryTime}</p>
              </div>
            </div>

            {/* Price breakdown */}
            <SummaryRow
              label="Precio base"
              value={formatCurrency(quote.basePrice)}
            />
            {quote.clientTypeAdjustment > 0 && (
              <SummaryRow
                label={`+ ${quote.clientType.name} (${formatPercentage(quote.clientType.multiplier)})`}
                value={`+${formatCurrency(quote.clientTypeAdjustment)}`}
                variant="adjustment"
              />
            )}
            {quote.urgencyAdjustment > 0 && (
              <SummaryRow
                label={`+ ${quote.urgency.name} (${formatPercentage(quote.urgency.multiplier)})`}
                value={`+${formatCurrency(quote.urgencyAdjustment)}`}
                variant="adjustment"
              />
            )}

            {/* Addons */}
            {quote.addons.length > 0 && (
              <>
                <div className="pt-3 mt-3 border-t border-white/[0.04]">
                  <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Servicios adicionales</p>
                </div>
                {quote.addons.map((addon) => (
                  <SummaryRow
                    key={addon.id}
                    label={`+ ${addon.name}`}
                    value={`+${formatCurrency(addon.minPrice)}`}
                    variant="adjustment"
                  />
                ))}
              </>
            )}

            <SummaryRow
              label="Precio final estimado"
              value={formatCurrency(quote.finalPrice)}
              variant="total"
            />

            {/* Notes */}
            {quote.notes.length > 0 && (
              <div className="mt-6 pt-4 border-t border-white/[0.06]">
                <p className="text-[11px] text-white/30 uppercase tracking-wider mb-3">Notas</p>
                <ul className="space-y-2">
                  {quote.notes.map((note, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-white/20 mt-1">-</span>
                      <span className="text-[12px] text-white/40 leading-relaxed">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Validation warning */}
            {quote.requiresValidation && (
              <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-start gap-2">
                  <svg
                    className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <p className="text-[12px] text-amber-300/80">
                    Requiere validación del equipo técnico
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-6 pb-6 space-y-3">
        {/* Client name input */}
        <div>
          <label className="block text-[11px] text-white/40 uppercase tracking-wider mb-2">
            Empresa / Cliente (opcional)
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => onClientNameChange(e.target.value)}
            placeholder="Ej: Mi Empresa S.A.C."
            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]
                       text-white/90 text-sm placeholder:text-white/30
                       focus:outline-none focus:border-[#7C3AED]/50 focus:bg-white/[0.06]
                       transition-all duration-200"
          />
        </div>

        <button
          onClick={handleGeneratePDF}
          disabled={!isComplete || isGenerating}
          className={`
            w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-300
            ${isComplete && !isGenerating
              ? 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-[0_0_30px_-10px_rgba(124,58,237,0.5)]'
              : 'bg-white/[0.04] text-white/30 cursor-not-allowed'
            }
          `}
        >
          <span className="flex items-center justify-center gap-2">
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generando PDF...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Descargar PDF
              </>
            )}
          </span>
        </button>
        <button
          onClick={onReset}
          disabled={!quote}
          className={`
            w-full py-3 rounded-xl font-medium text-sm transition-all duration-300
            border border-white/[0.06]
            ${quote
              ? 'text-white/60 hover:text-white hover:border-white/[0.12] hover:bg-white/[0.02]'
              : 'text-white/20 cursor-not-allowed'
            }
          `}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}
