import React, { useState } from 'react';

function Level33_Kanban() {
    const [columns, setColumns] = useState({
        todo: { name: 'TODO', items: [{ id: 1, text: 'タスク1' }, { id: 2, text: 'タスク2' }] },
        inProgress: { name: '進行中', items: [{ id: 3, text: 'タスク3' }] },
        done: { name: '完了', items: [{ id: 4, text: 'タスク4' }] }
    });

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 33: かんばんボード</h1>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                {Object.entries(columns).map(([key, column]) => (
                    <div key={key} style={{ flex: 1, backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '10px' }}>
                        <h3>{column.name}</h3>
                        {column.items.map(item => (
                            <div key={item.id} style={{
                                backgroundColor: 'white',
                                padding: '10px',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}>
                                {item.text}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Level33_Kanban;

