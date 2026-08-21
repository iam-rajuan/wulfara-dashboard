import React from 'react';
import { Download } from 'lucide-react';
import RFQCards from '../../Components/RFQs/RFQCards';
import RFQTable from '../../Components/RFQs/RFQTable';
import { SUPPORT_URL, PRIVACY_URL, TERMS_URL } from '../../config/urls';

export default function RFQs() {
  return (
    <div className="min-h-screen p-6 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans mt-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-[32px] font-bold mb-1 tracking-tight text-[#0F172A]">RFQ Inbox</h1>
          <p className="text-gray-500 text-[14px]">
            Manage and respond to inbound quotation requests.
          </p>
        </div>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-[13px] font-bold text-[#0F172A] shadow-sm hover:bg-gray-50 transition flex items-center gap-2">
          <Download size={16} strokeWidth={2.5} />
          Export
        </button>
      </div>

      {/* Cards Component */}
      <RFQCards />

      {/* Table Component */}
      <RFQTable />

      {/* Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-gray-500 pt-6 mt-12 pb-4 border-t border-gray-200">
        <p>© 2024 WULFARA Industrial Marketplace. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0 text-gray-500">
          <a href={SUPPORT_URL} className="hover:text-gray-900 transition">Support</a>
          <a href={PRIVACY_URL} className="hover:text-gray-900 transition">Privacy Policy</a>
          <a href={TERMS_URL} className="hover:text-gray-900 transition">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}
