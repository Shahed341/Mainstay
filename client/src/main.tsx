/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: client/src/main.tsx
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

