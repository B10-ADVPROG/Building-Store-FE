import { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import PaymentForm from './PaymentForm';

export default function CreatePaymentModal({ onClose, onPaymentCreated }) {
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

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

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
            Add New Payment
          </h2>
          <p style={{ 
            margin: 0,
            color: '#6c757d',
            fontSize: '0.95rem'
          }}>
            Fill in the details below to record a new payment
          </p>
        </div>

        <PaymentForm
          mode="create"
          onCancel={onClose}
          onSuccess={onPaymentCreated}
        />

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