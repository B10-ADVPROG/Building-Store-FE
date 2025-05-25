export default function FormInput({ label, name, value, onChange, type = 'text', required = false }) {
    return (
      <div className="mb-3">
        <label className="form-label" style={{ color: '#555', fontWeight: '600' }}>
          {label}
        </label>
        <input
          type={type}
          name={name}
          className="form-control"
          value={value}
          onChange={onChange}
          required={required}
          style={{
            backgroundColor: 'rgba(240,240,240,0.7)',
            border: 'none',
            color: '#333',
          }}
          onFocus={(e) => (e.target.style.backgroundColor = 'rgba(255,255,255,0.9)')}
          onBlur={(e) => (e.target.style.backgroundColor = 'rgba(240,240,240,0.7)')}
        />
      </div>
    )
  }
  