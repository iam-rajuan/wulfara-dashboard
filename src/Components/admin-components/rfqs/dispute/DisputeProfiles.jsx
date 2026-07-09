import React from "react";

export default function DisputeProfiles({ buyer = {}, supplier = {} }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      
      {/* Buyer Profile */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
            {buyer.avatar ? (
              <img 
                src={buyer.avatar} 
                alt={buyer.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold">{buyer.name?.substring(0,2).toUpperCase()}</div>
            )}
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-[#0F172A] leading-tight">{buyer.name || "Unknown"}</h3>
            <p className="text-[11px] font-medium text-gray-500 mt-0.5 leading-snug">{buyer.role || "N/A"}</p>
          </div>
        </div>
        <div className="space-y-3 mt-auto border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-gray-500 font-medium">Company</span>
            <span className="text-[12px] font-bold text-[#0F172A]">{buyer.company || "N/A"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-gray-500 font-medium">Rating</span>
            <span className="text-[12px] font-extrabold text-[#F97316]">{buyer.rating || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Supplier Profile */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#E0E7FF] text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
            {supplier.initials || "NA"}
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-[#0F172A] leading-tight">{supplier.name || "Unknown"}</h3>
            <p className="text-[11px] font-medium text-gray-500 mt-0.5 leading-snug">{supplier.role || "N/A"}</p>
          </div>
        </div>
        <div className="space-y-3 mt-auto border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-gray-500 font-medium">Contact</span>
            <span className="text-[12px] font-bold text-[#0F172A]">{supplier.contact || "N/A"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-gray-500 font-medium">Rating</span>
            <span className="text-[12px] font-extrabold text-[#F97316]">{supplier.rating || "N/A"}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
