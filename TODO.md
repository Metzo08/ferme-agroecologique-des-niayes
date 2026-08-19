# Plan d'implémentation : Données partagées via PostgreSQL

Objectif : permettre que les produits ajoutés dans l'admin soient visibles sur tous les appareils, via une base PostgreSQL partagée.

## Étapes

- [x] 1. Créer le schéma de la base de données (`database/schema.sql`)
- [x] 2. Créer le module de connexion PostgreSQL (`server/db.js`)
- [x] 3. Créer les définitions des tables (`server/schema.js`)
- [x] 4. Créer le script d'initialisation de la base (`server/setup-db.js`)
- [x] 5. Créer le serveur Express : API REST + service du site (`server/index.js`)
- [x] 6. Créer le client API côté navigateur (`src/services/api.js`)
- [x] 7. Créer la configuration `.env` / `.env.example`
- [x] 8. Ajouter les dépendances et scripts dans `package.json`
- [x] 9. Ajouter le proxy API dans `vite.config.js`
- [x] 10. Modifier `src/context/AppContext.jsx` (chargement/sauvegarde depuis la base PostgreSQL)
- [x] 11. Rédiger le guide de déploiement (`README-BASE-DONNEES.md`)
- [x] 12. Tester la connexion à la base et vérifier le démarrage

## Vérifications effectuées

- [x] `npm install express pg dotenv cors` → OK
- [x] `npm run build` → OK (dossier `dist/` généré)
- [x] Connexion PostgreSQL `fermes_niayes` → CONNEXION OK
- [x] `npm run db:setup` → 8 tables créées avec succès
- [x] Démarrage serveur Express → `GET /api/health` → `{"status":"ok","database":"connected"}`
- [x] API CRUD testée → GET/POST/DELETE OK

