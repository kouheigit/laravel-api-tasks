import React, { useState } from 'react';

function Level32_Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState({
        '2025-10-15': ['会議', 'プレゼン'],
        '2025-10-20': ['締め切り']
    });

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return { firstDay, daysInMonth };
    };

    const { firstDay, daysInMonth } = getDaysInMonth(currentDate);
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Level 32: カレンダー</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <button onClick={prevMonth}>前月</button>
                <h2>{currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月</h2>
                <button onClick={nextMonth}>次月</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
                {['日', '月', '火', '水', '木', '金', '土'].map(day => (
                    <div key={day} style={{ textAlign: 'center', fontWeight: 'bold', padding: '10px' }}>{day}</div>
                ))}
                {days.map((day, index) => (
                    <div key={index} style={{
                        border: '1px solid #ccc',
                        minHeight: '60px',
                        padding: '5px',
                        backgroundColor: day ? 'white' : '#f5f5f5'
                    }}>
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Level32_Calendar;

