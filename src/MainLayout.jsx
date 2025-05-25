import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#1e263b',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />
      <main className="container mt-4 flex-grow-1">
        <Outlet />
      </main>
    </div>
  );
}
