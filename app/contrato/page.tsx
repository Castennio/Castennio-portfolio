'use client';

import { useState } from 'react';
import AdminGuard from '@/app/components/admin/AdminGuard';
import { downloadContractPDF } from '@/app/components/admin/contract/ContractPDF';
import { downloadWelcomePackPDF } from '@/app/components/admin/contract/WelcomePackPDF';
import type { ContractData } from '@/app/components/admin/contract/ContractPDF';
import { logoutAction } from '@/app/actions/auth';

const DEFAULT_DEV = {
  nombre: 'Yoshua Daniel Castañeda Robles',
  ruc: '10739934821',
};

const FUNCIONALIDADES_CHIPS = [
  'Landing page',
  'Detalle de productos',
  'Botón de cotización por WhatsApp',
  'Sección "Sobre Nosotros"',
  'Botón de contacto mediante WhatsApp',
  'Reseñas',
  'Preguntas frecuentes (FAQ)',
  'Footer',
  'Gestión de blogs',
  'Gestión de campañas',
  'Gestión de reels',
  'Panel administrativo tipo CMS',
  'Formulario de contacto',
  'Galería de imágenes',
  'Mapa de ubicación',
  'Red de distribuidores',
  'Catálogo de servicios',
  'Sistema de reservas',
  'Integración con redes sociales',
];

const SERVICIOS_CHIPS = [
  'Vercel',
  'Cloudinary',
  'Neon DB',
  'Google Analytics',
  'Dominio',
  'Hosting',
  'Google Search Console',
];

