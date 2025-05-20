import FormCard from './FormCard.jsx'
import ProductForm from './ProductForm.jsx'

export default function ProductFormPage({ mode = 'create', initialData = {} }) {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: '100vh',
        backgroundColor: '#f5f7fa',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: '1rem',
      }}
    >
      <FormCard title={mode === 'create' ? 'Add New Product' : 'Edit Product'}>
        <ProductForm mode={mode} initialData={initialData} />
      </FormCard>
    </div>
  )
}
