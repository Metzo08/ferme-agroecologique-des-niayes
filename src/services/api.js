// src/services/api.js

// =====================================================
// Client API du navigateur → serveur Express (Node.js)
// En développement : Vite proxy /api → http://localhost:3000
// En production   : VITE_API_URL pointe vers l'API déployée
//                   (ex: https://ferme-niayes-api.onrender.com)
// =====================================================

const BASE = import.meta.env.VITE_API_URL || '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
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
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la connexion admin:", error);
    throw error;
  }
};

export default api;