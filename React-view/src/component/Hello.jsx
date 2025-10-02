import React from 'react';
import './Hello.css';

const Hello = () => {
  return (
    <div className="hello-component">
      <h2>Hello World!</h2>
      <p>これは component ディレクトリ内の Hello.jsx コンポーネントです。</p>
      <div className="hello-info">
        <p>React コンポーネントとして作成されました。</p>
        <p>Laravel API と連携する準備ができています。</p>
      </div>
    </div>
  );
};

export default Hello;
