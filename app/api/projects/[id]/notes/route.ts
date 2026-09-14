import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { addNote } from '@/lib/projects';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const { id } = await params;
  const { content } = await req.json();
  if (!content?.trim()) {
    return NextResponse.json({ error: 'content requerido' }, { status: 400 });
  }

  const note = await addNote(Number(id), content.trim());
  return NextResponse.json(note, { status: 201 });
}
