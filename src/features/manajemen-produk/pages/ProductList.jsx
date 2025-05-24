import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import CreateProductModal from '../components/CreateProductModal.jsx';
import EditProductModal from '../components/EditProductModal.jsx';

const DUMMY_BUILDING_PRODUCTS = [
  { id: 1, name: 'Semen Portland', price: 75000, stock: 150 },
  { id: 2, name: 'Bata Merah', price: 800, stock: 5000 },
  { id: 3, name: 'Pasir Halus', price: 250000, stock: 30 },
  { id: 4, name: 'Besi Beton 8mm', price: 85000, stock: 80 },
  { id: 5, name: 'Paku Baja', price: 15000, stock: 200 },
  { id: 6, name: 'Cat Tembok Dulux', price: 120000, stock: 45 },
  { id: 7, name: 'Keramik 40x40', price: 85000, stock: 120 },
  { id: 8, name: 'Pipa PVC 3"', price: 95000, stock: 60 }
];

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingDummyData, setUsingDummyData] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/product/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer Token',
          },
        });

        console.log('Response status:', response.status);
        const text = await response.text(); 
        console.log("Raw response body:", text);

        if (!response.ok) {
          throw new Error('Failed to load products');
        }

        const data = JSON.parse(text);
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(`${err.message} - Using dummy data instead`);
        setProducts(DUMMY_BUILDING_PRODUCTS);
        setUsingDummyData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this building material?')) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`http://127.0.0.1:8080/product/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer Token',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts(products.filter(product => product.id !== id));

      if (usingDummyData) {
        setError('Product deleted (dummy data)');
      } else {
        setError(null);
      }
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

  if (loading) {
    return <div style={{ padding: '1rem' }}>Loading building materials...</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      {usingDummyData && (
        <div style={{
          backgroundColor: '#fff3cd',
          color: '#856404',
          padding: '0.75rem',
          marginBottom: '1rem',
          border: '1px solid #ffeeba',
          borderRadius: '4px'
        }}>
          Warning: Using sample building materials data because server couldn't be reached
        </div>
      )}

      {error && !usingDummyData && (
        <div style={{ color: 'red', padding: '1rem' }}>{error}</div>
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <h1>Building Materials Inventory</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          style={{
            padding: '0.5rem 1rem',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add New Product
        </button>
      </div>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', margin: '2rem' }}>
          No building materials found. Add your first material!
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem'
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
