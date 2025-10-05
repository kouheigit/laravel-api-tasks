import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const TaskNoteList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sort, setSort] = useState('created_at');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const load = async (next = { sort, page }) => {
    try {
      setLoading(true);
      setError('');
      const res = await api.getTaskNotes({ sort: next.sort, page: next.page });
      setNotes(res.data || []);
      setLastPage(res.last_page || 1);
    } catch (e) {
      setError('ノートの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load({ sort, page });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, page]);

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Task Notes</h2>
        <Link to="/task-notes/new" style={{ padding: '8px 12px', background: '#2196F3', color: '#fff', borderRadius: 6, textDecoration: 'none' }}>
          新規作成
        </Link>
      </div>

      <div style={{ margin: '12px 0' }}>
        <label>ソート: </label>
        <select value={sort} onChange={(e) => { setPage(1); setSort(e.target.value); }}>
          <option value="created_at">作成日時</option>
          <option value="priority">優先度</option>
          <option value="due_date">期限</option>
        </select>
      </div>

      {notes.length === 0 && <div>ノートがありません</div>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notes.map((n) => (
          <li key={n.id} style={{ border: '1px solid #e5e5e5', borderRadius: 8, padding: 12, marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 6px' }}>{n.title}</h3>
                <div style={{ color: '#666', fontSize: 13 }}>作成: {n.created_at}{n.due_date ? ` / 期限: ${n.due_date}` : ''}</div>
                <div style={{ color: '#666', fontSize: 13 }}>優先度: {n.priority} / ステータス: {n.status}{n.is_overdue ? '（期限切れ）' : ''}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Link to={`/task-notes/${n.id}`} style={{ textDecoration: 'none' }}>詳細</Link>
                <Link to={`/task-notes/${n.id}/edit`} style={{ textDecoration: 'none' }}>編集</Link>
              </div>
            </div>
            <p style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>{n.content}</p>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
        <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>前へ</button>
        <span>{page} / {lastPage}</span>
        <button disabled={page >= lastPage} onClick={() => setPage(p => Math.min(lastPage, p + 1))}>次へ</button>
      </div>
    </div>
  );
};

export default TaskNoteList;


