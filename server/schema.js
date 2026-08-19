// Définitions SQL des tables (identiques à database/schema.sql)

export const CREATE_TABLES = [
  `CREATE TABLE IF NOT EXISTS "plantes" (
    "id"             TEXT PRIMARY KEY,
    "name"           TEXT NOT NULL,
    "category"       TEXT DEFAULT '',
    "price"          DOUBLE PRECISION DEFAULT 0,
    "stock"          INTEGER DEFAULT 0,
    "transportCost"  DOUBLE PRECISION DEFAULT 0,
    "location"       TEXT DEFAULT 'both',
    "soil"           TEXT DEFAULT '',
    "water"          TEXT DEFAULT 'moyen',
    "sun"            TEXT DEFAULT 'plein-soliel',
    "image"          TEXT DEFAULT '',
    "description"    TEXT DEFAULT '',
    "tips"           TEXT DEFAULT '',
    "created_at"     TIMESTAMPTZ DEFAULT NOW()
  )`,

  `CREATE TABLE IF NOT EXISTS "equipements" (
    "id"             TEXT PRIMARY KEY,
    "name"           TEXT NOT NULL,
    "category"       TEXT DEFAULT '',
    "price"          DOUBLE PRECISION DEFAULT 0,
    "stock"          INTEGER DEFAULT 0,
    "transportCost"  DOUBLE PRECISION DEFAULT 0,
    "location"       TEXT DEFAULT 'both',
    "image"          TEXT DEFAULT '',
    "description"    TEXT DEFAULT '',
    "specs"          TEXT DEFAULT '',
    "created_at"     TIMESTAMPTZ DEFAULT NOW()
  )`,

  `CREATE TABLE IF NOT EXISTS "formations" (
    "id"               TEXT PRIMARY KEY,
    "title"            TEXT NOT NULL,
    "location"         TEXT DEFAULT '',
    "duration"         TEXT DEFAULT '',
    "date"             TEXT DEFAULT '',
    "price"            DOUBLE PRECISION DEFAULT 0,
    "availablePlaces"  INTEGER DEFAULT 0,
    "image"            TEXT DEFAULT '',
    "description"      TEXT DEFAULT '',
    "created_at"       TIMESTAMPTZ DEFAULT NOW()
  )`,

  `CREATE TABLE IF NOT EXISTS "camping_spots" (
    "id"           TEXT PRIMARY KEY,
    "name"         TEXT NOT NULL,
    "type"         TEXT DEFAULT 'Nu',
    "price"        DOUBLE PRECISION DEFAULT 0,
    "capacity"     INTEGER DEFAULT 1,
    "location"     TEXT DEFAULT 'Mboro',
    "image"        TEXT DEFAULT '',
    "description"  TEXT DEFAULT '',
    "created_at"   TIMESTAMPTZ DEFAULT NOW()
  )`,

  `CREATE TABLE IF NOT EXISTS "commandes" (
    "id"               TEXT PRIMARY KEY,
    "nom_client"       TEXT DEFAULT '',
    "telephone"        TEXT DEFAULT '',
    "items"            JSONB DEFAULT '[]',
    "total"            DOUBLE PRECISION DEFAULT 0,
    "statut_paiement"  TEXT DEFAULT 'Payé',
    "date"             TEXT DEFAULT '',
    "created_at"       TIMESTAMPTZ DEFAULT NOW()
  )`,

  `CREATE TABLE IF NOT EXISTS "reservations_camping" (
    "id"               TEXT PRIMARY KEY,
    "nom_client"       TEXT DEFAULT '',
    "telephone_client" TEXT DEFAULT '',
    "email_client"     TEXT DEFAULT '',
    "date_debut"       TEXT DEFAULT '',
    "date_fin"         TEXT DEFAULT '',
    "statut_paiement"  TEXT DEFAULT 'Payé',
    "montant_total"    DOUBLE PRECISION DEFAULT 0,
    "emplacement_nom"  TEXT DEFAULT '',
    "ferme"            TEXT DEFAULT '',
    "created_at"       TIMESTAMPTZ DEFAULT NOW()
  )`,

  `CREATE TABLE IF NOT EXISTS "inscriptions_formations" (
    "id"               TEXT PRIMARY KEY,
    "nom_apprenant"    TEXT DEFAULT '',
    "telephone"        TEXT DEFAULT '',
    "email"            TEXT DEFAULT '',
    "formation_titre"  TEXT DEFAULT '',
    "statut_paiement"  TEXT DEFAULT 'Total',
    "montant_paye"     DOUBLE PRECISION DEFAULT 0,
    "created_at"       TIMESTAMPTZ DEFAULT NOW()
  )`,

  `CREATE TABLE IF NOT EXISTS "demandes_devis" (
    "id"                     TEXT PRIMARY KEY,
    "nom_demandeur"          TEXT DEFAULT '',
    "entreprise_collectivite" TEXT DEFAULT 'Particulier',
    "email"                  TEXT DEFAULT '',
    "telephone"              TEXT DEFAULT '',
    "type_service"           TEXT DEFAULT '',
    "details_projet"         TEXT DEFAULT '',
    "statut"                 TEXT DEFAULT 'Nouveau',
    "date"                   TEXT DEFAULT '',
    "created_at"             TIMESTAMPTZ DEFAULT NOW()
  )`,
];