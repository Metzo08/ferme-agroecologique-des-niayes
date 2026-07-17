import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { MapPin, CheckCircle, Leaf } from 'lucide-react';
import MapLocation from '../components/MapLocation';

const Farms = () => {
  const { activeFermeFilter } = useContext(AppContext);
  const location = useLocation();

  // Détection du hash pour défiler automatiquement (ex: #pisciculture)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location, activeFermeFilter]);

  return (
    <div style={{ backgroundColor: 'var(--bg-sand)', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Hero Header Dynamique selon la ferme */}
      {(() => {
        const heroConfig = {
          mboro: {
            image: '/images/whatsapp_image_2026_05_27_at_19.12.48.webp',
            overlay: 'linear-gradient(135deg, rgba(27,94,32,0.85) 0%, rgba(46,125,50,0.65) 60%, rgba(0,0,0,0.4) 100%)',
            badge: '🌱 Mboro (Khondio)',
            badgeColor: 'var(--primary)',
            title: 'Domaine agricole de Mboro',
            subtitle: 'Au cœur de la zone des Niayes, notre plus grande ferme de production agroécologique. Pépinière, maraîchage et formation en permaculture sahélienne.',
            stats: [
              { value: '15+', label: 'Hectares' },
              { value: '50k', label: 'Plants/an' },
              { value: '3', label: 'Formations' },
            ]
          },
          ngaparou: {
            image: '/images/whatsapp_image_2026_05_27_at_19.12.53.webp',
            overlay: 'linear-gradient(135deg, rgba(230,81,0,0.82) 0%, rgba(255,112,67,0.55) 55%, rgba(0,0,0,0.4) 100%)',
            badge: '🌊 Ngaparou (Mbour)',
            badgeColor: 'var(--accent)',
            title: 'Oasis écotouristique de Ngaparou',
            subtitle: 'Sur la Petite-Côte sénégalaise, un havre de paix pour les vacanciers. Camping nature, espaces verts ornementaux et séjours immersifs 100% solaire.',
            stats: [
              { value: '100%', label: 'Solaire' },
              { value: '4', label: 'Zones camping' },
              { value: '∞', label: 'Sérénité' },
            ]
          },
          all: {
            image: '/images/whatsapp_image_2026_05_27_at_19.12.49.webp',
            overlay: 'linear-gradient(135deg, rgba(27,94,32,0.78) 0%, rgba(0,0,0,0.45) 100%)',
            badge: '🌍 Nos racines',
            badgeColor: 'var(--primary)',
            title: 'Nos fermes agroécologiques',
            subtitle: "Découvrez nos deux sites d'excellence à Mboro et Ngaparou, conçus comme des modèles de résilience climatique et de biodiversité au Sénégal.",
            stats: [
              { value: '2', label: 'Sites' },
              { value: '20+', label: 'Hectares' },
              { value: '100%', label: 'Bio & Solaire' },
            ]
          }
        };
        const cfg = heroConfig[activeFermeFilter] || heroConfig.all;
        return (
          <section style={{ 
            position: 'relative',
            minHeight: '480px',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            textAlign: 'center',
            padding: '60px 20px',
            color: 'white',
            overflow: 'hidden',
            backgroundImage: `url("${cfg.image}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
            {/* Overlay coloré */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              background: cfg.overlay,
              zIndex: 0
            }}></div>
            {/* Contenu */}
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
              <span style={{
                display: 'inline-block',
                backgroundColor: cfg.badgeColor,
                color: 'white',
                borderRadius: '999px',
                padding: '6px 20px',
                fontSize: '0.95rem',
                fontWeight: 700,
                marginBottom: '20px',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
              }}>{cfg.badge}</span>
              <h1 style={{ color: 'white', marginBottom: '16px', fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', lineHeight: 1.15 }}>
                {cfg.title}
              </h1>
              <p style={{ margin: '0 auto 32px', fontSize: '1.15rem', color: 'rgba(255,255,255,0.93)', maxWidth: '680px', lineHeight: 1.7 }}>
                {cfg.subtitle}
              </p>
              {/* Statistiques rapides */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                {cfg.stats.map((s, i) => (
                  <div key={i} style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.55)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '16px',
                    padding: '14px 30px',
                    textAlign: 'center',
                    minWidth: '110px',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.25)'
                  }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: '0.82rem', color: '#E2E8F0', fontWeight: 600, marginTop: '6px', letterSpacing: '0.5px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Ferme de Mboro */}
      {(activeFermeFilter === 'all' || activeFermeFilter === 'mboro') && (
        <div className="section container animate-fade">
          <div className="card" style={{ padding: '0', overflow: 'hidden', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <div className="grid-2" style={{ alignItems: 'stretch', gap: 0 }}>
              <div style={{ padding: '60px 40px', backgroundColor: 'var(--white)' }}>
                <span className="badge badge-mboro" style={{ marginBottom: '24px', fontSize: '0.9rem', display: 'inline-block' }}>Site principal & production</span>
                <h2 style={{ color: 'var(--primary)', marginBottom: '16px', fontSize: '2.2rem' }}>Domaine de Mboro (Khondio)</h2>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '24px', fontSize: '1.1rem' }}>
                  <MapPin size={22} color="var(--primary)" />
                  <span>Commune de Mboro, département de Tivaouane, région de Thiès, Sénégal</span>
                </div>
                
                <p style={{ marginBottom: '24px', lineHeight: 1.8, fontSize: '1.05rem', color: 'var(--text-charcoal)' }}>
                  Située dans la zone exceptionnellement fertile des Niayes, notre ferme de Mboro est le cœur battant de notre production. C'est ici que se trouve notre plus grande pépinière et que nous expérimentons les techniques avancées d'agroforesterie face à l'avancée du désert.
                </p>

                <div style={{ backgroundColor: '#F4FAF4', padding: '20px', borderRadius: 'var(--radius-md)', marginBottom: '24px', fontSize: '0.95rem', borderLeft: '4px solid var(--primary)' }}>
                  <h4 style={{ marginBottom: '10px', color: 'var(--primary)', fontSize: '1.05rem' }}>Informations administratives :</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', color: 'var(--text-charcoal)' }}>
                    <div><strong>Propriétaire :</strong> Abdou Karim Mbengue</div>
                    <div><strong>Ninéa :</strong> 004346583</div>
                    <div><strong>Registre de commerce :</strong> SN.MBR.2025.A.3642</div>
                  </div>
                </div>
                
                <div style={{ backgroundColor: '#F9F9F9', padding: '24px', borderRadius: 'var(--radius-md)', marginBottom: '0' }}>
                  <h4 style={{ marginBottom: '16px', color: 'var(--text-charcoal)' }}>Spécialités du site :</h4>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <CheckCircle size={22} color="var(--primary)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '1.05rem' }}>Production maraîchère biologique à grande échelle.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <CheckCircle size={22} color="var(--primary)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '1.05rem' }}>Pépinière forestière et fruitière (manguiers, agrumes, anacardiers).</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <CheckCircle size={22} color="var(--primary)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '1.05rem' }}>Pisciculture éco-responsable et systèmes d'aquaponie innovants.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <CheckCircle size={22} color="var(--primary)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '1.05rem' }}>Centre de formation pratique en permaculture sahélienne.</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div style={{ position: 'relative', height: '100%', minHeight: '400px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <img 
                  src="/images/whatsapp_image_2026_05_27_at_19.12.51.webp" 
                  alt="Ferme de Mboro vue des champs" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', flex: 1 }} 
                />
                <div style={{ position: 'absolute', bottom: '24px', left: '24px', backgroundColor: 'rgba(255,255,255,0.95)', padding: '20px 30px', borderRadius: 'var(--radius-md)', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', display: 'flex', gap: '24px', backdropFilter: 'blur(5px)' }}>
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.8rem' }}>15+</h3>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-charcoal)', fontWeight: 'bold' }}>Hectares</span>
                  </div>
                  <div style={{ width: '1px', backgroundColor: 'var(--border-color)' }}></div>
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.8rem' }}>50k</h3>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-charcoal)', fontWeight: 'bold' }}>Plants/an</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pôle Pisciculture & Aquaponie (Mboro) */}
      {(activeFermeFilter === 'all' || activeFermeFilter === 'mboro') && (
        <div id="pisciculture" className="section container animate-fade" style={{ paddingTop: '20px' }}>
          <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid #EAEAEA', boxShadow: '0 5px 15px rgba(0,0,0,0.03)' }}>
            <div className="grid-2" style={{ alignItems: 'center', gap: 0 }}>
              <div style={{ position: 'relative', height: '100%', minHeight: '350px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <img 
                  src="/images/aquaponics.jpg" 
                  alt="Bassins d'aquaponie et pisciculture" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', flex: 1 }} 
                />
              </div>
              <div style={{ padding: '50px 40px', backgroundColor: '#F4F9F4' }}>
                <span className="badge" style={{ backgroundColor: '#2E7D32', color: 'white', marginBottom: '16px', display: 'inline-block' }}>Nouveau Pôle</span>
                <h3 style={{ color: 'var(--text-charcoal)', marginBottom: '16px', fontSize: '1.8rem' }}>Pisciculture & Aquaponie</h3>
                <p style={{ marginBottom: '24px', lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-charcoal)' }}>
                  Découvrez notre système innovant d'élevage de poissons (Tilapia et Poisson-chat) couplé à la culture de légumes. L'eau enrichie par les poissons irrigue nos plantes maraîchères en circuit fermé, filtrant l'eau naturellement sans engrais chimiques.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2E7D32' }}></div>
                    <span>Élevage respectueux de l'environnement</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2E7D32' }}></div>
                    <span>Économie d'eau jusqu'à 90% via circuit fermé</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2E7D32' }}></div>
                    <span>Production saine et locale pour les communautés</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Séparateur décoratif si les deux fermes sont affichées */}
      {activeFermeFilter === 'all' && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
          <Leaf size={32} color="var(--border-color)" />
        </div>
      )}

      {/* Ferme de Ngaparou */}
      {(activeFermeFilter === 'all' || activeFermeFilter === 'ngaparou') && (
        <div className="section container animate-fade" style={{ paddingTop: activeFermeFilter === 'all' ? '0' : '60px' }}>
          <div className="card" style={{ padding: '0', overflow: 'hidden', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <div className="grid-2" style={{ alignItems: 'stretch', gap: 0 }}>
              
              <div className="farm-card-content" style={{ padding: '60px 40px', backgroundColor: 'var(--white)' }}>
                <span className="badge badge-ngaparou" style={{ marginBottom: '24px', fontSize: '0.9rem', display: 'inline-block' }}>Site touristique & aménagements</span>
                <h2 style={{ color: 'var(--accent)', marginBottom: '16px', fontSize: '2.2rem' }}>Oasis de Ngaparou (Mbour)</h2>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '32px', fontSize: '1.1rem' }}>
                  <MapPin size={22} color="var(--accent)" />
                  <span>Petite-Côte, Sénégal</span>
                </div>
                
                <p style={{ marginBottom: '32px', lineHeight: 1.8, fontSize: '1.05rem', color: 'var(--text-charcoal)' }}>
                  Niché sur la Petite-Côte, le site de Ngaparou est notre vitrine d'écotourisme et de paysagisme. Idéalement situé pour les vacanciers, il offre un cadre de détente exceptionnel tout en démontrant qu'un jardin ornemental peut être à la fois magnifique et écologique.
                </p>
                
                <div style={{ backgroundColor: '#FDF5F1', padding: '24px', borderRadius: 'var(--radius-md)', marginBottom: '0' }}>
                  <h4 style={{ marginBottom: '16px', color: 'var(--text-charcoal)' }}>Spécialités du site :</h4>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <CheckCircle size={22} color="var(--accent)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '1.05rem' }}>Campings, tentes sahariennes et séjours nature immersifs.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <CheckCircle size={22} color="var(--accent)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '1.05rem' }}>Showroom d'aménagement d'espaces verts (plantes ornementales).</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <CheckCircle size={22} color="var(--accent)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '1.05rem' }}>Vente de plantes en pots pour l'intérieur et balcons.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="farm-card-image-wrapper" style={{ position: 'relative', height: '100%', minHeight: '400px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <img 
                  src="/images/whatsapp_image_2026_05_27_at_19.12.54.webp" 
                  alt="Écotourisme à Ngaparou" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', flex: 1 }} 
                />
                <div style={{ position: 'absolute', bottom: '24px', right: '24px', backgroundColor: 'rgba(255,255,255,0.95)', padding: '20px 30px', borderRadius: 'var(--radius-md)', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', display: 'flex', gap: '24px', backdropFilter: 'blur(5px)' }}>
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ color: 'var(--accent)', margin: 0, fontSize: '1.8rem' }}>100%</h3>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-charcoal)', fontWeight: 'bold' }}>Solaire</span>
                  </div>
                  <div style={{ width: '1px', backgroundColor: 'var(--border-color)' }}></div>
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ color: 'var(--accent)', margin: 0, fontSize: '1.8rem' }}>4</h3>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-charcoal)', fontWeight: 'bold' }}>Zones Camping</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section Géolocalisation avec OpenStreetMap */}
      <section className="section" style={{ backgroundColor: '#F9FBF9', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', marginBottom: '16px' }}>Géolocalisation</span>
            <h2 style={{ color: 'var(--text-charcoal)', marginBottom: '16px' }}>Où nous trouver ?</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
              Repérez nos deux sites sur la carte avec OpenStreetMap. Que vous soyez sur la Grande Côte ou la Petite-Côte, il y a toujours une Ferme des Niayes à proximité.
            </p>
          </div>
          
          <MapLocation activeFermeFilter={activeFermeFilter} />
        </div>
      </section>

    </div>
  );
};

export default Farms;
