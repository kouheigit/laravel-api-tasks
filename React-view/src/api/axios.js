import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8061/api',
  withCredentials: true, // クッキー送信ON
});

// リクエストインターセプターでトークンを自動追加
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

export default api;
