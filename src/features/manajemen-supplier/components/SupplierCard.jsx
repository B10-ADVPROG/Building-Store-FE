export default function SupplierCard({ 
  id, 
  name, 
  contactName, 
  phone,
  address,
  email,
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
        <span style={{ color: '#666' }}>Contact:</span>
        <span style={{ fontWeight: 'bold' }}>{contactName}</span>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#666' }}>Phone:</span>
        <span>{phone}</span>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#666' }}>Email:</span>
        <span style={{ fontSize: '0.9rem' }}>{email}</span>
      </div>
      
      <div style={{ marginTop: '0.5rem' }}>
        <span style={{ color: '#666' }}>Address:</span>
        <p style={{ marginTop: '0.2rem', fontSize: '0.9rem' }}>{address}</p>
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