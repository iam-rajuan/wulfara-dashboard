import React from "react";
import { Users, Building2, ClipboardList, CreditCard, DollarSign, FileText, LineChart } from "lucide-react";
import AdminStatCard from "../../../Components/admin-components/Dashboard/AdminStatCard";
import RevenueOverview from "../../../Components/admin-components/Dashboard/RevenueOverview";
import PriorityActions from "../../../Components/admin-components/Dashboard/PriorityActions";
import RecentSupplierListings from "../../../Components/admin-components/Dashboard/RecentSupplierListings";
import RecentRFQs from "../../../Components/admin-components/Dashboard/RecentRFQs";
import { useGetDashboardStatsQuery } from "../../../redux/features/reports/reportsApi";
import { SUPPORT_URL, PRIVACY_URL, TERMS_URL } from "../../../config/urls";

export default function AdminDashboard() {
  const { data: statsResponse, isLoading } = useGetDashboardStatsQuery();
  const stats = statsResponse?.data || {};
  const growthValue = isLoading
    ? "..."
    : `${stats.userGrowthDelta > 0 ? "+" : ""}${stats.userGrowthDelta || 0}`;
  const growthTrend =
    typeof stats.userGrowthPercent === "number"
      ? `${stats.userGrowthPercent > 0 ? "+" : ""}${stats.userGrowthPercent}% vs previous 30 days`
      : "Awaiting trend";
  const growthTrendType =
    stats.userGrowthDelta > 0 ? "positive" : stats.userGrowthDelta < 0 ? "negative" : "neutral";

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
          value={isLoading ? "..." : stats.totalSuppliers?.toLocaleString()}
          trend={stats.newSuppliersLast30Days > 0 ? `+${stats.newSuppliersLast30Days} this month` : "No new this month"}
          trendType={stats.newSuppliersLast30Days > 0 ? "positive" : "neutral"}
        />
        <AdminStatCard
          title="Total Users"
          icon={Users}
          value={isLoading ? "..." : stats.totalUsers?.toLocaleString()}
          trend="Lifetime"
          trendType="neutral"
        />
        <AdminStatCard
          title="Pending Listings"
          icon={ClipboardList}
          value={isLoading ? "..." : stats.pendingListings?.toLocaleString() ?? "0"}
          trend={stats.pendingListings > 0 ? "Needs review" : "No pending listings"}
          trendType={stats.pendingListings > 0 ? "warning" : "neutral"}
        />
        <AdminStatCard
          title="Active Subscriptions"
          icon={CreditCard}
          value={isLoading ? "..." : stats.activeSubscriptions?.toLocaleString() ?? "0"}
          trend={stats.activeSubscriptions > 0 ? "Live subscriptions" : "No active subscriptions"}
          trendType="neutral"
        />
      </div>

      {/* Top Stats - Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AdminStatCard
          title="Total Revenue"
          icon={DollarSign}
          value={isLoading ? "..." : `$${stats.totalRevenue?.toLocaleString() || 0}`}
          trend="Lifetime"
          trendType="positive"
        />
        <AdminStatCard
          title="Total RFQs"
          icon={FileText}
          value={isLoading ? "..." : stats.totalRfqs?.toLocaleString()}
          trend="System total"
          trendType="neutral"
        />
        <AdminStatCard
          title="User Growth"
          icon={LineChart}
          value={growthValue}
          trend={growthTrend}
          trendType={growthTrendType}
        />
        {/* Empty 4th column to match screenshot layout */}
        <div className="hidden lg:block"></div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <RevenueOverview chartData={stats.chartData} />
        <PriorityActions
          actions={stats.priorityActions || []}
          supportTicketsAvailable={stats.supportTicketsAvailable}
        />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RecentSupplierListings listings={stats.recentSupplierListings || []} />
        <RecentRFQs rfqs={stats.recentRfqs || []} />
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-gray-500 pt-6 pb-2 px-2 border-t border-gray-200 mt-12">
        <p>© 2024 WULFARA Industrial Marketplace. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0 text-gray-500">
          <a href={SUPPORT_URL} className="hover:text-gray-900 transition">Support</a>
          <a href={PRIVACY_URL} className="hover:text-gray-900 transition">Privacy Policy</a>
          <a href={TERMS_URL} className="hover:text-gray-900 transition">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}
