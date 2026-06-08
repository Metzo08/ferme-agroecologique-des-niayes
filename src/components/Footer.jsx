import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Camera, Users, Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--text-charcoal)', color: 'white', paddingTop: '48px', paddingBottom: '20px', marginTop: 'auto' }}>
      <div className="container">

        {/* Grid responsive footer */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '32px',
          marginBottom: '40px'
        }}
          className="footer-grid-inner"
        >
          {/* À propos */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img
                src="/images/logo_faen.jpeg"
                alt="Logo FAEN"
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)', flexShrink: 0 }}
              />
              <h3 style={{ color: 'white', margin: 0, fontSize: '1.1rem', lineHeight: 1.2 }}>Ferme Agro Ecologie des Niayes</h3>
            </div>
            <p style={{ color: '#A0A0A0', fontSize: '0.9rem', marginBottom: '12px', lineHeight: 1.6 }}>
              Pionniers de la transition agroécologique au Sénégal.
              Plantes, formations, écotourisme et aménagement d'espaces verts.
            </p>
            <p style={{ color: '#808080', fontSize: '0.8rem', marginBottom: '20px', lineHeight: 1.4 }}>
              Ninéa : 004346583 | RC : SN.MBR.2025.A.3642
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="#" style={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '50%', display: 'flex', minHeight: 'auto' }}>
                <Users size={18} />
              </a>
              <a href="#" style={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '50%', display: 'flex', minHeight: 'auto' }}>
                <Camera size={18} />
              </a>
            </div>
          </div>

          {/* Liens Rapides */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '16px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { to: '/farms', label: 'Découvrir nos fermes' },
                { to: '/nursery', label: 'Catalogue pépinière' },
                { to: '/trainings', label: 'Formations pratiques' },
                { to: '/camping', label: 'Réservation camping' },
                { to: '/services', label: 'Aménagement & devis' },
                { to: '/partenariat', label: 'Partenariat & Foncier' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} style={{ color: '#A0A0A0', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#A0A0A0'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Site Mboro */}
          <div>
            <h4 style={{ color: 'var(--primary-light)', marginBottom: '16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-mboro" style={{ margin: 0 }}>Mboro</span>
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#A0A0A0', fontSize: '0.9rem' }}>
                <MapPin size={16} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>Zone des Niayes, Village de Khondio, Mboro, Sénégal</span>
              </li>
              <li>
                <a href="tel:+221771234567" style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#A0A0A0', fontSize: '0.9rem', transition: 'color 0.2s' }}
                   onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                   onMouseLeave={(e) => e.currentTarget.style.color = '#A0A0A0'}>
                  <Phone size={16} color="var(--primary)" />
                  <span>+221 77 123 45 67</span>
                </a>
              </li>
              <li>
                <a href="mailto:mboro@fermes-niayes.sn" style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#A0A0A0', fontSize: '0.9rem', transition: 'color 0.2s' }}
                   onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                   onMouseLeave={(e) => e.currentTarget.style.color = '#A0A0A0'}>
                  <Mail size={16} color="var(--primary)" />
                  <span>mboro@fermes-niayes.sn</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Site Ngaparou */}
          <div>
            <h4 style={{ color: 'var(--accent-light)', marginBottom: '16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-ngaparou" style={{ margin: 0 }}>Ngaparou</span>
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#A0A0A0', fontSize: '0.9rem' }}>
                <MapPin size={16} color="var(--accent)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>Route de la Somone, Ngaparou, Petite-Côte, Sénégal</span>
              </li>
              <li>
                <a href="tel:+221769876543" style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#A0A0A0', fontSize: '0.9rem', transition: 'color 0.2s' }}
                   onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                   onMouseLeave={(e) => e.currentTarget.style.color = '#A0A0A0'}>
                  <Phone size={16} color="var(--accent)" />
                  <span>+221 76 987 65 43</span>
                </a>
              </li>
              <li>
                <a href="mailto:ngaparou@fermes-niayes.sn" style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#A0A0A0', fontSize: '0.9rem', transition: 'color 0.2s' }}
                   onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                   onMouseLeave={(e) => e.currentTarget.style.color = '#A0A0A0'}>
                  <Mail size={16} color="var(--accent)" />
                  <span>ngaparou@fermes-niayes.sn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre basse */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ color: '#808080', fontSize: '0.82rem', margin: 0 }}>
            &copy; {new Date().getFullYear()} Ferme Agroécologique des Niayes. Développé par{' '}
            <a href="https://www.senecarte.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
              Sen-E-Carte
            </a>.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ color: '#808080', fontSize: '0.82rem', cursor: 'pointer' }}>Mentions légales</span>
            <span style={{ color: '#808080', fontSize: '0.82rem', cursor: 'pointer' }}>CGV</span>
          </div>
        </div>

      </div>

      {/* Style responsive inline pour le footer grid */}
      <style>{`
        .footer-grid-inner {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .footer-grid-inner {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .footer-grid-inner {
            grid-template-columns: 2fr 1fr 1fr 1fr;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
