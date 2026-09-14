import { NextRequest, NextResponse } from 'next/server';
import { getPortalBySlug } from '@/lib/projects';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getPortalBySlug(slug);
  if (!data) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });

  return NextResponse.json(data);
}
