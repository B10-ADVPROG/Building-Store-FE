import { Routes, Route } from 'react-router-dom'
import Login from './Login.jsx'
import Register from './Register.jsx'

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="login/" element={<Login />} />
      <Route path="register/" element={<Register />} />
    </Routes>
  )
}
