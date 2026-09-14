# Admin Panel Restructure + Client Portal — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Unify the admin area under `/admin` with a sidebar (Cotización, Contrato, Portal), add DB persistence for contracts, and auto-generate a client-facing portal at `/portal/[slug]`.

**Architecture:** All admin pages share a layout at `app/admin/layout.tsx` that renders either a login form (if unauthenticated) or a sidebar + children (if authenticated). Contract data is persisted to Neon PostgreSQL via raw SQL. A public portal page reads project data by secret slug.

**Tech Stack:** Next.js (App Router), `@neondatabase/serverless` (raw SQL), `@react-pdf/renderer`, Tailwind CSS, `crypto.randomUUID` for slug generation.

**Spec:** `docs/superpowers/specs/2026-09-13-admin-portal-design.md`

## Global Constraints

- Next.js App Router — check `node_modules/next/dist/docs/` for deprecation notices before writing any code
- Database: `@neondatabase/serverless` with tagged template SQL — no ORM
- Auth: cookie-based session via `lib/auth.ts` → `getSession()`
- UI: dark theme (`#0a0a0f` background), Tailwind CSS, cyan accents for active state
- Existing `ContractData` interface at `app/components/admin/contract/ContractPDF.tsx:200-214` must not break

## File Structure

```
scripts/
  migrate-portal.ts                     # CREATE TABLE IF NOT EXISTS (3 tables)
lib/
  db.ts                                 # Existing — unchanged
  auth.ts                               # Existing — unchanged
  projects.ts                           # NEW — DB queries for projects/phases/notes
app/
  admin/
    layout.tsx                          # NEW — auth gate + sidebar
    page.tsx                            # NEW — redirect to /admin/cotizacion
    cotizacion/
      page.tsx                          # MOVED from app/calculadora/page.tsx (remove header/guard)
    contrato/
      page.tsx                          # MOVED from app/contrato/page.tsx (remove header/guard, add save flow)
    portal/
      page.tsx                          # NEW — project list
      [projectId]/
        page.tsx                        # NEW — manage phases/notes
  api/
    projects/
      route.ts                          # NEW — POST (create) + GET (list)
      [id]/
        route.ts                        # NEW — GET (detail) + PUT (update)
        phases/
          route.ts                      # NEW — PUT (batch update statuses)
        notes/
          route.ts                      # NEW — POST (add note)
    portal/
      [slug]/
        route.ts                        # NEW — GET (public portal data)
  portal/
    [slug]/
      page.tsx                          # NEW — client-facing portal view
  middleware.ts                         # MODIFY — protect /admin, redirect old routes
  actions/
    auth.ts                             # MODIFY — redirect target after login
```

---

### Task 1: Database Migration Script

**Files:**
- Create: `scripts/migrate-portal.ts`

**Interfaces:**
- Consumes: `DATABASE_URL` env var, `@neondatabase/serverless`
- Produces: Three tables (`projects`, `project_phases`, `project_notes`) in the Neon database

- [ ] **Step 1: Write the migration script**

```ts
// scripts/migrate-portal.ts
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL no está definida en .env');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function migrate() {
  console.log('Creando tablas del portal...\n');

  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(20) UNIQUE NOT NULL,
      cliente_empresa VARCHAR(255) NOT NULL,
      cliente_ruc VARCHAR(11),
      cliente_representante VARCHAR(255),
      cliente_direccion VARCHAR(500),
      dev_empresa VARCHAR(255) DEFAULT 'CASTENNIO',
      dev_ruc VARCHAR(11),
      dev_representante VARCHAR(255),
      dev_direccion VARCHAR(500),
      descripcion TEXT,
      precio DECIMAL(10,2),
      moneda VARCHAR(3) DEFAULT 'PEN',
      duracion VARCHAR(100),
      fecha_inicio DATE,
      fecha_entrega DATE,
      forma_pago VARCHAR(255),
      next_delivery_date DATE,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    )
  `;
  console.log('✅ projects');

  await sql`
    CREATE TABLE IF NOT EXISTS project_phases (
      id SERIAL PRIMARY KEY,
      project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      name VARCHAR(100) NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'pending',
      order_num INT NOT NULL,
      CONSTRAINT valid_status CHECK (status IN ('pending', 'in_progress', 'completed'))
    )
  `;
  console.log('✅ project_phases');

  await sql`
    CREATE TABLE IF NOT EXISTS project_notes (
      id SERIAL PRIMARY KEY,
      project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    )
  `;
  console.log('✅ project_notes');

  console.log('\n✅ Migración completa');
}

migrate().catch((e) => {
  console.error('Error:', e);
  process.exit(1);
});
```

- [ ] **Step 2: Run migration**

```bash
npx tsx scripts/migrate-portal.ts
```

Expected: Three tables created, three "✅" messages printed.

- [ ] **Step 3: Commit**

```bash
git add scripts/migrate-portal.ts
git commit -m "feat: add portal database migration script"
```

---

### Task 2: Project DB Queries Library

**Files:**
- Create: `lib/projects.ts`

**Interfaces:**
- Consumes: `sql` from `lib/db.ts`
- Produces: Functions used by API routes:
  - `createProject(data: CreateProjectInput): Promise<{ id: number; slug: string }>`
  - `listProjects(): Promise<ProjectSummary[]>`
  - `getProject(id: number): Promise<ProjectDetail | null>`
  - `updateProject(id: number, data: Partial<UpdateProjectInput>): Promise<void>`
  - `updatePhases(phases: { id: number; status: string }[]): Promise<void>`
  - `addNote(projectId: number, content: string): Promise<{ id: number; createdAt: string }>`
  - `getPortalBySlug(slug: string): Promise<PortalData | null>`

- [ ] **Step 1: Write the queries library**

```ts
// lib/projects.ts
import { sql } from './db';
import crypto from 'crypto';

