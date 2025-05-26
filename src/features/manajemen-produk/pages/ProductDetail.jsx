import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import EditProductModal from '../components/EditProductModal'; // Make sure this path is correct

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Dummy product data
  const DUMMY_PRODUCT = {
    id,
    productName: 'Semen Portland',
    productPrice: 75000,
    productStock: 150,
    productDescription: 'High-quality cement for construction.',
    productSupplier: 'Local Supplier',
    productUnit: 'pcs'
  };

  useEffect(() => {
    const fetchProductDetail = async () => {
      const token = localStorage.getItem("token") || "";
      
      try {
        let body = JSON.stringify({ "token": token });
        console.log("Body: ", body);

        const authResponse = await fetch("https://slim-blythe-williamalxndr-aab64bd4.koyeb.app/auth/auth-admin/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: body,
        });

        console.log("Auth Response Status:", authResponse.status);

        const authResponseRaw = await authResponse.text();
        console.log("Auth Response Body:", authResponseRaw);

        if (!authResponse.ok) throw new Error("Unauthorized");

        const response = await fetch(`https://slim-blythe-williamalxndr-aab64bd4.koyeb.app/product/detail/${id}/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            navigate("/unauthorized");
            return;
          }
          throw new Error('Failed to load product details');
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(`${err.message} - Showing sample data`);
        setProduct(DUMMY_PRODUCT);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${product.productName}?`)) {
      return;
    }

    setIsDeleting(true);
    const token = localStorage.getItem("token") || "";
    try {
      const response = await fetch(`https://slim-blythe-williamalxndr-aab64bd4.koyeb.app/product/delete/${id}/`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          navigate("/unauthorized");
          return;
        }
        throw new Error('Failed to delete product');
      }

      alert('Product deleted successfully!');
      navigate('/produk');
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleProductUpdated = (updatedProduct) => {
    setProduct(updatedProduct);
    setShowEditModal(false);
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading product details...</p>
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
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            margin: '0 auto'
          }}
        >
          <FaArrowLeft /> Back to Products
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
        marginBottom: '1.5rem',
        backgroundColor: '#0a192f',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{ 
          fontSize: '1.8rem', 
          color: 'white',
          margin: 0,
          fontWeight: '600'
        }}>
          {product.productName}
        </h1>
        <Link 
          to="/produk" 
          style={{
            padding: '0.5rem 1rem',
            background: '#6c757d',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <FaArrowLeft /> Back
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
        backgroundColor: '#0a192f',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        color: 'white'
      }}>
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ 
              fontSize: '1rem',
              color: '#a8b2d1',
              marginBottom: '0.5rem'
            }}>
              PRICE PER UNIT
            </h3>
            <p style={{ 
              fontSize: '1.75rem',
              fontWeight: 'bold',
              color: '#64ffda',
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
              color: '#a8b2d1',
              marginBottom: '0.5rem'
            }}>
              STOCK AVAILABLE
            </h3>
            <p style={{ 
              fontSize: '1.75rem',
              fontWeight: 'bold',
              color: product.productStock > 10 ? '#64ffda' : '#ff6b6b',
              margin: 0
            }}>
              {product.productStock} {product.productUnit || 'pcs'}
            </p>
          </div>

          <div>
            <h3 style={{ 
              fontSize: '1rem',
              color: '#a8b2d1',
              marginBottom: '0.5rem'
            }}>
              LAST UPDATED
            </h3>
            <p style={{ fontSize: '1rem', margin: 0, color: "#ccd6f6" }}>
              {product.lastUpdated || 'Unknown'}
            </p>
          </div>
        </div>

        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ 
              fontSize: '1rem',
              color: '#a8b2d1',
              marginBottom: '0.5rem'
            }}>
              SUPPLIER
            </h3>
            <p style={{ fontSize: '1rem', margin: 0, color: "#ccd6f6" }}>
              {product.productSupplier || 'Local Supplier'}
            </p>
          </div>

          <div>
            <h3 style={{ 
              fontSize: '1rem',
              color: '#a8b2d1',
              marginBottom: '0.5rem'
            }}>
              DESCRIPTION
            </h3>
            <p style={{ fontSize: '1rem', margin: 0, color: "#ccd6f6" }}>
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
        <button
          onClick={() => setShowEditModal(true)}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s ease'
          }}
        >
          <FaEdit size={16} /> Edit
        </button>
        <button
          style={{
            padding: '0.75rem 1.5rem',
            background: isDeleting ? '#dc3545aa' : '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: isDeleting ? 'not-allowed' : 'pointer',
            opacity: isDeleting ? 0.8 : 1,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? (
            'Deleting...'
          ) : (
            <>
              <FaTrash size={16} /> Delete
            </>
          )}
        </button>
      </div>

      {showEditModal && (
        <EditProductModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          productId={id}
          currentProduct={product}
          onSuccess={handleProductUpdated}
        />
      )}
    </div>
  );
}