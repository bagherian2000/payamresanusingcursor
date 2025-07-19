// src/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import App from './App.jsx';

export default function AppRoutes() {
  const isAuth = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Routes>
      <Route path="/" element={isAuth ? <App /> : <Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}