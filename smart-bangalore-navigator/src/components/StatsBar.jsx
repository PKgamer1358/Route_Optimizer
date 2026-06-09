// src/components/StatsBar.jsx


export default function StatsBar({ route }) {
  if (!route) return <div className="bg-white p-4 shadow-sm border-b">Select a route to see details.</div>;

  return (
    <div className="bg-white p-4 shadow-sm border-b flex justify-around items-center">
      <div className="text-center">
        <p className="text-xs text-gray-500 uppercase font-semibold">Distance</p>
        <p className="text-lg font-bold">{route.dist.toFixed(1)} km</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-500 uppercase font-semibold">ETA</p>
        <p className="text-lg font-bold">{route.time.toFixed(1)} min</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-500 uppercase font-semibold">Fuel Cost</p>
        <p className="text-lg font-bold text-green-600">₹{route.fuel.cost}</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-500 uppercase font-semibold">Traffic Level</p>
        <p className="text-lg font-bold text-orange-600">{route.avgTraffic.toFixed(1)} / 5</p>
      </div>
    </div>
  );
}
