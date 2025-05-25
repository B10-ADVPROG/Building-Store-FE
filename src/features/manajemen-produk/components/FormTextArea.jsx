export default function FormTextArea({ label, name, value, onChange }) {
    return (
      <div className="mb-4">
        <label className="form-label" style={{ color: '#555', fontWeight: '600' }}>
          {label}
        </label>
        <textarea
          name={name}
          className="form-control"
          value={value}
          onChange={onChange}
          placeholder="Describe your product..."
          rows={3}
          style={{
            backgroundColor: 'rgba(240,240,240,0.7)',
            border: 'none',
            color: '#333',
            resize: 'none',
          }}
          onFocus={(e) => (e.target.style.backgroundColor = 'rgba(255,255,255,0.9)')}
          onBlur={(e) => (e.target.style.backgroundColor = 'rgba(240,240,240,0.7)')}
        />
      </div>
    )
  }
  