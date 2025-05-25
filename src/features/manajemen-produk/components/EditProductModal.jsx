import React, { useState } from 'react';
import ProductForm from './ProductForm.jsx';

export default function EditProductModal({ isOpen, onClose, productId, onSuccess }) {
  const [successMessage, setSuccessMessage] = useState(null);

  if (!isOpen) return null;

  const handleSuccess = (updatedProduct) => {
    setSuccessMessage('Product updated successfully!');
    if (onSuccess) onSuccess(updatedProduct);

    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 1500);
  };

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Product</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            {successMessage ? (
              <div className="alert alert-success text-center" role="alert">
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
      </div>
    </div>
  );
}
