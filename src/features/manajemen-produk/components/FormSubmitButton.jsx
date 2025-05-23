export default function FormSubmitButton({ label, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      style={{
        padding: '0.5rem 1.5rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '1rem',
        height: '38px',
      }}
    >
      {label}
    </button>
  );
}
