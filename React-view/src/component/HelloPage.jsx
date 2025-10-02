import React from 'react';
import { Link } from 'react-router-dom';
import Hello from './Hello';
import './HelloPage.css';

const HelloPage = () => {
  return (
    <div className="hello-page">
      <div className="hello-page-header">
        <h1>Hello Page</h1>
        <p>独立したHelloコンポーネントページです</p>
        <Link to="/" className="back-link">
          ← ホームに戻る
        </Link>
      </div>
      <div className="hello-page-content">
        <Hello />
      </div>
    </div>
  );
};

export default HelloPage;
