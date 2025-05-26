import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PaymentApi from '../api/paymentApi.js';

export default function PaymentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Dummy payment data
  const DUMMY_PAYMENT = {
    paymentId: id,
    customerName: 'John Doe',
    amount: 500000,
    paymentMethod: 'CASH',
    status: 'LUNAS',
    createdAt: '2025-05-20T10:30:00',
    updatedAt: '2025-05-20T10:30:00'
  };

  useEffect(() => {
    const fetchPaymentDetail = async () => {
      try {
        const token = localStorage.getItem("token") || "";

        try {
          let body = JSON.stringify({ "token": token });
          const authResponse = await fetch("http://localhost:8080/auth/auth-cashier/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
          });

          if (!authResponse.ok) throw new Error("Unauthorized");

          const paymentData = await PaymentApi.getPaymentById(id);
          setPayment(paymentData);
        } catch (err) {
          if (err.message === "Unauthorized" || err.message === "Forbidden") {
            navigate("/unauthorized");
            return;
          }
          throw err;
        }
      } catch (err) {
        console.error('Error fetching payment:', err);
        setError(`${err.message} - Showing sample data`);
        setPayment(DUMMY_PAYMENT);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetail();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete this payment?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await PaymentApi.deletePayment(id);
      navigate('/pembayaran');
    } catch (err) {
      console.error('Error deleting payment:', err);
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p className="text-white">Loading payment details...</p>
      </div>
    );
  }

  if (!payment) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'red' }}>{error || 'Payment not found'}</p>
        <button 
          onClick={() => navigate(-1)}
          style={{
            padding: '0.5rem 1rem',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            marginTop: '1rem',
            cursor: 'pointer'
          }}
        >
          Back to Payments
        </button>
      </div>
    );
  }

  const formattedAmount = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(payment.amount);

  const formattedCreatedAt = new Date(payment.createdAt).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const formattedUpdatedAt = new Date(payment.updatedAt).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '1.5rem' 
      }}>
        <h1 style={{ fontSize: '1.8rem', color: '#2c3e50' }}>Payment Details</h1>
        <Link 
          to="/pembayaran" 
          style={{
            padding: '0.5rem 1rem',
            background: '#6c757d',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Back to List
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
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#7f8c8d', marginBottom: '0.5rem' }}>
            PAYMENT ID
          </h3>
          <p style={{ fontSize: '1.2rem', margin: 0, color: '#000' }}>
            {payment.paymentId}
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', color: '#7f8c8d', marginBottom: '0.5rem' }}>
              CUSTOMER NAME
            </h3>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0, color: '#000' }}>
              {payment.customerName}
            </p>
          </div>
        </div>

        <hr style={{ margin: '1.5rem 0', borderColor: '#eee' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', color: '#7f8c8d', marginBottom: '0.5rem' }}>
              AMOUNT
            </h3>
            <p style={{ 
              fontSize: '1.75rem', 
              fontWeight: 'bold',
              color: '#2c3e50',
              margin: 0
            }}>
              {formattedAmount}
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1rem', color: '#7f8c8d', marginBottom: '0.5rem' }}>
              PAYMENT METHOD
            </h3>
            <p style={{ fontSize: '1.2rem', margin: 0, color: '#000' }}>
              {payment.paymentMethod}
            </p>
          </div>
        </div>

        <hr style={{ margin: '1.5rem 0', borderColor: '#eee' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', color: '#7f8c8d', marginBottom: '0.5rem' }}>
              STATUS
            </h3>
            <p style={{ 
              display: 'inline-block',
              padding: '0.35rem 0.65rem',
              fontSize: '0.85rem',
              fontWeight: 'bold',
              backgroundColor: payment.status === 'LUNAS' ? '#28a745' : '#ffc107',
              color: payment.status === 'LUNAS' ? 'white' : 'black',
              borderRadius: '0.25rem'
            }}>
              {payment.status}
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1rem', color: '#7f8c8d', marginBottom: '0.5rem' }}>
              CREATED AT
            </h3>
            <p style={{ fontSize: '1rem', margin: 0, color: '#000' }}>
              {formattedCreatedAt}
            </p>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#7f8c8d', marginBottom: '0.5rem' }}>
            LAST UPDATED
          </h3>
          <p style={{ fontSize: '1rem', margin: 0, color: '#000' }}>
            {formattedUpdatedAt}
          </p>
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        marginTop: '1.5rem'
      }}>
        <Link
          to={`/pembayaran/edit/${id}`}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#3498db',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          Edit Payment
        </Link>
        <button
          style={{
            padding: '0.75rem 1.5rem',
            background: isDeleting ? '#dc3545aa' : '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: isDeleting ? 'not-allowed' : 'pointer',
            opacity: isDeleting ? 0.8 : 1
          }}
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete Payment'}
        </button>
      </div>
    </div>
  );
}