import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: '100vh',
        backgroundColor: '#eef2f7',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: '1rem',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          marginBottom: '3rem',
          fontWeight: '700',
          color: '#2c3e50',
          fontSize: '3rem',
          letterSpacing: '1.5px',
        }}
      >
        Building Store
      </h1>

      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
          width: '100%',
          maxWidth: '320px',
          justifyContent: 'center',
          marginTop: '2rem'
        }}
      >
        <button
          onClick={() => navigate('/auth/login')}
          className="btn btn-primary"
          style={{
            flex: 1,
            padding: '0.75rem 0',
            fontWeight: '600',
            fontSize: '1.1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => (e.target.style.backgroundColor = '#1a73e8')}
          onMouseLeave={e => (e.target.style.backgroundColor = '')}
        >
          Login
        </button>

        <button
          onClick={() => navigate('/auth/register')}
          className="btn btn-outline-primary"
          style={{
            flex: 1,
            padding: '0.75rem 0',
            fontWeight: '600',
            fontSize: '1.1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            borderWidth: '2px',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={e => {
            e.target.style.backgroundColor = '#1a73e8'
            e.target.style.color = 'white'
          }}
          onMouseLeave={e => {
            e.target.style.backgroundColor = ''
            e.target.style.color = ''
          }}
        >
          Register
        </button>
      </div>
    </div>
  )
}
