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

// Função para encontrar uma rota usando busca em profundidade (DFS)
function findRoute(graph, start, end, visited = new Set(), route = []) {
  if (start === end) {
    // Chegou ao destino, retorne a rota encontrada
    return [...route, start];
  }

  visited.add(start);

  for (const neighbor in graph[start]) {
    if (!visited.has(neighbor)) {
      const foundRoute = findRoute(graph, neighbor, end, visited, [...route, start]);
      if (foundRoute) {
        return foundRoute;
      }
    }
  }

  return null; // Rota não encontrada
}

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

    // Encontre a rota de origem para destino
    const routeFromOriginToDestination = findRoute(graph, originId, destinationId);

    // Encontre a rota de destino para origem
    const routeFromDestinationToOrigin = findRoute(graph, destinationId, originId);

    let shortestRoute = null;

    // Verifique qual rota é mais curta (ou se ambas são nulas)
    if (routeFromOriginToDestination && routeFromDestinationToOrigin) {
      const distanceOriginToDestination = calculateDistance(graph, routeFromOriginToDestination);
      const distanceDestinationToOrigin = calculateDistance(graph, routeFromDestinationToOrigin);

      if (distanceOriginToDestination <= distanceDestinationToOrigin) {
        shortestRoute = routeFromOriginToDestination;
      } else {
        shortestRoute = routeFromDestinationToOrigin.reverse(); // Inverta a ordem da rota
      }
    } else if (routeFromOriginToDestination) {
      shortestRoute = routeFromOriginToDestination;
    } else if (routeFromDestinationToOrigin) {
      shortestRoute = routeFromDestinationToOrigin.reverse(); // Inverta a ordem da rota
    }

    if (shortestRoute) {
      const distance = calculateDistance(graph, shortestRoute);
      client.release();
      res.render('directions.ejs', { shortestPath: shortestRoute, distance });
    } else {
      client.release();
      res.send('Rota não encontrada');
    }
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

    // Verifique se há uma conexão direta entre currentNode e nextNode
    if (graph[currentNode] && graph[currentNode][nextNode]) {
      distance += parseInt(graph[currentNode][nextNode], 10);
    }
  }

  return distance;
}

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});

