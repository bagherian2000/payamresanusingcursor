import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';

function MainApp() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5002/api/messages');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      setError('Could not fetch messages.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchMessages}>Show data</button>
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {messages.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <h3>Messages</h3>
            <ul style={{ textAlign: 'left' }}>
              {messages.map(msg => (
                <li key={msg.id}><strong>{msg.author || msg.Author || msg.username || msg.Username || 'Unknown'}:</strong> {msg.text || msg.Text || msg.message || msg.Message || ''}</li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<MainApp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
