import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Lightbox = ({ src, onClose }) => {
  // Fermer avec la touche Echap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    // Empêcher le défilement de l'arrière-plan quand la lightbox est ouverte
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!src) return null;

  return (
    <div 
      className="lightbox-overlay" 
      onClick={onClose}
    >
      <button 
        className="lightbox-close"
        onClick={onClose}
        aria-label="Fermer l'image"
      >
        <X size={32} />
      </button>
      <div 
        className="lightbox-content"
        onClick={(e) => e.stopPropagation()} // Évite de fermer en cliquant sur l'image elle-même
      >
        <img 
          src={src} 
          alt="Vue agrandie" 
          className="lightbox-image"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Lightbox;
