import React from 'react';
import { Link } from 'react-router-dom';

const LoginNavBar = () => {
  return (
    <nav style={navStyle}>
      <div style={navContainerStyle}>
        <ul style={ulStyle}>
          <li style={{ ...liStyle, marginRight: 'auto' }}>
            <Link to="/SelectRoute" style={linkStyle}>Rotas</Link>
          </li>
          <li style={liStyle}>
            <Link to="/eventos" style={linkStyle}>Eventos</Link>
          </li>
          <li style={liStyle}>
            <Link to="/3" style={linkStyle}>Tela Teste</Link>
          </li>
          <li style={{ marginLeft: 'auto', marginRight: '1rem' }}> {/* Adiciona margem à direita */}
            <Link to="/login" style={loginLinkStyle}>Login</Link>
          </li>
        </ul>
      </div>
      <hr style={hrStyle} /> {/* Adiciona um traço horizontal */}
    </nav>
  );
};

// Estilos
const navStyle = {
//  padding: '0rem',
  textAlign: 'center',
};

const navContainerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
};

const ulStyle = {
  listStyle: 'none',
  padding: 0,
  display: 'flex',
  justifyContent: 'center',
};

const liStyle = {
  margin: '0 2rem', // Aumenta o espaçamento entre as opções
};

const linkStyle = {
  textDecoration: 'none',
  color: '#000', // Texto preto
  fontSize: '1.2rem',
  transition: 'color 0.3s ease-in-out',
};

const loginLinkStyle = {
  ...linkStyle,
  color: '#fff',
  backgroundColor: '#000', // Fundo preto
  padding: '10px 30px', // Aumenta o espaçamento do botão de login
  borderRadius: '5px',
  transition: 'background-color 0.3s ease-in-out',
};

const hrStyle = {
  border: 'none',
  margin: '10px 0',
};

export default LoginNavBar;

