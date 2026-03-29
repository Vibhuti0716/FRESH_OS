import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  Cell
} from 'recharts';
import { 
  Wind, 
  Navigation, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Info,
  Box,
  Thermometer,
  Layers
} from 'lucide-react';
import { cn } from '../lib/utils';
import { ConditionAnalysisChart } from './ConditionAnalysisChart';

const CARGO_CATEGORIES = [
  {
    id: 'raw-materials',
    name: 'Raw Materials',
    icon: <Layers size={14} />,
    description: 'Requires core protection from air quality and atmospheric shifts.',
    paths: [
      {
        id: 'path-a',
        name: 'Neural Express',
        aqi: 32,
        distance: 12.4,
        time: 24,
        cost: 18.5,
        freshness: 98,
        airQuality: [
          { segment: 'S1', aqi: 28 },
          { segment: 'S2', aqi: 35 },
          { segment: 'S3', aqi: 30 },
          { segment: 'S4', aqi: 34 },
          { segment: 'S5', aqi: 32 },
        ],
        isOptimal: true,
        description: "Lowest AQI exposure and maximum freshness retention."
      },
      {
        id: 'path-b',
        name: 'Direct Vector',
        aqi: 70,
        distance: 10.2,
        time: 18,
        cost: 14.2,
        freshness: 78,
        airQuality: [
          { segment: 'S1', aqi: 65 },
          { segment: 'S2', aqi: 75 },
          { segment: 'S3', aqi: 72 },
          { segment: 'S4', aqi: 70 },
          { segment: 'S5', aqi: 68 },
        ],
        isOptimal: false,
        description: "Fastest route but passes through high pollution zones."
      },
      {
        id: 'path-c',
        name: 'Eco Perimeter',
        aqi: 32,
        distance: 15.8,
        time: 32,
        cost: 22.1,
        freshness: 98,
        airQuality: [
          { segment: 'S1', aqi: 28 },
          { segment: 'S2', aqi: 34 },
          { segment: 'S3', aqi: 30 },
          { segment: 'S4', aqi: 35 },
          { segment: 'S5', aqi: 32 },
        ],
        isOptimal: false,
        description: "Longer distance but avoids major industrial sectors."
      }
    ]
  },
  {
    id: 'refrigerated',
    name: 'Refrigerated',
    icon: <Thermometer size={14} />,
    description: 'Needs stable temperature but comparatively lesser air quality attention.',
    paths: [
      {
        id: 'path-a',
        name: 'Neural Express',
        aqi: 52,
        distance: 11.8,
        time: 22,
        cost: 16.2,
        freshness: 91,
        airQuality: [
          { segment: 'S1', aqi: 48 },
          { segment: 'S2', aqi: 55 },
          { segment: 'S3', aqi: 50 },
          { segment: 'S4', aqi: 54 },
          { segment: 'S5', aqi: 52 },
        ],
        isOptimal: true,
        description: "Optimized for thermal stability over air purity."
      },
      {
        id: 'path-b',
        name: 'Direct Vector',
        aqi: 78,
        distance: 9.8,
        time: 16,
        cost: 12.5,
        freshness: 82,
        airQuality: [
          { segment: 'S1', aqi: 70 },
          { segment: 'S2', aqi: 85 },
          { segment: 'S3', aqi: 80 },
          { segment: 'S4', aqi: 78 },
          { segment: 'S5', aqi: 75 },
        ],
        isOptimal: false,
        description: "High speed delivery to minimize thermal exposure time."
      },
      {
        id: 'path-c',
        name: 'Eco Perimeter',
        aqi: 45,
        distance: 14.5,
        time: 28,
        cost: 19.8,
        freshness: 94,
        airQuality: [
          { segment: 'S1', aqi: 40 },
          { segment: 'S2', aqi: 48 },
          { segment: 'S3', aqi: 44 },
          { segment: 'S4', aqi: 46 },
          { segment: 'S5', aqi: 45 },
        ],
        isOptimal: false,
        description: "Safest route for long-term thermal maintenance."
      }
    ]
  },
  {
    id: 'physical-items',
    name: 'Physical Items',
    icon: <Box size={14} />,
    description: 'Very less or no air quality preference. Focused on structural integrity.',
    paths: [
      {
        id: 'path-a',
        name: 'Neural Express',
        aqi: 65,
        distance: 10.5,
        time: 19,
        cost: 13.8,
        freshness: 85,
        airQuality: [
          { segment: 'S1', aqi: 60 },
          { segment: 'S2', aqi: 70 },
          { segment: 'S3', aqi: 65 },
          { segment: 'S4', aqi: 68 },
          { segment: 'S5', aqi: 65 },
        ],
        isOptimal: true,
        description: "Balanced route for standard physical cargo."
      },
      {
        id: 'path-b',
        name: 'Direct Vector',
        aqi: 88,
        distance: 8.5,
        time: 14,
        cost: 10.2,
        freshness: 75,
        airQuality: [
          { segment: 'S1', aqi: 80 },
          { segment: 'S2', aqi: 95 },
          { segment: 'S3', aqi: 90 },
          { segment: 'S4', aqi: 88 },
          { segment: 'S5', aqi: 85 },
        ],
        isOptimal: false,
        description: "Maximum efficiency for non-sensitive cargo."
      },
      {
        id: 'path-c',
        name: 'Eco Perimeter',
        aqi: 58,
        distance: 13.2,
        time: 25,
        cost: 17.4,
        freshness: 88,
        airQuality: [
          { segment: 'S1', aqi: 55 },
          { segment: 'S2', aqi: 62 },
          { segment: 'S3', aqi: 58 },
          { segment: 'S4', aqi: 60 },
          { segment: 'S5', aqi: 58 },
        ],
        isOptimal: false,
        description: "Avoids high-vibration industrial sectors."
      }
    ]
  }
];

