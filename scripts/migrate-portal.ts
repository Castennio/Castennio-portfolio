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
