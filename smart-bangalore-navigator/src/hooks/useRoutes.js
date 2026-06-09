// src/hooks/useRoutes.js
import { useState, useEffect, useCallback } from 'react';
import { findAllRoutes } from '../algorithms/routeEngine.js';
import { haversine } from '../utils/geo.js';

export function useRoutes(graph, source, dest, vehicle, incidents) {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);

  const recalculate = useCallback(() => {
    if (!source || !dest || !graph || !graph.nodes[source] || !graph.nodes[dest]) {
        return [];
    }

    // Temporarily raise traffic on incident edges
    const modifiedEdges = graph.edges.map(e => {
      const affectedIncident = incidents.find(inc => {
          const srcDist = haversine(graph.nodes[e.src], inc);
          const dstDist = haversine(graph.nodes[e.dst], inc);
          return srcDist < 0.5 || dstDist < 0.5;
      });
      return affectedIncident ? { ...e, traffic: 5, dist: e.dist * 10 } : e;
    });

    const result = findAllRoutes({ ...graph, edges: modifiedEdges }, source, dest, vehicle);
    return result;
  }, [source, dest, vehicle, incidents, graph]);

  useEffect(() => {
    if (source && dest) {
      const timeoutId = setTimeout(() => {
        const result = recalculate();
        setRoutes(result);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [recalculate, source, dest]);

  // Simulated live recalculation every 60 seconds
  useEffect(() => {
    if (source && dest) {
      const id = setInterval(() => {
          setLoading(true);
          const result = recalculate();
          setRoutes(result);
          setLoading(false);
      }, 60000);
      return () => clearInterval(id);
    }
  }, [recalculate, source, dest]);

  return { routes, loading, recalculate };
}
