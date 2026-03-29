import React from 'react';
import { AlertTriangle, Info, XCircle } from 'lucide-react';
import { MOCK_DATA } from '../constants';
import { cn } from '../lib/utils';

export const AlertsPanel: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      {MOCK_DATA.alerts.map((alert) => (
        <div 
          key={alert.id} 
          className={cn(
            "rounded-[2rem] p-6 border transition-all hover:scale-[1.02] group relative overflow-hidden shadow-sm",
            alert.type === 'critical' ? "bg-brand-red/5 border-brand-red/10" : 
            alert.type === 'warning' ? "bg-brand-orange/5 border-brand-orange/10" : 
            "bg-brand-cyan/5 border-brand-cyan/10"
          )}
        >
          <div className="flex gap-4 relative z-10">
            <div className={cn(
              "p-3 rounded-2xl shrink-0 flex items-center justify-center",
              alert.type === 'critical' ? "bg-brand-red/10 text-brand-red shadow-[0_0_15px_rgba(255,0,60,0.3)]" : 
              alert.type === 'warning' ? "bg-brand-orange/10 text-brand-orange shadow-[0_0_15px_rgba(255,170,0,0.3)]" : 
              "bg-brand-cyan/10 text-brand-cyan shadow-[0_0_15px_rgba(0,242,255,0.3)]"
            )}>
              {alert.type === 'critical' ? <XCircle size={20} /> : 
               alert.type === 'warning' ? <AlertTriangle size={20} /> : 
               <Info size={20} />}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className={cn(
                  "text-[10px] font-black uppercase tracking-[0.2em]",
                  alert.type === 'critical' ? "text-brand-red" : 
                  alert.type === 'warning' ? "text-brand-orange" : 
                  "text-brand-cyan"
                )}>
                  {alert.type === 'critical' ? 'Critical Delta' : 
                   alert.type === 'warning' ? 'Atmospheric Warning' : 
                   'System Update'}
                </h3>
                <span className="text-[8px] opacity-30 font-mono tracking-tighter text-slate-400">{alert.timestamp}</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                Pollution spike in <span className="text-slate-900 font-bold">{alert.location}</span>. 
                AQI: <span className="font-mono font-bold text-slate-900">{alert.aqi}</span>. Freshness degradation risk detected.
              </p>
            </div>
          </div>
          
          {/* Decorative tech lines */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>
      ))}
    </div>
  );
};
