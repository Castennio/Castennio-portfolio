import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getProject, updateProject } from '@/lib/projects';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const { id } = await params;
  const project = await getProject(Number(id));
  if (!project) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });

  return NextResponse.json(project);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  await updateProject(Number(id), body);
  return NextResponse.json({ success: true });
}
