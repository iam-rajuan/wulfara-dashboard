import React, { useState } from "react";
import { Eye, Check, X, MoreHorizontal } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function ListingTable({ listings, selectedIds, onSelect, onSelectAll, onApprove, onReject }) {
  const [openActionId, setOpenActionId] = useState(null);
  const navigate = useNavigate();

  const allSelected = listings.length > 0 && selectedIds.length === listings.length;

  const getPlanBadge = (plan) => {
    switch (plan) {
      case "Pro": return <span className="px-2 py-1 bg-[#F1F5F9] text-[#64748B] text-[11px] font-bold rounded-md border border-gray-200">Pro</span>;
      case "Enterprise": return <span className="px-2 py-1 bg-[#DBEAFE] text-[#1E40AF] text-[11px] font-bold rounded-md border border-[#BFDBFE]">Enterprise</span>;
      case "Basic": return <span className="px-2 py-1 bg-[#F1F5F9] text-[#64748B] text-[11px] font-bold rounded-md border border-gray-200">Basic</span>;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    if (status === "Pending") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A] text-[11px] font-bold rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D97706]"></div>
          Pending
        </span>
      );
    }
    if (status === "Approved") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0] text-[11px] font-bold rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-[#166534]"></div>
          Approved
        </span>
      );
    }
    if (status === "Rejected") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA] text-[11px] font-bold rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-[#991B1B]"></div>
          Rejected
        </span>
      );
    }
    return null;
  };

  const renderQualityBar = (score) => {
    let colorClass = "bg-[#10B981]"; // Green
    let textColor = "text-[#10B981]";

    if (score < 80 && score >= 50) {
      colorClass = "bg-[#F59E0B]"; // Yellow/Orange
      textColor = "text-[#F59E0B]";
    } else if (score < 50) {
      colorClass = "bg-[#EF4444]"; // Red
      textColor = "text-[#EF4444]";
    }

    return (
      <div className="flex items-center gap-3 w-28">
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full ${colorClass} rounded-full`} style={{ width: `${score}%` }}></div>
        </div>
        <span className={`text-[12px] font-bold ${textColor}`}>{score}%</span>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-100">
            <th className="py-4 pl-6 pr-4 w-12">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onSelectAll}
                className="w-4 h-4 text-[#D4AF37] rounded border-gray-300 focus:ring-[#D4AF37]"
              />
            </th>
            <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Company Name</th>
            <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Category</th>
            <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Submitted</th>
            <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Supplier</th>
            <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Plan</th>
            <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Quality</th>
            <th className="py-4 pr-6 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {listings.map((listing, index) => (
            <tr key={listing.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="py-4 pl-6 pr-4 border-l-2 border-transparent hover:border-[#2563EB]">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(listing.id)}
                  onChange={() => onSelect(listing.id)}
                  className="w-4 h-4 text-[#D4AF37] rounded border-gray-300 focus:ring-[#D4AF37]"
                />
              </td>
              <td className="py-4 px-4 text-[13px] font-bold text-[#0F172A]">
                {listing.companyName}
              </td>
              <td className="py-4 px-4 text-[13px] font-medium text-gray-500 leading-snug">
                {listing.category}
              </td>
              <td className="py-4 px-4 text-[13px] font-medium text-gray-500">
                {listing.submitted}
              </td>
              <td className="py-4 px-4 text-[13px] font-medium text-gray-500 leading-snug">
                {listing.supplier}
              </td>
              <td className="py-4 px-4">
                {getPlanBadge(listing.plan)}
              </td>
              <td className="py-4 px-4">
                {getStatusBadge(listing.status)}
              </td>
              <td className="py-4 px-4">
                {renderQualityBar(listing.quality)}
              </td>
              <td className="py-4 pr-6 text-right relative">
                <button
                  onClick={() => setOpenActionId(openActionId === listing.id ? null : listing.id)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                >
                  <MoreHorizontal size={18} />
                </button>

                {openActionId === listing.id && (
                  <>
                    <div 
                      className="fixed inset-0 z-50"
                      onClick={() => setOpenActionId(null)}
                    ></div>
                    <div className={`absolute right-6 w-36 bg-white rounded-md shadow-xl border border-gray-100 z-50 py-1 overflow-hidden ${index === listings.length - 1 && listings.length > 1 ? 'bottom-8' : 'top-10'}`}>
                      <button
                        onClick={() => {
                          setOpenActionId(null);
                          navigate(`/listings/${listing.id}`);
                        }}
                        className="w-full px-4 py-2 text-[12px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                      >
                        <Eye size={14} />
                        View Details
                      </button>
                      
                      {listing.status === "Pending" && (
                        <>
                          <button
                            onClick={() => {
                              setOpenActionId(null);
                              onApprove && onApprove(listing.id);
                            }}
                            className="w-full px-4 py-2 text-[12px] font-bold text-green-600 hover:bg-green-50 flex items-center gap-2 transition-colors"
                          >
                            <Check size={14} strokeWidth={3} />
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              setOpenActionId(null);
                              onReject && onReject(listing.id);
                            }}
                            className="w-full px-4 py-2 text-[12px] font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                          >
                            <X size={14} strokeWidth={3} />
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
