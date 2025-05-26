const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://slim-blythe-williamalxndr-aab64bd4.koyeb.app'
    : 'http://localhost:8080';

class PaymentApi {
    static getAuthHeaders() {
        const token = localStorage.getItem('token') || 
                     localStorage.getItem('authToken') || 
                     sessionStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        };
    }

    static async getAllPayments() {
        try {
            const endpoint = '/api/payments';
            console.log('Fetching payments from:', API_BASE_URL + endpoint);
            const response = await fetch(API_BASE_URL + endpoint, {
                method: 'GET',
                headers: this.getAuthHeaders(),
                credentials: 'include'
            });
            console.log('Response status:', response.status);
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                if (response.status === 403) {
                    throw new Error('Cashier privileges required to access payments');
                }
                throw new Error(`Failed to fetch payments: ${response.status}`);
            }
            const data = await response.json();
            console.log('Successfully fetched payments');
            return data;
        } catch (error) {
            console.error('Error in getAllPayments:', error);
            throw error;
        }
    }

    static async getPaymentById(id) {
        try {
            const endpoint = `/api/payments/${id}`;
            const response = await fetch(API_BASE_URL + endpoint, {
                method: 'GET',
                headers: this.getAuthHeaders(),
                credentials: 'include'
            });
            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Cashier privileges required');
                }
                throw new Error(`Failed to fetch payment: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching payment by ID:', error);
            throw error;
        }
    }

    static async createPayment(paymentData) {
        try {
            const endpoint = '/api/payments';
            const response = await fetch(API_BASE_URL + endpoint, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(paymentData),
                credentials: 'include'
            });
            if (!response.ok) {
                const errorText = await response.text();
                if (response.status === 403) {
                    throw new Error('Cashier privileges required to create payments');
                }
                throw new Error(`Failed to create payment: ${response.status} ${errorText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating payment:', error);
            throw error;
        }
    }

    static async updatePaymentStatus(id, status) {
        try {
            const endpoint = `/api/payments/${id}`;
            const response = await fetch(API_BASE_URL + endpoint, {
                method: 'PUT',
                headers: this.getAuthHeaders(),
                body: JSON.stringify({ status }),
                credentials: 'include'
            });
            if (!response.ok) {
                const errorText = await response.text();
                if (response.status === 403) {
                    throw new Error('Cashier privileges required to update payments');
                }
                throw new Error(`Failed to update payment: ${response.status} ${errorText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating payment:', error);
            throw error;
        }
    }

    static async deletePayment(id) {
        try {
            const endpoint = `/api/payments/${id}`;
            const response = await fetch(API_BASE_URL + endpoint, {
                method: 'DELETE',
                headers: this.getAuthHeaders(),
                credentials: 'include'
            });
            if (!response.ok) {
                const errorText = await response.text();
                if (response.status === 403) {
                    throw new Error('Admin privileges required to delete payments');
                }
                throw new Error(`Failed to delete payment: ${response.status} ${errorText}`);
            }
            return true;
        } catch (error) {
            console.error('Error deleting payment:', error);
            throw error;
        }
    }

    static async getPaymentsByCustomer(customerName) {
        try {
            const endpoint = `/api/payments/customer/${customerName}`;
            const response = await fetch(API_BASE_URL + endpoint, {
                method: 'GET',
                headers: this.getAuthHeaders(),
                credentials: 'include'
            });
            if (!response.ok) {
                const errorText = await response.text();
                if (response.status === 403) {
                    throw new Error('Cashier privileges required');
                }
                throw new Error(`Failed to fetch customer payments: ${response.status} ${errorText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching customer payments:', error);
            throw error;
        }
    }
}

export default PaymentApi;