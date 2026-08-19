// src/services/api.js

// =====================================================
// Client API du navigateur → serveur Express (Node.js)
// En développement : Vite proxy /api → http://localhost:3000
// En production   : VITE_API_URL pointe vers l'API déployée
//                   (ex: https://ferme-niayes-api.onrender.com)
// =====================================================

let BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '');
if (!BASE.endsWith('/api')) BASE += '/api';

let adminToken = localStorage.getItem('ferme_admin_token') || null;

export const setAdminToken = (token) => {
  adminToken = token;
  if (token) localStorage.setItem('ferme_admin_token', token);
  else localStorage.removeItem('ferme_admin_token');
};

export const getAdminToken = () => adminToken;

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (adminToken) headers['Authorization'] = `Bearer ${adminToken}`;

  const res = await fetch(`${BASE}${path}`, {
    headers,
    ...options,
  });

  if (!res.ok) {
    let message = `Erreur API (${res.status}) sur ${path}`;
    try {
      const body = await res.json();
      if (body && body.error) message = body.error;
    } catch {
      // réponse non JSON
    }
    throw new Error(message);
  }

  if (res.status === 401) {
    setAdminToken(null);
    throw new Error('Session expirée. Veuillez vous reconnecter.');
  }

  if (res.status === 204) return null;
  return res.json();
}

// Fabrique d'opérations CRUD pour une ressource REST
const crud = (resource) => ({
  fetchAll: () => request(`/${resource}`),
  add: (data) => request(`/${resource}`, { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/${resource}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => request(`/${resource}/${id}`, { method: 'DELETE' }),
});

export const api = {
  plants: crud('plantes'),
  equipment: crud('equipements'),
  trainings: crud('formations'),
  campingSpots: crud('camping_spots'),
  orders: crud('commandes'),
  reservations: crud('reservations_camping'),
  inscriptions: crud('inscriptions_formations'),
  devis: crud('demandes_devis'),
  health: () => request('/health'),
};

// Ajoutez d'autres fonctions API ici (ex: fetchEquipements, loginAdmin, etc.)
export const loginAdmin = async (email, password) => {
  try {
    const response = await fetch(`${BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(body.error || `Erreur HTTP: ${response.status}`);
    }
    if (body.token) setAdminToken(body.token);
    return body;
  } catch (error) {
    console.error("Erreur lors de la connexion admin:", error);
    throw error;
  }
};

export const checkAdminToken = async () => {
  try {
    await request('/admin/check');
    return true;
  } catch {
    return false;
  }
};

export default api;