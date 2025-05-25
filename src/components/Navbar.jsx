import { Link, useNavigate } from 'react-router-dom';
import { FaBox, FaUsers, FaMoneyCheckAlt, FaTruck, FaCashRegister, FaSignOutAlt } from 'react-icons/fa';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch('/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.setItem('is_authenticated', 'false');
        navigate('/landing');
      } else {
        console.error('Logout gagal:', response.status);
        alert('Gagal logout. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error saat logout:', error);
      alert('Terjadi kesalahan saat logout.');
    }
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4" style={{ height: '64px' }}>
      <div className="container-fluid justify-content-between align-items-center">
        <div className="d-flex gap-4 mx-auto">
          <Link to="/produk" className="nav-link d-flex flex-column align-items-center text-dark">
            <FaBox size={20} />
            <span style={{ fontSize: '0.8rem' }}>Produk</span>
          </Link>
          <Link to="/pelanggan" className="nav-link d-flex flex-column align-items-center text-dark">
            <FaUsers size={20} />
            <span style={{ fontSize: '0.8rem' }}>Pelanggan</span>
          </Link>
          <Link to="/pembayaran" className="nav-link d-flex flex-column align-items-center text-dark">
            <FaMoneyCheckAlt size={20} />
            <span style={{ fontSize: '0.8rem' }}>Pembayaran</span>
          </Link>
          <Link to="/supplier" className="nav-link d-flex flex-column align-items-center text-dark">
            <FaTruck size={20} />
            <span style={{ fontSize: '0.8rem' }}>Supplier</span>
          </Link>
          <Link to="/transaksi" className="nav-link d-flex flex-column align-items-center text-dark">
            <FaCashRegister size={20} />
            <span style={{ fontSize: '0.8rem' }}>Transaksi</span>
          </Link>
        </div>

        <button onClick={handleLogout} className="btn btn-outline-danger d-flex align-items-center gap-2">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </nav>
  );
}
