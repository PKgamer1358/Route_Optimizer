// src/hooks/useTraffic.js
import { useState, useEffect } from 'react';

// For demo purposes, occasionally "spike" traffic on random edges
export function useTraffic(baseEdges) {
  const [edges, setEdges] = useState(baseEdges);

  useEffect(() => {
    const interval = setInterval(() => {
      setEdges(prevEdges => prevEdges.map(edge => {
        // 10% chance to change traffic slightly
        if (Math.random() > 0.9) {
          const change = Math.random() > 0.5 ? 1 : -1;
          const newTraffic = Math.min(5, Math.max(1, edge.traffic + change));
          return { ...edge, traffic: newTraffic };
        }
        return edge;
      }));
    }, 15000); // Check every 15s

    return () => clearInterval(interval);
  }, [baseEdges]);

  return { edges };
}
