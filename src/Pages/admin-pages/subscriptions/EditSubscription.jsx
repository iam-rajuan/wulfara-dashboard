import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditPackageHeader from "../../../Components/admin-components/subscriptions/EditPackageHeader";
import PackageInfoForm from "../../../Components/admin-components/subscriptions/PackageInfoForm";
import PricingPeriodsForm from "../../../Components/admin-components/subscriptions/PricingPeriodsForm";
import FeatureAccessForm from "../../../Components/admin-components/subscriptions/FeatureAccessForm";
import CapacityLimitsForm from "../../../Components/admin-components/subscriptions/CapacityLimitsForm";
import BillingRulesForm from "../../../Components/admin-components/subscriptions/BillingRulesForm";
import UpsellAddonsForm from "../../../Components/admin-components/subscriptions/UpsellAddonsForm";
import PublicMarketingForm from "../../../Components/admin-components/subscriptions/PublicMarketingForm";
import PackageHistoryTable from "../../../Components/admin-components/subscriptions/PackageHistoryTable";
import LivePreviewCard from "../../../Components/admin-components/subscriptions/LivePreviewCard";

export default function EditSubscription() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Overview");
  const [formData, setFormData] = useState({
    name: "Premium Plan",
    slug: "premium-plan",
    status: "Published",
    description: "The complete solution for scaling manufacturers. Includes advanced RFQ management, priority placement, and team collaboration tools.",
    badge: "Popular",
    publicVisibility: true,
    basePrice: "4,900",
    features: [1, 2, 3, 4] // feature IDs that are checked
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Smooth scroll logic when a tab is clicked
  useEffect(() => {
    if (activeTab) {
      const element = document.getElementById(activeTab);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#0F172A] font-sans pb-32">
      
      {/* Sticky Header with Tabs */}
      <EditPackageHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="px-6 lg:px-8 max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-6">
          
          {/* Row 1: Info (Left 2/3) & Live Preview (Right 1/3) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PackageInfoForm data={formData} onChange={handleChange} />
            </div>
            <div className="lg:col-span-1">
              <LivePreviewCard data={formData} />
            </div>
          </div>

          {/* Row 2: Pricing Periods */}
          <div>
            <PricingPeriodsForm data={formData} onChange={handleChange} />
          </div>

          {/* Row 3: Feature Access & Capacity Limits */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FeatureAccessForm data={formData} onChange={handleChange} />
            <CapacityLimitsForm />
          </div>

          {/* Row 4: Billing Rules & Upsell Addons */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BillingRulesForm />
            <UpsellAddonsForm />
          </div>

          {/* Row 5: Public Marketing */}
          <div>
            <PublicMarketingForm data={formData} onChange={handleChange} />
          </div>

          {/* Row 6: History Table */}
          <div>
            <PackageHistoryTable />
          </div>

        </div>
      </div>
    </div>
  );
}
