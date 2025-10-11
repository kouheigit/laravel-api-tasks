import React, { useState, useEffect } from 'react';

function Level24_Carousel() {
    const images = [
        { id: 1, url: 'https://via.placeholder.com/600x300/FF6B6B/FFFFFF?text=Slide+1', title: 'スライド 1' },
        { id: 2, url: 'https://via.placeholder.com/600x300/4ECDC4/FFFFFF?text=Slide+2', title: 'スライド 2' },
        { id: 3, url: 'https://via.placeholder.com/600x300/45B7D1/FFFFFF?text=Slide+3', title: 'スライド 3' },
        { id: 4, url: 'https://via.placeholder.com/600x300/FFA07A/FFFFFF?text=Slide+4', title: 'スライド 4' },
        { id: 5, url: 'https://via.placeholder.com/600x300/98D8C8/FFFFFF?text=Slide+5', title: 'スライド 5' }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    useEffect(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex, autoPlay]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
            <h1>Level 24: カルーセル</h1>
            
            <div style={{ position: 'relative', marginTop: '20px' }}>
                <img
                    src={images[currentIndex].url}
                    alt={images[currentIndex].title}
                    style={{ width: '100%', borderRadius: '10px' }}
                />
                
                <button
                    onClick={prevSlide}
                    style={{
                        position: 'absolute',
                        left: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        cursor: 'pointer',
                        fontSize: '20px',
                        borderRadius: '5px'
                    }}
                >
                    ❮
                </button>
                
                <button
                    onClick={nextSlide}
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        cursor: 'pointer',
                        fontSize: '20px',
                        borderRadius: '5px'
                    }}
                >
                    ❯
                </button>

                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '10px'
                }}>
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                border: 'none',
                                backgroundColor: currentIndex === index ? 'white' : 'rgba(255,255,255,0.5)',
                                cursor: 'pointer'
                            }}
                        />
                    ))}
                </div>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                    onClick={() => setAutoPlay(!autoPlay)}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: autoPlay ? '#f44336' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                >
                    {autoPlay ? '自動再生を停止' : '自動再生を開始'}
                </button>
            </div>
        </div>
    );
}

export default Level24_Carousel;

