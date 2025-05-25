import { FaSave, FaEdit } from 'react-icons/fa';

export default function FormSubmitButton({ label, disabled }) {
  const isCreate = label.toLowerCase().includes('save');
  const Icon = isCreate ? FaSave : FaEdit;

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
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <Icon />
      {label}
    </button>
  );
}
