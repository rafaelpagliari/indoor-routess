// Função de busca de rota usando o algoritmo de Dijkstra
function dijkstra(graph, startNode, endNode) {
  const distances = {};
  const previousNodes = {};
  const queue = [];
  let shortestPath = [];

  for (const node in graph) {
    distances[node] = Infinity;
    previousNodes[node] = null;
    queue.push(node);
  }
  distances[startNode] = 0;

  function getClosestNode(queue, distances) {
    return queue.reduce((minNode, node) => (
      distances[node] < distances[minNode] ? node : minNode
    ), queue[0]);
  }

  while (queue.length > 0) {
    const currentNode = getClosestNode(queue, distances);
    queue.splice(queue.indexOf(currentNode), 1);

    if (currentNode === endNode) {
      shortestPath = buildPath(endNode, previousNodes);
      break;
    }

    for (const neighbor in graph[currentNode]) {
      const distanceFromCurrent = graph[currentNode][neighbor];
      const totalDistance = distances[currentNode] + distanceFromCurrent;

      if (totalDistance < distances[neighbor]) {
        distances[neighbor] = totalDistance;
        previousNodes[neighbor] = currentNode;
      }
    }
  }

  function buildPath(endNode, previousNodes) {
    const path = [endNode];
    let currentNode = endNode;

    while (previousNodes[currentNode] !== null) {
      path.unshift(previousNodes[currentNode]);
      currentNode = previousNodes[currentNode];
    }

    return path;
  }

  return shortestPath;
}

module.exports = {
  dijkstra,
};
//https://elemarjr.com/clube-de-estudos/algoritmo-de-dijkstra-entendendo-o-caminho-minimo-em-grafos-ponderados/#:~:text=O%20Algoritmo%20de%20Dijkstra%20%C3%A9%20uma%20ferramenta%20muito%20%C3%BAtil%20para,pontos%20em%20um%20grafo%20ponderado.
