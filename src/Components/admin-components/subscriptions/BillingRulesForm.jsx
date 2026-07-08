import React from "react";
import { Sliders } from "lucide-react";

export default function BillingRulesForm() {
  return (
    <div id="Billing Rules" className="h-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 scroll-mt-48">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
        <Sliders size={16} className="text-gray-400" />
        <h2 className="text-[14px] font-extrabold text-[#0F172A]">Billing & Governance Rules</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-[12px] font-bold text-[#0F172A] mb-1">Cancellation Window</label>
          <p className="text-[10px] font-medium text-gray-400 mb-2 leading-snug">Days allowed for refund after purchase</p>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              defaultValue="5"
              className="w-20 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <span className="text-[12px] font-bold text-[#0F172A]">Days</span>
          </div>
        </div>

        <div>
          <label className="block text-[12px] font-bold text-[#0F172A] mb-1">Grace Period</label>
          <p className="text-[10px] font-medium text-gray-400 mb-2 leading-snug">Days allowed to renew before hiding profile</p>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              defaultValue="7"
              className="w-20 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <span className="text-[12px] font-bold text-[#0F172A]">Days</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
          <span className="text-[12px] font-bold text-[#0F172A]">Lock Package Toggles</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0F172A]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-gray-50/50">
          <span className="text-[12px] font-bold text-gray-500">Sync Legacy Changes</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D97706]"></div>
          </label>
        </div>
      </div>

    </div>
  );
}
