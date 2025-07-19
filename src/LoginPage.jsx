import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const [user, setUser]       = useState('');
  const [pass, setPass]       = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const navigate = useNavigate();
  const userRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!user.trim() || !pass.trim()) {
      setError('نام‌کاربری و رمز عبور الزامی است');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/users?username=${user}&password=${pass}`
      );
      const data = await res.json();
      if (data.length) {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/');
      } else {
        setError('نام‌کاربری یا رمز اشتباه است');
        userRef.current?.focus();
      }
    } catch {
      setError('خطا در ارتباط با سرور');
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleLogin} noValidate>
        <h1>ورود به سامانه</h1>

        <div className="field">
          <label>نام‌کاربری</label>
          <input
            ref={userRef}
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="admin"
            autoFocus
          />
        </div>

        <div className="field">
          <label>رمز عبور</label>
          <div className="pass-box">
            <input
              type={showPass ? 'text' : 'password'}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="1234"
            />
            <span className="toggle-eye" onClick={() => setShowPass(!showPass)}>
              {showPass ? '👁️‍🗨️' : '👁️'}
            </span>
          </div>
        </div>

        {error && <p className="error shake">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? <span className="spinner" /> : 'ورود'}
        </button>

        <footer>
          سرور محلی: http://localhost:5000
        </footer>
      </form>
    </div>
  );
}