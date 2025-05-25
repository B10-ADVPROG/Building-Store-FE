export default function ConfirmationModal({ show, onClose, onConfirm, message }) {
    if (!show) return null
  
    return (
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1050,
        }}
      >
        <div
          className="p-4"
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '400px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          <p style={{ fontWeight: '600', color: '#333' }}>{message}</p>
          <div className="d-flex justify-content-end gap-2 mt-3">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  }
  