import React, { useEffect, useState } from 'react';

// できるだけ簡素な Todo 実装
export default function Todo1() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('todo1');
      if (saved) setTodos(JSON.parse(saved));
    } catch (_) {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem('todo1', JSON.stringify(todos)); } catch (_) {}
  }, [todos]);

  const add = () => {
    const t = text.trim();
    if (!t) return;
    setTodos(prev => [...prev, { id: crypto.randomUUID(), t, done: false }]);
    setText('');
  };

  const toggle = (id) => setTodos(prev => prev.map(x => x.id === id ? { ...x, done: !x.done } : x));
  const remove = (id) => setTodos(prev => prev.filter(x => x.id !== id));

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', padding: 16 }}>
      <h2 style={{ margin: 0, marginBottom: 12 }}>Todo1 (Simple)</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="やること"
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={add}>追加</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {todos.map(item => (
          <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid #eee' }}>
            <input type="checkbox" checked={item.done} onChange={() => toggle(item.id)} />
            <span style={{ flex: 1, textDecoration: item.done ? 'line-through' : 'none', color: item.done ? '#888' : '#222' }}>{item.t}</span>
            <button onClick={() => remove(item.id)}>削除</button>
          </li>
        ))}
        {todos.length === 0 && <li style={{ color: '#666', padding: 8 }}>タスクはありません</li>}
      </ul>
    </div>
  );
}


