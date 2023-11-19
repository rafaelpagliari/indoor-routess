// my-frontend/src/components/SelectRoute.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectRoute = () => {
  const [locals, setLocals] = useState([]); // Alteração no nome da variável
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    // Ao montar o componente, busca as localizações disponíveis
    const fetchLocals = async () => { // Alteração no nome da função
      try {
        const response = await axios.get('http://186.237.57.106:3001/get-locals', { // Alteração na rota
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setLocals(response.data.locals); // Alteração no nome da variável
      } catch (error) {
        console.error('Erro ao buscar locais:', error); // Alteração na mensagem de erro
      }
    };

    fetchLocals(); // Alteração no nome da função
  }, []);

  const handleSearchRoute = async () => {
    try {
      const response = await axios.get('http://186.237.57.106:3001/directions', {
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
      <h2>Selecionar Rota</h2>
      <div>
        <label>Origem:
          <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
            <option value="">Selecione a Origem</option>
            {locals.map((local) => ( // Alteração no nome da variável
              <option key={local.id} value={local.id}> {/* Alteração no nome da variável */}
                {local.name} {/* Alteração no nome da variável */}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>Destino:
          <select value={destination} onChange={(e) => setDestination(e.target.value)}>
            <option value="">Selecione o Destino</option>
            {locals.map((local) => ( // Alteração no nome da variável
              <option key={local.id} value={local.id}> {/* Alteração no nome da variável */}
                {local.name} {/* Alteração no nome da variável */}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button onClick={handleSearchRoute}>Buscar Rota</button>
      {route.length > 0 && (
        <div>
          <h3>Rota Encontrada:</h3>
          <p>{route.join(' -> ')}</p>
          <p>Distância: {distance} unidades</p>
        </div>
      )}
    </div>
  );
};

export default SelectRoute;

