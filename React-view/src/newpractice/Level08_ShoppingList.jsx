import React, { useState } from 'react';

function Level08_ShoppingList() {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);

    const addItem = () => {
        if (itemName.trim() === '') return;
        const newItem = {
            id: Date.now(),
            name: itemName,
            quantity: parseInt(quantity),
            price: parseFloat(price),
            checked: false
        };
        setItems([...items, newItem]);
        setItemName('');
        setQuantity(1);
        setPrice(0);
    };

    const toggleCheck = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const deleteItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 8: お買い物リスト</h1>
            <div>
                <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="商品名"
                />
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="数量"
                    min="1"
                    style={{ width: '60px' }}
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="単価"
                    min="0"
                    style={{ width: '80px' }}
                />
                <button onClick={addItem}>追加</button>
            </div>
            <h3>合計金額: ¥{totalPrice.toLocaleString()}</h3>
            <ul>
                {items.map(item => (
                    <li key={item.id} style={{ textDecoration: item.checked ? 'line-through' : 'none' }}>
                        <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => toggleCheck(item.id)}
                        />
                        {item.name} × {item.quantity} = ¥{(item.price * item.quantity).toLocaleString()}
                        <button onClick={() => deleteItem(item.id)}>削除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Level08_ShoppingList;

