import React from "react";
import { MoreVertical } from "lucide-react";

export default function RevenueOverview() {
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
      
      <div className="flex-1 bg-[#F4F7FB] rounded-lg border border-gray-100 flex items-center justify-center min-h-[250px]">
        <p className="text-[13px] font-medium text-gray-400">
          Interactive Monthly Trend Chart
        </p>
      </div>
    </div>
  );
}
