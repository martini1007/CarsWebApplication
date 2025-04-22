import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import '../Styles/LoginStyle.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const { saveToken } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch('https://localhost:7178/api/Account/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (res.ok) {
            const data = await res.json();
            console.log(data);
            if (data.token) {
                localStorage.setItem('token', data.token);
                saveToken(data.token);
                window.location.href = '/';
            } else {
                setMessage('Token not found in response');
            }
        } else {
            const error = await res.text();
            setMessage(error);
        }
    };

    return (
        <div className="super-container">
            <div className="auth-card">
                <h2 className="auth-title">Zaloguj się</h2>
                <p className="auth-subtitle">Wprowadź swoje dane </p>
                <form onSubmit={handleLogin} className="auth-form">
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Hasło"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary">Potwierdź</button>
                </form>
                {message && <p className="auth-message">{message}</p>}
            </div>
        </div>
    );
}

export default Login;
