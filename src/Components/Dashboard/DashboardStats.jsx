import React from 'react';
import { Eye } from 'lucide-react';
import { FileTextIcon, ActivityIcon } from '../../svglogos/SvgIcons';

export default function DashboardStats({ stats }) {
  const total = stats?.totalRfqs || 0;
  const pending = stats?.pendingRfqs || 0;
  const responded = total - pending;
  const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Eye size={20} />
          </div>
          <div className="bg-[#DFB63E] text-[#0F172A] text-[11px] font-bold px-2 py-1 rounded flex items-center gap-1">
            ~ 12.5%
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-sm mb-1">Listing Views</p>
          <h3 className="text-2xl font-bold">2,430</h3>
          <p className="text-gray-400 text-[13px] mt-2">Last 30 days</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl relative">
            <FileTextIcon />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-white translate-x-1/2 -translate-y-1/2"></span>
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-sm mb-1">New RFQs</p>
          <h3 className="text-2xl font-bold">{pending}</h3>
          <p className="text-gray-500 text-[13px] mt-2">Total RFQs received: {total}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <ActivityIcon />
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-sm mb-1">RFQ Response Rate</p>
          <h3 className="text-2xl font-bold">{responseRate}%</h3>
          {responseRate < 80 && total > 0 ? (
            <p className="text-[13px] mt-2 text-red-500 flex items-center gap-1">
              <span className="text-[10px]">⚠️</span> Below target (80%)
            </p>
          ) : (
            <p className="text-[13px] mt-2 text-green-600 flex items-center gap-1">
              <span className="text-[10px]">✅</span> Excellent response rate
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
