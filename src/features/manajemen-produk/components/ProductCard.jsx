// src/components/ProductCard.jsx
import { Link } from 'react-router-dom';

export default function ProductCard({ id, name, price, stock }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      <h3 style={{ margin: '0 0 0.5rem 0' }}>{name}</h3>
      
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Price:</span>
        <span style={{ fontWeight: 'bold' }}>
          {new Intl.NumberFormat('id-ID', { 
            style: 'currency', 
            currency: 'IDR',
            minimumFractionDigits: 0
          }).format(price)}
        </span>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Stock:</span>
        <span style={{ fontWeight: 'bold' }}>{stock}</span>
      </div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        marginTop: '1rem',
        gap: '0.5rem'
      }}>
        <Link
          to={`/produk/edit/${id}`}
          style={{
            flex: 1,
            padding: '0.5rem',
            background: '#28a745',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            textAlign: 'center'
          }}
        >
          Edit
        </Link>
        <button
          style={{
            flex: 1,
            padding: '0.5rem',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this product?')) {
              // Implement delete functionality here
              console.log('Delete product', id);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}