import React from "react";
import { Users, Building2, ClipboardList, CreditCard, DollarSign, FileText, LineChart } from "lucide-react";
import AdminStatCard from "../../Components/admin-components/Dashboard/AdminStatCard";
import RevenueOverview from "../../Components/admin-components/Dashboard/RevenueOverview";
import PriorityActions from "../../Components/admin-components/Dashboard/PriorityActions";
import RecentSupplierListings from "../../Components/admin-components/Dashboard/RecentSupplierListings";
import RecentRFQs from "../../Components/admin-components/Dashboard/RecentRFQs";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen mt-16 p-6 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#0F172A] mb-2 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-[14px] text-gray-500 font-medium">
          Monitor WULFARA platform activity, review pending tasks, and analyze growth metrics.
        </p>
      </div>

      {/* Top Stats - Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <AdminStatCard
          title="Total Suppliers"
          icon={Building2}
          value="1,248"
          trend="+12.5%"
          trendType="positive"
        />
        <AdminStatCard
          title="Active Buyers"
          icon={Users}
          value="8,430"
          trend="+9.2%"
          trendType="positive"
        />
        <AdminStatCard
          title="Pending Listings"
          icon={ClipboardList}
          value="37"
          trend="Needs review"
          trendType="warning"
        />
        <AdminStatCard
          title="Active Subscriptions"
          icon={CreditCard}
          value="684"
          trend="+4.8%"
          trendType="positive"
        />
      </div>

      {/* Top Stats - Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AdminStatCard
          title="Revenue (MRR)"
          icon={DollarSign}
          value="$52,890"
          trend="+18.4%"
          trendType="positive"
        />
        <AdminStatCard
          title="Open RFQs"
          icon={FileText}
          value="214"
          trend="Awaiting response"
          trendType="neutral"
        />
        <AdminStatCard
          title="User Growth (MTD)"
          icon={LineChart}
          value="+1,320"
          trend="Strong momentum"
          trendType="positive"
          trendLabel="↑"
        />
        {/* Empty 4th column to match screenshot layout */}
        <div className="hidden lg:block"></div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <RevenueOverview />
        <PriorityActions />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RecentSupplierListings />
        <RecentRFQs />
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-gray-500 pt-6 pb-2 px-2 border-t border-gray-200 mt-12">
        <p>© 2024 WULFARA Industrial Marketplace. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0 text-gray-500">
          <a href="#" className="hover:text-gray-900 transition">Support</a>
          <a href="#" className="hover:text-gray-900 transition">Privacy Policy</a>
          <a href="#" className="hover:text-gray-900 transition">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}
