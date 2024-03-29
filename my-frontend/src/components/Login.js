import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

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

  return (
    <div style={containerStyle}>
      <NavBar />
      <div style={centerStyle}>
        <div style={{ ...loginBoxStyle, backgroundColor: '#40E0D0' }}>
          <h2 style={headerStyle}>Login</h2>
          {error && <p style={errorStyle}>{error}</p>}
          <label style={labelStyle}>
            Username:
            <input
              type="text"
              style={{ ...inputStyle, borderRadius: '5px' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label style={labelStyle}>
            Password:
            <input
              type="password"
              style={{ ...inputStyle, borderRadius: '5px' }}
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
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  background: '#fff', // Fundo branco
};

const centerStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const loginBoxStyle = {
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  width: '300px',
};

const headerStyle = {
  fontSize: '24px',
  marginBottom: '20px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '10px',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  boxSizing: 'border-box',
  marginBottom: '10px',
  border: 'none',
};

const buttonStyle = {
  background: '#C345A',
  color: '#000',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
};

const errorStyle = {
  color: 'red',
  marginBottom: '10px',
};

export default Login;

