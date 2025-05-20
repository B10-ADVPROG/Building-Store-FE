import { Routes, Route } from 'react-router-dom'
import CreateProduct from './pages/CreateProduct.jsx'

export default function ManajemenProdukRoutes() {
  return (
    <Routes>
      <Route path="create/" element={<CreateProduct />} />
    </Routes>
  )
}
