import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  GraduationCap, Calendar, Clock, MapPin, CheckCircle, 
  ChevronLeft, ChevronRight, Users, ArrowRight, BookOpen, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PaymentSimulator from '../components/PaymentSimulator';

const Trainings = () => {
  const { trainings, enrollInTraining, activeFermeFilter } = useContext(AppContext);

  const filteredTrainings = trainings.filter(t => {
    if (activeFermeFilter === 'all') return true;
    if (activeFermeFilter === 'mboro') return t.location.includes('Mboro');
    if (activeFermeFilter === 'ngaparou') return t.location.includes('Ngaparou');
    return true;
  });

  const [selectedTraining, setSelectedTraining] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({ name: '', phone: '', email: '' });
  const [showPayment, setShowPayment] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Galerie de photos thématiques formations
  const photos = [
    {
      url: '/images/training.jpg',
      title: 'Atelier pratique de maraîchage',
      desc: "Nos stagiaires apprennent les gestes de greffe, d'arrosage au goutte-à-goutte et de préparation de pépinière directement sur le terrain."
    },
    {
      url: '/images/aquaponics.jpg',
      title: 'Formation en aquaponie',
      desc: "Les participants construisent leur propre mini-système aquaponique et repartent avec tous les plans et une fiche technique complète."
    },
    {
      url: '/images/compost.jpg',
      title: 'Cours de compostage aérobie',
      desc: "Module pratique de fabrication de compost et de biochar à partir de déchets agricoles pour régénérer les sols sahéliens."
    }
  ];

  const handleNextPhoto = () => setActivePhotoIdx((prev) => (prev + 1) % photos.length);
  const handlePrevPhoto = () => setActivePhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    enrollInTraining(registrationForm, selectedTraining.id, 'full');
    setShowPayment(false);
    setSelectedTraining(null);
    setRegistrationForm({ name: '', phone: '', email: '' });
    setSuccessMessage(`Félicitations ${registrationForm.name} ! Votre inscription à la formation est confirmée.`);
    setTimeout(() => setSuccessMessage(''), 6000);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-sand)', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* ─── HERO SECTION ─── */}
      <section style={{
        position: 'relative',
        height: '55vh',
        minHeight: '420px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
        color: 'white',
        backgroundImage: 'url("/images/training.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(230, 81, 0, 0.82) 0%, rgba(27, 94, 32, 0.65) 100%)', zIndex: 0 }}></div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
          <span className="badge" style={{ backgroundColor: 'var(--accent)', color: 'white', marginBottom: '20px', fontSize: '0.9rem', padding: '7px 20px', letterSpacing: '1px', display: 'inline-block' }}>
            Partage de savoirs
          </span>
          <h1 style={{ color: 'white', marginBottom: '20px', fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', lineHeight: 1.1 }}>
            Formations Pratiques
          </h1>
          <p style={{ margin: '0 auto', fontSize: '1.2rem', color: '#FFE0B2', maxWidth: '700px', lineHeight: 1.7 }}>
            Apprenez les techniques de l'agroécologie directement sur le terrain. Des formations conçues pour les débutants curieux comme pour les professionnels.
          </p>
          <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#catalogue-formations" className="btn btn-accent" style={{ padding: '14px 32px', borderRadius: '999px', fontSize: '1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <GraduationCap size={18} /> Voir les formations
            </a>
            <Link to="/services" className="btn" style={{ padding: '14px 32px', borderRadius: '999px', fontSize: '1rem', border: '1px solid white', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Demander une formation
            </Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '60px' }}>

        {/* ─── PRÉSENTATION ─── */}
        <div className="grid-2" style={{ gap: '40px', alignItems: 'center', marginBottom: '70px' }}>
          <div className="card" style={{ border: 'none', padding: '44px', backgroundColor: 'var(--white)', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
            <span className="badge" style={{ backgroundColor: '#E65100', color: 'white', marginBottom: '16px' }}>Pédagogie par le terrain</span>
            <h2 style={{ color: 'var(--text-charcoal)', marginBottom: '24px', fontSize: '2rem' }}>Apprendre en faisant</h2>
            <p style={{ lineHeight: 1.9, fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Nos formations ont lieu directement dans nos fermes de <strong>Mboro (Khondio)</strong> et <strong>Ngaparou</strong>. Ici, pas de théorie abstraite : chaque concept est immédiatement mis en pratique sur les cultures réelles de la ferme.
            </p>
            <p style={{ lineHeight: 1.9, fontSize: '1.05rem', color: 'var(--text-muted)' }}>
              Nos formateurs sont des agriculteurs expérimentés et des agronomes spécialisés en agroécologie sahélienne. Chaque stagiaire repart avec un kit pédagogique complet et un accès au réseau alumni de la ferme.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '28px' }}>
              {['Ateliers en petits groupes (max 15 personnes)', 'Certificat de participation officiel', 'Suivi post-formation sur 3 mois', 'Kit de démarrage offert à chaque participant'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: 'var(--text-charcoal)' }}>
                  <CheckCircle size={18} color="#E65100" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '440px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', position: 'relative' }}>
            <img
              src="/images/aquaponics.jpg"
              alt="Formation agroécologie"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', backgroundColor: 'rgba(0,0,0,0.65)', color: 'white', padding: '12px 20px', borderRadius: '8px', backdropFilter: 'blur(5px)', fontSize: '0.9rem' }}>
              Atelier de formation pratique sur les systèmes aquaponiques — Ferme de Mboro.
            </div>
          </div>
        </div>

        {/* ─── CHIFFRES CLÉS ─── */}
        <div style={{ marginBottom: '70px' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span className="badge" style={{ backgroundColor: '#E65100', color: 'white', marginBottom: '12px' }}>Notre impact</span>
            <h2 style={{ fontSize: '2rem', color: 'var(--text-charcoal)', margin: 0 }}>Ce que nos formations vous apportent</h2>
          </div>
          <div className="grid-3" style={{ gap: '28px' }}>
            {[
              { title: 'Terrain 100% pratique', desc: "Plus de 80% du temps de formation est consacré à des travaux pratiques directement sur les parcelles en production.", icon: <BookOpen size={24} color="#E65100" />, bg: '#FFF3E0' },
              { title: 'Instructeurs experts', desc: "Chaque formation est animée par un spécialiste ayant au minimum 10 ans d'expérience en agroécologie africaine.", icon: <Star size={24} color="#8E24AA" />, bg: '#F3E5F5' },
              { title: 'Réseau de 300+ alumnis', desc: "Rejoignez notre communauté d'agriculteurs et entrepreneurs verts actifs à travers tout le Sénégal.", icon: <Users size={24} color="var(--primary)" />, bg: 'var(--primary-light)' }
            ].map((s, i) => (
              <div key={i} className="card hover-scale" style={{ border: 'none', padding: '32px', backgroundColor: 'var(--white)', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--text-charcoal)' }}>{s.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── GALERIE INTERACTIVE ─── */}
        <div className="card" style={{ border: 'none', backgroundColor: 'var(--white)', padding: '50px', marginBottom: '70px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="badge" style={{ backgroundColor: '#E65100', color: 'white', marginBottom: '12px' }}>Formations en images</span>
            <h2 style={{ color: 'var(--text-charcoal)', margin: 0, fontSize: '2rem' }}>Nos ateliers sur le terrain</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Vivez l'ambiance de nos formations immersives.</p>
          </div>
          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '420px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
            <img src={photos[activePhotoIdx].url} alt={photos[activePhotoIdx].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0) 100%)', color: 'white', padding: '40px 32px 32px', zIndex: 2 }}>
              <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '8px' }}>{photos[activePhotoIdx].title}</h3>
              <p style={{ color: '#FFE0B2', margin: 0, fontSize: '0.98rem', lineHeight: '1.5', maxWidth: '700px' }}>{photos[activePhotoIdx].desc}</p>
            </div>
            <button onClick={handlePrevPhoto} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', backdropFilter: 'blur(5px)', zIndex: 3, transition: 'background 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.4)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}>
              <ChevronLeft size={24} />
            </button>
            <button onClick={handleNextPhoto} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', backdropFilter: 'blur(5px)', zIndex: 3, transition: 'background 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.4)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}>
              <ChevronRight size={24} />
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
            {photos.map((_, idx) => (
              <button key={idx} onClick={() => setActivePhotoIdx(idx)} style={{ width: '12px', height: '12px', borderRadius: '50%', border: 'none', backgroundColor: idx === activePhotoIdx ? '#E65100' : '#CFD8DC', cursor: 'pointer', transition: 'background 0.3s' }} />
            ))}
          </div>
        </div>

        {/* ─── MESSAGE DE SUCCÈS ─── */}
        {successMessage && (
          <div className="animate-slide" style={{ backgroundColor: '#E8F5E9', border: '2px solid var(--primary)', padding: '24px', borderRadius: 'var(--radius-md)', textAlign: 'center', marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CheckCircle size={48} color="var(--primary)" style={{ marginBottom: '16px' }} />
            <h3 style={{ color: 'var(--primary)', margin: 0 }}>{successMessage}</h3>
          </div>
        )}

        {/* ─── CATALOGUE DES FORMATIONS ─── */}
        <div id="catalogue-formations">
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span className="badge" style={{ backgroundColor: '#E65100', color: 'white', marginBottom: '12px' }}>Sessions disponibles</span>
            <h2 style={{ fontSize: '2rem', color: 'var(--text-charcoal)', margin: 0 }}>Nos prochaines formations</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Cliquez sur "S'inscrire" pour réserver votre place.</p>
          </div>

          <div className="grid-3" style={{ marginBottom: '60px', gap: '28px' }}>
            {filteredTrainings.map(training => (
              <div key={training.id} className="card hover-scale" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', border: 'none', boxShadow: '0 10px 28px rgba(0,0,0,0.06)' }}>
                <div style={{ height: '230px', position: 'relative', overflow: 'hidden' }}>
                  <img src={training.image} alt={training.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: 'var(--white)', padding: '7px 14px', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', color: '#E65100', boxShadow: '0 4px 8px rgba(0,0,0,0.12)', fontSize: '0.85rem' }}>
                    <GraduationCap size={16} /> Places limitées
                  </div>
                  {training.availablePlaces > 0 && training.availablePlaces <= 5 && (
                    <div style={{ position: 'absolute', bottom: '12px', left: '12px', backgroundColor: '#E53935', color: 'white', padding: '5px 12px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700 }}>
                      Seulement {training.availablePlaces} places restantes !
                    </div>
                  )}
                </div>
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '24px' }}>
                  <h3 style={{ margin: 0, marginBottom: '14px', fontSize: '1.3rem', color: 'var(--text-charcoal)', lineHeight: '1.4' }}>{training.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px', flexGrow: 1, lineHeight: 1.6 }}>{training.description}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', padding: '16px', backgroundColor: '#FFF3E0', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', color: 'var(--text-muted)', borderLeft: '3px solid #E65100' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={17} color="#E65100" /> <strong>Dates :</strong> {training.date}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={17} color="#E65100" /> <strong>Durée :</strong> {training.duration}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={17} color="#E65100" /> <strong>Lieu :</strong> {training.location}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Users size={17} color="#E65100" /> <strong>Places :</strong> {training.availablePlaces} disponibles</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '18px' }}>
                    <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#E65100' }}>
                      {training.price.toLocaleString('fr-FR')} FCFA
                    </span>
                    <button
                      className="btn"
                      style={{ padding: '11px 22px', backgroundColor: '#E65100', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '999px', fontWeight: 700 }}
                      onClick={() => {
                        setSelectedTraining(training);
                        setTimeout(() => {
                          document.getElementById('inscription-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 100);
                      }}
                    >
                      <GraduationCap size={18} /> S'inscrire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTrainings.length === 0 && (
            <div className="card text-center" style={{ padding: '60px', alignItems: 'center', border: 'none', marginBottom: '60px' }}>
              <GraduationCap size={64} color="var(--border-color)" style={{ marginBottom: '24px' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Aucune formation disponible pour ce site</h3>
              <p style={{ color: 'var(--text-muted)' }}>Sélectionnez "Toutes nos fermes" pour voir toutes les sessions disponibles.</p>
            </div>
          )}
        </div>

        {/* ─── FORMULAIRE D'INSCRIPTION ─── */}
        {selectedTraining && (
          <div id="inscription-form" className="card animate-fade" style={{ maxWidth: '700px', margin: '0 auto 60px', border: 'none', borderTop: '4px solid #E65100', boxShadow: '0 15px 40px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '8px', color: '#E65100', fontSize: '1.5rem' }}>
              S'inscrire : {selectedTraining.title}
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '28px', fontSize: '0.95rem' }}>
              Remplissez vos coordonnées pour réserver votre place. Paiement sécurisé via Wave ou Orange Money.
            </p>
            <form onSubmit={handleRegistrationSubmit}>
              <div className="form-group">
                <label className="form-label">Nom et Prénom *</label>
                <input type="text" className="form-control" required value={registrationForm.name} onChange={e => setRegistrationForm({ ...registrationForm, name: e.target.value })} placeholder="Ex : Mamadou Diallo" />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Numéro de téléphone *</label>
                  <input type="tel" className="form-control" required placeholder="+221 77 000 00 00" value={registrationForm.phone} onChange={e => setRegistrationForm({ ...registrationForm, phone: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Adresse Email *</label>
                  <input type="email" className="form-control" required placeholder="votre.email@example.com" value={registrationForm.email} onChange={e => setRegistrationForm({ ...registrationForm, email: e.target.value })} />
                </div>
              </div>
              <div style={{ backgroundColor: '#FFF3E0', padding: '18px', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', marginBottom: '28px', borderLeft: '4px solid #E65100' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-charcoal)' }}>Total à payer :</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#E65100' }}>{selectedTraining.price.toLocaleString('fr-FR')} FCFA</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedTraining(null)}>Annuler</button>
                <button type="submit" className="btn" style={{ backgroundColor: '#E65100', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 28px' }}>
                  <ArrowRight size={18} /> Payer l'inscription
                </button>
              </div>
            </form>
          </div>
        )}

        <PaymentSimulator
          isOpen={showPayment}
          amount={selectedTraining ? selectedTraining.price : 0}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />

        {/* ─── CTA FINAL ─── */}
        <div className="card" style={{
          border: 'none',
          background: 'linear-gradient(135deg, #BF360C 0%, #E64A19 100%)',
          color: 'white',
          padding: '52px',
          borderRadius: '24px',
          textAlign: 'center',
          boxShadow: '0 15px 40px rgba(191,54,12,0.25)'
        }}>
          <span className="badge" style={{ backgroundColor: 'var(--accent)', color: 'white', marginBottom: '16px' }}>Formation sur-mesure</span>
          <h2 style={{ color: 'white', fontSize: '2.2rem', marginBottom: '16px' }}>Besoin d'une formation spécifique ?</h2>
          <p style={{ maxWidth: '620px', margin: '0 auto 32px', color: '#FFE0B2', fontSize: '1.1rem', lineHeight: '1.7' }}>
            Organisez une session de formation privée pour votre entreprise, votre collectivité ou votre coopérative agricole. Nous adaptons le contenu à votre contexte.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/services" className="btn btn-accent" style={{ padding: '16px 32px', borderRadius: '999px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <ArrowRight size={20} /> Demander un programme
            </Link>
            <Link to="/nursery" className="btn" style={{ padding: '16px 32px', borderRadius: '999px', fontSize: '1rem', border: '1px solid white', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Voir la pépinière
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Trainings;
