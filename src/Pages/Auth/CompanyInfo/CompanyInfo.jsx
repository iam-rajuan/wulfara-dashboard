import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetOnboardingStatusQuery, useSaveOnboardingCompanyInfoMutation } from '../../../redux/features/listings/listingsApi';
import { appendOnboardingContext, buildOnboardingQueryString } from '../../../utils/onboarding';

const defaultFormState = {
  companyName: '',
  address: '',
  supplierType: 'Manufacturer',
  coreProducts: '',
  contactPhone: '',
  contactEmail: '',
  website: '',
  description: '',
};

const normalizeWebsiteUrl = (value = '') => {
  if (typeof value !== 'string') {
    return '';
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
};

const CompanyInfo = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useSelector((state) => state.auth);
  const supplierId = user?.role === 'admin' ? searchParams.get('supplierId') : undefined;
  const { data: onboardingResponse, isLoading } = useGetOnboardingStatusQuery(supplierId, { skip: !user });
  const [saveCompanyInfo, { isLoading: isSaving }] = useSaveOnboardingCompanyInfoMutation();
  const [formData, setFormData] = useState(defaultFormState);

  useEffect(() => {
    if (!user) {
      navigate(`/sign-in${buildOnboardingQueryString(searchParams)}`);
    }
  }, [navigate, searchParams, user]);

  useEffect(() => {
    const supplier = onboardingResponse?.data?.supplier;
    if (!supplier) {
      return;
    }

    setFormData({
      companyName: supplier.companyName || '',
      address: supplier.location?.formattedAddress || '',
      supplierType: supplier.supplierType || 'Manufacturer',
      coreProducts: (supplier.coreProducts || []).join(', '),
      contactPhone: supplier.contactPhone || '',
      contactEmail: supplier.contactEmail || '',
      website: supplier.website || '',
      description:
        supplier.description === 'Profile pending details. Please update your company description in settings.' ||
        supplier.description === 'Profile created by admin.'
          ? ''
          : supplier.description || '',
    });
  }, [onboardingResponse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveCompanyInfo({
        supplierId,
        ...formData,
        website: normalizeWebsiteUrl(formData.website),
      }).unwrap();

      navigate(appendOnboardingContext('/subscription', searchParams));
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to save company information');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans flex flex-col">
      <div className="w-full max-w-[960px] mx-auto pt-10 px-6 lg:px-8 pb-28">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Company Contact Information</h1>
        <p className="text-[15px] text-gray-500 mb-10">Add your company details so customers can contact you and send RFQs.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-[#FAFAFA] p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-[20px] font-bold text-gray-900 mb-6">Company Details</h2>

            {isLoading ? (
              <div className="py-10 text-gray-500">Loading company profile...</div>
            ) : (
              <div className="space-y-5">
                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] focus:outline-none focus:border-[#D1A635] focus:ring-1 focus:ring-[#D1A635] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-900 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] focus:outline-none focus:border-[#D1A635] focus:ring-1 focus:ring-[#D1A635] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-900 mb-2">Supplier Type</label>
                    <select
                      name="supplierType"
                      value={formData.supplierType}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] text-gray-800 focus:outline-none focus:border-[#D1A635] focus:ring-1 focus:ring-[#D1A635] transition-colors"
                    >
                      <option value="Manufacturer">Manufacturer</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Wholesaler">Wholesaler</option>
                      <option value="Broker">Broker</option>
                      <option value="Service Provider">Service Provider</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] focus:outline-none focus:border-[#D1A635] focus:ring-1 focus:ring-[#D1A635] transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Core Products / Services</label>
                  <input
                    type="text"
                    name="coreProducts"
                    value={formData.coreProducts}
                    onChange={handleChange}
                    placeholder="Steel fabrication, industrial steel, warehousing"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] focus:outline-none focus:border-[#D1A635] focus:ring-1 focus:ring-[#D1A635] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-900 mb-2">Phone Number</label>
                    <input
                      type="text"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] focus:outline-none focus:border-[#D1A635] focus:ring-1 focus:ring-[#D1A635] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-900 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] focus:outline-none focus:border-[#D1A635] focus:ring-1 focus:ring-[#D1A635] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Website</label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    onBlur={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        website: normalizeWebsiteUrl(e.target.value),
                      }))
                    }
                    inputMode="url"
                    placeholder="www.example.com"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] focus:outline-none focus:border-[#D1A635] focus:ring-1 focus:ring-[#D1A635] transition-colors"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 bg-[#F9FAFB] py-4 w-full sticky bottom-0 z-20 flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate(appendOnboardingContext('/choose-industry', searchParams))}
              className="flex items-center gap-2 px-6 py-2.5 rounded border border-gray-300 bg-white text-gray-800 font-bold text-[13px] hover:bg-gray-50 transition-colors shadow-sm"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 rounded bg-[#D1A635] hover:bg-[#C2982B] text-black font-bold text-[13px] transition-colors shadow-sm disabled:opacity-60"
            >
              {isSaving ? 'Saving...' : 'Save & Continue'}
              <span className="font-bold text-lg leading-none ml-1">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyInfo;
