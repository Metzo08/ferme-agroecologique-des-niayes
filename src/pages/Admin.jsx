import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  LayoutDashboard, Users, ShoppingBag, Tent, BookOpen, PlusCircle, 
  CheckCircle, Image, Globe, Tag, Heart, Droplets, Sun, Sparkles, RefreshCw, Upload
} from 'lucide-react';
import confetti from 'canvas-confetti';

const Admin = () => {
  const { 
    campingReservations, trainingInscriptions, shopOrders,
    adminAddPlant, adminAddEquipment, adminAddTraining, adminAddCampingSpot 
  } = useContext(AppContext);

  // Onglet actif : 'dashboard', 'product', 'training', 'camping'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [productType, setProductType] = useState('plant'); // 'plant' or 'equipment'
  const [successMsg, setSuccessMsg] = useState('');

  // Méthode de chargement d'image ('url' ou 'file') pour chaque formulaire
  const [plantUploadMethod, setPlantUploadMethod] = useState('url');
  const [equipUploadMethod, setEquipUploadMethod] = useState('url');
  const [trainingUploadMethod, setTrainingUploadMethod] = useState('url');
  const [campingUploadMethod, setCampingUploadMethod] = useState('url');

  // Clés de réinitialisation pour vider les champs file uncontrolled après soumission
  const [plantFileKey, setPlantFileKey] = useState(0);
  const [equipFileKey, setEquipFileKey] = useState(0);
  const [trainingFileKey, setTrainingFileKey] = useState(0);
  const [campingFileKey, setCampingFileKey] = useState(0);

  // États des formulaires
  const [plantForm, setPlantForm] = useState({
    name: '', category: 'Aromatique & Médicinale', price: '', stock: '', location: 'both',
    soil: '', water: 'moyen', sun: 'plein-soleil', image: '', description: '', tips: ''
  });

  const [equipForm, setEquipForm] = useState({
    name: '', category: 'Matériel Agricole', price: '', stock: '', location: 'both',
    image: '', description: '', specs: ''
  });

  const [trainingForm, setTrainingForm] = useState({
    title: '', location: 'Mboro (Khondio)', duration: '2 jours (samedi - dimanche)', date: '',
    price: '', availablePlaces: '', image: '', description: ''
  });

  const [campingForm, setCampingForm] = useState({
    name: '', type: 'Nu', price: '', capacity: '', location: 'Mboro', image: '', description: ''
  });

  // Calcul du chiffre d'affaires
  const totalVentes = shopOrders.reduce((acc, order) => acc + order.total, 0);

  const stats = [
    { label: 'Visiteurs (aujourd\'hui)', value: '142', icon: <Users size={24} color="#1565C0" />, bg: '#E3F2FD' },
    { label: 'Ventes e-commerce', value: `${totalVentes.toLocaleString('fr-FR')} F`, icon: <ShoppingBag size={24} color="var(--primary)" />, bg: 'var(--primary-light)' },
    { label: 'Réservations camping', value: campingReservations.length.toString(), icon: <Tent size={24} color="var(--accent)" />, bg: 'var(--accent-light)' },
    { label: 'Inscrits formations', value: trainingInscriptions.length.toString(), icon: <BookOpen size={24} color="#E65100" />, bg: '#FFF3E0' },
  ];

  // Déclencher les confettis et afficher le succès
  const triggerSuccess = (msg) => {
    setSuccessMsg(msg);
    confetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setSuccessMsg('');
    }, 4500);
  };

  // Convertir le fichier local en Base64 Data URL pour stockage local
  const handleFileChange = (e, formType) => {
    const file = e.target.files[0];
    if (!file) return;

    // Limitation de taille à 1.5 Mo pour préserver le localStorage
    if (file.size > 1.5 * 1024 * 1024) {
      alert("L'image est trop lourde. Veuillez choisir un fichier de moins de 1.5 Mo pour garantir le stockage local.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result;
      if (formType === 'plant') {
        setPlantForm(prev => ({ ...prev, image: base64Data }));
      } else if (formType === 'equip') {
        setEquipForm(prev => ({ ...prev, image: base64Data }));
      } else if (formType === 'training') {
        setTrainingForm(prev => ({ ...prev, image: base64Data }));
      } else if (formType === 'camping') {
        setCampingForm(prev => ({ ...prev, image: base64Data }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Soumission des formulaires
  const handleAddPlant = (e) => {
    e.preventDefault();
    adminAddPlant({
      name: plantForm.name,
      category: plantForm.category,
      price: parseFloat(plantForm.price) || 0,
      stock: parseInt(plantForm.stock) || 0,
      location: plantForm.location,
      soil: plantForm.soil || 'Sableux et riche',
      water: plantForm.water,
      sun: plantForm.sun,
      image: plantForm.image || '/images/garden.jpg',
      description: plantForm.description,
      tips: plantForm.tips || 'Arrosage régulier et maintien de l\'humidité.'
    });
    triggerSuccess(`La plante "${plantForm.name}" a été ajoutée au catalogue pépinière !`);
    setPlantForm({
      name: '', category: 'Aromatique & Médicinale', price: '', stock: '', location: 'both',
      soil: '', water: 'moyen', sun: 'plein-soleil', image: '', description: '', tips: ''
    });
    setPlantFileKey(prev => prev + 1);
  };

  const handleAddEquipment = (e) => {
    e.preventDefault();
    adminAddEquipment({
      name: equipForm.name,
      category: equipForm.category,
      price: parseFloat(equipForm.price) || 0,
      stock: parseInt(equipForm.stock) || 0,
      location: equipForm.location,
      image: equipForm.image || '/images/irrigation.jpg',
      description: equipForm.description,
      specs: equipForm.specs || '100% naturel et fabriqué localement.'
    });
    triggerSuccess(`Le matériel/produit "${equipForm.name}" a été ajouté à la boutique !`);
    setEquipForm({
      name: '', category: 'Matériel Agricole', price: '', stock: '', location: 'both',
      image: '', description: '', specs: ''
    });
    setEquipFileKey(prev => prev + 1);
  };

  const handleAddTraining = (e) => {
    e.preventDefault();
    adminAddTraining({
      title: trainingForm.title,
      location: trainingForm.location,
      duration: trainingForm.duration,
      date: trainingForm.date,
      price: parseFloat(trainingForm.price) || 0,
      availablePlaces: parseInt(trainingForm.availablePlaces) || 0,
      image: trainingForm.image || '/images/training.jpg',
      description: trainingForm.description
    });
    triggerSuccess(`La formation "${trainingForm.title}" a été ajoutée avec succès !`);
    setTrainingForm({
      title: '', location: 'Mboro (Khondio)', duration: '2 jours (samedi - dimanche)', date: '',
      price: '', availablePlaces: '', image: '', description: ''
    });
    setTrainingFileKey(prev => prev + 1);
  };

  const handleAddCamping = (e) => {
    e.preventDefault();
    adminAddCampingSpot({
      name: campingForm.name,
      type: campingForm.type,
      price: parseFloat(campingForm.price) || 0,
      capacity: parseInt(campingForm.capacity) || 0,
      location: campingForm.location,
      image: campingForm.image || '/images/camping.webp',
      description: campingForm.description
    });
    triggerSuccess(`L'hébergement "${campingForm.name}" a été ajouté au camping !`);
    setCampingForm({
      name: '', type: 'Nu', price: '', capacity: '', location: 'Mboro', image: '', description: ''
    });
    setCampingFileKey(prev => prev + 1);
  };

  return (
    <div className="section" style={{ backgroundColor: '#F5F7FA', minHeight: '100vh', paddingBottom: '80px' }}>
      <div className="container">
        
        {/* En-tête admin */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '40px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <LayoutDashboard size={32} color="var(--text-charcoal)" />
            <h1 style={{ margin: 0, color: 'var(--text-charcoal)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)' }}>Espace administration</h1>
          </div>
          
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setActiveTab('dashboard')} 
              style={{
                backgroundColor: activeTab === 'dashboard' ? 'var(--text-charcoal)' : 'white',
                color: activeTab === 'dashboard' ? 'white' : 'var(--text-charcoal)',
                border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 20px',
                fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
              }}
            >
              <LayoutDashboard size={18} /> Tableau de bord
            </button>
            <button 
              onClick={() => setActiveTab('product')} 
              style={{
                backgroundColor: activeTab === 'product' ? 'var(--primary)' : 'white',
                color: activeTab === 'product' ? 'white' : 'var(--text-charcoal)',
                border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 20px',
                fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
              }}
            >
              <PlusCircle size={18} /> Ajouter un produit
            </button>
            <button 
              onClick={() => setActiveTab('training')} 
              style={{
                backgroundColor: activeTab === 'training' ? '#E65100' : 'white',
                color: activeTab === 'training' ? 'white' : 'var(--text-charcoal)',
                border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 20px',
                fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
              }}
            >
              <PlusCircle size={18} /> Ajouter formation
            </button>
            <button 
              onClick={() => setActiveTab('camping')} 
              style={{
                backgroundColor: activeTab === 'camping' ? 'var(--accent)' : 'white',
                color: activeTab === 'camping' ? 'white' : 'var(--text-charcoal)',
                border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 20px',
                fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
              }}
            >
              <PlusCircle size={18} /> Ajouter camping
            </button>
            <button 
              onClick={() => {
                if (window.confirm("Voulez-vous vider le cache et actualiser la plateforme ? Cela affichera toutes les corrections d'images et données immédiatement.")) {
                  localStorage.clear();
                  window.location.reload();
                }
              }} 
              style={{
                backgroundColor: '#D32F2F', color: 'white',
                border: 'none', borderRadius: '8px', padding: '10px 20px',
                fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                boxShadow: '0 4px 12px rgba(211,47,47,0.2)'
              }}
            >
              <RefreshCw size={18} /> Vider le cache & actualiser
            </button>
          </div>
        </div>

        {/* Message de succès géré dynamiquement */}
        {successMsg && (
          <div className="animate-slide" style={{
            backgroundColor: '#E8F5E9', borderLeft: '5px solid var(--primary)',
            padding: '16px 24px', borderRadius: '12px', color: '#1B5E20',
            fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px',
            marginBottom: '32px', boxShadow: '0 4px 14px rgba(0,0,0,0.05)'
          }}>
            <CheckCircle size={24} color="#1B5E20" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* ────────── CONTENU DES ONGLETS ────────── */}

        {activeTab === 'dashboard' && (
          <div className="animate-fade">
            {/* Chiffres clés */}
            <div className="grid-4" style={{ marginBottom: '40px' }}>
              {stats.map((stat, idx) => (
                <div key={idx} className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {stat.icon}
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{stat.label}</span>
                    <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-charcoal)', marginTop: '4px' }}>{stat.value}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid-2" style={{ gap: '30px' }}>
              {/* Dernières réservations Camping */}
              <div className="card" style={{ border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
                  <Tent size={24} color="var(--accent)" />
                  <h3 style={{ margin: 0, color: 'var(--text-charcoal)' }}>Dernières réservations camping</h3>
                </div>
                
                {campingReservations.length > 0 ? (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                          <th style={{ padding: '12px 8px' }}>Client</th>
                          <th style={{ padding: '12px 8px' }}>Lieu</th>
                          <th style={{ padding: '12px 8px' }}>Dates</th>
                          <th style={{ padding: '12px 8px' }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {campingReservations.map((booking, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '12px 8px', fontWeight: 600 }}>{booking.nom_client}<br/><span style={{fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'normal'}}>{booking.telephone_client}</span></td>
                            <td style={{ padding: '12px 8px' }}><span className="badge" style={{ backgroundColor: booking.ferme === 'Mboro' ? 'var(--primary-light)' : 'var(--accent-light)', color: booking.ferme === 'Mboro' ? 'var(--primary)' : 'var(--accent)' }}>{booking.ferme}</span></td>
                            <td style={{ padding: '12px 8px' }}>Du {booking.date_debut}<br/>Au {booking.date_fin}</td>
                            <td style={{ padding: '12px 8px', fontWeight: 700 }}>{booking.montant_total.toLocaleString('fr-FR')} F</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>Aucune réservation de camping récente.</p>
                )}
              </div>

              {/* Inscriptions Formations */}
              <div className="card" style={{ border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
                  <BookOpen size={24} color="#E65100" />
                  <h3 style={{ margin: 0, color: 'var(--text-charcoal)' }}>Dernières inscriptions formations</h3>
                </div>
                
                {trainingInscriptions.length > 0 ? (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                          <th style={{ padding: '12px 8px' }}>Participant</th>
                          <th style={{ padding: '12px 8px' }}>Contact</th>
                          <th style={{ padding: '12px 8px' }}>Formation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trainingInscriptions.map((t, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '12px 8px', fontWeight: 600 }}>{t.nom_apprenant}</td>
                            <td style={{ padding: '12px 8px' }}>{t.telephone}<br/><span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{t.email}</span></td>
                            <td style={{ padding: '12px 8px', fontSize: '0.8rem', fontWeight: 500 }}>{t.formation_titre}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>Aucune inscription récente.</p>
                )}
              </div>
              
              {/* Commandes E-Commerce */}
              <div className="card" style={{ gridColumn: '1 / -1', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
                  <ShoppingBag size={24} color="var(--primary)" />
                  <h3 style={{ margin: 0, color: 'var(--text-charcoal)' }}>Commandes pépinière & boutique</h3>
                </div>
                
                {shopOrders.length > 0 ? (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                          <th style={{ padding: '12px 8px' }}>ID commande</th>
                          <th style={{ padding: '12px 8px' }}>Client</th>
                          <th style={{ padding: '12px 8px' }}>Articles</th>
                          <th style={{ padding: '12px 8px' }}>Total</th>
                          <th style={{ padding: '12px 8px' }}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shopOrders.map((o, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '12px 8px', fontWeight: 600, color: 'var(--primary)' }}>{o.id}</td>
                            <td style={{ padding: '12px 8px', fontWeight: 600 }}>{o.nom_client}<br/><span style={{fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'normal'}}>{o.telephone}</span></td>
                            <td style={{ padding: '12px 8px', fontSize: '0.8rem' }}>
                              {o.items.map((item, i) => <div key={i} style={{ padding: '2px 0' }}>• {item.qty}x {item.name}</div>)}
                            </td>
                            <td style={{ padding: '12px 8px', fontWeight: 700 }}>{o.total.toLocaleString('fr-FR')} F</td>
                            <td style={{ padding: '12px 8px', color: 'var(--text-muted)' }}>{o.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>Aucune commande e-commerce.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Formulaire d'ajout de produit (Tab 2) ── */}
        {activeTab === 'product' && (
          <div className="card animate-fade" style={{ border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ShoppingBag size={28} color="var(--primary)" />
                <h2 style={{ margin: 0 }}>Ajouter un nouveau produit</h2>
              </div>
              
              {/* Type de produit */}
              <div style={{ display: 'flex', backgroundColor: '#F0F2F5', borderRadius: '999px', padding: '4px' }}>
                <button
                  onClick={() => setProductType('plant')}
                  style={{
                    backgroundColor: productType === 'plant' ? 'white' : 'transparent',
                    color: productType === 'plant' ? 'var(--primary)' : 'var(--text-muted)',
                    border: 'none', borderRadius: '999px', padding: '8px 20px', fontWeight: 700, cursor: 'pointer',
                    boxShadow: productType === 'plant' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'
                  }}
                >
                  Plante (Pépinière)
                </button>
                <button
                  onClick={() => setProductType('equipment')}
                  style={{
                    backgroundColor: productType === 'equipment' ? 'white' : 'transparent',
                    color: productType === 'equipment' ? 'var(--primary)' : 'var(--text-muted)',
                    border: 'none', borderRadius: '999px', padding: '8px 20px', fontWeight: 700, cursor: 'pointer',
                    boxShadow: productType === 'equipment' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'
                  }}
                >
                  Matériel & intrant (boutique)
                </button>
              </div>
            </div>

            {/* FORMULAIRE PLANTE */}
            {productType === 'plant' ? (
              <form onSubmit={handleAddPlant}>
                <div className="grid-2" style={{ gap: '24px' }}>
                  <div className="form-group">
                    <label className="form-label"><Tag size={16} style={{ marginRight: '6px' }} /> Nom de la plante</label>
                    <input 
                      type="text" className="form-control" placeholder="ex: Hibiscus Rouge" required
                      value={plantForm.name} onChange={e => setPlantForm({...plantForm, name: e.target.value})} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label"><BookOpen size={16} style={{ marginRight: '6px' }} /> Catégorie de plante</label>
                    <select 
                      className="form-control" value={plantForm.category}
                      onChange={e => setPlantForm({...plantForm, category: e.target.value})}
                    >
                      <option value="Aromatique & Médicinale">Aromatique & Médicinale</option>
                      <option value="Ornementale">Ornementale</option>
                      <option value="Fruitier & Maraîcher">Fruitier & Maraîcher</option>
                      <option value="Ombrage">Ombrage</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Prix (FCFA)</label>
                    <input 
                      type="number" className="form-control" placeholder="ex: 3500" required min="0"
                      value={plantForm.price} onChange={e => setPlantForm({...plantForm, price: e.target.value})} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Stock disponible (unités)</label>
                    <input 
                      type="number" className="form-control" placeholder="ex: 150" required min="0"
                      value={plantForm.stock} onChange={e => setPlantForm({...plantForm, stock: e.target.value})} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label"><Globe size={16} style={{ marginRight: '6px' }} /> Localisation / Site</label>
                    <select 
                      className="form-control" value={plantForm.location}
                      onChange={e => setPlantForm({...plantForm, location: e.target.value})}
                    >
                      <option value="both">Disponible sur les deux sites (Mboro et Ngaparou)</option>
                      <option value="mboro">Uniquement à Mboro (Khondio)</option>
                      <option value="ngaparou">Uniquement à Ngaparou (Mbour)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label"><Heart size={16} style={{ marginRight: '6px' }} /> Type de sol recommandé</label>
                    <input 
                      type="text" className="form-control" placeholder="ex: Sableux drainé, riche en compost"
                      value={plantForm.soil} onChange={e => setPlantForm({...plantForm, soil: e.target.value})} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label"><Droplets size={16} style={{ marginRight: '6px' }} /> Besoin en eau</label>
                    <select 
                      className="form-control" value={plantForm.water}
                      onChange={e => setPlantForm({...plantForm, water: e.target.value})}
                    >
                      <option value="faible">Faible (résistant à la sécheresse)</option>
                      <option value="moyen">Moyen (arrosage modéré régulier)</option>
                      <option value="fort">Fort (arrosage fréquent abondant)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label"><Sun size={16} style={{ marginRight: '6px' }} /> Exposition au soleil</label>
                    <select 
                      className="form-control" value={plantForm.sun}
                      onChange={e => setPlantForm({...plantForm, sun: e.target.value})}
                    >
                      <option value="plein-soleil">Plein soleil</option>
                      <option value="mi-ombre">Mi-ombre</option>
                      <option value="ombre">Ombre</option>
                    </select>
                  </div>
                </div>

                {/* Champ Illustration (URL ou Fichier) */}
                <div className="form-group" style={{ marginTop: '24px' }}>
                  <label className="form-label"><Image size={16} style={{ marginRight: '6px' }} /> Illustration (Photo)</label>
                  
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <button
                      type="button" onClick={() => setPlantUploadMethod('url')}
                      style={{
                        backgroundColor: plantUploadMethod === 'url' ? 'var(--primary-light)' : 'white',
                        color: plantUploadMethod === 'url' ? 'var(--primary)' : 'var(--text-charcoal)',
                        border: '1px solid var(--border-color)', borderRadius: '6px', padding: '6px 14px',
                        fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer'
                      }}
                    >
                      Lien URL de l'image
                    </button>
                    <button
                      type="button" onClick={() => setPlantUploadMethod('file')}
                      style={{
                        backgroundColor: plantUploadMethod === 'file' ? 'var(--primary-light)' : 'white',
                        color: plantUploadMethod === 'file' ? 'var(--primary)' : 'var(--text-charcoal)',
                        border: '1px solid var(--border-color)', borderRadius: '6px', padding: '6px 14px',
                        fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
                      }}
                    >
                      <Upload size={14} /> Téléverser un fichier local
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ flexGrow: 1 }}>
                      {plantUploadMethod === 'url' ? (
                        <input 
                          type="url" className="form-control" placeholder="Laissez vide pour image par défaut, ou collez le lien d'image"
                          value={plantForm.image} onChange={e => setPlantForm({...plantForm, image: e.target.value})} 
                        />
                      ) : (
                        <div style={{ position: 'relative' }}>
                          <input 
                            key={plantFileKey}
                            type="file" accept="image/*" className="form-control" style={{ padding: '8px 12px' }}
                            onChange={e => handleFileChange(e, 'plant')} 
                          />
                        </div>
                      )}
                    </div>
                    {plantForm.image && (
                      <div style={{ width: '56px', height: '56px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                        <img src={plantForm.image} alt="Aperçu" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '24px' }}>
                  <label className="form-label">Description courte de la plante</label>
                  <textarea 
                    className="form-control" rows="3" required placeholder="ex: Arbuste au feuillage caduc produisant de grandes fleurs rouges de toute beauté..."
                    value={plantForm.description} onChange={e => setPlantForm({...plantForm, description: e.target.value})}
                  ></textarea>
                </div>

                <div className="form-group" style={{ marginTop: '24px' }}>
                  <label className="form-label">Conseils de culture & d'entretien</label>
                  <textarea 
                    className="form-control" rows="3" placeholder="ex: Pailler le pied en saison sèche. Tailler légèrement après la première floraison."
                    value={plantForm.tips} onChange={e => setPlantForm({...plantForm, tips: e.target.value})}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '32px', width: '100%', padding: '14px', fontSize: '1.05rem', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  <Sparkles size={20} /> Enregistrer la plante dans le catalogue
                </button>
              </form>
            ) : (
              // FORMULAIRE EQUIPEMENT / MATERIEL
              <form onSubmit={handleAddEquipment}>
                <div className="grid-2" style={{ gap: '24px' }}>
                  <div className="form-group">
                    <label className="form-label"><Tag size={16} style={{ marginRight: '6px' }} /> Nom de l'article</label>
                    <input 
                      type="text" className="form-control" placeholder="ex: Brouette renforcée" required
                      value={equipForm.name} onChange={e => setEquipForm({...equipForm, name: e.target.value})} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label"><BookOpen size={16} style={{ marginRight: '6px' }} /> Catégorie de produit</label>
                    <select 
                      className="form-control" value={equipForm.category}
                      onChange={e => setEquipForm({...equipForm, category: e.target.value})}
                    >
                      <option value="Matériel Agricole">Matériel Agricole</option>
                      <option value="Fertilisants">Fertilisants / Terreaux</option>
                      <option value="Apiculture">Apiculture</option>
                      <option value="Transformation">Produits de Transformation</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Prix de vente (FCFA)</label>
                    <input 
                      type="number" className="form-control" placeholder="ex: 18000" required min="0"
                      value={equipForm.price} onChange={e => setEquipForm({...equipForm, price: e.target.value})} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Stock disponible (unités)</label>
                    <input 
                      type="number" className="form-control" placeholder="ex: 45" required min="0"
                      value={equipForm.stock} onChange={e => setEquipForm({...equipForm, stock: e.target.value})} 
                    />
                  </div>

                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label"><Globe size={16} style={{ marginRight: '6px' }} /> Disponibilité géographique</label>
                    <select 
                      className="form-control" value={equipForm.location}
                      onChange={e => setEquipForm({...equipForm, location: e.target.value})}
                    >
                      <option value="both">Disponible sur les deux sites (Mboro et Ngaparou)</option>
                      <option value="mboro">Uniquement à la ferme de Mboro (Khondio)</option>
                      <option value="ngaparou">Uniquement à Ngaparou (Mbour)</option>
                    </select>
                  </div>
                </div>

                {/* Champ Illustration pour équipement */}
                <div className="form-group" style={{ marginTop: '24px' }}>
                  <label className="form-label"><Image size={16} style={{ marginRight: '6px' }} /> Illustration (Photo)</label>
                  
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <button
                      type="button" onClick={() => setEquipUploadMethod('url')}
                      style={{
                        backgroundColor: equipUploadMethod === 'url' ? 'var(--primary-light)' : 'white',
                        color: equipUploadMethod === 'url' ? 'var(--primary)' : 'var(--text-charcoal)',
                        border: '1px solid var(--border-color)', borderRadius: '6px', padding: '6px 14px',
                        fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer'
                      }}
                    >
                      Lien URL de l'image
                    </button>
                    <button
                      type="button" onClick={() => setEquipUploadMethod('file')}
                      style={{
                        backgroundColor: equipUploadMethod === 'file' ? 'var(--primary-light)' : 'white',
                        color: equipUploadMethod === 'file' ? 'var(--primary)' : 'var(--text-charcoal)',
                        border: '1px solid var(--border-color)', borderRadius: '6px', padding: '6px 14px',
                        fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
                      }}
                    >
                      <Upload size={14} /> Téléverser un fichier local
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ flexGrow: 1 }}>
                      {equipUploadMethod === 'url' ? (
                        <input 
                          type="url" className="form-control" placeholder="Coller le lien de l'image (laisser vide pour photo par défaut)"
                          value={equipForm.image} onChange={e => setEquipForm({...equipForm, image: e.target.value})} 
                        />
                      ) : (
                        <div style={{ position: 'relative' }}>
                          <input 
                            key={equipFileKey}
                            type="file" accept="image/*" className="form-control" style={{ padding: '8px 12px' }}
                            onChange={e => handleFileChange(e, 'equip')} 
                          />
                        </div>
                      )}
                    </div>
                    {equipForm.image && (
                      <div style={{ width: '56px', height: '56px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                        <img src={equipForm.image} alt="Aperçu" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '24px' }}>
                  <label className="form-label">Description du produit</label>
                  <textarea 
                    className="form-control" rows="3" required placeholder="Décrivez l'utilité, la provenance ou la composition..."
                    value={equipForm.description} onChange={e => setEquipForm({...equipForm, description: e.target.value})}
                  ></textarea>
                </div>

                <div className="form-group" style={{ marginTop: '24px' }}>
                  <label className="form-label">Spécifications techniques / Dimensions / Matériau</label>
                  <textarea 
                    className="form-control" rows="3" placeholder="ex: Cuve en polyéthylène haute densité, châssis tubulaire en acier traité antirouille."
                    value={equipForm.specs} onChange={e => setEquipForm({...equipForm, specs: e.target.value})}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '32px', width: '100%', padding: '14px', fontSize: '1.05rem', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  <Sparkles size={20} /> Enregistrer l'article dans la boutique
                </button>
              </form>
            )}
          </div>
        )}

        {/* ── Formulaire d'ajout de formation (Tab 3) ── */}
        {activeTab === 'training' && (
          <div className="card animate-fade" style={{ border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', marginBottom: '32px' }}>
              <BookOpen size={28} color="#E65100" />
              <h2 style={{ margin: 0 }}>Ajouter une session de formation</h2>
            </div>

            <form onSubmit={handleAddTraining}>
              <div className="grid-2" style={{ gap: '24px' }}>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Intitulé de la formation</label>
                  <input 
                    type="text" className="form-control" placeholder="ex: Apiculture pratique et récolte éco-responsable" required
                    value={trainingForm.title} onChange={e => setTrainingForm({...trainingForm, title: e.target.value})} 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label"><Globe size={16} style={{ marginRight: '6px' }} /> Lieu d'enseignement</label>
                  <select 
                    className="form-control" value={trainingForm.location}
                    onChange={e => setTrainingForm({...trainingForm, location: e.target.value})}
                  >
                    <option value="Mboro (Khondio)">Mboro (Khondio) - Région de Thiès</option>
                    <option value="Ngaparou (Mbour)">Ngaparou (Mbour) - Petite-Côte</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Durée & Horaires</label>
                  <input 
                    type="text" className="form-control" placeholder="ex: 2 jours (samedi - dimanche)" required
                    value={trainingForm.duration} onChange={e => setTrainingForm({...trainingForm, duration: e.target.value})} 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Dates de la session</label>
                  <input 
                    type="text" className="form-control" placeholder="ex: 18 - 19 Juillet 2026" required
                    value={trainingForm.date} onChange={e => setTrainingForm({...trainingForm, date: e.target.value})} 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tarif de participation (FCFA)</label>
                  <input 
                    type="number" className="form-control" placeholder="ex: 45000" required min="0"
                    value={trainingForm.price} onChange={e => setTrainingForm({...trainingForm, price: e.target.value})} 
                  />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Nombre de places disponibles</label>
                  <input 
                    type="number" className="form-control" placeholder="ex: 12" required min="1"
                    value={trainingForm.availablePlaces} onChange={e => setTrainingForm({...trainingForm, availablePlaces: e.target.value})} 
                  />
                </div>
              </div>

              {/* Champ Illustration pour formation */}
              <div className="form-group" style={{ marginTop: '24px' }}>
                <label className="form-label"><Image size={16} style={{ marginRight: '6px' }} /> Illustration (Photo)</label>
                
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <button
                    type="button" onClick={() => setTrainingUploadMethod('url')}
                    style={{
                      backgroundColor: trainingUploadMethod === 'url' ? 'var(--primary-light)' : 'white',
                      color: trainingUploadMethod === 'url' ? 'var(--primary)' : 'var(--text-charcoal)',
                      border: '1px solid var(--border-color)', borderRadius: '6px', padding: '6px 14px',
                      fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer'
                    }}
                  >
                    Lien URL de l'image
                  </button>
                  <button
                    type="button" onClick={() => setTrainingUploadMethod('file')}
                    style={{
                      backgroundColor: trainingUploadMethod === 'file' ? 'var(--primary-light)' : 'white',
                      color: trainingUploadMethod === 'file' ? 'var(--primary)' : 'var(--text-charcoal)',
                      border: '1px solid var(--border-color)', borderRadius: '6px', padding: '6px 14px',
                      fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
                    }}
                  >
                    <Upload size={14} /> Téléverser un fichier local
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ flexGrow: 1 }}>
                    {trainingUploadMethod === 'url' ? (
                      <input 
                        type="url" className="form-control" placeholder="Coller le lien de l'image (ou laisser vide)"
                        value={trainingForm.image} onChange={e => setTrainingForm({...trainingForm, image: e.target.value})} 
                      />
                    ) : (
                      <div style={{ position: 'relative' }}>
                        <input 
                          key={trainingFileKey}
                          type="file" accept="image/*" className="form-control" style={{ padding: '8px 12px' }}
                          onChange={e => handleFileChange(e, 'training')} 
                        />
                      </div>
                    )}
                  </div>
                  {trainingForm.image && (
                    <div style={{ width: '56px', height: '56px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                      <img src={trainingForm.image} alt="Aperçu" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '24px' }}>
                <label className="form-label">Description du programme de formation</label>
                <textarea 
                  className="form-control" rows="4" required placeholder="Décrivez en quelques lignes le programme pédagogique, les travaux pratiques prévus et ce que les élèves obtiendront..."
                  value={trainingForm.description} onChange={e => setTrainingForm({...trainingForm, description: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className="btn" style={{ backgroundColor: '#E65100', color: 'white', marginTop: '32px', width: '100%', padding: '14px', fontSize: '1.05rem', display: 'flex', justifyContent: 'center', gap: '8px', boxShadow: '0 6px 18px rgba(230,81,0,0.25)' }}>
                <Sparkles size={20} /> Publier la session de formation
              </button>
            </form>
          </div>
        )}

        {/* ── Formulaire d'ajout de camping (Tab 4) ── */}
        {activeTab === 'camping' && (
          <div className="card animate-fade" style={{ border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', marginBottom: '32px' }}>
              <Tent size={28} color="var(--accent)" />
              <h2 style={{ margin: 0 }}>Ajouter un emplacement de camping</h2>
            </div>

            <form onSubmit={handleAddCamping}>
              <div className="grid-2" style={{ gap: '24px' }}>
                <div className="form-group">
                  <label className="form-label">Nom de l'hébergement / emplacement</label>
                  <input 
                    type="text" className="form-control" placeholder="ex: Tente bulle sous les étoiles" required
                    value={campingForm.name} onChange={e => setCampingForm({...campingForm, name: e.target.value})} 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Type d'hébergement</label>
                  <select 
                    className="form-control" value={campingForm.type}
                    onChange={e => setCampingForm({...campingForm, type: e.target.value})}
                  >
                    <option value="Nu">Emplacement Nu (Client apporte sa tente)</option>
                    <option value="Equipe">Tente Équipée (Fournie et montée)</option>
                    <option value="Collectif">Hébergement collectif / Dortoir éco</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Prix de la nuitée (FCFA)</label>
                  <input 
                    type="number" className="form-control" placeholder="ex: 12000" required min="0"
                    value={campingForm.price} onChange={e => setCampingForm({...campingForm, price: e.target.value})} 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Capacité d'accueil maximale (personnes)</label>
                  <input 
                    type="number" className="form-control" placeholder="ex: 4" required min="1"
                    value={campingForm.capacity} onChange={e => setCampingForm({...campingForm, capacity: e.target.value})} 
                  />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label"><Globe size={16} style={{ marginRight: '6px' }} /> Pôle Camping / Localisation</label>
                  <select 
                    className="form-control" value={campingForm.location}
                    onChange={e => setCampingForm({...campingForm, location: e.target.value})}
                  >
                    <option value="Mboro">Mboro (Khondio) - Cadre boisé sauvage & océan</option>
                    <option value="Ngaparou">Ngaparou (Mbour) - Oasis fleurie confort & Petite-Côte</option>
                  </select>
                </div>
              </div>

              {/* Champ Illustration pour camping */}
              <div className="form-group" style={{ marginTop: '24px' }}>
                <label className="form-label"><Image size={16} style={{ marginRight: '6px' }} /> Illustration (Photo)</label>
                
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <button
                    type="button" onClick={() => setCampingUploadMethod('url')}
                    style={{
                      backgroundColor: campingUploadMethod === 'url' ? 'var(--primary-light)' : 'white',
                      color: campingUploadMethod === 'url' ? 'var(--primary)' : 'var(--text-charcoal)',
                      border: '1px solid var(--border-color)', borderRadius: '6px', padding: '6px 14px',
                      fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer'
                    }}
                  >
                    Lien URL de l'image
                  </button>
                  <button
                    type="button" onClick={() => setCampingUploadMethod('file')}
                    style={{
                      backgroundColor: campingUploadMethod === 'file' ? 'var(--primary-light)' : 'white',
                      color: campingUploadMethod === 'file' ? 'var(--primary)' : 'var(--text-charcoal)',
                      border: '1px solid var(--border-color)', borderRadius: '6px', padding: '6px 14px',
                      fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
                    }}
                  >
                    <Upload size={14} /> Téléverser un fichier local
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ flexGrow: 1 }}>
                    {campingUploadMethod === 'url' ? (
                      <input 
                        type="url" className="form-control" placeholder="Coller le lien de l'image (ou laisser vide pour photo par défaut)"
                        value={campingForm.image} onChange={e => setCampingForm({...campingForm, image: e.target.value})} 
                      />
                    ) : (
                      <div style={{ position: 'relative' }}>
                        <input 
                          key={campingFileKey}
                          type="file" accept="image/*" className="form-control" style={{ padding: '8px 12px' }}
                          onChange={e => handleFileChange(e, 'camping')} 
                        />
                      </div>
                    )}
                  </div>
                  {campingForm.image && (
                    <div style={{ width: '56px', height: '56px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                      <img src={campingForm.image} alt="Aperçu" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '24px' }}>
                <label className="form-label">Description de l'hébergement</label>
                <textarea 
                  className="form-control" rows="4" required placeholder="Décrivez le confort, le type d'ombrage, les équipements inclus (électricité solaire, douches, literie)..."
                  value={campingForm.description} onChange={e => setCampingForm({...campingForm, description: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className="btn" style={{ backgroundColor: 'var(--accent)', color: 'white', marginTop: '32px', width: '100%', padding: '14px', fontSize: '1.05rem', display: 'flex', justifyContent: 'center', gap: '8px', boxShadow: '0 6px 18px rgba(216,67,21,0.25)' }}>
                <Sparkles size={20} /> Publier l'emplacement de camping
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;
