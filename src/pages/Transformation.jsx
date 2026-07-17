import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Droplets, Leaf, ArrowLeft, GraduationCap, 
  ShoppingBag, Sparkles, CheckCircle2, ChevronLeft, ChevronRight, Heart
} from 'lucide-react';

const Transformation = () => {
  // Liste de photos haute résolution en rapport direct avec la transformation de produits locaux (savons, huiles, compost)
  const photos = [
    {
      url: '/images/soaps.jpg',
      title: 'Savonnerie artisanale et organique',
      desc: 'Nos savons saponifiés à froid au Neem et Moringa purifient la peau tout en préservant son film hydrolipidique naturel.'
    },
    {
      url: '/images/oil.jpg',
      title: 'Huile pure de Baobab et de Neem',
      desc: 'Les graines locales sont pressées mécaniquement à froid sans solvant pour préserver 100% des acides gras essentiels et vitamines.'
    },
    {
      url: '/images/compost.jpg',
      title: 'Compost biologique et Biochar',
      desc: 'Le Biochar est activé biologiquement puis mélangé au compost aérobie pour régénérer la structure microbiologique des sols sahéliens.'
    }
  ];

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const handleNextPhoto = () => {
    setActivePhotoIdx((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = () => {
    setActivePhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-sand)', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Hero Section Transformation */}
      <section style={{ 
        position: 'relative', 
        height: '50vh', 
        minHeight: '400px',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
        color: 'white',
        backgroundImage: 'url("/images/oil.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        {/* Overlay premium vert forêt et turquoise */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.8) 0%, rgba(0, 131, 143, 0.6) 100%)',
          zIndex: 0
        }}></div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '850px', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
          <Link to="/" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: '#E8F5E9', 
            textDecoration: 'none', 
            fontWeight: 700, 
            marginBottom: '24px',
            fontSize: '0.95rem',
            padding: '8px 16px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '999px',
            backdropFilter: 'blur(5px)',
            transition: 'background 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          >
            <ArrowLeft size={16} /> Retour à l'accueil
          </Link>
          
          <h1 style={{ color: 'white', marginBottom: '16px', fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', lineHeight: 1.1 }}>
            Transformation locale
          </h1>
          <p style={{ margin: '0 auto', fontSize: '1.25rem', color: '#E8F5E9', maxWidth: '680px', lineHeight: 1.6 }}>
            Valorisons nos ressources locales : découvrez notre gamme de savons artisanaux, huiles pures pressées à froid et fertilisants bios.
          </p>
        </div>
      </section>

      {/* Contenu principal */}
      <div className="container" style={{ marginTop: '50px' }}>
        
        {/* Section 1 : Introduction & Concept */}
        <div className="grid-2" style={{ gap: '40px', alignItems: 'center', marginBottom: '60px' }}>
          <div className="card" style={{ border: 'none', padding: '40px', backgroundColor: 'var(--white)', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
            <span className="badge" style={{ backgroundColor: '#2E7D32', color: 'white', marginBottom: '16px' }}>Valorisation écoresponsable</span>
            <h2 style={{ color: 'var(--text-charcoal)', marginBottom: '24px', fontSize: '2rem' }}>L'excellence des produits locaux</h2>
            <p style={{ lineHeight: 1.8, fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Dans nos fermes de Mboro et Ngaparou, nous transformons de manière artisanale la biomasse et les matières végétales issues de nos parcelles d'excellence. Cette démarche s'inscrit dans un modèle <strong>Zéro Déchet</strong> où rien ne se perd et tout se valorise.
            </p>
            <p style={{ lineHeight: 1.8, fontSize: '1.05rem', color: 'var(--text-muted)' }}>
              Nous fabriquons des produits cosmétiques doux (savons saponifiés à froid au Neem et Moringa, huiles végétales pures de Baobab) et des fertilisants d'amendement de haute technicité (biochar activé au purin de moringa et compost aérobie) pour dynamiser la vie biologique des sols.
            </p>
          </div>

          {/* Image illustrative zoomable */}
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '420px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', position: 'relative' }}>
            <img 
              src="/images/soaps.jpg" 
              alt="Artisanal soaps" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', padding: '12px 20px', borderRadius: '8px', backdropFilter: 'blur(5px)', fontSize: '0.9rem' }}>
              Savons artisanaux moulés et découpés à la main à Ngaparou.
            </div>
          </div>
        </div>

        {/* Schéma horizontal : Workflow de transformation */}
        <div className="card" style={{ border: 'none', backgroundColor: '#E8F5E9', padding: '50px 40px', marginBottom: '60px', boxShadow: '0 8px 30px rgba(0,0,0,0.03)' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', marginBottom: '12px' }}>Qualité garantie</span>
            <h2 style={{ color: 'var(--text-charcoal)', margin: 0, fontSize: '2rem' }}>Notre charte de production éco-responsable</h2>
            <p style={{ maxWidth: '650px', margin: '10px auto 0', color: 'var(--text-muted)' }}>Des procédés doux qui respectent la nature et votre peau.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            
            {[
              {
                step: '1',
                title: 'Culture Organique',
                icon: <Leaf size={32} color="white" />,
                bg: '#2E7D32',
                desc: 'Toutes nos matières premières (feuilles de neem, moringa, graines) sont cultivées sans engrais de synthèse.'
              },
              {
                step: '2',
                title: 'Saponification à Froid',
                icon: <Heart size={32} color="white" />,
                bg: '#388E3C',
                desc: 'La glycérine naturelle est totalement préservée pour apporter un maximum de douceur hydratante.'
              },
              {
                step: '3',
                title: 'Pressage Mécanique',
                icon: <Droplets size={32} color="white" />,
                bg: '#00838F',
                desc: 'Les graines de baobab et neem sont pressées à froid sans solvant chimique pour garder 100% des vitamines.'
              },
              {
                step: '4',
                title: 'Valorisation Organique',
                icon: <ShoppingBag size={32} color="white" />,
                bg: '#006064',
                desc: 'Les résidus de pressage (tourteaux) et la biomasse végétale sont réinjectés dans nos composteurs.'
              }
            ].map((item, idx) => (
              <div key={idx} className="card" style={{ backgroundColor: 'var(--white)', border: 'none', padding: '24px', textAlign: 'center', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                <div style={{ 
                  width: '64px', height: '64px', backgroundColor: item.bg, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: item.bg, letterSpacing: '1px', textTransform: 'uppercase' }}>Étape {item.step}</span>
                <h4 style={{ margin: '8px 0 12px', fontSize: '1.15rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Avantages Écologiques */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem' }}>Des garanties d'excellence éthique</h2>
          </div>

          <div className="grid-3" style={{ gap: '30px' }}>
            {[
              {
                title: 'Cosmétique saine',
                desc: 'Sans parabène, sans conservateur chimique et sans huile de palme. Doux pour l\'épiderme et biodégradable.',
                icon: <Heart size={24} color="var(--primary)" />
              },
              {
                title: 'Régénération des Sols',
                desc: 'Notre Compost et Biochar retiennent l\'eau et régénèrent la structure microbienne des terres sahéliennes de façon durable.',
                icon: <Leaf size={24} color="#2E7D32" />
              },
              {
                title: 'Économie Circulaire',
                desc: 'Chaque achat soutient directement le travail des femmes et des jeunes artisans de Ngaparou et de Mboro.',
                icon: <Sparkles size={24} color="#00838F" />
              }
            ].map((stat, idx) => (
              <div key={idx} className="card hover-scale" style={{ border: 'none', padding: '32px', backgroundColor: 'var(--white)', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  {stat.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--text-charcoal)' }}>{stat.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Galerie photos réelles */}
        <div className="card" style={{ border: 'none', backgroundColor: 'var(--white)', padding: '48px', marginBottom: '60px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="badge" style={{ backgroundColor: '#2E7D32', color: 'white', marginBottom: '12px' }}>Photographies réelles</span>
            <h2 style={{ color: 'var(--text-charcoal)', margin: 0, fontSize: '2rem' }}>Notre pôle en images</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Découvrez nos laboratoires et ateliers de transformation locale.</p>
          </div>

          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '450px', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
            <img 
              src={photos[activePhotoIdx].url} 
              alt={photos[activePhotoIdx].title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            {/* Overlay d'information textuel */}
            <div style={{ 
              position: 'absolute', bottom: 0, left: 0, right: 0, 
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)',
              color: 'white', padding: '40px 32px 32px', zIndex: 2 
            }}>
              <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '8px' }}>{photos[activePhotoIdx].title}</h3>
              <p style={{ color: '#E8F5E9', margin: 0, fontSize: '0.98rem', lineHeight: '1.5', maxWidth: '700px' }}>{photos[activePhotoIdx].desc}</p>
            </div>

            {/* Flèches de navigation carrousel */}
            <button 
              onClick={handlePrevPhoto}
              style={{
                position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
                width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', cursor: 'pointer', backdropFilter: 'blur(5px)', zIndex: 3,
                transition: 'background 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.4)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            >
              <ChevronLeft size={24} />
            </button>

            <button 
              onClick={handleNextPhoto}
              style={{
                position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
                width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', cursor: 'pointer', backdropFilter: 'blur(5px)', zIndex: 3,
                transition: 'background 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.4)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Indicateurs de diapositives */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
            {photos.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActivePhotoIdx(idx)}
                style={{
                  width: '12px', height: '12px', borderRadius: '50%', border: 'none',
                  backgroundColor: idx === activePhotoIdx ? 'var(--primary)' : '#CFD8DC',
                  cursor: 'pointer', transition: 'background 0.3s'
                }}
              />
            ))}
          </div>
        </div>

        {/* CTA : Boutique */}
        <div className="card" style={{ 
          border: 'none', 
          background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)', 
          color: 'white', 
          padding: '50px', 
          borderRadius: '24px', 
          textAlign: 'center',
          boxShadow: '0 15px 35px rgba(27,94,32,0.25)' 
        }}>
          <span className="badge" style={{ backgroundColor: 'var(--accent)', color: 'white', marginBottom: '16px' }}>Sain & Zéro Déchet</span>
          <h2 style={{ color: 'white', fontSize: '2.2rem', marginBottom: '16px' }}>Adoptez nos produits éco-responsables</h2>
          <p style={{ maxWidth: '650px', margin: '0 auto 32px', color: '#E8F5E9', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Nos savons, huiles végétales et sacs de compost biologique sont tous disponibles à la vente dans notre boutique en ligne.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn btn-accent" style={{ padding: '16px 32px', borderRadius: '999px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <ShoppingBag size={20} /> Visiter la boutique
            </Link>
            <Link to="/trainings" className="btn" style={{ padding: '16px 32px', borderRadius: '999px', fontSize: '1rem', border: '1px solid white', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <GraduationCap size={20} /> Formations pratiques
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Transformation;
