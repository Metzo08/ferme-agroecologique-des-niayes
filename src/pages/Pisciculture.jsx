import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Fish, Droplets, Leaf, ArrowLeft, GraduationCap, 
  Layers, Waves, Heart, Sparkles, CheckCircle2, ChevronLeft, ChevronRight 
} from 'lucide-react';

const Pisciculture = () => {
  // Liste de photos haute résolution en rapport direct avec la pisciculture et l'aquaponie
  const photos = [
    {
      url: '/images/aquaponics.jpg',
      title: 'Bassins de pisciculture sous serre',
      desc: 'Nos installations modernes de pisciculture en milieu contrôlé permettent une gestion de l\'eau rigoureuse et une protection optimale des poissons.'
    },
    {
      url: '/images/fish.jpg',
      title: 'Élevage responsable de Tilapias',
      desc: 'Les Tilapias sont élevés dans des conditions d\'eau optimales, nourris avec des intrants naturels et locaux, sans antibiotiques.'
    },
    {
      url: '/images/aquaponics.jpg',
      title: 'Radeaux d\'aquaponie végétale',
      desc: 'Les plantes de maraîchage poussent directement sur des supports flottants, absorbant les nutriments organiques issus de l\'eau des poissons.'
    },
    {
      url: '/images/microbiology.jpg',
      title: 'Contrôle agronomique et microbiologique',
      desc: 'Suivi permanent de la qualité de l\'eau et de la flore microbienne pour garantir l\'équilibre parfait entre les poissons et les plantes.'
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
      
      {/* Hero Section dédiée à la Pisciculture */}
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
        backgroundImage: 'url("/images/aquaponics.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        {/* Overlay premium vert-bleu eau */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(0, 96, 100, 0.8) 0%, rgba(27, 94, 32, 0.6) 100%)',
          zIndex: 0
        }}></div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '850px', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
          <Link to="/" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: '#E0F7FA', 
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
            Pisciculture & Aquaponie
          </h1>
          <p style={{ margin: '0 auto', fontSize: '1.25rem', color: '#E0F7FA', maxWidth: '680px', lineHeight: 1.6 }}>
            Découvrez nos systèmes intégrés d'élevage de poissons respectueux de l'environnement et nos boucles fermées d'aquaponie aux Niayes.
          </p>
        </div>
      </section>

      {/* Contenu principal */}
      <div className="container" style={{ marginTop: '50px' }}>
        
        {/* Section 1 : Introduction & Concept */}
        <div className="grid-2" style={{ gap: '40px', alignItems: 'center', marginBottom: '60px' }}>
          <div className="card" style={{ border: 'none', padding: '40px', backgroundColor: 'white', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
            <span className="badge" style={{ backgroundColor: '#00838F', color: 'white', marginBottom: '16px' }}>Approche agroécologique</span>
            <h2 style={{ color: 'var(--text-charcoal)', marginBottom: '24px', fontSize: '2rem' }}>L'élevage de poissons responsable</h2>
            <p style={{ lineHeight: 1.8, fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Notre pôle aquacole à Mboro (Khondio) est conçu pour produire des protéines saines tout en économisant les ressources. Nous élevons principalement du <strong>Tilapia du Nil</strong> et du <strong>Poisson-chat africain</strong>, deux espèces locales particulièrement adaptées à notre climat et robustes.
            </p>
            <p style={{ lineHeight: 1.8, fontSize: '1.05rem', color: 'var(--text-muted)' }}>
              Les poissons sont installés dans des bassins écologiques à température contrôlée. L'eau fait l'objet d'un suivi biologique constant pour préserver la santé des espèces sans aucun recours aux intrants ou antibiotiques de synthèse.
            </p>
          </div>

          {/* Image illustrative zoomable */}
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '420px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', position: 'relative' }}>
            <img 
              src="/images/fish.jpg" 
              alt="Tilapias and farming" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', padding: '12px 20px', borderRadius: '8px', backdropFilter: 'blur(5px)', fontSize: '0.9rem' }}>
              Élevage biologique de Tilapias en eau douce filtrée.
            </div>
          </div>
        </div>

        {/* Section Interactive : Le schéma de fonctionnement de l'Aquaponie */}
        <div className="card" style={{ border: 'none', backgroundColor: '#E0F2F1', padding: '50px 40px', marginBottom: '60px', boxShadow: '0 8px 30px rgba(0,0,0,0.03)' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', marginBottom: '12px' }}>Écosystème circulaire</span>
            <h2 style={{ color: 'var(--text-charcoal)', margin: 0, fontSize: '2rem' }}>Comment fonctionne notre boucle d'Aquaponie ?</h2>
            <p style={{ maxWidth: '650px', margin: '10px auto 0', color: 'var(--text-muted)' }}>Un système vertueux où les déchets des uns deviennent les ressources des autres.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', position: 'relative' }}>
            
            {[
              {
                step: '1',
                title: 'Bassins de Poissons',
                icon: <Fish size={32} color="white" />,
                bg: '#00838F',
                desc: 'Les poissons produisent des effluents organiques riches en nutriments minéraux.'
              },
              {
                step: '2',
                title: 'Bio-filtration',
                icon: <Waves size={32} color="white" />,
                bg: '#0097A7',
                desc: 'Des micro-organismes naturels transforment l\'ammoniaque en nitrates assimilables par les plantes.'
              },
              {
                step: '3',
                title: 'Radeaux Végétaux',
                icon: <Leaf size={32} color="white" />,
                bg: '#2E7D32',
                desc: 'Les salades et herbes aromatiques absorbent ces nitrates pour croître, purifiant ainsi l\'eau.'
              },
              {
                step: '4',
                title: 'Retour d\'Eau Propre',
                icon: <Droplets size={32} color="white" />,
                bg: '#1B5E20',
                desc: 'L\'eau purifiée est réinjectée par gravité dans le bassin des poissons. Zéro gaspillage.'
              }
            ].map((item, idx) => (
              <div key={idx} className="card" style={{ backgroundColor: 'white', border: 'none', padding: '24px', textAlign: 'center', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
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

        {/* Section 2 : Avantages Écologiques & Chiffres clés */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem' }}>Les atouts écologiques majeurs</h2>
          </div>

          <div className="grid-3" style={{ gap: '30px' }}>
            {[
              {
                title: '-90% d\'eau consommée',
                desc: 'Par rapport à une agriculture traditionnelle au sol, le circuit fermé recycle l\'eau en permanence et évite l\'évaporation massive.',
                icon: <Waves size={24} color="#00838F" />
              },
              {
                title: '100% Organique',
                desc: 'Aucun engrais chimique ni pesticide de synthèse. Les plantes se nourrissent uniquement des engrais naturels distillés par la faune aquatique.',
                icon: <Sparkles size={24} color="#2E7D32" />
              },
              {
                title: 'Zéro pollution des sols',
                desc: 'Notre installation hors-sol contrôlée évite le lessivage des nutriments dans les nappes phréatiques, protégeant ainsi l\'écosystème local.',
                icon: <Heart size={24} color="#E65100" />
              }
            ].map((stat, idx) => (
              <div key={idx} className="card hover-scale" style={{ border: 'none', padding: '32px', backgroundColor: 'white', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#F0F7F7', display: 'flex', alignItems: 'center', justifyStyle: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  {stat.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--text-charcoal)' }}>{stat.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Galerie interactive : uniquement des images de Pisciculture */}
        <div className="card" style={{ border: 'none', backgroundColor: 'white', padding: '48px', marginBottom: '60px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="badge" style={{ backgroundColor: '#2E7D32', color: 'white', marginBottom: '12px' }}>Galerie de photos réelles</span>
            <h2 style={{ color: 'var(--text-charcoal)', margin: 0, fontSize: '2rem' }}>Notre pôle en images</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Visualisez nos installations de pisciculture et d'aquaponie.</p>
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
              <p style={{ color: '#E0F7FA', margin: 0, fontSize: '0.98rem', lineHeight: '1.5', maxWidth: '700px' }}>{photos[activePhotoIdx].desc}</p>
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
                  backgroundColor: idx === activePhotoIdx ? '#00838F' : '#CFD8DC',
                  cursor: 'pointer', transition: 'background 0.3s'
                }}
              />
            ))}
          </div>
        </div>

        {/* CTA : Call to action formations & visites */}
        <div className="card" style={{ 
          border: 'none', 
          background: 'linear-gradient(135deg, #004D40 0%, #00796B 100%)', 
          color: 'white', 
          padding: '50px', 
          borderRadius: '24px', 
          textAlign: 'center',
          boxShadow: '0 15px 35px rgba(0,77,64,0.25)' 
        }}>
          <span className="badge" style={{ backgroundColor: 'var(--accent)', color: 'white', marginBottom: '16px' }}>Partagez notre savoir-faire</span>
          <h2 style={{ color: 'white', fontSize: '2.2rem', marginBottom: '16px' }}>Envie d'apprendre l'Aquaponie ?</h2>
          <p style={{ maxWidth: '650px', margin: '0 auto 32px', color: '#E0F2F1', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Nous organisons régulièrement des ateliers d'initiation et de perfectionnement technique sur notre site de Mboro. Découvrez comment installer un micro-système chez vous ou à l'échelle maraîchère.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/trainings" className="btn btn-accent" style={{ padding: '16px 32px', borderRadius: '999px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <GraduationCap size={20} /> Voir nos formations
            </Link>
            <Link to="/services" className="btn" style={{ padding: '16px 32px', borderRadius: '999px', fontSize: '1rem', border: '1px solid white', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Demander une visite d'étude
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Pisciculture;
