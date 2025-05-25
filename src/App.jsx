import { Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import ManajemenProdukRoutes from './features/manajemen-produk/ManajemenProdukRoutes.jsx';
import ManajemenPelangganRoutes from './features/manajemen-pelanggan/ManajemenPelangganRoutes.jsx';
import ManajemenPembayaranRoutes from './features/manajemen-pembayaran/ManajemenPembayaranRoutes.jsx';
import ManajemenSupplierRoutes from './features/manajemen-supplier/ManajemenSupplierRoutes.jsx';
import TransaksiPenjualanRoutes from './features/transaksi-penjualan/TransaksiPenjualanRoutes.jsx';
import LandingPage from './LandingPage.jsx';
import AuthRoutes from './features/auth/AuthRoutes.jsx';
import Home from './Home.jsx';
import Unauthorized from './Unauthorized';

export default function App() {
  return (
    <Routes>
      <Route path="landing" element={<LandingPage />} />
      <Route path="auth/*" element={<AuthRoutes />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path='unauthorized/' element={<Unauthorized />} />
        <Route path="produk/*" element={<ManajemenProdukRoutes />} />
        <Route path="pelanggan/*" element={<ManajemenPelangganRoutes />} />
        <Route path="pembayaran/*" element={<ManajemenPembayaranRoutes />} />
        <Route path="supplier/*" element={<ManajemenSupplierRoutes />} />
        <Route path="transaksi/*" element={<TransaksiPenjualanRoutes />} />
      </Route>
    </Routes>
  );
}
