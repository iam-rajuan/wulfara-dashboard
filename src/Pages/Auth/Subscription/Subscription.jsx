import React, { useEffect, useMemo, useState } from 'react';
import { AlertCircle, Check, CreditCard, HeadphonesIcon, Lock } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetPlansQuery, useCreateCheckoutSessionMutation } from '../../../redux/features/subscriptions/subscriptionsApi';
import {
  useGetOnboardingStatusQuery,
  useSaveOnboardingSubscriptionMutation,
} from '../../../redux/features/listings/listingsApi';
import { appendOnboardingContext, buildOnboardingQueryString } from '../../../utils/onboarding';

const deriveListingPeriod = (billingCycle = '') => {
  const normalizedBillingCycle = String(billingCycle || '').trim().toLowerCase();

  if (!normalizedBillingCycle) {
    return '';
  }

  if (normalizedBillingCycle.includes('month')) {
    return '1 Month';
  }

  if (normalizedBillingCycle.includes('quarter')) {
    return '3 Months';
  }

  if (normalizedBillingCycle.includes('semi') || normalizedBillingCycle.includes('6')) {
    return '6 Months';
  }

  if (normalizedBillingCycle.includes('annual') || normalizedBillingCycle.includes('year') || normalizedBillingCycle.includes('12')) {
    return '12 Months';
  }

  return billingCycle;
};

