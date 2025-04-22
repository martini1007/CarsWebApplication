import React, { useState } from 'react';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [message, setMessage] = useState('');
    const [passwordError, setPasswordError] = useState(''); // Dla walidacji hasła
    const [bio, setBio] = useState('uzytkownik');

    const validatePassword = (password) => {
        const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        return regex.test(password);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Walidacja hasła przed wysłaniem
        if (!validatePassword(password)) {
            setPasswordError(
                "Hasło musi mieć co najmniej 6 znaków, zawierać jedną wielką literę, jedną małą literę i jedną cyfrę."
            );
            return;
        }

        const res = await fetch('https://localhost:7178/api/Account/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email, 
                password, 
                userName, 
                displayName,
                bio
            })
        });

        if (res.ok) {
            setMessage("User registered successfully!");
        } else {
            const error = await res.text();
            setMessage(error);
        }
    };

    return (
        <div className="super-container">
            <div className="auth-card">
                <h2 className="auth-title">Zarejestruj się</h2>
                <p className="auth-subtitle">Stwórz swoje konto</p>
                <form onSubmit={handleRegister} className="auth-form">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Nazwa użytkownika"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Wyświetlana nazwa"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            required
                        />
                    </div>
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
                        <p className="auth-subtitle">
                        Hasło musi mieć co najmniej 6 znaków, zawierać jedną wielką literę, jedną małą literę i jedną cyfrę.                        </p>
                    </div>
                    {/* Wyświetlenie błędu walidacji hasła */}
                    {passwordError && <p className="error-message">{passwordError}</p>}
                    <button type="submit" className="btn-primary">Potwierdź</button>
                </form>
                {message && <p className="auth-message">{message}</p>}
            </div>
        </div>
    );
}

export default Register;
