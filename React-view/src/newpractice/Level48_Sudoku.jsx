import React, { useState } from 'react';

function Level48_Sudoku() {
    const initialBoard = [
        [5,3,0,0,7,0,0,0,0],
        [6,0,0,1,9,5,0,0,0],
        [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3],
        [4,0,0,8,0,3,0,0,1],
        [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0],
        [0,0,0,4,1,9,0,0,5],
        [0,0,0,0,8,0,0,7,9]
    ];

    const [board, setBoard] = useState(initialBoard);

    const handleChange = (row, col, value) => {
        const newBoard = board.map((r, i) => i === row ? r.map((c, j) => j === col ? parseInt(value) || 0 : c) : r);
        setBoard(newBoard);
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Level 48: 数独（シンプル版）</h1>
            <div style={{ display: 'inline-block', marginTop: '20px' }}>
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: 'flex' }}>
                        {row.map((cell, colIndex) => (
                            <input
                                key={colIndex}
                                type="text"
                                maxLength="1"
                                value={cell === 0 ? '' : cell}
                                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    textAlign: 'center',
                                    border: '1px solid #ccc',
                                    fontSize: '20px',
                                    backgroundColor: initialBoard[rowIndex][colIndex] !== 0 ? '#f5f5f5' : 'white'
                                }}
                                disabled={initialBoard[rowIndex][colIndex] !== 0}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Level48_Sudoku;

