import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPlanQuery, useGetPlansQuery, useUpdatePlanMutation } from "../../../redux/features/subscriptions/subscriptionsApi";
import { toast } from 'react-toastify';
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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  
  const { data: planResponse, isLoading } = useGetPlanQuery(id, { skip: !id });
  const { data: plansResponse } = useGetPlansQuery();
  const [updatePlan] = useUpdatePlanMutation();
  
  const [formData, setFormData] = useState({
    internalName: "",
    name: "",
    slug: "",
    status: "Published",
    description: "",
    badge: "",
    accentColor: "#D4AF37",
    publicVisibility: true,
    basePrice: "",
    billingCycle: "",
    taxCategory: "",
    features: [1, 2, 3, 4] // feature IDs that are checked
  });

  useEffect(() => {
    if (planResponse?.data) {
      const plan = planResponse.data;
      setFormData({
        internalName: plan.internalName || "",
        name: plan.name || "",
        slug: plan.slug || "",
        status: plan.isActive ? "Published" : "Draft",
        description: plan.description || "",
        badge: plan.badgeText || "",
        accentColor: plan.accentColor || "#D4AF37",
        publicVisibility: plan.isActive,
        basePrice: plan.price || "",
        billingCycle: plan.billingCycle || "",
        taxCategory: plan.taxCategory || "",
        features: plan.features || [1, 2, 3, 4] 
      });
    }
  }, [planResponse]);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.internalName || !formData.name || !formData.basePrice) {
      toast.warning("Please fill in required fields (Internal Name, Display Name, Base Price)");
      return;
    }

    const finalSlug = formData.slug.trim() || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    if (!finalSlug) {
      toast.warning("Unable to generate slug. Please provide a valid Display Name or Slug.");
      return;
    }

    const existingPlans = plansResponse?.data || [];
    const isDuplicateName = existingPlans.some(
      plan => 
        plan._id !== id && (
          (plan.name && formData.name && plan.name.toLowerCase() === formData.name.toLowerCase()) || 
          (plan.internalName && formData.internalName && plan.internalName.toLowerCase() === formData.internalName.toLowerCase())
        )
    );

    if (isDuplicateName) {
      toast.error("A package with this internal name or display name already exists.");
      return;
    }

    const payload = {
      internalName: formData.internalName,
      name: formData.name,
      slug: finalSlug,
      price: Number(formData.basePrice),
      isActive: formData.status === "Published" ? true : false,
      features: formData.features
    };

    if (formData.description !== undefined) payload.description = formData.description;
    if (formData.badge !== undefined) payload.badgeText = formData.badge;
    if (formData.accentColor !== undefined) payload.accentColor = formData.accentColor;
    if (formData.billingCycle !== undefined) payload.billingCycle = formData.billingCycle;
    if (formData.taxCategory !== undefined) payload.taxCategory = formData.taxCategory;

    try {
      await updatePlan({ id, planData: payload }).unwrap();
      toast.success("Package updated successfully!");
      navigate('/subscriptions');
    } catch (error) {
      console.error("Failed to update package", error);
      toast.error(error?.data?.message || "Failed to update package. Please try again.");
    }
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
      <EditPackageHeader activeTab={activeTab} setActiveTab={setActiveTab} handleSave={handleSave} />

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
