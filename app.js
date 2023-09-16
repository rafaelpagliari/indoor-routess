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

// Configuração do Express para usar EJS como mecanismo de template
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Importe a lógica de busca de rotas
const routeFinder = require('./routeFinder');

// Rota para renderizar a página inicial
app.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM locals'; // Substitua 'locals' pelo nome da sua tabela
    const { rows } = await pool.query(query);

    res.render('index.ejs', { locals: rows });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Rota para processar o formulário de busca de rotas
app.get('/directions', async (req, res) => {
  try {
    const origemId = parseInt(req.query.origem);
    const destinoId = parseInt(req.query.destino);

    // Use a lógica de busca de rotas do módulo routeFinder
    const shortestPath = await routeFinder.findShortestPath(origemId, destinoId);

    // Renderize a página com as direções ou a representação visual da rota
    res.render('directions.ejs', { shortestPath });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

