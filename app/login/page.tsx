'use client';

import { useActionState } from 'react';
import { loginAction, type AuthFormState } from '@/app/actions/auth';

const initialState: AuthFormState = {};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#7C3AED]/10 flex items-center justify-center">
            <svg
              className="w-7 h-7 text-[#7C3AED]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-white/90 mb-2">
            CASTENNIO
          </h1>
          <p className="text-sm text-white/40">
            Panel administrativo
          </p>
        </div>

        {/* Login Form */}
        <form action={formAction} className="space-y-5">
          {/* Error message */}
          {state.error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400 text-center">{state.error}</p>
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-white/60 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              className="w-full px-4 py-3 rounded-xl bg-[#0f1015] border border-white/[0.06] text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]/50 focus:ring-1 focus:ring-[#7C3AED]/50 transition-colors"
              placeholder="tu@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm text-white/60 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-xl bg-[#0f1015] border border-white/[0.06] text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]/50 focus:ring-1 focus:ring-[#7C3AED]/50 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm transition-colors flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Ingresando...
              </>
            ) : (
              'Ingresar'
            )}
          </button>
        </form>

        {/* Back link */}
        <p className="text-center mt-8">
          <a
            href="/"
            className="text-sm text-white/40 hover:text-white/60 transition-colors"
          >
            Volver al sitio
          </a>
        </p>
      </div>
    </div>
  );
}
