const express = require('express');
const path = require('path');
const pool = require('./database');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  try {
    const localsQuery = 'SELECT * FROM locals';
    const localsResult = await pool.query(localsQuery);
    const locals = localsResult.rows;

    res.render('index', { locals });
  } catch (error) {
    console.error('Erro ao recuperar locais:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

app.get('/getInstructions', async (req, res) => {
  try {
    const origemId = req.query.origem;
    const destinoId = req.query.destino;

    const instructionsQuery = 'SELECT instrucao FROM instructions WHERE origem_id = $1 AND destino_id = $2';
    const instructionsResult = await pool.query(instructionsQuery, [origemId, destinoId]);
    const instructions = instructionsResult.rows;

    res.json(instructions);
  } catch (error) {
    console.error('Erro ao buscar instruções:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

