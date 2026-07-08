import React from "react";
import { Eye } from "lucide-react";

export default function RfqTable({ rfqs, currentPage, setCurrentPage, totalPages, totalItems, itemsPerPage }) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">RFQ ID</th>
              <th className="py-4 px-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Buyer</th>
              <th className="py-4 px-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Supplier</th>
              <th className="py-4 px-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Category</th>
              <th className="py-4 px-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Created</th>
              <th className="py-4 px-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Dispute</th>
              <th className="py-4 px-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rfqs.map((rfq, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6 text-[12px] font-medium text-gray-700 whitespace-nowrap">
                  {rfq.id.split('-').map((part, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && '-'}{part}<br/>
                    </React.Fragment>
                  ))}
                  {/* The design splits the ID onto multiple lines visually: #RFQ- \n 2024- \n 8842, let's implement exactly that layout */}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold ${rfq.buyer.color}`}>
                      {rfq.buyer.logo}
                    </div>
                    <span className="text-[12px] font-bold text-[#0F172A] max-w-[80px] break-words leading-snug">
                      {rfq.buyer.name}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-[12px] font-medium text-gray-700 max-w-[100px] break-words leading-snug">
                  {rfq.supplier}
                </td>
                <td className="py-4 px-6">
                  <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-[9px] font-extrabold rounded uppercase tracking-wider">
                    {rfq.category}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${rfq.statusColor}`}></div>
                    <span className="text-[12px] font-medium text-gray-700">{rfq.status}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-[12px] font-medium text-gray-700 whitespace-nowrap">
                  {rfq.created.split(', ').map((part, i) => (
                    <React.Fragment key={i}>
                      {part}<br/>
                    </React.Fragment>
                  ))}
                </td>
                <td className="py-4 px-6 text-[12px] font-medium text-gray-500">
                  {rfq.dispute}
                </td>
                <td className="py-4 px-6">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-[12px] font-medium text-gray-500">
          Showing {totalItems === 0 ? 0 : startItem} to {endItem} of {totalItems} suppliers
        </span>
        <div className="flex items-center gap-1">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-[12px] font-medium text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button 
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1.5 rounded-md text-[12px] shadow-sm ${
                currentPage === page 
                  ? "bg-[#D4AF37] border border-[#D4AF37] font-bold text-white" 
                  : "bg-white border border-gray-200 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              }`}
            >
              {page}
            </button>
          ))}
          
          <button 
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}
