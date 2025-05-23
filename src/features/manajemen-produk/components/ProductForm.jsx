import { useState, useEffect } from 'react'
import FormInput from './FormInput.jsx'
import FormTextArea from './FormTextArea.jsx'
import FormSubmitButton from './FormSubmitButton.jsx'
import ConfirmationModal from './ConfirmationModal.jsx'

export default function ProductForm({ mode, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
  })

  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [loadingInitial, setLoadingInitial] = useState(false)

  // Fetch initial product data if mode edit
  useEffect(() => {
    async function fetchInitialData() {
      if (mode === 'edit' && initialData.id) {
        setLoadingInitial(true)
        setError(null)
        try {
          const res = await fetch(`http://127.0.0.1:8080/product/detail/${initialData.id}`)
          if (!res.ok) throw new Error('Failed to load product detail')
          const data = await res.json()
          // Assume API returns product object { name, price, stock, description }
          setFormData({
            name: data.name || '',
            price: data.price || '',
            stock: data.stock || '',
            description: data.description || '',
          })
        } catch (err) {
          setError(err.message)
        } finally {
          setLoadingInitial(false)
        }
      } else if (mode === 'create') {
        // Reset form for create mode
        setFormData({
          name: '',
          price: '',
          stock: '',
          description: '',
        })
      }
    }
    fetchInitialData()
  }, [mode, initialData.id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowModal(true)
  }

  const handleConfirm = async () => {
    setShowModal(false)
    setLoading(true)
    setError(null)

    try {
      const url =
        mode === 'create'
          ? 'http://127.0.0.1:8080/product/create/'
          : `http://127.0.0.1:8080/product/edit/${initialData.id}`

      const method = mode === 'create' ? 'POST' : 'PUT'

      const dataToSend = mode === 'create' ? formData : { id: initialData.id, ...formData }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`)
      }

      const result = await response.json()
      if (result.ok) {
        alert(mode === 'create' ? 'Product created successfully!' : 'Product updated successfully!')
        window.location.href = '/produk'
      }
    } catch (err) {
      console.error('Failed:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loadingInitial) return <div>Loading product data...</div>

  return (
    <>
      <form onSubmit={handleSubmit} style={{ flexGrow: 1 }}>
        <FormInput label="Product Name" name="name" value={formData.name} onChange={handleChange} required />
        <FormInput label="Price" name="price" type="number" value={formData.price} onChange={handleChange} required />
        <FormInput label="Stock" name="stock" type="number" value={formData.stock} onChange={handleChange} />
        <FormTextArea label="Description" name="description" value={formData.description} onChange={handleChange} />
        <FormSubmitButton label={mode === 'create' ? 'Save Product' : 'Update Product'} disabled={loading} />
      </form>

      {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}

      <ConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        message={mode === 'create' ? 'Are you sure you want to create this product?' : 'Confirm product update?'}
      />
    </>
  )
}
