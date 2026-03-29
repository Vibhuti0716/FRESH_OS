import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_DATA } from '../constants';

interface AQITrendProps {
  start?: string;
  destination?: string;
}

export const AQITrend: React.FC<AQITrendProps> = ({ start = 'New Delhi', destination = 'Mumbai' }) => {
  const data = React.useMemo(() => {
    // Generate deterministic but dynamic data based on city names
    const seed = (start + destination).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const baseAQI = 50 + (seed % 150);
    
    return Array.from({ length: 12 }, (_, i) => {
      const time = `${i * 2}:00`;
      // Standard route has higher, more volatile AQI
      const standard = baseAQI + Math.sin(i * 0.5) * 40 + (seed % 100);
      // Neural route is optimized to be lower and smoother
      const fresh = Math.max(30, baseAQI * 0.4 + Math.cos(i * 0.5) * 15);
      
      return { time, standard: Math.round(standard), fresh: Math.round(fresh) };
    });
  }, [start, destination]);

  return (
    <div className="h-48 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorFresh" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorStandard" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff003c" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#ff003c" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="1 4" stroke="#00000005" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#00000005" 
            fontSize={9} 
            tickLine={false} 
            axisLine={false}
            tick={{ fill: '#00000020', fontFamily: 'JetBrains Mono' }}
          />
          <YAxis 
            stroke="#00000005" 
            fontSize={9} 
            tickLine={false} 
            axisLine={false}
            tick={{ fill: '#00000020', fontFamily: 'JetBrains Mono' }}
            domain={[0, 500]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
              border: '1px solid rgba(0, 0, 0, 0.05)', 
              borderRadius: '12px',
              backdropFilter: 'blur(20px)',
              fontSize: '10px',
              fontFamily: 'JetBrains Mono',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}
            itemStyle={{ fontSize: '10px', padding: '2px 0' }}
          />
          <Area 
            type="stepAfter" 
            dataKey="fresh" 
            stroke="#00f2ff" 
            fillOpacity={1} 
            fill="url(#colorFresh)" 
            strokeWidth={2}
            name="Neural"
          />
          <Area 
            type="stepAfter" 
            dataKey="standard" 
            stroke="#ff003c" 
            fillOpacity={1} 
            fill="url(#colorStandard)" 
            strokeWidth={1}
            strokeDasharray="3 3"
            name="Legacy"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
