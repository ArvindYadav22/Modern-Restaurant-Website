import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    getProfile: () => api.get('/auth/profile'),
    updateProfile: (userData) => api.put('/auth/profile', userData)
};

export const menuAPI = {
    getAllItems: (params) => api.get('/menu', { params }),
    getItem: (id) => api.get(`/menu/${id}`),
    createItem: (itemData) => api.post('/menu', itemData),
    updateItem: (id, itemData) => api.put(`/menu/${id}`, itemData),
    deleteItem: (id) => api.delete(`/menu/${id}`)
};

export const orderAPI = {
    createOrder: (orderData) => api.post('/orders', orderData),
    getMyOrders: () => api.get('/orders/myorders'),
    getOrder: (id) => api.get(`/orders/${id}`),
    updateOrderStatus: (id, status) => api.put(`/orders/${id}/status`, { status })
};

export const reservationAPI = {
    createReservation: (reservationData) => api.post('/reservations', reservationData),
    getMyReservations: () => api.get('/reservations/myreservations'),
    getReservation: (id) => api.get(`/reservations/${id}`),
    updateReservation: (id, reservationData) => api.put(`/reservations/${id}`, reservationData),
    cancelReservation: (id) => api.delete(`/reservations/${id}`)
};

export default api;
