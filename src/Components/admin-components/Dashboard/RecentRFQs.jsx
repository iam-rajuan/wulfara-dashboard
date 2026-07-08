import React from "react";

export default function RecentRFQs() {
  const rfqs = [
    {
      id: "#RFQ-9921",
      buyer: "TechFlow Systems",
      category: "Servers",
      status: "Open",
      statusColor: "bg-[#E0E7FF] text-[#4F46E5]",
    },
    {
      id: "#RFQ-9920",
      buyer: "BuildIt Group",
      category: "Raw Materials",
      status: "Review",
      statusColor: "bg-[#FEF3C7] text-[#D4AF37]",
    },
    {
      id: "#RFQ-9919",
      buyer: "MediCorp",
      category: "Medical Supplies",
      status: "Closed",
      statusColor: "bg-gray-100 text-gray-600",
    },
    {
      id: "#RFQ-9918",
      buyer: "AutoMotive Ltd",
      category: "Machinery",
      status: "Open",
      statusColor: "bg-[#E0E7FF] text-[#4F46E5]",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[12px] font-bold text-[#0F172A] uppercase tracking-wider">
          Recent RFQs
        </h3>
        <button className="text-[12px] font-bold text-[#D4AF37] hover:text-[#C2982B] transition-colors">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-3 pr-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">ID</th>
              <th className="py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Buyer</th>
              <th className="py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="py-3 pl-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rfqs.map((rfq, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 pr-4 text-[13px] font-bold text-[#0F172A]">
                  {rfq.id}
                </td>
                <td className="py-4 px-4 text-[13px] font-medium text-gray-700">
                  {rfq.buyer}
                </td>
                <td className="py-4 px-4 text-[13px] text-gray-500">
                  {rfq.category}
                </td>
                <td className="py-4 pl-4 text-right">
                  <span className={`inline-flex items-center justify-center px-2 py-1 rounded-[4px] text-[11px] font-bold ${rfq.statusColor}`}>
                    {rfq.status}
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
