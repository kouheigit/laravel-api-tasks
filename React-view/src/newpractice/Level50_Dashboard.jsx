import React, { useState } from 'react';

function Level50_Dashboard() {
    const [stats] = useState({
        users: 1234,
        revenue: 567890,
        orders: 456,
        growth: 12.5
    });

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <h1>Level 50: ダッシュボード</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ color: '#2196F3' }}>総ユーザー数</h3>
                    <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0' }}>{stats.users.toLocaleString()}</p>
                    <p style={{ color: '#4CAF50' }}>↑ 5% from last month</p>
                </div>
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ color: '#4CAF50' }}>売上</h3>
                    <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0' }}>¥{stats.revenue.toLocaleString()}</p>
                    <p style={{ color: '#4CAF50' }}>↑ {stats.growth}% from last month</p>
                </div>
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ color: '#ff9800' }}>注文数</h3>
                    <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0' }}>{stats.orders.toLocaleString()}</p>
                    <p style={{ color: '#f44336' }}>↓ 2% from last month</p>
                </div>
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ color: '#9c27b0' }}>成長率</h3>
                    <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0' }}>{stats.growth}%</p>
                    <p style={{ color: '#4CAF50' }}>↑ Excellent</p>
                </div>
            </div>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginTop: '20px' }}>
                <h3>最近のアクティビティ</h3>
                <ul>
                    <li>新規ユーザー登録: 山田太郎さん</li>
                    <li>新規注文: #12345</li>
                    <li>お問い合わせ: 佐藤花子さん</li>
                </ul>
            </div>
        </div>
    );
}

export default Level50_Dashboard;

