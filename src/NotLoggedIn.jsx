import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('is_authenticated') === 'true';

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    } else {
      const timer = setTimeout(() => {
        navigate('/auth/login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center flex-col text-center px-4">
      <h1 className="text-2xl font-bold mb-4">You are not logged in</h1>
      <p className="text-lg">Redirecting to login page...</p>
    </div>
  );
}
