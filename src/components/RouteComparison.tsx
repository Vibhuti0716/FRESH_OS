import React from 'react';
import { motion } from 'motion/react';
import { MOCK_DATA } from '../constants';
import { Clock, Navigation, Leaf, IndianRupee, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

interface RouteComparisonProps {
  start?: string;
  destination?: string;
}

export const RouteComparison: React.FC<RouteComparisonProps> = ({ start = 'New Delhi', destination = 'Mumbai' }) => {
  const routes = React.useMemo(() => {
    const seed = (start + destination).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const baseDist = 20 + (seed % 15);
    const baseAQI = 150 + (seed % 200);
    
    return {
      standard: {
        distance: `${baseDist.toFixed(1)} km`,
        time: `${Math.round(baseDist * 2.5)} mins`,
        aqiScore: baseAQI,
        freshness: 70 + (seed % 15),
        spoilageLoss: `₹${(seed * 15).toLocaleString()}`
      },
      fresh: {
        distance: `${(baseDist * 1.15).toFixed(1)} km`,
        time: `${Math.round(baseDist * 2.5 + 7)} mins`,
        aqiScore: Math.round(baseAQI * 0.3),
        freshness: 95 + (seed % 4),
        spoilageLoss: `₹${(seed * 2).toLocaleString()}`
      }
    };
  }, [start, destination]);

  const { standard, fresh } = routes;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-200 rounded-[2rem] p-8 relative overflow-hidden shadow-sm"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-cyan/60">Efficiency Matrix</span>
          <h3 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            Route Comparison
          </h3>
        </div>
        <div className="px-4 py-1.5 rounded-full bg-brand-cyan/5 border border-brand-cyan/10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-cyan">Neural Optimized</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <MetricItem icon={<Navigation size={18} />} label="Distance" standard={standard.distance} fresh={fresh.distance} />
          <MetricItem icon={<Clock size={18} />} label="Time" standard={standard.time} fresh={fresh.time} />
          <MetricItem icon={<Activity size={18} />} label="Avg AQI" standard={standard.aqiScore} fresh={fresh.aqiScore} freshColor="text-brand-cyan" standardColor="text-brand-red" />
        </div>
        <div className="space-y-6">
          <MetricItem icon={<Leaf size={18} />} label="Freshness" standard={`${standard.freshness}%`} fresh={`${fresh.freshness}%`} freshColor="text-brand-cyan" />
          <MetricItem icon={<IndianRupee size={18} />} label="Spoilage Loss" standard={standard.spoilageLoss} fresh={fresh.spoilageLoss} freshColor="text-brand-cyan" standardColor="text-brand-red" />
          
          <div className="p-6 rounded-3xl bg-brand-cyan/5 border border-brand-cyan/10 flex items-center justify-between mt-4 group hover:bg-brand-cyan/10 transition-all cursor-pointer">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-cyan mb-1">Net Savings</p>
              <p className="text-3xl font-black text-slate-900 leading-none">₹16,450</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-brand-cyan flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,242,255,0.3)]">
              <IndianRupee size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 rounded-3xl bg-slate-50 border border-slate-100">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Route Intelligence Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-1.5" />
            <p className="text-[11px] text-slate-600 leading-relaxed">
              <span className="text-slate-900 font-bold">Neural Path</span> increases distance by <span className="text-brand-cyan">{(parseFloat(fresh.distance) - parseFloat(standard.distance)).toFixed(1)} km</span> but reduces AQI exposure by <span className="text-brand-cyan">{Math.round(((standard.aqiScore - fresh.aqiScore) / standard.aqiScore) * 100)}%</span>.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-purple mt-1.5" />
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Trade-off: <span className="text-slate-900 font-bold">{parseInt(fresh.time) - parseInt(standard.time)} mins</span> extra travel time yields a <span className="text-brand-purple">{(fresh.freshness - standard.freshness).toFixed(0)}% gain</span> in cargo freshness at destination.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">
            Fleet Projection: <span className="text-brand-cyan font-bold">₹164.5 Lakh/day</span>
          </p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-1 h-1 rounded-full bg-brand-cyan/40" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MetricItem = ({ icon, label, standard, fresh, freshColor = "text-slate-900", standardColor = "text-slate-900" }: { 
  icon: React.ReactNode, 
  label: string, 
  standard: string | number, 
  fresh: string | number,
  freshColor?: string,
  standardColor?: string
}) => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-2 text-slate-400">
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{label}</span>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
        <p className="text-[8px] uppercase tracking-widest opacity-40">Legacy</p>
        <p className={cn("text-sm font-black font-mono", standardColor)}>{standard}</p>
      </div>
      <div className="p-4 rounded-2xl bg-brand-cyan/5 border border-brand-cyan/10 flex flex-col gap-1">
        <p className="text-[8px] uppercase tracking-widest text-brand-cyan/40">Neural</p>
        <p className={cn("text-sm font-black font-mono", freshColor)}>{fresh}</p>
      </div>
    </div>
  </div>
);
