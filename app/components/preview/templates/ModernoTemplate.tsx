'use client';

import type { TemplateProps } from './TemplateWrapper';
import { replaceCompanyName } from './TemplateWrapper';

/**
 * Moderno: Elegante, sofisticado con sombras suaves y cards flotantes
 * Cada industria tiene secciones visuales únicas
 */
export default function ModernoTemplate({
  palette,
  industry,
  companyName,
}: TemplateProps) {
  const displayName = companyName || 'Tu Empresa';

  const renderIndustrySection = () => {
    switch (industry.id) {
      case 'restaurante':
        return (
          <section className="py-20 px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-sm font-medium mb-2" style={{ color: palette.primaryDark }}>Explora</p>
                <h2 className="text-2xl font-bold">Nuestra Carta</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: 'Entradas', items: ['Ceviche Clásico', 'Causa Limeña'], from: '25' },
                  { name: 'Principales', items: ['Lomo Saltado', 'Ají de Gallina'], from: '45' },
                  { name: 'Postres', items: ['Suspiro Limeño', 'Tres Leches'], from: '18' },
                ].map((cat, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                    <h3 className="font-bold text-lg mb-3">{cat.name}</h3>
                    <ul className="space-y-2 text-sm text-gray-600 mb-4">
                      {cat.items.map((item, i) => <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: palette.primary }} />{item}</li>)}
                    </ul>
                    <p className="text-xs text-gray-400">Desde S/ {cat.from}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'clinica':
        return (
          <section className="py-20 px-8 bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-sm font-medium mb-2" style={{ color: palette.primaryDark }}>Equipo</p>
                <h2 className="text-2xl font-bold">Profesionales de Confianza</h2>
              </div>
              <div className="grid md:grid-cols-4 gap-5">
                {[
                  { name: 'Dr. García', spec: 'Medicina General', years: 15 },
                  { name: 'Dra. López', spec: 'Pediatría', years: 12 },
                  { name: 'Dr. Mendoza', spec: 'Cardiología', years: 20 },
                  { name: 'Dra. Torres', spec: 'Dermatología', years: 10 },
                ].map((doc, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-2xl p-5 text-center hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 mx-auto rounded-2xl mb-4" style={{ backgroundColor: `${palette.primary}15` }} />
                    <p className="font-semibold">{doc.name}</p>
                    <p className="text-sm" style={{ color: palette.primary }}>{doc.spec}</p>
                    <p className="text-xs text-gray-400 mt-1">{doc.years} años exp.</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'gimnasio':
        return (
          <section className="py-20 px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-sm font-medium mb-2" style={{ color: palette.primaryDark }}>Entrena</p>
                <h2 className="text-2xl font-bold">Clases Disponibles</h2>
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { name: 'CrossFit', level: 'Intenso', duration: '45 min' },
                  { name: 'Spinning', level: 'Medio', duration: '50 min' },
                  { name: 'Yoga', level: 'Suave', duration: '60 min' },
                  { name: 'Zumba', level: 'Medio', duration: '45 min' },
                ].map((clase, idx) => (
                  <div key={idx} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-24" style={{ backgroundColor: `${palette.primary}15` }} />
                    <div className="p-4">
                      <p className="font-semibold">{clase.name}</p>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>{clase.level}</span>
                        <span>{clase.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'inmobiliaria':
        return (
          <section className="py-20 px-8 bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-sm font-medium mb-2" style={{ color: palette.primaryDark }}>Destacados</p>
                <h2 className="text-2xl font-bold">Propiedades Premium</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { type: 'Casa Moderna', zone: 'Miraflores', price: '450,000', beds: 4, m2: 180 },
                  { type: 'Penthouse', zone: 'San Isidro', price: '380,000', beds: 3, m2: 150 },
                  { type: 'Casa Campestre', zone: 'La Molina', price: '620,000', beds: 5, m2: 300 },
                ].map((prop, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-44" style={{ backgroundColor: `${palette.primary}10` }} />
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">{prop.type}</p>
                          <p className="text-sm text-gray-500">{prop.zone}</p>
                        </div>
                        <span className="px-2 py-1 text-xs rounded-lg" style={{ backgroundColor: `${palette.primary}15`, color: palette.primaryDark }}>
                          {prop.beds} hab
                        </span>
                      </div>
                      <p className="text-xl font-bold" style={{ color: palette.primary }}>S/ {prop.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'tienda-ropa':
        return (
          <section className="py-20 px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-sm font-medium mb-2" style={{ color: palette.primaryDark }}>Shop</p>
                <h2 className="text-2xl font-bold">Categorías</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {['Mujer', 'Hombre', 'Accesorios', 'Sale'].map((cat, idx) => (
                  <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="h-52" style={{ backgroundColor: `${palette.primary}${10 + idx * 5}` }} />
                    <div className="p-4 text-center">
                      <p className="font-semibold">{cat}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'venta-autos':
        return (
          <section className="py-20 px-8 bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-sm font-medium mb-2" style={{ color: palette.primaryDark }}>Inventario</p>
                <h2 className="text-2xl font-bold">Vehículos Disponibles</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: 'Toyota Corolla', year: 2024, price: '85,000', tag: 'Nuevo' },
                  { name: 'Honda CR-V', year: 2023, price: '72,000', tag: 'Seminuevo' },
                  { name: 'Hyundai Tucson', year: 2024, price: '95,000', tag: 'Nuevo' },
                ].map((auto, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-40 relative" style={{ backgroundColor: `${palette.primary}10` }}>
                      <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium text-white rounded-lg" style={{ backgroundColor: palette.primary }}>
                        {auto.tag}
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="font-semibold">{auto.name}</p>
                      <p className="text-sm text-gray-500">{auto.year}</p>
                      <p className="text-xl font-bold mt-2" style={{ color: palette.primary }}>S/ {auto.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'veterinaria':
        return (
          <section className="py-20 px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-sm font-medium mb-2" style={{ color: palette.primaryDark }}>Servicios</p>
                <h2 className="text-2xl font-bold">Precios Transparentes</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { name: 'Consulta General', price: '80', icon: '🩺' },
                  { name: 'Vacunación', price: '50', icon: '💉' },
                  { name: 'Cirugía Menor', price: '250', icon: '🏥' },
                  { name: 'Emergencia 24/7', price: '120', icon: '🚨' },
                ].map((serv, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{serv.icon}</span>
                      <p className="font-semibold">{serv.name}</p>
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
          <section className="py-20 px-8 bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-sm font-medium mb-2" style={{ color: palette.primaryDark }}>Especialidades</p>
                <h2 className="text-2xl font-bold">Áreas de Práctica</h2>
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { name: 'Civil', cases: '150+' },
                  { name: 'Penal', cases: '80+' },
                  { name: 'Laboral', cases: '200+' },
                  { name: 'Comercial', cases: '120+' },
                ].map((area, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                    <p className="font-semibold mb-2">Derecho {area.name}</p>
                    <p className="text-2xl font-bold" style={{ color: palette.primary }}>{area.cases}</p>
                    <p className="text-xs text-gray-500">casos resueltos</p>
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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="py-4 px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl shadow-sm bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-semibold text-sm" style={{ backgroundColor: palette.primary }}>
              {displayName.slice(0, 2).toUpperCase()}
            </div>
            <span className="font-semibold">{displayName}</span>
          </div>
          <button className="px-5 py-2 text-sm font-medium text-white rounded-xl" style={{ backgroundColor: palette.primary }}>
            Contacto
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-medium mb-4" style={{ color: palette.primaryDark }}>{industry.name}</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{industry.heroTitle}</h1>
            <p className="text-lg text-gray-600 mb-8">{replaceCompanyName(industry.heroSubtitle, displayName)}</p>
            <button className="px-7 py-3.5 text-sm font-semibold text-white rounded-xl shadow-lg" style={{ backgroundColor: palette.primary, boxShadow: `0 8px 30px ${palette.primary}30` }}>
              {industry.ctaText}
            </button>
          </div>
          <div className="hidden md:block">
            <div className="w-full aspect-square rounded-3xl shadow-xl" style={{ backgroundColor: `${palette.primary}15` }} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-4">
          {industry.stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm text-center">
              <p className="text-2xl font-bold" style={{ color: palette.primaryDark }}>{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium mb-2" style={{ color: palette.primaryDark }}>Servicios</p>
            <h2 className="text-2xl font-bold">Lo que ofrecemos</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {industry.services.map((service, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 mb-4 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${palette.primary}15` }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={palette.primary} strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="font-semibold">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry-specific section */}
      {renderIndustrySection()}

      {/* Testimonial */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-sm text-center">
          <p className="text-xl text-gray-700 mb-4">"{industry.testimonial.text}"</p>
          <p className="font-semibold">{industry.testimonial.author}</p>
          <p className="text-sm text-gray-500">{industry.testimonial.role}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto rounded-3xl p-12 text-center" style={{ backgroundColor: palette.primary }}>
          <h3 className="text-3xl font-bold text-white mb-4">Comienza hoy</h3>
          <button className="px-8 py-4 font-semibold rounded-xl bg-white" style={{ color: palette.primaryDark }}>
            Hablar con un asesor
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8">
        <div className="max-w-6xl mx-auto rounded-2xl p-6 bg-white flex justify-between items-center">
          <span className="font-semibold">{displayName}</span>
          <p className="text-sm text-gray-500">© 2024</p>
        </div>
      </footer>
    </div>
  );
}
