import { Link, useParams } from "react-router-dom";

export default function EditPackageHeader({ activeTab, setActiveTab, handleSave }) {
  const { id } = useParams();
  const isCreating = !id;
  const pageTitle = isCreating ? "Create Package" : "Edit Premium Plan";
  const tabs = [
    "Overview", "Pricing", "Features", "Listing Periods", 
    "Supplier Access", "Billing Rules", "Add-ons", "Visibility", "Preview"
  ];

  return (
    <div className="bg-white border-b border-gray-200 pt-6 px-6 lg:px-8 mb-8 sticky top-16 z-30">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6">
        <div>
          <div className="flex items-center text-[10px] font-extrabold text-gray-400 mb-2 gap-2 tracking-wider uppercase">
            <Link to="/subscriptions" className="hover:text-gray-600">Packages</Link>
            <span>&gt;</span>
            <span className="text-[#D4AF37]">{pageTitle}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
            {pageTitle}
          </h1>
          
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D97706]"></div>
              Active
            </span>
            <span className="text-[12px] font-medium text-gray-500">
              <strong className="text-gray-700">42</strong> Active Suppliers
            </span>
            <span className="text-[12px] font-medium text-gray-500">
              <strong className="text-gray-700">$9,890</strong> Monthly Revenue
            </span>
            <span className="text-[12px] font-medium text-gray-500">
              Last edited 2 hrs ago by Admin
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-5 py-2 text-[13px] font-bold text-gray-600 hover:text-gray-900 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
            Discard Changes
          </button>
          <button onClick={handleSave} className="px-5 py-2 bg-[#0F172A] border border-[#0F172A] rounded-md text-[13px] font-bold text-white hover:bg-gray-800 transition-colors shadow-sm">
            Save Changes
          </button>
        </div>
      </div>

      {/* Warning Alert */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-6 flex items-start gap-3">
        <div className="text-orange-500 mt-0.5">⚠️</div>
        <div>
          <h4 className="text-[12px] font-bold text-orange-900">Package Currently In Use</h4>
          <p className="text-[11px] font-medium text-orange-700 leading-snug mt-0.5">
            This plan has active subscribers. Modifications to base pricing or billing cycles will only apply to new subscriptions. Existing users will remain on their legacy terms unless migrated manually.
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center overflow-x-auto hide-scrollbar gap-6 border-t border-gray-100 pt-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 text-[13px] font-bold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab 
                ? "border-[#0F172A] text-[#0F172A]" 
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

    </div>
  );
}
