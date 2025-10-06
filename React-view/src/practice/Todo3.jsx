import React, { useState } from 'react';

// CSSなし・最小限（追加/削除のみ、トグルも永続化も無し）
export default function Todo3() {
  const [v, setV] = useState('');
  const [list, setList] = useState([]); // 配列は文字列のみ

  const add = () => {
    const t = v.trim();
    if (!t) return;
    setList([...list, t]);
    setV('');
  };

  const del = (i) => setList(list.filter((_, idx) => idx !== i));

  return (
    <div>
      <h4>Todo3 (Minimal)</h4>
      <input value={v} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} placeholder="やること" />
      <button onClick={add}>追加</button>
      <ul>
        {list.map((t, i) => (
          <li key={i}>
            {t} <button onClick={() => del(i)}>削除</button>
          </li>
        ))}
        {list.length === 0 && <li>なし</li>}
      </ul>
    </div>
  );
}


