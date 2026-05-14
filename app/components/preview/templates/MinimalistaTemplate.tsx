'use client';

import type { TemplateProps } from './TemplateWrapper';
import { replaceCompanyName } from './TemplateWrapper';

/**
 * Minimalista: Limpio, espacioso, outline buttons, sin border-radius
 * Cada industria tiene secciones visuales únicas
 */
export default function MinimalistaTemplate({
  palette,
  industry,
  companyName,
}: TemplateProps) {
  const displayName = companyName || 'Tu Empresa';

  // Secciones específicas por industria
  const renderIndustrySection = () => {
    switch (industry.id) {
      case 'restaurante':
        return (
          <section className="py-20 px-8 border-t border-gray-100">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-light text-center mb-12">Menú Destacado</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {['Entradas', 'Platos Fuertes', 'Postres'].map((cat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="w-full h-32 bg-gray-100 mb-4" />
                    <p className="font-light text-gray-600">{cat}</p>
                    <p className="text-xs text-gray-400 mt-1">Desde S/ {(idx + 1) * 15}</p>
                  </div>
                ))}
              </div>
              <p className="text-center mt-8 text-sm text-gray-400">Horario: Lun-Dom 12:00 - 22:00</p>
            </div>
          </section>
        );

      case 'clinica':
        return (
          <section className="py-20 px-8 border-t border-gray-100">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-light text-center mb-12">Especialistas</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {['Dr. García', 'Dra. López', 'Dr. Mendoza', 'Dra. Torres'].map((doc, idx) => (
                  <div key={idx} className="text-center">
                    <div className="w-20 h-20 mx-auto bg-gray-100 mb-3" />
                    <p className="text-sm text-gray-700">{doc}</p>
                    <p className="text-xs text-gray-400">{industry.extraSectionItems[idx]}</p>
                  </div>
                ))}
              </div>
              <p className="text-center mt-8 text-sm text-gray-400">Atención: Lun-Sáb 8:00 - 20:00</p>
            </div>
          </section>
        );

      case 'gimnasio':
        return (
          <section className="py-20 px-8 border-t border-gray-100">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-light text-center mb-12">Horario de Clases</h2>
              <div className="grid md:grid-cols-4 gap-4">
                {['6:00 AM', '9:00 AM', '5:00 PM', '7:00 PM'].map((hora, idx) => (
                  <div key={idx} className="border border-gray-200 p-4 text-center">
                    <p className="text-xs text-gray-400">{hora}</p>
                    <p className="font-light mt-1">{industry.extraSectionItems[idx]}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'inmobiliaria':
        return (
          <section className="py-20 px-8 border-t border-gray-100">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-light text-center mb-12">Propiedades Destacadas</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[{ price: '250,000', type: 'Casa', beds: 3 }, { price: '180,000', type: 'Depto', beds: 2 }, { price: '320,000', type: 'Casa', beds: 4 }].map((prop, idx) => (
                  <div key={idx}>
                    <div className="w-full h-40 bg-gray-100 mb-3" />
                    <p className="font-light">{prop.type} · {prop.beds} hab</p>
                    <p className="text-sm" style={{ color: palette.primaryDark }}>S/ {prop.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'tienda-ropa':
        return (
          <section className="py-20 px-8 border-t border-gray-100">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-light text-center mb-12">Nueva Colección</h2>
              <div className="grid grid-cols-4 gap-4">
                {['Vestidos', 'Camisas', 'Pantalones', 'Accesorios'].map((cat, idx) => (
                  <div key={idx}>
                    <div className="w-full aspect-[3/4] bg-gray-100 mb-2" />
                    <p className="text-xs text-center text-gray-500">{cat}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'venta-autos':
        return (
          <section className="py-20 px-8 border-t border-gray-100">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-light text-center mb-12">Vehículos Destacados</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[{ name: 'Sedán 2024', price: '45,000' }, { name: 'SUV 2023', price: '52,000' }, { name: 'Hatchback', price: '38,000' }].map((auto, idx) => (
                  <div key={idx}>
                    <div className="w-full h-36 bg-gray-100 mb-3" />
                    <p className="font-light">{auto.name}</p>
                    <p className="text-sm" style={{ color: palette.primaryDark }}>Desde S/ {auto.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'veterinaria':
        return (
          <section className="py-20 px-8 border-t border-gray-100">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-light text-center mb-12">Servicios para tu Mascota</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border border-gray-200 p-6">
                  <p className="font-light mb-2">Consulta General</p>
                  <p className="text-sm text-gray-400">Examen completo + vacunas</p>
                  <p className="mt-2" style={{ color: palette.primaryDark }}>S/ 80</p>
                </div>
                <div className="border border-gray-200 p-6">
                  <p className="font-light mb-2">Emergencias 24/7</p>
                  <p className="text-sm text-gray-400">Atención inmediata</p>
                  <p className="mt-2" style={{ color: palette.primaryDark }}>Llamar ahora</p>
                </div>
              </div>
            </div>
          </section>
        );

      case 'abogado':
        return (
          <section className="py-20 px-8 border-t border-gray-100">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-light text-center mb-12">Áreas de Práctica</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {industry.extraSectionItems.map((area, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 border border-gray-200">
                    <span style={{ color: palette.primaryDark }}>0{idx + 1}</span>
                    <span className="font-light">{area}</span>
                  </div>
                ))}
              </div>
              <p className="text-center mt-8 text-sm text-gray-400">Primera consulta gratuita</p>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="py-6 px-8 flex items-center justify-between border-b border-gray-100">
        <span className="text-xl font-light tracking-wide">{displayName}</span>
        <div className="flex items-center gap-8">
          <span className="text-sm text-gray-500">Inicio</span>
          <span className="text-sm text-gray-500">Servicios</span>
          <span className="text-sm text-gray-500">Contacto</span>
        </div>
      </nav>

      {/* Hero - Minimal centered */}
      <section className="py-32 px-8 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-light tracking-tight mb-6">{industry.heroTitle}</h1>
        <p className="text-xl font-light mb-12 text-gray-500">
          {replaceCompanyName(industry.heroSubtitle, displayName)}
        </p>
        <button
          className="px-8 py-3 text-sm tracking-wide border-2"
          style={{ borderColor: palette.primary, color: palette.primaryDark }}
        >
          {industry.ctaText}
        </button>
      </section>

      {/* Stats - Simple line */}
      <section className="py-12 px-8 border-y border-gray-100">
        <div className="max-w-4xl mx-auto flex justify-between">
          {industry.stats.slice(0, 3).map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-2xl font-light" style={{ color: palette.primaryDark }}>{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services - Numbered list */}
      <section className="py-20 px-8">
        <div className="max-w-3xl mx-auto">
          {industry.services.map((service, idx) => (
            <div key={idx} className="flex items-center gap-6 py-4 border-b border-gray-100">
              <span className="text-sm text-gray-300">0{idx + 1}</span>
              <span className="font-light">{service}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Industry-specific section */}
      {renderIndustrySection()}

      {/* Testimonial - Simple quote */}
      <section className="py-24 px-8 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xl font-light italic text-gray-600 mb-6">
            "{industry.testimonial.text}"
          </p>
          <p className="text-sm text-gray-400">{industry.testimonial.author}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 text-center border-t border-gray-100">
        <p className="text-sm text-gray-400">{displayName}</p>
      </footer>
    </div>
  );
}
