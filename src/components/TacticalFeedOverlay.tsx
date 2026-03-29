import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FEED_MESSAGES = [
  "Uplink: Data packet received",
  "Sensor recalibrated",
  "Neural node active",
  "AQI threshold exceeded",
  "Route optimized",
  "Satellite sync successful",
  "Telemetry stream stable",
  "Encryption key rotated",
];

export const TacticalFeedOverlay: React.FC = () => {
  const [message, setMessage] = useState(FEED_MESSAGES[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(FEED_MESSAGES[Math.floor(Math.random() * FEED_MESSAGES.length)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-xl px-4 py-2 flex items-center gap-3 border border-slate-200 rounded-xl min-w-[200px] shadow-sm">
      <div className="w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_10px_rgba(0,242,255,0.4)] animate-pulse" />
      <div className="flex flex-col">
        <span className="text-[8px] font-black tracking-[0.2em] uppercase text-slate-400">Tactical Feed: Active</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={message}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-[10px] font-mono text-brand-cyan truncate max-w-[150px]"
          >
            {message}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};
