import { describe, it, expect } from 'vitest';
import { calculateTravelTime } from './traffic.js';

describe('calculateTravelTime', () => {
  it('should calculate time correctly for light traffic (level 2)', () => {
    // Level 2 speed is 40 km/h. Distance 20 km -> 0.5 hours -> 30 mins
    // Signal delay is 0.8 mins
    const time = calculateTravelTime(20, 2, 1.0);
    expect(time).toBeCloseTo(30.8);
  });

  it('should apply vehicle multiplier correctly', () => {
    // Level 2 speed is 40 km/h. Vehicle multiplier 1.5 -> 60 km/h
    // Distance 30 km -> 0.5 hours -> 30 mins
    // Signal delay is 0.8 mins
    const time = calculateTravelTime(30, 2, 1.5);
    expect(time).toBeCloseTo(30.8);
  });

  it('should calculate correctly for gridlock (level 5)', () => {
    // Level 5 speed is 10 km/h. Distance 5 km -> 0.5 hours -> 30 mins
    const time = calculateTravelTime(5, 5, 1.0);
    expect(time).toBeCloseTo(30.8);
  });
});
