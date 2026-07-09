import React from "react";
import { Lock, Mail, XCircle } from "lucide-react";

export default function DisputeQuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-4">Quick Actions</h3>
      
      <div className="space-y-1">
        
        <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group text-left">
          <span className="text-[13px] font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors">Hold Payments (Stripe)</span>
          <Lock size={14} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
        </button>

        <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group text-left">
          <span className="text-[13px] font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors">Notify Carriers</span>
          <Mail size={14} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
        </button>

        <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 transition-colors group text-left mt-2">
          <span className="text-[13px] font-bold text-red-500">Cancel Entire RFQ</span>
          <XCircle size={14} className="text-red-500" />
        </button>

      </div>
    </div>
  );
}
