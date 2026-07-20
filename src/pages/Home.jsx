import React, { useContext } from 'react';
import SEO from '../components/SEO';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { MapPin, Sprout, Tent, Wrench, GraduationCap, ArrowRight, Star, Fish, Hexagon, Droplets } from 'lucide-react';
import MapLocation from '../components/MapLocation';

const Home = () => {
  const { setActiveFermeFilter } = useContext(AppContext);
  const navigate = useNavigate();

  const handleNavigate = (path, location = 'all') => {
    setActiveFermeFilter(location);
    navigate(path);
  };

  return (
    <div>
      <SEO title="Accueil" description="Découvrez la Ferme Agroécologique des Niayes : pépinière bio, vente de plantes, matériel agricole, formations pratiques et éco-camping au Sénégal." keywords="ferme agroécologique, Niayes, Sénégal, Mboro, Ngaparou, pépinière, éco-camping" />
      {/* Bannière Héroïque */}
      <section style={{ 
        position: 'relative', 
        minHeight: '90vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '80px 16px 40px'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/images/whatsapp_image_2026_05_27_at_19.12.49.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -2
        }}></div>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(33, 33, 33, 0.7), rgba(46, 125, 50, 0.6))',
          zIndex: -1
        }}></div>

        <div className="container animate-slide" style={{ maxWidth: '900px' }}>
          <span className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', marginBottom: '24px', fontSize: '0.95', padding: '8px 20px', letterSpacing: '1px' }}>
            Agroécologie & écotourisme au Sénégal
          </span>
          <h1 style={{ color: 'white', marginBottom: '20px', fontSize: 'clamp(2rem, 7vw, 5.5rem)', textShadow: '0 4px 12px rgba(0,0,0,0.3)', lineHeight: '1.1' }}>
            Cultivons l'avenir,<br/> préservons la nature.
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', marginBottom: '32px', color: '#F5F5F5', lineHeight: 1.6, textShadow: '0 2px 4px rgba(0,0,0,0.2)', maxWidth: '700px', margin: '0 auto 32px' }}>
            Découvrez nos fermes agroécologiques d'excellence à Mboro et Ngaparou.
            Pépinière, formations pratiques et campings écoresponsables.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', width: '100%' }}>
            <button onClick={() => handleNavigate('/nursery')} className="btn btn-primary" style={{ padding: '14px 24px', fontSize: 'clamp(0.9rem, 2.5vw, 1.15rem)', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '8px', flex: '1 1 auto', maxWidth: '280px', justifyContent: 'center' }}>
              <Sprout size={20} /> Visiter la pépinière
            </button>
            <button onClick={() => handleNavigate('/camping')} className="btn btn-accent" style={{ padding: '14px 24px', fontSize: 'clamp(0.9rem, 2.5vw, 1.15rem)', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '8px', flex: '1 1 auto', maxWidth: '280px', justifyContent: 'center' }}>
              <Tent size={20} /> Réserver un camping
            </button>
          </div>
        </div>
      </section>

      {/* Sélecteur Double Ferme */}
      <section className="section" style={{ backgroundColor: 'var(--bg-sand)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <h2 style={{ color: 'var(--primary)', fontSize: '2.5rem' }}>Deux terroirs, une vision</h2>
            <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--text-muted)' }}>Choisissez la ferme la plus proche de chez vous ou explorez leurs spécialités uniques.</p>
          </div>

          <div className="grid-2">
            {/* Carte Mboro */}
            <div className="card" style={{ borderTop: '4px solid var(--primary)', display: 'flex', flexDirection: 'column' }}>
              <div className="card-img-wrapper" style={{ height: '220px' }}>
                <img src="/images/whatsapp_image_2026_05_27_at_19.12.51.webp" alt="Ferme de Mboro" className="card-img" />
              </div>
              <div className="card-body" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, color: 'var(--primary)', fontSize: '1.8rem' }}>Mboro (Khondio)</h3>
                  <MapPin size={28} color="var(--primary)" />
                </div>
                <p style={{ marginBottom: '24px', flexGrow: 1, color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Située dans les Niayes, cette ferme est le cœur de notre production agricole. 
                  Découvrez notre pépinière géante, nos zones de maraîchage bio et nos formations en permaculture sahélienne.
                </p>
                
                {/* Boutons d'action rapides cliquables */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
                  <button onClick={() => handleNavigate('/nursery', 'mboro')} className="badge badge-mboro" style={{ border: 'none', cursor: 'pointer', fontSize: '0.9rem', padding: '6px 14px' }}>Pépinière</button>
                  <button onClick={() => handleNavigate('/nursery', 'mboro')} className="badge badge-mboro" style={{ border: 'none', cursor: 'pointer', fontSize: '0.9rem', padding: '6px 14px' }}>Maraîchage</button>
                  <button onClick={() => handleNavigate('/trainings', 'mboro')} className="badge badge-mboro" style={{ border: 'none', cursor: 'pointer', fontSize: '0.9rem', padding: '6px 14px' }}>Formations</button>
                </div>
                
                <button 
                  onClick={() => handleNavigate('/farms', 'mboro')}
                  className="btn-link" 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', fontWeight: 'bold', border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                >
                  Découvrir Mboro <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* Carte Ngaparou */}
            <div className="card" style={{ borderTop: '4px solid var(--accent)', display: 'flex', flexDirection: 'column' }}>
              <div className="card-img-wrapper" style={{ height: '220px' }}>
                <img src="/images/whatsapp_image_2026_05_27_at_19.12.54.webp" alt="Ferme de Ngaparou" className="card-img" />
              </div>
              <div className="card-body" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, color: 'var(--accent)', fontSize: '1.8rem' }}>Ngaparou (Mbour)</h3>
                  <MapPin size={28} color="var(--accent)" />
                </div>
                <p style={{ marginBottom: '24px', flexGrow: 1, color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Un havre de paix sur la Petite-Côte. Idéal pour l'écotourisme avec nos emplacements de camping aménagés, nos tentes sahariennes et notre expertise en aménagement d'espaces verts.
                </p>

                {/* Boutons d'action rapides cliquables */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
                  <button onClick={() => handleNavigate('/camping', 'ngaparou')} className="badge badge-ngaparou" style={{ border: 'none', cursor: 'pointer', fontSize: '0.9rem', padding: '6px 14px' }}>Eco-camping</button>
                  <button onClick={() => handleNavigate('/services', 'ngaparou')} className="badge badge-ngaparou" style={{ border: 'none', cursor: 'pointer', fontSize: '0.9rem', padding: '6px 14px' }}>Espaces verts</button>
                  <button onClick={() => handleNavigate('/camping', 'ngaparou')} className="badge badge-ngaparou" style={{ border: 'none', cursor: 'pointer', fontSize: '0.9rem', padding: '6px 14px' }}>Détente</button>
                </div>

                <button 
                  onClick={() => handleNavigate('/farms', 'ngaparou')}
                  className="btn-link" 
                  style={{ color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', fontWeight: 'bold', border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                >
                  Découvrir Ngaparou <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Services Express */}
      <section className="section" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <h2>Nos domaines d'expertise</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>Une approche complète pour verdir le Sénégal et transmettre les savoirs.</p>
          </div>

          <div className="grid-3" style={{ gap: '20px' }}>
            {[
              { icon: <Sprout size={36} color="var(--primary)" />, bg: 'var(--primary-light)', title: 'Pépinière & boutique', desc: 'Plantes aromatiques, arbres fruitiers, compost bio et matériel agricole.', to: '/nursery', linkColor: 'var(--primary)', label: 'Acheter' },
              { icon: <Tent size={36} color="var(--accent)" />, bg: 'var(--accent-light)', title: 'Eco-camping', desc: 'Tentes sahariennes et emplacements nus sécurisés en pleine nature à Ngaparou.', to: '/camping', linkColor: 'var(--accent)', label: 'Réserver' },
              { icon: <Wrench size={36} color="#1565C0" />, bg: '#E3F2FD', title: 'Aménagements', desc: "Création d'espaces verts, suivi agronomique et constructions rurales écologiques.", to: '/services', linkColor: '#1565C0', label: 'Devis' },
              { icon: <GraduationCap size={36} color="#E65100" />, bg: '#FFF3E0', title: 'Formations', desc: "Ateliers pratiques en agroécologie, greffage, et irrigation solaire pour tous.", to: '/trainings', linkColor: '#E65100', label: "S'inscrire" },
              { icon: <Hexagon size={36} color="#8E24AA" />, bg: '#F3E5F5', title: 'Apiculture', desc: 'Production de miel pur, pollinisation naturelle et protection des abeilles locales.', to: '/apiculture', linkColor: '#8E24AA', label: 'Découvrir' },
              { icon: <Fish size={36} color="#00838F" />, bg: '#E0F7FA', title: 'Pisciculture', desc: "Élevage de poissons respectueux de l'environnement et systèmes d'aquaponie.", to: '/pisciculture', linkColor: '#00838F', label: 'Découvrir' },
              { icon: <Droplets size={36} color="#2E7D32" />, bg: '#E8F5E9', title: 'Transformation', desc: 'Produits naturels locaux : savons organiques, huiles végétales et compostage bio.', to: '/transformation', linkColor: '#2E7D32', label: 'Découvrir' },
            ].map((item, i) => (
              <div key={i} className="card text-center hover-scale" style={{ padding: '28px 20px', alignItems: 'center', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
                <div style={{ width: '72px', height: '72px', backgroundColor: item.bg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  {item.icon}
                </div>
                <h4 style={{ marginBottom: '12px', fontSize: '1.15rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.92rem', marginBottom: '20px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
                <Link to={item.to} className="btn-link" style={{ color: item.linkColor, fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  {item.label} <ArrowRight size={15}/>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Section Fondateur */}
      <section className="section" style={{ backgroundColor: 'var(--white)', borderTop: '1px solid #EAEAEA' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}>
            {/* Photo du fondateur */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', top: '-16px', left: '-16px',
                width: '100%', height: '100%',
                border: '3px solid var(--primary)',
                borderRadius: '20px',
                zIndex: 0
              }} />
              <img
                src="/images/abdou_karim_mbengue.jpeg"
                alt="Abdou Karim Mbengue, fondateur des Fermes des Niayes"
                style={{
                  width: '100%',
                  maxHeight: '480px',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  borderRadius: '16px',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
                }}
              />
              {/* Badge fondateur */}
              <div style={{
                position: 'absolute', bottom: '20px', left: '20px', zIndex: 2,
                backgroundColor: 'var(--primary)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '0.9rem',
                boxShadow: '0 4px 16px rgba(46,125,50,0.4)'
              }}>
                🌱 Fondateur & Directeur
              </div>
            </div>

            {/* Texte */}
            <div>
              <span style={{
                display: 'inline-block',
                backgroundColor: 'var(--primary-light)', color: 'var(--primary)',
                padding: '5px 14px', borderRadius: '50px',
                fontWeight: 700, fontSize: '0.85rem', marginBottom: '16px'
              }}>
                Notre vision
              </span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: 'var(--text-charcoal)', marginBottom: '8px' }}>
                Abdou Karim Mbengue
              </h2>
              <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1rem', marginBottom: '20px' }}>
                Fondateur & Directeur de la Ferme Agro Ecologie des Niayes (FAEN)
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '16px' }}>
                Passionné par l'agroécologie et le développement durable, Abdou Karim Mbengue a fondé les Fermes des Niayes avec une mission claire : <strong style={{ color: 'var(--text-charcoal)' }}>reverdir le Sénégal et transmettre les savoirs agricoles aux générations futures.</strong>
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '32px' }}>
                Depuis ses fermes de Mboro et Ngaparou, il développe des solutions agricoles durables adaptées aux sols sableux des Niayes, formant des centaines d'agriculteurs et d'entrepreneurs verts chaque année.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/farms" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Nos fermes <ArrowRight size={18} />
                </Link>
                <Link to="/partenariat" className="btn" style={{ backgroundColor: 'var(--white)', border: '2px solid var(--primary)', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Devenir partenaire
                </Link>
              </div>
            </div>
          </div>

          {/* Galerie de photos de la ferme */}
          <div style={{ marginTop: '60px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '28px', color: 'var(--text-charcoal)' }}>La ferme en images</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {[
                { src: '/images/ferme_1.jpeg', alt: 'Vue de la ferme des Niayes' },
                { src: '/images/ferme_2.jpeg', alt: 'Cultures agroécologiques' },
                { src: '/images/ferme_3.jpeg', alt: 'Espaces verts des Niayes' },
                { src: '/images/ferme_4.jpeg', alt: 'Activités de la ferme' },
              ].map((photo, i) => (
                <div key={i} className="hover-scale" style={{ borderRadius: '14px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Géolocalisation */}
      <section className="section" style={{ backgroundColor: '#F9FBF9', borderTop: '1px solid #EAEAEA' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', marginBottom: '16px' }}>Carte interactive</span>
            <h2 style={{ color: 'var(--text-charcoal)', marginBottom: '16px' }}>Nos sites d'intervention</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
              Explorez la géolocalisation de nos deux pôles au Sénégal : Khondio (Mboro) et Ngaparou.
            </p>
          </div>
          <MapLocation activeFermeFilter="all" />
        </div>
      </section>

    </div>
  );
};

export default Home;
