import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginNavBar from './LoginNavBar';
import imagem from './5.png';
import './Login.css'; // Importa o arquivo Login.css

const Login = ({ setToken, errorMessage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (window.innerWidth <= 768) {
            navigate('/SelectRoute'); // Redireciona para outra página no mobile
        }
    }, [navigate]);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://186.237.58.74:3001/login', {
                username,
                password,
            });

            const { token } = response.data;

            localStorage.setItem('token', token);

            setToken(token);

            navigate('/SelectRoute');
        } catch (error) {
            console.error('Erro durante o login:', error);
            setError('Usuário ou senha incorretos');
        }
    };

    const isDesktop = window.innerWidth > 768; // Verifica se é desktop

    return (
        <div className={`login-container ${isDesktop ? 'desktop' : ''}`}>
            <div className="login-left">
                <div className="login-title">Indoor Routes</div>
                <img src={imagem} alt="Imagem" className="login-image" />
            </div>
            <div className="login-right">
                <LoginNavBar />
                <div className="login-box">
                    <h2>Login</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {error && <p className="error-message">{error}</p>}
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-field"
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                        />
                    </label>
                    <button onClick={handleLogin} className="login-button">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;

