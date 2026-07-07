import DashboardHeader from '../../Components/Dashboard/DashboardHeader';
import DashboardStats from '../../Components/Dashboard/DashboardStats';
import ListingAnalytics from '../../Components/Dashboard/ListingAnalytics';
import ProfileCompletion from '../../Components/Dashboard/ProfileCompletion';
import RecentRFQsTable from '../../Components/Dashboard/RecentRFQsTable';

export default function Dashboard() {
  return (
    <div className="min-h-screen p-6 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans">
      <DashboardHeader />

      <DashboardStats />

      {/* Main Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <ListingAnalytics />
        <ProfileCompletion />
      </div>

      <RecentRFQsTable />

      {/* Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-gray-500 pt-4 pb-4 px-2">
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