const FORMA_PAGO_TEMPLATES = [
  {
    label: '100% contra entrega',
    template: (total: string, fecha: string) =>
      `EL CLIENTE realizará el pago total de ${total} contra la entrega del proyecto, el ${fecha}, previa emisión del comprobante de pago correspondiente.`,
  },
  {
    label: '50% inicio / 50% entrega',
    template: (total: string, fecha: string) =>
      `EL CLIENTE realizará el pago en dos partes: 50% al inicio del proyecto y 50% contra la entrega del proyecto, el ${fecha}, previa emisión del comprobante de pago correspondiente.`,
  },
  {
    label: '30% / 30% / 40%',
    template: (total: string, fecha: string) =>
      `EL CLIENTE realizará el pago en tres partes: 30% al inicio del proyecto, 30% al presentar el avance, y 40% contra la entrega del proyecto, el ${fecha}, previa emisión del comprobante de pago correspondiente.`,
  },
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[13px] font-medium text-white/60 mb-1.5">
      {children}
    </label>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all cursor-pointer ${
        active
          ? 'bg-[#7C3AED]/20 text-[#A78BFA] border border-[#7C3AED]/40'
          : 'bg-white/[0.03] text-white/40 border border-white/[0.06] hover:bg-white/[0.06] hover:text-white/60'
      }`}
    >
      {label}
    </button>
  );
}

function ContratoContent() {
  const [form, setForm] = useState({
    clienteEmpresa: '',
    clienteRuc: '',
    clienteRepresentante: '',
    desarrolladorNombre: DEFAULT_DEV.nombre,
    desarrolladorRuc: DEFAULT_DEV.ruc,
    descripcion: '',
    funcionalidades: '',
    fechaInicio: '',
    fechaEntrega: '',
    precioSinIgv: '',
    formaPago: '',
    serviciosAccesos: '',
    portalUrl: '',
  });

  const [generating, setGenerating] = useState<'contrato' | 'welcome' | null>(null);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const updateRuc = (field: string, value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    setForm((prev) => ({ ...prev, [field]: digits }));
  };

  const precio = parseFloat(form.precioSinIgv) || 0;
  const igv = Math.round(precio * 0.18 * 100) / 100;
  const total = Math.round((precio + igv) * 100) / 100;

  const funcLines = form.funcionalidades
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const toggleFuncChip = (chip: string) => {
    if (funcLines.includes(chip)) {
      update(
        'funcionalidades',
        funcLines.filter((l) => l !== chip).join('\n')
      );
    } else {
      update('funcionalidades', [...funcLines, chip].join('\n'));
    }
  };

  const serviciosList = form.serviciosAccesos
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const toggleServicioChip = (chip: string) => {
    if (serviciosList.includes(chip)) {
      update(
        'serviciosAccesos',
        serviciosList.filter((s) => s !== chip).join(', ')
      );
    } else {
      update('serviciosAccesos', [...serviciosList, chip].join(', '));
    }
  };

  const applyFormaPago = (templateFn: (total: string, fecha: string) => string) => {
    const totalStr = `S/ ${total.toFixed(2)}`;
    const fechaStr = form.fechaEntrega
      ? new Date(form.fechaEntrega + 'T00:00:00').toLocaleDateString('es-PE', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : '[fecha de entrega]';
    update('formaPago', templateFn(totalStr, fechaStr));
  };

  const canGenerate =
    form.clienteEmpresa &&
    form.clienteRuc.length === 11 &&
    form.clienteRepresentante &&
    form.desarrolladorNombre &&
    form.desarrolladorRuc.length === 11 &&
    form.descripcion &&
    form.funcionalidades.trim() &&
    form.fechaInicio &&
    form.fechaEntrega &&
    form.fechaEntrega >= form.fechaInicio &&
    precio > 0 &&
    form.formaPago;

  const buildData = (): ContractData => ({
    ...form,
    funcionalidades: funcLines,
    precioSinIgv: precio,
  });

  const handleContrato = async () => {
    if (!canGenerate) return;
    setGenerating('contrato');
    try { await downloadContractPDF(buildData()); } finally { setGenerating(null); }
  };

  const handleWelcomePack = async () => {
    if (!canGenerate) return;
    setGenerating('welcome');
    try { await downloadWelcomePackPDF(buildData()); } finally { setGenerating(null); }
  };

  const inputClass =
    'w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white/90 text-[14px] placeholder:text-white/25 focus:outline-none focus:border-[#7C3AED]/50 focus:ring-1 focus:ring-[#7C3AED]/30 transition-colors';

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                href="/calculadora"
                className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center hover:bg-[#7C3AED]/20 transition-colors"
              >
                <svg className="w-5 h-5 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </a>
              <div>
                <h1 className="text-xl font-semibold text-white/90">
                  Generador de Contratos
                </h1>
                <p className="text-[13px] text-white/40">
                  Panel administrativo CASTENNIO
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 text-[11px] font-medium tracking-wider uppercase bg-[#7C3AED]/10 text-[#A78BFA] rounded-full">
                Admin
              </span>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="p-2 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-colors cursor-pointer"
                  title="Cerrar sesión"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cliente */}
            <section className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6">
              <h2 className="text-[15px] font-semibold text-white/80 mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#7C3AED]/15 text-[#A78BFA] text-[11px] font-bold flex items-center justify-center">C</span>
                Datos del Cliente
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FieldLabel>Empresa</FieldLabel>
                  <input
                    className={inputClass}
                    placeholder="ACME PERU S.A.C."
                    maxLength={120}
                    value={form.clienteEmpresa}
                    onChange={(e) => update('clienteEmpresa', e.target.value)}
                  />
                </div>
                <div>
                  <FieldLabel>RUC</FieldLabel>
                  <input
                    className={inputClass}
                    placeholder="20XXXXXXXXX"
                    inputMode="numeric"
                    maxLength={11}
                    value={form.clienteRuc}
                    onChange={(e) => updateRuc('clienteRuc', e.target.value)}
                  />
                  {form.clienteRuc && form.clienteRuc.length < 11 && (
                    <p className="text-[11px] text-amber-400/60 mt-1">{form.clienteRuc.length}/11 dígitos</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <FieldLabel>Representante legal</FieldLabel>
                  <input
                    className={inputClass}
                    placeholder="Nombre completo del representante"
                    maxLength={100}
                    value={form.clienteRepresentante}
                    onChange={(e) => update('clienteRepresentante', e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Desarrollador */}
            <section className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6">
              <h2 className="text-[15px] font-semibold text-white/80 mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#7C3AED]/15 text-[#A78BFA] text-[11px] font-bold flex items-center justify-center">D</span>
                Datos del Desarrollador
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FieldLabel>Nombre completo</FieldLabel>
                  <input
                    className={inputClass}
                    maxLength={100}
                    value={form.desarrolladorNombre}
                    onChange={(e) => update('desarrolladorNombre', e.target.value)}
                  />
                </div>
                <div>
                  <FieldLabel>RUC</FieldLabel>
                  <input
                    className={inputClass}
                    inputMode="numeric"
                    maxLength={11}
                    value={form.desarrolladorRuc}
                    onChange={(e) => updateRuc('desarrolladorRuc', e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Proyecto */}
            <section className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6">
              <h2 className="text-[15px] font-semibold text-white/80 mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#7C3AED]/15 text-[#A78BFA] text-[11px] font-bold flex items-center justify-center">P</span>
                Proyecto
              </h2>
              <div className="space-y-4">
                <div>
                  <FieldLabel>Descripción del proyecto</FieldLabel>
                  <p className="text-[13px] text-white/30 mb-2 italic">
                    EL CLIENTE contrata a EL DESARROLLADOR para realizar...
                  </p>
                  <textarea
                    className={`${inputClass} min-h-[80px] resize-y`}
                    placeholder="el desarrollo e implementación de un sitio web corporativo para [nombre], incluyendo..."
                    maxLength={500}
                    value={form.descripcion}
                    onChange={(e) => update('descripcion', e.target.value)}
                  />
                </div>
                <div>
                  <FieldLabel>Funcionalidades</FieldLabel>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {FUNCIONALIDADES_CHIPS.map((chip) => (
                      <Chip
                        key={chip}
                        label={chip}
                        active={funcLines.includes(chip)}
                        onClick={() => toggleFuncChip(chip)}
                      />
                    ))}
                  </div>
                  <textarea
                    className={`${inputClass} min-h-[120px] resize-y font-mono text-[13px]`}
                    placeholder="Selecciona arriba o escribe una por línea"
                    maxLength={2000}
                    value={form.funcionalidades}
                    onChange={(e) => update('funcionalidades', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel>Fecha de inicio</FieldLabel>
                    <input
                      type="date"
                      className={inputClass}
                      value={form.fechaInicio}
                      onChange={(e) => update('fechaInicio', e.target.value)}
                    />
                  </div>
                  <div>
                    <FieldLabel>Fecha de entrega</FieldLabel>
                    <input
                      type="date"
                      className={inputClass}
                      value={form.fechaEntrega}
                      onChange={(e) => update('fechaEntrega', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Pago */}
            <section className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6">
              <h2 className="text-[15px] font-semibold text-white/80 mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#7C3AED]/15 text-[#A78BFA] text-[11px] font-bold flex items-center justify-center">$</span>
                Precio y Pago
              </h2>
              <div className="space-y-4">
                <div>
                  <FieldLabel>Precio sin IGV (S/)</FieldLabel>
                  <input
                    type="number"
                    className={inputClass}
                    placeholder="1200"
                    min={1}
                    max={999999}
                    step="0.01"
                    value={form.precioSinIgv}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === '' || (parseFloat(v) >= 0 && parseFloat(v) <= 999999)) update('precioSinIgv', v);
                    }}
                  />
                </div>
                <div>
                  <FieldLabel>Forma de pago</FieldLabel>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {FORMA_PAGO_TEMPLATES.map((t) => (
                      <Chip
                        key={t.label}
                        label={t.label}
                        active={false}
                        onClick={() => applyFormaPago(t.template)}
                      />
                    ))}
                  </div>
                  <textarea
                    className={`${inputClass} min-h-[60px] resize-y`}
                    placeholder="Selecciona una opción arriba o escribe la forma de pago"
                    maxLength={500}
                    value={form.formaPago}
                    onChange={(e) => update('formaPago', e.target.value)}
                  />
                </div>
                <div>
                  <FieldLabel>Servicios/accesos necesarios (opcional)</FieldLabel>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {SERVICIOS_CHIPS.map((chip) => (
                      <Chip
                        key={chip}
                        label={chip}
                        active={serviciosList.includes(chip)}
                        onClick={() => toggleServicioChip(chip)}
                      />
                    ))}
                  </div>
                  <input
                    className={inputClass}
                    placeholder="Selecciona arriba o escribe manualmente"
                    maxLength={200}
                    value={form.serviciosAccesos}
                    onChange={(e) => update('serviciosAccesos', e.target.value)}
                  />
                </div>
                <div>
                  <FieldLabel>Link del portal del proyecto (opcional)</FieldLabel>
                  <input
                    className={inputClass}
                    placeholder="https://notion.so/mi-proyecto..."
                    maxLength={200}
                    value={form.portalUrl}
                    onChange={(e) => update('portalUrl', e.target.value)}
                  />
                  <p className="text-[11px] text-white/25 mt-1">Aparece en el Welcome Pack. Si no lo tienes aún, se muestra como &quot;Próximamente&quot;.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar: Preview + Generate */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price summary */}
              <div className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6">
                <h3 className="text-[13px] font-semibold text-white/60 uppercase tracking-wider mb-4">
                  Resumen de Precios
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-[14px]">
                    <span className="text-white/50">Servicio</span>
                    <span className="text-white/80 font-medium">
                      S/ {precio.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[14px]">
                    <span className="text-white/50">IGV (18%)</span>
                    <span className="text-white/80 font-medium">
                      S/ {igv.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-white/[0.06] pt-3 flex justify-between text-[16px]">
                    <span className="text-white/70 font-semibold">Total</span>
                    <span className="text-[#A78BFA] font-bold">
                      S/ {total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <div className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6">
                <h3 className="text-[13px] font-semibold text-white/60 uppercase tracking-wider mb-4">
                  Campos requeridos
                </h3>
                <div className="space-y-2 text-[13px]">
                  {[
                    ['Empresa', !!form.clienteEmpresa],
                    ['RUC cliente (11 dígitos)', form.clienteRuc.length === 11],
                    ['Representante', !!form.clienteRepresentante],
                    ['Descripción', !!form.descripcion],
                    ['Funcionalidades', !!form.funcionalidades.trim()],
                    ['Fecha inicio', !!form.fechaInicio],
                    ['Fecha entrega', !!form.fechaEntrega && form.fechaEntrega >= form.fechaInicio],
                    ['Precio', precio > 0],
                    ['Forma de pago', !!form.formaPago],
                  ].map(([label, ok]) => (
                    <div key={label as string} className="flex items-center gap-2">
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                          ok
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-white/[0.04] text-white/20'
                        }`}
                      >
                        {ok ? '✓' : '·'}
                      </span>
                      <span className={ok ? 'text-white/60' : 'text-white/30'}>
                        {label as string}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generate buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleContrato}
                  disabled={!canGenerate || !!generating}
                  className={`w-full py-3.5 rounded-xl text-[14px] font-semibold transition-all cursor-pointer ${
                    canGenerate && !generating
                      ? 'bg-[#7C3AED] text-white hover:bg-[#6D28D9] active:scale-[0.98]'
                      : 'bg-white/[0.04] text-white/20 cursor-not-allowed'
                  }`}
                >
                  {generating === 'contrato' ? 'Generando...' : 'Descargar Contrato'}
                </button>
                <button
                  onClick={handleWelcomePack}
                  disabled={!canGenerate || !!generating}
                  className={`w-full py-3.5 rounded-xl text-[14px] font-semibold transition-all cursor-pointer ${
                    canGenerate && !generating
                      ? 'bg-[#0d9488] text-white hover:bg-[#0f766e] active:scale-[0.98]'
                      : 'bg-white/[0.04] text-white/20 cursor-not-allowed'
                  }`}
                >
                  {generating === 'welcome' ? 'Generando...' : 'Descargar Welcome Pack'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-white/30 text-[12px] mt-12">
          Herramienta interna. Los contratos generados son borradores y deben ser revisados antes de su firma.
        </p>
      </main>
    </div>
  );
}

export default function ContratoPage() {
  return (
    <AdminGuard>
      <ContratoContent />
    </AdminGuard>
  );
}
