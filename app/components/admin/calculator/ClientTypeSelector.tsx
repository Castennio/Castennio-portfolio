'use client';

import { CLIENT_TYPE_LIST } from '@/config/pricing';
import { formatPercentage } from '@/lib/pricing';
import type { ClientType, ClientTypeConfig } from '@/types/pricing';

interface ClientTypeSelectorProps {
  selected: ClientType | null;
  onSelect: (clientType: ClientType) => void;
  disabled?: boolean;
}

const CLIENT_TYPE_ICONS: Record<ClientType, React.ReactNode> = {
  'emprendimiento': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  'mype': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  'empresa-consolidada': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    </svg>
  ),
};

function ClientTypeCard({
  config,
  isSelected,
  onSelect,
  disabled,
}: {
  config: ClientTypeConfig;
  isSelected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`
        relative w-full text-left p-4 rounded-xl border transition-all duration-300
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${isSelected
          ? 'bg-[#7C3AED]/10 border-[#7C3AED]/50'
          : 'bg-[#0f1015] border-white/[0.06] hover:border-white/[0.12] hover:bg-[#14151a]'
        }
      `}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`
            w-10 h-10 rounded-lg flex items-center justify-center transition-colors flex-shrink-0
            ${isSelected
              ? 'bg-[#7C3AED]/20 text-[#A78BFA]'
              : 'bg-white/[0.04] text-white/40'
            }
          `}
        >
          {CLIENT_TYPE_ICONS[config.id]}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3
              className={`
                text-sm font-medium transition-colors truncate
                ${isSelected ? 'text-white' : 'text-white/70'}
              `}
            >
              {config.name}
            </h3>
            <span
              className={`
                text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0
                ${config.multiplier === 0
                  ? 'bg-green-500/10 text-green-400'
                  : 'bg-amber-500/10 text-amber-400'
                }
              `}
            >
              {formatPercentage(config.multiplier)}
            </span>
          </div>
          <p className="text-[12px] text-white/40 truncate">{config.description}</p>
        </div>

        {/* Selection indicator */}
        <div
          className={`
            w-4 h-4 rounded-full border-2 transition-all duration-300 flex-shrink-0
            flex items-center justify-center mt-1
            ${isSelected
              ? 'border-[#7C3AED] bg-[#7C3AED]'
              : 'border-white/20'
            }
          `}
        >
          {isSelected && (
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}

export default function ClientTypeSelector({
  selected,
  onSelect,
  disabled,
}: ClientTypeSelectorProps) {
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
            2
          </span>
        </div>
        <div>
          <h2
            className={`
              text-lg font-medium transition-colors
              ${disabled ? 'text-white/40' : 'text-white/90'}
            `}
          >
            Tipo de cliente
          </h2>
          <p className="text-[13px] text-white/40">Define el perfil del negocio</p>
        </div>
      </div>

      <div className="space-y-3">
        {CLIENT_TYPE_LIST.map((config) => (
          <ClientTypeCard
            key={config.id}
            config={config}
            isSelected={selected === config.id}
            onSelect={() => onSelect(config.id)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