const Subscription = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useSelector((state) => state.auth);
  const supplierId = user?.role === 'admin' ? searchParams.get('supplierId') : undefined;
  const isCancelled = searchParams.get('cancelled') === '1';

  const { data: plansResponse, isLoading: isLoadingPlans } = useGetPlansQuery();
  const { data: onboardingResponse, isLoading: isLoadingOnboarding } = useGetOnboardingStatusQuery(supplierId, { skip: !user });
  const [saveSubscription, { isLoading: isSaving }] = useSaveOnboardingSubscriptionMutation();
  const [createCheckoutSession, { isLoading: isCheckingOut }] = useCreateCheckoutSessionMutation();

  const supplier = onboardingResponse?.data?.supplier;
  const selectedPlanId = supplier?.selectedPlan?._id || supplier?.selectedPlan || '';
  const plans = useMemo(() => plansResponse?.data || [], [plansResponse?.data]);
  const [currentPlanId, setCurrentPlanId] = useState('');

  useEffect(() => {
    if (!user) {
      navigate(`/sign-in${buildOnboardingQueryString(searchParams)}`);
    }
  }, [navigate, searchParams, user]);

  useEffect(() => {
    if (selectedPlanId) {
      setCurrentPlanId(selectedPlanId);
      return;
    }

    if (plans.length > 0) {
      setCurrentPlanId(plans[0]._id);
    }
  }, [plans, selectedPlanId]);

  const currentPlan = useMemo(
    () => plans.find((plan) => plan._id === currentPlanId) || null,
    [currentPlanId, plans]
  );

  const resolvedBillingCycle =
    currentPlan?.billingCycle || supplier?.selectedBillingCycle || 'One-time payment';
  const resolvedListingPeriod =
    supplier?.selectedListingPeriod || deriveListingPeriod(resolvedBillingCycle) || 'Included in selected plan';
  const totalDueToday = Number(currentPlan?.price || 0);
  const isSubmitting = isSaving || isCheckingOut;

  const handleContinueToPayment = async () => {
    if (!currentPlanId || !currentPlan) {
      toast.error('Please select a subscription plan to continue');
      return;
    }

    const payload = {
      supplierId,
      planId: currentPlanId,
      billingCycle: currentPlan.billingCycle || '',
      listingPeriod: deriveListingPeriod(currentPlan.billingCycle),
    };

    try {
      await saveSubscription(payload).unwrap();
      const response = await createCheckoutSession(payload).unwrap();

      if (!response.paymentUrl) {
        throw new Error('Stripe checkout URL was not returned');
      }

      window.location.href = response.paymentUrl;
    } catch (error) {
      toast.error(error?.data?.message || error?.message || 'Failed to initialize checkout');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[300px] bg-gradient-to-b from-[#D1A635]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="w-full text-center pt-14 pb-8 px-4 relative z-10">
        <h1 className="text-3xl md:text-5xl font-black text-slate-800 mb-3 tracking-tight">Choose Your Subscription</h1>
        <p className="text-[15px] text-slate-500 font-medium">Select the listing plan you want to pay for now.</p>
      </div>

      {isCancelled && (
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 relative z-10 mb-6">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-amber-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold">Payment was cancelled.</div>
              <div className="text-sm">No charge was made. Your selected plan is still saved below.</div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 w-full mb-16 relative z-10 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-8 items-start">
        <div>
          {isLoadingPlans || isLoadingOnboarding ? (
            <div className="py-16 text-center text-slate-500 flex items-center justify-center gap-2.5 font-medium">
              <span className="w-5 h-5 border-2 border-slate-200 border-t-[#D1A635] rounded-full animate-spin" />
              Loading subscription options...
            </div>
          ) : plans.length === 0 ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 text-amber-800 max-w-md mx-auto text-center font-medium shadow-sm">
              No active pricing plans are available. Create a pricing package in the admin dashboard first.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {plans.map((plan) => {
                const isSelected = currentPlanId === plan._id;
                const planListingPeriod = deriveListingPeriod(plan.billingCycle);

                return (
                  <button
                    key={plan._id}
                    type="button"
                    onClick={() => setCurrentPlanId(plan._id)}
                    className={`w-full bg-white rounded-3xl p-8 flex flex-col text-left transition-all duration-300 relative group cursor-pointer ${
                      isSelected
                        ? 'border-2 border-[#D1A635] shadow-[0_20px_50px_rgba(209,166,53,0.12)] scale-[1.02] z-10'
                        : 'border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)] hover:border-[#D1A635]/40'
                    }`}
                  >
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider font-extrabold px-4 py-1.5 rounded-full shadow-sm ${
                      isSelected ? 'bg-gradient-to-r from-[#D1A635] to-[#B08620] text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {plan.badgeText || (isSelected ? 'Selected' : 'Available')}
                    </div>

                    <h2 className="text-2xl font-black text-slate-800 mb-2 mt-2 tracking-tight">{plan.name}</h2>
                    <p className="text-[13px] text-slate-500 mb-6 min-h-[45px] leading-relaxed">{plan.description || 'Supplier listing plan'}</p>

                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-4xl font-black text-slate-900 tracking-tight">${plan.price}</span>
                      <span className="text-sm text-slate-400 font-semibold">one-time</span>
                    </div>
                    <p className="text-[12px] text-slate-500 font-semibold mb-6">
                      {plan.billingCycle || 'Billing cycle not configured'}
                      {planListingPeriod ? ` · ${planListingPeriod}` : ''}
                    </p>

                    <div className="space-y-4.5 flex-1 mb-8">
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

                    <div className={`w-full py-3 px-4 rounded-xl text-center text-xs font-bold transition-all mt-auto ${
                      isSelected ? 'bg-[#D1A635] text-white shadow-md shadow-[#D1A635]/20' : 'bg-slate-50 text-slate-600 border border-slate-200/50'
                    }`}>
                      {isSelected ? 'Selected Package' : 'Select Plan'}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8 sticky top-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between gap-4 text-[14px]">
              <span className="text-gray-600">Selected Plan</span>
              <span className="font-bold text-gray-900 text-right">{currentPlan?.name || 'Choose a plan'}</span>
            </div>
            <div className="flex justify-between gap-4 text-[14px]">
              <span className="text-gray-600">Billing</span>
              <span className="font-bold text-gray-900 text-right">{resolvedBillingCycle}</span>
            </div>
            <div className="flex justify-between gap-4 text-[14px]">
              <span className="text-gray-600">Listing Duration</span>
              <span className="font-bold text-gray-900 text-right">{resolvedListingPeriod}</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 mb-6">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[16px] font-bold text-gray-900">Total Due Today</span>
              <span className="text-[24px] font-bold text-gray-900">${totalDueToday.toFixed(2)}</span>
            </div>
            <div className="text-right text-[11px] text-gray-500">Stripe charges the backend plan amount only.</div>
          </div>

          <button
            type="button"
            onClick={handleContinueToPayment}
            disabled={isSubmitting || !currentPlan}
            className="w-full bg-[#D1A635] hover:bg-[#C2982B] text-black font-bold text-[14px] py-3.5 px-4 rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 mb-4 disabled:opacity-60"
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <CreditCard className="w-4 h-4" />
            )}
            {isSubmitting ? 'Preparing Checkout...' : 'Continue to Payment'}
          </button>

          <button
            type="button"
            onClick={() => navigate(appendOnboardingContext('/company-info', searchParams))}
            className="w-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-medium text-[14px] py-3.5 px-4 rounded-md transition-colors shadow-sm"
          >
            Back to Company Info
          </button>

          <div className="mt-8 space-y-4 text-[12px] text-slate-500">
            <div className="flex items-start gap-3">
              <Lock className="w-4 h-4 text-[#D1A635] shrink-0 mt-0.5" />
              <span>Payments are processed securely through Stripe.</span>
            </div>
            <div className="flex items-start gap-3">
              <HeadphonesIcon className="w-4 h-4 text-[#D1A635] shrink-0 mt-0.5" />
              <span>Your listing activates after Stripe confirms payment through the webhook.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
