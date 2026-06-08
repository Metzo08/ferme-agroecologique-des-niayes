import React, { useState, useEffect } from 'react';
import { Handshake, Map, Send, Users, Briefcase, Building, CheckCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const Partnership = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'collaborateur',
    message: ''
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setSuccess(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2E7D32', '#F9A826', '#1565C0']
      });
      setFormData({ name: '', email: '', phone: '', type: 'collaborateur', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    }, 800);
  };

  return (
    <div className="page-transition">

      {/* ===== Hero Section — nature photo + text card ===== */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        height: 'clamp(480px, 65vh, 650px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>
        {/* Photo de nature en fond */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1400&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        {/* Très léger voile vert pour renforcer l'identité */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, rgba(27,94,32,0.35) 0%, rgba(0,0,0,0.18) 100%)'
        }} />

        {/* Carte texte avec effet verre dépoli */}
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: '720px',
          margin: '0 20px',
          backgroundColor: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(255,255,255,0.45)',
          borderRadius: '24px',
          padding: 'clamp(32px, 5vw, 56px) clamp(24px, 5vw, 60px)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)'
        }}>
          {/* Pill badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            backgroundColor: 'var(--primary)',
            color: 'white', padding: '6px 18px',
            borderRadius: '50px', fontWeight: 700, fontSize: '0.85rem',
            marginBottom: '22px', letterSpacing: '0.5px'
          }}>
            <Handshake size={15} />
            Rejoignez notre réseau
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 800,
            marginBottom: '18px',
            lineHeight: 1.15,
            color: 'white',
            textShadow: '0 2px 12px rgba(0,0,0,0.4)'
          }}>
            Partenariat & foncier
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            lineHeight: 1.75,
            color: 'white',
            textShadow: '0 1px 6px rgba(0,0,0,0.5)',
            marginBottom: '32px'
          }}>
            Rejoignez l'aventure des Fermes des Niayes en tant que collaborateur ou investissez dans l'avenir grâce à la vente de terrains agricoles à fort potentiel.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#collaborateurs" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              backgroundColor: 'var(--primary)', color: 'white',
              padding: '13px 28px', borderRadius: '50px',
              fontWeight: 700, fontSize: '0.95rem',
              boxShadow: '0 6px 20px rgba(46,125,50,0.45)',
              textDecoration: 'none'
            }}>
              Devenir partenaire <ArrowRight size={17} />
            </a>
            <a href="#contact-form" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              backgroundColor: 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(8px)',
              border: '2px solid rgba(255,255,255,0.7)',
              color: 'white',
              padding: '13px 28px', borderRadius: '50px',
              fontWeight: 700, fontSize: '0.95rem',
              textDecoration: 'none'
            }}>
              Nous contacter
            </a>
          </div>
        </div>
      </section>

      {/* ===== Profils recherchés ===== */}
      <section id="collaborateurs" style={{ padding: 'clamp(48px, 8vw, 80px) 0', backgroundColor: 'var(--bg-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              backgroundColor: '#E3F2FD', color: '#1565C0',
              padding: '6px 16px', borderRadius: '50px',
              fontWeight: 700, fontSize: '0.85rem', marginBottom: '16px'
            }}>
              <Users size={16} /> Nous rejoindre
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: 'var(--text-charcoal)', marginBottom: '12px' }}>
              Devenez collaborateur ou partenaire
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.7 }}>
              Nous recherchons constamment de nouveaux talents et des partenaires stratégiques pour développer l'agroécologie au Sénégal.
            </p>
          </div>

          <div className="grid-3" style={{ gap: '24px' }}>
            {[
              {
                icon: <Briefcase size={30} color="var(--primary)" />,
                bg: 'var(--primary-light)',
                title: 'Experts & techniciens',
                desc: 'Agronomes, spécialistes en irrigation, pépiniéristes passionnés par le développement durable.'
              },
              {
                icon: <Handshake size={30} color="var(--accent)" />,
                bg: 'var(--accent-light)',
                title: 'Partenaires commerciaux',
                desc: 'Revendeurs, supermarchés ou transformateurs locaux souhaitant distribuer nos produits bio.'
              },
              {
                icon: <Building size={30} color="#1565C0" />,
                bg: '#E3F2FD',
                title: 'Investisseurs & ONG',
                desc: 'Projets d\'aménagement, financement d\'initiatives vertes et responsabilité sociétale (RSE).'
              }
            ].map((item, i) => (
              <div key={i} className="card hover-scale" style={{
                textAlign: 'center', padding: '36px 28px',
                border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                borderTop: '4px solid transparent',
                borderImage: 'none'
              }}>
                <div style={{
                  width: '68px', height: '68px',
                  backgroundColor: item.bg,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  {item.icon}
                </div>
                <h3 style={{ marginBottom: '12px', color: 'var(--text-charcoal)', fontSize: '1.1rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65 }}>{item.desc}</p>
                <a href="#contact-form" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  marginTop: '20px', color: 'var(--primary)', fontWeight: 600,
                  fontSize: '0.9rem', textDecoration: 'none'
                }}>
                  Nous écrire <ArrowRight size={15} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Vente de terrains agricoles ===== */}
      <section style={{ padding: 'clamp(48px, 8vw, 80px) 0', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              backgroundColor: 'var(--accent-light)', color: 'var(--accent)',
              padding: '6px 16px', borderRadius: '50px',
              fontWeight: 700, fontSize: '0.85rem', marginBottom: '16px'
            }}>
              <Map size={16} /> Investissement foncier
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: 'var(--text-charcoal)', marginBottom: '12px' }}>
              Vente de terrains agricoles
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.7 }}>
              Vous cherchez à investir dans l'agriculture ? Nous proposons des terrains sélectionnés pour leur potentiel agronomique.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            alignItems: 'center',
            backgroundColor: 'var(--bg-light)',
            borderRadius: '24px',
            padding: 'clamp(24px, 4vw, 48px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
          }}>
            <div>
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop"
                alt="Terrain agricole fertile"
                style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', height: '360px', boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
              />
            </div>
            <div>
              <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: 'var(--text-charcoal)', marginBottom: '16px', lineHeight: 1.3 }}>
                Des terres fertiles et stratégiques
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '28px' }}>
                Acheter un terrain avec l'accompagnement des Fermes des Niayes, c'est s'assurer d'acquérir une parcelle adaptée à vos projets (maraîchage, arboriculture, aviculture). Nous sélectionnons des terres disposant d'un accès à l'eau et d'un sol favorable.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  'Terrains avec potentiel d\'irrigation (forage possible)',
                  'Accompagnement agronomique post-achat disponible',
                  'Aide à l\'aménagement et à la création de plans',
                  'Zones à fort potentiel : Niayes, Petite Côte'
                ].map((point, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--text-charcoal)' }}>
                    <CheckCircle size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ lineHeight: 1.5 }}>{point}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact-form" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Recevoir notre catalogue <Send size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Formulaire de contact ===== */}
      <section id="contact-form" style={{ padding: 'clamp(48px, 8vw, 80px) 0', backgroundColor: 'var(--bg-light)' }}>
        <div className="container">
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            {/* En-tête de la section formulaire */}
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: 'var(--text-charcoal)', marginBottom: '10px' }}>
                Travaillons ensemble
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Remplissez ce formulaire et notre équipe vous recontactera très rapidement.
              </p>
            </div>

            <div className="card" style={{ padding: 'clamp(24px, 5vw, 48px)', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.06)' }}>
              {success ? (
                <div style={{ backgroundColor: 'var(--primary-light)', padding: '36px', borderRadius: '16px', textAlign: 'center' }}>
                  <div style={{
                    width: '64px', height: '64px', backgroundColor: 'var(--primary)',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px'
                  }}>
                    <CheckCircle size={32} color="white" />
                  </div>
                  <h4 style={{ color: 'var(--primary)', fontSize: '1.4rem', marginBottom: '10px' }}>Demande envoyée !</h4>
                  <p style={{ color: '#2E7D32', margin: 0 }}>Nous avons bien reçu votre message. Nous vous contacterons sous 48h.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-charcoal)', fontSize: '0.95rem' }}>Nom complet *</label>
                      <input
                        type="text" name="name" value={formData.name} onChange={handleChange} required
                        style={{ width: '100%', padding: '12px 16px', border: '1.5px solid var(--border-color)', borderRadius: '10px', fontSize: '1rem', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                        placeholder="Votre nom complet"
                        onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-charcoal)', fontSize: '0.95rem' }}>Téléphone *</label>
                      <input
                        type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                        style={{ width: '100%', padding: '12px 16px', border: '1.5px solid var(--border-color)', borderRadius: '10px', fontSize: '1rem', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                        placeholder="+221 7X XXX XX XX"
                        onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-charcoal)', fontSize: '0.95rem' }}>Adresse email</label>
                    <input
                      type="email" name="email" value={formData.email} onChange={handleChange}
                      style={{ width: '100%', padding: '12px 16px', border: '1.5px solid var(--border-color)', borderRadius: '10px', fontSize: '1rem', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                      placeholder="votre@email.com"
                      onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-charcoal)', fontSize: '0.95rem' }}>Objet de votre demande *</label>
                    <select
                      name="type" value={formData.type} onChange={handleChange}
                      style={{ width: '100%', padding: '12px 16px', border: '1.5px solid var(--border-color)', borderRadius: '10px', fontSize: '1rem', backgroundColor: 'white', boxSizing: 'border-box' }}
                    >
                      <option value="collaborateur">Devenir collaborateur / expert</option>
                      <option value="partenaire">Devenir partenaire commercial</option>
                      <option value="terrain">Intérêt pour l'achat de terrains agricoles</option>
                      <option value="autre">Autre (préciser dans le message)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-charcoal)', fontSize: '0.95rem' }}>Votre message *</label>
                    <textarea
                      name="message" value={formData.message} onChange={handleChange} required rows="5"
                      style={{ width: '100%', padding: '12px 16px', border: '1.5px solid var(--border-color)', borderRadius: '10px', fontSize: '1rem', resize: 'vertical', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                      placeholder="Décrivez brièvement votre projet ou votre profil..."
                      onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontSize: '1.05rem', padding: '15px', borderRadius: '12px' }}>
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

export default Partnership;
