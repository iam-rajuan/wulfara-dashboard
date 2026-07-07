import React from 'react';
import { Package, CheckCircle2, FileText, FileSpreadsheet } from 'lucide-react';

export default function ProductsSummaryCards({ summaryData }) {
  const cards = [
    { label: "Total Offerings", value: summaryData.total, icon: <Package size={20} className="text-gray-500" /> },
    { label: "Published", value: summaryData.published, icon: <CheckCircle2 size={20} className="text-[#D4AF37]" /> },
    { label: "Drafts", value: summaryData.drafts, icon: <FileText size={20} className="text-gray-500" /> },
    { label: "Quote Enabled", value: summaryData.quoteEnabled, icon: <FileSpreadsheet size={20} className="text-[#0F172A]" /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-28">
          <div className="flex justify-between items-start">
            <span className="text-[13px] font-bold text-gray-600">{card.label}</span>
            {card.icon}
          </div>
          <h3 className="text-2xl font-bold text-[#0F172A]">{card.value}</h3>
        </div>
      ))}
    </div>
  );
}
