import React, { useContext, useState } from 'react';
import SEO from '../components/SEO';
import { AppContext } from '../context/AppContext';
import { Tent, ShieldCheck, MapPin, Calendar, Users, Info } from 'lucide-react';
import PaymentSimulator from '../components/PaymentSimulator';

const Camping = () => {
  const { campingSpots, bookCampingSpot, activeFermeFilter } = useContext(AppContext);
  
  const filteredSpots = campingSpots.filter(spot => {
    if (activeFermeFilter === 'all') return true;
    return spot.location.toLowerCase() === activeFermeFilter.toLowerCase();
  });
  
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: '', phone: '', email: '', dateDebut: '', dateFin: ''
  });
  
  const [showPayment, setShowPayment] = useState(false);
  const [calculatedTotal, setCalculatedTotal] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  // Fonction pour calculer le nombre de nuits
  const calculateNights = (start, end) => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = Math.abs(e - s);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const nights = calculateNights(bookingForm.dateDebut, bookingForm.dateFin);
    if (nights <= 0) {
      alert("La date de fin doit être après la date de début.");
      return;
    }
    const total = nights * selectedSpot.price;
    setCalculatedTotal(total);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    bookCampingSpot(bookingForm, selectedSpot.id, bookingForm.dateDebut, bookingForm.dateFin, calculatedTotal);
    setShowPayment(false);
    setSelectedSpot(null);
    setBookingForm({ name: '', phone: '', email: '', dateDebut: '', dateFin: '' });
    setSuccessMessage(`Merci ${bookingForm.name} ! Votre réservation au camping de ${selectedSpot.location} est confirmée.`);
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 6000);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-sand)' }}>
      <SEO title="Séjours Nature & Camping" description="Réservez votre séjour éco-touristique dans nos campings nature. Tentes sahariennes, emplacements sous les eucalyptus et éco-campements." keywords="camping Sénégal, éco-tourisme, hébergement nature, tente saharienne, Mboro" />

      {/* Hero Section Camping - backgroundImage directement sur section */}
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
        backgroundImage: 'url("/images/camping.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
      }}>
        {/* Overlay dégradé forêt-nuit */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to bottom, rgba(15,50,20,0.72) 0%, rgba(27,94,32,0.55) 40%, rgba(0,0,0,0.65) 100%)',
          zIndex: 0
        }}></div>
        {/* Contenu hero */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '820px', textShadow: '0 2px 14px rgba(0,0,0,0.6)' }}>
          <span style={{
            display: 'inline-block',
            backgroundColor: 'var(--primary)',
            color: 'white',
            borderRadius: '999px',
            padding: '7px 22px',
            fontSize: '0.95rem',
            fontWeight: 700,
            marginBottom: '22px',
            letterSpacing: '0.5px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
          }}>🏕️ Séjours & nature</span>
          <h1 style={{ color: 'white', marginBottom: '18px', fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)', lineHeight: 1.1 }}>
            Séjours nature & campings
          </h1>
          <p style={{ margin: '0 auto 32px', fontSize: '1.2rem', color: 'rgba(255,255,255,0.92)', maxWidth: '680px', lineHeight: 1.75 }}>
            Plongez au cœur de l'agroécologie sénégalaise. Nos fermes vous accueillent dans des espaces
            de camping aménagés, respectueux de l'environnement, avec un niveau de sécurité optimal.
          </p>
          {/* Stats rapides */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {[
              { value: '3', label: 'Hébergements' },
              { value: '24h/7', label: 'Gardiennage' },
              { value: '100%', label: 'Solaire' },
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

      <div className="section">
        <div className="container">
        
        {/* En-tête Ecotourisme - simplifié car le hero couvre déjà l'intro */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="badge" style={{ backgroundColor: 'var(--accent)', color: 'white', marginBottom: '16px' }}>Écotourisme & plein air</span>
          <h2 style={{ color: 'var(--text-charcoal)', marginBottom: '16px' }}>Nos espaces de vie en pleine nature</h2>
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Choisissez votre formule d'hébergement parmi nos trois options, toutes situées dans un cadre naturel préservé.
          </p>
        </div>

        {/* Message de succès */}
        {successMessage && (
          <div className="animate-slide" style={{ backgroundColor: '#E8F5E9', border: '2px solid var(--primary)', padding: '20px', borderRadius: 'var(--radius-md)', textAlign: 'center', marginBottom: '40px' }}>
            <h3 style={{ color: 'var(--primary)', margin: 0 }}>{successMessage}</h3>
          </div>
        )}

        {/* Grille de présentation (Sécurité & Activités) */}
        <div className="grid-2" style={{ marginBottom: '60px' }}>
          <div className="card" style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none' }}>
            <h3 style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldCheck size={28} /> Notre promesse sécurité
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}><div style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent)', borderRadius: '50%', marginTop: '8px' }}></div><strong>Clôture végétale et physique intégrale</strong> autour des domaines.</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}><div style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent)', borderRadius: '50%', marginTop: '8px' }}></div><strong>Gardiennage physique 24h/24 et 7j/7</strong> par une équipe formée.</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}><div style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent)', borderRadius: '50%', marginTop: '8px' }}></div><strong>Éclairage solaire nocturne</strong> sur les allées principales.</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}><div style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent)', borderRadius: '50%', marginTop: '8px' }}></div><strong>Trousse de premiers secours et eau potable</strong> (filtrée) disponibles.</li>
            </ul>
          </div>
          <div className="card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--accent)' }}>
              <Tent size={28} /> L'expérience agroécologique
            </h3>
            <p style={{ marginTop: '20px' }}>
              En séjournant chez nous, vous profitez non seulement d'un cadre verdoyant, mais vous pouvez aussi :
            </p>
            <ul style={{ paddingLeft: '20px', marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)' }}>
              <li>Participer à la récolte matinale (maraîchage et cueillette de fruits).</li>
              <li>Déguster des repas 100% bio préparés avec les produits de la ferme (Option Restauration).</li>
              <li>Profiter de nos feux de camp encadrés sous les étoiles.</li>
              <li>Visiter nos parcelles d'expérimentation en permaculture.</li>
            </ul>
          </div>
        </div>

        {/* Emplacements & Réservation */}
        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Nos hébergements</h2>
        
        <div className="grid-3">
          {filteredSpots.map(spot => (
            <div key={spot.id} className="card animate-slide">
              <div className="card-img-wrapper">
                <img src={spot.image} alt={spot.name} className="card-img" />
                <span className={`badge badge-${spot.location.toLowerCase()}`} style={{ position: 'absolute', top: '12px', right: '12px' }}>
                  {spot.location}
                </span>
              </div>
              <div className="card-body">
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                  Type : {spot.type}
                </span>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>{spot.name}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '20px', flexGrow: 1 }}>{spot.description}</p>
                
                <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', color: 'var(--text-charcoal)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                    <Users size={16} color="var(--primary)" /> Max {spot.capacity} pers.
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                  <div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>
                      {spot.price.toLocaleString('fr-FR')} FCFA
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>/ nuit</span>
                  </div>
                  <button 
                    className="btn btn-accent" 
                    style={{ padding: '8px 16px' }}
                    onClick={() => {
                      setSelectedSpot(spot);
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }}
                  >
                    Réserver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Formulaire de réservation dynamique */}
        {selectedSpot && (
          <div className="card animate-fade" style={{ marginTop: '60px', border: '2px solid var(--accent)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
              <h3 style={{ margin: 0, color: 'var(--accent)' }}>Réserver : {selectedSpot.name}</h3>
              <span className={`badge badge-${selectedSpot.location.toLowerCase()}`}>{selectedSpot.location}</span>
            </div>
            
            <form onSubmit={handleBookingSubmit}>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Nom complet</label>
                  <input type="text" className="form-control" required value={bookingForm.name} onChange={e => setBookingForm({...bookingForm, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Numéro de téléphone</label>
                  <input type="tel" className="form-control" required placeholder="+221 77 123 45 67" value={bookingForm.phone} onChange={e => setBookingForm({...bookingForm, phone: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Adresse Email</label>
                  <input type="email" className="form-control" required value={bookingForm.email} onChange={e => setBookingForm({...bookingForm, email: e.target.value})} />
                </div>
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#FDF5F1', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                  <Info size={24} color="var(--accent)" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '0.85rem' }}>Le paiement de l'intégralité du séjour est requis pour bloquer l'emplacement.</span>
                </div>
              </div>

              <div className="grid-2" style={{ marginTop: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Date d'arrivée (14h00)</label>
                  <div style={{ position: 'relative' }}>
                    <Calendar size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                    <input type="date" className="form-control" style={{ paddingLeft: '40px' }} required min={new Date().toISOString().split('T')[0]} value={bookingForm.dateDebut} onChange={e => setBookingForm({...bookingForm, dateDebut: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Date de départ (11h00)</label>
                  <div style={{ position: 'relative' }}>
                    <Calendar size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                    <input type="date" className="form-control" style={{ paddingLeft: '40px' }} required min={bookingForm.dateDebut || new Date().toISOString().split('T')[0]} value={bookingForm.dateFin} onChange={e => setBookingForm({...bookingForm, dateFin: e.target.value})} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '32px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedSpot(null)}>Annuler</button>
                <button type="submit" className="btn btn-accent">
                  Confirmer et payer
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Composant de Simulation de Paiement */}
        <PaymentSimulator 
          isOpen={showPayment} 
          amount={calculatedTotal} 
          onClose={() => setShowPayment(false)} 
          onSuccess={handlePaymentSuccess} 
        />

      </div>
      </div>
    </div>
  );
};

export default Camping;
