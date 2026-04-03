"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 bg-[#030303] border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center">
              <span className="text-black font-semibold text-xs">C</span>
            </div>
            <span className="text-[15px] text-white/60">Castennio</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-[13px] text-white/30">
            <a href="#proyectos" className="hover:text-white/60 transition-colors duration-300">
              Proyectos
            </a>
            <a href="#proceso" className="hover:text-white/60 transition-colors duration-300">
              Proceso
            </a>
            <a href="#planes" className="hover:text-white/60 transition-colors duration-300">
              Planes
            </a>
          </div>

          {/* Contact */}
          <a
            href="https://wa.me/51999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-white/30 hover:text-white/60 transition-colors duration-300"
          >
            WhatsApp →
          </a>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-white/20">
          <p>© {currentYear} Castennio. Todos los derechos reservados.</p>
          <p>Lima, Perú</p>
        </div>
      </div>
    </footer>
  );
}
