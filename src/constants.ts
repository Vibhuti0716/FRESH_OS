export interface RouteStats {
  distance: string;
  time: string;
  aqiScore: number;
  freshness: number;
  spoilageLoss: string;
}

export interface Truck {
  id: string;
  name: string;
  status: 'Active' | 'Delayed' | 'Maintenance';
  routeHealth: number;
  freshnessScore: number;
  location: [number, number];
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  location: string;
  aqi: number;
  zone: 'RED' | 'ORANGE' | 'GREEN';
  timestamp: string;
}

export const MOCK_DATA = {
  routes: {
    standard: {
      distance: "14.8 km",
      time: "32 min",
      aqiScore: 412,
      freshness: 68,
      spoilageLoss: "₹21,500",
    },
    fresh: {
      distance: "17.2 km",
      time: "39 min",
      aqiScore: 58,
      freshness: 98,
      spoilageLoss: "₹450",
    }
  },
  trucks: [
    { id: 'X-901', name: 'Vanguard-01', status: 'Active', routeHealth: 98, freshnessScore: 92, location: [77.2090, 28.6139] },
    { id: 'X-902', name: 'Sentinel-04', status: 'Delayed', routeHealth: 38, freshnessScore: 55, location: [77.2200, 28.6200] },
    { id: 'X-903', name: 'Nomad-09', status: 'Active', routeHealth: 85, freshnessScore: 82, location: [77.2300, 28.6000] },
    { id: 'X-904', name: 'Ranger-12', status: 'Active', routeHealth: 91, freshnessScore: 89, location: [77.2400, 28.6100] },
  ] as Truck[],
  alerts: [
    { id: '1', type: 'critical', location: 'Anand Vihar ISBT', aqi: 520, zone: 'RED', timestamp: '10:15:00' },
    { id: '2', type: 'info', location: 'Okhla Phase 3', aqi: 92, zone: 'GREEN', timestamp: '10:16:22' },
    { id: '3', type: 'warning', location: 'Rohini Sector 16', aqi: 145, zone: 'ORANGE', timestamp: '10:18:45' },
    { id: '4', type: 'warning', location: 'Wazirpur Industrial Area', aqi: 188, zone: 'ORANGE', timestamp: '10:20:10' },
    { id: '5', type: 'critical', location: 'Bawana', aqi: 480, zone: 'RED', timestamp: '10:22:30' },
  ] as Alert[],
  aqiTrend: [
    { time: '0m', standard: 120, fresh: 45 },
    { time: '5m', standard: 180, fresh: 52 },
    { time: '10m', standard: 280, fresh: 65 },
    { time: '15m', standard: 320, fresh: 58 },
    { time: '20m', standard: 290, fresh: 50 },
    { time: '25m', standard: 210, fresh: 48 },
    { time: '30m', standard: 150, fresh: 42 },
    { time: '35m', standard: 90, fresh: 40 },
    { time: '40m', standard: 75, fresh: 38 },
  ]
};
