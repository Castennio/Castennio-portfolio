'use client';

import { useEffect } from 'react';
import type { PreviewConfig } from '@/types/preview';
import { INDUSTRIES, STYLES } from '@/config/preview';
import TemplateWrapper from './templates/TemplateWrapper';
import MinimalistaTemplate from './templates/MinimalistaTemplate';
import CorporativoTemplate from './templates/CorporativoTemplate';
import CreativoTemplate from './templates/CreativoTemplate';
import ModernoTemplate from './templates/ModernoTemplate';

interface PreviewModalProps {
  config: PreviewConfig;
  isOpen: boolean;
  onClose: () => void;
}

const templateComponents = {
  minimalista: MinimalistaTemplate,
  corporativo: CorporativoTemplate,
  creativo: CreativoTemplate,
  moderno: ModernoTemplate,
} as const;

export default function PreviewModal({ config, isOpen, onClose }: PreviewModalProps) {
  const { industry, style, companyName, palette } = config;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !industry || !style || !palette) return null;

  const industryConfig = INDUSTRIES[industry];
  const styleConfig = STYLES[style];
  const TemplateComponent = templateComponents[style];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="relative w-[95vw] h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4">
            <h2 className="font-semibold text-gray-900">Vista previa expandida</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="px-2 py-0.5 bg-gray-200 rounded">{industryConfig.name}</span>
              <span>+</span>
              <span className="px-2 py-0.5 bg-gray-200 rounded">{styleConfig.name}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span>Cerrar</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content - scrollable preview */}
        <div className="flex-1 overflow-auto">
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
      </div>
    </div>
  );
}
