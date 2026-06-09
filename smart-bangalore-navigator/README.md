# Smart Bangalore Traffic Navigator

A web-based traffic navigation platform based on the ambulance-route-finder-dsa project.
This uses React, Vite, Leaflet, and OpenStreetMap to provide routing in Bangalore.

## Setup Instructions

1.  Ensure you have Node.js installed.
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## Evaluation Demo Script

When presenting to judges/faculty, demonstrate in this order:

1.  **Load the map** — show Bangalore centered, all markers visible.
2.  **Search a route** — Select "Hebbal" → "Silk Board Junction", vehicle = Car.
3.  **Show 4 routes** — explain each algorithm (A*, Dijkstra, BFS, fuel).
4.  **Stats bar** — call out distance, ETA, fuel cost in ₹.
5.  **Vehicle change** — switch to Emergency/Ambulance, show faster ETA.
6.  **Admin: Add incident** — Open the Admin panel, place an accident at Silk Board, watch route auto-recalculate.
7.  **Analytics tab** — show charts from route history below the map.
