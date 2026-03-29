import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Navigation, Wind, Leaf, Clock, IndianRupee } from 'lucide-react';

export const RouteComparisonPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-4 bg-brand-orange rounded-full" />
        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">A* Engine Comparison</h3>
      </div>

      {/* STANDARD ROUTE */}
      <div className="bg-white border border-slate-200 rounded-[2rem] p-6 relative overflow-hidden group hover:border-slate-300 transition-all shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Standard Route</span>
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-[8px] font-black uppercase tracking-widest">High Risk</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <Metric label="22.4" sub="km" icon={<Navigation size={12} />} />
          <Metric label="350" sub="Avg AQI" icon={<Wind size={12} />} color="text-red-600" />
          <Metric label="72%" sub="Freshness" icon={<Leaf size={12} />} />
        </div>
      </div>

      {/* OPTIMIZED ROUTE */}
      <div className="bg-white border border-slate-200 rounded-[2rem] p-6 relative overflow-hidden group hover:border-slate-300 transition-all shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Optimized Route</span>
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-[8px] font-black uppercase tracking-widest">Safe</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <Metric label="26.1" sub="km" icon={<Navigation size={12} />} />
          <Metric label="80" sub="Avg AQI" icon={<Wind size={12} />} color="text-green-600" />
          <Metric label="96%" sub="Freshness" icon={<Leaf size={12} />} />
        </div>
      </div>

      {/* DELTA & SAVINGS */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 border border-slate-100 rounded-[1.5rem] p-5 shadow-sm">
          <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400 mb-2">Time Delta</p>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-brand-cyan" />
            <p className="text-xl font-black text-brand-cyan">+7 mins</p>
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-[1.5rem] p-5 shadow-sm">
          <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400 mb-2">Value Saved</p>
          <div className="flex items-center gap-2">
            <IndianRupee size={14} className="text-brand-cyan" />
            <p className="text-xl font-black text-brand-cyan">₹16,450</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Metric = ({ label, sub, icon, color = "text-slate-900" }: { label: string, sub: string, icon: any, color?: string }) => (
  <div className="flex flex-col gap-1">
    <p className={cn("text-2xl font-black tracking-tight", color)}>{label}</p>
    <div className="flex items-center gap-1.5 text-slate-400">
      {icon}
      <span className="text-[8px] font-bold uppercase tracking-widest">{sub}</span>
    </div>
  </div>
);
