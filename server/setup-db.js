// Script d'initialisation de la base de données PostgreSQL
// Usage : npm run db:setup
// Crée toutes les tables si elles n'existent pas.

import pool from './db.js';
import { CREATE_TABLES } from './schema.js';

async function setup() {
  const client = await pool.connect();
  try {
    console.log('Connexion à PostgreSQL établie.');
    for (const sql of CREATE_TABLES) {
      await client.query(sql);
      console.log('  ✓ Table créée / vérifiée :', sql.match(/CREATE TABLE IF NOT EXISTS "([^"]+)"/)?.[1]);
    }
    console.log('\n✅ Base de données initialisée avec succès.');
  } catch (err) {
    console.error('❌ Erreur lors de l\'initialisation de la base :', err.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

setup();
