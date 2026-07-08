import React from "react";
import { FileCheck, ShieldCheck, Mail } from "lucide-react";

export default function PriorityActions() {
  const actions = [
    {
      id: 1,
      title: "Review Pending Listings",
      count: 37,
      icon: <FileCheck className="text-[#D4AF37]" size={20} strokeWidth={2.5} />,
    },
    {
      id: 2,
      title: "Verify Supplier Accounts",
      count: 12,
      icon: <ShieldCheck className="text-gray-500" size={20} strokeWidth={2.5} />,
      badgeColor: "bg-blue-100 text-blue-700",
    },
    {
      id: 3,
      title: "Support Tickets",
      count: 0,
      icon: <Mail className="text-gray-500" size={20} strokeWidth={2.5} />,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
      <h3 className="text-[12px] font-bold text-[#0F172A] uppercase tracking-wider mb-6">
        Priority Actions
      </h3>
      
      <div className="space-y-4 flex-1">
        {actions.map((action) => (
          <button
            key={action.id}
            className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg hover:border-gray-200 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                {action.icon}
              </div>
              <span className="text-[14px] font-semibold text-[#0F172A]">
                {action.title}
              </span>
            </div>
            
            {action.count > 0 && (
              <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${action.badgeColor || "bg-[#FEF3C7] text-[#D4AF37]"}`}>
                {action.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
