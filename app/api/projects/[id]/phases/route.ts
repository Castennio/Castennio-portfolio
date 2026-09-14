import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { updatePhases } from '@/lib/projects';

export async function PUT(req: NextRequest) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const { phases } = await req.json();
  if (!Array.isArray(phases)) {
    return NextResponse.json({ error: 'phases debe ser un array' }, { status: 400 });
  }

  await updatePhases(phases);
  return NextResponse.json({ success: true });
}
