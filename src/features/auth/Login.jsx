import { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null); // error sebagai string/null
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('https://slim-blythe-williamalxndr-aab64bd4.koyeb.app/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text();

      if (!response.ok) {
        try {
          const errorData = JSON.parse(responseText);

          if (errorData.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
            setError(errorData.errors[0]); // Ambil string error dari array
          } else if (errorData.error && Array.isArray(errorData.error) && errorData.error.length > 0) {
            setError(errorData.error[0]); // Alternatif jika response pakai "error"
          } else if (errorData.message) {
            setError(errorData.message); // Jika ada field message
          } else {
            setError('Login failed');
          }
        } catch {
          setError(responseText || 'Login failed');
        }
        setLoading(false);
        return; // Stop eksekusi lanjut jika error
      }

      const data = JSON.parse(responseText);

      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/'; // Redirect ke home
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

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

        {/* Render error sebagai string langsung */}
        {error && (
          <div className="alert alert-danger" role="alert" style={{ marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ flexGrow: 1 }}>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#555', fontWeight: '600' }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
              style={{
                backgroundColor: 'rgba(240,240,240,0.7)',
                border: 'none',
                color: '#333',
              }}
              onFocus={e => (e.target.style.backgroundColor = 'rgba(255,255,255,0.9)')}
              onBlur={e => (e.target.style.backgroundColor = 'rgba(240,240,240,0.7)')}
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label className="form-label" style={{ color: '#555', fontWeight: '600' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
              style={{
                backgroundColor: 'rgba(240,240,240,0.7)',
                border: 'none',
                color: '#333',
              }}
              onFocus={e => (e.target.style.backgroundColor = 'rgba(255,255,255,0.9)')}
              onBlur={e => (e.target.style.backgroundColor = 'rgba(240,240,240,0.7)')}
              disabled={loading}
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
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center" style={{ color: '#555' }}>
          Don't have an account?{' '}
          <a href="/auth/register" style={{ fontWeight: '600', textDecoration: 'none' }}>
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
