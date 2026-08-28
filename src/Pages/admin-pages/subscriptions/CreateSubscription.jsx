import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreatePlanMutation, useGetAdminPlansQuery } from "../../../redux/features/subscriptions/subscriptionsApi";
import EditPackageHeader from "../../../Components/admin-components/subscriptions/EditPackageHeader";
import PackageInfoForm from "../../../Components/admin-components/subscriptions/PackageInfoForm";
import PricingPeriodsForm from "../../../Components/admin-components/subscriptions/PricingPeriodsForm";
import FeatureAccessForm from "../../../Components/admin-components/subscriptions/FeatureAccessForm";

const DEFAULT_LISTING_PERIODS = [
  { durationMonths: 12, isActive: true, discountPercent: 0, customLabel: "" },
  { durationMonths: 24, isActive: true, discountPercent: 15, customLabel: "" },
  { durationMonths: 48, isActive: true, discountPercent: 25, customLabel: "" },
];

const DEFAULT_FEATURES = [
  "Verified supplier badge",
  "Priority placement in search",
  "Unlimited RFQ access",
  "Priority support",
];

const createInitialFormState = () => ({
  internalName: "",
  name: "",
  slug: "",
  status: "Published",
  description: "",
  badgeText: "",
  accentColor: "#D4AF37",
  iconKey: "award",
  basePrice: "",
  billingCycle: "Annual (Paid Upfront)",
  taxCategory: "Standard Digital Service",
  features: DEFAULT_FEATURES,
  listingPeriods: DEFAULT_LISTING_PERIODS.map((period) => ({ ...period })),
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

export default function CreateSubscription() {
  const navigate = useNavigate();
  const { data: plansResponse } = useGetAdminPlansQuery();
  const [createPlan] = useCreatePlanMutation();
  const [formData, setFormData] = useState(createInitialFormState);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (name, value) => {
    setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDiscard = () => {
    setFormData(createInitialFormState());
    setValidationErrors({});
    toast.info("New package form was reset.");
  };

  const handlePublish = async () => {
    if (!formData.internalName || !formData.name || !formData.basePrice) {
      toast.warning("Please fill in required fields (Internal Name, Display Name, Base Price)");
      return;
    }

    const finalSlug =
      formData.slug.trim() ||
      formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    if (!finalSlug) {
      toast.warning("Unable to generate slug. Please provide a valid Display Name or Slug.");
      return;
    }

    const existingPlans = plansResponse?.data || [];
    const isDuplicateName = existingPlans.some(
      (plan) =>
        (plan.name && formData.name && plan.name.toLowerCase() === formData.name.toLowerCase()) ||
        (plan.internalName &&
          formData.internalName &&
          plan.internalName.toLowerCase() === formData.internalName.toLowerCase())
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
      description: formData.description,
      badgeText: formData.badgeText || "",
      accentColor: formData.accentColor || "#D4AF37",
      iconKey: formData.iconKey || "award",
      price: Number(formData.basePrice),
      billingCycle: formData.billingCycle,
      taxCategory: formData.taxCategory,
      features: (formData.features || []).map((feature) => String(feature).trim()).filter(Boolean),
      isActive: formData.status === "Published",
      listingPeriods: formData.listingPeriods.map((period) => ({
        durationMonths: Number.parseInt(String(period.durationMonths).trim(), 10),
        isActive: period.isActive !== false,
        discountPercent: Number(period.discountPercent || 0),
        customLabel: (period.customLabel || "").trim(),
      })),
    };

    try {
      await createPlan(payload).unwrap();
      toast.success("Package created successfully.");
      navigate("/subscriptions");
    } catch (error) {
      console.error("Failed to create package", error);
      toast.error(error?.data?.message || "Failed to create package. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#0F172A] font-sans pb-32">
      <EditPackageHeader
        title="Create Package"
        saveLabel="Publish Package"
        discardLabel="Reset Form"
        handleSave={handlePublish}
        handleDiscard={handleDiscard}
      />

      <div className="px-6 pt-8 lg:px-8 lg:pt-10 max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-6">
          <PackageInfoForm data={formData} onChange={handleChange} />
          <FeatureAccessForm data={formData} onChange={handleChange} />
          <PricingPeriodsForm data={formData} onChange={handleChange} errors={validationErrors} />
        </div>
      </div>
    </div>
  );
}
