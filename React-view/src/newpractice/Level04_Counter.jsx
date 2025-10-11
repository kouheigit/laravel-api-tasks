import React, { useState } from 'react';

function Level04_Counter() {
    const [count, setCount] = useState(0);
    const [history, setHistory] = useState([]);

    const increment = () => {
        setCount(count + 1);
        setHistory([...history, `+1: ${count} → ${count + 1}`]);
    };

    const decrement = () => {
        setCount(count - 1);
        setHistory([...history, `-1: ${count} → ${count - 1}`]);
    };

    const reset = () => {
        setCount(0);
        setHistory([...history, `リセット: ${count} → 0`]);
    };

    const clearHistory = () => {
        setHistory([]);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 4: カウンター（履歴機能付き）</h1>
            <h2>現在の値: {count}</h2>
            <button onClick={increment}>+1</button>
            <button onClick={decrement}>-1</button>
            <button onClick={reset}>リセット</button>
            <h3>履歴</h3>
            <button onClick={clearHistory}>履歴をクリア</button>
            <ul>
                {history.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default Level04_Counter;

