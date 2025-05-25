import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import CreateProductModal from '../components/CreateProductModal.jsx';
import EditProductModal from '../components/EditProductModal.jsx';
import { FaPlus, FaBoxes } from 'react-icons/fa';

const DUMMY_BUILDING_PRODUCTS = [ 
  { id: 1, productName: 'Semen Portland', productPrice: 75000, productStock: 150 },
  { id: 2, productName: 'Bata Merah', productPrice: 800, productStock: 5000 }
];

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState(null);
  const [usingDummyData, setUsingDummyData] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    const initialize = async () => {
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

        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        };

        const response = await fetch('https://slim-blythe-williamalxndr-aab64bd4.koyeb.app/product/', {
          method: 'GET',
          headers,
        });

        const text = await response.text();
        if (!response.ok) throw new Error('Failed to load products');
        const data = JSON.parse(text);
        setProducts(data);
      } catch (err) {
        if (err.message === "Unauthorized" || err.message === "Forbidden") {
          navigate("/unauthorized");
        } else {
          console.error('Error:', err.message);
          setError(`${err.message} - Using dummy data instead`);
          setProducts(DUMMY_BUILDING_PRODUCTS);
          setUsingDummyData(true);
        }
      } finally {
        setLoadingProducts(false);
      }
    };

    initialize();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this building material?')) return;
    setDeletingId(id);
    try {
      const token = localStorage.getItem("token") || "";
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      const response = await fetch(`https://slim-blythe-williamalxndr-aab64bd4.koyeb.app/product/delete/${id}/`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) throw new Error('Failed to delete product');
      setProducts(products.filter(product => product.id !== id));
      if (usingDummyData) setError('Product deleted (dummy data)');
      else setError(null);
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleProductCreated = (newProduct) => {
    setProducts(prev => [...prev, newProduct]);
  };

  const openEditModal = (productId) => {
    setEditProductId(productId);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditProductId(null);
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    closeEditModal();
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
      {usingDummyData && (
        <div style={{ 
          backgroundColor: '#fff3cd', 
          color: '#856404', 
          padding: '0.75rem', 
          marginBottom: '1rem', 
          border: '1px solid #ffeeba', 
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <FaBoxes />
          <span>Warning: Using sample building materials data because server couldn't be reached</span>
        </div>
      )}

      {error && !usingDummyData && (
        <div style={{ color: 'red', padding: '1rem' }}>{error}</div>
      )}

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h1 className="display-4 fw-bold text-light">Building Materials Inventory</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: 'linear-gradient(135deg, #4e73df, #224abe)',
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1rem',
            fontWeight: '500',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            marginTop: '0.5rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
        >
          <FaPlus />
          <span>Add New Product</span>
        </button>
      </div>

      {loadingProducts ? (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div>Loading building materials...</div>
        </div>
      ) : products.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          margin: '2rem',
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px dashed #dee2e6'
        }}>
          <FaBoxes size={48} style={{ marginBottom: '1rem', color: '#6c757d' }} />
          <h3 style={{ color: '#495057' }}>No building materials found</h3>
          <p style={{ color: '#6c757d' }}>Add your first material to get started</p>
          <button
            onClick={() => setShowCreateModal(true)}
            style={{ 
              marginTop: '1rem',
              padding: '0.5rem 1rem', 
              background: '#4e73df',
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FaPlus />
            <span>Add Product</span>
          </button>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '1.5rem',
          padding: '0.5rem'
        }}>
          {products.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                stock={product.stock}
                unit="pcs"
                onDelete={handleDelete}
                isDeleting={deletingId === product.id}
                onEdit={() => openEditModal(product.id)}
              />
          ))}
        </div>
      )}

      {showCreateModal && (
        <CreateProductModal
          onClose={() => setShowCreateModal(false)}
          onProductCreated={handleProductCreated}
        />
      )}

      {showEditModal && (
        <EditProductModal
          isOpen={showEditModal}
          onClose={closeEditModal}
          productId={editProductId}
          onSuccess={handleProductUpdated}
        />
      )}
    </div>
  );
}