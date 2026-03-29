import React from 'react';
import { MOCK_DATA } from '../constants';
import { cn } from '../lib/utils';
import { Truck, ChevronRight } from 'lucide-react';

export const FleetOverview: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      {MOCK_DATA.trucks.map((truck) => (
        <div 
          key={truck.id} 
          className="bg-white border border-slate-200 rounded-3xl p-5 flex items-center justify-between hover:bg-slate-50 transition-all cursor-pointer group relative overflow-hidden shadow-sm"
        >
          <div className="flex items-center gap-4 relative z-10">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
              truck.status === 'Active' ? "bg-brand-cyan/10 text-brand-cyan shadow-[0_0_15px_rgba(0,242,255,0.2)]" : "bg-brand-orange/10 text-brand-orange shadow-[0_0_15px_rgba(255,170,0,0.2)]"
            )}>
              <Truck size={20} />
            </div>
            <div>
              <p className="text-sm font-black text-slate-900 group-hover:text-brand-cyan transition-colors">{truck.name}</p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold font-mono">{truck.id} // {truck.status.toUpperCase()}</p>
            </div>
          </div>
          
          <div className="flex gap-8 items-center relative z-10">
            <div className="text-right">
              <p className="text-[8px] uppercase tracking-widest text-slate-300 mb-1 font-mono">Health</p>
              <p className="text-sm font-black text-brand-cyan font-mono">{truck.routeHealth}%</p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-[8px] uppercase tracking-widest text-slate-300 mb-1 font-mono">Bio-Pres</p>
              <p className="text-sm font-black text-slate-900 font-mono">{truck.freshnessScore}%</p>
            </div>
            <div className="p-1 rounded-lg bg-slate-100 group-hover:bg-brand-cyan/20 transition-colors">
              <ChevronRight size={14} className="text-slate-400 group-hover:text-brand-cyan transition-colors" />
            </div>
          </div>

          {/* Decorative scanner line on hover */}
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      ))}
    </div>
  );
};
