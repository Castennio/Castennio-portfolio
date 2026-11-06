import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Castennio | Plataformas web administrables para tu negocio",
  description:
    "Desarrollamos plataformas web donde gestionas tus productos, categorías e imágenes y compartes catálogos profesionales con tus clientes.",
  keywords: [
    "plataforma web administrable",
    "catálogo digital",
    "gestión de productos",
    "CMS para pymes",
    "desarrollo web Perú",
  ],
  openGraph: {
    title: "Castennio | Plataformas web administrables para tu negocio",
    description:
      "Gestiona tus productos y comparte catálogos profesionales. Sin depender de un desarrollador.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
