import React, { useState } from 'react';

function Level35_DarkMode() {
    const [isDark, setIsDark] = useState(false);

    const theme = {
        light: { bg: '#ffffff', text: '#000000', card: '#f5f5f5' },
        dark: { bg: '#1a1a1a', text: '#ffffff', card: '#2a2a2a' }
    };

    const current = isDark ? theme.dark : theme.light;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: current.bg, color: current.text, padding: '20px', transition: 'all 0.3s' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1>Level 35: ダークモード</h1>
                    <button
                        onClick={() => setIsDark(!isDark)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: current.card,
                            color: current.text,
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '20px'
                        }}
                    >
                        {isDark ? '☀️' : '🌙'}
                    </button>
                </div>
                <div style={{ marginTop: '30px', padding: '20px', backgroundColor: current.card, borderRadius: '10px' }}>
                    <h2>サンプルコンテンツ</h2>
                    <p>これはダークモードのデモです。右上のボタンでテーマを切り替えられます。</p>
                </div>
            </div>
        </div>
    );
}

export default Level35_DarkMode;

