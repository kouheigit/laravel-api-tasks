import React, { useState } from 'react';

// Todo1 よりさらに簡素（メモリのみ・編集/保存なし）
export default function Todo2() {
  const [text, setText] = useState('');
  const [list, setList] = useState([]); // {id, t, d}

  const add = () => {
    const t = text.trim();
    if (!t) return;
    setList(prev => [...prev, { id: Date.now(), t, d: false }]);
    setText('');
  };

  const toggle = (id) => setList(prev => prev.map(x => x.id === id ? { ...x, d: !x.d } : x));
  const del = (id) => setList(prev => prev.filter(x => x.id !== id));

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 16 }}>
      <h3 style={{ marginTop: 0 }}>Todo2 (Minimal)</h3>
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
        {list.map(i => (
          <li key={i.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid #eee' }}>
            <input type="checkbox" checked={i.d} onChange={() => toggle(i.id)} />
            <span style={{ flex: 1, textDecoration: i.d ? 'line-through' : 'none' }}>{i.t}</span>
            <button onClick={() => del(i.id)}>削除</button>
          </li>
        ))}
        {list.length === 0 && <li style={{ color: '#777', padding: 8 }}>なし</li>}
      </ul>
    </div>
  );
}


