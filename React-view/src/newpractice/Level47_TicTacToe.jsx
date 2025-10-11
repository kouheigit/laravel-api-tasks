import React, { useState } from 'react';

function Level47_TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const calculateWinner = (squares) => {
        const lines = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
        for (let line of lines) {
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handleClick = (i) => {
        if (board[i] || calculateWinner(board)) return;
        const newBoard = [...board];
        newBoard[i] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const winner = calculateWinner(board);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Level 47: 三目並べ</h1>
            <h3>{winner ? `勝者: ${winner}` : `次: ${isXNext ? 'X' : 'O'}`}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '5px', justifyContent: 'center', marginTop: '20px' }}>
                {board.map((cell, i) => (
                    <button
                        key={i}
                        onClick={() => handleClick(i)}
                        style={{
                            width: '100px',
                            height: '100px',
                            fontSize: '48px',
                            backgroundColor: '#f5f5f5',
                            border: '2px solid #2196F3',
                            cursor: 'pointer'
                        }}
                    >
                        {cell}
                    </button>
                ))}
            </div>
            <button onClick={() => setBoard(Array(9).fill(null))} style={{ marginTop: '20px', padding: '10px 20px' }}>
                リセット
            </button>
        </div>
    );
}

export default Level47_TicTacToe;

