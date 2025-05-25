import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('is_authenticated') === 'true';
    if (!isAuth) {
      navigate('/landing');
    }
  }, [navigate]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-light">Building Store</h1>
        <p className="lead text-secondary" style={{ marginBottom: '0.1rem' }}>
        Sistem Point of Sale (POS) modern untuk toko bangunan Anda.
        </p>
        <p className="lead text-secondary" style={{ marginBottom: '0.2rem' }}>
        Memudahkan pengelolaan inventaris, penjualan, dan pembayaran secara cepat dan akurat.
        </p>
        <p className="lead text-secondary" style={{ marginBottom: '0' }}>
        Tingkatkan efisiensi operasional dan layanan pelanggan dengan teknologi terintegrasi kami.
        </p>

      </div>

      <div className="mb-3 text-center">
        <h4 className="fw-bold text-light">What You Can Do</h4>
        <p className="text-secondary">
          Kelola operasional toko Anda secara efisien melalui fitur-fitur berikut:
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <button onClick={() => handleNavigate('/produk')} className="btn btn-dark w-100 py-4 fs-5 shadow-sm">
            🧱 Manajemen Produk
          </button>
        </div>
        <div className="col-md-4">
          <button onClick={() => handleNavigate('/pelanggan')} className="btn btn-dark w-100 py-4 fs-5 shadow-sm">
            👤 Manajemen Pelanggan
          </button>
        </div>
        <div className="col-md-4">
          <button onClick={() => handleNavigate('/supplier')} className="btn btn-dark w-100 py-4 fs-5 shadow-sm">
            🚚 Manajemen Supplier
          </button>
        </div>
        <div className="col-md-4">
          <button onClick={() => handleNavigate('/pembayaran')} className="btn btn-dark w-100 py-4 fs-5 shadow-sm">
            💳 Manajemen Pembayaran
          </button>
        </div>
        <div className="col-md-4">
          <button onClick={() => handleNavigate('/transaksi')} className="btn btn-dark w-100 py-4 fs-5 shadow-sm">
            🧾 Transaksi Penjualan
          </button>
        </div>
        <div className="col-md-4">
          <button onClick={() => handleNavigate('/laporan')} className="btn btn-dark w-100 py-4 fs-5 shadow-sm">
            📊 Laporan Penjualan & Stok
          </button>
        </div>
      </div>
    </div>
  );
}
