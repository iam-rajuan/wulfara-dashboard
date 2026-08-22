import React from "react";
import { FileCheck, ShieldCheck, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ACTION_ICON_MAP = {
  "pending-listings": <FileCheck className="text-[#D4AF37]" size={20} strokeWidth={2.5} />,
  "verify-suppliers": <ShieldCheck className="text-gray-500" size={20} strokeWidth={2.5} />,
  "support-tickets": <Mail className="text-gray-500" size={20} strokeWidth={2.5} />,
};

const ACTION_TONE_CLASS = {
  warning: "bg-[#FEF3C7] text-[#D4AF37]",
  info: "bg-blue-100 text-blue-700",
  danger: "bg-red-100 text-red-700",
  muted: "bg-gray-100 text-gray-600",
};

const ACTION_LINK_MAP = {
  "pending-listings": "/supplier-management",
  "verify-suppliers": "/supplier-management",
  "support-tickets": "/messages",
};

export default function PriorityActions({ actions = [], supportTicketsAvailable = false }) {
  const displayActions = [
    ...actions,
    ...(!supportTicketsAvailable
      ? []
      : [{ key: "support-tickets", title: "Support Tickets", count: 0, tone: "muted" }]),
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
      <h3 className="text-[12px] font-bold text-[#0F172A] uppercase tracking-wider mb-6">
        Priority Actions
      </h3>
      
      <div className="space-y-4 flex-1">
        {displayActions.map((action) => (
          <Link
            key={action.key}
            to={ACTION_LINK_MAP[action.key] || "/dashboard"}
            className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg hover:border-gray-200 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                {ACTION_ICON_MAP[action.key] || <Mail className="text-gray-500" size={20} strokeWidth={2.5} />}
              </div>
              <span className="text-[14px] font-semibold text-[#0F172A]">
                {action.title}
              </span>
            </div>
            
            {action.count > 0 ? (
              <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${ACTION_TONE_CLASS[action.tone] || ACTION_TONE_CLASS.warning}`}>
                {action.count}
              </span>
            ) : action.key === "support-tickets" ? (
              <span className="text-[11px] font-medium text-gray-400">Module disabled</span>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
