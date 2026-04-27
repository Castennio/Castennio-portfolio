import { sql } from './db';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const AUTH_COOKIE_NAME = 'castennio_session';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface DbUser extends User {
  password_hash: string;
}

// ============================================
// PASSWORD HELPERS
// ============================================

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ============================================
// USER OPERATIONS
// ============================================

export async function getUserByEmail(email: string): Promise<DbUser | null> {
  const result = await sql`
    SELECT id, email, password_hash, name, role
    FROM users
    WHERE email = ${email}
  `;
  return result[0] as DbUser | null;
}

export async function getUserById(id: number): Promise<User | null> {
  const result = await sql`
    SELECT id, email, name, role
    FROM users
    WHERE id = ${id}
  `;
  return result[0] as User | null;
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  role: string = 'ADMIN'
): Promise<User> {
  const passwordHash = await hashPassword(password);
  const result = await sql`
    INSERT INTO users (email, password_hash, name, role)
    VALUES (${email}, ${passwordHash}, ${name}, ${role})
    RETURNING id, email, name, role
  `;
  return result[0] as User;
}

// ============================================
// SESSION MANAGEMENT
// ============================================

function encodeSession(userId: number): string {
  const payload = {
    userId,
    exp: Date.now() + SESSION_DURATION,
  };
  // Simple encoding - in production use JWT or encrypted cookies
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

function decodeSession(token: string): { userId: number; exp: number } | null {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    if (payload.exp < Date.now()) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(userId: number): Promise<void> {
  const token = encodeSession(userId);
  const cookieStore = await cookies();

  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const payload = decodeSession(token);
  if (!payload) {
    return null;
  }

  return getUserById(payload.userId);
}

// ============================================
// AUTH OPERATIONS
// ============================================

export async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  const user = await getUserByEmail(email);

  if (!user) {
    return { success: false, error: 'Credenciales inválidas' };
  }

  const isValid = await verifyPassword(password, user.password_hash);

  if (!isValid) {
    return { success: false, error: 'Credenciales inválidas' };
  }

  if (user.role !== 'ADMIN') {
    return { success: false, error: 'No tienes permisos de administrador' };
  }

  await createSession(user.id);
  return { success: true };
}

export async function logout(): Promise<void> {
  await destroySession();
}
