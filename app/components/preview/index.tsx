'use client';

import { useState, useCallback } from 'react';
import type { PreviewConfig, IndustryId, StyleId, ColorPalette } from '@/types/preview';
import { generatePalette } from '@/lib/colors';
import IndustrySelector from './IndustrySelector';
import StyleSelector from './StyleSelector';
import CompanyInput from './CompanyInput';
import ColorPicker from './ColorPicker';
import PreviewRenderer from './PreviewRenderer';
import PreviewModal from './PreviewModal';

const DEFAULT_COLOR = '#3B82F6';

export default function PreviewConfigurator() {
  const [config, setConfig] = useState<PreviewConfig>({
    industry: null,
    style: null,
    companyName: '',
    primaryColor: DEFAULT_COLOR,
    palette: generatePalette(DEFAULT_COLOR),
  });

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handlers
  const handleIndustrySelect = useCallback((industryId: IndustryId) => {
    setConfig((prev) => ({ ...prev, industry: industryId }));
  }, []);

  const handleStyleSelect = useCallback((styleId: StyleId) => {
    setConfig((prev) => ({ ...prev, style: styleId }));
  }, []);

  const handleCompanyNameChange = useCallback((name: string) => {
    setConfig((prev) => ({ ...prev, companyName: name }));
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setConfig((prev) => ({ ...prev, primaryColor: color }));
  }, []);

  const handlePaletteChange = useCallback((palette: ColorPalette) => {
    setConfig((prev) => ({ ...prev, palette }));
  }, []);

  const handleGeneratePDF = async () => {
    if (!config.industry || !config.style || !config.palette) return;

    setIsGeneratingPDF(true);
    try {
      const { downloadPreviewPDF } = await import('./PreviewPDF');
      await downloadPreviewPDF(config);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Intenta de nuevo.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const isConfigComplete = Boolean(config.industry && config.style && config.palette);

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="/" className="flex items-center gap-1.5 sm:gap-2 text-gray-900 hover:text-gray-600 transition-colors">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium text-sm sm:text-base">Volver</span>
            </a>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm text-gray-500 hidden xs:inline">Castennio</span>
            <img src="/images/logo-castennio-fondo-transparente-icono-negro.png" alt="Castennio" className="w-7 h-6 sm:w-[2.2rem] sm:h-8" />
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Diseña tu página web</h1>
          <p className="text-sm sm:text-base text-gray-500">
            Personaliza tu sitio y descarga un mockup
          </p>
        </div>

        {/* Mobile: Preview first (sticky on top) */}
        <div className="lg:hidden mb-6">
          <div className="sticky top-0 z-10 bg-[#f8f9fc] pb-4">
            <div className="relative aspect-[16/10] group">
              <PreviewRenderer config={config} />
              {isConfigComplete && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-lg shadow-lg"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  Expandir
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left: Configuration panel */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Industry selector */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <IndustrySelector
                selected={config.industry}
                onSelect={handleIndustrySelect}
              />
            </div>

            {/* Style selector */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <StyleSelector
                selected={config.style}
                onSelect={handleStyleSelect}
              />
            </div>

            {/* Company name */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <CompanyInput
                value={config.companyName}
                onChange={handleCompanyNameChange}
              />
            </div>

            {/* Color picker */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <ColorPicker
                value={config.primaryColor}
                onChange={handleColorChange}
                palette={config.palette}
                onPaletteChange={handlePaletteChange}
              />
            </div>

            {/* Mobile: Actions at bottom of config */}
            <div className="lg:hidden bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="mb-3">
                <h3 className="font-medium text-gray-900 text-sm sm:text-base">Tu diseño está listo</h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {isConfigComplete
                    ? 'Descarga el mockup o contáctanos'
                    : 'Completa las opciones para continuar'}
                </p>
              </div>

              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={handleGeneratePDF}
                  disabled={!isConfigComplete || isGeneratingPDF}
                  className={`
                    flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-3 rounded-xl text-sm font-medium transition-all
                    ${isConfigComplete && !isGeneratingPDF
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                  `}
                >
                  {isGeneratingPDF ? (
                    <>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span className="hidden sm:inline">Generando...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span className="hidden xs:inline">Descargar</span> PDF
                    </>
                  )}
                </button>

                <a
                  href="https://wa.me/51998162677?text=Hola!%20Me%20interesa%20crear%20mi%20página%20web."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-3 rounded-xl text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="hidden xs:inline">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Preview panel (desktop only) */}
          <div className="hidden lg:block lg:sticky lg:top-8 space-y-4 self-start">
            {/* Preview */}
            <div className="relative aspect-[16/11] group">
              <PreviewRenderer config={config} />
              {/* Expand button */}
              {isConfigComplete && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  Expandir
                </button>
              )}
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">Tu diseño está listo</h3>
                  <p className="text-sm text-gray-500">
                    {isConfigComplete
                      ? 'Descarga el mockup o contáctanos para empezar'
                      : 'Completa todas las opciones para continuar'}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleGeneratePDF}
                  disabled={!isConfigComplete || isGeneratingPDF}
                  className={`
                    flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium transition-all
                    ${isConfigComplete && !isGeneratingPDF
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                  `}
                >
                  {isGeneratingPDF ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Descargar PDF
                    </>
                  )}
                </button>

                <a
                  href="https://wa.me/51998162677?text=Hola!%20Me%20interesa%20crear%20mi%20página%20web."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium bg-green-500 text-white hover:bg-green-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Preview Modal */}
      <PreviewModal
        config={config}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
