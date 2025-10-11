import React, { useState } from 'react';

function Level18_DragDrop() {
    const [items, setItems] = useState([
        { id: 1, text: 'アイテム 1' },
        { id: 2, text: 'アイテム 2' },
        { id: 3, text: 'アイテム 3' },
        { id: 4, text: 'アイテム 4' },
        { id: 5, text: 'アイテム 5' }
    ]);
    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (dropIndex) => {
        if (draggedIndex === null) return;

        const newItems = [...items];
        const draggedItem = newItems[draggedIndex];
        newItems.splice(draggedIndex, 1);
        newItems.splice(dropIndex, 0, draggedItem);

        setItems(newItems);
        setDraggedIndex(null);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 18: ドラッグ&ドロップリスト</h1>
            <p>アイテムをドラッグして並び替えができます</p>
            <div style={{ maxWidth: '400px' }}>
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(index)}
                        style={{
                            padding: '15px',
                            margin: '10px 0',
                            backgroundColor: draggedIndex === index ? '#e0e0e0' : '#f5f5f5',
                            border: '2px solid #ccc',
                            cursor: 'move',
                            borderRadius: '5px'
                        }}
                    >
                        ☰ {item.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Level18_DragDrop;

