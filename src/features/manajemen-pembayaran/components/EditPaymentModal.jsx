import React, { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import PaymentForm from './PaymentForm';
import PaymentApi from '../api/paymentApi';

export default function EditPaymentModal({ isOpen, onClose, paymentId, onSuccess }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const fetchPayment = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await PaymentApi.getPaymentById(paymentId);
        setPaymentData(data);
      } catch (err) {
        console.error('Error fetching payment:', err);
        setError('Failed to load payment data');
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && paymentId) {
      fetchPayment();
    }
  }, [isOpen, paymentId]);

  const handleSuccess = (updatedPayment) => {
    setSuccessMessage('Payment updated successfully!');

    if (onSuccess) onSuccess(updatedPayment);

    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 1500);
  };

  const handleSave = async (updatedData) => {
    try {
      const newPaymentData = await PaymentApi.updatePaymentStatus(paymentId, updatedData.status);
      handleSuccess(newPaymentData);
    } catch (error) {
      setError(error.message);
    }
  };

  if (!isOpen) return null;

  if (loading) return <div>Loading payment data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!paymentData) return <div>No payment data loaded.</div>;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem',
    }}>
      <div
        ref={modalRef}
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          width: '90%',
          maxWidth: '600px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          position: 'relative',
          animation: 'slideUp 0.3s forwards',
        }}
      >
        <button
          style={{
            position: 'absolute',
            right: '1rem',
            top: '1rem',
            background: 'transparent',
            border: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer',
            color: '#6c757d',
          }}
          onClick={onClose}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#343a40';
            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#6c757d';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          aria-label="Close modal"
        >
          <FaTimes />
        </button>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ 
            margin: '0 0 0.5rem 0',
            fontSize: '1.8rem',
            fontWeight: '600',
            color: '#2c3e50',
          }}>
            Update Payment
          </h2>
          <p style={{ 
            margin: 0,
            color: '#6c757d',
            fontSize: '0.95rem'
          }}>
            Update payment status below
          </p>
        </div>

        {successMessage ? (
          <div
            style={{
              padding: '1rem',
              color: 'green',
              textAlign: 'center',
              fontSize: '1.1rem',
            }}
          >
            {successMessage}
          </div>
        ) : (
          <PaymentForm
            mode="edit"
            initialValues={paymentData}
            onSubmit={handleSave}
            onCancel={onClose}
            paymentId={paymentId}
          />
        )}

        <style jsx global>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}