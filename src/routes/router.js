const express = require('express');
const router = express.Router();

module.exports = (app, pool) => {
    app.post('/cadastro-evento', (req, res) => {
        const { tipo, titulo, descricao, data, id_locals } = req.body;

        pool.query('INSERT INTO eventos (tipo, titulo, descricao, data, id_locals) VALUES ($1, $2, $3, $4, $5)', [tipo, titulo, descricao, data, id_locals], (error, results) => {
            if (error) {
                res.status(500).json({ success: false, message: 'Erro ao cadastrar o evento.' });
            } else {
                res.status(200).json({ success: true, message: 'Evento cadastrado com sucesso.' });
            }
        });
    });

    app.get('/get-event-info', async (req, res) => {
        const locationId = req.query.locationId;

        const eventQuery = 'SELECT tipo, titulo, descricao, data FROM eventos WHERE id_locals = $1';
        try {
            const client = await pool.connect();
            const eventResult = await client.query(eventQuery, [locationId]);
            client.release();

            if (eventResult.rows.length > 0) {
                const eventInfo = eventResult.rows;
                res.json({ eventInfo });
            } else {
                res.json({ eventInfo: null });
            }
        } catch (error) {
            console.error('Erro ao buscar informações do evento:', error);
            res.status(500).json({ eventInfo: null });
        }
    });

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
                res.json({ shortestPath: shortestRoute, distance });
            } else {
                res.status(404).json({ message: 'Rota não encontrada' });
            }

            client.release();
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erro no servidor' });
        }
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

    return router;
};

