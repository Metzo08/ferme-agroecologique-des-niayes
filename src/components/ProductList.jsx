import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Trash2, Edit, X, Check } from 'lucide-react';

const ProductList = () => {
  const { plants, equipment, adminDeletePlant, adminUpdatePlant, adminDeleteEquipment, adminUpdateEquipment } = useContext(AppContext);

  const [editingProduct, setEditingProduct] = useState(null);
  const [productType, setProductType] = useState('plant'); // 'plant' or 'equipment'

  const handleEdit = (product) => {
    setEditingProduct({ ...product });
  };

  const handleDelete = (id, type) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      if (type === 'plant') {
        adminDeletePlant(id);
      } else {
        adminDeleteEquipment(id);
      }
    }
  };

  const handleSave = () => {
    if (editingProduct) {
      if (productType === 'plant') {
        adminUpdatePlant(editingProduct.id, editingProduct);
      } else {
        adminUpdateEquipment(editingProduct.id, editingProduct);
      }
      setEditingProduct(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const renderProductRow = (product) => (
    <tr key={product.id}>
      <td style={{ padding: '8px', border: '1px solid #ddd' }}>{product.name}</td>
      <td style={{ padding: '8px', border: '1px solid #ddd' }}>{product.price}</td>
      <td style={{ padding: '8px', border: '1px solid #ddd' }}>{product.stock}</td>
      <td style={{ padding: '8px', border: '1px solid #ddd' }}>
        <button onClick={() => handleEdit(product)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px' }}>
          <Edit size={20} color="orange" />
        </button>
        <button onClick={() => handleDelete(product.id, productType)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Trash2 size={20} color="red" />
        </button>
      </td>
    </tr>
  );

  const products = productType === 'plant' ? plants : equipment;

  return (
    <div className="card" style={{ marginTop: '20px', padding: '20px' }}>
      <h2>Gérer les produits</h2>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setProductType('plant')} className={productType === 'plant' ? 'btn btn-primary' : 'btn'}>Plantes</button>
        <button onClick={() => setProductType('equipment')} className={productType === 'equipment' ? 'btn btn-primary' : 'btn'} style={{ marginLeft: '10px' }}>Équipement</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Nom</th>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Prix</th>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Stock</th>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(renderProductRow)}
        </tbody>
      </table>

      {editingProduct && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 0 20px rgba(0,0,0,0.2)', zIndex: 1000 }}>
          <h3>Modifier le produit</h3>
          <div className="form-group">
            <label>Nom</label>
            <input type="text" name="name" value={editingProduct.name} onChange={handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>Prix</label>
            <input type="number" name="price" value={editingProduct.price} onChange={handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input type="number" name="stock" value={editingProduct.stock} onChange={handleChange} className="form-control" />
          </div>
          <div style={{ marginTop: '20px' }}>
            <button onClick={handleSave} className="btn btn-primary">
              <Check size={20} /> Sauvegarder
            </button>
            <button onClick={() => setEditingProduct(null)} className="btn" style={{ marginLeft: '10px' }}>
              <X size={20} /> Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
