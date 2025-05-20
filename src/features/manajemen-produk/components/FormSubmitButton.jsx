export default function FormSubmitButton({ label }) {
    return (
      <button
        type="submit"
        className="btn btn-primary w-100 mb-3"
        style={{
          fontWeight: '700',
          letterSpacing: '1.1px',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => (e.target.style.transform = 'scale(1.01)')}
        onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
      >
        {label}
      </button>
    )
  }
  