import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const todayStr = new Date().toISOString().slice(0, 10);
const empty = {
  title: '',
  content: '',
  status: 'Todo',
  due_date: todayStr,
  priority: 3,
  task_group_id: ''
};

const TaskNoteForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    const fetch = async () => {
      if (!isEdit) return;
      try {
        setLoading(true);
        setError('');
        const data = await api.getTaskNote(id);
        // APIはResourceで返るのでプロパティ名に合わせる
        const normalizeDate = (v) => {
          if (!v) return '';
          const hyphen = String(v).replaceAll('/', '-');
          // 既に yyyy-mm-dd ならそのまま
          if (/^\d{4}-\d{2}-\d{2}$/.test(hyphen)) return hyphen;
          const d = new Date(hyphen);
          if (Number.isNaN(d.getTime())) return '';
          return new Date(d.getTime() - d.getTimezoneOffset()*60000).toISOString().slice(0,10);
        };
        setForm({
          title: data.title || '',
          content: data.content || '',
          status: data.status || 'Todo',
          due_date: normalizeDate(data.due_date || ''),
          priority: data.priority ?? 3,
          task_group_id: ''
        });
      } catch (e) {
        setError('ノートの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'due_date') {
      const hyphen = String(value).replaceAll('/', '-');
      return setForm(prev => ({ ...prev, [name]: hyphen }));
    }
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setFieldErrors({});
      const normalizeDateForApi = (v) => {
        if (!v) return v;
        const hyphen = String(v).replaceAll('/', '-');
        if (/^\d{4}-\d{2}-\d{2}$/.test(hyphen)) return hyphen;
        const d = new Date(hyphen);
        if (Number.isNaN(d.getTime())) return v;
        return new Date(d.getTime() - d.getTimezoneOffset()*60000).toISOString().slice(0,10);
      };

      const payload = {
        title: form.title,
        content: form.content,
        status: form.status,
        due_date: normalizeDateForApi(form.due_date),
        priority: Number(form.priority),
        task_group_id: form.task_group_id || null,
      };
      if (isEdit) {
        await api.updateTaskNote(id, payload);
      } else {
        await api.createTaskNote(payload);
      }
      navigate('/task-notes');
    } catch (e) {
      if (e.status === 422 && e.payload && e.payload.errors) {
        setFieldErrors(e.payload.errors);
        setError('入力内容をご確認ください。');
      } else if (e.status === 401 || e.status === 403) {
        setError('認証または権限エラーです。ログイン状態を確認してください。');
      } else {
        setError(e.message || '保存に失敗しました。');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 16 }}>
      <h2>{isEdit ? 'ノートを編集' : 'ノートを作成'}</h2>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>タイトル</label>
          <input name="title" value={form.title} onChange={onChange} required style={{ width: '100%', padding: 8 }} />
          {fieldErrors.title && <div style={{ color: 'crimson' }}>{fieldErrors.title.join(' ')}</div>}
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>内容</label>
          <textarea name="content" value={form.content} onChange={onChange} required rows={6} style={{ width: '100%', padding: 8 }} />
          {fieldErrors.content && <div style={{ color: 'crimson' }}>{fieldErrors.content.join(' ')}</div>}
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <label>ステータス</label>
            <select name="status" value={form.status} onChange={onChange}>
              <option value="Todo">Todo</option>
              <option value="InProgress">InProgress</option>
              <option value="Done">Done</option>
            </select>
            {fieldErrors.status && <div style={{ color: 'crimson' }}>{fieldErrors.status.join(' ')}</div>}
          </div>
          <div>
            <label>期限</label>
            <input type="date" name="due_date" value={form.due_date} onChange={onChange} required />
            {fieldErrors.due_date && <div style={{ color: 'crimson' }}>{fieldErrors.due_date.join(' ')}</div>}
          </div>
          <div>
            <label>優先度</label>
            <input type="number" name="priority" min={1} max={5} value={form.priority} onChange={onChange} />
            {fieldErrors.priority && <div style={{ color: 'crimson' }}>{fieldErrors.priority.join(' ')}</div>}
          </div>
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <button type="submit" disabled={loading}>{isEdit ? '更新' : '作成'}</button>
          <button type="button" onClick={() => navigate('/task-notes')}>キャンセル</button>
        </div>
      </form>
    </div>
  );
};

export default TaskNoteForm;


