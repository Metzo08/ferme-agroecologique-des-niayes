import React, { useState, useContext } from 'react';
import SEO from '../components/SEO';
import { AppContext } from '../context/AppContext';
import { Wrench, Leaf, Settings, Send, CheckCircle, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    icon: <Leaf size={28} />,
    color: '#2E7D32',
    colorLight: '#E8F5E9',
    title: "Aménagement d'espaces verts publiques et jardins",
    description: "Conception paysagère, choix de plantes adaptées au climat local, installation de systèmes d'irrigation goutte-à-goutte et pose de gazon naturel.",
    image: '/images/garden.jpg',
    points: [
      "Plans de végétalisation adaptés aux zones sahéliennes",
      "Sélection de plantes résistantes à la sécheresse",
      "Pose de gazon naturel et de couvre-sols écologiques",
      "Installation d'arrosage automatique solaire",
    ]
  },
  {
    icon: <Settings size={28} />,
    color: '#E65100',
    colorLight: '#FFF3E0',
    title: "Entretien des cultures & suivi technique",
    description: "Nos agronomes se déplacent pour diagnostiquer vos sols, traiter écologiquement les maladies et optimiser vos rendements de manière naturelle.",
    image: '/images/agronomy.jpg',
    points: [
      "Diagnostic pédologique et analyse de sol",
      "Traitement phytosanitaire 100% biologique",
      "Optimisation des rendements maraîchers",
      "Rapports de suivi agronomique mensuels",
    ]
  },
  {
    icon: <Wrench size={28} />,
    color: '#1565C0',
    colorLight: '#E3F2FD',
    title: "Travaux de constructions écologiques",
    description: "Réalisation de poulaillers, bergeries, hangars de stockage et clôtures intégrées respectant les normes de bien-être animal et d'éco-construction.",
    image: '/images/construction.jpg',
    points: [
      "Poulaillers et bergeries en matériaux locaux",
      "Hangars de stockage ventilés naturellement",
      "Clôtures végétales et brise-vents",
      "Structures bambou et bois certifié FSC",
    ]
  }
];

