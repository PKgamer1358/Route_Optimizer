// src/components/MapView.jsx
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const BANGALORE_CENTER = [12.9716, 77.5946];
const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const TRAFFIC_COLORS = {
  fastest: '#2563eb',    // blue
  shortest: '#16a34a',   // green
  fuel:     '#d97706',   // amber
  traffic:  '#9333ea',   // purple
};

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const warningIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function MapView({ routes = [], incidents = [], sourceNode, destNode }) {
  return (
    <MapContainer
      center={BANGALORE_CENTER}
      zoom={12}
      style={{ height: '100%', width: '100%', zIndex: 0 }}
    >
      <TileLayer url={TILE_URL} attribution="&copy; OpenStreetMap contributors" />

      {/* Draw route polylines */}
      {routes.map((route) => (
        <Polyline
          key={route.type}
          positions={route.path.map(node => [node.lat, node.lng])}
          color={TRAFFIC_COLORS[route.type]}
          weight={route.type === 'fastest' ? 5 : 3}
          opacity={route.type === 'fastest' ? 1.0 : 0.6}
        >
          <Popup>{route.label} — {route.time.toFixed(1)} min, {route.dist.toFixed(1)} km</Popup>
        </Polyline>
      ))}

      {/* Source & Destination markers */}
      {sourceNode && <Marker position={[sourceNode.lat, sourceNode.lng]} icon={greenIcon}><Popup>Source: {sourceNode.name}</Popup></Marker>}
      {destNode   && <Marker position={[destNode.lat,   destNode.lng]}   icon={redIcon}><Popup>Destination: {destNode.name}</Popup></Marker>}

      {/* Incident markers */}
      {incidents.map(inc => (
        <Marker key={inc.id} position={[inc.lat, inc.lng]} icon={warningIcon}>
          <Popup><strong>{inc.type}</strong><br/>{inc.description}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
