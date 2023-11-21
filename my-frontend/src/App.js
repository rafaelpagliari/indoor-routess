import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import SelectRoute from './components/SelectRoute'
import Eventos from './components/Eventos'
import CreateEventos from './components/CreateEventos'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

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
	                    <Route path="/Eventos" element={<Eventos />} />
	                              <Route path="/CreateEventos" element={<CreateEventos />} />
      </Routes>
    </Router>
  );
};

export default App;
