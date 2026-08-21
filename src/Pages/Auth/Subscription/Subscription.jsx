import React, { useEffect, useMemo, useState } from 'react';
import { Check, HeadphonesIcon, Lock, XCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetPlansQuery } from '../../../redux/features/subscriptions/subscriptionsApi';
import {
  useGetOnboardingStatusQuery,
  useSaveOnboardingSubscriptionMutation,
} from '../../../redux/features/listings/listingsApi';
import { appendOnboardingContext, buildOnboardingQueryString } from '../../../utils/onboarding';

const Subscription = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useSelector((state) => state.auth);
  const supplierId = user?.role === 'admin' ? searchParams.get('supplierId') : undefined;
  const { data: plansResponse, isLoading: isLoadingPlans } = useGetPlansQuery();
  const { data: onboardingResponse } = useGetOnboardingStatusQuery(supplierId, { skip: !user });
  const [saveSubscription, { isLoading: isSaving }] = useSaveOnboardingSubscriptionMutation();

  const supplier = onboardingResponse?.data?.supplier;
  const selectedPlanId = supplier?.selectedPlan?._id || supplier?.selectedPlan || '';
  const plans = useMemo(() => plansResponse?.data || [], [plansResponse?.data]);
  const [billingCycle, setBillingCycle] = useState('Monthly');
  const [currentPlanId, setCurrentPlanId] = useState('');

  useEffect(() => {
    if (!user) {
      navigate(`/sign-in${buildOnboardingQueryString(searchParams)}`);
    }
  }, [navigate, searchParams, user]);

  useEffect(() => {
    if (supplier?.selectedBillingCycle) {
      setBillingCycle(supplier.selectedBillingCycle);
    }
    if (selectedPlanId) {
      setCurrentPlanId(selectedPlanId);
    } else if (plans.length > 0) {
      setCurrentPlanId(plans[0]._id);
    }
  }, [plans, selectedPlanId, supplier]);

  const currentPlan = useMemo(
    () => plans.find((plan) => plan._id === currentPlanId) || null,
    [currentPlanId, plans]
  );

  const handleContinue = async () => {
    if (!currentPlanId) {
      toast.error('Please select a subscription plan to continue');
      return;
    }

    try {
      await saveSubscription({
        supplierId,
        planId: currentPlanId,
        billingCycle,
      }).unwrap();

      navigate(appendOnboardingContext('/cart', searchParams));
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to save subscription selection');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[300px] bg-gradient-to-b from-[#D1A635]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="w-full text-center pt-14 pb-8 px-4 relative z-10">
        <h1 className="text-3xl md:text-5xl font-black text-slate-800 mb-3 tracking-tight">Plans and Pricing</h1>
        <p className="text-[15px] text-slate-500 font-medium">Pick the plan that checks your boxes.</p>
      </div>

      <div className="flex justify-center mb-14 relative z-10">
        <div className="flex items-center bg-[#EBF0FA] p-1 rounded-2xl border border-[#D1E0F5] shadow-inner">
          <button
            type="button"
            onClick={() => setBillingCycle('Monthly')}
            className={`px-8 py-2.5 rounded-xl text-[13px] font-bold transition-all ${billingCycle === 'Monthly' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle('Annual (Paid Upfront)')}
            className={`px-8 py-2.5 rounded-xl text-[13px] font-bold transition-all ${billingCycle === 'Annual (Paid Upfront)' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Annual
          </button>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 w-full mb-20 relative z-10">
        {isLoadingPlans ? (
          <div className="py-16 text-center text-slate-500 flex items-center justify-center gap-2.5 font-medium">
            <span className="w-5 h-5 border-2 border-slate-200 border-t-[#D1A635] rounded-full animate-spin" />
            Loading plans...
          </div>
        ) : plans.length === 0 ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 text-amber-800 max-w-md mx-auto text-center font-medium shadow-sm">
            No active pricing plans are available. Create a pricing package in the admin dashboard first.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {plans.map((plan) => {
              const isSelected = currentPlanId === plan._id;
              return (
                <button
                  key={plan._id}
                  type="button"
                  onClick={() => setCurrentPlanId(plan._id)}
                  className={`w-full max-w-[360px] mx-auto bg-white rounded-3xl p-8 flex flex-col text-left transition-all duration-300 relative group cursor-pointer ${
                    isSelected
                      ? 'border-2 border-[#D1A635] shadow-[0_20px_50px_rgba(209,166,53,0.12)] scale-[1.03] z-10'
                      : 'border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)] hover:border-[#D1A635]/40 hover:scale-[1.01] z-0'
                  }`}
                >
                  {/* Badge */}
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider font-extrabold px-4 py-1.5 rounded-full shadow-sm transition-all duration-300 ${
                    isSelected 
                      ? 'bg-gradient-to-r from-[#D1A635] to-[#B08620] text-white' 
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}>
                    {plan.badgeText || (isSelected ? 'SELECTED' : 'AVAILABLE')}
                  </div>

                  <h2 className="text-2xl font-black text-slate-800 mb-2 mt-2 tracking-tight">{plan.name}</h2>
                  <p className="text-[13px] text-slate-500 mb-6 min-h-[45px] leading-relaxed">{plan.description || 'Supplier listing plan'}</p>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-8 border-b border-slate-100 pb-6 w-full">
                    <span className="text-4xl font-black text-slate-900 tracking-tight">${plan.price}</span>
                    <span className="text-sm text-slate-400 font-semibold">{billingCycle === 'Monthly' ? '/ month' : '/ year'}</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-4.5 flex-1 mb-8 w-full">
                    {(plan.features || []).length > 0 ? (
                      plan.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <div className={`rounded-full p-0.5 flex-shrink-0 mt-0.5 ${isSelected ? 'bg-[#D1A635]/15' : 'bg-slate-100'}`}>
                            <Check className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D1A635]' : 'text-slate-500'}`} strokeWidth={3} />
                          </div>
                          <span className={`text-[13.5px] leading-snug ${isSelected ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>{feature}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-[13px] text-slate-400 italic">No feature highlights configured for this package yet.</div>
                    )}
                  </div>

                  {/* Faux CTA Selector */}
                  <div className={`w-full py-3 px-4 rounded-xl text-center text-xs font-bold transition-all duration-300 mt-auto ${
                    isSelected 
                      ? 'bg-[#D1A635] text-white shadow-md shadow-[#D1A635]/20' 
                      : 'bg-slate-50 text-slate-600 border border-slate-200/50 group-hover:bg-[#D1A635]/10 group-hover:text-[#D1A635] group-hover:border-[#D1A635]/25'
                  }`}>
                    {isSelected ? 'Selected Package' : 'Select Plan'}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4 mb-16 px-6 relative z-10">
        <button
          type="button"
          onClick={() => navigate(appendOnboardingContext('/company-info', searchParams))}
          className="px-8 py-3.5 bg-white border border-slate-200 text-slate-600 font-bold text-xs rounded-2xl hover:bg-slate-50 hover:text-slate-800 transition-all duration-200 shadow-sm"
        >
          Go Back
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={isSaving || !currentPlan}
          className="px-8 py-3.5 bg-[#D1A635] hover:bg-[#C2982B] text-gray-900 font-black text-xs rounded-2xl transition-all duration-200 shadow-md shadow-[#D1A635]/10 hover:shadow-[#D1A635]/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSaving ? (
            <span className="w-4 h-4 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" />
          ) : null}
          {isSaving ? 'Saving...' : `Continue with ${currentPlan?.name || 'Plan'}`}
        </button>
      </div>

      <div className="mt-auto py-12 w-full bg-white flex flex-col md:flex-row justify-center items-start md:items-center gap-8 md:gap-16 px-6 border-t border-slate-100 relative z-10">
        <div className="flex items-center gap-4 group">
          <div className="bg-[#FAF6E9] p-3 rounded-2xl transition-all duration-300 group-hover:bg-[#FAF6E9]/80 shadow-inner">
            <HeadphonesIcon className="w-5 h-5 text-[#D1A635]" />
          </div>
          <div>
            <div className="text-[13px] font-black text-slate-800">24/7 Support</div>
            <div className="text-[11.5px] text-slate-400 font-medium">Dedicated industrial care</div>
          </div>
        </div>

        <div className="flex items-center gap-4 group">
          <div className="bg-[#FAF6E9] p-3 rounded-2xl transition-all duration-300 group-hover:bg-[#FAF6E9]/80 shadow-inner">
            <Lock className="w-5 h-5 text-[#D1A635]" />
          </div>
          <div>
            <div className="text-[13px] font-black text-slate-800">Secure Payment</div>
            <div className="text-[11.5px] text-slate-400 font-medium">Powered by Stripe</div>
          </div>
        </div>

        <div className="flex items-center gap-4 group">
          <div className="bg-[#FAF6E9] p-3 rounded-2xl transition-all duration-300 group-hover:bg-[#FAF6E9]/80 shadow-inner">
            <XCircle className="w-5 h-5 text-[#D1A635]" />
          </div>
          <div>
            <div className="text-[13px] font-black text-slate-800">Cancel Anytime</div>
            <div className="text-[11.5px] text-slate-400 font-medium">No long-term contracts</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
