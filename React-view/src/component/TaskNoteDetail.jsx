import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const TaskNoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await api.getTaskNote(id);
        setNote(data);
      } catch (e) {
        setError('詳細の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const onDelete = async () => {
    if (!window.confirm('このノートを削除しますか？')) return;
    try {
      await api.deleteTaskNote(id);
      navigate('/task-notes');
    } catch (e) {
      alert('削除に失敗しました');
    }
  };

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!note) return <div>見つかりませんでした</div>;

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 16 }}>
      <h2>{note.title}</h2>
      <div style={{ color: '#666' }}>作成: {note.created_at}{note.due_date ? ` / 期限: ${note.due_date}` : ''}</div>
      <div style={{ color: '#666' }}>優先度: {note.priority} / ステータス: {note.status}{note.is_overdue ? '（期限切れ）' : ''}</div>
      <p style={{ whiteSpace: 'pre-wrap', marginTop: 12 }}>{note.content}</p>

      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <Link to={`/task-notes/${id}/edit`}>
          <button>編集</button>
        </Link>
        <button onClick={onDelete}>削除</button>
        <Link to="/task-notes">
          <button>一覧へ戻る</button>
        </Link>
      </div>
    </div>
  );
};

export default TaskNoteDetail;


