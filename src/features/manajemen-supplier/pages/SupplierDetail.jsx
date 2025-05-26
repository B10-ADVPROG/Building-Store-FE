import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SupplierApi from '../api/supplierApi';

export default function SupplierDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Dummy supplier data
  const DUMMY_SUPPLIER = {
    id: id,
    name: 'PT Semen Jaya',
    contactPerson: 'Budi Santoso',
    phone: '08123456789',
    address: 'Jl. Industri No. 123, Jakarta',
    email: 'info@semenjaya.com',
    description: 'Leading cement supplier in Indonesia with top quality products.',
    notes: 'Delivers on Tuesdays and Thursdays. Requires 3 days lead time for orders.'
  };

  useEffect(() => {
    const fetchSupplierDetail = async () => {
        try {
            const data = await SupplierApi.getSupplierById(id);
            setSupplier(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching supplier:', err);
            setError(`${err.message} - Showing sample data`);
            setSupplier(DUMMY_SUPPLIER);
        } finally {
            setLoading(false);
        }
    };

      fetchSupplierDetail();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${supplier.name}?`)) {
        return;
    }

    setIsDeleting(true);
    try {
        await SupplierApi.deleteSupplier(id);
        navigate('/supplier');
    } catch (err) {
        console.error('Error deleting supplier:', err);
        setError(err.message);
    } finally {
        setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading supplier details...</p>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'red' }}>{error || 'Supplier not found'}</p>
        <button 
          onClick={() => navigate(-1)}
          style={{
            padding: '0.5rem 1rem',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            marginTop: '1rem',
            cursor: 'pointer'
          }}
        >
          Back to Suppliers
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '1.5rem' 
      }}>
        <h1 style={{ fontSize: '1.8rem', color: '#2c3e50' }}>{supplier.name}</h1>
        <Link 
          to="/supplier" 
          style={{
            padding: '0.5rem 1rem',
            background: '#6c757d',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Back to List
        </Link>
      </div>

      {error && (
        <div style={{ 
          backgroundColor: error.includes('Showing sample data') ? '#fff3cd' : '#f8d7da', 
          color: error.includes('Showing sample data') ? '#856404' : '#721c24',
          padding: '0.75rem',
          marginBottom: '1.5rem',
          border: error.includes('Showing sample data') ? '1px solid #ffeeba' : '1px solid #f5c6cb',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}

      <div style={{
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', color: '#7f8c8d', marginBottom: '0.5rem' }}>
              CONTACT PERSON
            </h3>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0, color: '#000' }}>
              {supplier.contactPerson}
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1rem', color: '#7f8c8d', marginBottom: '0.5rem' }}>
              PHONE
            </h3>
            <p style={{ fontSize: '1.2rem', margin: 0, color: '#000' }}>
              {supplier.phone}
            </p>
          </div>
        </div>

        <hr style={{ margin: '1.5rem 0', borderColor: '#eee' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', color: '#7f8c8d', marginBottom: '0.5rem' }}>
              EMAIL
            </h3>
            <p style={{ fontSize: '1.2rem', margin: 0, color: '#000' }}>
              {supplier.email}
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1rem', color: '#7f8c8d', marginBottom: '0.5rem' }}>
              ADDRESS
            </h3>
            <p style={{ fontSize: '1.2rem', margin: 0, color: '#000' }}>
              {supplier.address}
            </p>
          </div>
        </div>

        {supplier.description && (
          <>
            <hr style={{ margin: '1.5rem 0', borderColor: '#eee' }} />
            <div>
              <h3 style={{ fontSize: '1rem', color: '#7f8c8d', marginBottom: '0.5rem' }}>
                DESCRIPTION
              </h3>
              <p style={{ fontSize: '1rem', margin: 0, color: '#000' }}>
                {supplier.description}
              </p>
            </div>
          </>
        )}

        {supplier.notes && (
          <>
            <hr style={{ margin: '1.5rem 0', borderColor: '#eee' }} />
            <div>
              <h3 style={{ fontSize: '1rem', color: '#7f8c8d', marginBottom: '0.5rem' }}>
                NOTES
              </h3>
              <p style={{ fontSize: '1rem', margin: 0, color: '#000' }}>
                {supplier.notes}
              </p>
            </div>
          </>
        )}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        marginTop: '1.5rem'
      }}>
        <Link
          to={`/supplier/edit/${id}`}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#3498db',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          Edit Supplier
        </Link>
        <button
          style={{
            padding: '0.75rem 1.5rem',
            background: isDeleting ? '#dc3545aa' : '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: isDeleting ? 'not-allowed' : 'pointer',
            opacity: isDeleting ? 0.8 : 1
          }}
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete Supplier'}
        </button>
      </div>
    </div>
  );
}