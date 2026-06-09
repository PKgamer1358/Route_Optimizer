// src/utils/fuel.js
import { estimateFuel as estimateFuelFn } from '../data/vehicles.js';

export function estimateFuel(distKm, vehicleType) {
    return estimateFuelFn(distKm, vehicleType);
}
