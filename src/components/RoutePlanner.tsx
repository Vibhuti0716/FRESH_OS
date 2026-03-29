import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Navigation, 
  Truck, 
  Car, 
  Bike, 
  Footprints, 
  Package, 
  Apple, 
  ArrowRight, 
  ChevronLeft,
  Zap,
  Droplets,
  ThermometerSnowflake,
  Box,
  CheckCircle2,
  Wind,
  Search
} from 'lucide-react';
import { cn } from '../lib/utils';

const DELHI_AREAS = [
  "Connaught Place", "Chandni Chowk", "Dwarka", "Rohini", "Saket", 
  "Vasant Kunj", "Hauz Khas", "Karol Bagh", "Lajpat Nagar", "Okhla", 
  "Janakpuri", "Pitampura", "Paschim Vihar", "Model Town", "Civil Lines", 
  "Greater Kailash", "Nehru Place", "Sarita Vihar", "Mayur Vihar", "Laxmi Nagar",
  "RK Puram", "Punjabi Bagh", "Rajouri Garden", "Vasant Vihar", "Chanakyapuri"
];

type Step = 'locations' | 'purpose' | 'goods' | 'edible' | 'result';

interface RouteData {
  start: string;
  destination: string;
  purpose: 'transporting' | 'travelling' | null;
  vehicle: string | null;
  goodType: 'edible' | 'normal' | null;
  edibleType: 'raw' | 'packed' | 'refrigerated' | null;
}

interface RoutePlannerProps {
  onStartNavigation?: (start: string, destination: string) => void;
}

