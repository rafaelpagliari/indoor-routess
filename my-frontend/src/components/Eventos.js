import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import './eventos.css';
import { Link } from 'react-router-dom';

const Eventos = ({ token }) => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventList = async () => {
      try {
        const response = await axios.get('http://186.237.58.74:3001/get-event-list', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        const { eventList } = response.data;

        if (eventList) {
          setEventos(eventList);
        } else {
          setEventos([]);
        }
      } catch (error) {
        console.error('Erro ao buscar lista de eventos:', error);
      }
    };

    fetchEventList();
  }, []);

  return (
    <div className="container">
      <NavBar />
      <div className="content">
        <h2>Eventos</h2>
        {token && (
          <Link to="/CreateEventos">
            <button>Criar Evento</button>
          </Link>
        )}
        <br />
        <div className="eventos-container">
          {eventos.map((evento, index) => (
            <div key={index} className="evento-box">
              <h3>{evento.titulo}</h3>
              <p>{evento.descricao}</p>
              <p>Data: {evento.data}</p>
              <p>Tipo: {evento.tipo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Eventos;

