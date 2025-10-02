import React from 'react';

const App = () => {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333' }}>Hello World!</h1>
      <p style={{ color: '#666' }}>React アプリケーションが正常に動作しています</p>
      <button 
        onClick={() => alert('ボタンがクリックされました！')}
        style={{
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        テストボタン
      </button>
    </div>
  );
};

export default App;