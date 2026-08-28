import React from "react";
import { Package, Users, TrendingUp, Activity } from "lucide-react";

const formatCurrencyCompact = (value) => {
  const amount = Number(value || 0);
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`;
  return `$${amount.toFixed(0)}`;
};

export default function PackageMetrics({ metrics }) {
  const activePlansCount = metrics?.activePackages || 0;
  const paidSuppliersCount = metrics?.paidSuppliers || 0;
  const formattedRevenue = formatCurrencyCompact(metrics?.monthlyRevenue || 0);
  const packageConversion = Number(metrics?.packageConversion || 0);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* Active Packages */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[13px] font-bold text-gray-500">Active Packages</p>
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
            <Package size={16} />
          </div>
        </div>
        <h3 className="text-3xl font-extrabold text-[#0F172A]">{activePlansCount}</h3>
      </div>

      {/* Paid Suppliers */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[13px] font-bold text-gray-500">Paid Suppliers</p>
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
            <Users size={16} />
          </div>
        </div>
        <h3 className="text-3xl font-extrabold text-[#0F172A] mb-1">{paidSuppliersCount}</h3>
        <p className="text-[12px] font-medium text-gray-500">
          Currently active paid suppliers
        </p>
      </div>

      {/* Monthly Revenue */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[13px] font-bold text-gray-500">Monthly Revenue</p>
          <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-[#D97706]">
            <Activity size={16} />
          </div>
        </div>
        <h3 className="text-3xl font-extrabold text-[#0F172A] mb-1">{formattedRevenue}</h3>
        <p className="text-[12px] font-medium text-gray-500">
          Paid revenue recorded this month
        </p>
      </div>

      {/* Package Conversion */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[13px] font-bold text-gray-500">Package Conversion</p>
          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500">
            <TrendingUp size={16} />
          </div>
        </div>
        <h3 className="text-3xl font-extrabold text-[#0F172A] mb-1">{packageConversion}%</h3>
        <p className="text-[12px] font-medium text-gray-500">
          Paid suppliers vs all suppliers
        </p>
      </div>

    </div>
  );
}
