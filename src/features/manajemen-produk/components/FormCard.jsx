export default function FormCard({ title, children }) {
    return (
      <div
        className="p-5 d-flex flex-column justify-content-between"
        style={{
          maxWidth: '500px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderRadius: '15px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <h2 className="mb-4 text-center" style={{ fontWeight: '700', color: '#333' }}>
          {title}
        </h2>
        {children}
      </div>
    )
  }
  