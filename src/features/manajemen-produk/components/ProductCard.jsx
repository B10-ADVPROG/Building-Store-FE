import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaBoxOpen, FaMoneyBillWave, FaEye } from 'react-icons/fa';
import { GiCash } from 'react-icons/gi';
import { motion } from 'framer-motion';

export default function ProductCard({
  id,
  name,
  price,
  stock,
  unit = 'pcs',
  onDelete,
  isDeleting,
  onEdit,
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/produk/detail/${id}`);
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
          <div className="d-flex justify-content-between align-items-center mb-3 text-cyan-300">
            <div className="d-flex align-items-center gap-2">
              <GiCash className="text-cyan-400" />
              <small>Harga</small>
            </div>
            <span className="fw-bold text-white">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(price)}
            </span>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4 text-cyan-300">
            <div className="d-flex align-items-center gap-2">
              <FaBoxOpen className="text-cyan-400" />
              <small>Stok</small>
            </div>
            <span className="fw-semibold text-white">
              {stock} <span className="text-cyan-300">{unit}</span>
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
            {isDeleting ? 'Menghapus...' : 'Hapus'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}