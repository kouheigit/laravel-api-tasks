// API Service for Laravel Backend
import config from '../../config';

class ApiService {
  constructor() {
    this.baseURL = config.apiUrl;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // Example: Get tasks from Laravel API
  async getTasks() {
    return this.get('/tasks');
  }

  // Example: Create a new task
  async createTask(taskData) {
    return this.post('/tasks', taskData);
  }

  // Example: Update a task
  async updateTask(id, taskData) {
    return this.put(`/tasks/${id}`, taskData);
  }

  // Example: Delete a task
  async deleteTask(id) {
    return this.delete(`/tasks/${id}`);
  }
}

export default new ApiService();
