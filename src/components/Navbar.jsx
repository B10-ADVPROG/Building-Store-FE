import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaBox, FaUsers, FaMoneyCheckAlt, FaTruck, FaCashRegister, FaSignOutAlt } from 'react-icons/fa';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.setItem('is_authenticated', 'false');
      navigate('/landing');
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred during logout.');
    }
  };
  
  const linkStyle = {
    color: 'white',
    borderRight: '1px solid rgba(255, 255, 255, 0.15)', // border pemisah agak lebih terang
    paddingRight: '1rem',
    paddingLeft: '1rem',
  };

  const lastLinkStyle = {
    color: 'white',
    paddingLeft: '1rem',
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm px-4"
      style={{
        height: '64px',
        backgroundColor: '#2c3a67', // lebih terang dari #1e263b Home bg
        borderBottom: '1px solid rgba(255, 255, 255, 0.25)', // border bawah tipis & semi transparan putih
      }}
    >
      <div className="container-fluid justify-content-between align-items-center">
        <div className="d-flex mx-auto" style={{ gap: '0' }}>
          <Link to="/" className="nav-link d-flex flex-column align-items-center" style={linkStyle}>
            <FaHome size={20} />
            <span style={{ fontSize: '0.8rem' }}>Home</span>
          </Link>
          <Link to="/produk" className="nav-link d-flex flex-column align-items-center" style={linkStyle}>
            <FaBox size={20} />
            <span style={{ fontSize: '0.8rem' }}>Produk</span>
          </Link>
          <Link to="/pelanggan" className="nav-link d-flex flex-column align-items-center" style={linkStyle}>
            <FaUsers size={20} />
            <span style={{ fontSize: '0.8rem' }}>Pelanggan</span>
          </Link>
          <Link to="/pembayaran" className="nav-link d-flex flex-column align-items-center" style={linkStyle}>
            <FaMoneyCheckAlt size={20} />
            <span style={{ fontSize: '0.8rem' }}>Pembayaran</span>
          </Link>
          <Link to="/supplier" className="nav-link d-flex flex-column align-items-center" style={linkStyle}>
            <FaTruck size={20} />
            <span style={{ fontSize: '0.8rem' }}>Supplier</span>
          </Link>
          <Link to="/transaksi" className="nav-link d-flex flex-column align-items-center" style={lastLinkStyle}>
            <FaCashRegister size={20} />
            <span style={{ fontSize: '0.8rem' }}>Transaksi</span>
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="btn btn-outline-danger d-flex align-items-center gap-2"
          style={{ whiteSpace: 'nowrap' }}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </nav>
  );
}
