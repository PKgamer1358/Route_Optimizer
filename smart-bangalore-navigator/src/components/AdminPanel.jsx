// src/components/AdminPanel.jsx

import { useState } from 'react';

export default function AdminPanel({ incidents, setIncidents, graphNodes }) {
  const [nodeName, setNodeName] = useState('');
  const [type, setType] = useState('Accident');
  const [desc, setDesc] = useState('');

  const handleAddIncident = () => {
    if (!nodeName || !graphNodes[nodeName]) return alert('Invalid node');
    const node = graphNodes[nodeName];

    const newInc = {
      id: `inc-${Date.now()}`,
      lat: node.lat + (Math.random() - 0.5) * 0.005, // offset slightly
      lng: node.lng + (Math.random() - 0.5) * 0.005,
      type,
      description: desc,
      nodeName
    };

    setIncidents([...incidents, newInc]);
    setNodeName('');
    setDesc('');
  };

  const handleRemove = (id) => {
    setIncidents(incidents.filter(i => i.id !== id));
  };

  return (
    <div className="p-4 bg-white shadow rounded m-4 absolute top-16 right-4 z-[1000] max-h-[80vh] overflow-y-auto w-80 border-2 border-red-200">
      <h2 className="text-xl font-bold mb-4 text-red-600">Admin Controls</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Add Incident</h3>
        <select className="w-full border p-1 mb-2 rounded" value={nodeName} onChange={e => setNodeName(e.target.value)}>
          <option value="">Select Location</option>
          {Object.keys(graphNodes).sort().map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <select className="w-full border p-1 mb-2 rounded" value={type} onChange={e => setType(e.target.value)}>
          <option value="Accident">Accident</option>
          <option value="Roadblock">Roadblock</option>
          <option value="Construction">Construction</option>
        </select>
        <input
          type="text"
          className="w-full border p-1 mb-2 rounded"
          placeholder="Description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
        <button onClick={handleAddIncident} className="w-full bg-red-600 text-white p-1 rounded">Add Incident</button>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Active Incidents</h3>
        {incidents.length === 0 ? <p className="text-sm text-gray-500">None</p> : (
          <ul className="text-sm space-y-2">
            {incidents.map(i => (
              <li key={i.id} className="border-b pb-1 flex justify-between items-start">
                <div>
                  <strong>{i.type}</strong> at {i.nodeName}
                  <p className="text-xs text-gray-600">{i.description}</p>
                </div>
                <button onClick={() => handleRemove(i.id)} className="text-red-500 ml-2 hover:text-red-700">✕</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
