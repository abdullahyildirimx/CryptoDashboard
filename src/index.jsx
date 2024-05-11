import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@rainbow-me/rainbowkit/styles.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Providers from './Providers';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
