import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentCard from '../components/PaymentCard.jsx';
import CreatePaymentModal from '../components/CreatePaymentModal.jsx';
import EditPaymentModal from '../components/EditPaymentModal.jsx';
import PaymentApi from '../api/paymentApi.js';
import { FaPlus, FaMoneyBillWave } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Dummy data for payments
const DUMMY_PAYMENTS = [
  { 
    paymentId: '550e8400-e29b-41d4-a716-446655440001', 
    customerId: 'C12345',
    amount: 500000,
    paymentMethod: 'CASH',
    status: 'LUNAS',
    transactionId: 'T-001',
    createdAt: '2025-05-20T10:30:00',
    updatedAt: '2025-05-20T10:30:00'
  },
  { 
    paymentId: '550e8400-e29b-41d4-a716-446655440002', 
    customerId: 'C12346',
    amount: 1200000,
    paymentMethod: 'BANK_TRANSFER',
    status: 'CICILAN',
    transactionId: 'T-002',
    createdAt: '2025-05-21T14:45:00',
    updatedAt: '2025-05-21T14:45:00'
  },
  { 
    paymentId: '550e8400-e29b-41d4-a716-446655440003', 
    customerId: 'C12347',
    amount: 750000,
    paymentMethod: 'CREDIT_CARD',
    status: 'LUNAS',
    transactionId: 'T-003',
    createdAt: '2025-05-22T09:15:00',
    updatedAt: '2025-05-22T09:15:00'
  }
];

export default function PaymentList() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingDummyData, setUsingDummyData] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPaymentId, setEditPaymentId] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token") || "";

        try {
          let body = JSON.stringify({ "token": token });
          const authResponse = await fetch("http://localhost:8080/auth/auth-cashier/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: body,
          });

          if (!authResponse.ok) throw new Error("Unauthorized");

          const data = await PaymentApi.getAllPayments();
          setPayments(data);
          setUsingDummyData(false);
        } catch (err) {
          if (err.message === "Unauthorized" || err.message === "Forbidden") {
            navigate("/unauthorized");
          } else {
            console.error('Error:', err.message);
            setError(`${err.message} - Using dummy data instead`);
            setPayments(DUMMY_PAYMENTS);
            setUsingDummyData(true);
          }
        }
      } catch (err) {
        console.error('Error:', err.message);
        setError(`${err.message} - Using dummy data instead`);
        setPayments(DUMMY_PAYMENTS);
        setUsingDummyData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this payment?')) return;
    setDeletingId(id);
    try {
      await PaymentApi.deletePayment(id);
      setPayments(payments.filter(payment => payment.paymentId !== id));
      if (usingDummyData) setError('Payment deleted (dummy data)');
      else setError(null);
    } catch (err) {
      console.error('Error deleting payment:', err);
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handlePaymentCreated = (newPayment) => {
    setPayments(prev => [...prev, newPayment]);
  };

  const openEditModal = (paymentId) => {
    setEditPaymentId(paymentId);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditPaymentId(null);
  };

  const handlePaymentUpdated = (updatedPayment) => {
    setPayments(payments.map(p => p.paymentId === updatedPayment.paymentId ? updatedPayment : p));
    closeEditModal();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="container-fluid py-4">
      {usingDummyData && (
        <div className="alert alert-warning">
          <FaMoneyBillWave className="me-2" />
          <span>Warning: Using sample payment data because server couldn't be reached</span>
        </div>
      )}
      
      {error && !usingDummyData && (
        <div className="alert alert-danger">{error}</div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 text-primary">Payment Records</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary"
        >
          <FaPlus className="me-2" />
          Add New Payment
        </motion.button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="mt-2">Loading payment records...</div>
        </div>
      ) : payments.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-white fs-5">No payments found. Add your first payment!</p>
        </div>
      ) : (
        <motion.div 
          className="row g-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {payments.map(payment => (
            <div key={payment.paymentId} className="col-md-6 col-lg-4 col-xl-3">
              <PaymentCard 
                payment={payment}
                onDelete={handleDelete}
                isDeleting={deletingId === payment.paymentId}
                onEdit={() => openEditModal(payment.paymentId)}
              />
            </div>
          ))}
        </motion.div>
      )}

      {showCreateModal && (
        <CreatePaymentModal 
          onClose={() => setShowCreateModal(false)} 
          onPaymentCreated={handlePaymentCreated}
        />
      )}

      {showEditModal && (
        <EditPaymentModal
          isOpen={showEditModal}
          onClose={closeEditModal}
          paymentId={editPaymentId}
          onSuccess={handlePaymentUpdated} 
        />
      )}
    </div>
  );
}