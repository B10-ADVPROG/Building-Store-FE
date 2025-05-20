import { useState } from 'react'
import FormInput from './FormInput.jsx'
import FormTextArea from './FormTextArea.jsx'
import FormSubmitButton from './FormSubmitButton.jsx'
import ConfirmationModal from './ConfirmationModal.jsx'

export default function ProductForm({ mode, initialData }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    price: initialData.price || '',
    stock: initialData.stock || '',
    description: initialData.description || '',
  })

  const [showModal, setShowModal] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowModal(true)
  }

  const handleConfirm = () => {
    setShowModal(false)
    if (mode === 'create') {
      console.log('Creating product:', formData)
    } else {
      console.log('Updating product:', formData)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{ flexGrow: 1 }}>
        <FormInput label="Product Name" name="name" value={formData.name} onChange={handleChange} required />
        <FormInput label="Price" name="price" type="number" value={formData.price} onChange={handleChange} required />
        <FormInput label="Stock" name="stock" type="number" value={formData.stock} onChange={handleChange}  />
        <FormTextArea label="Description" name="description" value={formData.description} onChange={handleChange} />
        <FormSubmitButton label={mode === 'create' ? 'Save Product' : 'Update Product'} />
      </form>

      <ConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        message={mode === 'create' ? 'Are you sure you want to create this product?' : 'Confirm product update?'}
      />
    </>
  )
}
