// src/data/vehicles.js
export const VEHICLES = {
  car:      { label: "Car",             speedMult: 1.0,  fuelRate: 8,   icon: "🚗", canUseHighway: true  },
  bike:     { label: "Bike/Scooter",    speedMult: 1.15, fuelRate: 2.5, icon: "🏍️", canUseHighway: false },
  auto:     { label: "Auto Rickshaw",   speedMult: 0.85, fuelRate: 4,   icon: "🛺", canUseHighway: false },
  bus:      { label: "BMTC Bus",        speedMult: 0.70, fuelRate: 25,  icon: "🚌", canUseHighway: true  },
  truck:    { label: "Truck/Lorry",     speedMult: 0.60, fuelRate: 30,  icon: "🚛", canUseHighway: true  },
  delivery: { label: "Delivery Van",    speedMult: 0.80, fuelRate: 10,  icon: "📦", canUseHighway: true  },
  emergency:{ label: "Emergency/Ambulance", speedMult: 1.4, fuelRate: 12, icon: "🚑", canUseHighway: true },
  govt:     { label: "Government",      speedMult: 1.1,  fuelRate: 10,  icon: "🏛️", canUseHighway: true  },
};

// Fuel estimate: litres = (distance / 100) * fuelRate, cost = litres * 103 (petrol ₹/L)
export function estimateFuel(distKm, vehicleType) {
  const { fuelRate } = VEHICLES[vehicleType];
  const litres = (distKm / 100) * fuelRate;
  return { litres: litres.toFixed(2), cost: Math.round(litres * 103) };
}
