import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

const CreateEventos = ({ history }) => {
  const [tipo, setTipo] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [idLocals, setIdLocals] = useState('');
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    const fetchLocais = async () => {
      try {
        const response = await axios.get('http://186.237.58.74:3001/get-locals', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setLocais(response.data.locals);
      } catch (error) {
        console.error('Erro ao buscar locais:', error);
      }
    };

    fetchLocais();
  }, []);

  const handleCreateEvent = async () => {
    try {
      await axios.post('http://186.237.58.74:3001/cadastro-evento', {
        tipo,
        titulo,
        descricao,
        data,
        id_locals: idLocals,
      });

      history.push('/eventos');
    } catch (error) {
      console.error('Erro ao cadastrar o evento:', error);
    }
  };
	return (
  <div>
    <NavBar />
    <div className="container">
      <div className="create-eventos-container">
        <h2>Criar Evento</h2>
        <div>
          <label>Tipo:
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="">Selecione o Tipo</option>
              <option value="sala">Sala</option>
              <option value="evento">Evento</option>
            </select>
          </label>
        </div>
        <div>
          <label>Título:
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          </label>
        </div>
        <div>
          <label>Descrição:
            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          </label>
        </div>
        <div>
          <label>Data:
            <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
          </label>
        </div>
        <div>
		<label>Local:
          <select value={idLocals} onChange={(e) => setIdLocals(e.target.value)}>
            <option value="">Selecione o Local</option>
            {locais.map((local) => (
              <option key={local.id} value={local.id}>
                {local.name}
              </option>
            ))}
          </select>
        </label>
        </div>
        <button onClick={handleCreateEvent}>Criar Evento</button>
      </div>
    </div>
  </div>
);

};

export default CreateEventos;
