import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('wedding_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname.startsWith('/dashboard')) {
      localStorage.removeItem('wedding_auth_token');
      localStorage.removeItem('wedding_user_data');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Service Methods
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
};

export const weddingService = {
  getPublicWedding: (slug) => api.get(`/wedding/public/${slug}`),
  getMyWeddings: () => api.get('/wedding/my'),
  getWeddingById: (id) => api.get(`/wedding/${id}`),
  createWedding: (data) => api.post('/wedding', data),
  updateWedding: (id, data) => api.put(`/wedding/${id}`, data),
  publishWedding: (id, status) => api.patch(`/wedding/${id}/publish`, { status }),
  deleteWedding: (id) => api.delete(`/wedding/${id}`),
};

export const eventService = {
  getEvents: (weddingId) => api.get(`/wedding/${weddingId}/events`),
  createEvent: (weddingId, data) => api.post(`/wedding/${weddingId}/events`, data),
  updateEvent: (id, data) => api.put(`/events/${id}`, data),
  deleteEvent: (id) => api.delete(`/events/${id}`),
};

export const storyService = {
  getStories: (weddingId) => api.get(`/wedding/${weddingId}/story`),
  createStory: (weddingId, data) => api.post(`/wedding/${weddingId}/story`, data),
  updateStory: (id, data) => api.put(`/story/${id}`, data),
  deleteStory: (id) => api.delete(`/story/${id}`),
};

export const mediaService = {
  getMedia: (weddingId, params) => api.get(`/wedding/${weddingId}/media`, { params }),
  uploadMedia: (formData) => api.post('/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteMedia: (id) => api.delete(`/media/${id}`),
};

export const familyService = {
  getFamily: (weddingId) => api.get(`/wedding/${weddingId}/family`),
  createFamily: (weddingId, data) => api.post(`/wedding/${weddingId}/family`, data),
  updateFamily: (id, data) => api.put(`/family/${id}`, data),
  deleteFamily: (id) => api.delete(`/family/${id}`),
};

export const rsvpService = {
  submitRSVP: (data) => api.post('/rsvp', data),
  getAdminRSVPs: (weddingId, params) => api.get(`/wedding/${weddingId}/rsvps`, { params }),
  exportCSVUrl: (weddingId) => `${API_BASE_URL}/wedding/${weddingId}/rsvps/export`,
  deleteRSVP: (id) => api.delete(`/rsvps/${id}`),
};

export const guestbookService = {
  submitBlessing: (data) => api.post('/guestbook', data),
  getPublicBlessings: (weddingId) => api.get(`/wedding/${weddingId}/guestbook`),
  getAdminBlessings: (weddingId) => api.get(`/wedding/${weddingId}/guestbook/admin`),
  updateStatus: (id, status) => api.patch(`/guestbook/${id}`, { status }),
  deleteBlessing: (id) => api.delete(`/guestbook/${id}`),
};

export const aiService = {
  generateContent: (data) => api.post('/ai/generate', data),
};

export default api;
