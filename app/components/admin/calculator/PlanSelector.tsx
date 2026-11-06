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
          ? 'bg-foreground/10 border-foreground/50 '
          : 'bg-card border-border hover:border-border hover:bg-card'
        }
      `}
    >
      {/* Selection indicator */}
      <div
        className={`
          absolute top-4 right-4 w-5 h-5 rounded-full border-2 transition-all duration-300
          flex items-center justify-center
          ${isSelected
            ? 'border-foreground bg-foreground'
            : 'border-border'
          }
        `}
      >
        {isSelected && (
          <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              ? 'bg-foreground/20 text-muted-foreground'
              : 'bg-secondary text-muted-foreground'
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
          ${isSelected ? 'text-primary-foreground' : 'text-foreground'}
        `}
      >
        {plan.name}
      </h3>

      {/* Price */}
      <p
        className={`
          text-2xl font-semibold mb-3 transition-colors
          ${isSelected ? 'text-muted-foreground' : 'text-muted-foreground'}
        `}
      >
        {formatPriceWithPrefix(plan)}
      </p>

      {/* Description */}
      <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2">
        {plan.description}
      </p>
    </button>
  );
}

export default function PlanSelector({ selected, onSelect }: PlanSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center">
          <span className="text-foreground font-semibold text-sm">1</span>
        </div>
        <div>
          <h2 className="text-lg font-medium text-foreground">Selecciona el plan</h2>
          <p className="text-[13px] text-muted-foreground">Elige el tipo de proyecto web</p>
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
