import React, { useState } from 'react';
import { useRoutes, Link } from 'react-router-dom';
import Hello from './component/Hello';
import HelloPage from './component/HelloPage';

const App = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Hello from React in Laravel!');

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const routes = useRoutes([
    {
      path: "/",
      element: (
        <div>
          <h1 style={{ color: '#333' }}>{message}</h1>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.8)', 
            padding: '20px', 
            borderRadius: '10px',
            margin: '20px auto',
            maxWidth: '500px'
          }}>
            <p style={{ color: '#666', fontSize: '18px' }}>カウンター: {count}</p>
            <div style={{ margin: '15px 0' }}>
              <button 
                onClick={handleIncrement}
                style={{
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  margin: '0 5px'
                }}
              >
                +1
              </button>
              <button 
                onClick={handleDecrement}
                style={{
                  background: '#f44336',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  margin: '0 5px'
                }}
              >
                -1
              </button>
              <button 
                onClick={handleReset}
                style={{
                  background: '#ff9800',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  margin: '0 5px'
                }}
              >
                リセット
              </button>
            </div>
            <input
              type="text"
              value={message}
              onChange={handleMessageChange}
              placeholder="メッセージを入力"
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                width: '300px',
                margin: '10px 0'
              }}
            />
          </div>
          <div style={{ margin: '30px 0' }}>
            <Link 
              to="/hello" 
              style={{
                display: 'inline-block',
                background: '#2196F3',
                color: 'white',
                padding: '15px 30px',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#1976D2';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#2196F3';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Hello.jsx ページへ移動
            </Link>
            <p style={{ color: '#666', marginTop: '10px' }}>
              URL: <code style={{ 
                background: 'rgba(255, 255, 255, 0.5)', 
                padding: '4px 8px', 
                borderRadius: '4px' 
              }}>http://localhost:3000/hello</code>
            </p>
          </div>
          <Hello />
        </div>
      )
    },
    {
      path: "/hello",
      element: <HelloPage />
    }
  ]);

  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh'
    }}>
      {routes}
    </div>
  );
};

export default App;