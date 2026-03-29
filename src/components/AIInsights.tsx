import React from 'react';
import { Brain, TrendingDown, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface AIInsightsProps {
  start?: string;
  destination?: string;
}

export const AIInsights: React.FC<AIInsightsProps> = ({ start = 'New Delhi', destination = 'Mumbai' }) => {
  const insights = React.useMemo(() => {
    const seed = (start + destination).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const risk = (5 + (seed % 20)).toFixed(1);
    const freshness = (90 + (seed % 8)).toFixed(1);
    const status = parseFloat(risk) > 15 ? 'Critical' : parseFloat(risk) > 10 ? 'Moderate' : 'Low';
    const color = status === 'Critical' ? 'text-brand-red' : status === 'Moderate' ? 'text-brand-orange' : 'text-green-500';
    
    return { risk, freshness, status, color };
  }, [start, destination]);

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-white border border-slate-200 rounded-[2rem] p-8 relative overflow-hidden group shadow-sm">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
          <Brain size={120} className="text-brand-purple" />
        </div>

        <div className="flex items-center gap-4 mb-8 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-brand-purple flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            <Brain size={24} />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-purple/60">Neural Core v4.0</span>
            <h4 className="text-xl font-black tracking-tight text-slate-900">Route Intelligence</h4>
          </div>
        </div>
        
        <div className="space-y-8 relative z-10">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-2 font-mono">Spoilage Risk Probability</p>
              <p className={cn("text-4xl font-black tracking-tighter", insights.color)}>{insights.risk}<span className="text-xl opacity-50">%</span></p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <TrendingDown className={cn("mb-1", insights.color)} size={32} />
              <span className={cn("text-[9px] font-bold uppercase tracking-widest", insights.color)}>{insights.status}</span>
            </div>
          </div>
          
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className={cn("h-full rounded-full shadow-[0_0_10px_rgba(255,170,0,0.3)]", insights.color.replace('text-', 'bg-'))} style={{ width: `${insights.risk}%` }} />
          </div>

          <div className="p-6 rounded-3xl bg-brand-cyan/5 border border-brand-cyan/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1.5 bg-brand-cyan/10 rounded-lg">
                <ShieldCheck size={18} className="text-brand-cyan" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-cyan">Neural Recommendation</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Maintain current <span className="text-brand-cyan font-bold">Neural-Path</span> trajectory for <span className="text-slate-900">{destination}</span>. 
              Incoming AQI spike will be bypassed. Estimated freshness at destination: <span className="text-slate-900 font-bold">{insights.freshness}%</span>.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-slate-300">
          <span>Processing...</span>
          <span>Latency: 14ms</span>
        </div>
      </div>
    </div>
  );
};
