import React, { useState } from 'react';

function Level40_MusicPlayer() {
    const playlist = [
        { id: 1, title: '楽曲1', artist: 'アーティストA', duration: '3:45' },
        { id: 2, title: '楽曲2', artist: 'アーティストB', duration: '4:20' },
        { id: 3, title: '楽曲3', artist: 'アーティストC', duration: '3:10' },
        { id: 4, title: '楽曲4', artist: 'アーティストD', duration: '5:00' }
    ];

    const [currentSong, setCurrentSong] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const nextSong = () => {
        setCurrentSong((currentSong + 1) % playlist.length);
        setProgress(0);
    };

    const prevSong = () => {
        setCurrentSong((currentSong - 1 + playlist.length) % playlist.length);
        setProgress(0);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h1>Level 40: 音楽プレイヤー</h1>
            <div style={{
                marginTop: '30px',
                backgroundColor: '#1a1a1a',
                color: 'white',
                padding: '30px',
                borderRadius: '15px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div style={{
                        width: '200px',
                        height: '200px',
                        backgroundColor: '#333',
                        margin: '0 auto',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '48px'
                    }}>
                        🎵
                    </div>
                </div>
                <h3 style={{ textAlign: 'center', marginBottom: '5px' }}>{playlist[currentSong].title}</h3>
                <p style={{ textAlign: 'center', color: '#999', marginBottom: '20px' }}>{playlist[currentSong].artist}</p>
                
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => setProgress(e.target.value)}
                    style={{ width: '100%', marginBottom: '20px' }}
                />
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    <button onClick={prevSong} style={{ fontSize: '24px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                        ⏮️
                    </button>
                    <button onClick={togglePlay} style={{ fontSize: '32px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                        {isPlaying ? '⏸️' : '▶️'}
                    </button>
                    <button onClick={nextSong} style={{ fontSize: '24px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                        ⏭️
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Level40_MusicPlayer;

