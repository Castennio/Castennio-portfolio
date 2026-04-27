'use client';

import { ADDON_LIST, PLAN_INCLUDED_ADDONS, CMS_DISCOUNT_PRICE } from '@/config/pricing';
import { formatCurrency } from '@/lib/pricing';
import type { AddonId, AddonConfig, PlanId } from '@/types/pricing';

interface AddonsSelectorProps {
  selected: AddonId[];
  onToggle: (addonId: AddonId) => void;
  disabled?: boolean;
  selectedPlan: PlanId | null;
}

const ADDON_ICONS: Record<string, React.ReactNode> = {
  bot: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  database: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
  chart: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  search: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  globe: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  calendar: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  mail: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  table: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  moon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  edit: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  layout: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  video: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  shield: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  message: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
};

function AddonCard({
  addon,
  isSelected,
  onToggle,
  disabled,
  isIncluded,
  hasDiscount,
  discountPrice,
}: {
  addon: AddonConfig;
  isSelected: boolean;
  onToggle: () => void;
  disabled?: boolean;
  isIncluded?: boolean;
  hasDiscount?: boolean;
  discountPrice?: number;
}) {
  const isDisabled = disabled || isIncluded;
  const displayPrice = hasDiscount && discountPrice ? discountPrice : addon.minPrice;

  return (
    <button
      onClick={onToggle}
      disabled={isDisabled}
      className={`
        relative w-full text-left p-4 rounded-xl border transition-all duration-300
        ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}
        ${isIncluded
          ? 'bg-green-500/5 border-green-500/20'
          : isSelected
            ? 'bg-[#7C3AED]/10 border-[#7C3AED]/50'
            : 'bg-[#0f1015] border-white/[0.06] hover:border-white/[0.12] hover:bg-[#14151a]'
        }
      `}
    >
      {/* Included badge */}
      {isIncluded && (
        <div className="absolute -top-2 right-3 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
          Incluido
        </div>
      )}

      {/* Discount badge with tooltip */}
      {hasDiscount && !isIncluded && (
        <div className="absolute -top-2 right-3 group/tooltip">
          <div className="px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider bg-amber-500/20 text-amber-400 rounded-full border border-amber-500/30 cursor-help">
            Descuento
          </div>
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-[#1a1a1f] border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50">
            <p className="text-[11px] text-white/70 leading-relaxed">
              Precio rebajado porque tu plan ya incluye la visualización. Solo pagas por el panel de gestión.
            </p>
            <div className="absolute -bottom-1 right-4 w-2 h-2 bg-[#1a1a1f] border-r border-b border-white/10 transform rotate-45"></div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* Checkbox */}
        <div
          className={`
            w-5 h-5 rounded-md border-2 transition-all duration-300 flex-shrink-0
            flex items-center justify-center
            ${isIncluded
              ? 'border-green-500 bg-green-500'
              : isSelected
                ? 'border-[#7C3AED] bg-[#7C3AED]'
                : 'border-white/20'
            }
          `}
        >
          {(isSelected || isIncluded) && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>

        {/* Icon */}
        <div
          className={`
            w-9 h-9 rounded-lg flex items-center justify-center transition-colors flex-shrink-0
            ${isIncluded
              ? 'bg-green-500/20 text-green-400'
              : isSelected
                ? 'bg-[#7C3AED]/20 text-[#A78BFA]'
                : 'bg-white/[0.04] text-white/40'
            }
          `}
        >
          {ADDON_ICONS[addon.icon] || ADDON_ICONS.edit}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4
              className={`
                text-sm font-medium transition-colors truncate
                ${isIncluded ? 'text-green-400' : isSelected ? 'text-white' : 'text-white/70'}
              `}
            >
              {addon.name}
            </h4>
          </div>
          <p className="text-[11px] text-white/40 truncate">
            {isIncluded ? 'Ya incluido en tu plan' : addon.description}
          </p>
          {addon.note && !isIncluded && (
            <p className="text-[10px] text-amber-400/70 mt-1 truncate">{addon.note}</p>
          )}
        </div>

        {/* Price */}
        <div className="text-right flex-shrink-0">
          {isIncluded ? (
            <p className="text-[11px] text-green-400">Gratis</p>
          ) : hasDiscount ? (
            <div>
              <p className="text-[10px] text-white/30 line-through">+{formatCurrency(addon.minPrice)}</p>
              <p className="text-[11px] text-amber-400">+{formatCurrency(displayPrice)}</p>
            </div>
          ) : (
            <p
              className={`
                text-[11px] transition-colors
                ${isSelected ? 'text-[#A78BFA]' : 'text-white/40'}
              `}
            >
              +{formatCurrency(addon.minPrice)}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

export default function AddonsSelector({
  selected,
  onToggle,
  disabled,
  selectedPlan,
}: AddonsSelectorProps) {
  const totalAddons = selected.length;

  // Get addons included in the selected plan
  const includedAddons = selectedPlan ? PLAN_INCLUDED_ADDONS[selectedPlan] || [] : [];

  // Check if an addon has a discount (its paired addon is included in the plan)
  const getAddonDiscount = (addonId: AddonId): { hasDiscount: boolean; discountPrice?: number } => {
    if (!selectedPlan) return { hasDiscount: false };

    // Blog CMS gets discount if 'blog' is included in plan
    if (addonId === 'blog-cms' && includedAddons.includes('blog')) {
      return { hasDiscount: true, discountPrice: CMS_DISCOUNT_PRICE['blog-cms'] };
    }
    // Reels CMS gets discount if 'reels' is included in plan
    if (addonId === 'reels-cms' && includedAddons.includes('reels')) {
      return { hasDiscount: true, discountPrice: CMS_DISCOUNT_PRICE['reels-cms'] };
    }

    return { hasDiscount: false };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
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
              4
            </span>
          </div>
          <div>
            <h2
              className={`
                text-lg font-medium transition-colors
                ${disabled ? 'text-white/40' : 'text-white/90'}
              `}
            >
              Servicios adicionales
            </h2>
            <p className="text-[13px] text-white/40">Potencia tu proyecto (opcional)</p>
          </div>
        </div>
        {totalAddons > 0 && (
          <span className="px-2.5 py-1 text-[11px] font-medium bg-[#7C3AED]/10 text-[#A78BFA] rounded-full">
            {totalAddons} seleccionado{totalAddons > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Show included addons info */}
      {includedAddons.length > 0 && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 mb-4">
          <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-[12px] text-green-400">
            Tu plan ya incluye: {includedAddons.map(id => ADDON_LIST.find(a => a.id === id)?.name).join(', ')}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {ADDON_LIST.map((addon) => {
          const isIncluded = includedAddons.includes(addon.id);
          const { hasDiscount, discountPrice } = getAddonDiscount(addon.id);

          return (
            <AddonCard
              key={addon.id}
              addon={addon}
              isSelected={selected.includes(addon.id)}
              onToggle={() => onToggle(addon.id)}
              disabled={disabled}
              isIncluded={isIncluded}
              hasDiscount={hasDiscount}
              discountPrice={discountPrice}
            />
          );
        })}
      </div>

      {/* Info note */}
      <p className="text-[11px] text-white/30 text-center mt-4">
        Precios base. El costo final puede variar según la complejidad del proyecto.
      </p>
    </div>
  );
}
