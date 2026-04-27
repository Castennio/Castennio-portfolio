'use client';

import { URGENCY_LEVEL_LIST } from '@/config/pricing';
import { formatPercentage, getPlanConfig, calculateDeliveryTime } from '@/lib/pricing';
import type { UrgencyLevel, UrgencyConfig, PlanId } from '@/types/pricing';

interface UrgencySelectorProps {
  selected: UrgencyLevel | null;
  onSelect: (urgency: UrgencyLevel) => void;
  selectedPlan: PlanId | null;
  disabled?: boolean;
}

const URGENCY_ICONS: Record<UrgencyLevel, React.ReactNode> = {
  'estandar': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'prioritario': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  'urgente': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
  ),
};

const URGENCY_COLORS: Record<UrgencyLevel, { bg: string; text: string; border: string }> = {
  'estandar': {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
  },
  'prioritario': {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
  },
  'urgente': {
    bg: 'bg-rose-500/10',
    text: 'text-rose-400',
    border: 'border-rose-500/30',
  },
};

function UrgencyCard({
  config,
  isSelected,
  onSelect,
  deliveryTime,
  disabled,
}: {
  config: UrgencyConfig;
  isSelected: boolean;
  onSelect: () => void;
  deliveryTime?: string;
  disabled?: boolean;
}) {
  const colors = URGENCY_COLORS[config.id];

  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`
        relative w-full text-left p-4 rounded-xl border transition-all duration-300
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${isSelected
          ? `${colors.bg} ${colors.border}`
          : 'bg-[#0f1015] border-white/[0.06] hover:border-white/[0.12] hover:bg-[#14151a]'
        }
      `}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div
          className={`
            w-10 h-10 rounded-lg flex items-center justify-center transition-colors flex-shrink-0
            ${isSelected
              ? `${colors.bg} ${colors.text}`
              : 'bg-white/[0.04] text-white/40'
            }
          `}
        >
          {URGENCY_ICONS[config.id]}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3
              className={`
                text-sm font-medium transition-colors
                ${isSelected ? colors.text : 'text-white/70'}
              `}
            >
              {config.name}
            </h3>
            <span
              className={`
                text-[11px] font-medium px-2 py-0.5 rounded-full
                ${config.multiplier === 0
                  ? 'bg-white/[0.04] text-white/40'
                  : `${colors.bg} ${colors.text}`
                }
              `}
            >
              {formatPercentage(config.multiplier)}
            </span>
          </div>
          {deliveryTime && (
            <p className={`text-[12px] ${isSelected ? 'text-white/60' : 'text-white/40'}`}>
              Entrega: {deliveryTime}
            </p>
          )}
        </div>

        {/* Selection indicator */}
        <div
          className={`
            w-4 h-4 rounded-full border-2 transition-all duration-300 flex-shrink-0
            flex items-center justify-center
            ${isSelected
              ? `${colors.border} ${colors.bg}`
              : 'border-white/20'
            }
          `}
        >
          {isSelected && (
            <div className={`w-2 h-2 rounded-full ${colors.bg.replace('/10', '')}`} />
          )}
        </div>
      </div>
    </button>
  );
}

export default function UrgencySelector({
  selected,
  onSelect,
  selectedPlan,
  disabled,
}: UrgencySelectorProps) {
  const plan = selectedPlan ? getPlanConfig(selectedPlan) : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`
            w-8 h-8 rounded-lg flex items-center justify-center transition-colors
            ${disabled ? 'bg-white/[0.04]' : 'bg-[#7C3AED]/10'}
          `}
        >
          <span
            className={`
              font-semibold text-sm transition-colors
              ${disabled ? 'text-white/30' : 'text-[#7C3AED]'}
            `}
          >
            3
          </span>
        </div>
        <div>
          <h2
            className={`
              text-lg font-medium transition-colors
              ${disabled ? 'text-white/40' : 'text-white/90'}
            `}
          >
            Nivel de urgencia
          </h2>
          <p className="text-[13px] text-white/40">Define la prioridad de entrega</p>
        </div>
      </div>

      <div className="space-y-3">
        {URGENCY_LEVEL_LIST.map((config) => (
          <UrgencyCard
            key={config.id}
            config={config}
            isSelected={selected === config.id}
            onSelect={() => onSelect(config.id)}
            deliveryTime={plan ? calculateDeliveryTime(plan, config.id) : undefined}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
