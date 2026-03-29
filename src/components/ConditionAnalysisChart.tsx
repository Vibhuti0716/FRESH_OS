import React from 'react';
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Activity, Wind, Navigation } from 'lucide-react';

interface ConditionAnalysisChartProps {
  start?: string;
  destination?: string;
}

export const ConditionAnalysisChart: React.FC<ConditionAnalysisChartProps> = ({ start = 'New Delhi', destination = 'Mumbai' }) => {
  const data = React.useMemo(() => {
    const seed = (start + destination).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const points = 10;
    const result = [];
    
    let currentFreshness = 100;
    
    for (let i = 0; i <= points; i++) {
      const distance = (i * 150) + (seed % 50);
      const aqi = 50 + Math.sin(i + seed) * 40 + (seed % 100);
      
      // Freshness decreases faster if AQI is high
      const decay = 1 + (aqi / 100);
      currentFreshness -= decay;
      
      result.push({
        distance,
        aqi: Math.round(aqi),
        freshness: Math.max(0, Math.round(currentFreshness)),
      });
    }
    return result;
  }, [start, destination]);

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] p-8 relative overflow-hidden h-full shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-purple/60">Neural Correlation</span>
          <h3 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            Condition vs. Environment
          </h3>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-cyan" />
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Freshness</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-purple" />
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">AQI</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <defs>
              <linearGradient id="colorFreshness" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#00000005" vertical={false} />
            <XAxis 
              dataKey="distance" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#00000020', fontSize: 9, fontWeight: 700 }}
              label={{ value: 'Distance (km)', position: 'insideBottom', offset: -5, fill: '#00000020', fontSize: 8, fontWeight: 800 }}
            />
            <YAxis 
              yId="left"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#00f2ff', fontSize: 9, fontWeight: 700 }}
              domain={[0, 100]}
            />
            <YAxis 
              yId="right"
              orientation="right"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#bc13fe', fontSize: 9, fontWeight: 700 }}
              domain={[0, 500]}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid rgba(0, 0, 0, 0.05)', borderRadius: '12px', fontSize: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              itemStyle={{ fontSize: '10px', fontWeight: 'bold' }}
              cursor={{ stroke: 'rgba(0, 0, 0, 0.05)', strokeWidth: 2 }}
            />
            <Area 
              yId="left"
              type="monotone" 
              dataKey="freshness" 
              fill="url(#colorFreshness)" 
              stroke="#00f2ff" 
              strokeWidth={3}
              dot={{ r: 4, fill: '#00f2ff', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#fff', stroke: '#00f2ff', strokeWidth: 2 }}
            />
            <Line 
              yId="right"
              type="monotone" 
              dataKey="aqi" 
              stroke="#bc13fe" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3, fill: '#bc13fe', strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <p className="text-[8px] uppercase tracking-widest text-slate-400 font-bold mb-1">Decay Rate</p>
          <p className="text-lg font-black text-brand-cyan">1.4% / 100km</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <p className="text-[8px] uppercase tracking-widest text-slate-400 font-bold mb-1">AQI Impact</p>
          <p className="text-lg font-black text-brand-purple">High</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <p className="text-[8px] uppercase tracking-widest text-slate-400 font-bold mb-1">Critical Zone</p>
          <p className="text-lg font-black text-slate-900">850km+</p>
        </div>
      </div>
    </div>
  );
};
