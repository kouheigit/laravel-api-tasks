import './App.css';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Hello from React in Laravel!');

  return (
    <div className="App">
      <header className="App-header">
        <h1>{message}</h1>
        <div className="counter-section">
          <p>カウンター: {count}</p>
          <div className="button-group">
            <button onClick={() => setCount(count + 1)}>
              +1
            </button>
            <button onClick={() => setCount(count - 1)}>
              -1
            </button>
            <button onClick={() => setCount(0)}>
              リセット
            </button>
          </div>
        </div>
        <div className="message-section">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="メッセージを入力"
          />
        </div>
        <p className="info">
          Laravel API と連携した React アプリケーションです
        </p>
      </header>
    </div>
  );
}

export default App;
