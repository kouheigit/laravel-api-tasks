import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8061/api',
  withCredentials: true, // クッキー送信ON
});

export default api;
