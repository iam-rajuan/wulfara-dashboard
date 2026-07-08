import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Edit2, MoreVertical, Filter, Award, Star, Diamond } from "lucide-react";

const PACKAGES = [
  {
    id: "basic",
    name: "Basic Plan",
    visibility: "Tier 3 Visibility",
    price: "$49",
    billing: "Monthly/Annual",
    suppliers: 185,
    status: "Active",
    icon: <Award size={20} className="text-gray-500" />
  },
  {
    id: "pro",
    name: "Pro Plan",
    visibility: "Tier 2 Visibility",
    price: "$99",
    billing: "Monthly/Annual",
    suppliers: 42,
    status: "Active",
    icon: <Star size={20} className="text-blue-500" />
  },
  {
    id: "premium",
    name: "Premium Plan",
    visibility: "Tier 1 Visibility (Featured)",
    price: "$299",
    billing: "Annual Only",
    suppliers: 21,
    status: "Active",
    icon: <Diamond size={20} className="text-purple-500" />
  }
];

export default function PackageTable() {
  const navigate = useNavigate();
  const [openActionId, setOpenActionId] = useState(null);

  // Maximum value for the visual bar chart in the active suppliers column
  const maxSuppliers = 200;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
      
      {/* Table Header Controls */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="relative">
          <select className="appearance-none pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Draft</option>
          </select>
          <Filter size={14} className="absolute left-3 top-3 text-gray-400 hidden" />
          <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
        </div>
        
        <div className="text-[12px] font-bold text-gray-500 tracking-wider uppercase">
          Showing {PACKAGES.length} Packages
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-white border-b border-gray-100">
              <th className="py-4 pl-6 pr-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Package Name</th>
              <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Base Price</th>
              <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider w-48">Active Suppliers</th>
              <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="py-4 pr-6 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {PACKAGES.map((pkg) => (
              <tr key={pkg.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-5 pl-6 pr-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
                      {pkg.icon}
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[#0F172A] leading-tight">{pkg.name}</h4>
                      <p className="text-[12px] font-medium text-gray-500">{pkg.visibility}</p>
                    </div>
                  </div>
                </td>
                <td className="py-5 px-4">
                  <div className="text-[14px] font-bold text-[#0F172A]">
                    {pkg.price}<span className="text-[12px] font-medium text-gray-400">/mo</span>
                  </div>
                  <div className="text-[12px] font-medium text-gray-500">{pkg.billing}</div>
                </td>
                <td className="py-5 px-4">
                  <div className="text-[14px] font-bold text-[#0F172A] mb-1.5">{pkg.suppliers}</div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#0F172A] rounded-full" 
                      style={{ width: `${(pkg.suppliers / maxSuppliers) * 100}%` }}
                    ></div>
                  </div>
                </td>
                <td className="py-5 px-4">
                  <span className="inline-flex px-2.5 py-1 bg-[#FEF3C7] text-[#D97706] text-[11px] font-bold rounded">
                    {pkg.status}
                  </span>
                </td>
                <td className="py-5 pr-6 text-right relative">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => navigate(`/subscriptions/edit/${pkg.id}`)}
                      className="text-gray-400 hover:text-[#0F172A] p-1.5 rounded-md transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => setOpenActionId(openActionId === pkg.id ? null : pkg.id)}
                      className="text-gray-400 hover:text-gray-600 p-1.5 rounded-md transition-colors focus:outline-none"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  {openActionId === pkg.id && (
                    <>
                      <div 
                        className="fixed inset-0 z-50"
                        onClick={() => setOpenActionId(null)}
                      ></div>
                      <div className="absolute right-6 top-12 w-36 bg-white rounded-md shadow-xl border border-gray-100 z-50 py-1 overflow-hidden">
                        <button
                          onClick={() => setOpenActionId(null)}
                          className="w-full px-4 py-2 text-[12px] font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-start gap-2 transition-colors"
                        >
                          Duplicate
                        </button>
                        <button
                          onClick={() => setOpenActionId(null)}
                          className="w-full px-4 py-2 text-[12px] font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-start gap-2 transition-colors"
                        >
                          Archive
                        </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
