# 🔧 Mise en ligne des données partagées (PostgreSQL)

## Problème résolu
Avant, les produits ajoutés dans l'admin n'apparaissaient que sur votre navigateur (stockage local `localStorage`).
Désormais, **toutes les données sont stockées dans la base PostgreSQL `fermes_niayes`** et sont partagées par tous les visiteurs sur tous les appareils.

---

## 📦 Architecture

```
Navigateur (React)  ←→  Serveur Node.js (Express)  ←→  PostgreSQL `fermes_niayes`
        │                        │
        │  (fichiers statiques)  │  (API REST /api/*)
        └──>  votre site       └──>  vos données
```

Le serveur Express **sert le site** (dossier `dist/`) **et l'API** (les données). Un seul processus Node.js suffit pour Hostinger.

---

## 🚀 Déploiement sur Hostinger

### 1. Prérequis
- Votre site est déjà sur GitHub : `Metzo08/ferme-agroecologique-des-niayes`
- Votre base PostgreSQL `fermes_niayes` est accessible (ici, sur votre machine — voir section « Base en ligne » plus bas)

### 2. Configuration de la base
Modifiez le fichier `.env` à la racine du projet :

```env
# Remplacer par votre chaîne de connexion Hostinger
DATABASE_URL=postgresql://postgres:VOTRE_MDP@HOTE_HOSTINGER:5432/fermes_niayes
# Mettre "true" si Hostinger exige SSL
DATABASE_SSL=false
PORT=3000   # Utilisez le port fourni par Hostinger
```

### 3. Créer les tables (une seule fois)
```bash
npm install
npm run db:setup
```
Les tables `plantes`, `equipements`, `formations`, `camping_spots`, `commandes`, `reservations_camping`, `inscriptions_formations`, `demandes_devis` sont créées automatiquement.

### 4. Compiler le site
```bash
npm run build
```
→ génère le dossier `dist/` (le site compilé).

### 5. Démarrer le serveur
```bash
npm start
```
→ `node server/index.js` démarre le serveur complet (API + site).

> **Sur Hostinger** : configurez le point d'entrée (entry point) sur `server/index.js` et le dossier de démarrage sur le dossier du projet. Hostinger lancera automatiquement `npm start` sur le port fourni.

---

## 🔌 Base de données « en ligne »

⚠️ **Point crucial** : une base de données qui est uniquement sur votre ordinateur **n'est pas accessible sur Internet**. Pour que le site (chez Hostinger) puisse lire/écrire dans la base, celle-ci doit être **accessible en ligne** avec une adresse (hôte) publique.

Si votre base `fermes_niayes` est **fournie par Hostinger** (dans votre espace client → « Bases de données »), utilisez l'hôte qu'ils vous donnent (ex : `srv-xxxx.hostingersite.com`).

Si elle est **sur votre machine**, vous devez soit :
- La rendre accessible (IP publique + redirection de port), ou
- La migrer vers l'hébergement PostgreSQL de Hostinger, ou
- Utiliser un PostgreSQL hébergé gratuitement (Neon, Vercel Postgres, etc.).

---

## 🧪 Tester en local

```bash
npm install
npm run db:setup   # crée les tables
npm run build      # compile le site
npm start          # démarre le serveur sur http://localhost:3000
```

Puis ouvrez `http://localhost:3000` → vous verrez le site, et l'admin `/admin` utilisera la base PostgreSQL.

---

## 📁 Fichiers ajoutés

| Fichier | Rôle |
|---------|------|
| `database/schema.sql` | Script SQL des tables |
| `server/index.js` | Serveur Express (API + site) |
| `server/db.js` | Connexion PostgreSQL |
| `server/schema.js` | Définitions SQL des tables |
| `server/setup-db.js` | Script de création des tables |
| `src/services/api.js` | Client API côté navigateur |
| `.env` | Configuration (DATABASE_URL, PORT) |

---

## 🔐 Accès administrateur (sécurité)

Pour des raisons de sécurité, **aucun mot de passe n'est stocké en dur** dans le code source public.

Les identifiants de connexion à l'espace admin (`/admin`) se configurent via les
variables d'environnement frontend (fichier `.env` à la racine, non suivi par git) :

```env
VITE_ADMIN_EMAIL=admin@ferme-niayes.com
VITE_ADMIN_PASSWORD=VotreMotDePasseFort
```

> ⚠️ Le fichier `.env` est ignoré par git (voir `.gitignore`). Ne commitez **jamais**
> vos identifiants réels. Utilisez `.env.example` comme modèle de configuration.
