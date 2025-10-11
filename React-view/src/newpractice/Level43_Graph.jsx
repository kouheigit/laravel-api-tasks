import React, { useState } from 'react';

function Level43_Graph() {
    const [data, setData] = useState([30, 60, 40, 80, 50, 70, 90]);

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Level 43: シンプルなグラフ</h1>
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '300px', gap: '10px', marginTop: '30px', border: '1px solid #ccc', padding: '20px' }}>
                {data.map((value, index) => (
                    <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                            width: '100%',
                            height: `${(value / 100) * 250}px`,
                            backgroundColor: '#2196F3',
                            transition: 'height 0.3s',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            paddingTop: '5px'
                        }}>
                            {value}
                        </div>
                        <span style={{ marginTop: '5px', fontSize: '12px' }}>Day {index + 1}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Level43_Graph;

