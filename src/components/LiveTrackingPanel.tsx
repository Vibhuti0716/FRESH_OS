import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Truck, Navigation } from 'lucide-react';

export const LiveTrackingPanel: React.FC = () => {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] p-6 relative overflow-hidden group hover:border-slate-300 transition-all shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-brand-cyan rounded-full" />
          <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Live Tracking</h3>
        </div>
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="text-[8px] font-black text-brand-cyan uppercase tracking-widest border border-brand-cyan/20 px-3 py-1 rounded-full hover:bg-brand-cyan/10 transition-all"
        >
          {showDetails ? 'Hide Feed' : 'View Telemetry'}
        </button>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
          <Truck size={24} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">FR-0847</h4>
            <span className="text-[10px] font-black text-brand-cyan uppercase tracking-widest">0% Waiting</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            <span>Delhi</span>
            <div className="w-4 h-px bg-slate-200" />
            <span>Gurgaon</span>
          </div>
        </div>
      </div>
      
      {showDetails && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="mt-6 pt-6 border-t border-slate-100 space-y-3"
        >
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Engine Temp</span>
            <span className="text-[10px] font-black text-slate-900 font-mono">84°C</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Cargo Temp</span>
            <span className="text-[10px] font-black text-brand-cyan font-mono">4.2°C</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">O2 Levels</span>
            <span className="text-[10px] font-black text-slate-900 font-mono">20.9%</span>
          </div>
        </motion.div>
      )}

      <div className="mt-6 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '45%' }}
          className="h-full bg-brand-cyan rounded-full"
        />
      </div>
    </div>
  );
};
