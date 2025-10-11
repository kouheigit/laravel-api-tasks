import React, { useState, useEffect } from 'react';

function Level06_Timer() {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const toggle = () => {
        setIsActive(!isActive);
    };

    const reset = () => {
        setSeconds(0);
        setIsActive(false);
    };

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Level 6: ストップウォッチ</h1>
            <h2 style={{ fontSize: '48px' }}>{formatTime(seconds)}</h2>
            <button onClick={toggle} style={{ fontSize: '20px', padding: '10px 20px', margin: '5px' }}>
                {isActive ? '停止' : '開始'}
            </button>
            <button onClick={reset} style={{ fontSize: '20px', padding: '10px 20px', margin: '5px' }}>
                リセット
            </button>
        </div>
    );
}

export default Level06_Timer;

