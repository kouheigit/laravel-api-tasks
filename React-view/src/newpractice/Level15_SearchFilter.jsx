import React, { useState } from 'react';

function Level15_SearchFilter() {
    const [items] = useState([
        { id: 1, name: 'りんご', category: 'フルーツ', price: 150 },
        { id: 2, name: 'バナナ', category: 'フルーツ', price: 100 },
        { id: 3, name: 'にんじん', category: '野菜', price: 80 },
        { id: 4, name: 'トマト', category: '野菜', price: 120 },
        { id: 5, name: 'ぶどう', category: 'フルーツ', price: 300 },
        { id: 6, name: 'きゅうり', category: '野菜', price: 90 },
        { id: 7, name: 'いちご', category: 'フルーツ', price: 400 },
        { id: 8, name: 'じゃがいも', category: '野菜', price: 70 }
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [sortBy, setSortBy] = useState('name');

    const filteredItems = items
        .filter(item => item.name.includes(searchTerm))
        .filter(item => categoryFilter === 'all' || item.category === categoryFilter)
        .sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'price') return a.price - b.price;
            return 0;
        });

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 15: 検索フィルター</h1>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="商品を検索"
                    style={{ padding: '5px', marginRight: '10px' }}
                />
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                    <option value="all">すべて</option>
                    <option value="フルーツ">フルーツ</option>
                    <option value="野菜">野菜</option>
                </select>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ marginLeft: '10px' }}>
                    <option value="name">名前順</option>
                    <option value="price">価格順</option>
                </select>
            </div>
            <p>検索結果: {filteredItems.length}件</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {filteredItems.map(item => (
                    <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
                        <h3>{item.name}</h3>
                        <p>カテゴリ: {item.category}</p>
                        <p>価格: ¥{item.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Level15_SearchFilter;