function generateSlug(): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 10);
}

const DEFAULT_PHASES = [
  'Diseño',
  'Desarrollo Frontend',
  'Desarrollo Backend',
  'Testing',
  'Entrega',
];

export interface CreateProjectInput {
  clienteEmpresa: string;
  clienteRuc?: string;
  clienteRepresentante?: string;
  clienteDireccion?: string;
  devEmpresa?: string;
  devRuc?: string;
  devRepresentante?: string;
  devDireccion?: string;
  descripcion?: string;
  precio?: number;
  moneda?: string;
  duracion?: string;
  fechaInicio?: string;
  fechaEntrega?: string;
  formaPago?: string;
}

export interface ProjectSummary {
  id: number;
  slug: string;
  clienteEmpresa: string;
  createdAt: string;
  phasesTotal: number;
  phasesCompleted: number;
}

export interface ProjectDetail {
  id: number;
  slug: string;
  clienteEmpresa: string;
  clienteRuc: string | null;
  clienteRepresentante: string | null;
  nextDeliveryDate: string | null;
  createdAt: string;
  phases: { id: number; name: string; status: string; orderNum: number }[];
  notes: { id: number; content: string; createdAt: string }[];
}

export interface PortalData {
  projectName: string;
  phases: { name: string; status: string; order: number }[];
  notes: { content: string; createdAt: string }[];
  nextDeliveryDate: string | null;
}

export async function createProject(data: CreateProjectInput): Promise<{ id: number; slug: string }> {
  const slug = generateSlug();

  const result = await sql`
    INSERT INTO projects (
      slug, cliente_empresa, cliente_ruc, cliente_representante, cliente_direccion,
      dev_empresa, dev_ruc, dev_representante, dev_direccion,
      descripcion, precio, moneda, duracion, fecha_inicio, fecha_entrega, forma_pago
    ) VALUES (
      ${slug}, ${data.clienteEmpresa}, ${data.clienteRuc ?? null},
      ${data.clienteRepresentante ?? null}, ${data.clienteDireccion ?? null},
      ${data.devEmpresa ?? 'CASTENNIO'}, ${data.devRuc ?? null},
      ${data.devRepresentante ?? null}, ${data.devDireccion ?? null},
      ${data.descripcion ?? null}, ${data.precio ?? null}, ${data.moneda ?? 'PEN'},
      ${data.duracion ?? null}, ${data.fechaInicio ?? null},
      ${data.fechaEntrega ?? null}, ${data.formaPago ?? null}
    ) RETURNING id
  `;

  const projectId = result[0].id;

  for (let i = 0; i < DEFAULT_PHASES.length; i++) {
    await sql`
      INSERT INTO project_phases (project_id, name, order_num)
      VALUES (${projectId}, ${DEFAULT_PHASES[i]}, ${i + 1})
    `;
  }

  return { id: projectId, slug };
}

export async function listProjects(): Promise<ProjectSummary[]> {
  const rows = await sql`
    SELECT
      p.id, p.slug, p.cliente_empresa, p.created_at,
      COUNT(ph.id)::int AS phases_total,
      COUNT(ph.id) FILTER (WHERE ph.status = 'completed')::int AS phases_completed
    FROM projects p
    LEFT JOIN project_phases ph ON ph.project_id = p.id
    GROUP BY p.id
    ORDER BY p.created_at DESC
  `;
  return rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    clienteEmpresa: r.cliente_empresa,
    createdAt: r.created_at,
    phasesTotal: r.phases_total,
    phasesCompleted: r.phases_completed,
  }));
}

export async function getProject(id: number): Promise<ProjectDetail | null> {
  const projects = await sql`
    SELECT id, slug, cliente_empresa, cliente_ruc, cliente_representante,
           next_delivery_date, created_at
    FROM projects WHERE id = ${id}
  `;
  if (!projects.length) return null;
  const p = projects[0];

  const phases = await sql`
    SELECT id, name, status, order_num
    FROM project_phases WHERE project_id = ${id}
    ORDER BY order_num
  `;

  const notes = await sql`
    SELECT id, content, created_at
    FROM project_notes WHERE project_id = ${id}
    ORDER BY created_at DESC
  `;

  return {
    id: p.id,
    slug: p.slug,
    clienteEmpresa: p.cliente_empresa,
    clienteRuc: p.cliente_ruc,
    clienteRepresentante: p.cliente_representante,
    nextDeliveryDate: p.next_delivery_date,
    createdAt: p.created_at,
    phases: phases.map((ph) => ({
      id: ph.id, name: ph.name, status: ph.status, orderNum: ph.order_num,
    })),
    notes: notes.map((n) => ({
      id: n.id, content: n.content, createdAt: n.created_at,
    })),
  };
}

