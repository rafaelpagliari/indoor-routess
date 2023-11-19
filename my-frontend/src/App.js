import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import SelectRoute from './components/SelectRoute'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Adiciona o token às configurações padrão do Axios
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login setToken={(newToken) => {
            setToken(newToken);
            // Armazena o novo token no localStorage
            localStorage.setItem('token', newToken);
          }} />}
        />
	          <Route path="/SelectRoute" element={<SelectRoute />} />
      </Routes>
    </Router>
  );
};

export default App;
