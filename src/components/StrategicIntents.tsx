import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Zap, ShieldCheck, Clock, DollarSign, Target } from 'lucide-react';

const INTENTS = [
  { id: 'freshness', label: 'Freshness First', icon: <Zap size={14} />, color: 'text-brand-cyan', description: 'Prioritize AQI and thermal stability.' },
  { id: 'speed', label: 'Rapid Delivery', icon: <Clock size={14} />, color: 'text-brand-purple', description: 'Minimize transit time and distance.' },
  { id: 'cost', label: 'Economic Mode', icon: <DollarSign size={14} />, color: 'text-brand-pink', description: 'Optimize for fuel and spoilage costs.' },
  { id: 'safety', label: 'Risk Averse', icon: <ShieldCheck size={14} />, color: 'text-green-500', description: 'Avoid all high-pollution and traffic zones.' },
];

export const StrategicIntents: React.FC = () => {
  const [activeIntent, setActiveIntent] = React.useState('freshness');
  const [isCalculating, setIsCalculating] = React.useState(false);

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* CARGO PROFILE CARD */}
      <div className="bg-white border border-slate-200 rounded-[2rem] p-6 relative overflow-hidden group hover:border-slate-300 transition-all shadow-sm">
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-cyan/5 blur-2xl -mr-12 -mt-12" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Active Profile</span>
            <span className="text-[8px] font-black text-brand-cyan uppercase tracking-widest">High Priority</span>
          </div>
          <h4 className="text-lg font-black text-slate-900 tracking-tight mb-1">Fresh Produce</h4>
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">High Perishability Index</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-6 mb-2">
        <Target size={14} className="text-slate-400" />
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Strategic Intents</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {INTENTS.map((intent) => (
          <button
            key={intent.id}
            disabled={isCalculating}
            onClick={() => setActiveIntent(intent.id)}
            className={cn(
              "p-4 rounded-2xl border transition-all text-left relative overflow-hidden group",
              activeIntent === intent.id
                ? "bg-white border-slate-300 shadow-lg"
                : "bg-slate-50 border-slate-100 hover:bg-white hover:border-slate-200",
              isCalculating && "opacity-50 cursor-not-allowed"
            )}
          >
            {activeIntent === intent.id && (
              <motion.div 
                layoutId="activeIntent"
                className="absolute inset-0 bg-brand-cyan/5"
              />
            )}
            <div className="relative z-10 flex items-center gap-4">
              <div className={cn(
                "p-2 rounded-xl transition-all",
                activeIntent === intent.id ? "bg-brand-cyan text-white shadow-[0_0_15px_rgba(0,242,255,0.4)]" : "bg-slate-200 text-slate-400"
              )}>
                {intent.icon}
              </div>
              <div>
                <p className={cn(
                  "text-[10px] font-black uppercase tracking-widest transition-colors",
                  activeIntent === intent.id ? "text-slate-900" : "text-slate-400"
                )}>
                  {intent.label}
                </p>
                <p className="text-[9px] font-bold text-slate-400 leading-tight mt-1">
                  {intent.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <button 
        onClick={handleCalculate}
        disabled={isCalculating}
        className={cn(
          "w-full py-4 mt-2 bg-brand-purple text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-[0_0_20px_rgba(188,19,254,0.3)] hover:shadow-[0_0_30px_rgba(188,19,254,0.5)] transition-all flex items-center justify-center gap-2 active:scale-95 relative overflow-hidden",
          isCalculating && "opacity-80"
        )}
      >
        {isCalculating ? (
          <>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Zap size={14} />
            </motion.div>
            Neural Processing...
          </>
        ) : (
          <>
            <Zap size={14} /> Calculate Best Value Route
          </>
        )}
        {isCalculating && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        )}
      </button>
    </div>
  );
};
