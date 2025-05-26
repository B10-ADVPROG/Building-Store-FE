import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormInput from '../../manajemen-produk/components/FormInput';
import FormSubmitButton from '../../manajemen-produk/components/FormSubmitButton';
import ConfirmationModal from '../../manajemen-produk/components/ConfirmationModal';
import PaymentApi from '../api/paymentApi';

// Update DUMMY_PAYMENT
const DUMMY_PAYMENT = {
  paymentId: 'dummy-uuid-123',
  customerName: 'John Doe',
  amount: 750000,
  paymentMethod: 'CASH',
  status: 'LUNAS',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export default function PaymentForm({ mode, onSuccess, onCancel, paymentId }) {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  
  const id = paymentId || paramId;
  
  const [formData, setFormData] = useState({
    customerName: '',
    amount: '',
    paymentMethod: 'CASH',
    status: 'LUNAS',
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
            customerName: paymentData.customerName || '',
            amount: paymentData.amount || '',
            paymentMethod: paymentData.paymentMethod || 'CASH',
            status: paymentData.status || 'LUNAS'
          });
          
        } catch (err) {
          console.error('Error fetching payment:', err);
          setError(err.message + ' - using dummy data as fallback');
          setFormData({
            customerName: DUMMY_PAYMENT.customerName,
            amount: DUMMY_PAYMENT.amount,
            paymentMethod: DUMMY_PAYMENT.paymentMethod,
            status: DUMMY_PAYMENT.status
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
      let createdOrUpdatedPayment;
      
      if (mode === 'create') {
        console.log('Creating payment with data:', formData);
        createdOrUpdatedPayment = await PaymentApi.createPayment(formData);
        console.log('Payment API response:', createdOrUpdatedPayment);
      } else {
        createdOrUpdatedPayment = await PaymentApi.updatePaymentStatus(id, formData.status);
      }
      
      if (onSuccess) {
        // Make sure we have a valid payment to return
        if (createdOrUpdatedPayment && createdOrUpdatedPayment.paymentId) {
          console.log('Calling onSuccess with:', createdOrUpdatedPayment);
          onSuccess(createdOrUpdatedPayment);
        } else {
          console.warn('API did not return a valid payment object, creating fallback');
          // If API didn't return the payment, create one from form data
          const fallbackPayment = {
            paymentId: 'temp-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
            customerName: formData.customerName,
            amount: parseInt(formData.amount),
            paymentMethod: formData.paymentMethod,
            status: formData.status,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          console.log('Using fallback payment:', fallbackPayment);
          onSuccess(fallbackPayment);
        }
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
              label="Customer Name" 
              name="customerName" 
              value={formData.customerName} 
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
            {/* Transaction ID field removed */}
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