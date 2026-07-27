import React from "react";
import { Check } from "lucide-react";

export default function LivePreviewCard({ data = {} }) {
  const price = data.basePrice || "4,900";
  const name = data.name || data.displayName || "Premium Plan";
  const desc = data.description || "Scale your manufacturing empire with enterprise-grade tools.";
  const accentColor = data.accentColor || "#D97706";
  const badgeText = data.badge || data.badgeText || "Popular";
  
  return (
    <div id="Preview" className="h-full flex flex-col items-center justify-center bg-gray-50/50 border border-gray-100 rounded-xl p-8 scroll-mt-48">
      <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-4">Live Preview Card</p>
      
      <div className="w-full bg-[#1A2333] rounded-xl shadow-lg border border-gray-700 overflow-hidden relative text-white">
        
        {badgeText && badgeText !== "None" && (
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 text-white text-[9px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-b-md shadow-sm"
            style={{ backgroundColor: accentColor }}
          >
            {badgeText}
          </div>
        )}

        <div className="p-6 pt-10">
          <h3 className="text-xl font-extrabold mb-2">{name}</h3>
          <p className="text-[11px] text-gray-400 mb-6 leading-relaxed">
            {desc}
          </p>

          <div className="flex items-end gap-1 mb-1">
            <span className="text-3xl font-extrabold">${price}</span>
            <span className="text-[12px] font-bold text-gray-400 mb-1">/ yr</span>
          </div>
          <p className="text-[10px] text-gray-500 mb-6">Starting price for 12 months</p>

          <div className="space-y-3 mb-8 text-left">
            <div className="flex items-center gap-2">
              <Check size={14} className="flex-shrink-0" style={{ color: accentColor }} />
              <span className="text-[12px] font-bold text-gray-200">Unlimited RFQs</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="flex-shrink-0" style={{ color: accentColor }} />
              <span className="text-[12px] font-bold text-gray-200">Verified Badge</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="flex-shrink-0" style={{ color: accentColor }} />
              <span className="text-[12px] font-bold text-gray-200">15 Team Members</span>
            </div>
          </div>

          <button className="w-full py-2.5 bg-transparent border border-gray-600 text-white rounded-md text-[12px] font-bold hover:bg-gray-800 transition-colors">
            View Full Preview
          </button>
        </div>
      </div>
    </div>
  );
}
