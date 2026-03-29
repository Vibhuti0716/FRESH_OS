import React from 'react';
import { 
  Truck, 
  Car, 
  Bike, 
  Footprints, 
  Package, 
  Apple, 
  Zap, 
  Droplets, 
  ThermometerSnowflake, 
  Wind, 
  Box,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export const LogisticsMatrix: React.FC = () => {
  const categories = [
    {
      title: "Vehicle Fleet",
      icon: <Truck size={16} className="text-brand-cyan" />,
      items: [
        { name: "Heavy Truck", icon: <Truck size={14} /> },
        { name: "Mini Van", icon: <Box size={14} /> },
        { name: "Standard Car", icon: <Car size={14} /> },
        { name: "Bike/Scooter", icon: <Bike size={14} /> },
        { name: "E-Rickshaw", icon: <Zap size={14} /> },
        { name: "Oil Auto", icon: <Droplets size={14} /> },
        { name: "Walking", icon: <Footprints size={14} /> },
      ]
    },
    {
      title: "Cargo Classification",
      icon: <Package size={16} className="text-brand-purple" />,
      items: [
        { name: "Edible Goods", icon: <Apple size={14} /> },
        { name: "General Goods", icon: <Package size={14} /> },
        { name: "Electronics", icon: <Cpu size={14} /> },
        { name: "Fragile Items", icon: <ShieldCheck size={14} /> },
      ]
    },
    {
      title: "Perishable Specs",
      icon: <Apple size={16} className="text-brand-pink" />,
      items: [
        { name: "Raw Veggies", icon: <Wind size={14} /> },
        { name: "Packed Food", icon: <Package size={14} /> },
        { name: "Cold Chain", icon: <ThermometerSnowflake size={14} /> },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Logistics Matrix</h3>
        <span className="text-[8px] font-mono text-slate-300 uppercase">Reference v4.2</span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {categories.map((cat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-slate-50">
                {cat.icon}
              </div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">{cat.title}</h4>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {cat.items.map((item, j) => (
                <div key={j} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors">
                  <div className="text-slate-400">{item.icon}</div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-3xl bg-brand-cyan/5 border border-brand-cyan/10">
        <p className="text-[9px] text-brand-cyan/70 font-medium leading-relaxed uppercase tracking-wider">
          Neural engine automatically selects optimal path based on selected matrix parameters.
        </p>
      </div>
    </div>
  );
};
