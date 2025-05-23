import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';

// Building materials dummy data
const DUMMY_BUILDING_PRODUCTS = [
  { id: 1, productName: 'Semen Portland', productPrice: 75000, productStock: 150 },
  { id: 2, productName: 'Bata Merah', productPrice: 800, productStock: 5000 },
  { id: 3, productName: 'Pasir Halus', productPrice: 250000, productStock: 30 },
  { id: 4, productName: 'Besi Beton 8mm', productPrice: 85000, productStock: 80 },
  { id: 5, productName: 'Paku Baja', productPrice: 15000, productStock: 200 },
  { id: 6, productName: 'Cat Tembok Dulux', productPrice: 120000, productStock: 45 },
  { id: 7, productName: 'Keramik 40x40', productPrice: 85000, productStock: 120 },
  { id: 8, productName: 'Pipa PVC 3"', productPrice: 95000, productStock: 60 }
];

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingDummyData, setUsingDummyData] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/product/');
        
        if (!response.ok) {
          throw new Error('Failed to load products');
        }

        const data = await response.json();
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
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Remove the deleted product from state
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
        <Link 
          to="/produk/create" 
          style={{
            padding: '0.5rem 1rem',
            background: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Add New Material
        </Link>
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
              name={product.productName} 
              price={product.productPrice} 
              stock={product.productStock}
              unit={product.unit || 'pcs'}
              onDelete={handleDelete}
              isDeleting={deletingId === product.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}