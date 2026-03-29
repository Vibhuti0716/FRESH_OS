import React, { useState, useEffect, useMemo } from 'react';
import Map, { Marker, Source, Layer, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, MapPin, Wind, Thermometer, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

// DELHI AREAS FOR GPS SIMULATION
const DELHI_AREAS = [
  { name: 'Connaught Place', lat: 28.6304, lng: 77.2177, aqi: 280, temp: '24°C', status: 'High Pollution' },
  { name: 'Chandni Chowk', lat: 28.6505, lng: 77.2303, aqi: 310, temp: '25°C', status: 'Severe' },
  { name: 'Dwarka', lat: 28.5823, lng: 77.0500, aqi: 140, temp: '26°C', status: 'Moderate' },
  { name: 'Rohini', lat: 28.7041, lng: 77.1025, aqi: 190, temp: '24°C', status: 'Moderate' },
  { name: 'Saket', lat: 28.5245, lng: 77.2066, aqi: 110, temp: '27°C', status: 'Moderate' },
  { name: 'Vasant Kunj', lat: 28.5293, lng: 77.1519, aqi: 85, temp: '22°C', status: 'Good' },
  { name: 'Hauz Khas', lat: 28.5494, lng: 77.2001, aqi: 95, temp: '23°C', status: 'Good' },
  { name: 'Karol Bagh', lat: 28.6550, lng: 77.1888, aqi: 220, temp: '26°C', status: 'Severe' },
  { name: 'Lajpat Nagar', lat: 28.5677, lng: 77.2433, aqi: 160, temp: '25°C', status: 'Moderate' },
  { name: 'Okhla', lat: 28.5468, lng: 77.2732, aqi: 240, temp: '28°C', status: 'High Pollution' },
  { name: 'Janakpuri', lat: 28.6219, lng: 77.0878, aqi: 130, temp: '24°C', status: 'Moderate' },
  { name: 'Pitampura', lat: 28.7033, lng: 77.1323, aqi: 150, temp: '25°C', status: 'Moderate' },
  { name: 'Paschim Vihar', lat: 28.6691, lng: 77.0927, aqi: 145, temp: '24°C', status: 'Moderate' },
  { name: 'Model Town', lat: 28.7027, lng: 77.1936, aqi: 170, temp: '23°C', status: 'Moderate' },
  { name: 'Civil Lines', lat: 28.6814, lng: 77.2227, aqi: 120, temp: '24°C', status: 'Moderate' },
  { name: 'Greater Kailash', lat: 28.5482, lng: 77.2381, aqi: 105, temp: '26°C', status: 'Moderate' },
  { name: 'Nehru Place', lat: 28.5485, lng: 77.2512, aqi: 180, temp: '27°C', status: 'Moderate' },
  { name: 'Sarita Vihar', lat: 28.5283, lng: 77.2842, aqi: 195, temp: '26°C', status: 'Moderate' },
  { name: 'Mayur Vihar', lat: 28.6035, lng: 77.2931, aqi: 165, temp: '25°C', status: 'Moderate' },
  { name: 'Laxmi Nagar', lat: 28.6365, lng: 77.2732, aqi: 210, temp: '26°C', status: 'High Pollution' },
];

const geocode = (city: string): [number, number] => {
  const found = DELHI_AREAS.find(c => c.name.toLowerCase().includes(city.toLowerCase()));
  if (found) return [found.lng, found.lat];
  // Fallback to deterministic offset from Delhi if not found to prevent glitching
  const hash = city.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return [77.2090 + (hash % 20) / 100 - 0.1, 28.6139 + (hash % 20) / 100 - 0.1];
};

interface NavigationMapProps {
  start?: string;
  destination?: string;
}

export const NavigationMap: React.FC<NavigationMapProps> = ({ start = 'Connaught Place', destination = 'Dwarka' }) => {
  // Memoize coordinates and stats to prevent glitching on every render
  const { startCoords, destCoords, neuralRouteCoords, legacyRouteCoords, neuralGeoJSON, legacyGeoJSON, routeStats } = useMemo(() => {
    const s = geocode(start);
    const d = geocode(destination);
    
    // Deterministic intermediate point based on city names
    const hash = (start + destination).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Neural Path (Longer, Low AQI - Suggested)
    // We add more "curve" to simulate avoiding pollution zones
    const neuralMidLng = (s[0] + d[0]) / 2 + (hash % 10) / 100 - 0.05;
    const neuralMidLat = (s[1] + d[1]) / 2 + (hash % 10) / 100 - 0.05;
    const neuralCoords = [s, [neuralMidLng, neuralMidLat], d];

    // Legacy Path (Shorter, High AQI)
    // More direct, but passes through high AQI zones
    const legacyMidLng = (s[0] + d[0]) / 2 + (hash % 5) / 100 - 0.025;
    const legacyMidLat = (s[1] + d[1]) / 2 + (hash % 5) / 100 - 0.025;
    const legacyCoords = [s, [legacyMidLng, legacyMidLat], d];

    // Calculate mock stats
    const baseDist = 15 + (hash % 20);
    const baseAQI = 120 + (hash % 150);

    const stats = {
      neural: {
        distance: (baseDist * 1.2).toFixed(1),
        time: Math.round(baseDist * 2.5 + 5),
        aqi: Math.round(baseAQI * 0.4)
      },
      legacy: {
        distance: baseDist.toFixed(1),
        time: Math.round(baseDist * 2.5),
        aqi: baseAQI
      }
    };
    
    return {
      startCoords: s,
      destCoords: d,
      neuralRouteCoords: neuralCoords,
      legacyRouteCoords: legacyCoords,
      neuralGeoJSON: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: neuralCoords,
        },
      },
      legacyGeoJSON: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: legacyCoords,
        },
      },
      routeStats: stats
    };
  }, [start, destination]);

  const [viewState, setViewState] = useState({
    latitude: (startCoords[1] + destCoords[1]) / 2,
    longitude: (startCoords[0] + destCoords[0]) / 2,
    zoom: 11,
    pitch: 45,
    bearing: 0
  });

  const [selectedCity, setSelectedCity] = useState<typeof DELHI_AREAS[0] | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPos, setCurrentPos] = useState<[number, number]>(startCoords);
  const [speed, setSpeed] = useState(0);
  const lastMoveTime = React.useRef(0);

  // Reset when props change
  useEffect(() => {
    setProgress(0);
    setIsNavigating(false);
    setCurrentPos(startCoords);
    setViewState(prev => ({
      ...prev,
      latitude: (startCoords[1] + destCoords[1]) / 2,
      longitude: (startCoords[0] + destCoords[0]) / 2,
      zoom: 11,
      transitionDuration: 1000 // Smooth transition when route changes
    }));
  }, [start, destination, startCoords, destCoords]);

  // GPS SIMULATION EFFECT
  useEffect(() => {
    let interval: any;
    if (isNavigating) {
      setSpeed(85);
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + 0.001; // Slower but smoother
          if (next >= 1) {
            setIsNavigating(false);
            setSpeed(0);
            return 1;
          }
          return next;
        });
      }, 33); // 30fps
    } else {
      setSpeed(0);
    }
    return () => clearInterval(interval);
  }, [isNavigating]);

  // INTERPOLATE POSITION
  useEffect(() => {
    if (progress === 0) {
      setCurrentPos(neuralRouteCoords[0] as [number, number]);
      return;
    }
    
    const segmentCount = neuralRouteCoords.length - 1;
    const scaledProgress = progress * segmentCount;
    const index = Math.floor(scaledProgress);
    const t = scaledProgress - index;
    
    if (index >= segmentCount) {
      setCurrentPos(neuralRouteCoords[segmentCount] as [number, number]);
      return;
    }
 
    const p1 = neuralRouteCoords[index];
    const p2 = neuralRouteCoords[index + 1];
    
    const lng = p1[0] + (p2[0] - p1[0]) * t;
    const lat = p1[1] + (p2[1] - p1[1]) * t;
    
    setCurrentPos([lng, lat]);
 
    // AUTO-FOLLOW CAMERA (Only if navigating and not manually moved recently)
    // Throttle camera updates to every 200ms for better performance
    const now = Date.now();
    if (isNavigating && now - lastMoveTime.current > 3000) {
      setViewState(prev => {
        // Only update if the position has changed significantly to avoid jitter
        const dist = Math.sqrt(Math.pow(prev.latitude - lat, 2) + Math.pow(prev.longitude - lng, 2));
        if (dist < 0.001) return prev;
        
        return {
          ...prev,
          latitude: lat,
          longitude: lng,
          zoom: 14,
          transitionDuration: 500, // Faster but more frequent updates
          transitionEasing: (t: number) => t // Linear easing for constant movement
        };
      });
    }
  }, [progress, isNavigating, neuralRouteCoords]);

  // USING CARTO POSITRON STYLE (LIGHT, FREE, NO TOKEN REQUIRED)
  const MAP_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

  return (
    <div className="relative w-full h-[700px] bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-2xl tech-grid">
      <Map
        {...viewState}
        onMove={evt => {
          setViewState(evt.viewState);
          lastMoveTime.current = Date.now();
        }}
        mapStyle={MAP_STYLE}
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="top-right" />

        {/* NEURAL ROUTE LAYER (SUGGESTED) */}
        <Source id="neural-route-source" type="geojson" data={neuralGeoJSON}>
          <Layer
            id="neural-route-layer"
            type="line"
            layout={{ 'line-join': 'round', 'line-cap': 'round' }}
            paint={{
              'line-color': '#00f2ff',
              'line-width': 4,
              'line-dasharray': [2, 1],
              'line-opacity': 0.8
            }}
          />
        </Source>

        {/* LEGACY ROUTE LAYER (SHORTER BUT HIGH AQI) */}
        <Source id="legacy-route-source" type="geojson" data={legacyGeoJSON}>
          <Layer
            id="legacy-route-layer"
            type="line"
            layout={{ 'line-join': 'round', 'line-cap': 'round' }}
            paint={{
              'line-color': '#ff003c',
              'line-width': 3,
              'line-dasharray': [1, 2],
              'line-opacity': 0.4
            }}
          />
        </Source>

        {/* VEHICLE MARKER */}
        <Marker longitude={currentPos[0]} latitude={currentPos[1]} anchor="center">
          <motion.div 
            className="relative"
          >
            <div className="absolute inset-0 bg-brand-cyan/40 blur-xl rounded-full animate-pulse scale-150" />
            <div className="w-6 h-6 bg-brand-cyan rounded-lg border-2 border-white shadow-[0_0_20px_#00f2ff] flex items-center justify-center rotate-45">
              <Navigation size={14} className="text-black -rotate-45" />
            </div>
          </motion.div>
        </Marker>

        {/* CITY MARKERS */}
        {DELHI_AREAS.map((city, idx) => (
          <Marker
            key={idx}
            latitude={city.lat}
            longitude={city.lng}
            anchor="bottom"
            onClick={e => {
              e.originalEvent.stopPropagation();
              setSelectedCity(city);
            }}
          >
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="cursor-pointer group relative"
            >
              <div className={cn(
                "w-4 h-4 rounded-full border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.5)]",
                city.aqi > 200 ? "bg-red-500" : city.aqi > 100 ? "bg-orange-500" : "bg-green-500"
              )} />
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-md px-2 py-1 rounded border border-slate-200 shadow-lg whitespace-nowrap z-50">
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{city.name}</span>
              </div>
            </motion.div>
          </Marker>
        ))}
      </Map>

      {/* OVERLAY UI */}
      <div className="absolute top-8 left-8 flex flex-col gap-4 z-10">
        <div className="bg-white/90 backdrop-blur-2xl p-6 border border-slate-200 rounded-[2rem] w-80 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-brand-cyan/10 text-brand-cyan">
              <Navigation size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Delhi GPS Feed</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Neural Navigation v1.0</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* GPS STATS */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Speed</p>
                <p className="text-xl font-black text-slate-900 font-mono">{speed} <span className="text-[10px] text-slate-400">km/h</span></p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Distance</p>
                <p className="text-xl font-black text-slate-900 font-mono">{Math.max(0, Math.round(40 * (1 - progress)))} <span className="text-[10px] text-slate-400">km</span></p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">Active Route</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-slate-900 truncate max-w-[80px]">{start}</span>
                <div className="flex-1 mx-4 h-px bg-slate-200 relative">
                  <motion.div 
                    style={{ left: `${progress * 100}%` }}
                    className="absolute top-1/2 -translate-y-1/2 w-1 h-1 bg-brand-cyan rounded-full shadow-[0_0_10px_#00f2ff]"
                  />
                </div>
                <span className="text-sm font-black text-slate-900 truncate max-w-[80px]">{destination}</span>
              </div>
            </div>

            <button 
              onClick={() => {
                if (isNavigating) {
                  setIsNavigating(false);
                } else {
                  if (progress >= 1) setProgress(0);
                  setIsNavigating(true);
                }
              }}
              className={cn(
                "w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-2",
                isNavigating 
                  ? "bg-red-500/20 text-red-500 border border-red-500/30" 
                  : "bg-brand-cyan text-black shadow-[0_0_20px_rgba(0,242,255,0.4)]"
              )}
            >
              <Navigation size={14} /> {isNavigating ? 'Abort Navigation' : progress >= 1 ? 'Restart Route' : 'Initiate Neural Route'}
            </button>

            {isNavigating && (
              <button 
                onClick={() => {
                  setViewState(prev => ({
                    ...prev,
                    latitude: currentPos[1],
                    longitude: currentPos[0],
                    zoom: 12,
                    pitch: 60
                  }));
                }}
                className="w-full py-3 rounded-xl bg-slate-100 border border-slate-200 text-[9px] font-black uppercase tracking-widest text-slate-600 hover:text-brand-cyan transition-all flex items-center justify-center gap-2"
              >
                <MapPin size={12} /> Center on Vehicle
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {selectedCity && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/90 backdrop-blur-2xl p-6 border border-slate-200 rounded-[2rem] w-80 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Node Telemetry</h4>
                <button onClick={() => setSelectedCity(null)} className="text-slate-300 hover:text-slate-600 transition-colors">✕</button>
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4">{selectedCity.name}</h3>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 mb-1 text-slate-400">
                    <Wind size={12} />
                    <span className="text-[8px] font-black uppercase tracking-widest">AQI</span>
                  </div>
                  <p className={cn(
                    "text-xl font-black font-mono",
                    selectedCity.aqi > 200 ? "text-red-500" : selectedCity.aqi > 100 ? "text-orange-500" : "text-green-500"
                  )}>{selectedCity.aqi}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 mb-1 text-slate-400">
                    <Thermometer size={12} />
                    <span className="text-[8px] font-black uppercase tracking-widest">Temp</span>
                  </div>
                  <p className="text-xl font-black font-mono text-slate-900">{selectedCity.temp}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  <span>Status</span>
                  <span className="text-slate-600">{selectedCity.status}</span>
                </div>
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  <span>GPS Precision</span>
                  <span className="text-brand-cyan">±0.2m</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ROUTE COMPARISON POPUP */}
      <div className="absolute bottom-8 left-8 flex flex-col gap-4 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-2xl p-6 border border-slate-200 rounded-[2rem] w-80 shadow-2xl"
        >
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Route Intelligence Comparison</h4>
          
          <div className="space-y-4">
            {/* NEURAL STATS */}
            <div className="p-3 rounded-xl bg-brand-cyan/5 border border-brand-cyan/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-brand-cyan">Neural Path</span>
                <span className="text-[8px] font-bold text-brand-cyan/60 uppercase tracking-widest">Suggested</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Dist</p>
                  <p className="text-xs font-black text-slate-900 font-mono">{routeStats.neural.distance}km</p>
                </div>
                <div>
                  <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Time</p>
                  <p className="text-xs font-black text-slate-900 font-mono">{routeStats.neural.time}m</p>
                </div>
                <div>
                  <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">AQI</p>
                  <p className="text-xs font-black text-green-600 font-mono">{routeStats.neural.aqi}</p>
                </div>
              </div>
            </div>

            {/* LEGACY STATS */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Legacy Path</span>
                <span className="text-[8px] font-bold text-red-500/60 uppercase tracking-widest">High Risk</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Dist</p>
                  <p className="text-xs font-black text-slate-600 font-mono">{routeStats.legacy.distance}km</p>
                </div>
                <div>
                  <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Time</p>
                  <p className="text-xs font-black text-slate-600 font-mono">{routeStats.legacy.time}m</p>
                </div>
                <div>
                  <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">AQI</p>
                  <p className="text-xs font-black text-red-500 font-mono">{routeStats.legacy.aqi}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* LEGEND */}
      <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-xl p-6 border border-slate-200 rounded-[2rem] shadow-2xl">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Environmental Legend</h4>
        <div className="space-y-3">
          <LegendItem color="bg-green-500" label="Optimal (0-100)" />
          <LegendItem color="bg-orange-500" label="Warning (101-200)" />
          <LegendItem color="bg-red-500" label="Critical (201+)" />
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-4 h-0.5 bg-brand-cyan border-t border-dashed border-brand-cyan" />
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Neural Path (Suggested)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-0.5 bg-brand-red border-t border-dashed border-brand-red opacity-50" />
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Legacy Path (High AQI)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LegendItem = ({ color, label }: { color: string, label: string }) => (
  <div className="flex items-center gap-3">
    <div className={cn("w-3 h-3 rounded-full shadow-sm", color)} />
    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
  </div>
);
