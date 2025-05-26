const API_URL = 'http://localhost:8080';

class PaymentApi {
  static async getAllPayments() {
    const token = localStorage.getItem("token") || "";
    const response = await fetch(`${API_URL}/payment/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch payments');
    }

    return await response.json();
  }

  static async getPaymentById(id) {
    const token = localStorage.getItem("token") || "";
    const response = await fetch(`${API_URL}/payment/detail/${id}/`, {
      headers: {
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch payment details');
    }

    return await response.json();
  }

  static async createPayment(paymentData) {
    const token = localStorage.getItem("token") || "";
    const response = await fetch(`${API_URL}/payment/create/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment');
    }

    return await response.json();
  }

  static async updatePaymentStatus(id, status) {
    const token = localStorage.getItem("token") || "";
    const response = await fetch(`${API_URL}/payment/edit/${id}/`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update payment');
    }

    return await response.json();
  }

  static async deletePayment(id) {
    const token = localStorage.getItem("token") || "";
    const response = await fetch(`${API_URL}/payment/delete/${id}/`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete payment');
    }

    return await response.json();
  }

  static async getPaymentsByCustomer(customerId) {
    const token = localStorage.getItem("token") || "";
    const response = await fetch(`${API_URL}/payment/customer/${customerId}/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch customer payments');
    }

    return await response.json();
  }
}

export default PaymentApi;