import React, { useState } from 'react';

function Level07_Calculator() {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);

    const handleNumber = (num) => {
        setDisplay(display === '0' ? String(num) : display + num);
    };

    const handleOperation = (op) => {
        setPreviousValue(parseFloat(display));
        setOperation(op);
        setDisplay('0');
    };

    const calculate = () => {
        const current = parseFloat(display);
        let result = 0;
        
        switch (operation) {
            case '+':
                result = previousValue + current;
                break;
            case '-':
                result = previousValue - current;
                break;
            case '*':
                result = previousValue * current;
                break;
            case '/':
                result = previousValue / current;
                break;
            default:
                return;
        }
        
        setDisplay(String(result));
        setOperation(null);
        setPreviousValue(null);
    };

    const clear = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 7: 電卓</h1>
            <div style={{ border: '1px solid #ccc', padding: '20px', width: '250px' }}>
                <div style={{ fontSize: '32px', textAlign: 'right', marginBottom: '10px' }}>{display}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px' }}>
                    {[7, 8, 9, '/'].map(item => (
                        <button key={item} onClick={() => typeof item === 'number' ? handleNumber(item) : handleOperation(item)}>
                            {item}
                        </button>
                    ))}
                    {[4, 5, 6, '*'].map(item => (
                        <button key={item} onClick={() => typeof item === 'number' ? handleNumber(item) : handleOperation(item)}>
                            {item}
                        </button>
                    ))}
                    {[1, 2, 3, '-'].map(item => (
                        <button key={item} onClick={() => typeof item === 'number' ? handleNumber(item) : handleOperation(item)}>
                            {item}
                        </button>
                    ))}
                    <button onClick={() => handleNumber(0)}>0</button>
                    <button onClick={clear}>C</button>
                    <button onClick={calculate}>=</button>
                    <button onClick={() => handleOperation('+')}>+</button>
                </div>
            </div>
        </div>
    );
}

export default Level07_Calculator;

