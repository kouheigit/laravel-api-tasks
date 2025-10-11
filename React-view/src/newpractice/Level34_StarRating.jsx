import React, { useState } from 'react';

function Level34_StarRating() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Level 34: 星評価</h1>
            <div style={{ fontSize: '48px', marginTop: '30px' }}>
                {[1, 2, 3, 4, 5].map(star => (
                    <span
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        style={{ cursor: 'pointer', color: star <= (hover || rating) ? '#FFD700' : '#ccc' }}
                    >
                        ★
                    </span>
                ))}
            </div>
            <p style={{ marginTop: '20px', fontSize: '20px' }}>
                現在の評価: {rating} / 5
            </p>
        </div>
    );
}

export default Level34_StarRating;

