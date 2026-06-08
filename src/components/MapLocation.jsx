import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Composant pour mettre à jour la vue de la carte quand le filtre change
const MapUpdater = ({ activeFilter }) => {
  const map = useMap();
  
  useEffect(() => {
    if (activeFilter === 'mboro') {
      map.setView([15.1394, -16.8827], 13, { animate: true });
    } else if (activeFilter === 'ngaparou') {
      map.setView([14.4220, -16.9639], 13, { animate: true });
    } else {
      // Afficher les deux sites (vue globale)
      const bounds = L.latLngBounds([
        [15.1394, -16.8827], // Mboro
        [14.4220, -16.9639]  // Mbour (Ngaparou)
      ]);
      map.fitBounds(bounds, { padding: [50, 50], animate: true });
    }
  }, [activeFilter, map]);

  return null;
};

const MapLocation = ({ activeFermeFilter }) => {
  return (
    <div style={{ 
      padding: 0, 
      overflow: 'hidden', 
      height: '450px', 
      borderRadius: '20px', 
      border: '4px solid white', 
      boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
      zIndex: 0 
    }}>
      <MapContainer 
        center={[14.8168, -16.9786]} 
        zoom={9} 
        style={{ height: '100%', width: '100%', zIndex: 1 }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater activeFilter={activeFermeFilter} />

        {/* Marqueur Mboro */}
        <Marker position={[15.1394, -16.8827]}>
          <Popup>
            <div style={{ textAlign: 'center', padding: '5px' }}>
              <span style={{ fontSize: '20px', display: 'block', marginBottom: '5px' }}>🌱</span>
              <strong style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>Domaine de Mboro</strong><br/>
              <span style={{ color: '#666' }}>Khondio, Région de Thiès, Sénégal</span><br/>
              <em>Pépinière & Maraîchage</em>
            </div>
          </Popup>
        </Marker>

        {/* Marqueur Ngaparou (Mbour) */}
        <Marker position={[14.4220, -16.9639]}>
          <Popup>
            <div style={{ textAlign: 'center', padding: '5px' }}>
              <span style={{ fontSize: '20px', display: 'block', marginBottom: '5px' }}>🌊</span>
              <strong style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>Oasis de Ngaparou</strong><br/>
              <span style={{ color: '#666' }}>Mbour, Région de Thiès, Sénégal</span><br/>
              <em>Eco-camping & Détente</em>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapLocation;
