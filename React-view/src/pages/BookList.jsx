import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axios';

export default function BookList() {
  const { user, logout } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await api.get('/books');
      setBooks(res.data.data);
    } catch (err) {
      setError('書籍の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#333', margin: 0 }}>📚 書籍一覧</h1>
        <div>
          <span style={{ marginRight: '20px', color: '#666' }}>
            こんにちは、{user?.name}さん
          </span>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            ログアウト
          </button>
        </div>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '15px',
          borderRadius: '5px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {books.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>
            書籍が登録されていません
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {books.map(book => (
              <li
                key={book.id}
                style={{
                  padding: '15px',
                  borderBottom: '1px solid #eee',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>
                    {book.title}
                  </h3>
                  <p style={{ margin: 0, color: '#666' }}>
                    著者: {book.author}
                  </p>
                </div>
                <div>
                  <span style={{
                    fontSize: '12px',
                    color: '#999'
                  }}>
                    ID: {book.id}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
