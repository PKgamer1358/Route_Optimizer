// src/algorithms/dijkstra.js
import { buildAdjacencyList, reconstructPath } from './routeEngine.js';

export function dijkstra(graph, startNode, endNode) {
  const adj = buildAdjacencyList(graph.edges);
  const dist = {};
  const prev = {};
  const visited = new Set();

  Object.keys(graph.nodes).forEach(n => dist[n] = Infinity);
  dist[startNode] = 0;

  // Min-priority queue (simple array for demo; use heap for production)
  const pq = [{ node: startNode, cost: 0 }];

  while (pq.length > 0) {
    pq.sort((a, b) => a.cost - b.cost);
    const { node: u } = pq.shift();

    if (visited.has(u)) continue;
    visited.add(u);
    if (u === endNode) break;

    for (const { neighbor, dist: edgeDist } of (adj[u] || [])) {
      const newDist = dist[u] + edgeDist;
      if (newDist < dist[neighbor]) {
        dist[neighbor] = newDist;
        prev[neighbor] = u;
        pq.push({ node: neighbor, cost: newDist });
      }
    }
  }

  return reconstructPath(prev, startNode, endNode);
}
