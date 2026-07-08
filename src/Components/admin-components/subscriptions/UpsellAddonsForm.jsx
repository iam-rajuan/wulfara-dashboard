import React from "react";
import { PackagePlus, LayoutGrid, Zap, Star } from "lucide-react";

export default function UpsellAddonsForm() {
  return (
    <div id="Add-ons" className="h-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 scroll-mt-48">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
        <PackagePlus size={16} className="text-gray-400" />
        <h2 className="text-[14px] font-extrabold text-[#0F172A]">Upsell Add-ons</h2>
      </div>

      <div className="space-y-3">
        
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 text-gray-500">
              <Star size={14} />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-[#0F172A]">Featured Listing</h4>
              <p className="text-[11px] font-medium text-gray-400 leading-snug">$99 / Mo. (10% off)</p>
            </div>
          </div>
          <div className="text-gray-400">
            <LayoutGrid size={16} />
          </div>
        </div>

        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 text-gray-500">
              <Zap size={14} />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-[#0F172A]">Pay-per-lead (Extra)</h4>
              <p className="text-[11px] font-medium text-gray-400 leading-snug">$12 per lead</p>
            </div>
          </div>
          <div className="text-gray-400">
            <LayoutGrid size={16} />
          </div>
        </div>

        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer bg-blue-50/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 text-[#3B82F6]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
              </svg>
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-[#0F172A]">Priority Support</h4>
              <p className="text-[11px] font-medium text-gray-400 leading-snug">Included</p>
            </div>
          </div>
          <div className="text-[#3B82F6]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
