import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";
import PreviewBubble from "./components/PreviewBubble";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Castennio | Páginas web que venden y sistemas que escalan",
  description:
    "Creamos páginas web que convierten y sistemas que impulsan tu negocio. Desarrollo web premium para startups y negocios en Perú.",
  keywords: [
    "desarrollo web",
    "páginas web",
    "sistemas web",
    "Perú",
    "startups",
    "ecommerce",
    "landing page",
  ],
  openGraph: {
    title: "Castennio | Páginas web que venden",
    description: "Desde páginas web que convierten hasta sistemas que impulsan tu negocio",
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
      className={`${fraunces.variable} ${dmSans.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background transition-colors duration-300">
        {children}
        <WhatsAppButton />
        <PreviewBubble />
      </body>
    </html>
  );
}
