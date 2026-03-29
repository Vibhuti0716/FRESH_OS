import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { Thermometer } from 'lucide-react';

interface Props {
  percentage?: number;
  grade?: string;
}

export const FreshnessMeter: React.FC<Props> = ({ percentage = 88, grade = "A" }) => {
  const data = [
    { v: percentage },
    { v: 100 - percentage }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] p-6 relative overflow-hidden group shadow-sm">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Thermometer size={48} className="text-brand-cyan" />
      </div>
      
      <div className="flex flex-col gap-1 mb-4">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-cyan/60">Bio-Preservation</span>
        <h3 className="text-lg font-black tracking-tight text-slate-900 flex items-center gap-2">
          Freshness Index
        </h3>
      </div>

      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <div className="text-6xl font-black text-slate-900 leading-none tracking-tighter">
            {percentage}<span className="text-2xl text-brand-cyan opacity-50">%</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="px-2 py-0.5 rounded bg-brand-cyan/5 border border-brand-cyan/10">
              <span className="text-[10px] font-mono font-bold text-brand-cyan uppercase tracking-widest">Grade {grade}</span>
            </div>
          </div>
        </div>

        <div className="h-20 w-20 relative">
          <PieChart width={80} height={80}>
            <Pie 
              data={data} 
              innerRadius={28} 
              outerRadius={38} 
              dataKey="v" 
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              <Cell fill="#00f2ff" />
              <Cell fill="rgba(0,0,0,0.05)" />
            </Pie>
          </PieChart>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center bg-slate-50">
              <span className="text-[10px] font-mono font-bold text-slate-400">{grade}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-400">
          <span>Status</span>
          <span className={percentage > 80 ? 'text-brand-cyan' : 'text-brand-red'}>
            {percentage > 80 ? 'NOMINAL' : 'CRITICAL'}
          </span>
        </div>
      </div>
    </div>
  );
};
