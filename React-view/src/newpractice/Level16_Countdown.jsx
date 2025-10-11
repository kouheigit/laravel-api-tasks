import React, { useState, useEffect } from 'react';

function Level16_Countdown() {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            setIsFinished(true);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const startTimer = () => {
        const totalSeconds = (parseInt(minutes) * 60) + parseInt(seconds);
        if (totalSeconds > 0) {
            setTimeLeft(totalSeconds);
            setIsActive(true);
            setIsFinished(false);
        }
    };

    const pauseTimer = () => {
        setIsActive(false);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(0);
        setIsFinished(false);
    };

    const displayMinutes = Math.floor(timeLeft / 60);
    const displaySeconds = timeLeft % 60;

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Level 16: カウントダウンタイマー</h1>
            {!isActive && timeLeft === 0 && (
                <div>
                    <input
                        type="number"
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                        placeholder="分"
                        min="0"
                        style={{ width: '60px', margin: '5px' }}
                    />
                    <span>:</span>
                    <input
                        type="number"
                        value={seconds}
                        onChange={(e) => setSeconds(e.target.value)}
                        placeholder="秒"
                        min="0"
                        max="59"
                        style={{ width: '60px', margin: '5px' }}
                    />
                    <br />
                    <button onClick={startTimer} style={{ margin: '10px', padding: '10px 20px' }}>
                        開始
                    </button>
                </div>
            )}
            {timeLeft > 0 && (
                <div>
                    <h2 style={{ fontSize: '64px', color: timeLeft < 10 ? 'red' : 'black' }}>
                        {String(displayMinutes).padStart(2, '0')}:{String(displaySeconds).padStart(2, '0')}
                    </h2>
                    <button onClick={pauseTimer} disabled={!isActive} style={{ margin: '5px', padding: '10px 20px' }}>
                        一時停止
                    </button>
                    <button onClick={() => setIsActive(true)} disabled={isActive} style={{ margin: '5px', padding: '10px 20px' }}>
                        再開
                    </button>
                    <button onClick={resetTimer} style={{ margin: '5px', padding: '10px 20px' }}>
                        リセット
                    </button>
                </div>
            )}
            {isFinished && (
                <div>
                    <h2 style={{ color: 'green' }}>⏰ 時間です！</h2>
                    <button onClick={resetTimer} style={{ padding: '10px 20px' }}>
                        新しいタイマーを設定
                    </button>
                </div>
            )}
        </div>
    );
}

export default Level16_Countdown;

