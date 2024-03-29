import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import './css.css';

const SelectRoute = () => {
  const [locals, setLocals] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const fetchLocals = async () => {
      try {
        const response = await axios.get('http://186.237.58.74:3001/get-locals', { 
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setLocals(response.data.locals);
      } catch (error) {
        console.error('Erro ao buscar locais:', error);
      }
    };

    fetchLocals(); 
  }, []);

  const handleSearchRoute = async () => {
    try {
      const response = await axios.get('http://186.237.58.74:3001/directions', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        params: { origem: origin, destino: destination },
      });

      setRoute(response.data.shortestPath);
      setDistance(response.data.distance);
    } catch (error) {
      console.error('Erro ao buscar rota:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="select-route-container">
        <h2>Selecionar Rota</h2>
        <div>
          <label>Origem:
            <select className="custom-select" value={origin} onChange={(e) => setOrigin(e.target.value)}>
              <option value="">Selecione a Origem</option>
              {locals.map((local) => (
                <option key={local.id} value={local.id}>
                  {local.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>Destino:
            <select className="custom-select" value={destination} onChange={(e) => setDestination(e.target.value)}>
              <option value="">Selecione o Destino</option>
              {locals.map((local) => (
                <option key={local.id} value={local.id}>
                  {local.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button className="search-button" onClick={handleSearchRoute}>Buscar Rota</button>
        {route.length > 0 && (
          <div>
            <h3>Rota Encontrada:</h3>
            <p>{route.join(' -> ')}</p>
            <p>Distância: {distance} metros</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectRoute;

