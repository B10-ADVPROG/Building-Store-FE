const API_BASE_URL = 'http://localhost:8080/api/suppliers';

class SupplierApi {
    static async getAllSuppliers() {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Failed to fetch suppliers');
        return response.json();
    }

    static async getSupplierById(id) {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch supplier');
        return response.json();
    }

    static async createSupplier(supplierData) {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(supplierData)
        });
        if (!response.ok) throw new Error('Failed to create supplier');
        return response.json();
    }

    static async updateSupplier(id, supplierData) {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(supplierData)
        });
        if (!response.ok) throw new Error('Failed to update supplier');
        return response.json();
    }

    static async deleteSupplier(id) {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete supplier');
        return true;
    }
}

export default SupplierApi;