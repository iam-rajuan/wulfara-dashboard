import React from "react";
import { MoreVertical } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const fallbackData = [
  { name: 'Jan', revenue: 0 },
  { name: 'Feb', revenue: 0 },
  { name: 'Mar', revenue: 0 },
  { name: 'Apr', revenue: 0 },
  { name: 'May', revenue: 0 },
  { name: 'Jun', revenue: 0 },
  { name: 'Jul', revenue: 0 },
  { name: 'Aug', revenue: 0 },
  { name: 'Sep', revenue: 0 },
  { name: 'Oct', revenue: 0 },
  { name: 'Nov', revenue: 0 },
  { name: 'Dec', revenue: 0 },
];

export default function RevenueOverview({ chartData }) {
  const data = chartData || fallbackData;
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full lg:col-span-2">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[12px] font-bold text-[#0F172A] uppercase tracking-wider">
          Revenue Overview
        </h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical size={18} />
        </button>
      </div>
      
      <div className="flex-1 w-full min-h-[250px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D1A635" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#D1A635" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#9CA3AF' }} 
              dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#9CA3AF' }} 
              tickFormatter={(value) => `$${value >= 1000 ? (value/1000)+'k' : value}`} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#0F172A', fontWeight: 'bold' }}
              labelStyle={{ color: '#6B7280', marginBottom: '4px' }}
              formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#D1A635" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
