// src/components/TrafficLegend.jsx


export default function TrafficLegend() {
  return (
    <div className="absolute bottom-4 right-4 bg-white p-3 rounded shadow-lg z-[1000] text-sm">
      <h4 className="font-bold mb-2 border-b pb-1">Route Types</h4>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2"><span className="w-4 h-1 bg-blue-600 inline-block"></span> Fastest</div>
        <div className="flex items-center gap-2"><span className="w-4 h-1 bg-green-600 inline-block"></span> Shortest</div>
        <div className="flex items-center gap-2"><span className="w-4 h-1 bg-yellow-600 inline-block"></span> Fuel Efficient</div>
        <div className="flex items-center gap-2"><span className="w-4 h-1 bg-purple-600 inline-block"></span> Least Traffic</div>
      </div>
    </div>
  );
}
