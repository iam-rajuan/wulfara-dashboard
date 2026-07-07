import React from 'react';

const recentRFQs = [
  { id: 'RFQ-1048', buyer: 'David Carter', avatar: 'DC', product: 'Steel sheets', qty: '500 units', deadline: 'May 24', status: 'New', statusColor: 'bg-blue-100 text-blue-800', dot: 'bg-blue-600', action: 'View', actionStyle: 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50' },
  { id: 'RFQ-1047', buyer: 'Nova Build LLC', avatar: 'NB', product: 'Metal pipes', qty: '1,200 units', deadline: 'May 28', status: 'Responded', statusColor: 'bg-blue-600 text-white', dot: 'bg-white', action: 'View', actionStyle: 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50' },
  { id: 'RFQ-1046', buyer: 'Apex Industrial', avatar: 'AI', product: 'Raw materials', qty: '3 tons', deadline: 'June 02', status: 'Pending', statusColor: 'bg-gray-200 text-gray-800', dot: 'bg-gray-500', action: 'Reply', actionStyle: 'text-[#0F172A] bg-[#D4AF37] hover:bg-[#C29F31] border border-transparent' },
];

export default function RecentRFQsTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <div>
          <h3 className="font-bold text-[16px] text-[#0F172A] mb-1">Recent RFQs</h3>
          <p className="text-gray-500 text-[13px]">Latest requests from buyers</p>
        </div>
        <button className="text-[13px] font-bold text-[#137847] hover:underline">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-[#F8F9FB] text-gray-500 text-[11px] uppercase font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">RFQ ID</th>
              <th className="px-6 py-4">Buyer</th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4">Deadline</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recentRFQs.map((rfq, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="px-6 py-5 font-bold text-[#0F172A]">{rfq.id}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-[4px] bg-[#4B5563] text-white flex items-center justify-center text-[10px] font-bold">
                      {rfq.avatar}
                    </div>
                    <span className="font-medium text-gray-600">{rfq.buyer}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-gray-600">{rfq.product}</td>
                <td className="px-6 py-5 text-gray-600">{rfq.qty}</td>
                <td className="px-6 py-5 text-gray-600">{rfq.deadline}</td>
                <td className="px-6 py-5">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold ${rfq.statusColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${rfq.dot}`}></span>
                    {rfq.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <button className={`px-4 py-1.5 rounded-[4px] text-[12px] font-bold transition ${rfq.actionStyle}`}>
                    {rfq.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
