import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axios';

export default function BookList() {
  const { user, logout } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // 新規作成・編集用のstate
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({ title: '', author: '' });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await api.get('/books');
      setBooks(res.data.data);
      setError('');
    } catch (err) {
      setError('書籍の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  // 新規作成モーダルを開く
  const openCreateModal = () => {
    setEditingBook(null);
    setFormData({ title: '', author: '' });
    setFormError('');
    setIsModalOpen(true);
  };

  // 編集モーダルを開く
  const openEditModal = (book) => {
    setEditingBook(book);
    setFormData({ title: book.title, author: book.author });
    setFormError('');
    setIsModalOpen(true);
  };

  // モーダルを閉じる
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBook(null);
    setFormData({ title: '', author: '' });
    setFormError('');
  };

  // 書籍を作成または更新
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    try {
      if (editingBook) {
        // 更新
        await api.put(`/books/${editingBook.id}`, formData);
      } else {
        // 新規作成
        await api.post('/books', formData);
      }
      
      closeModal();
      fetchBooks();
    } catch (err) {
      setFormError(
        err.response?.data?.message || 
        err.response?.data?.errors 
          ? Object.values(err.response.data.errors).flat().join(', ')
          : '保存に失敗しました'
      );
    }
  };

  // 書籍を削除
  const handleDelete = async (bookId) => {
    if (!window.confirm('本当に削除しますか？')) {
      return;
    }

    try {
      await api.delete(`/books/${bookId}`);
      fetchBooks();
    } catch (err) {
      setError('削除に失敗しました');
    }
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
      maxWidth: '900px',
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      {/* ヘッダー */}
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
        <h1 style={{ color: '#333', margin: 0 }}>📚 書籍管理システム</h1>
        <div>
          <span style={{ marginRight: '20px', color: '#666' }}>
            {user?.name}さん
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

      {/* エラー表示 */}
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

      {/* 新規作成ボタン */}
      <div style={{ marginBottom: '20px', textAlign: 'right' }}>
        <button
          onClick={openCreateModal}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          ➕ 新しい書籍を追加
        </button>
      </div>

      {/* 書籍一覧 */}
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
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
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
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>
                    {book.title}
                  </h3>
                  <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                    著者: {book.author}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => openEditModal(book)}
                    style={{
                      backgroundColor: '#2196F3',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    style={{
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    削除
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* モーダル（新規作成・編集フォーム） */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
          }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>
              {editingBook ? '書籍を編集' : '新しい書籍を追加'}
            </h2>

            {formError && (
              <div style={{
                backgroundColor: '#ffebee',
                color: '#c62828',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '15px',
                fontSize: '14px'
              }}>
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '14px' }}>
                  タイトル
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="書籍のタイトル"
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '14px' }}>
                  著者
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="著者名"
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    backgroundColor: '#9e9e9e',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  {editingBook ? '更新' : '追加'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
