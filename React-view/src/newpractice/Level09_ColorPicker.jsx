import React, { useState } from 'react';

function Level09_ColorPicker() {
    const [red, setRed] = useState(128);
    const [green, setGreen] = useState(128);
    const [blue, setBlue] = useState(128);
    const [savedColors, setSavedColors] = useState([]);

    const rgbColor = `rgb(${red}, ${green}, ${blue})`;
    const hexColor = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;

    const saveColor = () => {
        const newColor = { rgb: rgbColor, hex: hexColor };
        setSavedColors([...savedColors, newColor]);
    };

    const loadColor = (color) => {
        const match = color.rgb.match(/rgb\((\d+), (\d+), (\d+)\)/);
        if (match) {
            setRed(parseInt(match[1]));
            setGreen(parseInt(match[2]));
            setBlue(parseInt(match[3]));
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 9: カラーピッカー</h1>
            <div style={{ backgroundColor: rgbColor, width: '200px', height: '200px', border: '1px solid #000', marginBottom: '20px' }}></div>
            <div>
                <p>RGB: {rgbColor}</p>
                <p>HEX: {hexColor}</p>
            </div>
            <div>
                <label>Red: {red}</label>
                <input type="range" min="0" max="255" value={red} onChange={(e) => setRed(parseInt(e.target.value))} />
                <br />
                <label>Green: {green}</label>
                <input type="range" min="0" max="255" value={green} onChange={(e) => setGreen(parseInt(e.target.value))} />
                <br />
                <label>Blue: {blue}</label>
                <input type="range" min="0" max="255" value={blue} onChange={(e) => setBlue(parseInt(e.target.value))} />
            </div>
            <button onClick={saveColor} style={{ marginTop: '10px' }}>色を保存</button>
            <h3>保存した色</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {savedColors.map((color, index) => (
                    <div
                        key={index}
                        onClick={() => loadColor(color)}
                        style={{
                            backgroundColor: color.rgb,
                            width: '50px',
                            height: '50px',
                            border: '1px solid #000',
                            cursor: 'pointer'
                        }}
                        title={color.hex}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default Level09_ColorPicker;

