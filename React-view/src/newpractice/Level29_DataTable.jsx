import React, { useState } from 'react';

function Level29_DataTable() {
    const initialData = [
        { id: 1, name: '山田太郎', age: 28, department: '営業部', salary: 450000 },
        { id: 2, name: '佐藤花子', age: 35, department: '技術部', salary: 620000 },
        { id: 3, name: '鈴木一郎', age: 42, department: '管理部', salary: 700000 },
        { id: 4, name: '田中美咲', age: 26, department: '営業部', salary: 400000 },
        { id: 5, name: '高橋健', age: 31, department: '技術部', salary: 550000 },
        { id: 6, name: '伊藤愛', age: 29, department: '営業部', salary: 480000 },
        { id: 7, name: '渡辺大輔', age: 38, department: '管理部', salary: 650000 },
        { id: 8, name: '中村さくら', age: 24, department: '技術部', salary: 380000 }
    ];

    const [data, setData] = useState(initialData);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const sortData = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        const sortedData = [...data].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setData(sortedData);
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return '↕️';
        return sortConfig.direction === 'asc' ? '↑' : '↓';
    };

    const formatSalary = (salary) => {
        return '¥' + salary.toLocaleString();
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 29: データテーブル</h1>
            <p>列ヘッダーをクリックしてソートできます</p>
            
            <div style={{ overflowX: 'auto' }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginTop: '20px',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <thead>
                        <tr style={{ backgroundColor: '#2196F3', color: 'white' }}>
                            <th
                                onClick={() => sortData('id')}
                                style={{
                                    padding: '15px',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    userSelect: 'none'
                                }}
                            >
                                ID {getSortIcon('id')}
                            </th>
                            <th
                                onClick={() => sortData('name')}
                                style={{
                                    padding: '15px',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    userSelect: 'none'
                                }}
                            >
                                名前 {getSortIcon('name')}
                            </th>
                            <th
                                onClick={() => sortData('age')}
                                style={{
                                    padding: '15px',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    userSelect: 'none'
                                }}
                            >
                                年齢 {getSortIcon('age')}
                            </th>
                            <th
                                onClick={() => sortData('department')}
                                style={{
                                    padding: '15px',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    userSelect: 'none'
                                }}
                            >
                                部署 {getSortIcon('department')}
                            </th>
                            <th
                                onClick={() => sortData('salary')}
                                style={{
                                    padding: '15px',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    userSelect: 'none'
                                }}
                            >
                                給与 {getSortIcon('salary')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr
                                key={row.id}
                                style={{
                                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
                                    borderBottom: '1px solid #e0e0e0'
                                }}
                            >
                                <td style={{ padding: '15px' }}>{row.id}</td>
                                <td style={{ padding: '15px' }}>{row.name}</td>
                                <td style={{ padding: '15px' }}>{row.age}歳</td>
                                <td style={{ padding: '15px' }}>{row.department}</td>
                                <td style={{ padding: '15px' }}>{formatSalary(row.salary)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '5px' }}>
                <strong>統計:</strong> 総従業員数: {data.length}人 | 
                平均年齢: {Math.round(data.reduce((sum, r) => sum + r.age, 0) / data.length)}歳 | 
                平均給与: {formatSalary(Math.round(data.reduce((sum, r) => sum + r.salary, 0) / data.length))}
            </div>
        </div>
    );
}

export default Level29_DataTable;

