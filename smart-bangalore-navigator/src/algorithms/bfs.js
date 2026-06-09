// src/algorithms/bfs.js
import { buildAdjacencyList } from './routeEngine.js';

// Finds path with lowest total traffic severity — ported from C BFS logic
export function bfsMinTraffic(graph, startNode, endNode) {
  const adj = buildAdjacencyList(graph.edges);
  const queue = [{ node: startNode, traffic: 0, path: [startNode] }];
  const visited = new Set();

  // We want the path with minimum overall traffic, so we use a priority queue based approach
  // instead of plain BFS to find the minimal traffic cost path.
  while (queue.length > 0) {
    queue.sort((a, b) => a.traffic - b.traffic);
    const { node, traffic, path } = queue.shift();
    if (node === endNode) return path;
    if (visited.has(node)) continue;
    visited.add(node);

    for (const { neighbor, traffic: edgeTraffic } of (adj[node] || [])) {
      if (!visited.has(neighbor)) {
        queue.push({
          node: neighbor,
          traffic: traffic + edgeTraffic,
          path: [...path, neighbor]
        });
      }
    }
  }
  return [];
}
