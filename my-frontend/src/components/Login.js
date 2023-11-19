import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://186.237.57.106:3001/login', {
        username,
        password,
      });

      const { token } = response.data;

      // Armazena o token no localStorage
      localStorage.setItem('token', token);

      setToken(token);

      // Redireciona para o ? após login
      navigate('/SelectRoute');
    } catch (error) {
      console.error('Erro durante o login:', error);
    }
  };

  return (
    <div style={containerStyle}>
      <NavBar />
      <div style={centerStyle}>
        <div style={loginBoxStyle}>
          <h2 style={headerStyle}>Login</h2>
          <label style={labelStyle}>
            Username:
            <input type="text" style={inputStyle} value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label style={labelStyle}>
            Password:
            <input type="password" style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button style={buttonStyle} onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

// Estilos
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  background: '#F8D4BA',
};

const centerStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const loginBoxStyle = {
  background: '#D69F3A',
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
};

const buttonStyle = {
  background: '#C345A',
  color: '#000',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Login;
