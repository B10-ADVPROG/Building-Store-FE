import { Routes, Route } from 'react-router-dom'
import CreateProduct from './pages/CreateProduct.jsx'
import EditProduct from './pages/EditProduct.jsx'
import ProductList from './pages/ProductList.jsx'

export default function ManajemenProdukRoutes() {
  return (
    <Routes>
      <Route path="create/" element={<CreateProduct />} />
      <Route path="edit/:id" element={<EditProduct />} />
      <Route path="/" element={<ProductList />} />
    </Routes>
  )
}
