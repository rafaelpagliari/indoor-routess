const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;
const bodyParser = require('body-parser'); // Importe o body-parser

//ajuste
const pool = new Pool({
  user: 'teste',
  host: 'localhost',
  database: 'indoor_routes',
  password: 'sua_senha',
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));


// Importe a lógica de busca de rotas
const routeFinder = require('./routeFinder');

// Configuração do mecanismo de template EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get('/cadastro-evento', (req, res) => {
  res.render('eventos.ejs'); // Renderiza a página 'eventos.ejs'
});

// Rota para lidar com o envio do formulário e inserção de dados no banco
app.post('/cadastro-evento', (req, res) => {
  const { tipo, titulo, descricao, data, id_locals } = req.body;

  // Aqui você pode inserir os dados no banco usando o pool do PostgreSQL
  // Certifique-se de validar os dados e usar consultas preparadas para segurança

  // Exemplo simples de inserção de dados no banco
  pool.query('INSERT INTO eventos (tipo, titulo, descricao, data, id_locals) VALUES ($1, $2, $3, $4, $5)', [tipo, titulo, descricao, data, id_locals], (error, results) => {
    if (error) {
      res.render('eventos.ejs', { mensagemErro: 'Erro ao cadastrar o evento.' });
    } else {
      res.render('eventos.ejs', { mensagemSucesso: 'Evento cadastrado com sucesso.' });
    }
  });
});

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

    // Consulta SQL para obter os locais do banco de dados
    const localsQuery = 'SELECT * FROM locals';
    const localsResult = await client.query(localsQuery);
    const localsMap = new Map(localsResult.rows.map(row => [row.id, row.name]));

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
  const instructions = await generateInstructions(graph, shortestRoute, localsMap); // Alteração aqui
  client.release();
  res.render('directions.ejs', { shortestPath: shortestRoute, distance, instructions });
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

// Função para gerar instruções com base na rota
async function generateInstructions(graph, path, localsMap) {
  const instructions = [];
  try {
    const client = await pool.connect();
    for (let i = 0; i < path.length - 1; i++) {
      const currentNode = path[i];
      const nextNode = path[i + 1];

      if (graph[currentNode] && graph[currentNode][nextNode]) {
        const distance = parseInt(graph[currentNode][nextNode], 10);
        const direction = getDirection(currentNode, nextNode, localsMap);
        const currentLocalId = currentNode;
        const nextLocalId = nextNode;

        // Consulta SQL para obter o nome do local atual
        const currentLocalQuery = `SELECT name FROM locals WHERE id = ${currentLocalId}`;
        const currentLocalResult = await client.query(currentLocalQuery);
        const currentLocalName = currentLocalResult.rows[0].name;

        // Consulta SQL para obter o nome do próximo local
        const nextLocalQuery = `SELECT name FROM locals WHERE id = ${nextLocalId}`;
        const nextLocalResult = await client.query(nextLocalQuery);
        const nextLocalName = nextLocalResult.rows[0].name;

        // Define a direção correta com base na distância
        let turnDirection = '';
        if (distance === 22) {
          // Verifica a ordem dos locais para determinar a direção
          const currentLocalNumber = parseInt(currentLocalName.replace('Sala ', ''), 10);
          const nextLocalNumber = parseInt(nextLocalName.replace('Sala ', ''), 10);
          if (currentLocalNumber < nextLocalNumber) {
            turnDirection = 'direita';
          } else {
            turnDirection = 'esquerda';
          }
          instructions.push(`Vire a ${turnDirection}.`);
        } else {
          instructions.push(`Siga de ${currentLocalName} para ${nextLocalName} por ${distance} metros.`);
        }
      }
    }
    instructions.push('Você chegou ao seu destino.');
    client.release();
  } catch (err) {
    console.error(err);
    instructions.push('Erro ao gerar instruções.');
  }
  return instructions;
}


// Função para determinar a direção (esquerda ou direita)
function getDirection(currentNode, nextNode, localsMap) {
  const currentLocal = localsMap.get(currentNode);
  const nextLocal = localsMap.get(nextNode);

  // Por padrão, "direita" como exemplo.
  return 'direita';
}

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});

