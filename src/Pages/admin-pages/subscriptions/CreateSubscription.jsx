import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreatePlanMutation, useGetPlansQuery } from "../../../redux/features/subscriptions/subscriptionsApi";
import { Monitor, Smartphone, Check } from "lucide-react";
import { toast } from 'react-toastify';

export default function CreateSubscription() {
  const { data: plansResponse } = useGetPlansQuery();
  const [createPlan] = useCreatePlanMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    internalName: "",
    displayName: "",
    slug: "",
    description: "",
    badgeText: "",
    accentColor: "#D4AF37",
    basePrice: "",
    billingCycle: "",
    taxCategory: "",
    allowCoupons: true,
    autoRenewal: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePublish = async () => {
    if (!formData.internalName || !formData.displayName || !formData.basePrice) {
      toast.warning("Please fill in required fields (Internal Name, Display Name, Base Price)");
      return;
    }

    // Auto-generate slug if not provided
    const finalSlug = formData.slug.trim() || formData.displayName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    if (!finalSlug) {
      toast.warning("Unable to generate slug. Please provide a valid Display Name or Slug.");
      return;
    }

    const existingPlans = plansResponse?.data || [];
    const isDuplicateName = existingPlans.some(
      plan => 
        (plan.name && formData.displayName && plan.name.toLowerCase() === formData.displayName.toLowerCase()) || 
        (plan.internalName && formData.internalName && plan.internalName.toLowerCase() === formData.internalName.toLowerCase())
    );

    if (isDuplicateName) {
      toast.error("A package with this internal name or display name already exists.");
      return;
    }

    const payload = {
      internalName: formData.internalName,
      name: formData.displayName,
      slug: finalSlug,
      price: Number(formData.basePrice),
      allowCoupons: formData.allowCoupons,
      autoRenewal: formData.autoRenewal,
      features: [1, 2, 3, 4], // Features enabled by default
      isActive: true
    };

    if (formData.description) payload.description = formData.description;
    if (formData.badgeText) payload.badgeText = formData.badgeText;
    if (formData.accentColor) payload.accentColor = formData.accentColor;
    if (formData.billingCycle) payload.billingCycle = formData.billingCycle;
    if (formData.taxCategory) payload.taxCategory = formData.taxCategory;

    try {
      await createPlan(payload).unwrap();
      toast.success("Package created successfully!");
      navigate('/subscriptions');
    } catch (error) {
      console.error("Failed to create package", error);
      toast.error(error?.data?.message || "Failed to create package. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#0F172A] font-sans pt-24 pb-32">
      
      {/* Header */}
      <div className="px-8 lg:px-12 max-w-[1400px] mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 pb-6">
          <div>
            <div className="flex items-center text-[12px] font-medium text-gray-500 mb-2 gap-2">
              <Link to="/subscriptions" className="hover:text-gray-900 transition-colors">Subscription Packages</Link>
              <span>›</span>
              <span className="text-gray-900">Create Package</span>
            </div>
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">
              Create New Package
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 text-[13px] font-bold text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors shadow-sm">
              Save as Draft
            </button>
            <button 
              onClick={handlePublish}
              className="px-5 py-2.5 bg-[#D4AF37] border border-[#D4AF37] rounded-md text-[13px] font-bold text-[#0F172A] hover:bg-[#C2982B] transition-colors shadow-sm"
            >
              Publish Package
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-8 lg:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Form */}
          <div className="flex-1 space-y-10 max-w-3xl">
            
            {/* Package Details Section */}
            <section>
              <h2 className="text-[16px] font-bold text-[#0F172A] mb-6">Package Details</h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-[13px] font-bold text-[#0F172A] mb-2">
                    Internal Package Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="internalName"
                    placeholder="e.g. Enterprise Verified Plus"
                    value={formData.internalName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded text-[14px] text-[#0F172A] focus:outline-none focus:border-gray-400 placeholder:text-gray-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[13px] font-bold text-[#0F172A] mb-2">
                      Display Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="displayName"
                      placeholder="e.g. Premium Supplier"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded text-[14px] text-[#0F172A] focus:outline-none focus:border-gray-400 placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#0F172A] mb-2">URL Slug</label>
                    <input 
                      type="text" 
                      name="slug"
                      placeholder="premium-supplier"
                      value={formData.slug}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded text-[14px] text-[#0F172A] focus:outline-none focus:border-gray-400 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Marketing Description</label>
                  <textarea 
                    rows={4}
                    name="description"
                    placeholder="Brief description displayed on the pricing card..."
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded text-[14px] text-[#0F172A] focus:outline-none focus:border-gray-400 resize-none placeholder:text-gray-400"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Badge Text (Optional)</label>
                    <input 
                      type="text" 
                      name="badgeText"
                      placeholder="e.g. Most Popular"
                      value={formData.badgeText}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded text-[14px] text-[#0F172A] focus:outline-none focus:border-gray-400 placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Accent Color (Hex)</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color"
                        name="accentColor"
                        value={formData.accentColor || '#D4AF37'}
                        onChange={handleInputChange}
                        className="w-10 h-10 rounded border border-gray-300 flex-shrink-0 cursor-pointer p-0.5"
                      />
                      <input 
                        type="text" 
                        name="accentColor"
                        value={formData.accentColor}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded text-[14px] text-[#0F172A] focus:outline-none focus:border-gray-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Base Pricing & Billing Section */}
            <section>
              <h2 className="text-[16px] font-bold text-[#0F172A] mb-6">Base Pricing & Billing</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Base Monthly Price ($)</label>
                    <input 
                      type="text" 
                      name="basePrice"
                      placeholder="0.00"
                      value={formData.basePrice}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded text-[14px] text-[#0F172A] focus:outline-none focus:border-gray-400 placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Billing Cycle</label>
                    <div className="relative">
                      <select 
                        name="billingCycle"
                        value={formData.billingCycle}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded text-[14px] text-[#0F172A] appearance-none focus:outline-none focus:border-gray-400"
                      >
                        <option value="">Select Billing Cycle...</option>
                        <option value="Annual (Paid Upfront)">Annual (Paid Upfront)</option>
                        <option value="Monthly">Monthly</option>
                      </select>
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Tax Category</label>
                    <div className="relative">
                      <select 
                        name="taxCategory"
                        value={formData.taxCategory}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded text-[14px] text-[#0F172A] appearance-none focus:outline-none focus:border-gray-400"
                      >
                        <option value="">Select Tax Category...</option>
                        <option value="Standard Digital Service">Standard Digital Service</option>
                        <option value="Exempt">Exempt</option>
                      </select>
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded bg-gray-50/50 cursor-pointer hover:bg-gray-50 transition-colors">
                    <div>
                      <h4 className="text-[13px] font-bold text-[#0F172A]">Allow Coupon Application</h4>
                      <p className="text-[12px] text-gray-500 mt-0.5">Can standard promotional codes be applied?</p>
                    </div>
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        name="allowCoupons"
                        checked={formData.allowCoupons}
                        onChange={handleInputChange}
                        className="peer sr-only" 
                      />
                      <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded flex items-center justify-center peer-checked:border-[#D4AF37] peer-checked:bg-[#D4AF37] transition-colors">
                        <Check size={14} className="text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded bg-gray-50/50 cursor-pointer hover:bg-gray-50 transition-colors">
                    <div>
                      <h4 className="text-[13px] font-bold text-[#0F172A]">Enable Auto-Renewal by Default</h4>
                      <p className="text-[12px] text-gray-500 mt-0.5">Users can opt-out later in settings.</p>
                    </div>
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        name="autoRenewal"
                        checked={formData.autoRenewal}
                        onChange={handleInputChange}
                        className="peer sr-only" 
                      />
                      <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded flex items-center justify-center peer-checked:border-[#D4AF37] peer-checked:bg-[#D4AF37] transition-colors">
                        <Check size={14} className="text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </section>

          </div>

          {/* Right Column: Live Preview */}
          <div className="w-full lg:w-[400px]">
            <div className="sticky top-24">
              
              {/* Preview Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#E8E7E9] rounded-t-lg border-b border-gray-300/50">
                <span className="text-[12px] font-medium text-gray-600">Live Preview</span>
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-white rounded shadow-sm text-gray-700">
                    <Monitor size={14} />
                  </div>
                  <div className="p-1 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
                    <Smartphone size={14} />
                  </div>
                </div>
              </div>

              {/* Preview Card */}
              <div className="bg-white rounded-b-lg border border-t-0 border-gray-200 p-8 shadow-sm relative overflow-hidden">
                
                {/* Top Border Accent */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: formData.accentColor }}
                ></div>

                {/* Badge & Title */}
                <div className="flex justify-between items-start mb-4 mt-2">
                  <h3 className="text-[22px] font-bold text-[#0F172A] leading-tight max-w-[150px]">
                    {formData.displayName || "Premium Supplier"}
                  </h3>
                  {formData.badgeText && (
                    <span className="bg-[#EBE2FF] text-[#7E22CE] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded">
                      {formData.badgeText}
                    </span>
                  )}
                </div>

                <p className="text-[13px] text-gray-600 mb-8 leading-relaxed h-16">
                  {formData.description || "Gain maximum visibility in the global supplier directory with advanced analytics."}
                </p>

                {/* Pricing */}
                <div className="mb-8">
                  <div className="flex items-end gap-1 mb-1.5">
                    <span className="text-[16px] font-medium text-gray-900 mb-1">$</span>
                    <span className="text-[40px] font-bold text-[#0F172A] leading-none">{formData.basePrice || "0"}</span>
                    <span className="text-[13px] font-medium text-gray-500 mb-1">/mo</span>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Billed annually (${(Number(formData.basePrice) * 12).toLocaleString()}/yr)
                  </p>
                </div>

                <div className="w-full h-px bg-gray-200 mb-6"></div>

                {/* Features List */}
                <div className="space-y-3.5 mb-8">
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 rounded-full border border-green-500 p-0.5 text-green-500">
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span className="text-[13px] text-[#0F172A]">Top tier directory placement</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 rounded-full border border-green-500 p-0.5 text-green-500">
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span className="text-[13px] text-[#0F172A]">Unlimited RFQ access</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 rounded-full border border-green-500 p-0.5 text-green-500">
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span className="text-[13px] text-[#0F172A]">Verified Supplier Badge</span>
                  </div>
                </div>

                <button 
                  className="w-full py-3 rounded-md text-[14px] font-bold text-[#0F172A] transition-colors shadow-sm"
                  style={{ backgroundColor: formData.accentColor }}
                >
                  Select Plan
                </button>

              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
