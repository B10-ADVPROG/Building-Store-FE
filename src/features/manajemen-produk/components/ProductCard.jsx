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
    return (
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        backgroundColor: '#f9f9f9'
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#333', fontSize: '1.1rem' }}>
          {name}
        </h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#666' }}>Price:</span>
          <span style={{ fontWeight: 'bold', color: '#2a6496' }}>
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)}
          </span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#666' }}>Stock:</span>
          <span style={{ fontWeight: 'bold' }}>{stock} {unit}</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={onEdit}
            style={{
              flex: 1,
              padding: '0.5rem',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            Edit
          </button>
  
          <button
            style={{
              flex: 1,
              padding: '0.5rem',
              background: isDeleting ? '#dc3545aa' : '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isDeleting ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem',
              opacity: isDeleting ? 0.7 : 1
            }}
            onClick={() => onDelete(id)}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    );
  }
  