const Services = () => {
  const { submitDevisRequest } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', serviceType: 'amenagement', description: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeService, setActiveService] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitDevisRequest(formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', email: '', serviceType: 'amenagement', description: '' });
    }, 5000);
  };

  return (
    <div>
      <SEO title="Aménagements & Services" description="Services d’aménagement d’espaces verts, paysagisme, création de jardins écologiques et agroforesterie pour particuliers et professionnels." keywords="aménagement espace vert Sénégal, paysagiste, création jardin, agroforesterie" />

      {/* ── Hero ── */}
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
        backgroundImage: 'url("/images/whatsapp_image_2026_05_27_at_19.12.44.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(21,101,192,0.82) 0%, rgba(27,94,32,0.65) 55%, rgba(0,0,0,0.5) 100%)',
          zIndex: 0
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '820px', textShadow: '0 2px 14px rgba(0,0,0,0.5)' }}>
          <span style={{
            display: 'inline-block', backgroundColor: '#1565C0', color: 'white',
            borderRadius: '999px', padding: '7px 22px', fontSize: '0.95rem',
            fontWeight: 700, marginBottom: '22px', letterSpacing: '0.5px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
          }}>🔧 Aménagements & conseils</span>
          <h1 style={{ color: 'white', marginBottom: '18px', fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', lineHeight: 1.1 }}>
            Services techniques
          </h1>
          <p style={{ margin: '0 auto 32px', fontSize: '1.2rem', color: 'rgba(255,255,255,0.92)', maxWidth: '680px', lineHeight: 1.75 }}>
            Au-delà de la production, nous accompagnons les particuliers, entreprises et collectivités dans la réalisation de leurs projets écologiques.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {[
              { value: '3', label: 'Services' },
              { value: '48h', label: 'Délai de réponse' },
              { value: '100%', label: 'Écologique' },
              { value: '2', label: 'Sites' },
            ].map((s, i) => (
              <div key={i} style={{
                backgroundColor: 'rgba(15, 23, 42, 0.55)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '14px',
                padding: '12px 24px',
                textAlign: 'center',
                minWidth: '100px',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.25)'
              }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.78rem', color: '#E2E8F0', fontWeight: 600, marginTop: '6px', letterSpacing: '0.5px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nos 3 services (cartes image) ── */}
      <section style={{ backgroundColor: 'var(--bg-sand)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', marginBottom: '14px' }}>Notre expertise</span>
            <h2 style={{ color: 'var(--text-charcoal)', marginBottom: '14px' }}>Trois domaines d'intervention</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              Chaque mission est conduite par nos techniciens spécialisés, avec des méthodes 100% agroécologiques.
            </p>
          </div>

          <div className="services-container">
            {SERVICES.map((srv, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx} 
                  className={`service-card animate-slide ${isEven ? '' : 'reverse'}`}
                >
                  {/* Image côté alterné */}
                  <div className={`service-card-image-wrapper ${isEven ? 'order-left' : 'order-right'}`}>
                    <img 
                      src={srv.image} 
                      alt={srv.title} 
                      className="service-card-image" 
                    />
                  </div>

                  {/* Texte */}
                  <div className={`service-card-content ${isEven ? 'order-right' : 'order-left'}`}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '16px',
                    backgroundColor: srv.colorLight, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: srv.color, marginBottom: '20px', boxShadow: `0 4px 12px ${srv.color}22`
                  }}>
                    {srv.icon}
                  </div>
                  <h3 style={{ color: 'var(--text-charcoal)', marginBottom: '12px', fontSize: '1.35rem', lineHeight: 1.3 }}>{srv.title}</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.7 }}>{srv.description}</p>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {srv.points.map((pt, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-charcoal)' }}>
                        <CheckCircle size={18} color={srv.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      setFormData(f => ({ ...f, serviceType: ['amenagement','suivi','construction'][idx] }));
                      document.getElementById('devis-form').scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      marginTop: '28px', alignSelf: 'flex-start',
                      backgroundColor: srv.color, color: 'white', border: 'none',
                      borderRadius: '999px', padding: '12px 28px', cursor: 'pointer',
                      fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px',
                      boxShadow: `0 6px 18px ${srv.color}44`, transition: 'transform 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    Demander un devis <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </section>

      {/* ── Formulaire de devis ── */}
      <section id="devis-form" style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #E3F2FD 0%, #E8F5E9 100%)',
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge" style={{ backgroundColor: '#1565C0', color: 'white', marginBottom: '14px' }}>Gratuit & sans engagement</span>
            <h2 style={{ color: 'var(--text-charcoal)', marginBottom: '12px' }}>Demander un devis</h2>
            <p style={{ maxWidth: '550px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              Décrivez votre projet. Notre équipe vous répond sous 48h ouvrées avec une proposition personnalisée.
            </p>
          </div>

          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div className="card" style={{
              border: 'none', borderTop: '5px solid #1565C0',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)', borderRadius: '20px', padding: '48px'
            }}>
              {isSubmitted ? (
                <div className="animate-fade" style={{ textAlign: 'center', padding: '40px 0' }}>
                  <CheckCircle size={64} color="var(--primary)" style={{ marginBottom: '20px' }} />
                  <h3 style={{ color: 'var(--primary)', marginBottom: '12px' }}>Demande envoyée !</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>Notre équipe étudiera votre projet et vous contactera sous 48h ouvrées.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid-2" style={{ gap: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">Nom complet / entreprise</label>
                      <input type="text" className="form-control" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Téléphone</label>
                      <input type="tel" className="form-control" required placeholder="+221 77 000 00 00" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Type de service</label>
                    <select className="form-control" value={formData.serviceType} onChange={e => setFormData({...formData, serviceType: e.target.value})}>
                      <option value="amenagement">Aménagement jardin / espaces verts</option>
                      <option value="suivi">Suivi technique & agronomique</option>
                      <option value="construction">Construction rurale</option>
                      <option value="autre">Autre demande</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description du projet</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      required
                      placeholder="Décrivez votre besoin, la surface concernée, la localisation, vos contraintes..."
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn" style={{
                    backgroundColor: '#1565C0', color: 'white', width: '100%',
                    display: 'flex', justifyContent: 'center', gap: '10px',
                    padding: '16px', fontSize: '1.1rem', borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(21,101,192,0.35)'
                  }}>
                    <Send size={20} /> Envoyer la demande
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