export function RoutePlanner({ onStartNavigation }: RoutePlannerProps) {
  const [step, setStep] = useState<Step>('locations');
  const [data, setData] = useState<RouteData>({
    start: '',
    destination: '',
    purpose: null,
    vehicle: null,
    goodType: null,
    edibleType: null,
  });

  const [showStartSuggestions, setShowStartSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const startRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (startRef.current && !startRef.current.contains(event.target as Node)) {
        setShowStartSuggestions(false);
      }
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setShowDestSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredStartStates = DELHI_AREAS.filter(state => 
    state.toLowerCase().includes(data.start.toLowerCase()) && data.start !== ''
  );

  const filteredDestStates = DELHI_AREAS.filter(state => 
    state.toLowerCase().includes(data.destination.toLowerCase()) && data.destination !== ''
  );

  const vehicles = [
    { id: 'truck', label: 'Truck', icon: <Truck size={20} /> },
    { id: 'mini-van', label: 'Mini Van', icon: <Box size={20} /> },
    { id: 'car', label: 'Car', icon: <Car size={20} /> },
    { id: 'bike', label: 'Bike/Scooter', icon: <Bike size={20} /> },
    { id: 'auto-e', label: 'Auto (E-Rickshaw)', icon: <Zap size={20} /> },
    { id: 'auto-oil', label: 'Auto (Oil)', icon: <Droplets size={20} /> },
    { id: 'walking', label: 'Walking', icon: <Footprints size={20} /> },
  ];

  const goodTypes = [
    { id: 'edible', label: 'Edible Items', icon: <Apple size={20} />, description: 'Food, perishables, groceries' },
    { id: 'normal', label: 'Normal Stuff', icon: <Package size={20} />, description: 'Car, bike, electronics, general goods' },
  ];

  const edibleTypes = [
    { id: 'raw', label: 'Raw Veggies', icon: <Wind size={20} />, description: 'Fresh produce, requires airflow' },
    { id: 'packed', label: 'Packed Food', icon: <Package size={20} />, description: 'Sealed items, standard handling' },
    { id: 'refrigerated', label: 'Refrigerated', icon: <ThermometerSnowflake size={20} />, description: 'Cold chain, temperature controlled' },
  ];

  const nextStep = () => {
    if (step === 'locations') setStep('purpose');
    else if (step === 'purpose') {
      if (data.purpose === 'transporting') setStep('goods');
      else setStep('result');
    }
    else if (step === 'goods') {
      if (data.goodType === 'edible') setStep('edible');
      else setStep('result');
    }
    else if (step === 'edible') setStep('result');
  };

  const prevStep = () => {
    if (step === 'purpose') setStep('locations');
    else if (step === 'goods') setStep('purpose');
    else if (step === 'edible') setStep('goods');
    else if (step === 'result') {
      if (data.purpose === 'travelling') setStep('purpose');
      else if (data.goodType === 'normal') setStep('goods');
      else setStep('edible');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-xl">
        {/* Background glow - more subtle for light theme */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/5 blur-[100px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-purple/5 blur-[100px] -ml-32 -mb-32" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Neural Route Engine</h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">Configuration Module v4.2.0</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2">
                {['locations', 'purpose', 'goods', 'edible', 'result'].map((s, i) => (
                  <div 
                    key={s}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all duration-500",
                      step === s ? "bg-brand-cyan scale-150 shadow-[0_0_10px_rgba(0,242,255,0.3)]" : "bg-slate-200"
                    )}
                  />
                ))}
              </div>
              {step !== 'locations' && (
                <button 
                  onClick={prevStep}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <ChevronLeft size={14} /> Back
                </button>
              )}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 'locations' && (
              <motion.div 
                key="locations"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="relative group" ref={startRef}>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3 block">Starting Position</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-cyan" size={18} />
                      <input 
                        type="text" 
                        placeholder="Enter current location or GPS coordinates"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 font-mono text-sm focus:outline-none focus:border-brand-cyan/50 transition-all"
                        value={data.start}
                        onChange={(e) => {
                          setData({ ...data, start: e.target.value });
                          setShowStartSuggestions(true);
                        }}
                        onFocus={() => setShowStartSuggestions(true)}
                      />
                    </div>
                    {showStartSuggestions && filteredStartStates.length > 0 && (
                      <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl">
                        {filteredStartStates.map((state) => (
                          <button
                            key={state}
                            className="w-full px-6 py-3 text-left text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center gap-3"
                            onClick={() => {
                              setData({ ...data, start: state });
                              setShowStartSuggestions(false);
                            }}
                          >
                            <MapPin size={14} className="text-brand-cyan" />
                            {state}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="relative group" ref={destRef}>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3 block">Destination Vector</label>
                    <div className="relative">
                      <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-purple" size={18} />
                      <input 
                        type="text" 
                        placeholder="Enter target destination"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 font-mono text-sm focus:outline-none focus:border-brand-purple/50 transition-all"
                        value={data.destination}
                        onChange={(e) => {
                          setData({ ...data, destination: e.target.value });
                          setShowDestSuggestions(true);
                        }}
                        onFocus={() => setShowDestSuggestions(true)}
                      />
                    </div>
                    {showDestSuggestions && filteredDestStates.length > 0 && (
                      <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl">
                        {filteredDestStates.map((state) => (
                          <button
                            key={state}
                            className="w-full px-6 py-3 text-left text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center gap-3"
                            onClick={() => {
                              setData({ ...data, destination: state });
                              setShowDestSuggestions(false);
                            }}
                          >
                            <Navigation size={14} className="text-brand-purple" />
                            {state}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <button 
                  disabled={!data.start || !data.destination}
                  onClick={nextStep}
                  className="w-full bg-slate-900 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-brand-cyan hover:text-slate-900 transition-all disabled:opacity-20 disabled:cursor-not-allowed group"
                >
                  Initialize Parameters <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {step === 'purpose' && (
              <motion.div 
                key="purpose"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setData({ ...data, purpose: 'travelling' })}
                    className={cn(
                      "p-8 rounded-3xl border transition-all text-left group",
                      data.purpose === 'travelling' 
                        ? "bg-brand-cyan/5 border-brand-cyan text-slate-900" 
                        : "bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300"
                    )}
                  >
                    <Footprints className={cn("mb-4 transition-colors", data.purpose === 'travelling' ? "text-brand-cyan" : "text-slate-300")} size={32} />
                    <h3 className="text-lg font-black uppercase tracking-tighter mb-1">Travelling</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Personal transit</p>
                  </button>
                  <button 
                    onClick={() => setData({ ...data, purpose: 'transporting' })}
                    className={cn(
                      "p-8 rounded-3xl border transition-all text-left group",
                      data.purpose === 'transporting' 
                        ? "bg-brand-purple/5 border-brand-purple text-slate-900" 
                        : "bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300"
                    )}
                  >
                    <Truck className={cn("mb-4 transition-colors", data.purpose === 'transporting' ? "text-brand-purple" : "text-slate-300")} size={32} />
                    <h3 className="text-lg font-black uppercase tracking-tighter mb-1">Transporting</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Cargo & Logistics</p>
                  </button>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block">Select Vehicle Unit</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {vehicles.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setData({ ...data, vehicle: v.id })}
                        className={cn(
                          "p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-3",
                          data.vehicle === v.id
                            ? "bg-slate-900 border-slate-900 text-white"
                            : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100"
                        )}
                      >
                        <div className={cn("transition-colors", data.vehicle === v.id ? "text-brand-cyan" : "text-slate-300")}>
                          {v.icon}
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest">{v.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  disabled={!data.purpose || !data.vehicle}
                  onClick={nextStep}
                  className="w-full bg-slate-900 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-brand-cyan hover:text-slate-900 transition-all disabled:opacity-20 group"
                >
                  Continue Configuration <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {step === 'goods' && (
              <motion.div 
                key="goods"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block">Cargo Classification</label>
                  <div className="space-y-4">
                    {goodTypes.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => setData({ ...data, goodType: g.id as any })}
                        className={cn(
                          "w-full p-6 rounded-3xl border text-left transition-all flex items-center gap-6 group",
                          data.goodType === g.id
                            ? "bg-brand-cyan/5 border-brand-cyan text-slate-900"
                            : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100"
                        )}
                      >
                        <div className={cn(
                          "p-4 rounded-2xl transition-colors",
                          data.goodType === g.id ? "bg-brand-cyan/10 text-brand-cyan" : "bg-slate-200 text-slate-400"
                        )}>
                          {g.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-black uppercase tracking-tighter mb-1">{g.label}</h3>
                          <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{g.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  disabled={!data.goodType}
                  onClick={nextStep}
                  className="w-full bg-slate-900 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-brand-cyan hover:text-slate-900 transition-all disabled:opacity-20 group"
                >
                  Finalize Details <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {step === 'edible' && (
              <motion.div 
                key="edible"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block">Perishable Specification</label>
                  <div className="grid grid-cols-1 gap-4">
                    {edibleTypes.map((e) => (
                      <button
                        key={e.id}
                        onClick={() => setData({ ...data, edibleType: e.id as any })}
                        className={cn(
                          "w-full p-6 rounded-3xl border text-left transition-all flex items-center gap-6 group",
                          data.edibleType === e.id
                            ? "bg-brand-purple/5 border-brand-purple text-slate-900"
                            : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100"
                        )}
                      >
                        <div className={cn(
                          "p-4 rounded-2xl transition-colors",
                          data.edibleType === e.id ? "bg-brand-purple/10 text-brand-purple" : "bg-slate-200 text-slate-400"
                        )}>
                          {e.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-black uppercase tracking-tighter mb-1">{e.label}</h3>
                          <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{e.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  disabled={!data.edibleType}
                  onClick={nextStep}
                  className="w-full bg-slate-900 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-brand-cyan hover:text-slate-900 transition-all disabled:opacity-20 group"
                >
                  Generate Optimal Path <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {step === 'result' && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-8"
              >
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-brand-cyan/10 blur-3xl rounded-full animate-pulse" />
                  <div className="relative bg-slate-50 border border-slate-200 p-8 rounded-full">
                    <CheckCircle2 size={64} className="text-brand-cyan" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Route Optimized</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">Neural Path Calculated Successfully</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-left space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Path Freshness</span>
                    <span className="text-brand-cyan font-mono font-bold">98.4%</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">AQI Exposure</span>
                    <span className="text-brand-purple font-mono font-bold">Low (Avg 32)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Est. Arrival</span>
                    <span className="text-slate-900 font-mono font-bold">14:42 UTC</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep('locations')}
                    className="flex-1 bg-slate-100 border border-slate-200 text-slate-900 font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-slate-200 transition-all"
                  >
                    New Route
                  </button>
                  <button 
                    onClick={() => onStartNavigation?.(data.start, data.destination)}
                    className="flex-1 bg-brand-cyan text-slate-900 font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-brand-cyan/80 transition-all"
                  >
                    Start Navigation
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-70">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <p className="text-[8px] uppercase tracking-widest text-slate-400 font-bold mb-1">Origin</p>
          <p className="text-[10px] font-mono text-slate-900 truncate">{data.start || '---'}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <p className="text-[8px] uppercase tracking-widest text-slate-400 font-bold mb-1">Target</p>
          <p className="text-[10px] font-mono text-slate-900 truncate">{data.destination || '---'}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <p className="text-[8px] uppercase tracking-widest text-slate-400 font-bold mb-1">Vehicle</p>
          <p className="text-[10px] font-mono text-slate-900 uppercase">{data.vehicle || '---'}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <p className="text-[8px] uppercase tracking-widest text-slate-400 font-bold mb-1">Cargo</p>
          <p className="text-[10px] font-mono text-slate-900 uppercase">{data.goodType || '---'}</p>
        </div>
      </div>
    </div>
  );
}
