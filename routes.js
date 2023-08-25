const express = require('express');
const pool = require('./database'); // Importe o módulo de conexão com o banco de dados

const router = express.Router();

// Rota para exibir as instruções de navegação
router.get('/instructions', async (req, res) => {
  try {
    const instructionsQuery = 'SELECT instruction_text FROM instructions'; // Substitua pelo nome da sua tabela de instruções
    const instructionsResult = await pool.query(instructionsQuery);
    const instructions = instructionsResult.rows;

    res.json(instructions); // Retorna as instruções como um JSON
  } catch (error) {
    console.error('Erro ao recuperar instruções:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;

