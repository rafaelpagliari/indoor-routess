const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Configuração da conexão com o banco de dados
const pool = new Pool({
  user: 'teste',
  host: 'localhost', // Ou endereço do servidor PostgreSQL
  database: 'indoor_routes',
  password: 'teste',
  port: 5432, // Porta padrão do PostgreSQL
});

// Importe a lógica de busca de rotas
const routeFinder = require('./routeFinder');

// Configuração do mecanismo de template EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Rota para renderizar a página inicial
app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM locals');
    const locals = result.rows;
    client.release();
    res.render('index.ejs', { locals });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

// Rota para processar o formulário de busca de rotas
app.get('/directions', async (req, res) => {
  const originId = req.query.origem;
  const destinationId = req.query.destino;

  try {
    const client = await pool.connect();

    // Consulta SQL para obter as conexões do banco de dados
    const connectionsQuery = 'SELECT * FROM connections';
    const connectionsResult = await client.query(connectionsQuery);
    const connections = connectionsResult.rows;

    // Construa o grafo a partir das conexões
    const graph = {};

    connections.forEach(connection => {
      const { origin_id, destination_id, distance } = connection;
      if (!graph[origin_id]) {
        graph[origin_id] = {};
      }
      graph[origin_id][destination_id] = distance;
    });

    // Calcule a rota mais curta usando o grafo construído
    const shortestPath = routeFinder.dijkstra(graph, originId, destinationId);
    const distance = calculateDistance(graph, shortestPath);

    client.release();

    res.render('directions.ejs', { shortestPath, distance });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

// Função para calcular a distância da rota
function calculateDistance(graph, path) {
  let distance = 0;

  for (let i = 0; i < path.length - 1; i++) {
    const currentNode = path[i];
    const nextNode = path[i + 1];
    const connectionDistance = parseInt(graph[currentNode][nextNode], 10); // Converter para número
    distance += connectionDistance;
  }

  return distance;
}

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});

