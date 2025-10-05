// API Service for Laravel Backend
import config from '../config';

class ApiService {
  constructor() {
    this.baseURL = config.apiUrl;
  }

  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return token
      ? { Authorization: `Bearer ${token}` }
      : {};
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...this.getAuthHeaders(),
      },
    };

    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, mergedOptions);
      if (response.status === 204) {
        return null;
      }
      if (!response.ok) {
        let payload;
        try {
          payload = await response.json();
        } catch (_) {
          payload = { message: await response.text() };
        }
        const error = new Error(payload.message || `HTTP ${response.status}`);
        error.status = response.status;
        error.payload = payload;
        throw error;
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Generic methods
  async get(endpoint, params) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`${endpoint}${query}`, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // Tasks (existing examples)
  async getTasks() { return this.get('/tasks'); }
  async createTask(taskData) { return this.post('/tasks', taskData); }
  async updateTask(id, taskData) { return this.put(`/tasks/${id}`, taskData); }
  async deleteTask(id) { return this.delete(`/tasks/${id}`); }

  // TaskNotes
  async getTaskNotes({ sort = 'created_at', page = 1 } = {}) {
    return this.get('/task-notes', { sort, page });
  }

  async getTaskNote(id) {
    return this.get(`/task-notes/${id}`);
  }

  async createTaskNote(data) {
    return this.post('/task-notes', data);
  }

  async updateTaskNote(id, data) {
    return this.put(`/task-notes/${id}`, data);
  }

  async deleteTaskNote(id) {
    return this.delete(`/task-notes/${id}`);
  }
}

const apiInstance = new ApiService();
export default apiInstance;
