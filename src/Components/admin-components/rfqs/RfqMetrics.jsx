import React from "react";
import { TrendingUp, Clock, AlertTriangle } from "lucide-react";

export default function RfqMetrics({ data }) {
  // data can be passed to make these truly dynamic, for now we use the design defaults
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      
      {/* Total RFQs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">Total RFQs</h3>
        <p className="text-2xl font-extrabold text-[#0F172A] mb-2">{data?.total || 0}</p>
        <div className="flex items-center gap-1 text-[11px] font-bold text-[#D4AF37]">
          <TrendingUp size={12} />
          <span>+12.5%</span>
        </div>
      </div>

      {/* New RFQs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">New RFQs</h3>
        <p className="text-2xl font-extrabold text-[#D4AF37] mb-2">{data?.new || 0}</p>
        <p className="text-[11px] font-medium text-gray-400">Last 24h</p>
      </div>

      {/* Responded */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">Responded</h3>
          <p className="text-2xl font-extrabold text-[#0F172A] mb-4">{data?.responded || 0}</p>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div className="bg-[#D4AF37] h-1.5 rounded-full" style={{ width: `${data?.total ? Math.round((data.responded / data.total) * 100) : 0}%` }}></div>
        </div>
      </div>

      {/* Closed */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">Closed</h3>
        <p className="text-2xl font-extrabold text-[#0F172A] mb-2">{data?.closed || 0}</p>
        <p className="text-[11px] font-medium text-gray-400">Cycle end: 3d</p>
      </div>

      {/* Dispute Flags */}
      <div className="bg-white rounded-xl shadow-sm border-y border-r border-gray-100 border-l-4 border-l-red-500 p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-red-50 rounded-bl-full -z-10"></div>
        <h3 className="text-[10px] font-extrabold text-red-500 uppercase tracking-wider mb-2">Dispute Flags</h3>
        <p className="text-2xl font-extrabold text-red-500 mb-2">{data?.disputed || 0}</p>
        <span className="inline-block px-2 py-0.5 bg-red-100 text-red-600 text-[9px] font-extrabold rounded uppercase tracking-wider">
          Critical
        </span>
      </div>

      {/* Avg Response */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">Avg Response</h3>
        <p className="text-2xl font-extrabold text-[#0F172A] mb-2">{data?.avgResponseTime || 'N/A'}</p>
        <div className="flex items-center gap-1 text-[11px] font-bold text-[#D4AF37]">
          <Clock size={12} />
          <span>{data?.avgResponseTrend || '-0m YoY'}</span>
        </div>
      </div>

    </div>
  );
}
