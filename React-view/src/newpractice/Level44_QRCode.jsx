import React, { useState } from 'react';

function Level44_QRCode() {
    const [text, setText] = useState('https://example.com');

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Level 44: QRコード生成（シミュレーション）</h1>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="URL またはテキスト"
                style={{ width: '400px', padding: '10px', marginTop: '20px' }}
            />
            <div style={{
                width: '200px',
                height: '200px',
                backgroundColor: '#000',
                margin: '30px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                padding: '10px',
                wordBreak: 'break-all'
            }}>
                QRコード
                <br />
                {text}
            </div>
            <p style={{ color: '#666', fontSize: '12px' }}>※実際のQRコード生成にはライブラリが必要です</p>
        </div>
    );
}

export default Level44_QRCode;

