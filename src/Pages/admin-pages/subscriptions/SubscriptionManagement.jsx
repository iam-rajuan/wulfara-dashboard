import React from "react";
import { Link } from "react-router-dom";
import { Plus, Users, LayoutGrid } from "lucide-react";
import PackageMetrics from "../../../Components/admin-components/subscriptions/PackageMetrics";
import PackageTable from "../../../Components/admin-components/subscriptions/PackageTable";

export default function SubscriptionManagement() {
  return (
    <div className="min-h-screen p-6 mt-16 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans pt-24 pb-32">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">
            Subscription Packages
          </h1>
          <p className="text-[14px] font-medium text-gray-500">
            Create, edit, and manage supplier pricing packages, listing periods, features, add-ons, and cancellation rules.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <LayoutGrid size={14} />
            Manage Add-ons
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <Users size={14} />
            View Active Subscriptions
          </button>
          <Link 
            to="/subscriptions/create"
            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[#D4AF37] border border-[#D4AF37] rounded-md text-[13px] font-bold text-[#0F172A] hover:bg-[#C2982B] transition-colors shadow-sm"
          >
            <Plus size={16} />
            Create Package
          </Link>
        </div>
      </div>

      <PackageMetrics />
      <PackageTable />

    </div>
  );
}
