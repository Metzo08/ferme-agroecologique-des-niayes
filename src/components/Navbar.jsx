import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, MapPin } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { cart, activeFermeFilter, setActiveFermeFilter } = useContext(AppContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Nos fermes', path: '/farms' },
    { name: 'Pépinière', path: '/nursery' },
    { name: 'Boutique', path: '/shop' },
    { name: 'Camping', path: '/camping' },
    { name: 'Services', path: '/services' },
    { name: 'Formations', path: '/trainings' },
    { name: 'Partenariat', path: '/partenariat' }
  ];

  const handleFilterChange = (e) => {
    setActiveFermeFilter(e.target.value);
  };

  return (
    <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
          
          {/* Logo FAEN */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src="/images/logo_faen.jpeg"
              alt="Logo FAEN"
              style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)', flexShrink: 0 }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'var(--font-headings)', fontWeight: 700, fontSize: '1.1rem', lineHeight: '1.1', color: 'var(--primary)' }}>Fermes des Niayes</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Mboro & Ngaparou</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div style={{ display: 'none', gap: '24px', alignItems: 'center' }} className="desktop-nav">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                style={{ 
                  fontWeight: 600, 
                  fontSize: '0.95rem',
                  color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-charcoal)',
                  borderBottom: location.pathname === link.path ? '2px solid var(--primary)' : '2px solid transparent',
                  paddingBottom: '4px'
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions (Filter, Cart, Admin, Mobile Toggle) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            
            {/* Localisation Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'white', padding: '6px 12px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }} className="desktop-nav">
              <MapPin size={16} color="var(--primary)" />
              <select 
                value={activeFermeFilter} 
                onChange={handleFilterChange}
                style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-headings)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-charcoal)', cursor: 'pointer' }}
              >
                <option value="all">Toutes nos fermes</option>
                <option value="mboro">📍 Mboro (Khondio)</option>
                <option value="ngaparou">📍 Ngaparou (Mbour)</option>
              </select>
            </div>

            {/* Cart Icon */}
            <Link to="/cart" style={{ position: 'relative', cursor: 'pointer', padding: '8px' }}>
              <ShoppingCart size={24} color="var(--text-charcoal)" />
              {cartItemsCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '0px',
                  right: '0px',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%'
                }}>
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <Link to="/admin" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }} className="desktop-nav">Admin</Link>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleMenu} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }} 
              className="mobile-nav-toggle"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{ position: 'absolute', top: '80px', left: 0, width: '100%', backgroundColor: 'var(--bg-sand)', borderBottom: '1px solid var(--border-color)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'white', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', width: '100%' }}>
            <MapPin size={18} color="var(--primary)" />
            <select 
              value={activeFermeFilter} 
              onChange={handleFilterChange}
              style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-headings)', fontWeight: 600, width: '100%', fontSize: '1rem' }}
            >
              <option value="all">Toutes nos fermes</option>
              <option value="mboro">📍 Mboro (Khondio)</option>
              <option value="ngaparou">📍 Ngaparou (Mbour)</option>
            </select>
          </div>

          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ 
                fontWeight: 600, 
                fontSize: '1.1rem',
                color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-charcoal)',
                padding: '8px 0',
                borderBottom: '1px solid var(--border-color)'
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} style={{ fontWeight: 600, fontSize: '1.1rem', padding: '8px 0', color: 'var(--text-muted)' }}>Administration</Link>
        </div>
      )}

      {/* Basic Responsive CSS embedded for brevity in this specific component */}
      <style>{`
        @media (min-width: 992px) {
          .mobile-nav-toggle { display: none !important; }
        }
        @media (max-width: 991px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
