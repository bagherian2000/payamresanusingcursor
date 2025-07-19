import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`http://localhost:5001/users?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
      const users = await res.json();
      if (users.length > 0) {
        navigate('/dashboard'); // Redirect to dashboard after login
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      </form>
    </div>
  );
}

export default Login; 