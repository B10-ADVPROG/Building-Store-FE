import React, { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import PaymentForm from './PaymentForm.jsx';

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
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          maxWidth: '600px',
          width: '100%',
          position: 'relative',
          boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
          padding: '2rem',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'transparent',
            border: 'none',
            fontSize: '1.8rem',
            cursor: 'pointer',
            color: '#555',
            lineHeight: 1,
          }}
          aria-label="Close modal"
        >
          &times;
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
            Fill in the customer name and payment details below
          </p>
        </div>

        <PaymentForm
          mode="create"
          onCancel={onClose}
          onSuccess={(newPayment) => {
            if (newPayment && onPaymentCreated) {
              console.log("Payment created:", newPayment);
              onPaymentCreated(newPayment);
            }
            onClose();
          }}
        />
      </div>
    </div>
  );
}