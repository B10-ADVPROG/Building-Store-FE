import React from 'react';
import { FaTimes } from 'react-icons/fa';
import ProductForm from './ProductForm.jsx';

export default function CreateProductModal({ onClose, onCreated }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: '1rem',
        transition: 'all 0.3s ease-out',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '650px',
          position: 'relative',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          padding: '2.5rem',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '1px solid rgba(0,0,0,0.1)',
          animation: 'slideUp 0.3s ease-out',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#6c757d',
            lineHeight: 1,
            padding: '0.5rem',
            borderRadius: '50%',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#495057';
            e.currentTarget.style.backgroundColor = '#f8f9fa';
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
            Add New Product
          </h2>
          <p style={{ 
            margin: 0,
            color: '#6c757d',
            fontSize: '0.95rem'
          }}>
            Fill in the details below to add a new product to your inventory
          </p>
        </div>

        <ProductForm
          mode="create"
          onCancel={onClose}
          onSuccess={() => {
            if (onCreated) onCreated();
            onClose();
          }}
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