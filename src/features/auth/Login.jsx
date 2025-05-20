export default function Login() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: '100vh',
        backgroundColor: '#f5f7fa',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: '1rem',
      }}
    >
      <div
        className="p-5 d-flex flex-column justify-content-between"
        style={{
          maxWidth: '420px',
          width: '100%',
          height: '480px', 
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderRadius: '15px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <h2 className="mb-4 text-center" style={{ fontWeight: '700', color: '#333' }}>
          Welcome Back
        </h2>
        <form style={{ flexGrow: 1 }}>
          <div className="mb-3">
            <label
              className="form-label"
              style={{ color: '#555', fontWeight: '600' }}
            >
              Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              required
              style={{
                backgroundColor: 'rgba(240,240,240,0.7)',
                border: 'none',
                color: '#333',
              }}
              onFocus={e => (e.target.style.backgroundColor = 'rgba(255,255,255,0.9)')}
              onBlur={e => (e.target.style.backgroundColor = 'rgba(240,240,240,0.7)')}
            />
          </div>
          <div className="mb-4">
            <label
              className="form-label"
              style={{ color: '#555', fontWeight: '600' }}
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              required
              style={{
                backgroundColor: 'rgba(240,240,240,0.7)',
                border: 'none',
                color: '#333',
              }}
              onFocus={e => (e.target.style.backgroundColor = 'rgba(255,255,255,0.9)')}
              onBlur={e => (e.target.style.backgroundColor = 'rgba(240,240,240,0.7)')}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            style={{
              fontWeight: '700',
              letterSpacing: '1.1px',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => (e.target.style.transform = 'scale(1.01)')}
            onMouseLeave={e => (e.target.style.transform = 'scale(1)')}
          >
            Login
          </button>
        </form>

        {/* Link Register */}
        <div className="text-center" style={{ color: '#555' }}>
          Don't have an account?{' '}
          <a href="/auth/register" style={{ fontWeight: '600', textDecoration: 'none' }}>
            Register
          </a>
        </div>

      </div>
    </div>
  )
}
