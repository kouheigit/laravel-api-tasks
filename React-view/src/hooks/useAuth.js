import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api/axios';

// CSRFトークン用のaxiosインスタンス
const csrfApi = axios.create({
  baseURL: 'http://localhost:8061',
  withCredentials: true,
});

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 認証中ユーザー取得
  const fetchUser = async () => {
    try {
      const res = await api.get('/me');
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ログイン
  const login = async (email, password) => {
    try {
      // CSRFトークンを取得
      await csrfApi.get('/sanctum/csrf-cookie');
      
      // ログイン実行
      const res = await api.post('/login', { email, password });
      setUser(res.data);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // ログアウト
  const logout = async () => {
    await api.post('/logout');
    setUser(null);
  };

  return { user, loading, login, logout };
}
