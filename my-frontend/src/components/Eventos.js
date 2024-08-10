import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import './eventos.css';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const fetchEventList = async () => {
      try {
        const response = await axios.get('http://186.237.58.74:3001/get-event-list', {
          headers: {
            Authorization: `Bearer ${token}`,
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://186.237.58.74:3001/delete-event/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setEventos(eventos.filter(evento => evento.id !== id));
    } catch (error) {
      console.error('Erro ao excluir o evento:', error);
    }
  };

  return (
    <div className="container">
      <NavBar />
      <div className="content">
        <h2>Eventos</h2>
        {isLoggedIn && (
          <div className="create-event-button-container">
            <Link to="/CreateEventos">
              <button className="create-event-button">Criar Evento</button>
            </Link>
          </div>
        )}
        <br />
        <div className="eventos-container">
          {eventos.map((evento) => (
            <div key={evento.id} className="evento-box">
              <h3>{evento.titulo}</h3>
              <p>{evento.descricao}</p>
              <p>Data: {format(new Date(evento.data), 'dd/MM/yyyy HH:mm')}</p>
              <p>Tipo: {evento.tipo}</p>
              {isLoggedIn && (
                <div className="delete-button-container">
                  <button className="delete-button" onClick={() => handleDelete(evento.id)}>Excluir</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Eventos;