export async function updateProject(id: number, data: { nextDeliveryDate?: string | null }): Promise<void> {
  if (data.nextDeliveryDate !== undefined) {
    await sql`
      UPDATE projects
      SET next_delivery_date = ${data.nextDeliveryDate}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `;
  }
}

export async function updatePhases(phases: { id: number; status: string }[]): Promise<void> {
  for (const phase of phases) {
    await sql`
      UPDATE project_phases SET status = ${phase.status} WHERE id = ${phase.id}
    `;
  }
}

export async function addNote(projectId: number, content: string): Promise<{ id: number; createdAt: string }> {
  const result = await sql`
    INSERT INTO project_notes (project_id, content)
    VALUES (${projectId}, ${content})
    RETURNING id, created_at
  `;
  return { id: result[0].id, createdAt: result[0].created_at };
}

export async function getPortalBySlug(slug: string): Promise<PortalData | null> {
  const projects = await sql`
    SELECT id, cliente_empresa, next_delivery_date
    FROM projects WHERE slug = ${slug}
  `;
  if (!projects.length) return null;
  const p = projects[0];

  const phases = await sql`
    SELECT name, status, order_num
    FROM project_phases WHERE project_id = ${p.id}
    ORDER BY order_num
  `;

  const notes = await sql`
    SELECT content, created_at
    FROM project_notes WHERE project_id = ${p.id}
    ORDER BY created_at DESC
  `;

  return {
    projectName: p.cliente_empresa,
    phases: phases.map((ph) => ({ name: ph.name, status: ph.status, order: ph.order_num })),
    notes: notes.map((n) => ({ content: n.content, createdAt: n.created_at })),
    nextDeliveryDate: p.next_delivery_date,
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/projects.ts
git commit -m "feat: add project DB queries library"
```

---

### Task 3: API Routes

**Files:**
- Create: `app/api/projects/route.ts`
- Create: `app/api/projects/[id]/route.ts`
- Create: `app/api/projects/[id]/phases/route.ts`
- Create: `app/api/projects/[id]/notes/route.ts`
- Create: `app/api/portal/[slug]/route.ts`

**Interfaces:**
- Consumes: `lib/projects.ts` (all exported functions), `lib/auth.ts` → `getSession()`
- Produces: REST endpoints per the spec's API table

- [ ] **Step 1: Create `app/api/projects/route.ts`**

```ts
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
```

- [ ] **Step 2: Create `app/api/projects/[id]/route.ts`**

```ts
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
```

- [ ] **Step 3: Create `app/api/projects/[id]/phases/route.ts`**

```ts
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
```

- [ ] **Step 4: Create `app/api/projects/[id]/notes/route.ts`**

```ts
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
```

- [ ] **Step 5: Create `app/api/portal/[slug]/route.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server';
import { getPortalBySlug } from '@/lib/projects';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getPortalBySlug(slug);
  if (!data) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });

  return NextResponse.json(data);
}
```

- [ ] **Step 6: Commit**

```bash
git add app/api/projects app/api/portal
git commit -m "feat: add project and portal API routes"
```

---

### Task 4: Admin Layout with Auth Gate + Sidebar

**Files:**
- Create: `app/admin/layout.tsx`
- Create: `app/admin/page.tsx`
- Modify: `app/middleware.ts` — update protected routes, add redirects for old URLs
- Modify: `app/actions/auth.ts:28` — change redirect target from `/calculadora` to `/admin/cotizacion`

**Interfaces:**
- Consumes: `lib/auth.ts` → `getSession()`, `app/actions/auth.ts` → `loginAction`, `logoutAction`
- Produces: Shared admin layout used by all `/admin/*` pages; children receive no props — they're standalone pages

- [ ] **Step 1: Create `app/admin/layout.tsx`**

This layout checks auth server-side. If not authenticated, it renders the login form. If authenticated, it renders the sidebar + children.

```tsx
// app/admin/layout.tsx
import { getSession } from '@/lib/auth';
import AdminShell from './AdminShell';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Admin | CASTENNIO',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSession();

  if (!user) {
    return <LoginForm />;
  }

  return <AdminShell>{children}</AdminShell>;
}
```

- [ ] **Step 2: Create `app/admin/LoginForm.tsx`**

Extract the existing login form from `app/login/page.tsx` into a client component. Same UI, same `loginAction`, but the form action redirect target changes to `/admin/cotizacion`.

```tsx
// app/admin/LoginForm.tsx
'use client';

import { useState, useActionState } from 'react';
import { loginAction, type AuthFormState } from '@/app/actions/auth';

const initialState: AuthFormState = {};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
            <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-white/90 mb-2">CASTENNIO</h1>
          <p className="text-sm text-white/40">Panel administrativo</p>
        </div>

        <form action={formAction} className="space-y-5">
          {state.error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400 text-center">{state.error}</p>
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm text-white/60 mb-2">Email</label>
            <input type="email" id="email" name="email" required autoComplete="email"
              className="w-full px-4 py-3 rounded-xl bg-[#0f1015] border border-white/[0.06] text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
              placeholder="tu@email.com" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-white/60 mb-2">Contraseña</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} id="password" name="password" required autoComplete="current-password"
                className="w-full px-4 py-3 pr-12 rounded-xl bg-[#0f1015] border border-white/[0.06] text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white/70 transition-colors cursor-pointer">
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button type="submit" disabled={isPending}
            className="w-full py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer">
            {isPending ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Ingresando...</>
            ) : 'Ingresar'}
          </button>
        </form>
        <p className="text-center mt-8">
          <a href="/" className="text-sm text-white/40 hover:text-white/60 transition-colors">Volver al sitio</a>
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `app/admin/AdminShell.tsx`**

Client component with the sidebar and main content area.

```tsx
// app/admin/AdminShell.tsx
'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { logoutAction } from '@/app/actions/auth';

const NAV_ITEMS = [
  {
    label: 'Cotización',
    href: '/admin/cotizacion',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008H15.75v-.008zm0 2.25h.008v.008H15.75V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
      </svg>
    ),
  },
  {
    label: 'Contrato',
    href: '/admin/contrato',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    label: 'Portal',
    href: '/admin/portal',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0a0a0f] border-r border-white/[0.06] flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/[0.06]">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <span className="text-cyan-400 font-bold text-sm">C</span>
            </div>
            <div>
              <p className="text-white/90 font-semibold text-sm tracking-wide">CASTENNIO</p>
              <p className="text-white/30 text-[11px]">Panel admin</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-all ${
                  active
                    ? 'bg-cyan-500/10 text-cyan-400'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'
                }`}>
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/[0.06]">
          <form action={logoutAction}>
            <button type="submit"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] text-white/40 hover:text-white/70 hover:bg-white/[0.03] transition-all cursor-pointer">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3">
          <button onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/[0.04] transition-colors cursor-pointer">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create `app/admin/page.tsx`**

```tsx
// app/admin/page.tsx
import { redirect } from 'next/navigation';

export default function AdminPage() {
  redirect('/admin/cotizacion');
}
```

- [ ] **Step 5: Update `middleware.ts`**

Replace the entire file. Protect `/admin/*`, redirect old routes.

```ts
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'castennio_session';

function isSessionValid(token: string): boolean {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect old routes
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
  matcher: ['/admin/:path*', '/calculadora/:path*', '/contrato/:path*', '/login'],
};
```

Note: Auth is handled server-side in `app/admin/layout.tsx` via `getSession()`, not in middleware. The middleware just handles old-route redirects.

- [ ] **Step 6: Update `app/actions/auth.ts` — change redirect target**

Change line 28 from `redirect('/calculadora')` to `redirect('/admin/cotizacion')`, and line 33 from `redirect('/login')` to `redirect('/admin')`.

- [ ] **Step 7: Commit**

```bash
git add app/admin app/actions/auth.ts middleware.ts
git commit -m "feat: add admin layout with sidebar and auth gate"
```

---

### Task 5: Move Cotización Page

**Files:**
- Create: `app/admin/cotizacion/page.tsx` — content from `app/calculadora/page.tsx` with header and AdminGuard removed
- Keep: `app/calculadora/` — leave the old files; middleware redirects handle it (delete later)

**Interfaces:**
- Consumes: Same components as current calculadora page (`PlanSelector`, `ClientTypeSelector`, etc.)
- Produces: `/admin/cotizacion` page that renders inside the admin sidebar layout

- [ ] **Step 1: Create `app/admin/cotizacion/page.tsx`**

Copy the content of `CalculatorContent()` from `app/calculadora/page.tsx` but:
- Remove the `<AdminGuard>` wrapper (layout handles auth)
- Remove the `<header>` block (sidebar handles navigation)
- Remove the logout button (sidebar handles it)
- Keep the `<main>` content as the page body

```tsx
// app/admin/cotizacion/page.tsx
'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  PlanSelector,
  ClientTypeSelector,
  UrgencySelector,
  AddonsSelector,
  QuoteSummary,
} from '@/app/components/admin/calculator';
import { calculateQuote, isQuoteComplete } from '@/lib/pricing';
import type {
  PlanId,
  ClientType,
  UrgencyLevel,
  AddonId,
  QuoteCalculation,
  QuoteFormState,
} from '@/types/pricing';

export default function CotizacionPage() {
  const [formState, setFormState] = useState<QuoteFormState>({
    selectedPlan: null,
    selectedClientType: null,
    selectedUrgency: null,
    selectedAddons: [],
  });

  const [quote, setQuote] = useState<QuoteCalculation | null>(null);
  const [clientName, setClientName] = useState('');

  useEffect(() => {
    if (formState.selectedPlan && formState.selectedClientType && formState.selectedUrgency) {
      setQuote(calculateQuote(
        formState.selectedPlan,
        formState.selectedClientType,
        formState.selectedUrgency,
        formState.selectedAddons
      ));
    } else {
      setQuote(null);
    }
  }, [formState.selectedPlan, formState.selectedClientType, formState.selectedUrgency, formState.selectedAddons]);

  const handlePlanSelect = useCallback((planId: PlanId) => {
    setFormState((prev) => ({ ...prev, selectedPlan: planId }));
  }, []);

  const handleClientTypeSelect = useCallback((clientType: ClientType) => {
    setFormState((prev) => ({ ...prev, selectedClientType: clientType }));
  }, []);

  const handleUrgencySelect = useCallback((urgency: UrgencyLevel) => {
    setFormState((prev) => ({ ...prev, selectedUrgency: urgency }));
  }, []);

  const handleAddonToggle = useCallback((addonId: AddonId) => {
    setFormState((prev) => {
      const newAddons = prev.selectedAddons.includes(addonId)
        ? prev.selectedAddons.filter((id) => id !== addonId)
        : [...prev.selectedAddons, addonId];
      return { ...prev, selectedAddons: newAddons };
    });
  }, []);

  const handleReset = useCallback(() => {
    setFormState({
      selectedPlan: null,
      selectedClientType: null,
      selectedUrgency: null,
      selectedAddons: [],
    });
    setClientName('');
  }, []);

  const isComplete = isQuoteComplete(
    formState.selectedPlan,
    formState.selectedClientType,
    formState.selectedUrgency
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white/90">Calculadora de Cotizaciones</h1>
        <p className="text-[13px] text-white/40 mt-1">Genera cotizaciones para tus clientes</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6">
            <PlanSelector selected={formState.selectedPlan} onSelect={handlePlanSelect} />
          </section>
          <section className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6">
            <ClientTypeSelector selected={formState.selectedClientType} onSelect={handleClientTypeSelect} disabled={!formState.selectedPlan} />
          </section>
          <section className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6">
            <UrgencySelector selected={formState.selectedUrgency} onSelect={handleUrgencySelect} selectedPlan={formState.selectedPlan} disabled={!formState.selectedClientType} />
          </section>
          <section className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6">
            <AddonsSelector selected={formState.selectedAddons} onToggle={handleAddonToggle} disabled={!formState.selectedUrgency} selectedPlan={formState.selectedPlan} />
          </section>
        </div>
        <div className="lg:col-span-1">
          <QuoteSummary quote={quote} onReset={handleReset} isComplete={isComplete} clientName={clientName} onClientNameChange={setClientName} />
        </div>
      </div>
      <p className="text-center text-white/30 text-[12px] mt-12">
        Herramienta interna de cotización. Los precios son estimados y pueden variar según el alcance final del proyecto.
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Verify it loads at `/admin/cotizacion`**

```bash
npm run dev
# Navigate to /admin → login → should redirect to /admin/cotizacion with sidebar
# Navigate to /calculadora → should redirect to /admin/cotizacion
```

- [ ] **Step 3: Commit**

```bash
git add app/admin/cotizacion
git commit -m "feat: move cotización page into admin layout"
```

---

### Task 6: Move Contrato Page + Add Save Flow

**Files:**
- Create: `app/admin/contrato/page.tsx` — content from `app/contrato/page.tsx` with header/guard removed, save flow added

**Interfaces:**
- Consumes: `POST /api/projects`, `ContractPDF`, `WelcomePackPDF`, existing form state
- Produces: `/admin/contrato` page with "Guardar" button → creates project → shows portal link → enables downloads

- [ ] **Step 1: Create `app/admin/contrato/page.tsx`**

Copy the content of `ContratoContent()` from `app/contrato/page.tsx` but:
- Remove `<AdminGuard>` wrapper and `<header>` block
- Add save state: `savedProject: { id: number; slug: string } | null`
- Add `saving` boolean state
- Add `handleSave()` that POSTs to `/api/projects`
- Replace the manual `portalUrl` input with auto-generated portal link display after save
- Disable download/email buttons until `savedProject` is set
- Show portal link with copy button after save

The key changes to the existing `ContratoContent()`:

1. Add state at the top:
```tsx
const [savedProject, setSavedProject] = useState<{ id: number; slug: string } | null>(null);
const [saving, setSaving] = useState(false);
```

2. Add save handler:
```tsx
const handleSave = async () => {
  if (!canGenerate) return;
  setSaving(true);
  try {
    const data = buildData();
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clienteEmpresa: data.clienteEmpresa,
        clienteRuc: data.clienteRuc,
        clienteRepresentante: data.clienteRepresentante,
        devEmpresa: 'CASTENNIO',
        devRuc: data.desarrolladorRuc,
        devRepresentante: data.desarrolladorNombre,
        descripcion: data.descripcion,
        precio: data.precioSinIgv,
        moneda: 'PEN',
        fechaInicio: form.fechaInicio,
        fechaEntrega: form.fechaEntrega,
        formaPago: data.formaPago,
      }),
    });
    if (res.ok) {
      const result = await res.json();
      setSavedProject(result);
      const portalLink = `${window.location.origin}/portal/${result.slug}`;
      update('portalUrl', portalLink);
    }
  } finally {
    setSaving(false);
  }
};
```

3. Replace the `portalUrl` manual input field with a display after save:
```tsx
{/* Portal URL — auto-generated after save */}
<div>
  <FieldLabel>Portal del proyecto</FieldLabel>
  {savedProject ? (
    <div className="flex gap-2">
      <input className={`${inputClass} text-cyan-400`} readOnly
        value={`${window.location.origin}/portal/${savedProject.slug}`} />
      <button onClick={() => navigator.clipboard.writeText(`${window.location.origin}/portal/${savedProject.slug}`)}
        className="px-4 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors cursor-pointer text-[13px] whitespace-nowrap">
        Copiar
      </button>
    </div>
  ) : (
    <p className="text-[13px] text-white/30 py-2.5">Se genera automáticamente al guardar</p>
  )}
