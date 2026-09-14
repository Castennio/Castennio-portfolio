import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const numero = req.nextUrl.searchParams.get('numero');
  if (!numero || !/^\d{11}$/.test(numero)) {
    return NextResponse.json({ error: 'RUC inválido' }, { status: 400 });
  }

  const res = await fetch(`https://api.apis.net.pe/v1/ruc?numero=${numero}`);
  if (!res.ok) {
    return NextResponse.json({ error: 'No encontrado' }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
