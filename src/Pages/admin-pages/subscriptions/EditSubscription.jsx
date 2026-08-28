import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useGetAdminPlanQuery, useGetAdminPlansQuery, useUpdatePlanMutation } from "../../../redux/features/subscriptions/subscriptionsApi";
import { toast } from 'react-toastify';
import EditPackageHeader from "../../../Components/admin-components/subscriptions/EditPackageHeader";
import PackageInfoForm from "../../../Components/admin-components/subscriptions/PackageInfoForm";
import PricingPeriodsForm from "../../../Components/admin-components/subscriptions/PricingPeriodsForm";
import FeatureAccessForm from "../../../Components/admin-components/subscriptions/FeatureAccessForm";

const DEFAULT_LISTING_PERIODS = [
  { durationMonths: 12, isActive: true, discountPercent: 0, customLabel: "" },
  { durationMonths: 24, isActive: true, discountPercent: 15, customLabel: "" },
  { durationMonths: 48, isActive: true, discountPercent: 25, customLabel: "" },
];

const normalizeListingPeriods = (listingPeriods) => {
  if (!Array.isArray(listingPeriods) || listingPeriods.length === 0) {
    return DEFAULT_LISTING_PERIODS.map((period) => ({ ...period }));
  }

  return listingPeriods.map((period) => ({
    durationMonths: period?.durationMonths ?? "",
    isActive: period?.isActive !== false,
    discountPercent: period?.discountPercent ?? 0,
    customLabel: period?.customLabel || "",
  }));
};

const buildFormStateFromPlan = (plan) => ({
  internalName: plan.internalName || "",
  name: plan.name || "",
  slug: plan.slug || "",
  status: plan.isActive ? "Published" : "Draft",
  description: plan.description || "",
  badgeText: plan.badgeText || "",
  accentColor: plan.accentColor || "#D4AF37",
  iconKey: plan.iconKey || "award",
  basePrice: plan.price || "",
  billingCycle: plan.billingCycle || "",
  taxCategory: plan.taxCategory || "",
  features: Array.isArray(plan.features) ? plan.features.map((feature) => String(feature ?? "")) : [],
  listingPeriods: normalizeListingPeriods(plan.listingPeriods),
});

const validateListingPeriods = (listingPeriods) => {
  if (!Array.isArray(listingPeriods) || listingPeriods.length === 0) {
    return "At least one listing period is required.";
  }

  const seenDurations = new Set();

  for (const period of listingPeriods) {
    const rawDuration = String(period?.durationMonths ?? "").trim();

    if (!/^\d+$/.test(rawDuration)) {
      return "Duration must be an integer.";
    }

    const durationMonths = Number.parseInt(rawDuration, 10);
    if (!Number.isInteger(durationMonths) || durationMonths <= 0) {
      return "Duration must be greater than 0.";
    }

    if (seenDurations.has(durationMonths)) {
      return `A ${durationMonths}-month listing period already exists.`;
    }

    seenDurations.add(durationMonths);
  }

  return "";
};

