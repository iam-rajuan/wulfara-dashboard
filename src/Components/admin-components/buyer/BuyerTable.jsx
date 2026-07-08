import React from "react";
import { BadgeCheck, ShieldAlert, AlertCircle, MoreHorizontal } from "lucide-react";

export function Pagination({ currentPage, totalItems, pageSize, onPageChange }) {
  const totalPages = Math.ceil(totalItems / pageSize);
  
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers dynamically (max 3 at a time)
  let visiblePages = [];
  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      visiblePages.push(i);
    }
  } else {
    if (currentPage <= 2) {
      visiblePages = [1, 2, 3];
    } else if (currentPage >= totalPages - 1) {
      visiblePages = [totalPages - 2, totalPages - 1, totalPages];
    } else {
      visiblePages = [currentPage - 1, currentPage, currentPage + 1];
    }
  }

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
      <div className="text-[13px] text-gray-500">
        Showing {startItem} to {endItem} of {totalItems} buyers
      </div>
      
      <div className="flex items-center gap-1">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 border border-gray-200 rounded-md text-[13px] font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Prev
        </button>
        
        {visiblePages[0] > 1 && (
          <span className="px-1 text-gray-400">...</span>
        )}

        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center border rounded-md text-[13px] font-medium transition-colors ${
              currentPage === page
                ? "bg-[#D4AF37] border-[#D4AF37] text-[#0F172A]"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}
        
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <span className="px-1 text-gray-400">...</span>
        )}

        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 border border-gray-200 rounded-md text-[13px] font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function BuyerTable({ buyers, selectedIds, onSelect, onSelectAll }) {
  const allSelected = buyers.length > 0 && selectedIds.length === buyers.length;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="py-4 pl-6 pr-4">
              <input 
                type="checkbox" 
                checked={allSelected}
                onChange={onSelectAll}
                className="w-4 h-4 text-[#D4AF37] rounded border-gray-300 focus:ring-[#D4AF37]" 
              />
            </th>
            <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Buyer Name</th>
            <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Email</th>
            <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider text-center">RFQs</th>
            <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider text-center">Favs</th>
            <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Created</th>
            <th className="py-4 pr-6 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {buyers.map((buyer) => (
            <tr key={buyer.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-4 pl-6 pr-4">
                <input 
                  type="checkbox" 
                  checked={selectedIds.includes(buyer.id)}
                  onChange={() => onSelect(buyer.id)}
                  className="w-4 h-4 text-[#D4AF37] rounded border-gray-300 focus:ring-[#D4AF37]" 
                />
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${buyer.avatarColor} text-[#0F172A] font-bold text-[12px] flex items-center justify-center`}>
                    {buyer.initials}
                  </div>
                  <div>
                    <div className={`text-[13.5px] font-bold ${buyer.status === 'Pending' ? 'text-[#D4AF37]' : 'text-[#0F172A]'}`}>
                      {buyer.name}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      {buyer.verification === 'Verified' && (
                        <>
                          <BadgeCheck size={12} className="text-green-600" fill="currentColor" stroke="white" />
                          <span className="text-[11px] font-medium text-gray-500">Verified</span>
                        </>
                      )}
                      {buyer.verification === 'Unverified' && (
                        <>
                          <div className="w-3 h-3 bg-amber-600 rounded-full flex items-center justify-center">
                            <MoreHorizontal size={10} color="white" />
                          </div>
                          <span className="text-[11px] font-medium text-gray-500">Unverified</span>
                        </>
                      )}
                      {buyer.verification === 'TOS Violation' && (
                        <>
                          <ShieldAlert size={12} className="text-red-600" fill="currentColor" stroke="white" />
                          <span className="text-[11px] font-medium text-red-500">TOS Violation</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 text-[13px] text-gray-500">
                {buyer.email}
              </td>
              <td className="py-4 px-4">
                <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                  buyer.status === 'Active' ? 'bg-[#A7F3D0] text-[#065F46]' :
                  buyer.status === 'Pending' ? 'bg-[#FDE68A] text-[#92400E]' :
                  'bg-[#FECACA] text-[#991B1B]'
                }`}>
                  {buyer.status}
                </span>
              </td>
              <td className="py-4 px-4 text-[13px] font-bold text-[#0F172A] text-center">
                {buyer.rfqs}
              </td>
              <td className="py-4 px-4 text-[13px] font-bold text-[#0F172A] text-center">
                {buyer.favs}
              </td>
              <td className="py-4 px-4">
                <div className="text-[13px] text-gray-500 whitespace-nowrap">
                  {buyer.createdDate}
                </div>
                <div className="text-[11px] text-gray-400">
                  {buyer.createdYear}
                </div>
              </td>
              <td className="py-4 pr-6 text-right">
                <button className="text-gray-400 hover:text-gray-600 p-1">
                  <MoreHorizontal size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
