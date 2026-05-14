'use client';

import type { TemplateProps } from './TemplateWrapper';
import { replaceCompanyName } from './TemplateWrapper';

/**
 * Creativo: Atrevido, dinámico con formas redondeadas y colores vibrantes
 * Cada industria tiene secciones visuales únicas
 */
export default function CreativoTemplate({
  palette,
  industry,
  companyName,
}: TemplateProps) {
  const displayName = companyName || 'Tu Empresa';

  const renderIndustrySection = () => {
    switch (industry.id) {
      case 'restaurante':
        return (
          <section className="py-16 px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-10">Explora Nuestro Menú</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { emoji: '🥗', cat: 'Entradas', desc: 'Frescas y deliciosas' },
                  { emoji: '🍝', cat: 'Platos Fuertes', desc: 'Sabores únicos' },
                  { emoji: '🍰', cat: 'Postres', desc: 'Dulce final' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-3xl p-8 text-center shadow-lg hover:scale-105 transition-transform">
                    <span className="text-5xl block mb-4">{item.emoji}</span>
                    <p className="font-bold text-lg">{item.cat}</p>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                    <button className="mt-4 px-4 py-2 rounded-full text-sm text-white" style={{ backgroundColor: palette.primary }}>
                      Ver opciones
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'clinica':
        return (
          <section className="py-16 px-8 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-10">Nuestros Especialistas</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { emoji: '👨‍⚕️', name: 'Dr. García', spec: 'Medicina General' },
                  { emoji: '👩‍⚕️', name: 'Dra. López', spec: 'Pediatría' },
                  { emoji: '👨‍⚕️', name: 'Dr. Mendoza', spec: 'Cardiología' },
                  { emoji: '👩‍⚕️', name: 'Dra. Torres', spec: 'Dermatología' },
                ].map((doc, idx) => (
                  <div key={idx} className="bg-white rounded-3xl p-6 text-center shadow-md">
                    <span className="text-4xl block mb-3">{doc.emoji}</span>
                    <p className="font-bold">{doc.name}</p>
                    <p className="text-sm" style={{ color: palette.primary }}>{doc.spec}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'gimnasio':
        return (
          <section className="py-16 px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-10">Nuestras Clases</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { emoji: '🏋️', name: 'CrossFit', time: '6:00 AM' },
                  { emoji: '🚴', name: 'Spinning', time: '7:00 AM' },
                  { emoji: '🧘', name: 'Yoga', time: '8:00 AM' },
                  { emoji: '💃', name: 'Zumba', time: '6:00 PM' },
                ].map((clase, idx) => (
                  <div key={idx} className="rounded-3xl p-6 text-center text-white" style={{ backgroundColor: palette.primary }}>
                    <span className="text-3xl block mb-2">{clase.emoji}</span>
                    <p className="font-bold">{clase.name}</p>
                    <p className="text-sm text-white/70">{clase.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'inmobiliaria':
        return (
          <section className="py-16 px-8 bg-gray-50">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-10">Propiedades Hot</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { emoji: '🏠', type: 'Casa', zone: 'Miraflores', price: '450K' },
                  { emoji: '🏢', type: 'Depto', zone: 'San Isidro', price: '280K' },
                  { emoji: '🏡', type: 'Casa', zone: 'La Molina', price: '520K' },
                ].map((prop, idx) => (
                  <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-lg">
                    <div className="h-40 flex items-center justify-center text-6xl" style={{ backgroundColor: `${palette.primary}20` }}>
                      {prop.emoji}
                    </div>
                    <div className="p-5">
                      <p className="font-bold">{prop.type} en {prop.zone}</p>
                      <p className="text-2xl font-bold mt-2" style={{ color: palette.primary }}>S/ {prop.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'tienda-ropa':
        return (
          <section className="py-16 px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-10">Tendencias</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { emoji: '👗', name: 'Vestidos', tag: 'NEW' },
                  { emoji: '👔', name: 'Camisas', tag: null },
                  { emoji: '👖', name: 'Jeans', tag: 'SALE' },
                  { emoji: '👜', name: 'Bolsos', tag: 'HOT' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-3xl p-6 text-center shadow-md relative">
                    {item.tag && (
                      <span className="absolute top-3 right-3 px-2 py-1 text-xs text-white rounded-full" style={{ backgroundColor: palette.primary }}>
                        {item.tag}
                      </span>
                    )}
                    <span className="text-4xl block mb-3">{item.emoji}</span>
                    <p className="font-bold">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'venta-autos':
        return (
          <section className="py-16 px-8 bg-gray-50">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-10">Garage Virtual</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { emoji: '🚗', name: 'Sedán', desc: 'Elegancia y confort' },
                  { emoji: '🚙', name: 'SUV', desc: 'Aventura sin límites' },
                  { emoji: '🏎️', name: 'Deportivo', desc: 'Velocidad pura' },
                ].map((auto, idx) => (
                  <div key={idx} className="bg-white rounded-3xl p-8 text-center shadow-lg">
                    <span className="text-5xl block mb-4">{auto.emoji}</span>
                    <p className="font-bold text-lg">{auto.name}</p>
                    <p className="text-sm text-gray-500">{auto.desc}</p>
                    <button className="mt-4 px-5 py-2 rounded-full text-sm font-bold text-white" style={{ backgroundColor: palette.primary }}>
                      Ver modelos
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'veterinaria':
        return (
          <section className="py-16 px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-10">Cuidamos de Todos</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { emoji: '🐕', name: 'Perros' },
                  { emoji: '🐈', name: 'Gatos' },
                  { emoji: '🐦', name: 'Aves' },
                  { emoji: '🐹', name: 'Roedores' },
                ].map((pet, idx) => (
                  <div key={idx} className="rounded-3xl p-6 text-center" style={{ backgroundColor: `${palette.primary}15` }}>
                    <span className="text-4xl block mb-2">{pet.emoji}</span>
                    <p className="font-bold">{pet.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'abogado':
        return (
          <section className="py-16 px-8 bg-gray-50">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-10">Áreas de Especialización</h2>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { emoji: '⚖️', name: 'Civil' },
                  { emoji: '🏛️', name: 'Penal' },
                  { emoji: '💼', name: 'Laboral' },
                  { emoji: '🏢', name: 'Comercial' },
                ].map((area, idx) => (
                  <div key={idx} className="bg-white rounded-3xl p-6 text-center shadow-md hover:shadow-xl transition-shadow">
                    <span className="text-4xl block mb-3">{area.emoji}</span>
                    <p className="font-bold">Derecho {area.name}</p>
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
      <nav className="py-5 px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: palette.primary }}>
            {displayName.charAt(0).toUpperCase()}
          </div>
          <span className="font-bold text-xl">{displayName}</span>
        </div>
        <button className="px-6 py-2.5 text-sm font-bold text-white rounded-full" style={{ backgroundColor: palette.primary }}>
          Contacto
        </button>
      </nav>

      {/* Hero - Centered with decorations */}
      <section className="py-20 px-8 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full blur-3xl opacity-20" style={{ backgroundColor: palette.primary }} />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full blur-3xl opacity-15" style={{ backgroundColor: palette.secondary }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 text-white" style={{ backgroundColor: palette.primary }}>
            {industry.name}
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">{industry.heroTitle}</h1>
          <p className="text-xl mb-10 text-gray-600">{replaceCompanyName(industry.heroSubtitle, displayName)}</p>
          <button className="px-8 py-4 text-base font-bold text-white rounded-full shadow-lg" style={{ backgroundColor: palette.primary, boxShadow: `0 10px 40px ${palette.primary}40` }}>
            {industry.ctaText}
          </button>
        </div>
      </section>

      {/* Stats - Colored cards */}
      <section className="py-12 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-4 gap-4">
          {industry.stats.map((stat, idx) => (
            <div key={idx} className="rounded-2xl p-5 text-center" style={{ backgroundColor: `${palette.primary}10` }}>
              <p className="text-2xl font-extrabold" style={{ color: palette.primaryDark }}>{stat.value}</p>
              <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services - Circle icons */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Lo que hacemos</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {industry.services.map((service, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 text-center shadow-sm">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: palette.primary }}>
                  {idx + 1}
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
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-5xl block mb-4">⭐</span>
          <p className="text-xl italic mb-4">"{industry.testimonial.text}"</p>
          <p className="font-bold" style={{ color: palette.primaryDark }}>{industry.testimonial.author}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-8 mx-8 rounded-3xl mb-8" style={{ backgroundColor: palette.primary }}>
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-extrabold text-white mb-4">¿Empezamos?</h3>
          <button className="px-10 py-4 font-bold rounded-full bg-white" style={{ color: palette.primaryDark }}>
            Contáctanos
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-8 text-center">
        <p className="text-sm text-gray-400">© 2024 {displayName}</p>
      </footer>
    </div>
  );
}
