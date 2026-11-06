import Link from "next/link";
import { siteConfig, footerContent } from "@/lib/content/landing";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 md:py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          {/* Brand */}
          <div className="md:max-w-xs">
            <div className="text-lg font-semibold mb-2">{siteConfig.name}</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {footerContent.description}
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12 sm:gap-16">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-3">
                Servicios
              </div>
              <ul className="space-y-2">
                {footerContent.links.servicios.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground hover:text-muted-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-3">
                Empresa
              </div>
              <ul className="space-y-2">
                {footerContent.links.empresa.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground hover:text-muted-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          {footerContent.copyright}
        </div>
      </div>
    </footer>
  );
}
