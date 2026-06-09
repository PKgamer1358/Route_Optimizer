// src/components/RoutePanel.jsx

import { VEHICLES } from '../data/vehicles.js';

export default function RoutePanel({
  nodes,
  source,
  setSource,
  dest,
  setDest,
  vehicle,
  setVehicle,
  onFindRoute
}) {
  const nodeNames = Object.keys(nodes).sort();

  return (
    <div className="p-4 bg-white shadow-md flex flex-col gap-4">
      <h2 className="text-xl font-bold">Route Options</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Source</label>
        <select
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        >
          <option value="">Select Source</option>
          {nodeNames.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Destination</label>
        <select
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
          value={dest}
          onChange={(e) => setDest(e.target.value)}
        >
          <option value="">Select Destination</option>
          {nodeNames.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
        <select
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
        >
          {Object.entries(VEHICLES).map(([key, v]) => (
            <option key={key} value={key}>{v.icon} {v.label}</option>
          ))}
        </select>
      </div>

      <button
        className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        onClick={onFindRoute}
        disabled={!source || !dest || source === dest}
      >
        Find Route
      </button>
    </div>
  );
}
