// src/hooks/useHistory.js
import { useState, useCallback } from 'react';

const HISTORY_KEY = 'sbtn_route_history';

export function useHistory() {
  const [historyItems, setHistoryItems] = useState(() => {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  });

  const save = useCallback((source, dest, vehicle, chosenRouteType) => {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    const updatedHistory = [{ source, dest, vehicle, chosenRouteType, timestamp: Date.now() }, ...history].slice(0, 50);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory)); // keep last 50
    setHistoryItems(updatedHistory);
  }, []);

  const load = useCallback(() => historyItems, [historyItems]);

  const clear = useCallback(() => {
    localStorage.removeItem(HISTORY_KEY);
    setHistoryItems([]);
  }, []);

  return { save, load, clear, historyItems };
}
