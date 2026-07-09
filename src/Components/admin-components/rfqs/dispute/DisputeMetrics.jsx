import React from "react";

export default function DisputeMetrics({ data = {} }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-[11px] font-extrabold text-gray-400 mb-1">RFQ ID</h3>
        <p className="text-xl font-extrabold text-blue-600">#{data.id || "Unknown"}-DIS</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-[11px] font-extrabold text-gray-400 mb-2">Status</h3>
        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-[11px] font-bold rounded-full">
          {data.status || "Disputed"}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-[11px] font-extrabold text-gray-400 mb-1">Created Date</h3>
        <p className="text-[14px] font-bold text-[#0F172A]">{data.createdDate || "N/A"}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-[11px] font-extrabold text-gray-400 mb-1">Last Update</h3>
        <p className="text-[14px] font-bold text-[#0F172A]">{data.lastUpdate || "N/A"}</p>
      </div>
    </div>
  );
}
