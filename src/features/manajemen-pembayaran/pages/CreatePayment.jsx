import { useNavigate } from 'react-router-dom';
import PaymentForm from '../components/PaymentForm';

export default function CreatePayment() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/pembayaran');
  };

  const handleCancel = () => {
    navigate('/pembayaran');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem', color: '#2c3e50' }}>Create New Payment</h1>
      
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <PaymentForm 
          mode="create"
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}