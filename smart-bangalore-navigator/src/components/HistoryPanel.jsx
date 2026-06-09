// src/components/HistoryPanel.jsx


export default function HistoryPanel({ history, onSelect }) {
  if (!history || history.length === 0) {
    return <div className="p-4 text-gray-500 italic">No recent routes found.</div>;
  }

  return (
    <div className="p-4 bg-white shadow-md flex flex-col gap-2 max-h-64 overflow-y-auto">
      <h2 className="text-xl font-bold mb-2 sticky top-0 bg-white">Recent Routes</h2>
      {history.map((h, i) => (
        <div
          key={i}
          className="p-2 border rounded cursor-pointer hover:bg-gray-50 text-sm"
          onClick={() => onSelect(h.source, h.dest, h.vehicle)}
        >
          <div className="font-semibold">{h.source} → {h.dest}</div>
          <div className="text-gray-600 flex justify-between">
            <span>Vehicle: {h.vehicle}</span>
            <span>{new Date(h.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
