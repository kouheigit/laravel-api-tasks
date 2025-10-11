import React, { useState } from 'react';

function Level36_Breadcrumb() {
    const [path, setPath] = useState(['ホーム', 'カテゴリ', '商品']);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 36: パンくずリスト</h1>
            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                {path.map((item, index) => (
                    <React.Fragment key={index}>
                        <span
                            onClick={() => setPath(path.slice(0, index + 1))}
                            style={{
                                cursor: index < path.length - 1 ? 'pointer' : 'default',
                                color: index < path.length - 1 ? '#2196F3' : '#666',
                                fontWeight: index === path.length - 1 ? 'bold' : 'normal'
                            }}
                        >
                            {item}
                        </span>
                        {index < path.length - 1 && <span>›</span>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default Level36_Breadcrumb;

