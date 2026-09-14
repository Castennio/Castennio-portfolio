import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/calculadora' || pathname.startsWith('/calculadora/')) {
    return NextResponse.redirect(new URL('/admin/cotizacion', request.url));
  }
  if (pathname === '/contrato' || pathname.startsWith('/contrato/')) {
    return NextResponse.redirect(new URL('/admin/contrato', request.url));
  }
  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/calculadora/:path*', '/contrato/:path*', '/login'],
};
