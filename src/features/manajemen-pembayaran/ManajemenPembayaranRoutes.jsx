import { Routes, Route } from 'react-router-dom'
import PaymentList from './pages/PaymentList'
import PaymentDetail from './pages/PaymentDetail'
import CreatePayment from './pages/CreatePayment'
import EditPayment from './pages/EditPayment'

export default function ManajemenPembayaranRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PaymentList />} />
      <Route path="/detail/:id" element={<PaymentDetail />} />
      <Route path="/create" element={<CreatePayment />} />
      <Route path="/edit/:id" element={<EditPayment />} />
    </Routes>
  )
}
