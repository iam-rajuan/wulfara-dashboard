import React from "react";
import { History } from "lucide-react";

export default function PackageHistoryTable() {
  const history = [
    {
      id: 1,
      date: "Oct 24, 14:22",
      admin: { name: "Admin", initials: "AD", color: "bg-blue-500" },
      action: "Update",
      field: "Description",
      previous: '"The complete solution..."',
      new: '"The complete solution for scaling..."'
    },
    {
      id: 2,
      date: "Oct 15, 09:15",
      admin: { name: "Sarah B.", initials: "SB", color: "bg-purple-500" },
      action: "Price Adjust",
      field: "Base Price",
      previous: "$4,500",
      new: "$4,900"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
        <History size={16} className="text-gray-400" />
        <h2 className="text-[14px] font-extrabold text-[#0F172A]">Package Change History</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-3 pr-4 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Date & Time</th>
              <th className="py-3 px-4 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Admin</th>
              <th className="py-3 px-4 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Action</th>
              <th className="py-3 px-4 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Field Changed</th>
              <th className="py-3 px-4 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Previous</th>
              <th className="py-3 pl-4 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">New Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {history.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 pr-4">
                  <span className="text-[12px] font-bold text-gray-600">{record.date.split(',')[0]}</span><br/>
                  <span className="text-[11px] font-medium text-gray-400">{record.date.split(',')[1]}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full ${record.admin.color} flex items-center justify-center text-white text-[9px] font-bold`}>
                      {record.admin.initials}
                    </div>
                    <span className="text-[12px] font-bold text-[#0F172A]">{record.admin.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-[12px] font-medium text-gray-600">{record.action}</td>
                <td className="py-4 px-4 text-[12px] font-bold text-[#0F172A]">{record.field}</td>
                <td className="py-4 px-4 text-[12px] font-medium text-gray-400 truncate max-w-[150px]">{record.previous}</td>
                <td className="py-4 pl-4 text-[12px] font-bold text-[#D97706] truncate max-w-[150px]">{record.new}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
