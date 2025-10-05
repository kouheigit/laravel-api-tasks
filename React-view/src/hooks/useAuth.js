import { useState, useEffect } from 'react';
import api from '../api/axios';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 認証中ユーザー取得
  const fetchUser = async () => {
    try {
      const res = await api.get('/me');
      setUser(res.data);
    } catch (error) {
      console.log('User not authenticated:', error.response?.status);
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
      // トークンベース認証を使用
      const res = await api.post('/login', { email, password });
      
      // トークンを保存
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      
      // ユーザー情報を設定
      setUser(res.data.user || res.data);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // ログアウト
  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  return { user, loading, login, logout };
}
