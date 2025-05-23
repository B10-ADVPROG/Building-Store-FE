// src/components/ProductDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dummy building material data
  const DUMMY_BUILDING_PRODUCT = {
    id: id,
    productName: 'Semen Portland',
    productPrice: 75000,
    productStock: 150,
    productDescription: 'High-quality cement for construction.',
  };

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/product/detail/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to load product details');
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(`${err.message} - Showing sample data`);
        setProduct(DUMMY_BUILDING_PRODUCT);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading building material details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'red' }}>{error || 'Product not found'}</p>
        <button 
          onClick={() => navigate(-1)}
          style={{
            padding: '0.5rem 1rem',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            marginTop: '1rem',
            cursor: 'pointer'
          }}
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '1.5rem' 
      }}>
        <h1 style={{ fontSize: '1.8rem', color: '#2c3e50' }}>{product.productName}</h1>
        <Link 
          to="/produk" 
          style={{
            padding: '0.5rem 1rem',
            background: '#6c757d',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Back to List
        </Link>
      </div>

      {error && (
        <div style={{ 
          backgroundColor: '#fff3cd', 
          color: '#856404',
          padding: '0.75rem',
          marginBottom: '1.5rem',
          border: '1px solid #ffeeba',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ 
              fontSize: '1rem',
              color: '#7f8c8d',
              marginBottom: '0.5rem'
            }}>
              PRICE PER UNIT
            </h3>
            <p style={{ 
              fontSize: '1.75rem',
              fontWeight: 'bold',
              color: '#2c3e50',
              margin: 0
            }}>
              {new Intl.NumberFormat('id-ID', { 
                style: 'currency', 
                currency: 'IDR',
                minimumFractionDigits: 0
              }).format(product.productPrice)}
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ 
              fontSize: '1rem',
              color: '#7f8c8d',
              marginBottom: '0.5rem'
            }}>
              STOCK AVAILABLE
            </h3>
            <p style={{ 
              fontSize: '1.75rem',
              fontWeight: 'bold',
              color: product.productStock > 10 ? '#27ae60' : '#e74c3c',
              margin: 0
            }}>
              {product.productStock} {product.productUnit || 'pcs'}
            </p>
          </div>

          <div>
            <h3 style={{ 
              fontSize: '1rem',
              color: '#7f8c8d',
              marginBottom: '0.5rem'
            }}>
              LAST UPDATED
            </h3>
            <p style={{ fontSize: '1rem', margin: 0 }}>
              {product.lastUpdated || 'Unknown'}
            </p>
          </div>
        </div>

        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ 
              fontSize: '1rem',
              color: '#7f8c8d',
              marginBottom: '0.5rem'
            }}>
              CATEGORY
            </h3>
            <p style={{ fontSize: '1rem', margin: 0 }}>
              {product.productCategory || 'Building Material'}
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ 
              fontSize: '1rem',
              color: '#7f8c8d',
              marginBottom: '0.5rem'
            }}>
              SUPPLIER
            </h3>
            <p style={{ fontSize: '1rem', margin: 0 }}>
              {product.productSupplier || 'Local Supplier'}
            </p>
          </div>

          <div>
            <h3 style={{ 
              fontSize: '1rem',
              color: '#7f8c8d',
              marginBottom: '0.5rem'
            }}>
              DESCRIPTION
            </h3>
            <p style={{ fontSize: '1rem', margin: 0 }}>
              {product.productDescription || 'No description available'}
            </p>
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        marginTop: '1.5rem'
      }}>
        <Link
          to={`/produk/edit/${id}`}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#3498db',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          Edit Material
        </Link>
        <button
          style={{
            padding: '0.75rem 1.5rem',
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onClick={() => {
            if (window.confirm(`Delete ${product.productName}?`)) {
              // Implement delete functionality
              console.log('Delete product', id);
            }
          }}
        >
          Delete Material
        </button>
      </div>
    </div>
  );
}