import { Routes, Route } from 'react-router-dom'
import CreateProduct from './pages/CreateProduct.jsx'
import EditProduct from './pages/EditProduct.jsx'

export default function ManajemenProdukRoutes() {
  return (
    <Routes>
      <Route path="create/" element={<CreateProduct />} />
      <Route path="edit/:id" element={<EditProduct />} />
    </Routes>
  )
}
