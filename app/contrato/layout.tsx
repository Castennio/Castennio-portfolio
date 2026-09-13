import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contrato | CASTENNIO',
  description: 'Generador de contratos de prestación de servicios',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContratoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
