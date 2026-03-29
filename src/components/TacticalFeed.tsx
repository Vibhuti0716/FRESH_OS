import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldAlert, Zap, Radio } from 'lucide-react';

const LOG_TYPES = [
  { type: 'sync', icon: <Radio size={10} />, color: 'text-brand-cyan', label: 'Sensor Sync' },
  { type: 'alert', icon: <ShieldAlert size={10} />, color: 'text-brand-red', label: 'Hotspot Alert' },
  { type: 'neural', icon: <Zap size={10} />, color: 'text-brand-purple', label: 'Neural Recalc' },
  { type: 'status', icon: <Activity size={10} />, color: 'text-white/40', label: 'System Ping' },
];

const INITIAL_LOGS = [
  { id: 1, type: 'status', message: 'Tactical Uplink Established', time: '18:57:01' },
  { id: 2, type: 'sync', message: 'Sensor-42 (Patel Nagar) Online', time: '18:57:05' },
  { id: 3, type: 'neural', message: 'Optimizing Route FR-0847', time: '18:57:10' },
];

export const TacticalFeed: React.FC = () => {
  const [logs, setLogs] = useState(INITIAL_LOGS);

  useEffect(() => {
    const interval = setInterval(() => {
      const type = LOG_TYPES[Math.floor(Math.random() * LOG_TYPES.length)];
      const messages = [
        `Uplink: Data packet ${Math.floor(Math.random() * 999)} received`,
        `Sensor-${Math.floor(Math.random() * 100)} recalibrated`,
        `Neural node ${Math.floor(Math.random() * 10)} active`,
        `AQI threshold exceeded in Sector-${Math.floor(Math.random() * 20)}`,
        `Route FR-0847: Latency 12ms`,
        `Satellite sync successful`,
      ];
      
      const newLog = {
        id: Date.now(),
        type: type.type,
        message: messages[Math.floor(Math.random() * messages.length)],
        time: new Date().toLocaleTimeString([], { hour12: false }),
      };
      
      setLogs(prev => [newLog, ...prev].slice(0, 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] p-6 h-48 overflow-hidden relative group hover:border-slate-300 transition-all shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_8px_rgba(0,242,255,0.4)]" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Live Tactical Log</span>
        </div>
        <span className="text-[8px] font-mono text-slate-300 uppercase tracking-widest">Encrypted Stream</span>
      </div>
      
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {logs.map((log) => {
            const config = LOG_TYPES.find(t => t.type === log.type) || LOG_TYPES[0];
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="flex items-center gap-4 text-[10px] font-mono"
              >
                <span className="text-slate-300 w-16">[{log.time}]</span>
                <span className={config.color}>{config.icon}</span>
                <span className="text-slate-600 truncate flex-1 tracking-tight">{log.message}</span>
                <div className="w-1 h-1 rounded-full bg-slate-100" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* SCANLINE EFFECT */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-slate-100/10 to-transparent h-1/2 animate-scanline opacity-50" />
      
      {/* DECORATIVE CORNER */}
      <div className="absolute bottom-0 right-0 w-12 h-12 bg-brand-cyan/5 blur-2xl rounded-full -mr-6 -mb-6" />
    </div>
  );
};
