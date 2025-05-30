import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditPaymentModal from './EditPaymentModal';
import { FaEdit, FaTrash, FaUser, FaMoneyBillWave, FaEye } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { motion } from 'framer-motion';

export default function PaymentCard({
  payment,
  onDelete,
  isDeleting,
  onEdit,
  onPaymentUpdated
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const navigate = useNavigate();
  
  // Add safety check for payment object
  if (!payment) {
    console.error('PaymentCard received undefined payment');
    return null;
  }
  
  const { paymentId, customerName, amount, paymentMethod, status, createdAt } = payment;
  
  // Add safety check for paymentId
  if (!paymentId) {
    console.error('Payment missing paymentId:', payment);
    return (
      <div className="card bg-danger text-white">
        <div className="card-body">
          <p>Error: Payment missing ID</p>
        </div>
      </div>
    );
  }

  const formattedAmount = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);

  const formattedDate = new Date(createdAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleEditClick = () => setIsEditOpen(true);
  const handleCloseModal = () => setIsEditOpen(false);
  const handleCardClick = () => {
    navigate(`/pembayaran/detail/${paymentId}`);
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
          Payment #{paymentId.substring(0, 8)}...
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
              <small>Customer Name</small>
            </div>
            <span className="fw-semibold text-white">
              {customerName}
            </span>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mb-2 text-cyan-300">
            <div className="d-flex align-items-center gap-2">
              <FaMoneyBillWave className="text-cyan-400" />
              <small>Amount</small>
            </div>
            <span className="fw-semibold text-white">
              {formattedAmount}
            </span>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mb-2 text-cyan-300">
            <div className="d-flex align-items-center gap-2">
              <small>Method</small>
            </div>
            <span className="fw-semibold text-white text-truncate" style={{maxWidth: "150px"}}>
              {paymentMethod}
            </span>
          </div>
          
          <div className="d-flex justify-content-between align-items-start mb-3 text-cyan-300">
            <div className="d-flex align-items-center gap-2">
              <small>Status</small>
            </div>
            <span className={`badge ${status === 'LUNAS' ? 'bg-success' : 'bg-warning'}`}>
              {status}
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
              onDelete(paymentId);
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
        <EditPaymentModal
          isOpen={isEditOpen}
          onClose={handleCloseModal}
          paymentId={payment.paymentId}
          onSuccess={() => {
            handleCloseModal();
            if (onPaymentUpdated) onPaymentUpdated();
          }}
        />
      )}
    </motion.div>
  );
}