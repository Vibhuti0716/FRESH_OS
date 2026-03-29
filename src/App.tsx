import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  BarChart3, 
  Settings, 
  Bell, 
  Search, 
  Navigation,
  Wind,
  ShieldCheck,
  Zap,
  Cpu,
  Globe,
  Activity
} from 'lucide-react';
import { MapSection } from './components/MapSection';
import { RouteComparison } from './components/RouteComparison';
import { FreshnessMeter } from './components/FreshnessMeter';
import { AQITrend } from './components/AQITrend';
import { AlertsPanel } from './components/AlertsPanel';
import { AIInsights } from './components/AIInsights';
import { FleetOverview } from './components/FleetOverview';
import { RoutePlanner } from './components/RoutePlanner';
import { LogisticsMatrix } from './components/LogisticsMatrix';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { TacticalDashboard } from './components/TacticalDashboard';
import { NavigationMap } from './components/NavigationMap';
import { ConditionAnalysisChart } from './components/ConditionAnalysisChart';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState('tactical');
  const [routeData, setRouteData] = useState({
    start: 'Connaught Place',
    destination: 'Dwarka'
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans tech-grid">
      
      {/* TOP NAVIGATION */}
      <header className="sticky top-0 z-50 w-full px-6 py-4 backdrop-blur-xl border-b border-black/5 flex items-center justify-between bg-white/80">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-brand-purple rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(188,19,254,0.2)] animate-float">
            <Cpu size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-slate-900">FRESH<span className="text-brand-cyan">OS</span></h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Neural Logistics v4.0</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <TopNavItem icon={<LayoutDashboard size={18} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <TopNavItem icon={<MapIcon size={18} />} label="Tactical" active={activeTab === 'tactical'} onClick={() => setActiveTab('tactical')} />
          <TopNavItem icon={<Navigation size={18} />} label="Navigation" active={activeTab === 'navigation'} onClick={() => setActiveTab('navigation')} />
          <TopNavItem icon={<Activity size={18} />} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          <TopNavItem icon={<Settings size={18} />} label="System" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-brand-cyan hover:border-brand-cyan/30 transition-all">
            <Search size={20} />
          </button>
          <button className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-brand-purple hover:border-brand-purple/30 transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand-pink rounded-full shadow-[0_0_10px_rgba(255,0,255,0.4)]" />
          </button>
          <div className="w-10 h-10 rounded-full border-2 border-brand-cyan/20 p-0.5">
            <img 
              src="https://picsum.photos/seed/admin/100/100" 
              alt="User" 
              className="w-full h-full rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-6 space-y-6">
        {activeTab === 'overview' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-12">
            <div className="lg:col-span-8">
              <RoutePlanner 
                onStartNavigation={(start, dest) => {
                  setRouteData({ start, destination: dest });
                  setActiveTab('navigation');
                }} 
              />
            </div>
            <div className="lg:col-span-4">
              <LogisticsMatrix />
            </div>
          </div>
        ) : activeTab === 'analytics' ? (
          <div className="py-12">
            <AnalyticsDashboard />
          </div>
        ) : activeTab === 'navigation' ? (
          <div className="py-12">
            <div className="flex flex-col gap-6 mb-8">
              <div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Neural Navigation</h2>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">Real-time GPS & Route Optimization for India</p>
              </div>
            </div>
            <NavigationMap start={routeData.start} destination={routeData.destination} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* LEFT COLUMN - STATS & INSIGHTS */}
              <div className="lg:col-span-4 space-y-6">
                <AIInsights start={routeData.start} destination={routeData.destination} />
                <div className="grid grid-cols-2 gap-4">
                  <StatCard label="Active Units" value="14" subValue="+2 today" icon={<Cpu size={16} />} color="text-brand-cyan" />
                  <StatCard label="Global Coverage" value="98.2%" subValue="Optimal" icon={<Globe size={16} />} color="text-brand-purple" />
                </div>
                <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm relative overflow-hidden">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2 text-slate-500">
                    <Wind size={14} className="text-brand-cyan" /> AQI Distribution
                  </h3>
                  <AQITrend start={routeData.start} destination={routeData.destination} />
                </div>
              </div>

              {/* MIDDLE COLUMN - MAP & COMPARISON */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white border border-slate-200 rounded-[2rem] h-[500px] overflow-hidden relative group shadow-sm">
                  <MapSection />
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                    <button 
                      onClick={() => setActiveTab('navigation')}
                      className="p-2 bg-white/80 backdrop-blur-md rounded-lg border border-slate-200 text-slate-600 hover:text-brand-cyan transition-all shadow-lg"
                    >
                      <Navigation size={18} />
                    </button>
                  </div>
                </div>
                <RouteComparison start={routeData.start} destination={routeData.destination} />
              </div>

              {/* RIGHT COLUMN - FLEET & ALERTS */}
              <div className="lg:col-span-3 space-y-6">
                <FreshnessMeter 
                  percentage={90 + ((routeData.start + routeData.destination).length % 8)} 
                  grade={((routeData.start + routeData.destination).length % 5) === 0 ? "A+" : "A"} 
                />
                
                <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 text-slate-500">
                      <Cpu size={14} className="text-brand-purple" /> Fleet Status
                    </h3>
                    <button className="text-[9px] font-bold text-brand-cyan uppercase tracking-widest hover:underline">View All</button>
                  </div>
                  <FleetOverview />
                </div>

                <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 text-slate-500">
                      <Bell size={14} className="text-brand-pink" /> System Alerts
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-brand-red/10 text-brand-red text-[8px] font-bold tracking-tighter">3 NEW</span>
                  </div>
                  <AlertsPanel />
                </div>
              </div>
            </div>

            {/* NEW CONDITION ANALYSIS CHART */}
            <div className="grid grid-cols-1">
              <ConditionAnalysisChart start={routeData.start} destination={routeData.destination} />
            </div>
          </div>
        )}

        {/* BOTTOM STATS BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <BottomStat label="Total Distance" value="4,281 km" icon={<Navigation size={14} />} />
          <BottomStat label="Avg AQI Score" value="42.8" icon={<Wind size={14} />} />
          <BottomStat label="CO2 Prevented" value="1.24 Tons" icon={<ShieldCheck size={14} />} />
          <BottomStat label="System Uptime" value="99.99%" icon={<Zap size={14} />} />
        </div>
      </main>

      {/* FOOTER MARQUEE */}
      <footer className="w-full bg-white border-t border-slate-200 py-2 overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee gap-12 items-center">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-12 items-center">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400">
                <span className="text-brand-cyan mr-2">●</span> Live Telemetry: Unit-742 passing through Sector-9 (AQI: 42)
              </span>
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400">
                <span className="text-brand-purple mr-2">●</span> Neural Optimization: Route recalculated for Fleet-Alpha
              </span>
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400">
                <span className="text-brand-pink mr-2">●</span> System Status: All cores operational at 14ms latency
              </span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}

function TopNavItem({ icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all",
        active 
          ? "bg-white text-slate-900 shadow-sm border border-slate-200" 
          : "text-slate-400 hover:text-slate-900 hover:bg-white/50"
      )}
    >
      <span className={active ? "text-brand-cyan" : ""}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function StatCard({ label, value, subValue, icon, color }: { label: string, value: string, subValue: string, icon: any, color: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-[1.5rem] p-5 shadow-sm hover:border-brand-cyan/30 transition-all group">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">{label}</span>
        <div className={cn("p-1.5 rounded-lg bg-slate-50", color)}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-black text-slate-900 mb-1 tracking-tight">{value}</p>
      <p className={cn("text-[9px] font-bold uppercase tracking-widest", color)}>{subValue}</p>
    </div>
  );
}

function BottomStat({ label, value, icon }: { label: string, value: string, icon: any }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-4">
      <div className="p-2 rounded-xl bg-slate-50 text-slate-400">
        {icon}
      </div>
      <div>
        <p className="text-[8px] uppercase tracking-widest text-slate-400 font-bold">{label}</p>
        <p className="text-sm font-black text-slate-900 font-mono">{value}</p>
      </div>
    </div>
  );
}
