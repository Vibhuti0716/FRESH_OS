import React from 'react';
import { motion } from 'framer-motion';
import { TacticalMap } from './TacticalMap';
import { RouteComparisonPanel } from './RouteComparisonPanel';
import { GeminiInsightEngine } from './GeminiInsightEngine';
import { LiveTrackingPanel } from './LiveTrackingPanel';
import { StrategicIntents } from './StrategicIntents';
import { ConditionAnalysisChart } from './ConditionAnalysisChart';
import { Cpu, Wind, ShieldCheck, Zap } from 'lucide-react';

interface TacticalDashboardProps {
  start?: string;
  destination?: string;
}

export const TacticalDashboard: React.FC<TacticalDashboardProps> = ({ start, destination }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: STRATEGIC INTENTS & ENGINE COMPARISON */}
        <div className="lg:col-span-3 space-y-6">
          <StrategicIntents />
          <RouteComparisonPanel />
        </div>

        {/* MIDDLE COLUMN: TACTICAL MAP */}
        <div className="lg:col-span-6 space-y-6 flex flex-col">
          <div className="flex-1 min-h-[600px]">
            <TacticalMap />
          </div>
        </div>

        {/* RIGHT COLUMN: GEMINI INSIGHT ENGINE & LIVE TRACKING */}
        <div className="lg:col-span-3 space-y-6">
          <GeminiInsightEngine />
          <LiveTrackingPanel />
        </div>
      </div>

      {/* CONDITION ANALYSIS CHART */}
      <div className="grid grid-cols-1 gap-6">
        <ConditionAnalysisChart start={start} destination={destination} />
      </div>

      {/* FOOTER STATS BAR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <BottomStat label="Grid Cells" value="1,247" icon={<Cpu size={14} />} />
        <BottomStat label="Active Sensors" value="12" icon={<Wind size={14} />} />
        <BottomStat label="Last AQI Sync" value="14s ago" icon={<ShieldCheck size={14} />} />
        <BottomStat label="API Latency" value="23ms" icon={<Zap size={14} />} />
      </div>
    </div>
  );
};

const BottomStat = ({ label, value, icon }: { label: string, value: string, icon: any }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 group hover:border-slate-300 transition-all shadow-sm">
    <div className="p-2 rounded-xl bg-slate-50 text-slate-400 group-hover:text-brand-cyan transition-colors">
      {icon}
    </div>
    <div>
      <p className="text-[8px] uppercase tracking-widest text-slate-400 font-bold">{label}</p>
      <p className="text-sm font-black text-slate-900 font-mono">{value}</p>
    </div>
  </div>
);
