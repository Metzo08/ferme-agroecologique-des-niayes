import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Trash2, Plus, Minus, CreditCard, ShoppingBag } from 'lucide-react';
import PaymentSimulator from '../components/PaymentSimulator';

const Cart = () => {
  const { cart, removeFromCart, updateCartQty, checkoutCart } = useContext(AppContext);
  const [showPayment, setShowPayment] = useState(false);
  const [customerForm, setCustomerForm] = useState({ name: '', phone: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const handleCheckoutClick = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!customerForm.name || !customerForm.phone) {
      alert("Veuillez remplir vos informations pour la commande.");
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    const orderId = checkoutCart(customerForm, total);
    setShowPayment(false);
    setSuccessMessage(`Merci ${customerForm.name} ! Votre commande #${orderId} a été confirmée et payée avec succès.`);
    setCustomerForm({ name: '', phone: '' });
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 6000);
  };

  if (cart.length === 0 && !successMessage) {
    return (
      <div className="section container text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--bg-sand)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <ShoppingBag size={40} color="var(--text-muted)" />
        </div>
        <h2>Votre panier est vide</h2>
        <p style={{ color: 'var(--text-muted)' }}>Découvrez notre pépinière et notre boutique pour ajouter des articles.</p>
      </div>
    );
  }

  return (
    <div className="section" style={{ backgroundColor: '#F9F9F9', minHeight: '100vh' }}>
      <div className="container">
        
        <h1 style={{ marginBottom: '40px', color: 'var(--text-charcoal)' }}>Votre Panier</h1>

        {successMessage && (
          <div className="animate-slide" style={{ backgroundColor: '#E8F5E9', border: '2px solid var(--primary)', padding: '24px', borderRadius: 'var(--radius-md)', textAlign: 'center', marginBottom: '40px' }}>
            <h3 style={{ color: 'var(--primary)', margin: 0 }}>{successMessage}</h3>
            <p style={{ marginTop: '12px' }}>Un reçu vous a été envoyé par SMS.</p>
          </div>
        )}

        {cart.length > 0 && (
          <div className="grid-2" style={{ gap: '40px', alignItems: 'flex-start' }}>
            
            {/* Liste des articles */}
            <div className="card" style={{ padding: '0' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', padding: '20px', borderBottom: '1px solid var(--border-color)', gap: '20px', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                  <div style={{ flexGrow: 1 }}>
                    <h4 style={{ margin: 0, marginBottom: '8px' }}>{item.name}</h4>
                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{item.price.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: 'var(--radius-full)' }}>
                      <button onClick={() => updateCartQty(item.id, item.qty - 1)} style={{ border: 'none', background: 'none', padding: '8px', cursor: 'pointer' }}><Minus size={16} /></button>
                      <span style={{ fontWeight: 'bold', width: '30px', textAlign: 'center' }}>{item.qty}</span>
                      <button onClick={() => updateCartQty(item.id, item.qty + 1)} style={{ border: 'none', background: 'none', padding: '8px', cursor: 'pointer' }} disabled={item.qty >= item.stock}><Plus size={16} /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{ border: 'none', background: 'none', padding: '8px', cursor: 'pointer', color: '#D32F2F' }}>
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Résumé et Paiement */}
            <div className="card" style={{ borderTop: '4px solid var(--primary)' }}>
              <h3 style={{ marginBottom: '24px' }}>Résumé de la commande</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Sous-total</span>
                <span>{total.toLocaleString('fr-FR')} FCFA</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Livraison (Sénégal)</span>
                <span>À calculer</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                <span>Total</span>
                <span style={{ color: 'var(--primary)' }}>{total.toLocaleString('fr-FR')} FCFA</span>
              </div>

              <form onSubmit={handleCheckoutClick}>
                <div className="form-group">
                  <label className="form-label">Nom complet</label>
                  <input type="text" className="form-control" required value={customerForm.name} onChange={e => setCustomerForm({...customerForm, name: e.target.value})} />
                </div>
                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <label className="form-label">Numéro de téléphone (pour livraison et paiement)</label>
                  <input type="tel" className="form-control" required placeholder="77 123 45 67" value={customerForm.phone} onChange={e => setCustomerForm({...customerForm, phone: e.target.value})} />
                </div>
                
                <button type="submit" className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '8px', padding: '12px' }}>
                  <CreditCard size={20} /> Payer avec Mobile Money
                </button>
              </form>
            </div>

          </div>
        )}

        <PaymentSimulator 
          isOpen={showPayment} 
          amount={total} 
          onClose={() => setShowPayment(false)} 
          onSuccess={handlePaymentSuccess} 
        />

      </div>
    </div>
  );
};

export default Cart;
