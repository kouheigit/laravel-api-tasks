import React, { useState } from 'react';

function Level11_Weather() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const mockWeatherData = {
        '東京': { temp: 25, condition: '晴れ', humidity: 60 },
        '大阪': { temp: 27, condition: '曇り', humidity: 65 },
        '北海道': { temp: 18, condition: '雨', humidity: 80 },
        '沖縄': { temp: 30, condition: '晴れ', humidity: 70 }
    };

    const searchWeather = () => {
        const data = mockWeatherData[city];
        if (data) {
            setWeatherData({ city, ...data });
        } else {
            setWeatherData({ error: '都市が見つかりません' });
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 11: 天気アプリ</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="都市名を入力"
            />
            <button onClick={searchWeather}>検索</button>
            {weatherData && !weatherData.error && (
                <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px' }}>
                    <h2>{weatherData.city}</h2>
                    <p>気温: {weatherData.temp}°C</p>
                    <p>天気: {weatherData.condition}</p>
                    <p>湿度: {weatherData.humidity}%</p>
                </div>
            )}
            {weatherData && weatherData.error && (
                <p style={{ color: 'red' }}>{weatherData.error}</p>
            )}
            <p style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
                利用可能な都市: 東京、大阪、北海道、沖縄
            </p>
        </div>
    );
}

export default Level11_Weather;

