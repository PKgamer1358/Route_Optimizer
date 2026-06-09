// src/utils/traffic.js
const SPEED_MAP = { 1: 50, 2: 40, 3: 30, 4: 22, 5: 10 }; // km/h
const SIGNAL_DELAY = 0.8; // minutes per intersection

export function calculateTravelTime(distanceKm, trafficLevel, vehicleMultiplier = 1.0) {
  const speed = (SPEED_MAP[trafficLevel] || 30) * vehicleMultiplier;
  return (distanceKm / speed) * 60 + SIGNAL_DELAY;
}

const NOTORIOUS_JUNCTIONS = [
  "Silk Board Junction", "Hebbal", "KR Puram", "Marathahalli",
  "Banashankari", "Electronic City Flyover", "Outer Ring Road"
];

// Peak-hour multiplier (simulates "AI prediction" without ML)
export function getPeakHourMultiplier() {
  const hour = new Date().getHours();
  if ((hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 20)) return 1.6; // peak
  if (hour >= 11 && hour <= 16) return 1.1; // moderate
  return 0.8; // off-peak
}

export function predictTrafficLevel(nodeName, targetTimeMinutesFromNow = 0) {
  const hour = (new Date().getHours() + Math.floor(targetTimeMinutesFromNow / 60)) % 24;
  const isNotorious = NOTORIOUS_JUNCTIONS.includes(nodeName);

  let base;
  if (hour >= 8 && hour <= 10)        base = isNotorious ? 5 : 4; // AM peak
  else if (hour >= 17 && hour <= 20)  base = isNotorious ? 5 : 4; // PM peak
  else if (hour >= 11 && hour <= 16)  base = isNotorious ? 3 : 2; // midday
  else if (hour >= 23 || hour <= 5)   base = 1;                   // night
  else                                base = isNotorious ? 2 : 1; // early morning

  // Add minor random variation to look "live"
  return Math.min(5, Math.max(1, base + (Math.random() > 0.8 ? 1 : 0)));
}

// "Predict" next 2 hours — displayed as a mini chart in the UI
export function forecastTraffic(nodeName) {
  return Array.from({ length: 8 }, (_, i) => ({
    time: `+${i * 15}min`,
    level: predictTrafficLevel(nodeName, i * 15)
  }));
}
