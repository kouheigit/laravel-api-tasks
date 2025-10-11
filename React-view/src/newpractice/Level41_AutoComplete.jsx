import React, { useState } from 'react';

function Level41_AutoComplete() {
    const suggestions = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew'];
    const [input, setInput] = useState('');
    const [filtered, setFiltered] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);
        if (value) {
            setFiltered(suggestions.filter(s => s.toLowerCase().includes(value.toLowerCase())));
        } else {
            setFiltered([]);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h1>Level 41: オートコンプリート</h1>
            <input
                type="text"
                value={input}
                onChange={handleChange}
                placeholder="フルーツを検索..."
                style={{ width: '100%', padding: '10px', marginTop: '20px' }}
            />
            {filtered.length > 0 && (
                <ul style={{ listStyle: 'none', padding: 0, border: '1px solid #ccc', marginTop: '5px', maxHeight: '200px', overflowY: 'auto' }}>
                    {filtered.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => { setInput(item); setFiltered([]); }}
                            style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Level41_AutoComplete;

