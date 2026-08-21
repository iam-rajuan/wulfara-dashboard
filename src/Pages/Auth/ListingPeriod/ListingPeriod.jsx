import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Check, Info, CheckCircle2 } from 'lucide-react';
import { useCreateCheckoutSessionMutation } from '../../../redux/features/subscriptions/subscriptionsApi';
import { useGetOnboardingStatusQuery } from '../../../redux/features/listings/listingsApi';
import { toast } from 'react-toastify';
import { appendOnboardingContext, buildOnboardingQueryString } from '../../../utils/onboarding';

const periods = [
  { id: '16 Months', badge: 'STARTER COMMITMENT', badgeColor: 'bg-[#E8F0FE] text-blue-700', desc: 'Standard listing duration for new suppliers.' },
  { id: '25 Months', badge: 'BETTER SAVINGS', badgeColor: 'bg-[#E8F0FE] text-blue-700', desc: 'Extended visibility with moderate savings.' },
  { id: '30 Months', badge: 'GROWTH OPTION', badgeColor: 'bg-[#E8F0FE] text-blue-700', desc: 'Ideal for establishing long-term market presence.' },
  { id: '49 Months', badge: 'BEST VALUE', badgeColor: 'bg-blue-700 text-white', desc: 'Maximum return on investment and sustained priority ranking.' },
];

const ListingPeriod = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useSelector((state) => state.auth);
  const supplierId = user?.role === 'admin' ? searchParams.get('supplierId') : undefined;
  const { data: onboardingResponse, isLoading: isLoadingOnboarding } = useGetOnboardingStatusQuery(supplierId, { skip: !user });
  const [createCheckoutSession, { isLoading }] = useCreateCheckoutSessionMutation();
  const [selectedPeriod, setSelectedPeriod] = useState('16 Months');
  const supplier = onboardingResponse?.data?.supplier;
  const selectedPlan = supplier?.selectedPlan;

  useEffect(() => {
    if (!user) {
      navigate(`/sign-in${buildOnboardingQueryString(searchParams)}`);
    }
  }, [navigate, searchParams, user]);

  useEffect(() => {
    if (supplier?.selectedListingPeriod) {
      setSelectedPeriod(supplier.selectedListingPeriod);
    }
  }, [supplier]);

  const handleCheckout = async () => {
    if (!selectedPlan?._id) {
      toast.error('Please select a subscription plan before starting checkout');
      navigate(appendOnboardingContext('/subscription', searchParams));
      return;
    }

    try {
      const res = await createCheckoutSession({
        supplierId,
        planId: selectedPlan._id,
        billingCycle: supplier?.selectedBillingCycle || 'Annual (Paid Upfront)',
        listingPeriod: selectedPeriod,
      }).unwrap();

      if (res.paymentUrl) {
        window.location.href = res.paymentUrl;
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to initialize checkout');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans flex flex-col">
      <div className="w-full text-center pt-12 pb-6 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">Choose Your Listing Period</h1>
        <p className="text-[15px] text-gray-500 max-w-md mx-auto leading-relaxed">
          Select how long you want your supplier company to stay listed on WULFARA.
        </p>
      </div>

      <div className="flex-1 w-full max-w-[1000px] mx-auto px-6 lg:px-8 pb-24 flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full lg:w-[65%] space-y-6">
          {isLoadingOnboarding ? (
            <div className="py-12 text-center text-gray-500">Loading your onboarding progress...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {periods.map((period) => {
                const isSelected = selectedPeriod === period.id;

                return (
                  <button
                    type="button"
                    key={period.id}
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`bg-white rounded-xl p-6 text-left transition-all duration-200 border-2 relative ${
                      isSelected
                        ? 'border-[#D1A635] shadow-[0_4px_12px_rgba(209,166,53,0.1)]'
                        : 'border-gray-100 hover:border-gray-300 shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#D1A635]' : 'border-gray-300'}`}>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#D1A635]"></div>}
                      </div>
                      <span className={`text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider ${period.badgeColor}`}>
                        {period.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{period.id}</h3>
                    <p className="text-[13px] text-gray-500 leading-relaxed min-h-[40px]">{period.desc}</p>
                  </button>
                );
              })}
            </div>
          )}

          <div className="bg-[#FFFBF0] p-6 rounded-xl border border-[#FBEAC4] flex gap-4 mt-6">
            <Info className="w-5 h-5 text-[#D1A635] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[13px] font-bold text-gray-900 mb-1">5-Day Cancellation Policy</h4>
              <p className="text-[12px] text-gray-600 leading-relaxed">
                You may cancel your listing commitment within 5 business days of activation for a full refund. Terms and conditions apply.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[35%] sticky top-8">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Selection</h2>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D1A635]" />
                <span className="text-[13.5px] font-medium text-gray-900">{selectedPlan?.name || 'Select a plan'}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D1A635]" />
                <span className="text-[13.5px] font-medium text-gray-900">{selectedPeriod}</span>
              </div>
            </div>

            <div className="h-px bg-gray-100 w-full mb-6"></div>

            <div className="space-y-4 mb-8">
              {(selectedPlan?.features || []).slice(0, 4).map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#D1A635] shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-[13px] text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleCheckout}
                disabled={isLoading || !selectedPlan}
                className="w-full bg-[#D1A635] hover:bg-[#C2982B] text-black font-bold text-[14px] py-3.5 px-4 rounded-md transition-colors shadow-sm disabled:opacity-70"
              >
                {isLoading ? 'Processing...' : 'Continue'}
              </button>
              <button
                type="button"
                onClick={() => navigate(appendOnboardingContext('/cart', searchParams))}
                className="w-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-medium text-[14px] py-3.5 px-4 rounded-md transition-colors shadow-sm"
              >
                Back to Summary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPeriod;
