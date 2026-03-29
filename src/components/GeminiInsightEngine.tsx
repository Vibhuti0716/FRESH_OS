import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Cpu, Zap, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const GeminiInsightEngine: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-brand-purple rounded-full" />
          <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Gemini Insight Engine</h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-[8px] font-black uppercase tracking-widest">AI Predictive</span>
      </div>

      {/* SHELF-LIFE REDUCTION */}
      <div className="bg-white border border-slate-200 rounded-[2rem] p-6 relative overflow-hidden group hover:border-slate-300 transition-all shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Shelf-Life Reduction</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-green-600">4.2%</span>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">vs 28% standard</span>
          </div>
        </div>
        
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '4.2%' }}
            className="h-full bg-green-500 rounded-full"
          />
        </div>
      </div>

      {/* CONTAMINATION RISK */}
      <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 relative overflow-hidden group hover:border-slate-200 transition-all shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Contamination Risk</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
            <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Low</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Score: 0.12</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={cn("w-3 h-1 rounded-full", i === 1 ? "bg-green-500" : "bg-slate-200")} />
            ))}
          </div>
        </div>
      </div>

      {/* ECONOMIC IMPACT */}
      <div className="bg-white border border-slate-200 rounded-[2rem] p-6 relative overflow-hidden group hover:border-slate-300 transition-all shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Economic Impact</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-brand-cyan">₹16,450</span>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">saved / shipment</span>
          </div>
        </div>
        
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            className="h-full bg-brand-cyan rounded-full shadow-[0_0_10px_rgba(0,242,255,0.4)]"
          />
        </div>
      </div>

      {/* AI RECOMMENDATION */}
      <div className="bg-brand-purple/5 border border-brand-purple/10 rounded-[2rem] p-6 relative overflow-hidden group hover:border-brand-purple/20 transition-all shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Cpu size={14} className="text-brand-purple" />
          <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-purple">AI Recommendation</h4>
        </div>
        <p className="text-[11px] font-bold text-slate-600 leading-relaxed">
          Route via <span className="text-slate-900">Vasant Kunj → NH-48 bypass</span> avoids severe PM2.5 concentration in Karol Bagh & CP corridors. Estimated <span className="text-green-600">+24h shelf-life gain</span> for fresh produce.
        </p>
      </div>
    </div>
  );
};
