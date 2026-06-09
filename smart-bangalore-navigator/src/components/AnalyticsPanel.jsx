// src/components/AnalyticsPanel.jsx
import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AnalyticsPanel({ history }) {
  const vehicleStats = useMemo(() => {
    const counts = {};
    history.forEach(h => { counts[h.vehicle] = (counts[h.vehicle] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [history]);

  const popularDestinations = useMemo(() => {
    const counts = {};
    history.forEach(h => { counts[h.dest] = (counts[h.dest] || 0) + 1; });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }));
  }, [history]);

  if (history.length === 0) return null;

  return (
    <div className="p-4 bg-white shadow-md grid grid-cols-1 md:grid-cols-2 gap-4 border-t">
      <div className="h-48">
        <h3 className="text-sm font-bold text-center mb-2">Vehicle Types Used</h3>
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie data={vehicleStats} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} label>
              {vehicleStats.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="h-48">
        <h3 className="text-sm font-bold text-center mb-2">Popular Destinations</h3>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={popularDestinations}>
            <XAxis dataKey="name" tick={{fontSize: 10}} interval={0} angle={-30} textAnchor="end" height={40}/>
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
