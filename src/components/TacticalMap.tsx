import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const HOTSPOTS = [
  { name: 'Patel Nagar', aqi: 260, x: 40, y: 15, color: 'bg-red-500' },
  { name: 'Connaught Place', aqi: 280, x: 55, y: 18, color: 'bg-red-500' },
  { name: 'India Gate', aqi: 190, x: 58, y: 25, color: 'bg-orange-500' },
  { name: 'Vasant Kunj', aqi: 95, x: 35, y: 38, color: 'bg-green-500' },
  { name: 'Saket', aqi: 140, x: 48, y: 45, color: 'bg-orange-500' },
  { name: 'Lajpat Nagar', aqi: 160, x: 62, y: 40, color: 'bg-orange-500' },
  { name: 'Noida Sec 62', aqi: 75, x: 85, y: 55, color: 'bg-green-500' },
  { name: 'Faridabad Border', aqi: 90, x: 75, y: 68, color: 'bg-green-500' },
  { name: 'Sec 29 Gurgaon', aqi: 65, x: 42, y: 75, color: 'bg-green-500' },
  { name: 'Gurgaon', aqi: 120, x: 32, y: 82, color: 'bg-orange-500' },
];

export const TacticalMap: React.FC = () => {
  const [selectedSpot, setSelectedSpot] = React.useState<typeof HOTSPOTS[0] | null>(null);

  return (
    <div className="relative w-full h-full bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl tech-grid">
      {/* GRID LINES */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full" style={{ 
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* HOTSPOTS */}
      {HOTSPOTS.map((spot, idx) => (
        <motion.div 
          key={idx}
          className="absolute cursor-pointer z-20"
          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          whileHover={{ scale: 1.2 }}
          onClick={() => setSelectedSpot(spot)}
        >
          <div className="relative flex flex-col items-center group">
            {/* GLOW EFFECT */}
            <div className={cn(
              "absolute w-12 h-12 rounded-full blur-xl opacity-40 animate-pulse transition-opacity",
              spot.color,
              selectedSpot?.name === spot.name ? "opacity-80 scale-150" : "group-hover:opacity-60"
            )} />
            
            {/* POINT */}
            <div className={cn(
              "w-2 h-2 rounded-full relative z-10 transition-all",
              spot.color,
              selectedSpot?.name === spot.name ? "ring-4 ring-slate-900/10 scale-125" : ""
            )} />

            {/* LABEL */}
            <div className="mt-2 text-center pointer-events-none">
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{spot.name}</p>
              <p className={cn("text-[10px] font-black font-mono", spot.color.replace('bg-', 'text-'))}>{spot.aqi}</p>
            </div>
          </div>
        </motion.div>
      ))}

      {/* SELECTION POPUP */}
      {selectedSpot && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 right-6 w-64 bg-white/90 backdrop-blur-2xl border border-slate-200 rounded-2xl p-5 z-30 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sensor Detail</h4>
            <button onClick={() => setSelectedSpot(null)} className="text-slate-300 hover:text-slate-900 transition-colors">✕</button>
          </div>
          <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-1">{selectedSpot.name}</h3>
          <div className="flex items-center gap-2 mb-4">
            <div className={cn("w-2 h-2 rounded-full", selectedSpot.color)} />
            <span className={cn("text-xs font-black font-mono", selectedSpot.color.replace('bg-', 'text-'))}>AQI: {selectedSpot.aqi}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-300">
              <span>Status</span>
              <span className="text-slate-600">Active</span>
            </div>
            <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-300">
              <span>Last Sync</span>
              <span className="text-slate-600">0.4s ago</span>
            </div>
            <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-300">
              <span>Confidence</span>
              <span className="text-brand-cyan">99.2%</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* AQI LEGEND */}
      <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-xl p-4 border border-slate-200 rounded-2xl shadow-lg">
        <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">AQI Legend</h4>
        <div className="space-y-2">
          <LegendItem color="bg-green-500" label="Good (0-100)" />
          <LegendItem color="bg-orange-500" label="Moderate (101-200)" />
          <LegendItem color="bg-red-500" label="Severe (201+)" />
        </div>
      </div>
    </div>
  );
};

const LegendItem = ({ color, label }: { color: string, label: string }) => (
  <div className="flex items-center gap-3">
    <div className={cn("w-2 h-2 rounded-full", color)} />
    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
  </div>
);
