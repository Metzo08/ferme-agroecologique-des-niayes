// Connexion PostgreSQL centralisée
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Chaîne de connexion (développement local)
// ⚠️ Ne jamais mettre de mot de passe en dur ici.
// Utiliser la variable d'environnement DATABASE_URL :
//   postgresql://USER:PASSWORD@HOTE:5432/NOM_BASE
// (voir .env.example)
const DEFAULT_DATABASE_URL = process.env.DATABASE_URL || '';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || DEFAULT_DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
  // Hostinger peut limiter le nombre de connexions : pool modéré
  max: parseInt(process.env.PG_POOL_MAX || '10', 10),
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (err) => {
  console.error('Erreur inattendue sur un client PostgreSQL :', err.message);
});

export default pool;