'use client';

import { useMemo } from 'react';
import type { PreviewConfig, IndustryConfig, StyleConfig } from '@/types/preview';
import { INDUSTRIES, STYLES } from '@/config/preview';
import TemplateWrapper from './templates/TemplateWrapper';
import MinimalistaTemplate from './templates/MinimalistaTemplate';
import CorporativoTemplate from './templates/CorporativoTemplate';
import CreativoTemplate from './templates/CreativoTemplate';
import ModernoTemplate from './templates/ModernoTemplate';

interface PreviewRendererProps {
  config: PreviewConfig;
}

const templateComponents = {
  minimalista: MinimalistaTemplate,
  corporativo: CorporativoTemplate,
  creativo: CreativoTemplate,
  moderno: ModernoTemplate,
} as const;

export default function PreviewRenderer({ config }: PreviewRendererProps) {
  const { industry, style, companyName, palette } = config;

  // Get configurations
  const industryConfig: IndustryConfig | null = industry ? INDUSTRIES[industry] : null;
  const styleConfig: StyleConfig | null = style ? STYLES[style] : null;

  // Memoize template selection
  const TemplateComponent = useMemo(() => {
    if (!style) return null;
    return templateComponents[style];
  }, [style]);

  // Check if all required data is available
  const isReady = Boolean(industry && style && palette && industryConfig && styleConfig);

  if (!isReady || !TemplateComponent || !palette || !industryConfig || !styleConfig) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">Vista previa</p>
          <p className="text-gray-400 text-sm mt-1">
            Completa las opciones para ver tu diseño
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
      {/* Scaled container */}
      <div
        className="absolute inset-0 origin-top-left overflow-auto"
        style={{
          transform: 'scale(0.35)',
          width: '285.7%', // 100% / 0.35
          height: '285.7%',
        }}
      >
        <TemplateWrapper
          palette={palette}
          industry={industryConfig}
          style={styleConfig}
          companyName={companyName}
        >
          <TemplateComponent
            palette={palette}
            industry={industryConfig}
            style={styleConfig}
            companyName={companyName}
          />
        </TemplateWrapper>
      </div>

      {/* Preview label */}
      <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 text-white text-xs font-medium rounded-full backdrop-blur-sm">
        Vista previa
      </div>

      {/* Style badge */}
      <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full shadow-sm">
        {styleConfig.name}
      </div>
    </div>
  );
}
