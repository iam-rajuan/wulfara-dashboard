import React from "react";

export default function RecentSupplierListings() {
  const listings = [
    {
      company: "Apex Logistics",
      category: "Freight Forwarding",
      plan: "Enterprise",
      status: "Pending",
      statusColor: "bg-[#FEF3C7] text-[#D4AF37]",
    },
    {
      company: "Global Parts Inc.",
      category: "Manufacturing",
      plan: "Pro",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      company: "NeoTech Supply",
      category: "Electronics",
      plan: "Basic",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      company: "Oceania Trade Co",
      category: "Shipping",
      plan: "Enterprise",
      status: "Rejected",
      statusColor: "bg-red-100 text-red-700",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[12px] font-bold text-[#0F172A] uppercase tracking-wider">
          Recent Supplier Listings
        </h3>
        <button className="text-[12px] font-bold text-[#D4AF37] hover:text-[#C2982B] transition-colors">
          View All
        </button>
      </div>

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
                  <span className={`inline-flex items-center justify-center px-2 py-1 rounded-[4px] text-[11px] font-bold ${listing.statusColor}`}>
                    {listing.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
