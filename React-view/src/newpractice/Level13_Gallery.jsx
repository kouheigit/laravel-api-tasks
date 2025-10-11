import React, { useState } from 'react';

function Level13_Gallery() {
    const [images] = useState([
        { id: 1, url: 'https://via.placeholder.com/200/FF0000/FFFFFF?text=Image1', title: '画像1' },
        { id: 2, url: 'https://via.placeholder.com/200/00FF00/FFFFFF?text=Image2', title: '画像2' },
        { id: 3, url: 'https://via.placeholder.com/200/0000FF/FFFFFF?text=Image3', title: '画像3' },
        { id: 4, url: 'https://via.placeholder.com/200/FFFF00/000000?text=Image4', title: '画像4' },
        { id: 5, url: 'https://via.placeholder.com/200/FF00FF/FFFFFF?text=Image5', title: '画像5' },
        { id: 6, url: 'https://via.placeholder.com/200/00FFFF/000000?text=Image6', title: '画像6' }
    ]);
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 13: 画像ギャラリー</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {images.map(image => (
                    <div
                        key={image.id}
                        onClick={() => setSelectedImage(image)}
                        style={{ cursor: 'pointer', border: '2px solid #ccc' }}
                    >
                        <img src={image.url} alt={image.title} style={{ width: '100%' }} />
                        <p style={{ textAlign: 'center', margin: '5px' }}>{image.title}</p>
                    </div>
                ))}
            </div>
            {selectedImage && (
                <div
                    onClick={() => setSelectedImage(null)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <div style={{ backgroundColor: 'white', padding: '20px' }}>
                        <img src={selectedImage.url} alt={selectedImage.title} style={{ maxWidth: '600px' }} />
                        <h3 style={{ textAlign: 'center' }}>{selectedImage.title}</h3>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Level13_Gallery;

