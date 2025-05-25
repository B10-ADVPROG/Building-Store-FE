import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    fullname: '',
    password: '',
    role: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await fetch('https://slim-blythe-williamalxndr-aab64bd4.koyeb.app/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text();

      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        data = null;
      }

      if (!response.ok) {
        const message = data?.errors?.join(', ') || data?.message || 'Registration failed';
        setErrorMsg(message);
        return;
      }

      setSuccessMsg('Registration successful! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/auth/login';
      }, 500);
    } catch (error) {
      setErrorMsg(error.message || 'An unexpected error occurred');
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

        {errorMsg && (
          <div className="alert alert-danger" role="alert" style={{ marginBottom: '1rem' }}>
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="alert alert-success" role="alert" style={{ marginBottom: '1rem' }}>
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* ... input fields seperti sebelumnya ... */}

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
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: '#555', fontWeight: '600' }}>
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              className="form-control"
              placeholder="Enter your full name"
              required
              value={formData.fullname}
              onChange={handleChange}
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
            />
          </div>

          <div className="mb-4">
            <label className="form-label" style={{ color: '#555', fontWeight: '600' }}>
              Role
            </label>
            <select
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
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
              <option value="administrator">Admin</option>
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
