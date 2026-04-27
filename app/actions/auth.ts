'use server';

import { redirect } from 'next/navigation';
import { login, logout, createUser, getSession } from '@/lib/auth';

export interface AuthFormState {
  error?: string;
  success?: boolean;
}

export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email y contraseña son requeridos' };
  }

  const result = await login(email, password);

  if (!result.success) {
    return { error: result.error };
  }

  redirect('/calculadora');
}

export async function logoutAction(): Promise<void> {
  await logout();
  redirect('/login');
}

export async function registerAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  // Verify current user is admin
  const currentUser = await getSession();
  if (!currentUser || currentUser.role !== 'ADMIN') {
    return { error: 'No autorizado' };
  }

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  if (!email || !password || !name) {
    return { error: 'Todos los campos son requeridos' };
  }

  if (password.length < 6) {
    return { error: 'La contraseña debe tener al menos 6 caracteres' };
  }

  try {
    await createUser(email, password, name);
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('unique')) {
      return { error: 'Este email ya está registrado' };
    }
    return { error: 'Error al crear usuario' };
  }
}
