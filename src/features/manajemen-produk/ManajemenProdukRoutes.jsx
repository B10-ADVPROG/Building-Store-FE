import { Routes, Route } from 'react-router-dom'
import ProductList from './pages/ProductList.jsx'
import ProductDetail from './pages/ProductDetail.jsx'

export default function ManajemenProdukRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path='detail/:id' element={<ProductDetail />} />
    </Routes>
  )
}