</div>
```

4. Add "Guardar" button before the download buttons in the sidebar:
```tsx
{/* Save button */}
<button onClick={handleSave}
  disabled={!canGenerate || saving || !!savedProject}
  className={`w-full py-3.5 rounded-xl text-[14px] font-semibold transition-all cursor-pointer ${
    canGenerate && !saving && !savedProject
      ? 'bg-cyan-600 text-white hover:bg-cyan-700 active:scale-[0.98]'
      : 'bg-white/[0.04] text-white/20 cursor-not-allowed'
  }`}>
  {saving ? 'Guardando...' : savedProject ? '✓ Guardado' : 'Guardar proyecto'}
</button>
```

5. Disable download/email buttons when `!savedProject`:
```tsx
disabled={!canGenerate || !!generating || !savedProject}
```

Write the full page file as a copy of `app/contrato/page.tsx`'s `ContratoContent` with these five modifications applied. Remove the `AdminGuard` wrapper, the `<header>`, and the import of `logoutAction` and `AdminGuard`.

- [ ] **Step 2: Verify save flow**

```bash
npm run dev
# Go to /admin/contrato
# Fill all fields → "Guardar proyecto" button activates
# Click save → portal link appears, download buttons activate
# Copy the portal link
```

- [ ] **Step 3: Commit**

```bash
git add app/admin/contrato
git commit -m "feat: move contrato page into admin layout with save flow"
```

---

### Task 7: Admin Portal — Project List + Detail

**Files:**
- Create: `app/admin/portal/page.tsx`
- Create: `app/admin/portal/[projectId]/page.tsx`

**Interfaces:**
- Consumes: `GET /api/projects`, `GET /api/projects/[id]`, `PUT /api/projects/[id]`, `PUT /api/projects/[id]/phases`, `POST /api/projects/[id]/notes`
- Produces: Admin portal management pages

- [ ] **Step 1: Create `app/admin/portal/page.tsx` — project list**

```tsx
// app/admin/portal/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ProjectSummary {
  id: number;
  slug: string;
  clienteEmpresa: string;
  createdAt: string;
  phasesTotal: number;
  phasesCompleted: number;
}

