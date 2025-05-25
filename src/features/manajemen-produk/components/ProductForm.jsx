import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormInput from './FormInput';
import FormTextArea from './FormTextArea';
import FormSubmitButton from './FormSubmitButton';
import ConfirmationModal from './ConfirmationModal';

const DUMMY_PRODUCT = {
  name: 'Produk Dummy',
  price: 100000,
  stock: 10,
  description: 'Ini adalah deskripsi produk dummy karena gagal memuat data asli.',
};

export default function ProductForm({ mode, onSuccess, onCancel, productId }) {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  
  const id = productId || paramId;
  
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

  useEffect(() => {
    const fetchProduct = async () => {
      if (mode === 'edit' && id) {
        setLoadingInitial(true);
        setError(null);
        
        try {
          const token = localStorage.getItem("token") || "";

          const headers = { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ${token}',
          };
          
          const response = await fetch(`https://slim-blythe-williamalxndr-aab64bd4.koyeb.app/product/detail/${id}/`, {
            method: 'GET',
            headers,
          });

          const text = await response.text();
          console.log("Raw response body (Product Edit):", text);

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to load product');
          }

          const productData = JSON.parse(text);

          setFormData({
            name: productData.productName || '',
            price: productData.productPrice || '',
            stock: productData.productStock || '',
            description: productData.productDescription || '',
          });
          
        } catch (err) {
          console.error('Error fetching product:', err);
          setError(err.message + ' - menggunakan data dummy sebagai fallback');
          setFormData(DUMMY_PRODUCT);  
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
        ? 'https://slim-blythe-williamalxndr-aab64bd4.koyeb.app/product/create/'
        : `https://slim-blythe-williamalxndr-aab64bd4.koyeb.app/product/edit/${id}/`;

      const method = mode === 'create' ? 'POST' : 'PUT';

      const body = JSON.stringify({
        productName: formData.name,
        productPrice: formData.price,
        productStock: formData.stock,
        productDescription: formData.description,
      });

      const token = localStorage.getItem("token") || "";
      const headers = { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };  

      console.log('Request URL:', url);
      console.log('Request Method:', method);
      console.log('Request Headers:', headers);
      console.log('Request Body:', body);

      const response = await fetch(url, {
        method,
        headers,
        body,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to save product');
      }

      const result = await response.json();
      if (result.ok || response.status === 200) {
        if (onSuccess) {
          onSuccess();
          window.location.reload();
        } else {
          alert(mode === 'create' ? 'Product created successfully!' : 'Product updated successfully!');
          navigate('/produk/');      
        }
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
    return <div style={{ color: 'red', marginTop: '1rem' }}>Error: Product ID not found</div>;
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
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <FormSubmitButton 
            label={mode === 'create' ? 'Save Product' : 'Update Product'} 
            disabled={loading} 
          />
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '0.5rem 1rem',
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
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
