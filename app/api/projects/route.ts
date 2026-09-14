import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { createProject, listProjects } from '@/lib/projects';

export async function POST(req: NextRequest) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const body = await req.json();
  if (!body.clienteEmpresa) {
    return NextResponse.json({ error: 'clienteEmpresa requerido' }, { status: 400 });
  }

  const result = await createProject(body);
  return NextResponse.json(result, { status: 201 });
}

export async function GET() {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const projects = await listProjects();
  return NextResponse.json(projects);
}
