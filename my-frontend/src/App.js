import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import SelectRoute from './components/SelectRoute';
import Eventos from './components/Eventos';
import CreateEventos from './components/CreateEventos';
import './App.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, [token]);

  const PrivateRoute = ({ element, ...rest }) => {
    if (!token) {
      setErrorMessage('Você não tem permissão para acessar esta página. Deseja fazer login?');
      return <Navigate to="/login" />;
    }
    return element;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={(newToken) => {
          setToken(newToken);
          localStorage.setItem('token', newToken);
        }} errorMessage={errorMessage} />} />
        <Route path="/SelectRoute" element={<SelectRoute />} />
        <Route path="/eventos" element={<Eventos token={token} />} />
        <Route path="/CreateEventos" element={<PrivateRoute element={<CreateEventos />} />} />
      </Routes>
    </Router>
  );
};

export default App;

