import React from 'react';
import { Link } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu'; // Verifique o caminho aqui
import '../App.css'; // Importa o CSS principal

const NavBar = () => {
  return (
    <>
      {/* Exibe a NavBar apenas em desktops */}
      <nav className="navbar">
        <div className="navbar-container">
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link to="/SelectRoute" className="navbar-link">Rotas</Link>
            </li>
            <li className="navbar-item">
              <Link to="/eventos" className="navbar-link">Eventos</Link>
            </li>
            <li className="navbar-item">
              <Link to="/3" className="navbar-link">Tela Teste</Link>
            </li>
            <li className="navbar-item login-button">
              <Link to="/login" className="login-link">Login</Link>
            </li>
          </ul>
        </div>
        <hr className="navbar-divider" />
      </nav>

      {/* Exibe o HamburgerMenu apenas em dispositivos móveis */}
      <HamburgerMenu />
    </>
  );
};

export default NavBar;

