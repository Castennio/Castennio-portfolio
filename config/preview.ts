import type { IndustryConfig, StyleConfig, IndustryId, StyleId } from '@/types/preview';

// ============================================
// INDUSTRY CONFIGURATIONS
// ============================================

export const INDUSTRIES: Record<IndustryId, IndustryConfig> = {
  restaurante: {
    id: 'restaurante',
    name: 'Restaurante',
    icon: 'utensils',
    heroTitle: 'Sabores que conquistan',
    heroSubtitle: 'Disfruta de la mejor gastronomía en {companyName}',
    services: ['Menú del día', 'Reservaciones', 'Delivery', 'Eventos privados'],
    ctaText: 'Reservar mesa',
    stats: [
      { value: '500+', label: 'Platos servidos/mes' },
      { value: '4.9', label: 'Calificación' },
      { value: '15+', label: 'Años de experiencia' },
      { value: '100%', label: 'Ingredientes frescos' },
    ],
    features: ['Chef premiado', 'Ambiente acogedor', 'Carta de vinos', 'Terraza disponible'],
    testimonial: {
      text: 'La mejor experiencia culinaria de la ciudad. Los sabores son increíbles.',
      author: 'María García',
      role: 'Cliente frecuente',
    },
    extraSectionTitle: 'Nuestro Menú',
    extraSectionItems: ['Entradas', 'Platos fuertes', 'Postres', 'Bebidas'],
  },
  clinica: {
    id: 'clinica',
    name: 'Clínica / Salud',
    icon: 'heart-pulse',
    heroTitle: 'Tu salud, nuestra prioridad',
    heroSubtitle: 'Atención médica de calidad en {companyName}',
    services: ['Consultas médicas', 'Exámenes', 'Especialidades', 'Emergencias'],
    ctaText: 'Agendar cita',
    stats: [
      { value: '20+', label: 'Especialistas' },
      { value: '10k+', label: 'Pacientes atendidos' },
      { value: '24/7', label: 'Atención disponible' },
      { value: '98%', label: 'Satisfacción' },
    ],
    features: ['Equipos modernos', 'Doctores certificados', 'Resultados rápidos', 'Seguro aceptado'],
    testimonial: {
      text: 'Atención profesional y humana. Me sentí en las mejores manos.',
      author: 'Carlos Mendoza',
      role: 'Paciente',
    },
    extraSectionTitle: 'Especialidades',
    extraSectionItems: ['Medicina general', 'Pediatría', 'Cardiología', 'Dermatología'],
  },
  abogado: {
    id: 'abogado',
    name: 'Abogado / Legal',
    icon: 'scale',
    heroTitle: 'Defendemos tus derechos',
    heroSubtitle: 'Asesoría legal profesional en {companyName}',
    services: ['Consultoría legal', 'Litigios', 'Contratos', 'Asesoría empresarial'],
    ctaText: 'Consulta gratis',
    stats: [
      { value: '500+', label: 'Casos ganados' },
      { value: '25+', label: 'Años de experiencia' },
      { value: '15', label: 'Abogados expertos' },
      { value: '95%', label: 'Éxito en casos' },
    ],
    features: ['Primera consulta gratis', 'Confidencialidad', 'Experiencia comprobada', 'Tarifas justas'],
    testimonial: {
      text: 'Resolvieron mi caso de manera rápida y profesional. Totalmente recomendados.',
      author: 'Roberto Sánchez',
      role: 'Cliente empresarial',
    },
    extraSectionTitle: 'Áreas de Práctica',
    extraSectionItems: ['Derecho civil', 'Derecho penal', 'Derecho laboral', 'Derecho comercial'],
  },
  'tienda-ropa': {
    id: 'tienda-ropa',
    name: 'Tienda de Ropa',
    icon: 'shirt',
    heroTitle: 'Tu estilo, tu esencia',
    heroSubtitle: 'Descubre las últimas tendencias en {companyName}',
    services: ['Colección mujer', 'Colección hombre', 'Accesorios', 'Temporada'],
    ctaText: 'Ver catálogo',
    stats: [
      { value: '1000+', label: 'Productos' },
      { value: '50+', label: 'Marcas' },
      { value: '4.8', label: 'Calificación' },
      { value: 'Gratis', label: 'Envío +S/100' },
    ],
    features: ['Últimas tendencias', 'Envío express', 'Devolución fácil', 'Ofertas exclusivas'],
    testimonial: {
      text: 'Encontré exactamente lo que buscaba. La calidad es excelente.',
      author: 'Ana Torres',
      role: 'Clienta VIP',
    },
    extraSectionTitle: 'Categorías',
    extraSectionItems: ['Casual', 'Formal', 'Deportivo', 'Accesorios'],
  },
  inmobiliaria: {
    id: 'inmobiliaria',
    name: 'Inmobiliaria',
    icon: 'building',
    heroTitle: 'Encuentra tu hogar ideal',
    heroSubtitle: 'Las mejores propiedades con {companyName}',
    services: ['Venta', 'Alquiler', 'Proyectos nuevos', 'Asesoría'],
    ctaText: 'Ver propiedades',
    stats: [
      { value: '200+', label: 'Propiedades' },
      { value: '15+', label: 'Años en el mercado' },
      { value: '1500+', label: 'Familias felices' },
      { value: '50+', label: 'Zonas cubiertas' },
    ],
    features: ['Visitas virtuales', 'Asesoría financiera', 'Trámites incluidos', 'Garantía legal'],
    testimonial: {
      text: 'Encontramos el departamento perfecto gracias a su asesoría.',
      author: 'Familia Rodríguez',
      role: 'Propietarios',
    },
    extraSectionTitle: 'Tipos de Propiedad',
    extraSectionItems: ['Casas', 'Departamentos', 'Oficinas', 'Terrenos'],
  },
  'venta-autos': {
    id: 'venta-autos',
    name: 'Venta de Autos',
    icon: 'car',
    heroTitle: 'Tu próximo auto te espera',
    heroSubtitle: 'Los mejores vehículos en {companyName}',
    services: ['Autos nuevos', 'Seminuevos', 'Financiamiento', 'Garantía'],
    ctaText: 'Ver inventario',
    stats: [
      { value: '300+', label: 'Vehículos disponibles' },
      { value: '20+', label: 'Marcas' },
      { value: '5000+', label: 'Autos vendidos' },
      { value: '2 años', label: 'Garantía incluida' },
    ],
    features: ['Test drive gratis', 'Financiamiento propio', 'Avalúo de tu auto', 'Entrega inmediata'],
    testimonial: {
      text: 'Proceso transparente y sin sorpresas. Mi auto llegó en perfectas condiciones.',
      author: 'Pedro Castillo',
      role: 'Comprador',
    },
    extraSectionTitle: 'Marcas Disponibles',
    extraSectionItems: ['Toyota', 'Honda', 'Hyundai', 'Kia'],
  },
  gimnasio: {
    id: 'gimnasio',
    name: 'Gimnasio / Fitness',
    icon: 'dumbbell',
    heroTitle: 'Transforma tu cuerpo',
    heroSubtitle: 'Alcanza tus metas fitness en {companyName}',
    services: ['Membresías', 'Clases grupales', 'Entrenadores', 'Nutrición'],
    ctaText: 'Inscríbete hoy',
    stats: [
      { value: '2000+', label: 'Miembros activos' },
      { value: '50+', label: 'Clases semanales' },
      { value: '24/7', label: 'Horario' },
      { value: '15', label: 'Entrenadores' },
    ],
    features: ['Equipos de última generación', 'Clases ilimitadas', 'Duchas y lockers', 'App de seguimiento'],
    testimonial: {
      text: 'En 3 meses logré mis objetivos. El ambiente y los entrenadores son increíbles.',
      author: 'Laura Vega',
      role: 'Miembro desde 2023',
    },
    extraSectionTitle: 'Clases Populares',
    extraSectionItems: ['CrossFit', 'Spinning', 'Yoga', 'Zumba'],
  },
  veterinaria: {
    id: 'veterinaria',
    name: 'Veterinaria',
    icon: 'paw-print',
    heroTitle: 'Cuidamos a tu mejor amigo',
    heroSubtitle: 'Atención veterinaria de confianza en {companyName}',
    services: ['Consultas', 'Vacunación', 'Cirugías', 'Peluquería'],
    ctaText: 'Agendar cita',
    stats: [
      { value: '5000+', label: 'Mascotas atendidas' },
      { value: '10+', label: 'Veterinarios' },
      { value: '24/7', label: 'Emergencias' },
      { value: '15+', label: 'Años de experiencia' },
    ],
    features: ['Emergencias 24/7', 'Laboratorio propio', 'Hospitalización', 'Farmacia veterinaria'],
    testimonial: {
      text: 'Salvaron a mi perrito en una emergencia. Eternamente agradecida.',
      author: 'Sandra López',
      role: 'Dueña de Max',
    },
    extraSectionTitle: 'Servicios para Mascotas',
    extraSectionItems: ['Perros', 'Gatos', 'Aves', 'Animales exóticos'],
  },
  generico: {
    id: 'generico',
    name: 'Otro negocio',
    icon: 'briefcase',
    heroTitle: 'Soluciones a tu medida',
    heroSubtitle: 'Bienvenido a {companyName}',
    services: ['Servicio 1', 'Servicio 2', 'Servicio 3', 'Servicio 4'],
    ctaText: 'Contáctanos',
    stats: [
      { value: '10+', label: 'Años de experiencia' },
      { value: '500+', label: 'Clientes satisfechos' },
      { value: '24/7', label: 'Soporte disponible' },
      { value: '100%', label: 'Compromiso' },
    ],
    features: ['Calidad garantizada', 'Precios competitivos', 'Atención personalizada', 'Resultados comprobados'],
    testimonial: {
      text: 'Excelente servicio y atención. Superaron mis expectativas.',
      author: 'Cliente Satisfecho',
      role: 'Empresario',
    },
    extraSectionTitle: 'Nuestras Soluciones',
    extraSectionItems: ['Consultoría', 'Implementación', 'Soporte', 'Capacitación'],
  },
};

// ============================================
// STYLE CONFIGURATIONS
// ============================================

export const STYLES: Record<StyleId, StyleConfig> = {
  minimalista: {
    id: 'minimalista',
    name: 'Minimalista',
    description: 'Limpio, espacioso, enfocado en el contenido',
    borderRadius: 'none',
    buttonStyle: 'outline',
  },
  corporativo: {
    id: 'corporativo',
    name: 'Corporativo',
    description: 'Profesional, confiable, estructurado',
    borderRadius: 'sm',
    buttonStyle: 'solid',
  },
  creativo: {
    id: 'creativo',
    name: 'Creativo',
    description: 'Atrevido, dinámico, memorable',
    borderRadius: 'full',
    buttonStyle: 'gradient',
  },
  moderno: {
    id: 'moderno',
    name: 'Moderno',
    description: 'Elegante, actual, sofisticado',
    borderRadius: 'lg',
    buttonStyle: 'solid',
  },
};

// ============================================
// LIST EXPORTS
// ============================================

export const INDUSTRY_LIST = Object.values(INDUSTRIES);
export const STYLE_LIST = Object.values(STYLES);
