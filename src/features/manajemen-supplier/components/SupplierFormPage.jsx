import FormCard from '../../manajemen-produk/components/FormCard.jsx';
import SupplierForm from './SupplierForm.jsx';

export default function SupplierFormPage({ 
  mode = 'create', 
  initialData = {}, 
  onClose = null,
  onCreated = null,
  isModal = false 
}) {
  const content = (
    <FormCard title={mode === 'create' ? 'Add New Supplier' : 'Edit Supplier'}>
      <SupplierForm 
        mode={mode} 
        initialData={initialData} 
        onClose={onClose}
        onCreated={onCreated}
      />
    </FormCard>
  );

  if (isModal) {
    return (
      <div style={{ padding: '1rem' }}>
        {content}
      </div>
    );
  }

  // full page view
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
      {content}
    </div>
  );
}