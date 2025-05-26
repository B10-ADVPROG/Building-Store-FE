import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditSupplierModal from './EditSupplierModal';
import './SupplierCard.css';
import { FaEdit, FaTrash, FaUser, FaPhone, FaEnvelope, FaEye } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { motion } from 'framer-motion';

export default function SupplierCard({
  supplier,
  onDelete,
  isDeleting,
  onEdit,
  onSupplierUpdated
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const navigate = useNavigate();
  const { id, name, contactPerson, phone, address, email } = supplier;

  const handleEditClick = () => setIsEditOpen(true);
  const handleCloseModal = () => setIsEditOpen(false);
  const handleCardClick = () => {
    navigate(`/supplier/detail/${id}`);
  };

  // Variants for animation
  const cardVariants = {
    hover: {
      y: -5,
      boxShadow: "0 10px 20px rgba(0, 255, 255, 0.3)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      onClick={handleCardClick}
      className="card bg-dark-navy text-white border border-cyan-800 shadow-sm h-100"
      style={{ 
        borderRadius: '1rem',
        background: 'linear-gradient(145deg, #0a192f, #0f2541)',
        border: '1px solid rgba(0, 255, 255, 0.1)',
        overflow: 'hidden'
      }}
      whileHover="hover"
      variants={cardVariants}
    >
      <div className="card-body d-flex flex-column position-relative">
        {/* Glow effect */}
        <div 
          className="position-absolute top-0 end-0 bg-cyan-500"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            filter: 'blur(40px)',
            opacity: 0.3,
            zIndex: 0
          }}
        />
        
        <h5 className="card-title fw-semibold mb-3 text-cyan-400 position-relative" style={{ zIndex: 1 }}>
          {name}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="btn btn-link p-0 ms-2"
            style={{ color: 'inherit' }}
          >
            <FaEye size={14} />
          </button>
        </h5>

        <div className="position-relative" style={{ zIndex: 1 }}>
          <div className="d-flex justify-content-between align-items-center mb-2 text-cyan-300">
            <div className="d-flex align-items-center gap-2">
              <FaUser className="text-cyan-400" />
              <small>Contact</small>
            </div>
            <span className="fw-semibold text-white">
              {contactPerson}
            </span>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mb-2 text-cyan-300">
            <div className="d-flex align-items-center gap-2">
              <FaPhone className="text-cyan-400" />
              <small>Phone</small>
            </div>
            <span className="fw-semibold text-white">
              {phone}
            </span>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mb-2 text-cyan-300">
            <div className="d-flex align-items-center gap-2">
              <FaEnvelope className="text-cyan-400" />
              <small>Email</small>
            </div>
            <span className="fw-semibold text-white text-truncate" style={{maxWidth: "150px"}}>
              {email}
            </span>
          </div>
          
          <div className="d-flex justify-content-between align-items-start mb-3 text-cyan-300">
            <div className="d-flex align-items-center gap-2">
              <FaLocationDot className="text-cyan-400 mt-1" />
              <small>Address</small>
            </div>
            <span className="fw-semibold text-white text-end" style={{fontSize: "0.85rem", maxWidth: "170px"}}>
              {address}
            </span>
          </div>
        </div>

        <div className="mt-auto d-flex gap-2 position-relative" style={{ zIndex: 1 }}>
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="btn btn-sm btn-outline-cyan w-50 d-flex align-items-center justify-content-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{ borderColor: '#00ffff', color: '#00ffff' }}
          >
            <FaEdit className="me-1" />
            Edit
          </motion.button>

          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            disabled={isDeleting}
            className={`btn btn-sm w-50 d-flex align-items-center justify-content-center ${
              isDeleting ? 'btn-outline-danger disabled opacity-75' : 'btn-outline-danger'
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={!isDeleting ? { borderColor: '#ff5555', color: '#ff5555' } : {}}
          >
            <FaTrash className="me-1" />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </motion.button>
        </div>
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
    </motion.div>
  );
}