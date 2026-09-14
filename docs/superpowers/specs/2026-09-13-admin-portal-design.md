# Admin Panel Restructure + Client Portal

## Overview

Restructure Castennio's admin area into a unified layout with sidebar navigation (Cotización, Contrato, Portal) and add a client-facing project portal system. When the admin saves a contract, a portal link is auto-generated. The client accesses their portal via a secret URL to see project progress (phases, notes, next delivery date).

## Route Structure

```
app/
  admin/
    layout.tsx              # Auth gate: if not logged in → login form; if logged in → sidebar + children
    page.tsx                # Redirects to /admin/cotizacion
    cotizacion/
      page.tsx              # Current /calculadora content (moved)
    contrato/
      page.tsx              # Current /contrato content (+ save flow)
    portal/
      page.tsx              # Project list (admin)
      [projectId]/
        page.tsx            # Manage phases/notes for one project
  portal/
    [slug]/
      page.tsx              # Public client portal (no auth)
```

Entry point: `/admin`. If not authenticated, the layout renders the login form inline (no redirect to `/login`). After login, the sidebar appears with the admin sections.

Middleware updated: `PROTECTED_ROUTES = ['/admin']`. The `/admin/layout.tsx` handles showing login vs sidebar — middleware just ensures the session cookie is checked. `/portal/[slug]` is public (no middleware). Old routes (`/calculadora`, `/contrato`, `/login`) redirect to `/admin/cotizacion`, `/admin/contrato`, `/admin` respectively.

## Sidebar Layout

- Dark background (#0a0a0f), Castennio logo at top
- 3 nav items with icons: Cotización, Contrato, Portal
- Active item highlighted with cyan accent
- Logout button at bottom
- Responsive: collapses to hamburger on mobile

## Database Schema

Three new tables, raw SQL with `@neondatabase/serverless` (no ORM, consistent with existing `users` table).

### `projects`

```sql
CREATE TABLE projects (
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
);
```

### `project_phases`

```sql
CREATE TABLE project_phases (
  id SERIAL PRIMARY KEY,
  project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  order_num INT NOT NULL,
  CONSTRAINT valid_status CHECK (status IN ('pending', 'in_progress', 'completed'))
);
```

### `project_notes`

```sql
CREATE TABLE project_notes (
  id SERIAL PRIMARY KEY,
  project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

Default phases created on project save (order 1-5): Diseño, Desarrollo Frontend, Desarrollo Backend, Testing, Entrega.

## API Routes

All `/api/projects/*` routes verify admin session via `getSession()`. The public endpoint returns only display data (no price, no RUC).

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/projects` | POST | Create project (save contract data + generate slug + create default phases) |
| `/api/projects` | GET | List all projects (admin portal list) |
| `/api/projects/[id]` | GET | Get project with phases and notes (admin detail) |
| `/api/projects/[id]` | PUT | Update project fields (including next_delivery_date) |
| `/api/projects/[id]/phases` | PUT | Update phase statuses (batch: `[{id, status}]`) |
| `/api/projects/[id]/notes` | POST | Add a note to a project |
| `/api/portal/[slug]` | GET | Public portal data: project name, phases, notes, next delivery date |

### POST `/api/projects` request body

```json
{
  "clienteEmpresa": "KINGBRAKE",
  "clienteRuc": "20603667451",
  "clienteRepresentante": "...",
  "clienteDireccion": "...",
  "devEmpresa": "CASTENNIO",
  "devRuc": "...",
  "devRepresentante": "...",
  "devDireccion": "...",
  "descripcion": "...",
  "precio": 3500,
  "moneda": "PEN",
  "duracion": "30 días calendario",
  "fechaInicio": "2026-10-01",
  "fechaEntrega": "2026-10-31",
  "formaPago": "50% inicio, 50% entrega"
}
```

### POST `/api/projects` response

```json
{
  "id": 1,
  "slug": "a7x9k2m4p1"
}
```

### GET `/api/portal/[slug]` response

```json
{
  "projectName": "KINGBRAKE",
  "phases": [
    { "name": "Diseño", "status": "completed", "order": 1 },
    { "name": "Desarrollo Frontend", "status": "in_progress", "order": 2 },
    ...
  ],
  "notes": [
    { "content": "Se completó el wireframe...", "createdAt": "2026-10-05T..." },
    ...
  ],
  "nextDeliveryDate": "2026-10-15"
}
```

## Save Flow (Contrato Page)

1. Admin fills all contract fields (existing form, unchanged)
2. New "Guardar" button appears when all required fields are filled
3. Click "Guardar" → POST to `/api/projects` with form data
4. Backend generates 10-char nanoid slug, inserts project + 5 default phases
5. Frontend receives `{ id, slug }`:
   - Shows portal link (`castennio.com/portal/{slug}`) with copy button
   - Enables "Descargar Contrato" and "Descargar Welcome Pack" buttons
   - Enables email buttons
6. Portal link is passed as `portalUrl` prop to `WelcomePackPDF` so it appears in the Portal page of the document

Slug generation: `nanoid` (already available via npm, or custom implementation with `crypto.getRandomValues` — 10 alphanumeric chars gives ~60 bits of entropy, sufficient for secret links).

## Admin Portal Views

### Project List (`/admin/portal`)

- Grid/list of saved projects
- Each card shows: client name, company, creation date, progress bar (% phases completed)
- Click → navigate to `/admin/portal/[projectId]` (admin detail)

### Project Detail (`/admin/portal/[projectId]`)

- Header: project name + "Copiar link del portal" button
- Timeline section: vertical list of phases, each with a status dropdown (Pendiente / En progreso / Completado)
- Next delivery date: date picker input
- Notes section: text input + "Agregar nota" button, existing notes listed with timestamps (newest first)
- All changes save via API calls (no page-level save button — each action saves immediately)

## Client Portal View (`/portal/[slug]`)

- Dark theme consistent with Castennio brand
- Header: Castennio logo + project name (client company)
- Visual timeline of phases:
  - Gray dot + muted text = pending
  - Cyan pulsing dot + white text = in progress
  - Green dot + checkmark = completed
- "Próxima entrega" card with the date (if set)
- Notes feed: chronological list (newest first), each with formatted date
- Footer: "Creado con Castennio" + link to castennio.com
- Responsive, mobile-friendly
- Server-rendered (SSR) for fast load, no auth required

## Migration Script

A SQL migration script at `scripts/migrate-portal.ts` runs via `npx tsx scripts/migrate-portal.ts`. Creates the three tables. Idempotent (uses `CREATE TABLE IF NOT EXISTS`).

## What's NOT included

- Client login/authentication (secret link is sufficient)
- File uploads or deliverables
- Email notifications on portal updates
- Editing or deleting projects from admin (can be added later)
- Linking Cotización data to projects (they're independent tools)
