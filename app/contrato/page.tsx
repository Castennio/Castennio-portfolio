'use client';

import { useState, useEffect, useRef } from 'react';
import AdminGuard from '@/app/components/admin/AdminGuard';
import { downloadContractPDF, generateContractBase64 } from '@/app/components/admin/contract/ContractPDF';
import { downloadWelcomePackPDF, generateWelcomePackBase64 } from '@/app/components/admin/contract/WelcomePackPDF';
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
    <label className="block text-[13px] font-medium text-muted-foreground mb-1.5">
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
          ? 'bg-foreground/20 text-muted-foreground border border-foreground/40'
          : 'bg-secondary text-muted-foreground border border-border hover:bg-secondary hover:text-muted-foreground'
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

  const [rucStatus, setRucStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const rucAbort = useRef<AbortController | null>(null);

  const updateRuc = (field: string, value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    setForm((prev) => ({ ...prev, [field]: digits }));
  };

  useEffect(() => {
    if (form.clienteRuc.length !== 11) {
      setRucStatus('idle');
      return;
    }
    rucAbort.current?.abort();
    const ctrl = new AbortController();
    rucAbort.current = ctrl;
    setRucStatus('loading');

    fetch(`/api/ruc?numero=${form.clienteRuc}`, { signal: ctrl.signal })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data: { nombre?: string }) => {
        if (data.nombre) {
          const isPersonaNatural = form.clienteRuc.startsWith('10');
          setForm((prev) => ({
            ...prev,
            ...(isPersonaNatural
              ? { clienteRepresentante: data.nombre! }
              : { clienteEmpresa: data.nombre!, }),
          }));
          setRucStatus('success');
        } else {
          setRucStatus('error');
        }
      })
      .catch((e) => {
        if (e?.name !== 'AbortError') setRucStatus('error');
      });

    return () => ctrl.abort();
  }, [form.clienteRuc]);

  const isPersonaNatural = form.clienteRuc.startsWith('10') && form.clienteRuc.length === 11;

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
    (isPersonaNatural || form.clienteEmpresa) &&
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
    clienteEmpresa: isPersonaNatural ? form.clienteRepresentante : form.clienteEmpresa,
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

  const [emailModal, setEmailModal] = useState<'contrato' | 'welcome' | null>(null);
  const [emailList, setEmailList] = useState<string[]>(['']);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<'success' | 'error' | null>(null);

  const openEmailModal = (type: 'contrato' | 'welcome') => {
    setEmailList(['']);
    setSendResult(null);
    setEmailModal(type);
  };

  const handleSendEmail = async () => {
    const validEmails = emailList.filter((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));
    if (!validEmails.length || !canGenerate) return;
    setSending(true);
    setSendResult(null);
    try {
      const data = buildData();
      const pdfBase64 = emailModal === 'welcome'
        ? await generateWelcomePackBase64(data)
        : await generateContractBase64(data);
      const slug = data.clienteEmpresa.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const fileName = emailModal === 'welcome'
        ? `welcome-pack-${slug}.pdf`
        : `contrato-${slug}.pdf`;
      const res = await fetch('/api/send-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emails: validEmails,
          pdfBase64,
          fileName,
          docType: emailModal,
          clientName: data.clienteEmpresa,
        }),
      });
      setSendResult(res.ok ? 'success' : 'error');
      if (res.ok) setTimeout(() => setEmailModal(null), 1500);
    } catch {
      setSendResult('error');
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    'w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-foreground text-[14px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring  focus:bg-secondary transition-all';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                href="/calculadora"
                className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors"
              >
                <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </a>
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  Generador de Contratos
                </h1>
                <p className="text-[13px] text-muted-foreground">
                  Panel administrativo CASTENNIO
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 text-[11px] font-medium tracking-wider uppercase bg-foreground/10 text-muted-foreground rounded-full">
                Admin
              </span>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground/80 hover:bg-secondary transition-colors cursor-pointer"
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
            <section className="bg-card border border-border border-l-2 border-l-foreground rounded-2xl p-6">
              <h2 className="text-[15px] font-semibold text-foreground mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-foreground/15 text-foreground text-[11px] font-bold flex items-center justify-center">C</span>
                Datos del Cliente
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  {rucStatus === 'loading' && (
                    <p className="text-[11px] text-foreground/70 mt-1">Consultando SUNAT...</p>
                  )}
                  {rucStatus === 'success' && (
                    <p className="text-[11px] text-emerald-400/70 mt-1">
                      {isPersonaNatural ? 'Persona natural identificada' : 'Razón social encontrada'}
                    </p>
                  )}
                  {rucStatus === 'error' && (
                    <p className="text-[11px] text-red-400/70 mt-1">RUC no encontrado</p>
                  )}
                </div>
                <div>
                  <FieldLabel>Razón social</FieldLabel>
                  <input
                    className={`${inputClass} ${isPersonaNatural ? 'opacity-40 cursor-not-allowed' : ''}`}
                    placeholder={isPersonaNatural ? 'No aplica para persona natural' : 'Se autocompleta con el RUC'}
                    maxLength={120}
                    disabled={isPersonaNatural}
                    value={isPersonaNatural ? '' : form.clienteEmpresa}
                    onChange={(e) => update('clienteEmpresa', e.target.value)}
                  />
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
            <section className="bg-card border border-border border-l-2 border-l-violet-500/50 rounded-2xl p-6">
              <h2 className="text-[15px] font-semibold text-foreground mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-violet-500/15 text-violet-400 text-[11px] font-bold flex items-center justify-center">D</span>
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
            <section className="bg-card border border-border border-l-2 border-l-pink-500/50 rounded-2xl p-6">
              <h2 className="text-[15px] font-semibold text-foreground mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-pink-500/15 text-pink-400 text-[11px] font-bold flex items-center justify-center">P</span>
                Proyecto
              </h2>
              <div className="space-y-4">
                <div>
                  <FieldLabel>Descripción del proyecto</FieldLabel>
                  <p className="text-[13px] text-muted-foreground mb-2 italic">
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
            <section className="bg-card border border-border border-l-2 border-l-amber-500/50 rounded-2xl p-6">
              <h2 className="text-[15px] font-semibold text-foreground mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-amber-500/15 text-amber-400 text-[11px] font-bold flex items-center justify-center">$</span>
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
                  <p className="text-[11px] text-muted-foreground mt-1">Aparece en el Welcome Pack. Si no lo tienes aún, se muestra como &quot;Próximamente&quot;.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar: Preview + Generate */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price summary */}
              <div className="bg-secondary border border-border rounded-2xl p-6">
                <h3 className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Resumen de Precios
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-[14px]">
                    <span className="text-muted-foreground">Servicio</span>
                    <span className="text-foreground font-medium">
                      S/ {precio.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[14px]">
                    <span className="text-muted-foreground">IGV (18%)</span>
                    <span className="text-foreground font-medium">
                      S/ {igv.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-[16px]">
                    <span className="text-foreground/80 font-semibold">Total</span>
                    <span className="text-muted-foreground font-bold">
                      S/ {total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-[13px] font-semibold text-foreground/80 uppercase tracking-wider mb-4">
                  Campos requeridos
                </h3>
                <div className="space-y-2 text-[13px]">
                  {[
                    ['Razón social', isPersonaNatural || !!form.clienteEmpresa],
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
                            : 'bg-secondary text-muted-foreground'
                        }`}
                      >
                        {ok ? '✓' : '·'}
                      </span>
                      <span className={ok ? 'text-muted-foreground' : 'text-muted-foreground'}>
                        {label as string}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generate buttons */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <button
                    onClick={handleContrato}
                    disabled={!canGenerate || !!generating}
                    className={`flex-1 py-3.5 rounded-xl text-[14px] font-semibold transition-all cursor-pointer ${
                      canGenerate && !generating
                        ? 'bg-foreground text-primary-foreground hover:bg-foreground/90 active:scale-[0.98]'
                        : 'bg-secondary text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    {generating === 'contrato' ? 'Generando...' : 'Descargar Contrato'}
                  </button>
                  <button
                    onClick={() => openEmailModal('contrato')}
                    disabled={!canGenerate || !!generating}
                    className={`w-12 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                      canGenerate && !generating
                        ? 'bg-foreground/20 text-muted-foreground hover:bg-foreground/30 active:scale-95'
                        : 'bg-card text-muted-foreground cursor-not-allowed'
                    }`}
                    title="Enviar por correo"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleWelcomePack}
                    disabled={!canGenerate || !!generating}
                    className={`flex-1 py-3.5 rounded-xl text-[14px] font-semibold transition-all cursor-pointer ${
                      canGenerate && !generating
                        ? 'bg-foreground text-primary-foreground hover:bg-foreground/90 active:scale-[0.98]'
                        : 'bg-secondary text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    {generating === 'welcome' ? 'Generando...' : 'Descargar Welcome Pack'}
                  </button>
                  <button
                    onClick={() => openEmailModal('welcome')}
                    disabled={!canGenerate || !!generating}
                    className={`w-12 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                      canGenerate && !generating
                        ? 'bg-foreground/20 text-teal-400 hover:bg-foreground/30 active:scale-95'
                        : 'bg-card text-muted-foreground cursor-not-allowed'
                    }`}
                    title="Enviar por correo"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-[12px] mt-12">
          Herramienta interna. Los contratos generados son borradores y deben ser revisados antes de su firma.
        </p>
      </main>

      {/* Email Modal */}
      {emailModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => !sending && setEmailModal(null)}>
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[16px] font-semibold text-foreground">
                Enviar {emailModal === 'welcome' ? 'Welcome Pack' : 'Contrato'}
              </h3>
              <button onClick={() => !sending && setEmailModal(null)} className="text-muted-foreground hover:text-muted-foreground transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-2 mb-4">
              {emailList.map((email, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => {
                      const updated = [...emailList];
                      updated[i] = e.target.value;
                      setEmailList(updated);
                    }}
                  />
                  {emailList.length > 1 && (
                    <button
                      onClick={() => setEmailList(emailList.filter((_, j) => j !== i))}
                      className="w-10 flex-shrink-0 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setEmailList([...emailList, ''])}
              className="w-full py-2 rounded-lg border border-dashed border-border text-muted-foreground hover:text-muted-foreground hover:border-border text-[13px] transition-colors mb-5 cursor-pointer flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Agregar otro correo
            </button>

            {sendResult === 'success' && (
              <p className="text-[13px] text-emerald-400 text-center mb-4">Enviado correctamente</p>
            )}
            {sendResult === 'error' && (
              <p className="text-[13px] text-red-400 text-center mb-4">Error al enviar, intenta de nuevo</p>
            )}

            <button
              onClick={handleSendEmail}
              disabled={sending || !emailList.some((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))}
              className={`w-full py-3.5 rounded-xl text-[14px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                !sending && emailList.some((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))
                  ? emailModal === 'welcome'
                    ? 'bg-foreground text-primary-foreground hover:bg-foreground/90 active:scale-[0.98]'
                    : 'bg-foreground text-primary-foreground hover:bg-foreground/90 active:scale-[0.98]'
                  : 'bg-secondary text-muted-foreground cursor-not-allowed'
              }`}
            >
              {sending ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  Enviar
                </>
              )}
            </button>
          </div>
        </div>
      )}
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
