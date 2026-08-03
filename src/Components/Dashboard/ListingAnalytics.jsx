import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const defaultData = [
  { name: '', views: 150 },
  { name: '', views: 220 },
  { name: '', views: 180 },
  { name: '', views: 280 },
  { name: '', views: 240 },
  { name: '', views: 380 },
];

const colors = ['#0F172A', '#0F172A', '#0F172A', '#D4AF37', '#D4AF37', '#D4AF37'];

export default function ListingAnalytics({ 
  onTimeframeChange, 
  timeframeText = "Last 6 Months",
  chartData = defaultData
}) {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="font-bold text-[16px] text-[#0F172A] mb-1">Listing Analytics</h3>
          <p className="text-gray-500 text-[13px]">Views & Engagement over time</p>
        </div>
        <button 
          onClick={onTimeframeChange}
          className="text-[13px] font-semibold border border-gray-200 px-3 py-1.5 rounded-md text-gray-600 hover:bg-gray-50 transition"
        >
          {timeframeText}
        </button>
      </div>
      <div className="flex-1 min-h-[220px] w-full mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
            <Tooltip cursor={{ fill: '#F9FAFB' }} />
            <Bar dataKey="views" radius={[2, 2, 0, 0]} maxBarSize={60}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
