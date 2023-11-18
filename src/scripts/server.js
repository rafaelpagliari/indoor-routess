const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const verifyJWT = require('/var/www/html2/verifyJWT');
const jwt = require('jsonwebtoken');
const path = require('path');
const router = require('../routes/router'); // Importe o roteador

const app = express();
const port = 3001;

const pool = new Pool({
  user: 'teste',
  host: 'localhost',
  database: 'indoor_routes',
  password: 'sua_senha',
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do mecanismo de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const routes = router(app, pool); // Passe o app e o pool para o roteador

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Consultar banco de dados para encontrar o usuário
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        const user = result.rows[0];

        // Verificar a senha em texto simples
        if (user.password !== password) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Criar um objeto payload com as informações do usuário
        const payload = {
            username: user.username,
            userId: user.userId,
        };

        // Gerar um token JWT com TTL de 1 hora
        const token = jwt.sign(payload, 'seu_segredo_jwt', { expiresIn: '1h' });

        // Enviar o token como resposta
        res.json({ token });
    } catch (error) {
        console.error('Erro durante a autenticação:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

app.use(verifyJWT);

app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});

