// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes.jsx';   // ← NEW
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>          {/* ← Router wrapper */}
      <AppRoutes />          {/* ← Routing logic */}
    </BrowserRouter>
  </React.StrictMode>
);