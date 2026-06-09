// src/algorithms/routeEngine.js
import { dijkstra }       from './dijkstra.js';
import { astar }          from './astar.js';
import { bfsMinTraffic }  from './bfs.js';
import { calculateTravelTime, getPeakHourMultiplier } from '../utils/traffic.js';
import { estimateFuel, VEHICLES }   from '../data/vehicles.js';

export function buildAdjacencyList(edges) {
  const adj = {};
  for (const edge of edges) {
    if (!adj[edge.src]) adj[edge.src] = [];
    adj[edge.src].push({ neighbor: edge.dst, dist: edge.dist, traffic: edge.traffic });
  }
  return adj;
}

export function reconstructPath(prev, startNode, endNode) {
  const path = [];
  let curr = endNode;
  while (curr) {
    path.unshift(curr);
    if (curr === startNode) break;
    curr = prev[curr];
  }
  return path[0] === startNode ? path : [];
}

export function findEdge(edges, src, dst) {
  return edges.find(e => e.src === src && e.dst === dst);
}

export function findAllRoutes(graph, source, destination, vehicleType) {
  if (!source || !destination || source === destination) return [];

  const mult = getPeakHourMultiplier();
  const vehicle = VEHICLES[vehicleType] || VEHICLES['car'];

  const pathsRaw = {
    fastest:  astar(graph, source, destination),
    shortest: dijkstra(graph, source, destination),
    traffic:  bfsMinTraffic(graph, source, destination),
  };

  // Fuel-efficient = dijkstra but filtered to avoid high-traffic edges > 3
  const lightGraph = { ...graph, edges: graph.edges.filter(e => e.traffic <= 3) };
  let fuelPath = dijkstra(lightGraph, source, destination);
  if (!fuelPath || fuelPath.length === 0) {
    fuelPath = pathsRaw.shortest;
  }
  pathsRaw.fuel = fuelPath;

  return Object.entries(pathsRaw).map(([type, path]) => {
    if (!path || path.length === 0) return null;
    const stats = computePathStats(path, graph, vehicle.speedMult * mult);
    return {
      type,
      label: { fastest: 'Fastest', shortest: 'Shortest', fuel: 'Fuel Efficient', traffic: 'Least Traffic' }[type],
      path: path.map(n => ({ name: n, ...graph.nodes[n] })),
      ...stats,
      fuel: estimateFuel(stats.dist, vehicleType),
    };
  }).filter(r => r !== null && r.path.length > 0);
}

function computePathStats(path, graph, speedMult) {
  let dist = 0, time = 0, avgTraffic = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const edge = findEdge(graph.edges, path[i], path[i+1]);
    if (!edge) continue;
    dist += edge.dist;
    time += calculateTravelTime(edge.dist, edge.traffic, speedMult);
    avgTraffic += edge.traffic;
  }
  return { dist, time, avgTraffic: avgTraffic / Math.max(path.length - 1, 1) };
}
