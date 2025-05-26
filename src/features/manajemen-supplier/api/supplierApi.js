const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://slim-blythe-williamalxndr-aab64bd4.koyeb.app'
    : 'http://localhost:8080';

class SupplierApi {
    static getAuthHeaders() {
        // Get authentication token - check common storage locations
        const token = localStorage.getItem('token') || 
                     localStorage.getItem('authToken') || 
                     sessionStorage.getItem('token');
        
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // Only add Authorization header if token exists
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        };
    }

    static async getAllSuppliers() {
        try {
            // Change this line to use the correct endpoint
            const endpoint = '/api/suppliers';
                
            console.log('Fetching suppliers from:', API_BASE_URL + endpoint);
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
                    console.error('Authentication error: Admin privileges required');
                    throw new Error('Administrator privileges required to access suppliers');
                }
                
                throw new Error(`Failed to fetch suppliers: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Successfully fetched suppliers');
            return data;
        } catch (error) {
            console.error('Error in getAllSuppliers:', error);
            throw error;
        }
    }

    static async getSupplierById(id) {
        try {
            const endpoint = `/api/suppliers/${id}`;
                
            const response = await fetch(API_BASE_URL + endpoint, {
                method: 'GET',
                headers: this.getAuthHeaders(),
                credentials: 'include'
            });
            
            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Administrator privileges required');
                }
                throw new Error(`Failed to fetch supplier: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching supplier by ID:', error);
            throw error;
        }
    }

    static async createSupplier(supplierData) {
        try {
            const endpoint = '/api/suppliers';
                
            const response = await fetch(API_BASE_URL + endpoint, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(supplierData),
                credentials: 'include'
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                if (response.status === 403) {
                    throw new Error('Administrator privileges required to create suppliers');
                }
                throw new Error(`Failed to create supplier: ${response.status} ${errorText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error creating supplier:', error);
            throw error;
        }
    }

    static async updateSupplier(id, supplierData) {
        try {
            const endpoint = `/api/suppliers/${id}`;
                
            const response = await fetch(API_BASE_URL + endpoint, {
                method: 'PUT',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(supplierData),
                credentials: 'include'
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                if (response.status === 403) {
                    throw new Error('Administrator privileges required to update suppliers');
                }
                throw new Error(`Failed to update supplier: ${response.status} ${errorText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error updating supplier:', error);
            throw error;
        }
    }

    static async deleteSupplier(id) {
        try {
            const endpoint = `/api/suppliers/${id}`;
                
            const response = await fetch(API_BASE_URL + endpoint, {
                method: 'DELETE',
                headers: this.getAuthHeaders(),
                credentials: 'include'
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                if (response.status === 403) {
                    throw new Error('Administrator privileges required to delete suppliers');
                }
                throw new Error(`Failed to delete supplier: ${response.status} ${errorText}`);
            }
            
            return true;
        } catch (error) {
            console.error('Error deleting supplier:', error);
            throw error;
        }
    }
}

export default SupplierApi;