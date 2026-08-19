// =============================================================
// Serveur Express de la Ferme Agroécologique des Niayes
// - Sert l'API REST (plantes, equipements, formations, campings,
//   commandes, réservations, inscriptions, devis)
// - Sert les fichiers statiques du site (dossier dist/)
// =============================================================
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db.js';
import { CREATE_TABLES } from './schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ── Santé du serveur ──
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected', time: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'disconnected', message: err.message });
  }
});

// ── Fabrique de routes CRUD ──
function createCrudRoutes(table, key, normalize) {
  const list = async (req, res) => {
    try {
      const { rows } = await pool.query(`SELECT * FROM "${table}" ORDER BY "created_at" ASC`);
      res.json(rows.map(normalize));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const insert = async (req, res) => {
    try {
      const data = req.body || {};
      const id = data.id || `${table.slice(0, 1)}_${Date.now()}`;
      const cols = Object.keys(data).filter((k) => k !== 'id');
      const values = cols.map((c) => data[c]);
      const placeholders = cols.map((_, i) => `$${i + 2}`).join(', ');
      const setCols = cols.join(', ');
      await pool.query(
        `INSERT INTO "${table}" ("id", ${setCols}) VALUES ($1, ${placeholders}) ON CONFLICT ("id") DO NOTHING`,
        [id, ...values]
      );
      res.status(201).json({ id, ...data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const update = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body || {};
      const cols = Object.keys(data).filter((k) => k !== 'id');
      if (cols.length === 0) return res.json({ id });
      const setClause = cols.map((c, i) => `"${c}" = $${i + 1}`).join(', ');
      const values = cols.map((c) => data[c]);
      await pool.query(`UPDATE "${table}" SET ${setClause} WHERE "id" = $${cols.length + 1}`, [...values, id]);
      res.json({ id, ...data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const remove = async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query(`DELETE FROM "${table}" WHERE "id" = $1`, [id]);
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  app.get(`/api/${key}`, list);
  app.post(`/api/${key}`, insert);
  app.put(`/api/${key}/:id`, update);
  app.delete(`/api/${key}/:id`, remove);
}

const identity = (x) => x;

// Ordres de commandes : normaliser items (stocké en JSONB)
const normalizeOrder = (o) => {
  let items = o.items;
  if (typeof items === 'string') {
    try { items = JSON.parse(items); } catch { items = []; }
  }
  return { ...o, items: items || [] };
};

createCrudRoutes('plantes', 'plantes', identity);
createCrudRoutes('equipements', 'equipements', identity);
createCrudRoutes('formations', 'formations', identity);
createCrudRoutes('camping_spots', 'camping_spots', identity);
createCrudRoutes('commandes', 'commandes', normalizeOrder);
createCrudRoutes('reservations_camping', 'reservations_camping', identity);
createCrudRoutes('inscriptions_formations', 'inscriptions_formations', identity);
createCrudRoutes('demandes_devis', 'demandes_devis', identity);

// ── Fichiers statiques du site (build) ──
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Fallback SPA : toutes les routes non-API renvoient index.html
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ── Démarrage ──
app.listen(PORT, async () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
  // Création automatique des tables au démarrage (idempotent)
  try {
    for (const sql of CREATE_TABLES) {
      await pool.query(sql);
    }
    console.log('✅ Tables PostgreSQL vérifiées / créées.');
  } catch (err) {
    console.error('⚠️  Impossible de vérifier les tables :', err.message);
  }
});
