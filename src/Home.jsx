import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <h2>Selamat datang</h2>
      <p>Silakan pilih:</p>
      <button onClick={() => navigate('/auth/login')}>Login</button>
      <button onClick={() => navigate('/auth/register')}>Register</button>
    </div>
  )
}
