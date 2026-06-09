import { useState, useMemo } from 'react';
import MapView from './components/MapView';
import RoutePanel from './components/RoutePanel';
import RouteCard from './components/RouteCard';
import StatsBar from './components/StatsBar';
import TrafficLegend from './components/TrafficLegend';
import AdminPanel from './components/AdminPanel';
import HistoryPanel from './components/HistoryPanel';
import AnalyticsPanel from './components/AnalyticsPanel';

import { NODES, EDGES } from './data/graph.js';
import { INITIAL_INCIDENTS } from './data/incidents.js';
import { useTraffic } from './hooks/useTraffic.js';
import { useRoutes } from './hooks/useRoutes.js';
import { useHistory } from './hooks/useHistory.js';

function App() {
  const [source, setSource] = useState('');
  const [dest, setDest] = useState('');
  const [vehicle, setVehicle] = useState('car');
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [showAdmin, setShowAdmin] = useState(false);

  // Dynamic traffic updates
  const { edges } = useTraffic(EDGES);
  const graph = useMemo(() => ({ nodes: NODES, edges }), [edges]);

  const { routes, loading, recalculate } = useRoutes(graph, source, dest, vehicle, incidents);
  const history = useHistory();

  const handleFindRoute = () => {
    recalculate();
    if (source && dest) {
      history.save(source, dest, vehicle, 'all');
    }
  };

  const handleHistorySelect = (s, d, v) => {
    setSource(s);
    setDest(d);
    setVehicle(v);
    // Recalculate will trigger via useEffect in useRoutes once state updates if logic was built that way,
    // but better to explicitly trigger or let the UI button do it.
  };

  return (
    <div className="h-screen flex flex-col font-sans text-gray-800">
      {/* Header */}
      <header className="bg-blue-800 text-white p-4 flex justify-between items-center shadow-md z-10">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🚦 Smart Bangalore Traffic Navigator
        </h1>
        <button
          onClick={() => setShowAdmin(!showAdmin)}
          className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-sm font-semibold"
        >
          ⚙️ Admin
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left Sidebar */}
        <div className="w-80 flex flex-col bg-gray-100 overflow-y-auto border-r shadow-lg z-10">
          <RoutePanel
            nodes={NODES}
            source={source} setSource={setSource}
            dest={dest} setDest={setDest}
            vehicle={vehicle} setVehicle={setVehicle}
            onFindRoute={handleFindRoute}
          />

          <div className="flex-1 p-4 overflow-y-auto">
            {loading && <div className="text-center py-4">Calculating routes...</div>}

            {!loading && routes.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Results</h3>
                {routes.map(r => <RouteCard key={r.type} route={r} />)}
              </div>
            )}
          </div>

          <HistoryPanel history={history.historyItems} onSelect={handleHistorySelect} />
        </div>

        {/* Right Map Area */}
        <div className="flex-1 relative flex flex-col">
          <StatsBar route={routes.length > 0 ? routes.find(r => r.type === 'fastest') || routes[0] : null} />

          <div className="flex-1 relative z-0">
            <MapView
              routes={routes}
              incidents={incidents}
              sourceNode={NODES[source] ? {name: source, ...NODES[source]} : null}
              destNode={NODES[dest] ? {name: dest, ...NODES[dest]} : null}
            />
            <TrafficLegend />
            {showAdmin && <AdminPanel incidents={incidents} setIncidents={setIncidents} graphNodes={NODES} />}
          </div>

          <div className="z-10">
             <AnalyticsPanel history={history.historyItems} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
