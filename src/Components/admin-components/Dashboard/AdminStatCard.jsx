import React from "react";
import { TrendingUp, TrendingDown, Info } from "lucide-react";

export default function AdminStatCard({ title, icon: Icon, value, trend, trendType, trendLabel }) {
  // trendType: "positive", "negative", "neutral", "warning"

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
          {title}
        </h3>
        {Icon && <Icon className="text-gray-400" size={18} strokeWidth={2} />}
      </div>
      
      <div>
        <div className="text-3xl font-extrabold text-[#0F172A] mb-2">
          {value}
        </div>
        
        {trend && (
          <div className="flex items-center gap-1.5 mt-1">
            {trendType === "positive" && <TrendingUp size={14} className="text-[#D4AF37]" strokeWidth={2.5} />}
            {trendType === "negative" && <TrendingDown size={14} className="text-red-500" strokeWidth={2.5} />}
            {trendType === "warning" && <Info size={14} className="text-[#D4AF37]" strokeWidth={2.5} />}
            
            <span className={`text-[12px] font-bold ${
              trendType === "positive" ? "text-[#D4AF37]" :
              trendType === "negative" ? "text-red-500" :
              trendType === "warning" ? "text-[#D4AF37]" :
              "text-gray-500"
            }`}>
              {trend}
            </span>
            {trendLabel && (
              <span className="text-[12px] font-medium text-gray-500 ml-1">
                {trendLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
