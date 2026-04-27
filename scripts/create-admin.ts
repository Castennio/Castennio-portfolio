/**
 * Script para crear el primer usuario administrador
 *
 * Uso: npx tsx scripts/create-admin.ts
 */

import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL no está definida en .env');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function createAdmin() {
  // Configuración del admin
  const email = 'admin@castennio.com';
  const password = 'Castennio2026!'; // Cambiar después del primer login
  const name = 'Admin';

  console.log('🔐 Creando usuario administrador...\n');

  try {
    // Hashear contraseña
    const passwordHash = await bcrypt.hash(password, 12);

    // Verificar si ya existe
    const existing = await sql`SELECT id FROM users WHERE email = ${email}`;

    if (existing.length > 0) {
      // Actualizar contraseña
      await sql`
        UPDATE users SET password_hash = ${passwordHash}, updated_at = CURRENT_TIMESTAMP
        WHERE email = ${email}
      `;
      console.log('✅ Contraseña actualizada!\n');
    } else {
      // Crear usuario
      await sql`
        INSERT INTO users (email, password_hash, name, role)
        VALUES (${email}, ${passwordHash}, ${name}, 'ADMIN')
      `;
      console.log('✅ Usuario creado exitosamente!\n');
    }

    console.log('✅ Usuario creado exitosamente!\n');
    console.log('📧 Email:', email);
    console.log('🔑 Contraseña:', password);
    console.log('\n⚠️  Cambia la contraseña después del primer login');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createAdmin();
