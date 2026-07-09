import React from "react";
import { PackageSearch, Plus } from "lucide-react";

export default function DisputeScope({ scope = {} }) {
  return (
    <div className="bg-[#F8FAFC] rounded-xl border border-gray-200 mb-6 overflow-hidden">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-2 text-gray-500">
          <PackageSearch size={16} />
          <h3 className="text-[13px] font-bold text-[#0F172A]">RFQ Scope & Logistics Detail</h3>
        </div>
        <span className="text-[12px] font-medium text-gray-500">Quote: {scope.quote || "N/A"}</span>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">Cargo Specifications</h4>
            <p className="text-[13px] font-medium text-[#0F172A] leading-relaxed">
              {scope.cargo || "No specifications provided."}
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">Incident Report</h4>
            <p className="text-[13px] font-medium text-red-600 leading-relaxed">
              {scope.incident || "No incident reported."}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-4 border-t border-gray-200 border-dashed">
          <div>
            <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Route</h4>
            <p className="text-[13px] font-medium text-[#0F172A]">{scope.route || "N/A"}</p>
          </div>
          
          <div className="flex items-center gap-2">
            {scope.images && scope.images.map((img, idx) => (
              <div key={idx} className="w-12 h-12 rounded border border-gray-200 overflow-hidden bg-gray-900 cursor-pointer hover:opacity-90 transition-opacity">
                <img 
                  src={img} 
                  alt="Attachment" 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            ))}
            <button className="w-12 h-12 rounded border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
