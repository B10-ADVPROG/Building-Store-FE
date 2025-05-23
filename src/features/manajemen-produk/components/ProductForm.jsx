// src/components/ProductForm.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormInput from './FormInput';
import FormTextArea from './FormTextArea';
import FormSubmitButton from './FormSubmitButton';
import ConfirmationModal from './ConfirmationModal';

export default function ProductForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [error, setError] = useState(null);

  // Fetch product data when in edit mode
  useEffect(() => {
    const fetchProduct = async () => {
      if (mode === 'edit' && id) {
        setLoadingInitial(true);
        setError(null);
        
        try {
          const response = await fetch(`http://127.0.0.1:8080/product/detail/${id}`);
          
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to load product');
          }

          const productData = await response.json();
          
          setFormData({
            name: productData.name || '',
            price: productData.price || '',
            stock: productData.stock || '',
            description: productData.description || '',
          });
          
        } catch (err) {
          console.error('Error fetching product:', err);
          setError(err.message);
        } finally {
          setLoadingInitial(false);
        }
      }
    };

    fetchProduct();
  }, [mode, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setShowModal(false);
    setLoading(true);
    setError(null);

    try {
      const url = mode === 'create'
        ? 'http://127.0.0.1:8080/product/create/'
        : `http://127.0.0.1:8080/product/edit/${id}`;

      const method = mode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to save product');
      }

      const result = await response.json();
      if (result.ok) {
        alert(mode === 'create' ? 'Product created successfully!' : 'Product updated successfully!');
        navigate('/produk');
      }
    } catch (err) {
      console.error('Save failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loadingInitial) {
    return <div>Loading product data...</div>;
  }

  if (mode === 'edit' && !id) {
    return <div style={{ color: 'red', marginTop: '1rem' }}>Error: Product ID not found in URL</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{ flexGrow: 1 }}>
        <FormInput 
          label="Product Name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        <FormInput 
          label="Price" 
          name="price" 
          type="number" 
          value={formData.price} 
          onChange={handleChange} 
          required 
        />
        <FormInput 
          label="Stock" 
          name="stock" 
          type="number" 
          value={formData.stock} 
          onChange={handleChange} 
        />
        <FormTextArea 
          label="Description" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
        />
        <FormSubmitButton 
          label={mode === 'create' ? 'Save Product' : 'Update Product'} 
          disabled={loading} 
        />
      </form>

      {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}

      <ConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        message={mode === 'create' ? 'Are you sure you want to create this product?' : 'Confirm product update?'}
      />
    </>
  );
}