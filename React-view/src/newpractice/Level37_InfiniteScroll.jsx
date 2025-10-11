import React, { useState, useEffect, useRef } from 'react';

function Level37_InfiniteScroll() {
    const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => i + 1));
    const [loading, setLoading] = useState(false);
    const observerRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading) {
                loadMore();
            }
        });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [items, loading]);

    const loadMore = () => {
        setLoading(true);
        setTimeout(() => {
            const newItems = Array.from({ length: 20 }, (_, i) => items.length + i + 1);
            setItems([...items, ...newItems]);
            setLoading(false);
        }, 1000);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 37: 無限スクロール</h1>
            <div>
                {items.map(item => (
                    <div key={item} style={{ padding: '20px', marginBottom: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
                        アイテム {item}
                    </div>
                ))}
            </div>
            <div ref={observerRef} style={{ height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {loading && <p>読み込み中...</p>}
            </div>
        </div>
    );
}

export default Level37_InfiniteScroll;

