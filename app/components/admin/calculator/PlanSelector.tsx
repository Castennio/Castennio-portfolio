'use client';

import { PLAN_LIST } from '@/config/pricing';
import { formatPriceWithPrefix } from '@/lib/pricing';
import type { PlanId, PlanConfig } from '@/types/pricing';

interface PlanSelectorProps {
  selected: PlanId | null;
  onSelect: (planId: PlanId) => void;
}

function PlanCard({
  plan,
  isSelected,
  onSelect,
}: {
  plan: PlanConfig;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`
        relative w-full text-left p-5 rounded-xl border transition-all duration-300
        ${isSelected
          ? 'bg-[#7C3AED]/10 border-[#7C3AED]/50 shadow-[0_0_30px_-10px_rgba(124,58,237,0.3)]'
          : 'bg-[#0f1015] border-white/[0.06] hover:border-white/[0.12] hover:bg-[#14151a]'
        }
      `}
    >
      {/* Selection indicator */}
      <div
        className={`
          absolute top-4 right-4 w-5 h-5 rounded-full border-2 transition-all duration-300
          flex items-center justify-center
          ${isSelected
            ? 'border-[#7C3AED] bg-[#7C3AED]'
            : 'border-white/20'
          }
        `}
      >
        {isSelected && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      {/* Badge */}
      {plan.badge && (
        <span
          className={`
            inline-block px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase rounded-full mb-3
            ${isSelected
              ? 'bg-[#7C3AED]/20 text-[#A78BFA]'
              : 'bg-white/[0.04] text-white/40'
            }
          `}
        >
          {plan.badge}
        </span>
      )}

      {/* Plan name */}
      <h3
        className={`
          text-lg font-medium mb-1 pr-8 transition-colors
          ${isSelected ? 'text-white' : 'text-white/80'}
        `}
      >
        {plan.name}
      </h3>

      {/* Price */}
      <p
        className={`
          text-2xl font-semibold mb-3 transition-colors
          ${isSelected ? 'text-[#A78BFA]' : 'text-white/60'}
        `}
      >
        {formatPriceWithPrefix(plan)}
      </p>

      {/* Description */}
      <p className="text-[13px] text-white/40 leading-relaxed line-clamp-2">
        {plan.description}
      </p>
    </button>
  );
}

export default function PlanSelector({ selected, onSelect }: PlanSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/10 flex items-center justify-center">
          <span className="text-[#7C3AED] font-semibold text-sm">1</span>
        </div>
        <div>
          <h2 className="text-lg font-medium text-white/90">Selecciona el plan</h2>
          <p className="text-[13px] text-white/40">Elige el tipo de proyecto web</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PLAN_LIST.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isSelected={selected === plan.id}
            onSelect={() => onSelect(plan.id)}
          />
        ))}
      </div>
    </div>
  );
}
