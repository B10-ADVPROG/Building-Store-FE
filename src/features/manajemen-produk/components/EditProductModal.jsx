import React, { useState } from 'react';
import ProductForm from './ProductForm.jsx';

export default function EditProductModal({ isOpen, onClose, productId, onSuccess }) {
  const [successMessage, setSuccessMessage] = useState(null);

  if (!isOpen) return null;

  const handleSuccess = (updatedProduct) => {
    setSuccessMessage('Product updated successfully!');
    // Inform parent component kalau ada update
    if (onSuccess) onSuccess(updatedProduct);

    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 1500);
  };

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

        <h2 style={{ marginBottom: '1rem' }}>Edit Product</h2>

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
          <ProductForm
            mode="edit"
            productId={productId}
            onCancel={onClose}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </div>
  );
}
