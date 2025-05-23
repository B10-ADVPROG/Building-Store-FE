import React from 'react';
import ProductForm from './ProductForm.jsx';

export default function CreateProductModal({ onClose, onCreated }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.2)', // lebih transparan overlay-nya
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

        <h2 style={{ marginBottom: '1rem' }}>Add New Product</h2>

        <ProductForm
          mode="create"
          onCancel={onClose}
          onSuccess={() => {
            if (onCreated) onCreated();
            onClose();
          }}
        />
      </div>
    </div>
  );
}
