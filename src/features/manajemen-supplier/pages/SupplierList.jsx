import { useState, useEffect } from 'react';
import SupplierCard from '../components/SupplierCard.jsx';
import CreateSupplierModal from '../components/CreateSupplierModal.jsx';
import EditSupplierModal from '../components/EditSupplierModal.jsx';

// Dummy data for suppliers
const DUMMY_SUPPLIERS = [
  { id: 1, name: 'PT Semen Jaya', contactName: 'Budi Santoso', phone: '08123456789', address: 'Jl. Industri No. 123, Jakarta', email: 'info@semenjaya.com' },
  { id: 2, name: 'CV Bata Prima', contactName: 'Siti Rahayu', phone: '08567891234', address: 'Jl. Pembangunan No. 45, Bandung', email: 'sales@bataprima.co.id' },
  { id: 3, name: 'PT Besi Kokoh', contactName: 'Anton Wijaya', phone: '08234567890', address: 'Jl. Logam No. 67, Surabaya', email: 'contact@besikokoh.com' },
  { id: 4, name: 'UD Kayu Indah', contactName: 'Dewi Anggraini', phone: '08765432109', address: 'Jl. Hutan No. 89, Medan', email: 'dewi@kayuindah.com' },
  { id: 5, name: 'PT Cat Warna', contactName: 'Rudi Hermawan', phone: '08912345678', address: 'Jl. Pelangi No. 12, Yogyakarta', email: 'sales@catwarna.id' }
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
        const response = await fetch('http://127.0.0.1:8080/supplier/');
        
        if (!response.ok) {
          throw new Error('Failed to load suppliers');
        }

        const data = await response.json();
        setSuppliers(data);
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
      const response = await fetch(`http://127.0.0.1:8080/supplier/delete/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete supplier');
      }

      setSuppliers(suppliers.filter(supplier => supplier.id !== id));
      
      if (usingDummyData) {
        setError('Supplier deleted (dummy data)');
      } else {
        setError(null);
      }
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
    setSuppliers(suppliers.map(s => s.id === updatedSupplier.id ? updatedSupplier : s));
    closeEditModal();
  };

  if (loading) {
    return <div style={{ padding: '1rem' }}>Loading suppliers...</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      {usingDummyData && (
        <div style={{ 
          backgroundColor: '#fff3cd', 
          color: '#856404',
          padding: '0.75rem',
          marginBottom: '1rem',
          border: '1px solid #ffeeba',
          borderRadius: '4px'
        }}>
          Warning: Using sample supplier data because server couldn't be reached
        </div>
      )}
      
      {error && !usingDummyData && (
        <div style={{ color: 'red', padding: '1rem' }}>{error}</div>
      )}

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '1rem' 
      }}>
        <h1>Supplier Directory</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          style={{
            padding: '0.5rem 1rem',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add New Supplier
        </button>
      </div>

      {suppliers.length === 0 ? (
        <div style={{ textAlign: 'center', margin: '2rem' }}>
          No suppliers found. Add your first supplier!
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1rem'
        }}>
          {suppliers.map(supplier => (
            <SupplierCard 
              key={supplier.id}
              id={supplier.id}
              name={supplier.name} 
              contactName={supplier.contactName}
              phone={supplier.phone}
              address={supplier.address}
              email={supplier.email}
              onDelete={handleDelete}
              isDeleting={deletingId === supplier.id}
              onEdit={() => openEditModal(supplier.id)} 
            />
          ))}
        </div>
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