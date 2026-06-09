// src/components/RouteCard.jsx
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TYPE_STYLES = {
  fastest: 'border-blue-500 bg-blue-50',
  shortest: 'border-green-500 bg-green-50',
  fuel: 'border-yellow-500 bg-yellow-50',
  traffic: 'border-purple-500 bg-purple-50',
};

export default function RouteCard({ route }) {
  const [expanded, setExpanded] = useState(false);
  const styles = TYPE_STYLES[route.type] || 'border-gray-300 bg-gray-50';

  return (
    <div className={`border-l-4 p-4 rounded shadow-sm ${styles} mb-2`}>
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div>
          <h3 className="font-bold text-lg">{route.label}</h3>
          <p className="text-sm text-gray-600">
            {route.dist.toFixed(1)} km • {route.time.toFixed(1)} min • ₹{route.fuel.cost}
          </p>
        </div>
        <div>
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {expanded && (
        <div className="mt-3 text-sm text-gray-700">
          <p><strong>Avg Traffic Level:</strong> {route.avgTraffic.toFixed(1)} / 5</p>
          <p><strong>Fuel Est:</strong> {route.fuel.litres}L</p>
          <div className="mt-2 pl-2 border-l-2 border-gray-300">
            <h4 className="font-semibold mb-1">Steps:</h4>
            <ul className="list-disc pl-4 space-y-1">
              {route.path.map((node, i) => (
                <li key={i}>{node.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
