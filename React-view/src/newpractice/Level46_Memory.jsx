import React, { useState, useEffect } from 'react';

function Level46_Memory() {
    const emojis = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🍑', '🍍'];
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);

    useEffect(() => {
        const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
        setCards(shuffled);
    }, []);

    const handleClick = (index) => {
        if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
                setMatched([...matched, ...newFlipped]);
            }
            setTimeout(() => setFlipped([]), 1000);
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Level 46: 神経衰弱</h1>
            <p>同じ絵柄を見つけよう！</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 100px)', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                {cards.map((emoji, index) => (
                    <div
                        key={index}
                        onClick={() => handleClick(index)}
                        style={{
                            width: '100px',
                            height: '100px',
                            backgroundColor: flipped.includes(index) || matched.includes(index) ? 'white' : '#2196F3',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '48px',
                            cursor: 'pointer',
                            borderRadius: '10px'
                        }}
                    >
                        {(flipped.includes(index) || matched.includes(index)) && emoji}
                    </div>
                ))}
            </div>
            {matched.length === cards.length && <h2 style={{ marginTop: '20px', color: '#4CAF50' }}>クリア！</h2>}
        </div>
    );
}

export default Level46_Memory;

