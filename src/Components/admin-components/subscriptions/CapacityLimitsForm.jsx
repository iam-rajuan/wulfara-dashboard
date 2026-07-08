import React from "react";
import { Server } from "lucide-react";

export default function CapacityLimitsForm() {
  return (
    <div id="Supplier Access" className="h-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 scroll-mt-48">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
        <Server size={16} className="text-gray-400" />
        <h2 className="text-[14px] font-extrabold text-[#0F172A]">Capacity & Limits</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div>
          <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Max Team Members</label>
          <input 
            type="text" 
            defaultValue="15"
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>
        <div>
          <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Max Gallery Uploads</label>
          <input 
            type="text" 
            defaultValue="50"
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>
        <div>
          <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Daily RFQ Leads</label>
          <input 
            type="text" 
            defaultValue="Unlimited"
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>
        <div>
          <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Product Categories</label>
          <input 
            type="text" 
            defaultValue="10"
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-3">Module Access</label>
        <div className="grid grid-cols-2 gap-3">
          
          <div className="flex items-center gap-2 p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="bg-[#0F172A] rounded p-0.5 shadow-sm">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="text-[12px] font-bold text-[#0F172A]">Inventory Sync</span>
          </div>

          <div className="flex items-center gap-2 p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="bg-[#0F172A] rounded p-0.5 shadow-sm">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="text-[12px] font-bold text-[#0F172A]">Multi-Currency</span>
          </div>

          <div className="flex items-center gap-2 p-2.5 border border-gray-200 rounded-lg">
            <div className="w-3.5 h-3.5 rounded border border-gray-300"></div>
            <span className="text-[12px] font-bold text-[#0F172A]">AI Content Gen</span>
          </div>

          <div className="flex items-center gap-2 p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="bg-[#0F172A] rounded p-0.5 shadow-sm">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="text-[12px] font-bold text-[#0F172A]">API Access</span>
          </div>

        </div>
      </div>

    </div>
  );
}
