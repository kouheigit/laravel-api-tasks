import React, { useState } from 'react';

function Level39_VirtualKeyboard() {
    const [input, setInput] = useState('');

    const keys = [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];

    const handleKeyPress = (key) => {
        setInput(input + key);
    };

    const handleBackspace = () => {
        setInput(input.slice(0, -1));
    };

    const handleSpace = () => {
        setInput(input + ' ');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Level 39: 仮想キーボード</h1>
            <div style={{
                marginTop: '20px',
                padding: '20px',
                backgroundColor: 'white',
                border: '2px solid #2196F3',
                borderRadius: '5px',
                minHeight: '60px',
                fontSize: '24px'
            }}>
                {input || 'ここに入力されます...'}
            </div>
            <div style={{ marginTop: '20px' }}>
                {keys.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginBottom: '5px' }}>
                        {row.map(key => (
                            <button
                                key={key}
                                onClick={() => handleKeyPress(key)}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    fontSize: '18px',
                                    backgroundColor: '#f5f5f5',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
                            >
                                {key}
                            </button>
                        ))}
                    </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '10px' }}>
                    <button onClick={handleBackspace} style={{
                        width: '100px',
                        height: '50px',
                        backgroundColor: '#ff9800',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>
                        ←削除
                    </button>
                    <button onClick={handleSpace} style={{
                        width: '300px',
                        height: '50px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>
                        スペース
                    </button>
                    <button onClick={() => setInput('')} style={{
                        width: '100px',
                        height: '50px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>
                        クリア
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Level39_VirtualKeyboard;

