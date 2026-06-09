// src/data/graph.js
// Migrated from route_finder.c -> load_default_bengaluru_network()
export const NODES = {
  "MG Road":                 { lat: 12.9716, lng: 77.6097, type: "area" },
  "Koramangala":             { lat: 12.9352, lng: 77.6245, type: "area" },
  "Indiranagar":             { lat: 12.9784, lng: 77.6408, type: "area" },
  "Whitefield":              { lat: 12.9698, lng: 77.7499, type: "area" },
  "Electronic City":         { lat: 12.8456, lng: 77.6603, type: "area" },
  "Hebbal":                  { lat: 13.0358, lng: 77.5970, type: "area" },
  "Marathahalli":            { lat: 12.9591, lng: 77.6974, type: "area" },
  "Silk Board Junction":     { lat: 12.9165, lng: 77.6230, type: "junction" },
  "Victoria Hospital":       { lat: 12.9716, lng: 77.5946, type: "hospital" },
  "NIMHANS":                 { lat: 12.9429, lng: 77.5956, type: "hospital" },
  "Nagawara":                { lat: 13.0360, lng: 77.6250, type: "area" },
  "Outer Ring Road North":   { lat: 13.0450, lng: 77.6100, type: "road" },
  "Bannerghatta Road":       { lat: 12.8900, lng: 77.5970, type: "road" },
  "Hosur Road":              { lat: 12.8700, lng: 77.6500, type: "road" },
  "Tumkur Road":             { lat: 13.0100, lng: 77.5100, type: "road" },
  "Sarjapur Road":           { lat: 12.9123, lng: 77.6868, type: "road" },
  "HAL Airport Road":        { lat: 12.9600, lng: 77.6600, type: "road" },
  "Namma Metro Purple Line": { lat: 12.9767, lng: 77.5713, type: "metro" },
  "Namma Metro Green Line":  { lat: 12.9784, lng: 77.6408, type: "metro" },
  "Yelahanka":               { lat: 13.1000, lng: 77.5950, type: "area" },
  "Hennur Road":             { lat: 13.0350, lng: 77.6300, type: "area" },
  "ITPL":                    { lat: 12.9850, lng: 77.7200, type: "area" },
  "Varthur":                 { lat: 12.9400, lng: 77.7500, type: "area" },
  "KR Puram":                { lat: 13.0035, lng: 77.6749, type: "area" },
  "Banashankari":            { lat: 12.9255, lng: 77.5468, type: "area" },
  "Electronic City Flyover": { lat: 12.8456, lng: 77.6603, type: "road" },
  "Outer Ring Road":         { lat: 12.9150, lng: 77.6500, type: "road" },
};

// traffic: 1=free, 2=light, 3=moderate, 4=heavy, 5=gridlock
export const EDGES = [
  { src: "MG Road", dst: "Victoria Hospital", dist: 6.3, traffic: 2 },
  { src: "Victoria Hospital", dst: "MG Road", dist: 6.3, traffic: 2 },

  { src: "MG Road", dst: "Indiranagar",       dist: 4.0, traffic: 4 },
  { src: "Indiranagar", dst: "MG Road",       dist: 4.0, traffic: 4 },

  { src: "MG Road", dst: "Koramangala",       dist: 6.3, traffic: 4 },
  { src: "Koramangala", dst: "MG Road",       dist: 6.3, traffic: 4 },

  { src: "Koramangala", dst: "Silk Board Junction", dist: 3.5, traffic: 5 },
  { src: "Silk Board Junction", dst: "Koramangala", dist: 3.5, traffic: 5 },

  { src: "Silk Board Junction", dst: "Electronic City", dist: 9.5, traffic: 4 },
  { src: "Electronic City", dst: "Silk Board Junction", dist: 9.5, traffic: 4 },

  { src: "Silk Board Junction", dst: "Marathahalli", dist: 12.0, traffic: 5 },
  { src: "Marathahalli", dst: "Silk Board Junction", dist: 12.0, traffic: 5 },

  { src: "Marathahalli", dst: "Whitefield", dist: 6.5, traffic: 4 },
  { src: "Whitefield", dst: "Marathahalli", dist: 6.5, traffic: 4 },

  { src: "Indiranagar", dst: "Marathahalli", dist: 8.0, traffic: 3 },
  { src: "Marathahalli", dst: "Indiranagar", dist: 8.0, traffic: 3 },

  { src: "Hebbal", dst: "Nagawara", dist: 4.2, traffic: 3 },
  { src: "Nagawara", dst: "Hebbal", dist: 4.2, traffic: 3 },

  { src: "MG Road", dst: "Hebbal", dist: 8.5, traffic: 4 },
  { src: "Hebbal", dst: "MG Road", dist: 8.5, traffic: 4 },

  { src: "Victoria Hospital", dst: "NIMHANS", dist: 3.5, traffic: 2 },
  { src: "NIMHANS", dst: "Victoria Hospital", dist: 3.5, traffic: 2 },

  { src: "NIMHANS", dst: "Koramangala", dist: 4.0, traffic: 3 },
  { src: "Koramangala", dst: "NIMHANS", dist: 4.0, traffic: 3 },

  { src: "KR Puram", dst: "Marathahalli", dist: 7.0, traffic: 5 },
  { src: "Marathahalli", dst: "KR Puram", dist: 7.0, traffic: 5 },

  { src: "KR Puram", dst: "Hebbal", dist: 15.0, traffic: 4 },
  { src: "Hebbal", dst: "KR Puram", dist: 15.0, traffic: 4 }
];
