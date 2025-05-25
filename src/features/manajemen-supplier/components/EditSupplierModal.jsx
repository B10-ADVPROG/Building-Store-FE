import React, { useState, useEffect } from 'react';
import SupplierForm from './SupplierForm.jsx';
import SupplierApi from '../api/supplierApi';

export default function EditSupplierModal({ isOpen, onClose, supplierId, onSuccess }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [supplierData, setSupplierData] = useState(null); // State to hold supplier data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSupplier = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await SupplierApi.getSupplierById(supplierId);
        setSupplierData(data);
      } catch (err) {
        console.error('Error fetching supplier:', err);
        setError('Failed to load supplier data');
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && supplierId) {
      fetchSupplier();
    }
  }, [isOpen, supplierId]);

  const handleSuccess = (updatedSupplier) => {
    setSuccessMessage('Supplier updated successfully!');

    if (onSuccess) onSuccess(updatedSupplier);

    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 1500);
  };

  const handleSave = async (updatedData) => {
    try {
      const newSupplierData = await SupplierApi.updateSupplier(supplierId, updatedData);
      handleSuccess(newSupplierData);
    } catch (error) {
      setError(error.message);
    }
  };

  if (!isOpen) return null;

  if (loading) return <div>Loading supplier data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!supplierData) return <div>No supplier data loaded.</div>;

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

        <h2 style={{ marginBottom: '1rem' }}>Edit Supplier</h2>

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
          <SupplierForm
            mode="edit"
            initialValues={supplierData} // Pass initial values to the form
            onSubmit={handleSave} // Use handleSave to save the data
            onCancel={onClose}
            supplierId={supplierId} // Pass the supplierId prop
          />
        )}
      </div>
    </div>
  );
}