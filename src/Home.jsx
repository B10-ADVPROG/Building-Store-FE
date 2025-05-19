import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div>
        <h1>Building Store</h1>
        <button onClick={() => navigate('/auth/login')}>Login</button>
        <button onClick={() => navigate('/auth/register')}>Register</button>
    </div>
  )
}
