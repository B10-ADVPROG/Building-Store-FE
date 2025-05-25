import React, { useState } from 'react';
import EditSupplierModal from './EditSupplierModal';
import './SupplierCard.css';

export default function SupplierCard({ supplier, onDelete, onSupplierUpdated }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditClick = () => setIsEditOpen(true);
  const handleCloseModal = () => setIsEditOpen(false);

  return (
    <div className="supplier-card">
      <h2 className="supplier-card-title">{supplier.name}</h2>
      <div className="supplier-info">
        <p>
          <strong>Contact:</strong> {supplier.contactPerson || 'N/A'}
        </p>
        <p>
          <strong>Phone:</strong> {supplier.phone || 'N/A'}
        </p>
        <p>
          <strong>Email:</strong> {supplier.email || 'N/A'}
        </p>
        <p>
          <strong>Address:</strong> {supplier.address || 'N/A'}
        </p>
      </div>
      <div className="supplier-actions">
        <button
          className="btn btn-edit"
          onClick={handleEditClick}
        >
          Edit
        </button>
        <button
          className="btn btn-delete"
          onClick={() => onDelete(supplier.id)}
          disabled={onDelete === undefined}
        >
          Delete
        </button>
      </div>
      {isEditOpen && (
        <EditSupplierModal
          isOpen={isEditOpen}
          onClose={handleCloseModal}
          supplierId={supplier.id}
          onSuccess={() => {
            handleCloseModal();
            if (onSupplierUpdated) onSupplierUpdated();
          }}
        />
      )}
    </div>
  );
}