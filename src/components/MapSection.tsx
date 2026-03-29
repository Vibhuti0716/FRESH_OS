import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// USING CARTO POSITRON STYLE (LIGHT, FREE, NO TOKEN REQUIRED)
const MAP_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

import { TacticalFeedOverlay } from './TacticalFeedOverlay';

export const MapSection: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: [77.2090, 28.6139], // Delhi coordinates
      zoom: 11,
      pitch: 45,
    });

    map.current.on('load', () => {
      if (!map.current) return;

      // Simulated AQI Zones
      const AQI_ZONES = [
        { coords: [77.2090, 28.6139], aqi: 350, label: 'Connaught Place' },
        { coords: [77.2200, 28.6200], aqi: 180, label: 'India Gate' },
        { coords: [77.1800, 28.6000], aqi: 45, label: 'Lodhi Garden' },
        { coords: [77.1000, 28.5500], aqi: 220, label: 'Dwarka' },
        { coords: [77.2500, 28.6500], aqi: 90, label: 'Old Delhi' },
      ];

      const getAQIColor = (aqi: number) => {
        if (aqi <= 50) return '#22c55e'; // Green
        if (aqi <= 150) return '#f97316'; // Orange
        return '#ef4444'; // Red
      };

      AQI_ZONES.forEach(zone => {
        const el = document.createElement('div');
        el.className = 'aqi-marker';
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = 'rgba(255,255,255,0.8)';
        el.style.border = `2px solid ${getAQIColor(zone.aqi)}`;
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.color = '#0f172a';
        el.style.fontSize = '10px';
        el.style.fontWeight = 'bold';
        el.style.backdropFilter = 'blur(4px)';
        el.style.boxShadow = `0 0 15px ${getAQIColor(zone.aqi)}44`;
        el.innerHTML = zone.aqi.toString();

        new maplibregl.Marker(el)
          .setLngLat(zone.coords as [number, number])
          .setPopup(new maplibregl.Popup({ offset: 25 }).setHTML(`
            <div style="color: #0f172a; padding: 8px;">
              <p style="font-weight: bold; margin-bottom: 4px;">${zone.label}</p>
              <p>AQI: <span style="color: ${getAQIColor(zone.aqi)}; font-weight: bold;">${zone.aqi}</span></p>
            </div>
          `))
          .addTo(map.current!);
      });

      // Add a mock heatmap layer for AQI
      map.current.addSource('aqi', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            { type: 'Feature', geometry: { type: 'Point', coordinates: [77.2090, 28.6139] }, properties: { aqi: 150 } },
            { type: 'Feature', geometry: { type: 'Point', coordinates: [77.2200, 28.6200] }, properties: { aqi: 200 } },
            { type: 'Feature', geometry: { type: 'Point', coordinates: [77.1800, 28.6000] }, properties: { aqi: 50 } },
          ]
        }
      });

      map.current.addLayer({
        id: 'aqi-heat',
        type: 'heatmap',
        source: 'aqi',
        paint: {
          'heatmap-weight': ['get', 'aqi'],
          'heatmap-intensity': 1,
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(0, 255, 0, 0)',
            0.2, 'rgb(0, 255, 0)',
            0.5, 'rgb(255, 165, 0)',
            0.8, 'rgb(255, 0, 0)'
          ],
          'heatmap-radius': 50,
          'heatmap-opacity': 0.3
        }
      });

      // Add mock routes
      map.current.addSource('route-shortest', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [
              [77.1500, 28.5500],
              [77.2000, 28.6000],
              [77.2500, 28.6500]
            ]
          }
        }
      });

      map.current.addLayer({
        id: 'route-shortest-line',
        type: 'line',
        source: 'route-shortest',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#ff003c', 'line-width': 4, 'line-dasharray': [2, 2] }
      });

      map.current.addSource('route-optimized', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [
              [77.1500, 28.5500],
              [77.1000, 28.6000],
              [77.1500, 28.7000],
              [77.2500, 28.6500]
            ]
          }
        }
      });

      map.current.addLayer({
        id: 'route-optimized-line',
        type: 'line',
        source: 'route-optimized',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#00f2ff', 'line-width': 6 }
      });
    });

    return () => map.current?.remove();
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute top-6 left-6 flex flex-col gap-2">
        <TacticalFeedOverlay />
      </div>
      <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-xl p-4 flex flex-col gap-3 border border-slate-200 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-6 h-1 bg-brand-cyan rounded-full" />
          <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400">Neural Path</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-1 bg-brand-red border-t border-dashed rounded-full" />
          <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400">Legacy Path</span>
        </div>
      </div>
    </div>
  );
};
