import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Importa o CSS principal

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <div className="hamburger-icon" onClick={toggleMenu}>
        Menu &#9776;{/* Ícone de três linhas */}
      </div>
      {isOpen && (
        <ul className="hamburger-menu-list">
          <li className="hamburger-menu-item">
            <Link to="/SelectRoute" className="hamburger-menu-link" onClick={toggleMenu}>Rotas</Link>
          </li>
          <li className="hamburger-menu-item">
            <Link to="/eventos" className="hamburger-menu-link" onClick={toggleMenu}>Eventos</Link>
          </li>
          <li className="hamburger-menu-item">
            <Link to="/login" className="hamburger-menu-link" onClick={toggleMenu}>Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default HamburgerMenu;

