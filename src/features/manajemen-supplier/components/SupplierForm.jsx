import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormInput from '../../manajemen-produk/components/FormInput';
import FormTextArea from '../../manajemen-produk/components/FormTextArea';
import FormSubmitButton from '../../manajemen-produk/components/FormSubmitButton';
import ConfirmationModal from '../../manajemen-produk/components/ConfirmationModal';
import SupplierApi from '../api/supplierApi';

// Dummy fallback data
const DUMMY_SUPPLIER = {
  name: 'PT Supplier Dummy',
  contactName: 'John Doe',
  phone: '08123456789',
  address: 'Jl. Contoh No. 123, Jakarta',
  email: 'contact@example.com',
  description: 'This is a dummy supplier because actual data could not be loaded.',
  notes: ''
};

export default function SupplierForm({ mode, onSuccess, onCancel, supplierId }) {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  
  const id = supplierId || paramId;
  
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    address: '',
    email: '',
    description: '',
    notes: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSupplier = async () => {
        if (mode === 'edit' && id) {
            setLoadingInitial(true);
            setError(null);
            
            try {
                const supplierData = await SupplierApi.getSupplierById(id);
                setFormData({
                    name: supplierData.name || '',
                    contactPerson: supplierData.contactPerson || '',
                    phone: supplierData.phone || '',
                    address: supplierData.address || '',
                    email: supplierData.email || '',
                    description: supplierData.description || '',
                    notes: supplierData.notes || ''
                });
            } catch (err) {
                console.error('Error fetching supplier:', err);
                setError(err.message);
                setFormData(DUMMY_SUPPLIER);
            } finally {
                setLoadingInitial(false);
            }
        }
    };

      fetchSupplier();
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
        const result = mode === 'create' 
            ? await SupplierApi.createSupplier(formData)
            : await SupplierApi.updateSupplier(id, formData);

        if (onSuccess) {
            onSuccess(result);
        } else {
            alert(mode === 'create' ? 'Supplier created successfully!' : 'Supplier updated successfully!');
            navigate('/supplier');
        }
    } catch (err) {
        console.error('Save failed:', err);
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  if (loadingInitial) {
    return <div>Loading supplier data...</div>;
  }

  if (mode === 'edit' && !id) {
    return <div style={{ color: 'red', marginTop: '1rem' }}>Error: Supplier ID not found</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{ flexGrow: 1 }}>
        <FormInput 
          label="Supplier Name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        <FormInput 
          label="Contact Person" 
          name="contactPerson" 
          value={formData.contactPerson} 
          onChange={handleChange} 
          required 
        />
        <FormInput 
          label="Phone" 
          name="phone" 
          value={formData.phone} 
          onChange={handleChange} 
          required 
        />
        <FormInput 
          label="Email" 
          name="email" 
          type="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <FormInput 
          label="Address" 
          name="address" 
          value={formData.address} 
          onChange={handleChange} 
          required 
        />
        <FormTextArea 
          label="Description" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
        />
        <FormTextArea 
          label="Additional Notes" 
          name="notes" 
          value={formData.notes} 
          onChange={handleChange} 
        />
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <FormSubmitButton 
            label={mode === 'create' ? 'Save Supplier' : 'Update Supplier'} 
            disabled={loading} 
          />
          <button
            type="button"
            onClick={onCancel || (() => navigate('/supplier'))}
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
        message={mode === 'create' ? 'Are you sure you want to create this supplier?' : 'Confirm supplier update?'}
      />
    </>
  );
}