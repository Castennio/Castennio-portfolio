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
