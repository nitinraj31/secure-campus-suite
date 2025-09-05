const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  baseURL: API_BASE_URL,

  // Auth endpoints
  auth: {
    signin: `${API_BASE_URL}/auth/signin`,
    signup: `${API_BASE_URL}/auth/signup`,
    logout: `${API_BASE_URL}/auth/logout`,
  },

  // User endpoints
  users: {
    getAll: `${API_BASE_URL}/users`,
    getById: (id: string) => `${API_BASE_URL}/users/${id}`,
    create: `${API_BASE_URL}/users`,
    update: (id: string) => `${API_BASE_URL}/users/${id}`,
    delete: (id: string) => `${API_BASE_URL}/users/${id}`,
  },

  // Room endpoints
  rooms: {
    getAll: `${API_BASE_URL}/rooms`,
    getAvailable: `${API_BASE_URL}/rooms/available`,
    getById: (id: string) => `${API_BASE_URL}/rooms/${id}`,
    create: `${API_BASE_URL}/rooms`,
    update: (id: string) => `${API_BASE_URL}/rooms/${id}`,
    delete: (id: string) => `${API_BASE_URL}/rooms/${id}`,
    allot: `${API_BASE_URL}/rooms/allot`,
  },

  // Health check
  health: `${API_BASE_URL}/health`,
};

// Helper function for making API requests
export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add authorization header if token exists
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    // Enhanced error handling for fetch failures
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Failed to fetch: Check if the backend server is running and CORS is configured correctly');
    }
    throw error;
  }
};

export default api;
