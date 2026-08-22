import React from 'react';
import { message } from 'antd';
import DashboardHeader from '../../Components/Dashboard/DashboardHeader';
import DashboardStats from '../../Components/Dashboard/DashboardStats';
import ListingAnalytics from '../../Components/Dashboard/ListingAnalytics';
import ProfileCompletion from '../../Components/Dashboard/ProfileCompletion';
import RecentRFQsTable from '../../Components/Dashboard/RecentRFQsTable';

import { useGetSupplierDashboardQuery } from '../../redux/features/listings/listingsApi';
import { SUPPORT_URL, PRIVACY_URL, TERMS_URL } from '../../config/urls';

export default function SupplierDashboard() {
  const { data, isLoading, isError, refetch } = useGetSupplierDashboardQuery();
  
  if (isLoading) {
    return <div className="w-full mt-10 text-center text-gray-500">Loading Dashboard...</div>;
  }
  if (isError) {
    return (
      <div className="w-full mt-10 text-center text-gray-500">
        <p className="mb-3">Unable to load dashboard data.</p>
        <button onClick={refetch} className="px-4 py-2 rounded-md bg-[#D4AF37] text-[#0F172A] font-bold">
          Retry
        </button>
      </div>
    );
  }

  const dashboardData = data?.data;
  const profile = dashboardData?.profile || {};
  const stats = dashboardData?.stats || { totalRfqs: 0, pendingRfqs: 0, profileCompletion: '0%', subscriptionPlan: 'free', isApproved: false };

  const handleExportReport = () => {
    if (!dashboardData) {
      message.error("No data available to export.");
      return;
    }

    try {
      const rows = [];

      // Helper function to safely format fields and avoid Excel CSV injection issues or syntax breakages
      const formatCSVCell = (val) => {
        if (val === null || val === undefined) return '""';
        const str = String(val);
        // If string contains comma, double-quotes, or newlines, escape it
        if (/[",\n\r]/.test(str)) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return `"${str}"`;
      };

      // Metadata & Headers
      rows.push(["WULFARA INDUSTRIAL MARKETPLACE - SUPPLIER PERFORMANCE REPORT"]);
      rows.push([`Generated On:`, new Date().toLocaleString()]);
      rows.push([`Company Name:`, profile.companyName || "N/A"]);
      rows.push([`Contact Email:`, profile.contactEmail || "N/A"]);
      rows.push([]);

      // Section 1: Overview Metrics
      rows.push(["OVERVIEW METRICS"]);
      rows.push(["Metric", "Value"]);
      rows.push(["Total RFQs", stats.totalRfqs || 0]);
      rows.push(["Pending RFQs", stats.pendingRfqs || 0]);
      rows.push(["Responded RFQs", stats.respondedRfqs || 0]);
      rows.push(["Closed RFQs", stats.closedRfqs || 0]);
      rows.push(["Total Profile Views", stats.totalViews || 0]);
      rows.push(["Current Month Views", stats.currentMonthViews || 0]);
      rows.push(["Profile Completion Status", stats.profileCompletion || "0%"]);
      rows.push(["Subscription Plan", stats.subscriptionPlan ? stats.subscriptionPlan.toUpperCase() : "FREE"]);
      rows.push(["Verification Status", stats.isApproved ? "Approved" : "Pending"]);
      rows.push([]);

      // Section 2: Traffic History
      rows.push(["TRAFFIC HISTORY (LAST 6 MONTHS)"]);
      rows.push(["Month", "Views"]);
      if (Array.isArray(stats.analytics) && stats.analytics.length > 0) {
        stats.analytics.forEach(item => {
          rows.push([item.name || "-", item.views || 0]);
        });
      } else {
        rows.push(["No historical traffic data available", ""]);
      }
      rows.push([]);

      // Section 3: RFQs Received
      rows.push(["RECENT RFQS RECEIVED"]);
      rows.push(["RFQ ID", "Buyer Name", "Product/Subject", "Quantity", "Date/Deadline", "Status"]);
      if (Array.isArray(stats.recentRfqs) && stats.recentRfqs.length > 0) {
        stats.recentRfqs.forEach(rfq => {
          rows.push([
            rfq.rfqId || "-",
            rfq.buyer || "Anonymous",
            rfq.product || "-",
            rfq.quantity || "-",
            rfq.deadline || "-",
            rfq.statusLabel || rfq.status || "Pending"
          ]);
        });
      } else {
        rows.push(["No RFQs received yet", "", "", "", "", ""]);
      }

      // Convert rows to CSV string
      // Prepend UTF-8 Byte Order Mark (BOM) to ensure correct character representation in Excel
      const BOM = "\uFEFF";
      const csvString = BOM + rows.map(row => row.map(formatCSVCell).join(",")).join("\n");

      // Create Blob and trigger download
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      
      const companyClean = (profile.companyName || "supplier")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "_")
        .substring(0, 30);
      
      link.href = url;
      link.download = `wulfara_report_${companyClean}_${new Date().toISOString().slice(0, 10)}.csv`;
      link.style.visibility = "hidden";
      
      document.body.appendChild(link);
      link.click();
      
      // Clean up DOM and memory
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);

      message.success("Performance report downloaded successfully!");
    } catch (error) {
      console.error("Failed to export report:", error);
      message.error("An error occurred while generating the report. Please try again.");
    }
  };

  return (
    <div className="w-full text-[#0F172A] mt-5 font-sans overflow-hidden">
      <DashboardHeader profile={profile} stats={stats} onExport={handleExportReport} />

      <DashboardStats stats={stats} />

      {/* Main Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <ListingAnalytics chartData={stats.analytics} />
        <ProfileCompletion profile={profile} stats={stats} />
      </div>

      <RecentRFQsTable rfqs={stats.recentRfqs || []} />

      {/* Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-gray-500 pt-6 pb-4 px-2 text-center md:text-left">
        <p className="mb-4 md:mb-0">© 2024 WULFARA Industrial Marketplace. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-gray-500">
          <a href={SUPPORT_URL} className="hover:text-gray-900 transition">Support</a>
          <a href={PRIVACY_URL} className="hover:text-gray-900 transition">Privacy Policy</a>
          <a href={TERMS_URL} className="hover:text-gray-900 transition">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}
