import React, { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'practice.todo.items';

export default function Todo() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState('all'); // all | active | completed
  const remaining = useMemo(() => items.filter(i => !i.completed).length, [items]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (_) {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch (_) {}
  }, [items]);

  const addItem = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setItems(prev => [
      { id: crypto.randomUUID(), title: trimmed, completed: false, editing: false },
      ...prev,
    ]);
    setTitle('');
  };

  const toggleItem = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, completed: !i.completed } : i));
  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const toggleEdit = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, editing: !i.editing } : i));
  const updateTitle = (id, next) => setItems(prev => prev.map(i => i.id === id ? { ...i, title: next } : i));
  const clearCompleted = () => setItems(prev => prev.filter(i => !i.completed));

  const filtered = items.filter(i =>
    filter === 'all' ? true : filter === 'active' ? !i.completed : i.completed
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Practice Todo</h1>

      <div style={styles.inputRow}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addItem()}
          placeholder="やることを入力して Enter"
          style={styles.input}
        />
        <button onClick={addItem} style={styles.primaryBtn}>追加</button>
      </div>

      <div style={styles.toolbar}>
        <span>残り: {remaining}</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>すべて</FilterButton>
          <FilterButton active={filter === 'active'} onClick={() => setFilter('active')}>未完了</FilterButton>
          <FilterButton active={filter === 'completed'} onClick={() => setFilter('completed')}>完了</FilterButton>
        </div>
        <button onClick={clearCompleted} style={styles.ghostBtn}>完了を一括削除</button>
      </div>

      <ul style={styles.list}>
        {filtered.map(item => (
          <li key={item.id} style={styles.listItem}>
            <label style={styles.itemLeft}>
              <input type="checkbox" checked={item.completed} onChange={() => toggleItem(item.id)} />
              {item.editing ? (
                <input
                  autoFocus
                  value={item.title}
                  onChange={(e) => updateTitle(item.id, e.target.value)}
                  onBlur={() => toggleEdit(item.id)}
                  onKeyDown={(e) => e.key === 'Enter' && toggleEdit(item.id)}
                  style={styles.editInput}
                />
              ) : (
                <span style={{ ...styles.title, textDecoration: item.completed ? 'line-through' : 'none', color: item.completed ? '#999' : '#222' }}>
                  {item.title}
                </span>
              )}
            </label>
            <div style={styles.actions}>
              <button onClick={() => toggleEdit(item.id)} style={styles.smallBtn}>
                {item.editing ? '保存' : '編集'}
              </button>
              <button onClick={() => removeItem(item.id)} style={styles.dangerBtn}>削除</button>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li style={{ padding: 16, color: '#666', textAlign: 'center' }}>タスクはありません</li>
        )}
      </ul>
    </div>
  );
}

function FilterButton({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: '6px 10px',
      borderRadius: 6,
      border: `1px solid ${active ? '#1e88e5' : '#ddd'}`,
      background: active ? '#e3f2fd' : '#fff',
      color: active ? '#1565c0' : '#333',
      cursor: 'pointer'
    }}>{children}</button>
  );
}

const styles = {
  container: {
    maxWidth: 520,
    margin: '40px auto',
    padding: 16,
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  heading: { margin: 0, marginBottom: 16, fontSize: 24 },
  inputRow: { display: 'flex', gap: 8, marginBottom: 12 },
  input: {
    flex: 1,
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: 8,
    outline: 'none'
  },
  editInput: {
    marginLeft: 8,
    padding: '6px 8px',
    border: '1px solid #ddd',
    borderRadius: 6,
    outline: 'none'
  },
  primaryBtn: {
    padding: '10px 14px',
    borderRadius: 8,
    border: 'none',
    background: '#1976d2',
    color: '#fff',
    cursor: 'pointer'
  },
  ghostBtn: {
    padding: '6px 10px',
    borderRadius: 8,
    border: '1px solid #ddd',
    background: '#fff',
    color: '#333',
    cursor: 'pointer'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  list: { listStyle: 'none', margin: 0, padding: 0 },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottom: '1px solid #f0f0f0'
  },
  itemLeft: { display: 'flex', alignItems: 'center' },
  title: { marginLeft: 8 },
  actions: { display: 'flex', gap: 8 }
};


