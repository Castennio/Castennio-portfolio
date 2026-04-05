"use client";

import { useRef } from "react";
import MagneticButton from "./MagneticButton";

const navigation = {
  servicios: [
    { name: "Landing Pages", href: "#planes" },
    { name: "Sistemas Web", href: "#planes" },
    { name: "Automatizaciones", href: "#planes" },
    { name: "E-commerce", href: "#planes" },
  ],
  empresa: [
    { name: "Proceso", href: "#proceso" },
    { name: "Planes", href: "#planes" },
    { name: "Nosotros", href: "#" },
  ],
  legal: [
    { name: "Privacidad", href: "#" },
    { name: "Términos", href: "#" },
  ],
};

const socials = [
  {
    name: "WhatsApp",
    href: "https://wa.me/51998162677",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/castennio",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61574318523039",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  return (
    <footer ref={footerRef} className="relative bg-[#030303] overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(59,130,246,0.03)_0%,_transparent_50%)]" />

      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Main footer content */}
      <div className="relative">
        {/* Big CTA Section */}
        <div className="border-b border-white/[0.04]">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
              <div className="max-w-2xl">
                <p className="text-[13px] text-white/30 tracking-widest uppercase mb-6">
                  Empecemos algo juntos
                </p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.1]">
                  <span className="text-white/90">¿Listo para </span>
                  <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                    transformar
                  </span>
                  <br />
                  <span className="text-white/90">tu negocio?</span>
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton
                  as="a"
                  href="https://wa.me/51998162677?text=Hola,%20quiero%20saber%20más%20sobre%20sus%20servicios"
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.3}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-full transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
                >
                  <span>Hablemos</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href="mailto:castennio@gmail.com"
                  strength={0.3}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/10 text-white/60 hover:text-white hover:border-white/20 font-medium rounded-full transition-all duration-500"
                >
                  <span>castennio@gmail.com</span>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <img src="/images/Castennio.png" alt="Castennio" className="w-10 h-10" />
                <span className="text-lg font-medium text-white/90">Castennio</span>
              </div>
              <p className="text-[14px] text-white/40 leading-relaxed mb-8 max-w-[260px]">
                Soluciones digitales que transforman negocios. Desde landing pages hasta sistemas completos.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h3 className="text-[13px] font-medium text-white/60 tracking-wide uppercase mb-6">
                Servicios
              </h3>
              <ul className="space-y-4">
                {navigation.servicios.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-[14px] text-white/40 hover:text-white transition-colors duration-300"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-[13px] font-medium text-white/60 tracking-wide uppercase mb-6">
                Empresa
              </h3>
              <ul className="space-y-4">
                {navigation.empresa.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-[14px] text-white/40 hover:text-white transition-colors duration-300"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-[13px] font-medium text-white/60 tracking-wide uppercase mb-6">
                Contacto
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="https://wa.me/51998162677"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-2"
                  >
                    <span>+51 998 162 677</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:castennio@gmail.com"
                    className="text-[14px] text-white/40 hover:text-white transition-colors duration-300"
                  >
                    castennio@gmail.com
                  </a>
                </li>
                <li>
                  <span className="text-[14px] text-white/40">
                    Lima, Perú
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-[13px] text-white/25 order-2 md:order-1">
                © {currentYear} Castennio. Todos los derechos reservados.
              </p>

              <div className="flex items-center gap-8 order-1 md:order-2">
                {navigation.legal.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-[13px] text-white/25 hover:text-white/50 transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Large background text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none flex justify-center">
        <div className="text-[18vw] font-bold text-white/[0.02] tracking-tighter leading-none translate-y-[35%] whitespace-nowrap">
          CASTENNIO
        </div>
      </div>
    </footer>
  );
}
