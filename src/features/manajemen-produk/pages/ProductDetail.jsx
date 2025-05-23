// src/components/ProductDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${product.productName}?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`http://127.0.0.1:8080/product/delete/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      const result = await response.json();
      if (result.ok) {
        alert('Product deleted successfully!');
        navigate('/produk');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

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
          backgroundColor: error.includes('Showing sample data') ? '#fff3cd' : '#f8d7da', 
          color: error.includes('Showing sample data') ? '#856404' : '#721c24',
          padding: '0.75rem',
          marginBottom: '1.5rem',
          border: error.includes('Showing sample data') ? '1px solid #ffeeba' : '1px solid #f5c6cb',
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
            background: isDeleting ? '#dc3545aa' : '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: isDeleting ? 'not-allowed' : 'pointer',
            opacity: isDeleting ? 0.8 : 1
          }}
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete Material'}
        </button>
      </div>
    </div>
  );
}