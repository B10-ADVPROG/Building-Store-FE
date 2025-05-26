import { useState, useEffect } from 'react';
import SupplierCard from '../components/SupplierCard.jsx';
import CreateSupplierModal from '../components/CreateSupplierModal.jsx';
import EditSupplierModal from '../components/EditSupplierModal.jsx';
import SupplierApi from '../api/supplierApi';
import { motion } from 'framer-motion';

// Dummy data for suppliers with UUID format
const DUMMY_SUPPLIERS = [
  { 
    id: '550e8400-e29b-41d4-a716-446655440001', 
    name: 'PT Semen Jaya', 
    contactName: 'Budi Santoso', 
    phone: '08123456789', 
    address: 'Jl. Industri No. 123, Jakarta', 
    email: 'info@semenjaya.com' 
  },
  { 
    id: '550e8400-e29b-41d4-a716-446655440002', 
    name: 'CV Bata Prima', 
    contactName: 'Siti Rahayu', 
    phone: '08567891234', 
    address: 'Jl. Pembangunan No. 45, Bandung', 
    email: 'sales@bataprima.co.id' 
  },
  { 
    id: '550e8400-e29b-41d4-a716-446655440003', 
    name: 'PT Besi Kokoh', 
    contactName: 'Anton Wijaya', 
    phone: '08234567890', 
    address: 'Jl. Logam No. 67, Surabaya', 
    email: 'contact@besikokoh.com' 
  },
  { 
    id: '550e8400-e29b-41d4-a716-446655440004', 
    name: 'UD Kayu Indah', 
    contactName: 'Dewi Anggraini', 
    phone: '08765432109', 
    address: 'Jl. Hutan No. 89, Medan', 
    email: 'dewi@kayuindah.com' 
  },
  { 
    id: '550e8400-e29b-41d4-a716-446655440005', 
    name: 'PT Cat Warna', 
    contactName: 'Rudi Hermawan', 
    phone: '08912345678', 
    address: 'Jl. Pelangi No. 12, Yogyakarta', 
    email: 'sales@catwarna.id' 
  }
];

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingDummyData, setUsingDummyData] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editSupplierId, setEditSupplierId] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        console.log('Fetching suppliers...');
        const data = await SupplierApi.getAllSuppliers();
        console.log('Received suppliers:', data);
        setSuppliers(data);
        setUsingDummyData(false);
      } catch (err) {
        console.error('Error fetching suppliers:', err);
        setError(`${err.message} - Using dummy data instead`);
        setSuppliers(DUMMY_SUPPLIERS);
        setUsingDummyData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this supplier?')) {
      return;
    }

    setDeletingId(id);
    try {
      await SupplierApi.deleteSupplier(id);
      setSuppliers(suppliers.filter(supplier => supplier.id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting supplier:', err);
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleSupplierCreated = (newSupplier) => {
    setSuppliers(prev => [...prev, newSupplier]);
  };

  const openEditModal = (supplierId) => {
    setEditSupplierId(supplierId);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditSupplierId(null);
  };

  const handleSupplierUpdated = (updatedSupplier) => {
    setSuppliers(suppliers =>
      suppliers.map(s => s.id === updatedSupplier.id ? updatedSupplier : s)
    );
    closeEditModal();
  };

  if (loading) {
    return <div className="container py-4"><div className="spinner-border text-primary" role="status"></div></div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="container-fluid py-4">
      {usingDummyData && (
        <div className="alert alert-warning">
          <i className="fas fa-exclamation-triangle me-2"></i>
          Using sample supplier data because server couldn't be reached
        </div>
      )}
      
      {error && !usingDummyData && (
        <div className="alert alert-danger">{error}</div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 text-primary">Supplier Directory</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary"
        >
          <i className="fas fa-plus me-2"></i>
          Add New Supplier
        </motion.button>
      </div>

      {suppliers.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-white fs-5">No suppliers found. Add your first supplier!</p>
        </div>
      ) : (
        <motion.div 
          className="row g-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {suppliers.map(supplier => (
            <div key={supplier.id} className="col-md-6 col-lg-4 col-xl-3">
              <SupplierCard 
                supplier={supplier}
                onDelete={handleDelete}
                isDeleting={deletingId === supplier.id}
                onEdit={() => openEditModal(supplier.id)}
              />
            </div>
          ))}
        </motion.div>
      )}

      {showCreateModal && (
        <CreateSupplierModal 
          onClose={() => setShowCreateModal(false)} 
          onSupplierCreated={handleSupplierCreated}
        />
      )}

      {showEditModal && (
        <EditSupplierModal
          isOpen={showEditModal}
          onClose={closeEditModal}
          supplierId={editSupplierId}
          onSuccess={handleSupplierUpdated} 
        />
      )}
    </div>
  );
}