export const AnalyticsDashboard: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(CARGO_CATEGORIES[0].id);
  const selectedCategory = CARGO_CATEGORIES.find(c => c.id === selectedCategoryId)!;
  
  const [selectedPathId, setSelectedPathId] = useState(selectedCategory.paths[0].id);
  const selectedPath = selectedCategory.paths.find(p => p.id === selectedPathId)!;

  const comparisonData = selectedCategory.paths.map(p => ({
    name: p.name,
    aqi: p.aqi,
    freshness: p.freshness,
    cost: p.cost
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Path Analytics</h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">Neural Route Comparison Engine v4.2</p>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            {selectedCategory.paths.map(path => (
              <button
                key={path.id}
                onClick={() => setSelectedPathId(path.id)}
                className={cn(
                  "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  selectedPathId === path.id 
                    ? "bg-brand-cyan text-white shadow-[0_0_20px_rgba(0,242,255,0.4)]" 
                    : "text-slate-400 hover:text-slate-900 hover:bg-white/5"
                )}
              >
                {path.name}
              </button>
            ))}
          </div>
        </div>

        {/* CATEGORY SELECTOR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CARGO_CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategoryId(category.id);
                setSelectedPathId(category.paths[0].id);
              }}
              className={cn(
                "p-4 rounded-3xl border transition-all text-left relative overflow-hidden group",
                selectedCategoryId === category.id
                  ? "bg-white border-slate-300 shadow-2xl"
                  : "bg-slate-50 border-slate-100 hover:bg-slate-100 hover:border-slate-200"
              )}
            >
              {selectedCategoryId === category.id && (
                <motion.div 
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-brand-cyan/5"
                />
              )}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn(
                    "p-2 rounded-xl",
                    selectedCategoryId === category.id ? "bg-brand-cyan text-white" : "bg-slate-100 text-slate-400"
                  )}>
                    {category.icon}
                  </div>
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    selectedCategoryId === category.id ? "text-slate-900" : "text-slate-400"
                  )}>
                    {category.name}
                  </span>
                </div>
                <p className="text-[9px] font-bold text-slate-400 leading-tight">
                  {category.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: PRIMARY METRICS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 blur-[60px] -mr-16 -mt-16" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Selected Path Metrics</h3>
                {selectedPath.isOptimal && (
                  <span className="px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                    <ShieldCheck size={10} /> Neural Choice
                  </span>
                )}
              </div>

              <div className="space-y-8">
                <MetricRow 
                  label="Freshness Index" 
                  value={`${selectedPath.freshness}%`} 
                  icon={<Zap size={16} className="text-brand-cyan" />} 
                  progress={selectedPath.freshness}
                  color="bg-brand-cyan"
                />
                <MetricRow 
                  label="AQI Exposure" 
                  value={selectedPath.aqi.toString()} 
                  icon={<Wind size={16} className="text-brand-purple" />} 
                  progress={100 - selectedPath.aqi}
                  color="bg-brand-purple"
                  info="Data sourced from global environmental monitoring stations and local IoT sensors."
                />
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <SmallMetric label="Distance" value={`${selectedPath.distance} km`} icon={<Navigation size={12} />} />
                  <SmallMetric label="Est. Time" value={`${selectedPath.time} min`} icon={<Clock size={12} />} />
                  <SmallMetric label="Total Cost" value={`$${selectedPath.cost}`} icon={<DollarSign size={12} />} />
                  <SmallMetric label="Reliability" value="99.2%" icon={<ShieldCheck size={12} />} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-cyan/5 border border-brand-cyan/10 rounded-[2rem] p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-brand-cyan/10 text-brand-cyan">
                <Cpu size={20} />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-brand-cyan mb-2">Neural Recommendation</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {selectedPath.isOptimal 
                    ? "This path is currently the most efficient. It balances speed with atmospheric protection, ensuring your cargo maintains maximum freshness."
                    : `Switching to "Neural Express" would improve freshness by ${selectedCategory.paths[0].freshness - selectedPath.freshness}% and reduce AQI exposure significantly.`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN: CHARTS */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AQI COMPARISON */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-2">
                <TrendingUp size={14} className="text-brand-purple" /> AQI Comparison
              </h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#00000005" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#00000020', fontSize: 9, fontWeight: 700 }}
                    />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid rgba(0, 0, 0, 0.05)', borderRadius: '12px', fontSize: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                      itemStyle={{ color: '#000' }}
                    />
                    <Bar dataKey="aqi" radius={[8, 8, 0, 0]}>
                      {comparisonData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.name === selectedPath.name ? '#00f2ff' : '#00000005'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* FRESHNESS TREND */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-2">
                <Zap size={14} className="text-brand-cyan" /> Freshness Retention
              </h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={comparisonData}>
                    <defs>
                      <linearGradient id="colorFresh" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#00000005" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#00000020', fontSize: 9, fontWeight: 700 }}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid rgba(0, 0, 0, 0.05)', borderRadius: '12px', fontSize: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="freshness" 
                      stroke="#00f2ff" 
                      fillOpacity={1} 
                      fill="url(#colorFresh)" 
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* PATH AIR QUALITY SEGMENTS */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                <Wind size={14} className="text-brand-pink" /> Segment Air Quality: {selectedPath.name}
              </h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-cyan" />
                  <span className="text-[8px] font-bold text-slate-400 uppercase">Optimal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-pink" />
                  <span className="text-[8px] font-bold text-slate-400 uppercase">Critical</span>
                </div>
              </div>
            </div>
            
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedPath.airQuality}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#00000005" vertical={false} />
                  <XAxis 
                    dataKey="segment" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#00000020', fontSize: 9, fontWeight: 700 }}
                  />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid rgba(0, 0, 0, 0.05)', borderRadius: '12px', fontSize: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  />
                  <Line 
                    type="stepAfter" 
                    dataKey="aqi" 
                    stroke="#ff00ff" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#ff00ff', strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: '#fff', stroke: '#ff00ff', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* NEW CONDITION ANALYSIS CHART */}
      <div className="grid grid-cols-1">
        <ConditionAnalysisChart />
      </div>
    </div>
  );
};

function MetricRow({ label, value, icon, progress, color, info }: { label: string, value: string, icon: any, progress: number, color: string, info?: string }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-slate-50">
            {icon}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
              {info && (
                <div className="group relative">
                  <Info size={10} className="text-slate-200 hover:text-brand-cyan transition-colors cursor-help" />
                  <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-white border border-slate-200 rounded-lg text-[8px] font-bold text-slate-400 leading-tight opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
                    {info}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <span className="text-xl font-black text-slate-900 font-mono">{value}</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full", color)} 
        />
      </div>
    </div>
  );
}

function SmallMetric({ label, value, icon }: { label: string, value: string, icon: any }) {
  return (
    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
      <div className="flex items-center gap-2 mb-2 text-slate-400">
        {icon}
        <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-sm font-black text-slate-900 font-mono tracking-tight">{value}</p>
    </div>
  );
}
