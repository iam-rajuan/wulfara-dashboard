import React from 'react';
import { Download, BadgeCheck, Clock } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <div className='mt-16'>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-bold mb-1 tracking-tight">Supplier Dashboard</h1>
          <p className="text-gray-500 text-[13px] md:text-[14px]">Manage your WULFARA listing, RFQs, subscription, and supplier performance.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:bg-gray-50 transition w-full md:w-auto">
          <Download size={16} />
          Export Report
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-nowrap lg:items-center gap-4 lg:gap-6 text-[13px] mb-8">
        <div className="flex items-center justify-between sm:justify-start gap-3 lg:border-r border-gray-200 lg:pr-6">
          <span className="text-gray-500">Listing Status:</span>
          <span className="flex items-center gap-1.5 bg-[#0066FF] text-white px-3 py-1 rounded-full text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            Active
          </span>
        </div>
        <div className="flex items-center justify-between sm:justify-start gap-3 lg:border-r border-gray-200 lg:pr-6">
          <span className="text-gray-500">Subscription:</span>
          <span className="flex items-center gap-1.5 font-bold text-[#0F172A]">
            <BadgeCheck size={16} className="text-[#137847]" strokeWidth={2.5} />
            Premium Plan
          </span>
        </div>
        <div className="flex items-center justify-between sm:justify-start gap-4 lg:border-r border-gray-200 lg:pr-6">
          <span className="text-gray-500">Profile Completion:</span>
          <div className="flex items-center gap-3 sm:w-32 justify-end sm:justify-start">
            <div className="hidden sm:block flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: '82%' }}></div>
            </div>
            <span className="font-bold text-xs text-[#0F172A]">82%</span>
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-start gap-3">
          <span className="text-gray-500">Response Time:</span>
          <span className="flex items-center gap-1.5 font-bold text-[#0F172A]">
            <Clock size={16} className="text-gray-400" />
            Replies in ~2 hours
          </span>
        </div>
      </div>
    </div>
  );
}
