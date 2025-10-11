import React, { useState, useEffect, useCallback } from 'react';

function Level45_Snake() {
    const gridSize = 20;
    const [snake, setSnake] = useState([[10, 10]]);
    const [food, setFood] = useState([15, 15]);
    const [direction, setDirection] = useState('RIGHT');
    const [gameOver, setGameOver] = useState(false);

    const moveSnake = useCallback(() => {
        if (gameOver) return;

        const newSnake = [...snake];
        const head = [...newSnake[0]];

        switch (direction) {
            case 'UP': head[1]--; break;
            case 'DOWN': head[1]++; break;
            case 'LEFT': head[0]--; break;
            case 'RIGHT': head[0]++; break;
            default: break;
        }

        if (head[0] < 0 || head[0] >= gridSize || head[1] < 0 || head[1] >= gridSize) {
            setGameOver(true);
            return;
        }

        newSnake.unshift(head);
        if (head[0] === food[0] && head[1] === food[1]) {
            setFood([Math.floor(Math.random() * gridSize), Math.floor(Math.random() * gridSize)]);
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
    }, [snake, direction, food, gameOver]);

    useEffect(() => {
        const interval = setInterval(moveSnake, 200);
        return () => clearInterval(interval);
    }, [moveSnake]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            switch (e.key) {
                case 'ArrowUp': setDirection('UP'); break;
                case 'ArrowDown': setDirection('DOWN'); break;
                case 'ArrowLeft': setDirection('LEFT'); break;
                case 'ArrowRight': setDirection('RIGHT'); break;
                default: break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Level 45: スネークゲーム</h1>
            <p>矢印キーで操作</p>
            {gameOver && <h2 style={{ color: 'red' }}>Game Over! スコア: {snake.length - 1}</h2>}
            <div style={{
                display: 'inline-grid',
                gridTemplateColumns: `repeat(${gridSize}, 20px)`,
                gap: '1px',
                backgroundColor: '#ccc',
                padding: '10px',
                marginTop: '20px'
            }}>
                {Array.from({ length: gridSize * gridSize }).map((_, index) => {
                    const x = index % gridSize;
                    const y = Math.floor(index / gridSize);
                    const isSnake = snake.some(([sx, sy]) => sx === x && sy === y);
                    const isFood = food[0] === x && food[1] === y;
                    return (
                        <div key={index} style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: isSnake ? '#4CAF50' : isFood ? '#f44336' : 'white'
                        }} />
                    );
                })}
            </div>
        </div>
    );
}

export default Level45_Snake;

