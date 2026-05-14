import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diseña tu Web | Castennio',
  description: 'Visualiza cómo quedaría tu sitio web. Elige industria, estilo y colores.',
  robots: { index: false, follow: false },
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {children}
    </div>
  );
}