export default function PortalListPage() {
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white/90">Portal de Proyectos</h1>
        <p className="text-[13px] text-white/40 mt-1">Gestiona el progreso de tus proyectos</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-white/40 text-[15px]">No hay proyectos guardados</p>
          <p className="text-white/25 text-[13px] mt-2">Guarda un contrato para crear un proyecto</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((p) => {
            const pct = p.phasesTotal > 0 ? Math.round((p.phasesCompleted / p.phasesTotal) * 100) : 0;
            return (
              <Link key={p.id} href={`/admin/portal/${p.id}`}
                className="block bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6 hover:border-cyan-500/20 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[15px] font-semibold text-white/90">{p.clienteEmpresa}</h3>
                  <span className="text-[12px] text-white/30">
                    {new Date(p.createdAt).toLocaleDateString('es-PE')}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-[13px] text-white/50 tabular-nums">{pct}%</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create `app/admin/portal/[projectId]/page.tsx` — project detail**

```tsx
// app/admin/portal/[projectId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Phase {
  id: number;
  name: string;
  status: string;
  orderNum: number;
}

interface Note {
  id: number;
  content: string;
  createdAt: string;
}

interface ProjectDetail {
  id: number;
  slug: string;
  clienteEmpresa: string;
  nextDeliveryDate: string | null;
  phases: Phase[];
  notes: Note[];
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pendiente',
  in_progress: 'En progreso',
  completed: 'Completado',
};

export default function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [noteInput, setNoteInput] = useState('');
  const [addingNote, setAddingNote] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchProject = () => {
    fetch(`/api/projects/${projectId}`)
      .then((r) => r.json())
      .then(setProject)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProject(); }, [projectId]);

  const handlePhaseChange = async (phaseId: number, status: string) => {
    await fetch(`/api/projects/${projectId}/phases`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phases: [{ id: phaseId, status }] }),
    });
    setProject((prev) =>
      prev ? { ...prev, phases: prev.phases.map((p) => p.id === phaseId ? { ...p, status } : p) } : prev
    );
  };

  const handleDeliveryDate = async (date: string) => {
    await fetch(`/api/projects/${projectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nextDeliveryDate: date || null }),
    });
    setProject((prev) => prev ? { ...prev, nextDeliveryDate: date || null } : prev);
  };

  const handleAddNote = async () => {
    if (!noteInput.trim()) return;
    setAddingNote(true);
    const res = await fetch(`/api/projects/${projectId}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: noteInput.trim() }),
    });
    if (res.ok) {
      const note = await res.json();
      setProject((prev) =>
        prev ? { ...prev, notes: [{ id: note.id, content: noteInput.trim(), createdAt: note.createdAt }, ...prev.notes] } : prev
      );
      setNoteInput('');
    }
    setAddingNote(false);
  };

  const copyLink = () => {
    if (!project) return;
    navigator.clipboard.writeText(`${window.location.origin}/portal/${project.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return <div className="text-center py-20 text-white/40">Proyecto no encontrado</div>;
  }

  const inputClass = 'w-full bg-white/[0.04] border border-white/[0.10] rounded-lg px-4 py-2.5 text-white/90 text-[14px] placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all';

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-white/90">{project.clienteEmpresa}</h1>
          <p className="text-[13px] text-white/40 mt-1">Portal del proyecto</p>
        </div>
        <button onClick={copyLink}
          className="px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors cursor-pointer text-[13px]">
          {copied ? '✓ Copiado' : 'Copiar link del portal'}
        </button>
      </div>

      {/* Phases */}
      <section className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6 mb-6">
        <h2 className="text-[15px] font-semibold text-white/80 mb-5">Fases del proyecto</h2>
        <div className="space-y-3">
          {project.phases.map((phase) => (
            <div key={phase.id} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  phase.status === 'completed' ? 'bg-emerald-400' :
                  phase.status === 'in_progress' ? 'bg-cyan-400 animate-pulse' : 'bg-white/20'
                }`} />
                <span className="text-[14px] text-white/70">{phase.name}</span>
              </div>
              <select value={phase.status} onChange={(e) => handlePhaseChange(phase.id, e.target.value)}
                className="bg-white/[0.04] border border-white/[0.10] rounded-lg px-3 py-1.5 text-[13px] text-white/70 focus:outline-none focus:border-cyan-500/50 cursor-pointer">
                <option value="pending">Pendiente</option>
                <option value="in_progress">En progreso</option>
                <option value="completed">Completado</option>
              </select>
            </div>
          ))}
        </div>
      </section>

      {/* Next delivery date */}
      <section className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6 mb-6">
        <h2 className="text-[15px] font-semibold text-white/80 mb-3">Próxima entrega</h2>
        <input type="date" className={inputClass}
          value={project.nextDeliveryDate ?? ''}
          onChange={(e) => handleDeliveryDate(e.target.value)} />
      </section>

      {/* Notes */}
      <section className="bg-[#0f1015] border border-white/[0.06] rounded-2xl p-6">
        <h2 className="text-[15px] font-semibold text-white/80 mb-5">Notas</h2>
        <div className="flex gap-2 mb-5">
          <textarea className={`${inputClass} min-h-[60px] resize-y`}
            placeholder="Escribe una actualización para el cliente..."
            value={noteInput} onChange={(e) => setNoteInput(e.target.value)} />
          <button onClick={handleAddNote} disabled={!noteInput.trim() || addingNote}
            className={`px-4 self-end rounded-lg text-[13px] font-medium py-2.5 transition-all cursor-pointer ${
              noteInput.trim() && !addingNote
                ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                : 'bg-white/[0.04] text-white/20 cursor-not-allowed'
            }`}>
            {addingNote ? '...' : 'Agregar'}
          </button>
        </div>
        {project.notes.length === 0 ? (
          <p className="text-white/30 text-[13px]">Sin notas aún</p>
        ) : (
          <div className="space-y-3">
            {project.notes.map((note) => (
              <div key={note.id} className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-4">
                <p className="text-[14px] text-white/70 whitespace-pre-wrap">{note.content}</p>
                <p className="text-[11px] text-white/30 mt-2">
                  {new Date(note.createdAt).toLocaleDateString('es-PE', {
                    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Verify admin portal**

```bash
npm run dev
# Go to /admin/portal → should show project list (empty if none saved yet)
# Save a project from /admin/contrato
# Go back to /admin/portal → project should appear with progress bar
# Click a project → should show phases, delivery date, notes management
# Change a phase status → should update immediately
# Add a note → should appear in the list
```

- [ ] **Step 4: Commit**

```bash
git add app/admin/portal
git commit -m "feat: add admin portal project list and detail pages"
```

---

### Task 8: Client-Facing Portal Page

**Files:**
- Create: `app/portal/[slug]/page.tsx`

**Interfaces:**
- Consumes: `GET /api/portal/[slug]`
- Produces: Public, server-rendered portal page visible to clients

- [ ] **Step 1: Create `app/portal/[slug]/page.tsx`**

```tsx
// app/portal/[slug]/page.tsx
import { notFound } from 'next/navigation';

interface PortalData {
  projectName: string;
  phases: { name: string; status: string; order: number }[];
  notes: { content: string; createdAt: string }[];
  nextDeliveryDate: string | null;
}

async function getPortalData(slug: string): Promise<PortalData | null> {
  const { getPortalBySlug } = await import('@/lib/projects');
  return getPortalBySlug(slug);
}

export default async function ClientPortalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getPortalData(slug);

  if (!data) notFound();

  const completedCount = data.phases.filter((p) => p.status === 'completed').length;
  const pct = data.phases.length > 0 ? Math.round((completedCount / data.phases.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="border-b border-white/[0.06] px-6 py-6">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center">
            <span className="text-cyan-400 font-bold text-sm">C</span>
          </div>
          <div>
            <p className="text-white/90 font-semibold text-[15px]">{data.projectName}</p>
            <p className="text-white/30 text-[12px]">Portal del proyecto</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] text-white/50">Progreso general</span>
            <span className="text-[13px] text-cyan-400 font-medium tabular-nums">{pct}%</span>
          </div>
          <div className="h-2.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Timeline */}
        <section>
          <h2 className="text-[15px] font-semibold text-white/80 mb-5">Fases</h2>
          <div className="space-y-0">
            {data.phases.map((phase, i) => (
              <div key={i} className="flex gap-4">
                {/* Dot + line */}
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    phase.status === 'completed' ? 'bg-emerald-400' :
                    phase.status === 'in_progress' ? 'bg-cyan-400 animate-pulse' : 'bg-white/20'
                  }`}>
                    {phase.status === 'completed' && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  {i < data.phases.length - 1 && (
                    <div className={`w-px flex-1 min-h-8 ${
                      phase.status === 'completed' ? 'bg-emerald-400/30' : 'bg-white/[0.08]'
                    }`} />
                  )}
                </div>
                {/* Content */}
                <div className="pb-6">
                  <p className={`text-[14px] font-medium ${
                    phase.status === 'completed' ? 'text-white/70' :
                    phase.status === 'in_progress' ? 'text-white/90' : 'text-white/40'
                  }`}>{phase.name}</p>
                  <p className={`text-[12px] mt-0.5 ${
                    phase.status === 'completed' ? 'text-emerald-400/70' :
                    phase.status === 'in_progress' ? 'text-cyan-400/70' : 'text-white/25'
                  }`}>
                    {phase.status === 'completed' ? 'Completado' :
                     phase.status === 'in_progress' ? 'En progreso' : 'Pendiente'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Next delivery */}
        {data.nextDeliveryDate && (
          <section className="bg-cyan-500/[0.06] border border-cyan-500/20 rounded-2xl p-5">
            <p className="text-[13px] text-cyan-400/80 mb-1">Próxima entrega</p>
            <p className="text-[16px] text-white/90 font-medium">
              {new Date(data.nextDeliveryDate + 'T00:00:00').toLocaleDateString('es-PE', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </p>
          </section>
        )}

        {/* Notes */}
        {data.notes.length > 0 && (
          <section>
            <h2 className="text-[15px] font-semibold text-white/80 mb-5">Actualizaciones</h2>
            <div className="space-y-3">
              {data.notes.map((note, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-4">
                  <p className="text-[14px] text-white/70 whitespace-pre-wrap">{note.content}</p>
                  <p className="text-[11px] text-white/30 mt-2">
                    {new Date(note.createdAt).toLocaleDateString('es-PE', {
                      year: 'numeric', month: 'short', day: 'numeric',
                    })}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] px-6 py-6 mt-8">
        <p className="text-center text-white/25 text-[12px]">
          Creado con{' '}
          <a href="https://castennio.com" className="text-white/40 hover:text-white/60 transition-colors">
            Castennio
          </a>
        </p>
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: Verify client portal**

```bash
npm run dev
# Use the portal link from a saved project
# /portal/[slug] → should show timeline, notes, delivery date
# No login required
# Try a fake slug → should show 404
```

- [ ] **Step 3: Commit**

```bash
git add app/portal
git commit -m "feat: add client-facing portal page"
```

---

### Task 9: Cleanup Old Routes + Final Verification

**Files:**
- Delete: `app/calculadora/page.tsx`, `app/calculadora/layout.tsx`
- Delete: `app/contrato/page.tsx`, `app/contrato/layout.tsx`
- Delete: `app/login/page.tsx`, `app/login/layout.tsx`
- Modify: `app/components/admin/AdminGuard.tsx` — can be deleted if no longer imported anywhere

**Interfaces:**
- Consumes: Nothing — cleanup only
- Produces: Clean file structure with no dead code

- [ ] **Step 1: Verify no direct imports of old pages**

```bash
grep -r "from.*calculadora\|from.*contrato/page\|from.*login/page\|from.*AdminGuard" app/ --include="*.tsx" --include="*.ts" -l
```

If nothing references them (the admin layout handles auth instead of AdminGuard), delete them.

- [ ] **Step 2: Delete old route files**

```bash
rm app/calculadora/page.tsx app/calculadora/layout.tsx
rm app/contrato/page.tsx app/contrato/layout.tsx
rm app/login/page.tsx app/login/layout.tsx
```

Only delete `AdminGuard.tsx` if Step 1 confirmed no imports remain.

- [ ] **Step 3: Full smoke test**

```bash
npm run dev
```

Verify:
1. `/admin` → login form (when not authenticated)
2. Login → redirects to `/admin/cotizacion` with sidebar
3. Sidebar navigation works: Cotización, Contrato, Portal
4. `/admin/contrato` → fill form → Guardar → portal link appears → downloads work
5. `/admin/portal` → project appears in list → click → manage phases/notes
6. `/portal/[slug]` → client sees timeline, notes, delivery date
7. `/calculadora` → redirects to `/admin/cotizacion`
8. `/contrato` → redirects to `/admin/contrato`
9. `/login` → redirects to `/admin`
10. Mobile: sidebar collapses to hamburger

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove old route files, cleanup dead code"
```
