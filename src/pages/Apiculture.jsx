import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { 
  Hexagon, Droplets, Leaf, ArrowLeft, GraduationCap, 
  ShoppingBag, Star, Sparkles, CheckCircle2, ChevronLeft, ChevronRight 
} from 'lucide-react';

const Apiculture = () => {
  // Liste de photos haute résolution en rapport direct avec l'apiculture
  const photos = [
    {
      url: '/images/honey.jpg',
      title: 'Miel pur et récolte artisanale',
      desc: 'Notre miel brut des Niayes est récolté de manière traditionnelle, filtré à froid pour conserver toutes ses enzymes et bienfaits.'
    },
    {
      url: '/images/beehives.jpg',
      title: 'Les ruches Kényanes de Mboro',
      desc: 'Installées dans nos forêts d\'eucalyptus à Mboro, nos ruches horizontales respectent le mode de vie naturel des colonies.'
    },
    {
      url: '/images/bee.jpg',
      title: 'Abeilles butineuses locales',
      desc: 'Nos abeilles (Apis mellifera adansonii) butinent la flore naturelle des Niayes : baobabs, eucalyptus et fleurs sauvages.'
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
      <SEO title="Apiculture" description="Production de miel bio et services de pollinisation. Découvrez nos ruches écologiques et nos produits de la ruche de haute qualité." keywords="apiculture Sénégal, miel bio, ruche écologique, pollinisation" />
      
      {/* Hero Section Apiculture */}
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
        backgroundImage: 'url("/images/honey.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        {/* Overlay premium ambré/or */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(230, 81, 0, 0.75) 0%, rgba(142, 36, 170, 0.55) 100%)',
          zIndex: 0
        }}></div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '850px', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
          <Link to="/" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: '#FFF3E0', 
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
            Apiculture Écoresponsable
          </h1>
          <p style={{ margin: '0 auto', fontSize: '1.25rem', color: '#FFF3E0', maxWidth: '680px', lineHeight: 1.6 }}>
            Découvrez notre démarche de protection des abeilles, de pollinisation naturelle et notre miel sauvage d'excellence récolté à Mboro.
          </p>
        </div>
      </section>

      {/* Contenu principal */}
      <div className="container" style={{ marginTop: '50px' }}>
        
        {/* Section 1 : Introduction & Concept */}
        <div className="grid-2" style={{ gap: '40px', alignItems: 'center', marginBottom: '60px' }}>
          <div className="card" style={{ border: 'none', padding: '40px', backgroundColor: 'var(--white)', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
            <span className="badge" style={{ backgroundColor: '#8E24AA', color: 'white', marginBottom: '16px' }}>Biodiversité active</span>
            <h2 style={{ color: 'var(--text-charcoal)', marginBottom: '24px', fontSize: '2rem' }}>Le rôle crucial des abeilles</h2>
            <p style={{ lineHeight: 1.8, fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Nos ruches sont implantées à l'abri du vent et des bruits, dans les zones boisées et sauvages de notre ferme de Mboro. Elles accueillent l'abeille locale <strong>Apis mellifera adansonii</strong>, essentielle à la pollinisation naturelle de notre pépinière et de nos vergers fruitiers des Niayes.
            </p>
            <p style={{ lineHeight: 1.8, fontSize: '1.05rem', color: 'var(--text-muted)' }}>
              En protégeant ces colonies, nous augmentons de manière spectaculaire les rendements de nos manguiers, agrumes et cultures maraîchères de manière 100% écologique, tout en produisant un miel de très haute qualité gustative et nutritive.
            </p>
          </div>

          {/* Image illustrative zoomable */}
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '420px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', position: 'relative' }}>
            <img 
              src="/images/beehives.jpg" 
              alt="Hives and bees" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', padding: '12px 20px', borderRadius: '8px', backdropFilter: 'blur(5px)', fontSize: '0.9rem' }}>
              Nos ruches Kényanes horizontales en bois local.
            </div>
          </div>
        </div>

        {/* Schéma horizontal : Production du miel */}
        <div className="card" style={{ border: 'none', backgroundColor: '#FFF8E1', padding: '50px 40px', marginBottom: '60px', boxShadow: '0 8px 30px rgba(0,0,0,0.03)' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge" style={{ backgroundColor: '#E65100', color: 'white', marginBottom: '12px' }}>De la ruche au flacon</span>
            <h2 style={{ color: 'var(--text-charcoal)', margin: 0, fontSize: '2rem' }}>Notre charte de récolte du miel sauvage</h2>
            <p style={{ maxWidth: '650px', margin: '10px auto 0', color: 'var(--text-muted)' }}>Un processus respectueux de l'environnement et des abeilles.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            
            {[
              {
                step: '1',
                title: 'Butinage Sauvage',
                icon: <Leaf size={32} color="white" />,
                bg: '#E65100',
                desc: 'Les abeilles récoltent le nectar des fleurs d\'eucalyptus, de baobab et des manguiers de Mboro.'
              },
              {
                step: '2',
                title: 'Surplus Uniquement',
                icon: <Hexagon size={32} color="white" />,
                bg: '#F57C00',
                desc: 'Nous récoltons uniquement les rayons de miel excédentaires pour assurer les réserves de la colonie.'
              },
              {
                step: '3',
                title: 'Extraction à Froid',
                icon: <Droplets size={32} color="white" />,
                bg: '#8E24AA',
                desc: 'Le miel est pressé mécaniquement sans chauffage pour préserver tous les nutriments actifs.'
              },
              {
                step: '4',
                title: 'Miel Pur non Pasteurisé',
                icon: <ShoppingBag size={32} color="white" />,
                bg: '#6A1B9A',
                desc: 'Conditionnement direct en pots en verre, garantissant un miel 100% pur, sans eau ni sucre ajouté.'
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
            <h2 style={{ fontSize: '2rem' }}>Pourquoi notre miel est-il unique ?</h2>
          </div>

          <div className="grid-3" style={{ gap: '30px' }}>
            {[
              {
                title: 'Miel brut d\'Eucalyptus',
                desc: 'Un miel ambré foncé, caractérisé par des notes boisées et mentholées uniques, très recherché pour ses vertus apaisantes.',
                icon: <Hexagon size={24} color="#E65100" />
              },
              {
                title: 'Zéro Pesticide',
                desc: 'Nos ruchers sont situés au centre de nos terres agroécologiques, totalement éloignés des zones d\'agriculture chimique.',
                icon: <Sparkles size={24} color="#8E24AA" />
              },
              {
                title: 'Biodiversité Boostée',
                desc: 'Notre activité contribue activement à la protection de l\'abeille locale face aux défis climatiques du Sahel.',
                icon: <Leaf size={24} color="#2E7D32" />
              }
            ].map((stat, idx) => (
              <div key={idx} className="card hover-scale" style={{ border: 'none', padding: '32px', backgroundColor: 'var(--white)', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#FFF3E0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  {stat.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--text-charcoal)' }}>{stat.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Galerie photos réelles d'apiculture */}
        <div className="card" style={{ border: 'none', backgroundColor: 'var(--white)', padding: '48px', marginBottom: '60px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="badge" style={{ backgroundColor: '#8E24AA', color: 'white', marginBottom: '12px' }}>Photographies réelles</span>
            <h2 style={{ color: 'var(--text-charcoal)', margin: 0, fontSize: '2rem' }}>Notre ruche et miel en images</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Visualisez nos ruches écologiques et les abeilles en action.</p>
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
              <p style={{ color: '#FFF3E0', margin: 0, fontSize: '0.98rem', lineHeight: '1.5', maxWidth: '700px' }}>{photos[activePhotoIdx].desc}</p>
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
                  backgroundColor: idx === activePhotoIdx ? '#8E24AA' : '#CFD8DC',
                  cursor: 'pointer', transition: 'background 0.3s'
                }}
              />
            ))}
          </div>
        </div>

        {/* CTA : Lien boutique */}
        <div className="card" style={{ 
          border: 'none', 
          background: 'linear-gradient(135deg, #4A148C 0%, #7B1FA2 100%)', 
          color: 'white', 
          padding: '50px', 
          borderRadius: '24px', 
          textAlign: 'center',
          boxShadow: '0 15px 35px rgba(74,20,140,0.25)' 
        }}>
          <span className="badge" style={{ backgroundColor: 'var(--accent)', color: 'white', marginBottom: '16px' }}>Direct du producteur</span>
          <h2 style={{ color: 'white', fontSize: '2.2rem', marginBottom: '16px' }}>Goûtez à l'excellence de nos ruches</h2>
          <p style={{ maxWidth: '650px', margin: '0 auto 32px', color: '#FFF3E0', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Notre miel d'eucalyptus sauvage est disponible à la vente dans notre boutique. Soutenez l'apiculture durable locale en achetant directement notre production.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn btn-accent" style={{ padding: '16px 32px', borderRadius: '999px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <ShoppingBag size={20} /> Visiter la boutique
            </Link>
            <Link to="/trainings" className="btn" style={{ padding: '16px 32px', borderRadius: '999px', fontSize: '1rem', border: '1px solid white', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <GraduationCap size={20} /> Formations apicoles
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Apiculture;
