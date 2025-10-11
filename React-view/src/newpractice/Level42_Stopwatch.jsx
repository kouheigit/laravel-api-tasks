import React, { useState, useEffect, useRef } from 'react';

function Level42_Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);
    const intervalRef = useRef();

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(t => t + 10);
            }, 10);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    const formatTime = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
    };

    const recordLap = () => {
        setLaps([...laps, time]);
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Level 42: ストップウォッチ（ラップ機能）</h1>
            <h2 style={{ fontSize: '64px', margin: '30px 0' }}>{formatTime(time)}</h2>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button onClick={() => setIsRunning(!isRunning)} style={{ padding: '10px 20px', fontSize: '16px' }}>
                    {isRunning ? '停止' : '開始'}
                </button>
                <button onClick={recordLap} disabled={!isRunning} style={{ padding: '10px 20px', fontSize: '16px' }}>
                    ラップ
                </button>
                <button onClick={() => { setTime(0); setLaps([]); setIsRunning(false); }} style={{ padding: '10px 20px', fontSize: '16px' }}>
                    リセット
                </button>
            </div>
            {laps.length > 0 && (
                <div style={{ marginTop: '30px' }}>
                    <h3>ラップタイム</h3>
                    {laps.map((lap, index) => (
                        <div key={index} style={{ padding: '10px', backgroundColor: '#f5f5f5', marginBottom: '5px' }}>
                            Lap {index + 1}: {formatTime(lap)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Level42_Stopwatch;

