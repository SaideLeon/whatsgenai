// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-sessions-production.up.railway.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('whatsgenai_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('whatsgenai_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async register(userData) {
    const response = await api.post('/users', userData);
    return response.data;
  },

  logout() {
    localStorage.removeItem('whatsgenai_token');
    localStorage.removeItem('whatsgenai_user');
  }
};

export const sessionService = {
  async create(sessionData) {
    const response = await api.post('/sessions', sessionData);
    return response.data;
  },

  async list() {
    const response = await api.get('/sessions');
    return response.data;
  }
};

export const vendorService = {
  async create(vendorData) {
    const response = await api.post('/vendors', vendorData);
    return response.data;
  },

  async list() {
    const response = await api.get('/vendors');
    return response.data;
  }
};

export const sellerService = {
  async create(sellerData) {
    const response = await api.post('/sellers', sellerData);
    return response.data;
  },

  async list() {
    const response = await api.get('/sellers');
    return response.data;
  }
};

export const messageService = {
  async create(messageData) {
    const response = await api.post('/messages', messageData);
    return response.data;
  },

  async list() {
    const response = await api.get('/messages');
    return response.data;
  },

  async getBatch(sessionId) {
    const response = await api.get(`/messages/batch/${sessionId}`);
    return response.data;
  }
};

export default api;

