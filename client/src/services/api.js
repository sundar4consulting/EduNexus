import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Request interceptor — attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && error.response?.data?.code === 'TOKEN_EXPIRED' && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout', { refreshToken: localStorage.getItem('refreshToken') }),
};

// Users
export const userAPI = {
  getProfile: (id) => api.get(`/users/profile/${id}`),
  updateProfile: (data) => api.put('/users/profile', data),
  getDashboard: () => api.get('/users/dashboard'),
};

// Courses
export const courseAPI = {
  getAll: (params) => api.get('/courses', { params }),
  getBySlug: (slug) => api.get(`/courses/${slug}`),
  enroll: (id) => api.post(`/courses/${id}/enroll`),
  getCategories: () => api.get('/courses/categories/list'),
};

// Learning Paths
export const pathAPI = {
  getAll: (params) => api.get('/learning-paths', { params }),
  getBySlug: (slug) => api.get(`/learning-paths/${slug}`),
};

// Quizzes
export const quizAPI = {
  getAll: (params) => api.get('/quizzes', { params }),
  getById: (id) => api.get(`/quizzes/${id}`),
  submitAttempt: (id, data) => api.post(`/quizzes/${id}/attempt`, data),
};

// Coding Problems
export const problemAPI = {
  getAll: (params) => api.get('/problems', { params }),
  getBySlug: (slug) => api.get(`/problems/${slug}`),
  submit: (id, data) => api.post(`/problems/${id}/submit`, data),
};

// Events
export const eventAPI = {
  getAll: (params) => api.get('/events', { params }),
  getBySlug: (slug) => api.get(`/events/${slug}`),
  register: (id) => api.post(`/events/${id}/register`),
};

// Jobs
export const jobAPI = {
  getAll: (params) => api.get('/jobs', { params }),
  getById: (id) => api.get(`/jobs/${id}`),
  apply: (id, data) => api.post(`/jobs/${id}/apply`, data),
};

// Leaderboard
export const leaderboardAPI = {
  get: (params) => api.get('/leaderboard', { params }),
};

// Forum
export const forumAPI = {
  getPosts: (params) => api.get('/forum', { params }),
  getPost: (id) => api.get(`/forum/${id}`),
  createPost: (data) => api.post('/forum', data),
  addComment: (id, data) => api.post(`/forum/${id}/comments`, data),
};

// Notifications
export const notificationAPI = {
  getAll: () => api.get('/notifications'),
  markAllRead: () => api.put('/notifications/read-all'),
  markRead: (id) => api.put(`/notifications/${id}/read`),
};

export default api;
