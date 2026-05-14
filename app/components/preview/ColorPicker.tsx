'use client';

import { useState, useEffect } from 'react';
import { generatePalette, COLOR_PRESETS, getReadableTextColor } from '@/lib/colors';
import type { ColorPalette } from '@/types/preview';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  palette: ColorPalette | null;
  onPaletteChange: (palette: ColorPalette) => void;
}

export default function ColorPicker({
  value,
  onChange,
  palette,
  onPaletteChange,
}: ColorPickerProps) {
  const [customColor, setCustomColor] = useState(value || '#3B82F6');

  // Generate palette when color changes
  useEffect(() => {
    if (value) {
      const newPalette = generatePalette(value);
      onPaletteChange(newPalette);
    }
  }, [value, onPaletteChange]);

  const handlePresetSelect = (hex: string) => {
    setCustomColor(hex);
    onChange(hex);
  };

  const handleCustomColorChange = (hex: string) => {
    setCustomColor(hex);
    onChange(hex);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
          <span className="text-blue-600 font-semibold text-xs sm:text-sm">4</span>
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-medium text-gray-900">Color principal</h2>
          <p className="text-xs sm:text-sm text-gray-500">Paleta armónica automática</p>
        </div>
      </div>

      {/* Preset colors */}
      <div className="space-y-2 sm:space-y-3">
        <p className="text-xs sm:text-sm font-medium text-gray-700">Colores sugeridos</p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {COLOR_PRESETS.map((preset) => (
            <button
              key={preset.hex}
              onClick={() => handlePresetSelect(preset.hex)}
              className={`
                w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl transition-all duration-200 relative
                ${value === preset.hex
                  ? 'ring-2 ring-offset-1 sm:ring-offset-2 ring-blue-500 scale-110'
                  : 'hover:scale-105'
                }
              `}
              style={{ backgroundColor: preset.hex }}
              title={preset.name}
            >
              {value === preset.hex && (
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 absolute inset-0 m-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={getReadableTextColor(preset.hex)}
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom color picker */}
      <div className="space-y-2 sm:space-y-3">
        <p className="text-xs sm:text-sm font-medium text-gray-700">O elige tu propio color</p>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <input
              type="color"
              value={customColor}
              onChange={(e) => handleCustomColorChange(e.target.value)}
              className="w-11 h-11 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl cursor-pointer border-2 border-gray-200"
            />
          </div>
          <input
            type="text"
            value={customColor.toUpperCase()}
            onChange={(e) => {
              const val = e.target.value;
              if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                setCustomColor(val);
                if (val.length === 7) {
                  onChange(val);
                }
              }
            }}
            placeholder="#3B82F6"
            className="
              w-24 sm:w-28 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg border-2 border-gray-200 bg-white
              text-gray-900 text-xs sm:text-sm font-mono uppercase
              focus:outline-none focus:border-blue-500
              transition-all duration-200
            "
          />
        </div>
      </div>

      {/* Generated palette preview */}
      {palette && (
        <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t border-gray-200">
          <p className="text-xs sm:text-sm font-medium text-gray-700">Paleta generada</p>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            <PaletteColor label="Principal" color={palette.primary} />
            <PaletteColor label="Oscuro" color={palette.primaryDark} />
            <PaletteColor label="Claro" color={palette.primaryLight} />
            <PaletteColor label="Secundario" color={palette.secondary} />
            <PaletteColor label="Acento" color={palette.accent} />
            <PaletteColor label="Texto" color={palette.text} />
          </div>
        </div>
      )}
    </div>
  );
}

function PaletteColor({ label, color }: { label: string; color: string }) {
  return (
    <div className="text-center">
      <div
        className="w-full h-8 sm:h-10 rounded-md sm:rounded-lg mb-1 sm:mb-1.5 border border-gray-200"
        style={{ backgroundColor: color }}
      />
      <p className="text-[10px] sm:text-xs text-gray-500">{label}</p>
    </div>
  );
}
