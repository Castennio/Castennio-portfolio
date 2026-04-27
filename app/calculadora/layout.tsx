import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculadora | CASTENNIO',
  description: 'Calculadora de cotizaciones CASTENNIO',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CalculadoraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
