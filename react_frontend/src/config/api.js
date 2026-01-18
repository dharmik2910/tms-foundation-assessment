const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const apiClient = {
    baseURL: API_BASE_URL,

    async get(endpoint) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        return response.json();
    },

    async post(endpoint, data) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },
};