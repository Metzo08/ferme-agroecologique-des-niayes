import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  ShoppingCart, Leaf, Droplets, Sun, Info, 
  Sprout, ChevronLeft, ChevronRight, ArrowRight, CheckCircle2,
  Search, X
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Nursery = () => {
  const { plants, addToCart, activeFermeFilter } = useContext(AppContext);
  
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [waterFilter, setWaterFilter] = useState('all');
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlant, setSelectedPlant] = useState(null);

  // Galerie de photos thématiques pépinière agroécologique
  const photos = [
    {
      url: '/images/menthe_poivree.jpg',
      title: 'Plants aromatiques sous serre',
      desc: 'Nos serres climatisées abritent plusieurs milliers de plants aromatiques (menthe, basilic, citronnelle) prêts à la transplantation.'
    },
    {
      url: '/images/moringa.jpg',
      title: 'Jeunes plants de Moringa',
      desc: "Le Moringa Oleifera est multiplié en masse dans notre pépinière de Mboro grâce à une technique de bouturage optimisée pour les sols sableux."
    },
    {
      url: '/images/manguier_kent.jpg',
      title: 'Arbres fruitiers greffés',
      desc: "Nos manguiers, agrumes et goyaviers sont produits par greffage sur porte-greffes locaux pour maximiser l'adaptation climatique."
    },
    {
      url: '/images/filaos.jpg',
      title: 'Plants de reboisement',
      desc: "Production massive de plants forestiers (Filao, Eucalyptus, Casuarina) destinés aux projets de fixation des dunes des Niayes."
    }
  ];

  const handleNextPhoto = () => setActivePhotoIdx((prev) => (prev + 1) % photos.length);
  const handlePrevPhoto = () => setActivePhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);

  const formatSun = (sun) => {
    if (!sun) return '';
    if (sun === 'plein-soleil') return 'Plein soleil';
    if (sun === 'mi-ombre') return 'Mi-ombre';
    return sun.charAt(0).toUpperCase() + sun.slice(1);
  };

  const formatWater = (water) => {
    if (!water) return '';
    if (water === 'faible') return 'Faible';
    if (water === 'moyen') return 'Moyen';
    if (water === 'fort') return 'Fort';
    return water.charAt(0).toUpperCase() + water.slice(1);
  };

  const categories = [...new Set(plants.map(p => p.category))];

  const filteredPlants = plants.filter(plant => {
    const matchLocation = activeFermeFilter === 'all' || plant.location === 'both' || plant.location === activeFermeFilter;
    const matchCategory = categoryFilter === 'all' || plant.category === categoryFilter;
    const matchWater = waterFilter === 'all' || plant.water === waterFilter;
    const matchSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        plant.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchLocation && matchCategory && matchWater && matchSearch;
  });

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
        backgroundImage: 'url("https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1400&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: 'linear-gradient(135deg, rgba(27, 94, 32, 0.82) 0%, rgba(46, 125, 50, 0.65) 100%)',
          zIndex: 0
        }}></div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
          <span className="badge" style={{ backgroundColor: 'var(--accent)', color: 'white', marginBottom: '20px', fontSize: '0.9rem', padding: '7px 20px', letterSpacing: '1px', display: 'inline-block' }}>
            Végétalisation &amp; Biodiversité
          </span>
          <h1 style={{ color: 'white', marginBottom: '20px', fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', lineHeight: 1.1 }}>
            Pépinière Agroécologique
          </h1>
          <p style={{ margin: '0 auto', fontSize: '1.2rem', color: '#C8E6C9', maxWidth: '680px', lineHeight: 1.7 }}>
            Des plants acclimatés, robustes et élevés sans produits chimiques de synthèse. Prêts pour le reboisement, le maraîchage ou l'ornement de vos jardins.
          </p>
          <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#catalogue" className="btn btn-accent" style={{ padding: '14px 32px', borderRadius: '999px', fontSize: '1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Sprout size={18} /> Voir le catalogue
            </a>
            <Link to="/services" className="btn" style={{ padding: '14px 32px', borderRadius: '999px', fontSize: '1rem', border: '1px solid white', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Demander un devis
            </Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '60px' }}>

        {/* ─── PRÉSENTATION & CONCEPT ─── */}
        <div className="grid-2" style={{ gap: '40px', alignItems: 'center', marginBottom: '70px' }}>
          <div className="card" style={{ border: 'none', padding: '44px', backgroundColor: 'white', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
            <span className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', marginBottom: '16px' }}>Approche naturelle</span>
            <h2 style={{ color: 'var(--text-charcoal)', marginBottom: '24px', fontSize: '2rem' }}>Une pépinière au cœur des Niayes</h2>
            <p style={{ lineHeight: 1.9, fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Notre pépinière de <strong>Mboro (Khondio)</strong> est spécialisée dans la production de plants destinés à la restauration des écosystèmes dégradés des Niayes, à l'intensification écologique des périmètres maraîchers, et à la création d'espaces verts durables.
            </p>
            <p style={{ lineHeight: 1.9, fontSize: '1.05rem', color: 'var(--text-muted)' }}>
              Toutes nos espèces sont sélectionnées pour leur résistance aux conditions sahéliennes : sols sableux, stress hydrique et températures extrêmes. Zéro pesticide, zéro engrais chimique.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '28px' }}>
              {['Plants 100% biologiques certifiés', 'Espèces locales et adaptées au climat', 'Suivi agronomique personnalisé inclus', 'Livraison possible sur Dakar et région'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: 'var(--text-charcoal)' }}>
                  <CheckCircle2 size={18} color="var(--primary)" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '440px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', position: 'relative' }}>
            <img
              src="/images/moringa.jpg"
              alt="Jeunes plants de pépinière"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', backgroundColor: 'rgba(0,0,0,0.65)', color: 'white', padding: '12px 20px', borderRadius: '8px', backdropFilter: 'blur(5px)', fontSize: '0.9rem' }}>
              Jeunes plants de Moringa prêts à être transplantés — Mboro, Khondio.
            </div>
          </div>
        </div>

        {/* ─── WORKFLOW : DE LA GRAINE AU PLANT ─── */}
        <div className="card" style={{ border: 'none', backgroundColor: '#E8F5E9', padding: '52px 44px', marginBottom: '70px', boxShadow: '0 8px 30px rgba(0,0,0,0.03)' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', marginBottom: '12px' }}>Processus de production</span>
            <h2 style={{ color: 'var(--text-charcoal)', margin: 0, fontSize: '2rem' }}>De la graine au plant certifié</h2>
            <p style={{ maxWidth: '620px', margin: '10px auto 0', color: 'var(--text-muted)', fontSize: '1rem' }}>
              Un savoir-faire rigoureux pour garantir la qualité de chaque plant que vous recevez.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { step: '1', title: 'Sélection des graines', icon: <Leaf size={30} color="white" />, bg: '#1B5E20', desc: "Collecte et tri des meilleures graines locales non hybrides, stockées en conditions optimales." },
              { step: '2', title: 'Germination contrôlée', icon: <Sprout size={30} color="white" />, bg: '#2E7D32', desc: "Semis en substrat organique certifié, en couches chaudes ou en propagateur selon l'espèce." },
              { step: '3', title: 'Croissance en pépinière', icon: <Sun size={30} color="white" />, bg: '#388E3C', desc: "Élevage de 2 à 6 mois selon l'espèce, avec arrosage au goutte-à-goutte solaire et tuteurage." },
              { step: '4', title: 'Livraison & Plantation', icon: <CheckCircle2 size={30} color="white" />, bg: '#43A047', desc: "Plants repiqués, étiquetés et livrés avec fiche technique et recommandations de plantation." }
            ].map((item, idx) => (
              <div key={idx} className="card" style={{ backgroundColor: 'white', border: 'none', padding: '28px 20px', textAlign: 'center', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '64px', height: '64px', backgroundColor: item.bg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: item.bg, letterSpacing: '1px', textTransform: 'uppercase' }}>Étape {item.step}</span>
                <h4 style={{ margin: '8px 0 12px', fontSize: '1.1rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── GALERIE INTERACTIVE ─── */}
        <div className="card" style={{ border: 'none', backgroundColor: 'white', padding: '50px', marginBottom: '70px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="badge" style={{ backgroundColor: '#2E7D32', color: 'white', marginBottom: '12px' }}>Notre pépinière en images</span>
            <h2 style={{ color: 'var(--text-charcoal)', margin: 0, fontSize: '2rem' }}>Visitez nos espaces de production</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Découvrez nos installations, espèces cultivées et techniques de production.</p>
          </div>
          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '450px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
            <img src={photos[activePhotoIdx].url} alt={photos[activePhotoIdx].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0) 100%)', color: 'white', padding: '40px 32px 32px', zIndex: 2 }}>
              <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '8px' }}>{photos[activePhotoIdx].title}</h3>
              <p style={{ color: '#C8E6C9', margin: 0, fontSize: '0.98rem', lineHeight: '1.5', maxWidth: '700px' }}>{photos[activePhotoIdx].desc}</p>
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
              <button key={idx} onClick={() => setActivePhotoIdx(idx)} style={{ width: '12px', height: '12px', borderRadius: '50%', border: 'none', backgroundColor: idx === activePhotoIdx ? 'var(--primary)' : '#CFD8DC', cursor: 'pointer', transition: 'background 0.3s' }} />
            ))}
          </div>
        </div>

        {/* ─── CATALOGUE DYNAMIQUE ─── */}
        <div id="catalogue">
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', marginBottom: '12px' }}>Stock disponible</span>
            <h2 style={{ fontSize: '2rem', color: 'var(--text-charcoal)', margin: 0 }}>Notre catalogue de plants</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Filtrez par catégorie ou besoin en eau pour trouver la plante idéale.</p>
          </div>

          {/* Barre de filtres */}
          <div className="card" style={{ padding: '24px 28px', marginBottom: '40px', display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center', backgroundColor: 'white', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            {/* Recherche textuelle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexGrow: 1, minWidth: '260px' }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Rechercher une plante (ex: moringa, menthe)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 40px',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')} 
                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
                  >
                    <X size={16} color="var(--text-muted)" />
                  </button>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Leaf size={20} color="var(--primary)" />
              <select className="form-control" style={{ width: 'auto', minWidth: '200px', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="all">Toutes les catégories</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Droplets size={20} color="#2196F3" />
              <select className="form-control" style={{ width: 'auto', minWidth: '200px', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }} value={waterFilter} onChange={(e) => setWaterFilter(e.target.value)}>
                <option value="all">Tous besoins en eau</option>
                <option value="faible">Faible (Résistant sécheresse)</option>
                <option value="moyen">Moyen</option>
                <option value="fort">Fort (Arrosage régulier)</option>
              </select>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              <strong style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>{filteredPlants.length}</strong> plante(s) trouvée(s)
            </div>
          </div>

          {/* Grille des plantes */}
          {filteredPlants.length > 0 ? (
            <div className="grid-3" style={{ gap: '30px' }}>
              {filteredPlants.map(plant => (
                <div key={plant.id} className="card hover-scale" style={{ border: 'none', padding: 0, overflow: 'hidden', boxShadow: '0 8px 28px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column' }}>
                  <div className="card-img-wrapper" style={{ height: '240px', cursor: 'pointer' }} onClick={() => setSelectedPlant(plant)}>
                    <img src={plant.image} alt={plant.name} className="card-img" />
                    <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '6px' }}>
                      {(plant.location === 'mboro' || plant.location === 'both') && (
                        <span className="badge badge-mboro" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Mboro</span>
                      )}
                      {(plant.location === 'ngaparou' || plant.location === 'both') && (
                        <span className="badge badge-ngaparou" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Ngaparou</span>
                      )}
                    </div>
                  </div>
                  <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '24px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '8px', display: 'block', letterSpacing: '0.5px' }}>
                      {plant.category}
                    </span>
                    <h3 style={{ fontSize: '1.35rem', marginBottom: '14px', color: 'var(--text-charcoal)', lineHeight: '1.3', cursor: 'pointer' }} onClick={() => setSelectedPlant(plant)}>{plant.name}</h3>
                    <p style={{ fontSize: '0.95rem', marginBottom: '20px', flexGrow: 1, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      {plant.description}
                    </p>
                    <div style={{ backgroundColor: '#F4FAF4', padding: '16px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-charcoal)' }}>
                        <Sun size={16} color="#F57C00" /> <span><strong>Soleil :</strong> {formatSun(plant.sun)}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-charcoal)' }}>
                        <Droplets size={16} color="#2196F3" /> <span><strong>Eau :</strong> {formatWater(plant.water)}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'var(--primary)', marginTop: '4px' }}>
                        <Info size={16} style={{ marginTop: '2px', flexShrink: 0 }} /> <span><em>{plant.tips}</em></span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '18px', gap: '8px' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-charcoal)', whiteSpace: 'nowrap' }}>
                        {plant.price.toLocaleString('fr-FR')} FCFA
                      </span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          className="btn btn-secondary"
                          style={{ padding: '8px 12px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}
                          onClick={() => setSelectedPlant(plant)}
                        >
                          <Info size={14} /> Détails
                        </button>
                        <button
                          className="btn btn-primary"
                          style={{ padding: '8px 14px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
                          onClick={() => addToCart(plant, 'plant')}
                          disabled={plant.stock === 0}
                        >
                          <ShoppingCart size={14} />
                          {plant.stock > 0 ? 'Ajouter' : 'Rupture'}
                        </button>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', marginTop: '10px', fontSize: '0.82rem', fontWeight: 700, color: plant.stock < 20 ? '#D32F2F' : 'var(--text-muted)' }}>
                      {plant.stock > 0 ? `${plant.stock} en stock` : 'Bientôt disponible'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center" style={{ padding: '60px', alignItems: 'center', border: 'none' }}>
              <Leaf size={64} color="var(--border-color)" style={{ marginBottom: '24px' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Aucune plante ne correspond à vos critères</h3>
              <p style={{ color: 'var(--text-muted)' }}>Essayez de modifier vos filtres ou sélectionnez "Toutes nos fermes" dans la navigation.</p>
              <button className="btn btn-secondary mt-16" onClick={() => { setCategoryFilter('all'); setWaterFilter('all'); }}>
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

        {/* ─── CTA FINAL ─── */}
        <div className="card" style={{
          border: 'none',
          background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
          color: 'white',
          padding: '52px',
          borderRadius: '24px',
          textAlign: 'center',
          marginTop: '70px',
          boxShadow: '0 15px 40px rgba(27,94,32,0.25)'
        }}>
          <span className="badge" style={{ backgroundColor: 'var(--accent)', color: 'white', marginBottom: '16px' }}>Commande professionnelle</span>
          <h2 style={{ color: 'white', fontSize: '2.2rem', marginBottom: '16px' }}>Besoin d'un grand volume ?</h2>
          <p style={{ maxWidth: '620px', margin: '0 auto 32px', color: '#C8E6C9', fontSize: '1.1rem', lineHeight: '1.7' }}>
            Collectivités, entreprises paysagistes, projets de reboisement... Contactez-nous pour un devis personnalisé avec livraison sur site incluse.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/services" className="btn btn-accent" style={{ padding: '16px 32px', borderRadius: '999px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <ArrowRight size={20} /> Demander un devis
            </Link>
            <Link to="/trainings" className="btn" style={{ padding: '16px 32px', borderRadius: '999px', fontSize: '1rem', border: '1px solid white', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Nos formations horticoles
            </Link>
          </div>
        </div>

      </div>

      {/* ─── MODAL DÉTAILS DE LA PLANTE ─── */}
      {selectedPlant && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          boxSizing: 'border-box'
        }}
        onClick={() => setSelectedPlant(null)}
        >
          <div style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            position: 'relative',
            boxSizing: 'border-box'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton de fermeture */}
            <button
              onClick={() => setSelectedPlant(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <X size={20} color="var(--text-charcoal)" />
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 0 }}>
              {/* Image de la plante */}
              <div style={{ height: '320px', minHeight: '100%', position: 'relative' }}>
                <img
                  src={selectedPlant.image}
                  alt={selectedPlant.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', gap: '6px' }}>
                  {(selectedPlant.location === 'mboro' || selectedPlant.location === 'both') && (
                    <span className="badge badge-mboro" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Mboro</span>
                  )}
                  {(selectedPlant.location === 'ngaparou' || selectedPlant.location === 'both') && (
                    <span className="badge badge-ngaparou" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Ngaparou</span>
                  )}
                </div>
              </div>

              {/* Contenu détaillé */}
              <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '8px', display: 'block', letterSpacing: '0.5px' }}>
                  {selectedPlant.category}
                </span>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--text-charcoal)', marginBottom: '16px', lineHeight: '1.2' }}>{selectedPlant.name}</h2>
                
                <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
                  {selectedPlant.description}
                </p>

                {/* Fiche technique de culture */}
                <div style={{ backgroundColor: '#F4FAF4', padding: '18px', borderRadius: '16px', marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.92rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-charcoal)' }}>
                    <Sun size={18} color="#F57C00" /> <span><strong>Besoins en soleil :</strong> {formatSun(selectedPlant.sun)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-charcoal)' }}>
                    <Droplets size={18} color="#2196F3" /> <span><strong>Besoins en arrosage :</strong> {formatWater(selectedPlant.water)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-charcoal)' }}>
                    <Leaf size={18} color="var(--primary)" /> <span><strong>Type de sol idéal :</strong> {selectedPlant.soil}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'var(--primary)', marginTop: '4px', borderTop: '1px solid rgba(46, 125, 50, 0.1)', paddingTop: '10px' }}>
                    <Info size={18} style={{ marginTop: '2px', flexShrink: 0 }} /> <span><strong>Conseils de culture :</strong> <em>{selectedPlant.tips}</em></span>
                  </div>
                </div>

                {/* Prix et action */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                  <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-charcoal)' }}>
                    {selectedPlant.price.toLocaleString('fr-FR')} FCFA
                  </span>
                  
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      className="btn btn-primary"
                      style={{ padding: '12px 28px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: 'var(--radius-full)', fontSize: '1rem' }}
                      onClick={() => { addToCart(selectedPlant, 'plant'); setSelectedPlant(null); }}
                      disabled={selectedPlant.stock === 0}
                    >
                      <ShoppingCart size={20} />
                      {selectedPlant.stock > 0 ? 'Ajouter au panier' : 'Rupture'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nursery;
