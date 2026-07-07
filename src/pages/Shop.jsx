import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  ShoppingCart, Tag, Filter, CheckCircle, 
  ChevronLeft, ChevronRight, ArrowRight, Sparkles, Package, Leaf,
  Search, X, Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Shop = () => {
  const { equipment, addToCart, activeFermeFilter } = useContext(AppContext);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Galerie de photos thématiques boutique agricole
  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1000&auto=format&fit=crop',
      title: 'Outils manuels certifiés bio',
      desc: 'Nos outils sont sélectionnés pour leur durabilité et leur ergonomie, adaptés aux sols sableux et latéritiques des Niayes.'
    },
    {
      url: 'https://images.unsplash.com/photo-1592824834252-b65a2370f403?q=80&w=1000&auto=format&fit=crop',
      title: 'Compost organique maison',
      desc: 'Fabriqué sur nos fermes à partir de déchets végétaux et de fumier de volaille, notre compost enrichit durablement vos sols.'
    },
    {
      url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1000&auto=format&fit=crop',
      title: 'Miel pur de nos ruches',
      desc: "Notre miel brut d'eucalyptus des Niayes est extrait à froid pour préserver toutes ses enzymes et ses bienfaits naturels."
    }
  ];

  const handleNextPhoto = () => setActivePhotoIdx((prev) => (prev + 1) % photos.length);
  const handlePrevPhoto = () => setActivePhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);

  const siteEquipment = equipment.filter(item =>
    activeFermeFilter === 'all' || item.location === 'both' || item.location === activeFermeFilter
  );

  const categories = [...new Set(siteEquipment.map(item => item.category))].filter(Boolean);
  const isCategoryAvailable = categoryFilter === 'all' || categories.includes(categoryFilter);
  const activeCategory = isCategoryAvailable ? categoryFilter : 'all';
  const filteredEquipment = siteEquipment.filter(item => {
    const matchCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
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
        backgroundImage: 'url("https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1400&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(21, 101, 192, 0.82) 0%, rgba(27, 94, 32, 0.65) 100%)', zIndex: 0 }}></div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
          <span className="badge" style={{ backgroundColor: 'var(--accent)', color: 'white', marginBottom: '20px', fontSize: '0.9rem', padding: '7px 20px', letterSpacing: '1px', display: 'inline-block' }}>
            Produits locaux &amp; équipements
          </span>
          <h1 style={{ color: 'white', marginBottom: '20px', fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', lineHeight: 1.1 }}>
            Boutique Agricole
          </h1>
          <p style={{ margin: '0 auto', fontSize: '1.2rem', color: '#BBDEFB', maxWidth: '680px', lineHeight: 1.7 }}>
            Équipements professionnels, matières organiques, semences bio et produits transformés de nos fermes. Tout pour cultiver durablement.
          </p>
          <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#catalogue-shop" className="btn btn-accent" style={{ padding: '14px 32px', borderRadius: '999px', fontSize: '1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <ShoppingCart size={18} /> Voir les produits
            </a>
            <Link to="/nursery" className="btn" style={{ padding: '14px 32px', borderRadius: '999px', fontSize: '1rem', border: '1px solid white', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Voir la pépinière
            </Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '60px' }}>

        {/* ─── PRÉSENTATION ─── */}
        <div className="grid-2" style={{ gap: '40px', alignItems: 'center', marginBottom: '70px' }}>
          <div className="card" style={{ border: 'none', padding: '44px', backgroundColor: 'white', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
            <span className="badge" style={{ backgroundColor: '#1565C0', color: 'white', marginBottom: '16px' }}>Circuit court</span>
            <h2 style={{ color: 'var(--text-charcoal)', marginBottom: '24px', fontSize: '2rem' }}>Directement de nos fermes</h2>
            <p style={{ lineHeight: 1.9, fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Notre boutique référence les <strong>matières organiques</strong>, <strong>outils agroécologiques</strong> et <strong>produits transformés</strong> issus directement de nos deux sites de Mboro et Ngaparou. Chaque produit est sélectionné avec exigence pour sa performance et son impact écologique réduit.
            </p>
            <p style={{ lineHeight: 1.9, fontSize: '1.05rem', color: 'var(--text-muted)' }}>
              En achetant ici, vous soutenez directement les producteurs locaux et contribuez à financer nos programmes de reboisement et de formation des jeunes agriculteurs des Niayes.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '28px' }}>
              {['Produits 100% naturels et certifiés', 'Fabrication artisanale locale', 'Livraison sur Dakar et sa région', 'Commandes groupées disponibles'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: 'var(--text-charcoal)' }}>
                  <CheckCircle size={18} color="#1565C0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '440px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1592824834252-b65a2370f403?q=80&w=800&auto=format&fit=crop"
              alt="Compost organique"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', backgroundColor: 'rgba(0,0,0,0.65)', color: 'white', padding: '12px 20px', borderRadius: '8px', backdropFilter: 'blur(5px)', fontSize: '0.9rem' }}>
              Compost bio de qualité premium fabriqué sur nos fermes de Mboro.
            </div>
          </div>
        </div>

        {/* ─── AVANTAGES PRODUITS ─── */}
        <div style={{ marginBottom: '70px' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span className="badge" style={{ backgroundColor: '#1565C0', color: 'white', marginBottom: '12px' }}>Pourquoi nous choisir ?</span>
            <h2 style={{ fontSize: '2rem', color: 'var(--text-charcoal)', margin: 0 }}>Des produits qui font la différence</h2>
          </div>
          <div className="grid-3" style={{ gap: '28px' }}>
            {[
              { title: 'Qualité certifiée', desc: "Chaque produit est contrôlé selon notre charte de qualité agroécologique avant d'être mis en vente.", icon: <CheckCircle size={24} color="#1565C0" />, bg: '#E3F2FD' },
              { title: 'Prix justes et directs', desc: "En achetant directement, vous éliminez les intermédiaires. Le producteur est rémunéré équitablement.", icon: <Tag size={24} color="var(--primary)" />, bg: 'var(--primary-light)' },
              { title: 'Zéro déchet garanti', desc: "Nos emballages sont biodégradables ou réutilisables. Les produits sont formulés pour durer et ne pas polluer.", icon: <Leaf size={24} color="#2E7D32" />, bg: '#E8F5E9' }
            ].map((s, i) => (
              <div key={i} className="card hover-scale" style={{ border: 'none', padding: '32px', backgroundColor: 'white', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
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
        <div className="card" style={{ border: 'none', backgroundColor: 'white', padding: '50px', marginBottom: '70px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="badge" style={{ backgroundColor: '#1565C0', color: 'white', marginBottom: '12px' }}>Notre sélection en images</span>
            <h2 style={{ color: 'var(--text-charcoal)', margin: 0, fontSize: '2rem' }}>Nos produits phares</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Découvrez nos gammes d'outils, fertilisants et produits naturels.</p>
          </div>
          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '420px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
            <img src={photos[activePhotoIdx].url} alt={photos[activePhotoIdx].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0) 100%)', color: 'white', padding: '40px 32px 32px', zIndex: 2 }}>
              <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '8px' }}>{photos[activePhotoIdx].title}</h3>
              <p style={{ color: '#BBDEFB', margin: 0, fontSize: '0.98rem', lineHeight: '1.5', maxWidth: '700px' }}>{photos[activePhotoIdx].desc}</p>
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
              <button key={idx} onClick={() => setActivePhotoIdx(idx)} style={{ width: '12px', height: '12px', borderRadius: '50%', border: 'none', backgroundColor: idx === activePhotoIdx ? '#1565C0' : '#CFD8DC', cursor: 'pointer', transition: 'background 0.3s' }} />
            ))}
          </div>
        </div>

        {/* ─── CATALOGUE DYNAMIQUE ─── */}
        <div id="catalogue-shop">
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', marginBottom: '12px' }}>Stock disponible</span>
            <h2 style={{ fontSize: '2rem', color: 'var(--text-charcoal)', margin: 0 }}>Tous nos produits</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Filtrez par catégorie pour trouver ce dont vous avez besoin.</p>
          </div>

          {/* Barre de recherche boutique */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', backgroundColor: 'white', padding: '16px 20px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Rechercher un équipement ou produit (ex: compost, ruche, savon)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.98rem',
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

          {/* Filtres par catégorie */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '36px', overflowX: 'auto', paddingBottom: '12px', flexWrap: 'wrap' }}>
            <button
              className={`btn ${activeCategory === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setCategoryFilter('all')}
              style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '999px', padding: '10px 22px' }}
            >
              <Filter size={16} /> Tous les produits
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setCategoryFilter(cat)}
                style={{ whiteSpace: 'nowrap', borderRadius: '999px', padding: '10px 22px' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grille Produits */}
          {filteredEquipment.length > 0 ? (
            <div className="grid-4">
              {filteredEquipment.map(item => (
                <div key={item.id} className="card hover-scale" style={{ display: 'flex', flexDirection: 'column', border: 'none', padding: 0, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
                  <div style={{ height: '220px', overflow: 'hidden', position: 'relative', backgroundColor: '#F5F5F5', cursor: 'pointer' }} onClick={() => setSelectedProduct(item)}>
                    {item.image ? (
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    ) : (
                      <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--bg-sand)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Package size={40} color="var(--primary)" />
                        </div>
                      </div>
                    )}
                    {item.stock > 0 && item.stock < 15 && (
                      <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#FFF3E0', color: '#E65100', padding: '4px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>
                        Bientôt épuisé
                      </div>
                    )}
                  </div>
                  <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '20px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {item.category}
                    </span>
                    <h4 style={{ marginBottom: '10px', fontSize: '1.1rem', color: 'var(--text-charcoal)', lineHeight: '1.3', cursor: 'pointer' }} onClick={() => setSelectedProduct(item)}>{item.name}</h4>
                    <p style={{ fontSize: '0.88rem', marginBottom: '18px', flexGrow: 1, color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '16px', gap: '4px' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-charcoal)', whiteSpace: 'nowrap' }}>
                        {item.price.toLocaleString('fr-FR')} FCFA
                      </span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          className="btn btn-secondary"
                          style={{ padding: '8px 10px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}
                          onClick={() => setSelectedProduct(item)}
                          title="Voir les détails"
                        >
                          <Info size={14} /> Details
                        </button>
                        <button
                          className="btn btn-primary"
                          style={{ padding: '8px 12px', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}
                          onClick={() => addToCart(item, 'equipment')}
                          disabled={item.stock === 0}
                          title="Ajouter au panier"
                        >
                          <ShoppingCart size={14} />
                          {item.stock > 0 ? 'Ajouter' : 'Rupture'}
                        </button>
                      </div>
                    </div>
                    {item.stock > 0 ? (
                      <span style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                        <CheckCircle size={12} /> {item.stock} en stock
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: '#D32F2F', marginTop: '8px', fontWeight: 600 }}>Rupture de stock</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center" style={{ padding: '60px', alignItems: 'center', border: 'none' }}>
              <Package size={64} color="var(--border-color)" style={{ marginBottom: '24px' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Aucun produit pour cette sélection</h3>
              <p style={{ color: 'var(--text-muted)' }}>Essayez de modifier votre filtre ou sélectionnez "Toutes nos fermes".</p>
              <button className="btn btn-secondary mt-16" onClick={() => setCategoryFilter('all')}>Voir tous les produits</button>
            </div>
          )}
        </div>

        {/* ─── CTA FINAL ─── */}
        <div className="card" style={{
          border: 'none',
          background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)',
          color: 'white',
          padding: '52px',
          borderRadius: '24px',
          textAlign: 'center',
          marginTop: '70px',
          boxShadow: '0 15px 40px rgba(13,71,161,0.25)'
        }}>
          <span className="badge" style={{ backgroundColor: 'var(--accent)', color: 'white', marginBottom: '16px' }}>Commande spéciale</span>
          <h2 style={{ color: 'white', fontSize: '2.2rem', marginBottom: '16px' }}>Un produit que vous ne trouvez pas ?</h2>
          <p style={{ maxWidth: '620px', margin: '0 auto 32px', color: '#BBDEFB', fontSize: '1.1rem', lineHeight: '1.7' }}>
            Contactez-nous pour des commandes personnalisées, des semences spécifiques ou des formules de terreau sur-mesure pour vos projets agricoles.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/services" className="btn btn-accent" style={{ padding: '16px 32px', borderRadius: '999px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <ArrowRight size={20} /> Nous contacter
            </Link>
            <Link to="/nursery" className="btn" style={{ padding: '16px 32px', borderRadius: '999px', fontSize: '1rem', border: '1px solid white', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} /> Voir la pépinière
            </Link>
          </div>
        </div>

      </div>

      {/* ─── MODAL DÉTAILS DU PRODUIT ─── */}
      {selectedProduct && (
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
        onClick={() => setSelectedProduct(null)}
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
              onClick={() => setSelectedProduct(null)}
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
              {/* Image du produit */}
              <div style={{ height: '320px', minHeight: '100%', position: 'relative', backgroundColor: '#F5F5F5' }}>
                {selectedProduct.image ? (
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Package size={80} color="var(--primary)" />
                  </div>
                )}
                <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', gap: '6px' }}>
                  {(selectedProduct.location === 'mboro' || selectedProduct.location === 'both') && (
                    <span className="badge badge-mboro" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Mboro</span>
                  )}
                  {(selectedProduct.location === 'ngaparou' || selectedProduct.location === 'both') && (
                    <span className="badge badge-ngaparou" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Ngaparou</span>
                  )}
                </div>
              </div>

              {/* Contenu détaillé */}
              <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', color: '#1565C0', fontWeight: 700, marginBottom: '8px', display: 'block', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  {selectedProduct.category}
                </span>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--text-charcoal)', marginBottom: '16px', lineHeight: '1.2' }}>{selectedProduct.name}</h2>
                
                <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
                  {selectedProduct.description}
                </p>

                {/* Spécifications techniques */}
                {selectedProduct.specs && (
                  <div style={{ backgroundColor: '#F4F7FA', padding: '18px', borderRadius: '16px', marginBottom: '28px', fontSize: '0.92rem' }}>
                    <h4 style={{ marginBottom: '10px', color: '#1565C0', fontSize: '1.05rem' }}>Caractéristiques du produit :</h4>
                    <p style={{ margin: 0, color: 'var(--text-charcoal)', lineHeight: 1.5 }}>{selectedProduct.specs}</p>
                  </div>
                )}

                {/* Prix et action */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                  <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-charcoal)' }}>
                    {selectedProduct.price.toLocaleString('fr-FR')} FCFA
                  </span>
                  
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      className="btn btn-primary"
                      style={{ padding: '12px 28px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: 'var(--radius-full)', fontSize: '1rem' }}
                      onClick={() => { addToCart(selectedProduct, 'equipment'); setSelectedProduct(null); }}
                      disabled={selectedProduct.stock === 0}
                    >
                      <ShoppingCart size={20} />
                      {selectedProduct.stock > 0 ? 'Ajouter au panier' : 'Rupture'}
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

export default Shop;
