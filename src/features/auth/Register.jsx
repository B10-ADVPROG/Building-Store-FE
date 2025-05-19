export default function Register() {
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
            minHeight: '520px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: '15px',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            overflowY: 'auto',
          }}
        >
          <h2 className="mb-4 text-center" style={{ fontWeight: '700', color: '#333' }}>
            Create Account
          </h2>
          <form style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div className="mb-3">
              <label className="form-label" style={{ color: '#555', fontWeight: '600' }}>
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
  
            <div className="mb-3">
              <label className="form-label" style={{ color: '#555', fontWeight: '600' }}>
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
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
  
            <div className="mb-3">
              <label className="form-label" style={{ color: '#555', fontWeight: '600' }}>
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
  
            <div className="mb-4">
              <label className="form-label" style={{ color: '#555', fontWeight: '600' }}>
                Role
              </label>
              <select
                className="form-select"
                defaultValue=""
                required
                style={{
                  backgroundColor: 'rgba(240,240,240,0.7)',
                  border: 'none',
                  color: '#333',
                }}
                onFocus={e => (e.target.style.backgroundColor = 'rgba(255,255,255,0.9)')}
                onBlur={e => (e.target.style.backgroundColor = 'rgba(240,240,240,0.7)')}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="kasir">Kasir</option>
                <option value="admin">Admin</option>
              </select>
            </div>
  
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{
                fontWeight: '700',
                letterSpacing: '1.1px',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={e => (e.target.style.transform = 'scale(1.01)')}
              onMouseLeave={e => (e.target.style.transform = 'scale(1)')}
            >
              Register
            </button>
          </form>
  
          {/* Link Login */}
          <div className="text-center mt-3" style={{ color: '#555' }}>
            Already have an account?{' '}
            <a href="/auth/login" style={{ fontWeight: '600', textDecoration: 'none' }}>
              Login
            </a>
          </div>
        </div>
      </div>
    );
  }
  