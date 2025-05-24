import { Routes, Route } from 'react-router-dom'
import CreateSupplier from './pages/CreateSupplier.jsx'
import EditSupplier from './pages/EditSupplier.jsx'
import SupplierList from './pages/SupplierList.jsx'
import SupplierDetail from './pages/SupplierDetail.jsx'

export default function ManajemenSupplierRoutes() {
  return (
    <Routes>
      <Route path="create/" element={<CreateSupplier />} />
      <Route path="edit/:id" element={<EditSupplier />} />
      <Route path="/" element={<SupplierList />} />
      <Route path='detail/:id' element={<SupplierDetail />} />
    </Routes>
  )
}