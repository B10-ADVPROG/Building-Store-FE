import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormInput from '../../manajemen-produk/components/FormInput';
import FormSubmitButton from '../../manajemen-produk/components/FormSubmitButton';
import ConfirmationModal from '../../manajemen-produk/components/ConfirmationModal';
import PaymentApi from '../api/paymentApi';

// Dummy fallback data
const DUMMY_PAYMENT = {
  paymentId: 'dummy-uuid-123',
  customerId: 'customer-001',
  amount: 750000,
  paymentMethod: 'CASH',
  status: 'LUNAS',
  transactionId: 'transaction-001',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export default function PaymentForm({ mode, onSuccess, onCancel, paymentId }) {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  
  const id = paymentId || paramId;
  
  const [formData, setFormData] = useState({
    customerId: '',
    amount: '',
    paymentMethod: 'CASH',
    status: 'LUNAS',
    transactionId: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayment = async () => {
      if (mode === 'edit' && id) {
        setLoadingInitial(true);
        setError(null);
        
        try {
          const paymentData = await PaymentApi.getPaymentById(id);
          
          setFormData({
            customerId: paymentData.customerId || '',
            amount: paymentData.amount || '',
            paymentMethod: paymentData.paymentMethod || 'CASH',
            status: paymentData.status || 'LUNAS',
            transactionId: paymentData.transactionId || ''
          });
          
        } catch (err) {
          console.error('Error fetching payment:', err);
          setError(err.message + ' - using dummy data as fallback');
          setFormData({
            customerId: DUMMY_PAYMENT.customerId,
            amount: DUMMY_PAYMENT.amount,
            paymentMethod: DUMMY_PAYMENT.paymentMethod,
            status: DUMMY_PAYMENT.status,
            transactionId: DUMMY_PAYMENT.transactionId
          });  
        } finally {
          setLoadingInitial(false);
        }
      }
    };

    fetchPayment();
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
      if (mode === 'create') {
        await PaymentApi.createPayment(formData);
      } else {
        // In edit mode, we're only updating the payment status
        await PaymentApi.updatePaymentStatus(id, formData.status);
      }
      
      if (onSuccess) {
        onSuccess();
      } else {
        alert(mode === 'create' ? 'Payment created successfully!' : 'Payment updated successfully!');
        navigate('/pembayaran');
      }
    } catch (err) {
      console.error('Save failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loadingInitial) {
    return <div>Loading payment data...</div>;
  }

  if (mode === 'edit' && !id) {
    return <div style={{ color: 'red', marginTop: '1rem' }}>Error: Payment ID not found</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{ flexGrow: 1 }}>
        {mode === 'create' && (
          <>
            <FormInput 
              label="Customer ID" 
              name="customerId" 
              value={formData.customerId} 
              onChange={handleChange} 
              required 
            />
            <FormInput 
              label="Amount" 
              name="amount" 
              type="number" 
              value={formData.amount} 
              onChange={handleChange} 
              required 
            />
            <FormInput 
              label="Transaction ID" 
              name="transactionId" 
              value={formData.transactionId} 
              onChange={handleChange} 
              required 
            />
          </>
        )}
        
        <div className="mb-4">
          <label className="form-label" style={{ color: '#555', fontWeight: '600' }}>
            Payment Method
          </label>
          <select
            name="paymentMethod"
            className="form-select"
            value={formData.paymentMethod}
            onChange={handleChange}
            style={{
              backgroundColor: 'rgba(240,240,240,0.7)',
              border: 'none',
              color: '#333',
            }}
            required
          >
            <option value="CASH">Cash</option>
            <option value="CREDIT_CARD">Credit Card</option>
            <option value="DEBIT_CARD">Debit Card</option>
            <option value="BANK_TRANSFER">Bank Transfer</option>
            <option value="E_WALLET">E-Wallet</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="form-label" style={{ color: '#555', fontWeight: '600' }}>
            Payment Status
          </label>
          <select
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
            style={{
              backgroundColor: 'rgba(240,240,240,0.7)',
              border: 'none',
              color: '#333',
            }}
            required
          >
            <option value="LUNAS">LUNAS</option>
            <option value="CICILAN">CICILAN</option>
          </select>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <FormSubmitButton 
            label={mode === 'create' ? 'Create Payment' : 'Update Payment'} 
            disabled={loading} 
          />
          <button
            type="button"
            onClick={onCancel || (() => navigate('/pembayaran'))}
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
        message={mode === 'create' ? 'Are you sure you want to create this payment?' : 'Confirm payment update?'}
      />
    </>
  );
}