export default function EditSubscription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const seedPlan = location.state?.plan;
  const {
    data: planResponse,
    isLoading: isPlanLoading,
    error: planError,
  } = useGetAdminPlanQuery(id, { skip: !id });
  const { data: plansResponse } = useGetAdminPlansQuery();
  const [updatePlan] = useUpdatePlanMutation();
  const fallbackPlan = plansResponse?.data?.find((plan) => plan?._id === id);
  
  const [formData, setFormData] = useState(buildFormStateFromPlan(seedPlan || {}));
  const [savedFormData, setSavedFormData] = useState(buildFormStateFromPlan(seedPlan || {}));
  const [validationErrors, setValidationErrors] = useState({});

  const isFormBlank = (value) =>
    !value.internalName &&
    !value.name &&
    !value.slug &&
    !value.description &&
    !value.basePrice;

  useEffect(() => {
    if (seedPlan?._id && seedPlan._id === id) {
      const nextFormState = buildFormStateFromPlan(seedPlan);
      setFormData((prev) => {
        return isFormBlank(prev) ? nextFormState : prev;
      });
      setSavedFormData((prev) => {
        return isFormBlank(prev) ? nextFormState : prev;
      });
    }
  }, [seedPlan, id]);

  useEffect(() => {
    if (fallbackPlan?._id === id) {
      const nextFormState = buildFormStateFromPlan(fallbackPlan);
      setFormData((prev) => {
        return isFormBlank(prev) ? nextFormState : prev;
      });
      setSavedFormData((prev) => {
        return isFormBlank(prev) ? nextFormState : prev;
      });
    }
  }, [fallbackPlan, id]);

  useEffect(() => {
    if (planResponse?.data) {
      const plan = planResponse.data;
      const nextFormState = buildFormStateFromPlan(plan);
      setFormData(nextFormState);
      setSavedFormData(nextFormState);
      setValidationErrors({});
    }
  }, [planResponse]);

  const handleChange = (name, value) => {
    setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDiscard = () => {
    setFormData(savedFormData);
    setValidationErrors({});
    toast.info("Unsaved changes were discarded.");
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

    const listingPeriodsError = validateListingPeriods(formData.listingPeriods);
    if (listingPeriodsError) {
      setValidationErrors({ listingPeriods: listingPeriodsError });
      toast.error(listingPeriodsError);
      return;
    }

    const payload = {
      internalName: formData.internalName,
      name: formData.name,
      slug: finalSlug,
      iconKey: formData.iconKey || "award",
      badgeText: formData.badgeText || "",
      accentColor: formData.accentColor || "#D4AF37",
      price: Number(formData.basePrice),
      isActive: formData.status === "Published" ? true : false,
      features: (formData.features || []).map((feature) => String(feature).trim()).filter(Boolean),
      listingPeriods: formData.listingPeriods.map((period) => ({
        durationMonths: Number.parseInt(String(period.durationMonths).trim(), 10),
        isActive: period.isActive !== false,
        discountPercent: Number(period.discountPercent || 0),
        customLabel: (period.customLabel || "").trim(),
      })),
    };

    if (formData.description !== undefined) payload.description = formData.description;
    if (formData.billingCycle !== undefined) payload.billingCycle = formData.billingCycle;
    if (formData.taxCategory !== undefined) payload.taxCategory = formData.taxCategory;

    try {
      const response = await updatePlan({ id, planData: payload }).unwrap();
      const nextFormState = buildFormStateFromPlan(response?.data || payload);
      setFormData(nextFormState);
      setSavedFormData(nextFormState);
      setValidationErrors({});
      toast.success("Pricing plan updated successfully.");
      navigate('/subscriptions');
    } catch (error) {
      console.error("Failed to update package", error);
      toast.error(error?.data?.message || "Failed to update package. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#0F172A] font-sans pb-32">
      
      {/* Sticky Header */}
      <EditPackageHeader handleSave={handleSave} handleDiscard={handleDiscard} />

      {/* Main Content Area */}
      <div className="px-6 pt-8 lg:px-8 lg:pt-10 max-w-[1200px] mx-auto">
        {planError && !seedPlan ? (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-medium text-red-700">
            Failed to load this package from the backend. Please refresh the page or verify your admin subscription permissions.
          </div>
        ) : null}
        {isPlanLoading && !seedPlan ? (
          <div className="mb-6 rounded-xl border border-gray-200 bg-white px-4 py-3 text-[13px] font-medium text-gray-500">
            Loading package details...
          </div>
        ) : null}
        <div className="flex flex-col gap-6">
          <PackageInfoForm data={formData} onChange={handleChange} />
          <FeatureAccessForm data={formData} onChange={handleChange} />
          <PricingPeriodsForm data={formData} onChange={handleChange} errors={validationErrors} />
        </div>
      </div>
    </div>
  );
}
