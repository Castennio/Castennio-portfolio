'use client';

interface CompanyInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CompanyInput({ value, onChange }: CompanyInputProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
          <span className="text-blue-600 font-semibold text-xs sm:text-sm">3</span>
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-medium text-gray-900">Nombre de tu empresa</h2>
          <p className="text-xs sm:text-sm text-gray-500">Aparecerá en el diseño</p>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ej: Mi Restaurante"
          maxLength={40}
          className="
            w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border-2 border-gray-200 bg-white
            text-gray-900 text-sm sm:text-base placeholder:text-gray-400
            focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
            transition-all duration-200
          "
        />
        <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs text-gray-400">
          {value.length}/40
        </div>
      </div>

      {value.length > 0 && (
        <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1.5 sm:gap-2">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="truncate">Se mostrará como: <span className="font-medium text-gray-700">{value}</span></span>
        </p>
      )}
    </div>
  );
}
