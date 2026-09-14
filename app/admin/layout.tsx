import { getSession } from '@/lib/auth';
import AdminShell from './AdminShell';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Admin | CASTENNIO',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSession();

  if (!user) {
    return <LoginForm />;
  }

  return <AdminShell>{children}</AdminShell>;
}
