'use client';

import { STYLE_LIST } from '@/config/preview';
import type { StyleId } from '@/types/preview';

interface StyleSelectorProps {
  selected: StyleId | null;
  onSelect: (styleId: StyleId) => void;
}

const styleVisuals: Record<StyleId, { gradient: string; pattern: string }> = {
  minimalista: {
    gradient: 'from-gray-50 to-gray-100',
    pattern: 'border-gray-200',
  },
  corporativo: {
    gradient: 'from-blue-50 to-indigo-100',
    pattern: 'border-blue-200',
  },
  creativo: {
    gradient: 'from-pink-50 via-purple-50 to-indigo-100',
    pattern: 'border-purple-200',
  },
  moderno: {
    gradient: 'from-slate-50 to-zinc-100',
    pattern: 'border-slate-200',
  },
};

function StyleCard({
  style,
  isSelected,
  onSelect,
}: {
  style: typeof STYLE_LIST[0];
  isSelected: boolean;
  onSelect: () => void;
}) {
  const visual = styleVisuals[style.id];

  return (
    <button
      onClick={onSelect}
      className={`
        relative w-full text-left rounded-lg sm:rounded-xl border-2 transition-all duration-300 overflow-hidden
        ${isSelected
          ? 'border-blue-500 shadow-lg shadow-blue-500/10'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
        }
      `}
    >
      {/* Visual preview area */}
      <div className={`h-16 sm:h-24 bg-gradient-to-br ${visual.gradient} p-3 sm:p-4 relative`}>
        {/* Style-specific visual elements */}
        {style.id === 'minimalista' && (
          <div className="space-y-1.5 sm:space-y-2">
            <div className="w-10 sm:w-16 h-1 sm:h-1.5 bg-gray-300 rounded-none" />
            <div className="w-14 sm:w-24 h-0.5 sm:h-1 bg-gray-200" />
            <div className="w-12 sm:w-20 h-0.5 sm:h-1 bg-gray-200" />
          </div>
        )}
        {style.id === 'corporativo' && (
          <div className="flex gap-1.5 sm:gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-200 rounded-sm" />
            <div className="space-y-1 sm:space-y-1.5 flex-1">
              <div className="w-full h-1.5 sm:h-2 bg-blue-200 rounded-sm" />
              <div className="w-3/4 h-1 sm:h-1.5 bg-blue-100 rounded-sm" />
            </div>
          </div>
        )}
        {style.id === 'creativo' && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-7 h-7 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full" />
            <div className="w-8 h-4 sm:w-12 sm:h-6 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full" />
          </div>
        )}
        {style.id === 'moderno' && (
          <div className="space-y-1.5 sm:space-y-2">
            <div className="w-12 sm:w-20 h-1.5 sm:h-2 bg-slate-300 rounded-lg" />
            <div className="flex gap-1 sm:gap-1.5">
              <div className="w-4 h-4 sm:w-6 sm:h-6 bg-slate-200 rounded-md sm:rounded-lg" />
              <div className="w-4 h-4 sm:w-6 sm:h-6 bg-slate-200 rounded-md sm:rounded-lg" />
              <div className="w-4 h-4 sm:w-6 sm:h-6 bg-slate-200 rounded-md sm:rounded-lg" />
            </div>
          </div>
        )}

        {/* Selection indicator */}
        <div
          className={`
            absolute top-2 right-2 sm:top-3 sm:right-3 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all duration-300
            flex items-center justify-center bg-white
            ${isSelected ? 'border-blue-500' : 'border-gray-300'}
          `}
        >
          {isSelected && (
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500" />
          )}
        </div>
      </div>

      {/* Text content */}
      <div className="p-2.5 sm:p-4 bg-white">
        <h3 className={`font-medium text-sm sm:text-base mb-0.5 sm:mb-1 ${isSelected ? 'text-blue-600' : 'text-gray-900'}`}>
          {style.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 leading-snug line-clamp-2">
          {style.description}
        </p>
      </div>
    </button>
  );
}

export default function StyleSelector({ selected, onSelect }: StyleSelectorProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
          <span className="text-blue-600 font-semibold text-xs sm:text-sm">2</span>
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-medium text-gray-900">Estilo de diseño</h2>
          <p className="text-xs sm:text-sm text-gray-500">Personalidad visual de tu web</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        {STYLE_LIST.map((style) => (
          <StyleCard
            key={style.id}
            style={style}
            isSelected={selected === style.id}
            onSelect={() => onSelect(style.id)}
          />
        ))}
      </div>
    </div>
  );
}
