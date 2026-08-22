import React from "react";
import { Link } from "react-router-dom";

const STATUS_TONE_CLASS = {
  warning: "bg-[#FEF3C7] text-[#D4AF37]",
  success: "bg-green-100 text-green-700",
  danger: "bg-red-100 text-red-700",
  muted: "bg-gray-100 text-gray-600",
};

export default function RecentSupplierListings({ listings = [] }) {

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[12px] font-bold text-[#0F172A] uppercase tracking-wider">
          Recent Supplier Listings
        </h3>
        <Link to="/supplier-management" className="text-[12px] font-bold text-[#D4AF37] hover:text-[#C2982B] transition-colors">
          View All
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="flex-1 flex items-center justify-center rounded-lg border border-dashed border-gray-200 text-sm text-gray-500">
          No supplier listings found in the database yet.
        </div>
      ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-3 pr-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Company</th>
              <th className="py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Plan</th>
              <th className="py-3 pl-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {listings.map((listing, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 pr-4 text-[13px] font-medium text-[#0F172A]">
                  {listing.company}
                </td>
                <td className="py-4 px-4 text-[13px] text-gray-500">
                  {listing.category}
                </td>
                <td className="py-4 px-4 text-[13px] text-gray-500">
                  {listing.plan}
                </td>
                <td className="py-4 pl-4 text-right">
                  <span className={`inline-flex items-center justify-center px-2 py-1 rounded-[4px] text-[11px] font-bold ${STATUS_TONE_CLASS[listing.statusTone] || STATUS_TONE_CLASS.warning}`}>
                    {listing.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}
