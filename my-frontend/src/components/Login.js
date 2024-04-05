import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginNavBar from './LoginNavBar'; // Importando a nova LoginNavBar
import imagem from './5.png'; // Importando a imagem

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

    const innerBoxStyle = {
        width: '100%', // Garante que a caixa ocupe toda a largura disponível
        maxWidth: '400px', // Define uma largura máxima para a caixa de login
        padding: '20px', // Adiciona espaço interno à caixa de login
        display: 'flex', // Adiciona display flex
        flexDirection: 'column', // Alinha os itens verticalmente
        alignItems: 'center', // Centraliza horizontalmente
        justifyContent: 'center', // Centraliza verticalmente
    };

    const containerStyle = {
        display: 'flex',
        height: '100vh',
        background: '#1E1F23',
    };

    const contentStyle = {
        padding: '220px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    };

    const leftSideStyle = {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const rightSideStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#EBE8D9',
        borderRadius: '0px 10px 10px 0px',
        padding: '20px',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
        height: '100vh', // Para ocupar toda a altura da tela
    };

    const headerStyle = {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#1E1F23',
        textShadow: '0px 2px 2px rgba(255,255,255,0.1)',
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        boxSizing: 'border-box',
        marginBottom: '10px',
        border: 'none',
        borderRadius: '5px',
        boxShadow: '0px 2px 2px rgba(0,0,0,0.1)',
    };

    const buttonStyle = {
        background: '#1E1F23',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        boxShadow: '0px 2px 2px rgba(0,0,0,0.1)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        fontSize: '14px',
        fontWeight: 'bold',
        marginTop: '10px',
    };

    const errorStyle = {
        color: 'red',
        marginBottom: '10px',
        fontSize: '14px',
        fontWeight: 'bold',
    };

    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '100%',
    };

    return (
        <div style={containerStyle}>
            <div style={leftSideStyle}>
                <img src={imagem} alt="Imagem" style={imageStyle} />
            </div>
            <div style={rightSideStyle}>
                <LoginNavBar />
                <div style={contentStyle}>
                    <div style={innerBoxStyle}>
                        <h2 style={headerStyle}>Login</h2>
                        {error && <p style={errorStyle}>{error}</p>}
                        <label>
                            Username:
                            <input
                                type="text"
                                style={inputStyle}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                style={inputStyle}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <button style={buttonStyle} onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

