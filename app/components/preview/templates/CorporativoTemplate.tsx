'use client';

import type { TemplateProps } from './TemplateWrapper';
import { replaceCompanyName } from './TemplateWrapper';

/**
 * Corporativo: Profesional, estructurado, con cards y grids
 * Cada industria tiene secciones visuales únicas
 */
export default function CorporativoTemplate({
  palette,
  industry,
  companyName,
}: TemplateProps) {
  const displayName = companyName || 'Tu Empresa';

  const renderIndustrySection = () => {
    switch (industry.id) {
      case 'restaurante':
        return (
          <section className="py-16 px-8 bg-gray-50">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-bold text-center mb-8">Nuestro Menú</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { cat: 'Entradas', items: ['Ceviche', 'Causa', 'Anticuchos'], price: '25-45' },
                  { cat: 'Platos Fuertes', items: ['Lomo Saltado', 'Ají de Gallina', 'Arroz con Mariscos'], price: '35-65' },
                  { cat: 'Postres', items: ['Suspiro', 'Mazamorra', 'Picarones'], price: '15-25' },
                ].map((menu, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-3" style={{ color: palette.primaryDark }}>{menu.cat}</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {menu.items.map((item, i) => <li key={i}>• {item}</li>)}
                    </ul>
                    <p className="mt-4 text-xs text-gray-400">S/ {menu.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'clinica':
        return (
          <section className="py-16 px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-bold text-center mb-8">Nuestro Equipo Médico</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { name: 'Dr. García', spec: 'Medicina General', exp: '15 años' },
                  { name: 'Dra. López', spec: 'Pediatría', exp: '12 años' },
                  { name: 'Dr. Mendoza', spec: 'Cardiología', exp: '20 años' },
                  { name: 'Dra. Torres', spec: 'Dermatología', exp: '10 años' },
                ].map((doc, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-lg p-5 text-center">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full mb-3" />
                    <p className="font-semibold text-sm">{doc.name}</p>
                    <p className="text-xs" style={{ color: palette.primary }}>{doc.spec}</p>
                    <p className="text-xs text-gray-400 mt-1">{doc.exp} de exp.</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'gimnasio':
        return (
          <section className="py-16 px-8 bg-gray-50">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-bold text-center mb-8">Clases y Horarios</h2>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="grid grid-cols-5 text-center text-sm">
                  <div className="p-3 bg-gray-100 font-semibold">Hora</div>
                  <div className="p-3 bg-gray-100 font-semibold">Lunes</div>
                  <div className="p-3 bg-gray-100 font-semibold">Miércoles</div>
                  <div className="p-3 bg-gray-100 font-semibold">Viernes</div>
                  <div className="p-3 bg-gray-100 font-semibold">Sábado</div>
                  {['6:00', '9:00', '17:00', '19:00'].map((hora, i) => (
                    <div key={i} className="contents">
                      <div className="p-3 border-t text-gray-500">{hora}</div>
                      <div className="p-3 border-t" style={{ color: palette.primary }}>{industry.extraSectionItems[i]}</div>
                      <div className="p-3 border-t" style={{ color: palette.primary }}>{industry.extraSectionItems[(i+1)%4]}</div>
                      <div className="p-3 border-t" style={{ color: palette.primary }}>{industry.extraSectionItems[(i+2)%4]}</div>
                      <div className="p-3 border-t" style={{ color: palette.primary }}>{industry.extraSectionItems[(i+3)%4]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );

      case 'inmobiliaria':
        return (
          <section className="py-16 px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-bold text-center mb-8">Propiedades Destacadas</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { type: 'Casa en Miraflores', price: '450,000', beds: 4, m2: 180 },
                  { type: 'Depto en San Isidro', price: '280,000', beds: 3, m2: 120 },
                  { type: 'Casa en La Molina', price: '520,000', beds: 5, m2: 250 },
                ].map((prop, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="h-40 bg-gray-100" />
                    <div className="p-4">
                      <p className="font-semibold">{prop.type}</p>
                      <p className="text-lg font-bold mt-1" style={{ color: palette.primary }}>S/ {prop.price}</p>
                      <div className="flex gap-4 mt-2 text-xs text-gray-500">
                        <span>{prop.beds} hab</span>
                        <span>{prop.m2} m²</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'tienda-ropa':
        return (
          <section className="py-16 px-8 bg-gray-50">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-bold text-center mb-8">Colecciones</h2>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { name: 'Primavera', discount: '20%' },
                  { name: 'Casual', discount: null },
                  { name: 'Formal', discount: '15%' },
                  { name: 'Accesorios', discount: null },
                ].map((col, idx) => (
                  <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="h-48 bg-gray-100 relative">
                      {col.discount && (
                        <span className="absolute top-2 right-2 px-2 py-1 text-xs text-white rounded" style={{ backgroundColor: palette.primary }}>
                          -{col.discount}
                        </span>
                      )}
                    </div>
                    <div className="p-3 text-center">
                      <p className="font-medium text-sm">{col.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'venta-autos':
        return (
          <section className="py-16 px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-bold text-center mb-8">Inventario Destacado</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: 'Toyota Corolla 2024', price: '85,000', km: '0 km', type: 'Nuevo' },
                  { name: 'Honda CR-V 2023', price: '72,000', km: '15,000 km', type: 'Seminuevo' },
                  { name: 'Hyundai Tucson 2024', price: '95,000', km: '0 km', type: 'Nuevo' },
                ].map((auto, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="h-36 bg-gray-100 relative">
                      <span className="absolute top-2 left-2 px-2 py-1 text-xs text-white rounded" style={{ backgroundColor: palette.primary }}>
                        {auto.type}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="font-semibold">{auto.name}</p>
                      <p className="text-xs text-gray-500">{auto.km}</p>
                      <p className="text-lg font-bold mt-2" style={{ color: palette.primary }}>S/ {auto.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'veterinaria':
        return (
          <section className="py-16 px-8 bg-gray-50">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-bold text-center mb-8">Servicios y Tarifas</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { name: 'Consulta General', price: '80', desc: 'Examen completo de tu mascota' },
                  { name: 'Vacunación', price: '50', desc: 'Vacunas esenciales incluidas' },
                  { name: 'Cirugía Menor', price: '250', desc: 'Procedimientos ambulatorios' },
                  { name: 'Emergencias 24/7', price: '120', desc: 'Atención inmediata cualquier hora' },
                ].map((serv, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200 flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{serv.name}</p>
                      <p className="text-sm text-gray-500">{serv.desc}</p>
                    </div>
                    <p className="text-xl font-bold" style={{ color: palette.primary }}>S/ {serv.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'abogado':
        return (
          <section className="py-16 px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-bold text-center mb-8">Casos de Éxito</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { area: 'Derecho Civil', casos: 150, rate: '95%' },
                  { area: 'Derecho Penal', casos: 80, rate: '92%' },
                  { area: 'Derecho Laboral', casos: 200, rate: '98%' },
                ].map((caso, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                    <p className="font-semibold mb-2">{caso.area}</p>
                    <p className="text-3xl font-bold" style={{ color: palette.primary }}>{caso.casos}+</p>
                    <p className="text-sm text-gray-500">casos resueltos</p>
                    <p className="mt-2 text-xs text-green-600">Tasa de éxito: {caso.rate}</p>
                  </div>
                ))}
              </div>
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
      <nav className="py-4 px-8 flex items-center justify-between shadow-sm bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded flex items-center justify-center text-white font-bold" style={{ backgroundColor: palette.primary }}>
            {displayName.charAt(0).toUpperCase()}
          </div>
          <span className="font-semibold text-lg">{displayName}</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium">Inicio</span>
          <span className="text-sm font-medium text-gray-500">Servicios</span>
          <button className="px-5 py-2 text-sm font-medium text-white rounded" style={{ backgroundColor: palette.primary }}>
            Contacto
          </button>
        </div>
      </nav>

      {/* Hero with image area */}
      <section className="py-20 px-8" style={{ backgroundColor: palette.primary }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm text-white/60 uppercase tracking-wider mb-2">{industry.name}</p>
            <h1 className="text-4xl font-bold text-white mb-4">{industry.heroTitle}</h1>
            <p className="text-lg text-white/80 mb-8">{replaceCompanyName(industry.heroSubtitle, displayName)}</p>
            <button className="px-6 py-3 text-sm font-semibold rounded bg-white" style={{ color: palette.primaryDark }}>
              {industry.ctaText}
            </button>
          </div>
          <div className="hidden md:block">
            <div className="w-full h-64 rounded-lg" style={{ backgroundColor: palette.primaryDark }} />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-4 gap-8 text-center">
          {industry.stats.map((stat, idx) => (
            <div key={idx}>
              <p className="text-2xl font-bold" style={{ color: palette.primaryDark }}>{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-8">Nuestros Servicios</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {industry.services.map((service, idx) => (
              <div key={idx} className="p-5 rounded-lg border border-gray-200 text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded flex items-center justify-center" style={{ backgroundColor: `${palette.primary}15` }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={palette.primary} strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="font-medium text-sm">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry-specific section */}
      {renderIndustrySection()}

      {/* Testimonial */}
      <section className="py-16 px-8" style={{ backgroundColor: palette.primaryDark }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl text-white mb-4">"{industry.testimonial.text}"</p>
          <p className="text-white/80 font-medium">{industry.testimonial.author}</p>
          <p className="text-white/60 text-sm">{industry.testimonial.role}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <p className="text-sm text-gray-500">© 2024 {displayName}</p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>Privacidad</span>
            <span>Términos</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
