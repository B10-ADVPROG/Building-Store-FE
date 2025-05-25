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

  return (
    <div>
      <h1>Welcome to Home Page</h1>
      {/* Konten home lainnya */}
    </div>
  );
}
