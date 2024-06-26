import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={navStyle}>
      <div style={navContainerStyle}>
        <ul style={ulStyle}>
          <li style={liStyle}>
            <Link to="/SelectRoute" style={linkStyle}>Rotas</Link>
          </li>
          <li style={liStyle}>
            <Link to="/eventos" style={linkStyle}>Eventos</Link>
          </li>
	  <li style={liStyle}>
            <Link to="/3" style={linkStyle}>Tela Teste</Link>
          </li>
          <li style={{ flex: '1', textAlign: 'right' }}>
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
  background: '#fff', // Fundo branco
//  padding: '0rem',
  textAlign: 'center',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
  margin: '0 1rem',
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
  padding: '10px 50px',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease-in-out',
};

const hrStyle = {
  border: 'none',
  margin: '10px 0',
};

export default NavBar;
