import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | CASTENNIO',
  description: 'Acceso al panel administrativo',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
