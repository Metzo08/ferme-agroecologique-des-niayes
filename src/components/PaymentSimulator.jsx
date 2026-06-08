import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle, Smartphone, AlertCircle } from 'lucide-react';

const PaymentSimulator = ({ amount, isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(1); // 1: Choisir opérateur, 2: Entrer tel, 3: Entrer PIN, 4: Succès
  const [provider, setProvider] = useState(null);
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleProviderSelect = (selected) => {
    setProvider(selected);
    setStep(2);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.length < 9) {
      setError('Veuillez entrer un numéro valide (ex: 771234567)');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 1500); // Simulate API call to push USSD
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin.length < 4) {
      setError('Code PIN invalide');
      return;
    }
    setError('');
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      // Simulate success 90% of the time, failure 10%
      if (Math.random() > 0.1 || pin === '0000') {
        setStep(4);
        triggerConfetti();
        setTimeout(() => {
          onSuccess();
        }, 3000);
      } else {
        setError('Paiement refusé ou solde insuffisant. Veuillez réessayer.');
        setPin('');
      }
    }, 2000);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2E7D32', '#C97A53', '#FDF5F1']
    });
  };

  const resetAndClose = () => {
    setStep(1);
    setProvider(null);
    setPhone('');
    setPin('');
    setError('');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)'
    }}>
      <div className="card animate-slide" style={{ width: '100%', maxWidth: '400px', position: 'relative', margin: '20px' }}>
        
        {step !== 4 && (
          <button 
            onClick={resetAndClose}
            style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            <X size={24} />
          </button>
        )}

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h3 style={{ margin: 0 }}>Paiement Sécurisé</h3>
          <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--text-charcoal)', marginTop: '8px' }}>
            {amount.toLocaleString('fr-FR')} FCFA
          </p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#FDECEA', color: '#D32F2F', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* Step 1: Select Provider */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '8px' }}>Choisissez votre opérateur de paiement mobile :</p>
            
            <button onClick={() => handleProviderSelect('Wave')} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: 'var(--radius-md)', border: '2px solid var(--border-color)', backgroundColor: 'white', cursor: 'pointer', transition: '0.2s' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#14C8F4', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>W</div>
              <span style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-charcoal)' }}>Wave Mobile Money</span>
            </button>
            
            <button onClick={() => handleProviderSelect('Orange')} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: 'var(--radius-md)', border: '2px solid var(--border-color)', backgroundColor: 'white', cursor: 'pointer', transition: '0.2s' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#FF6600', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>O</div>
              <span style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-charcoal)' }}>Orange Money</span>
            </button>

            <button onClick={() => handleProviderSelect('Free')} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: 'var(--radius-md)', border: '2px solid var(--border-color)', backgroundColor: 'white', cursor: 'pointer', transition: '0.2s' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#E3000F', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>F</div>
              <span style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-charcoal)' }}>Free Money</span>
            </button>
          </div>
        )}

        {/* Step 2: Enter Phone Number */}
        {step === 2 && (
          <form onSubmit={handlePhoneSubmit}>
            <div className="form-group">
              <label className="form-label">Numéro de téléphone {provider}</label>
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <span style={{ position: 'absolute', left: '16px', color: 'var(--text-muted)', fontWeight: 'bold' }}>+221</span>
                <input 
                  type="tel" 
                  className="form-control" 
                  style={{ paddingLeft: '64px' }}
                  placeholder="77 123 45 67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  maxLength={9}
                  autoFocus
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} disabled={isLoading}>
              {isLoading ? 'Envoi de la notification...' : 'Payer'}
            </button>
            <button type="button" className="btn btn-link" style={{ width: '100%', marginTop: '12px', fontSize: '0.9rem' }} onClick={() => setStep(1)} disabled={isLoading}>
              Changer d'opérateur
            </button>
          </form>
        )}

        {/* Step 3: Enter PIN */}
        {step === 3 && (
          <form onSubmit={handlePinSubmit} style={{ textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Smartphone size={32} color="var(--primary)" />
            </div>
            <h4 style={{ marginBottom: '8px' }}>Validation Requise</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '24px' }}>
              Veuillez saisir votre code PIN secret {provider} pour confirmer le prélèvement de <strong>{amount.toLocaleString('fr-FR')} FCFA</strong>.
            </p>
            
            <div className="form-group">
              <input 
                type="password" 
                className="form-control" 
                style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '1.5rem' }}
                placeholder="****"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                maxLength={4}
                autoFocus
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} disabled={isLoading || pin.length < 4}>
              {isLoading ? 'Traitement en cours...' : 'Confirmer le paiement'}
            </button>
          </form>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '20px 0' }} className="animate-fade">
            <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <CheckCircle size={48} color="var(--primary)" />
            </div>
            <h3 style={{ color: 'var(--primary)', marginBottom: '12px' }}>Paiement Réussi !</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Votre transaction a été traitée avec succès par {provider}. Un reçu vous a été envoyé.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default PaymentSimulator;
