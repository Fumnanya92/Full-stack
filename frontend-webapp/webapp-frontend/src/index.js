import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Optional: Create an index.css file for global styles
import App from './App';  // This imports your main App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // This links to the 'root' div in index.html
);
