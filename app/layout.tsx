import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Preloader from "./components/Preloader";
import WhatsAppButton from "./components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background transition-colors duration-300">
        <Preloader />
        <SmoothScroll>{children}</SmoothScroll>
        <WhatsAppButton />
      </body>
    </html>
  );
}
