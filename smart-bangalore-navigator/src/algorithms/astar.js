// src/algorithms/astar.js
// Uses haversine heuristic — same approach as the C implementation
import { haversine } from '../utils/geo.js';
import { calculateTravelTime } from '../utils/traffic.js';
import { buildAdjacencyList, reconstructPath } from './routeEngine.js';

export function astar(graph, startNode, endNode) {
  const adj = buildAdjacencyList(graph.edges);
  const endCoord = graph.nodes[endNode];

  if (!endCoord) return [];

  const g = {}; // actual cost
  const f = {}; // g + heuristic
  const prev = {};
  const open = new Set([startNode]);
  const closed = new Set();

  Object.keys(graph.nodes).forEach(n => { g[n] = Infinity; f[n] = Infinity; });
  g[startNode] = 0;
  f[startNode] = haversine(graph.nodes[startNode], endCoord);

  while (open.size > 0) {
    const u = [...open].reduce((a, b) => f[a] < f[b] ? a : b);
    if (u === endNode) break;

    open.delete(u);
    closed.add(u);

    for (const { neighbor, dist, traffic } of (adj[u] || [])) {
      if (closed.has(neighbor)) continue;
      const tentativeG = g[u] + calculateTravelTime(dist, traffic);

      if (tentativeG < g[neighbor]) {
        prev[neighbor] = u;
        g[neighbor] = tentativeG;
        f[neighbor] = tentativeG + haversine(graph.nodes[neighbor], endCoord);
        open.add(neighbor);
      }
    }
  }

  return reconstructPath(prev, startNode, endNode);
}
