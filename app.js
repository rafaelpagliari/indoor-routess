const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000; // Escolha a porta que desejar

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

// Rota para renderizar a página inicial
app.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM locais'; // Substitua 'locais' pelo nome da sua tabela
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
    const origem = req.query.origem;
    const destino = req.query.destino;

    // Implemente a lógica para encontrar a rota mais próxima no banco de dados aqui

    // Renderize a página com as direções ou a representação visual da rota
    res.render('directions.ejs', { /* Dados da rota encontrada */ });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

