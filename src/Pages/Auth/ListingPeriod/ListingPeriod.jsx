import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Check, Info, CheckCircle2 } from 'lucide-react';
import { useCreateCheckoutSessionMutation } from '../../../redux/features/subscriptions/subscriptionsApi';
import { useGetOnboardingStatusQuery } from '../../../redux/features/listings/listingsApi';
import { toast } from 'react-toastify';
import { appendOnboardingContext, buildOnboardingQueryString } from '../../../utils/onboarding';

const formatListingPeriodLabel = (durationMonths) => {
  const duration = Number(durationMonths);

  if (!Number.isInteger(duration) || duration <= 0) {
    return '';
  }

  return `${duration} ${duration === 1 ? 'Month' : 'Months'}`;
};

const normalizeListingPeriodLabel = (value = '') =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ');

const toMoneyCents = (value = 0) => Math.round(Number(value || 0) * 100);

const checkoutSummaryMatches = (expected, actual) => {
  if (!actual) {
    return false;
  }

  return (
    toMoneyCents(actual.basePrice) === toMoneyCents(expected.basePrice) &&
    toMoneyCents(actual.totalDueToday) === toMoneyCents(expected.totalDueToday) &&
    normalizeListingPeriodLabel(actual.listingPeriod) ===
      normalizeListingPeriodLabel(expected.listingPeriod)
  );
};

const getPlanListingPeriodOptions = (plan) =>
  (Array.isArray(plan?.listingPeriods) ? plan.listingPeriods : [])
    .filter(
      (period) =>
        period?.isActive !== false &&
        Number.isInteger(Number(period?.durationMonths)) &&
        Number(period?.durationMonths) > 0
    )
    .map((period) => ({
      id: formatListingPeriodLabel(period.durationMonths),
      durationMonths: Number(period.durationMonths),
      discountPercent: Number(period.discountPercent || 0),
      customLabel: typeof period?.customLabel === 'string' ? period.customLabel.trim() : '',
    }))
    .sort((a, b) => a.durationMonths - b.durationMonths);

const calculateDiscountedPlanPrice = (basePrice, discountPercent = 0) => {
  const base = Number(basePrice || 0);
  const discount = Number(discountPercent || 0);

  if (Number.isNaN(base) || base <= 0) {
    return 0;
  }

  if (Number.isNaN(discount) || discount <= 0) {
    return Math.round(base * 100) / 100;
  }

  return Math.round((base * (1 - discount / 100)) * 100) / 100;
};

const resolveDefaultListingPeriod = (plan, preferredValue = '') => {
  const options = getPlanListingPeriodOptions(plan);

  if (options.length === 0) {
    return preferredValue || '';
  }

  const normalizedPreferred = normalizeListingPeriodLabel(preferredValue);
  const matchedOption = options.find(
    (option) => normalizeListingPeriodLabel(option.id) === normalizedPreferred
  );

  return matchedOption?.id || options[0].id;
};

const buildPeriodBadge = (index, total) => {
  if (index === 0) {
    return { label: 'STARTER COMMITMENT', className: 'bg-[#E8F0FE] text-blue-700' };
  }

  if (index === total - 1) {
    return { label: 'BEST VALUE', className: 'bg-blue-700 text-white' };
  }

  return { label: 'FLEXIBLE TERM', className: 'bg-[#E8F0FE] text-blue-700' };
};

const ListingPeriod = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useSelector((state) => state.auth);
  const supplierId = user?.role === 'admin' ? searchParams.get('supplierId') : undefined;
  const { data: onboardingResponse, isLoading: isLoadingOnboarding } = useGetOnboardingStatusQuery(supplierId, { skip: !user });
  const [createCheckoutSession, { isLoading }] = useCreateCheckoutSessionMutation();
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const supplier = onboardingResponse?.data?.supplier;
  const selectedPlan = supplier?.selectedPlan;
  const periods = getPlanListingPeriodOptions(selectedPlan);
  const selectedPeriodOption =
    periods.find((period) => normalizeListingPeriodLabel(period.id) === normalizeListingPeriodLabel(selectedPeriod)) ||
    null;
  const selectedPeriodPrice = calculateDiscountedPlanPrice(
    selectedPlan?.price || 0,
    selectedPeriodOption?.discountPercent || 0
  );

  useEffect(() => {
    if (!user) {
      navigate(`/sign-in${buildOnboardingQueryString(searchParams)}`);
    }
  }, [navigate, searchParams, user]);

  useEffect(() => {
    const nextPeriod = resolveDefaultListingPeriod(selectedPlan, supplier?.selectedListingPeriod);
    if (nextPeriod) {
      setSelectedPeriod(nextPeriod);
    }
  }, [selectedPlan, supplier?.selectedListingPeriod]);

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

      const expectedSummary = {
        planId: selectedPlan._id,
        listingPeriod: selectedPeriod,
        basePrice: selectedPeriodPrice,
        totalDueToday: selectedPeriodPrice,
      };

      if (!checkoutSummaryMatches(expectedSummary, res?.orderSummary)) {
        console.error('Checkout summary mismatch', {
          expected: expectedSummary,
          received: res?.orderSummary,
        });
        toast.error('Checkout price changed. Please refresh and try again.');
        return;
      }

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
          ) : periods.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              No listing periods are configured for the selected plan yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {periods.map((period, index) => {
                const isSelected = selectedPeriod === period.id;
                const badge = buildPeriodBadge(index, periods.length);

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
                      <span className={`text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider ${badge.className}`}>
                        {badge.label}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{period.id}</h3>
                    <p className="text-2xl font-black text-gray-900 mb-2">${calculateDiscountedPlanPrice(selectedPlan?.price || 0, period.discountPercent)}</p>
                    <p className="text-[13px] text-gray-500 leading-relaxed min-h-[40px]">
                      {period.customLabel || (
                        period.discountPercent > 0
                          ? `${period.discountPercent}% discount applied for this listing duration.`
                          : 'Standard listing duration for this subscription plan.'
                      )}
                    </p>
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
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D1A635]" />
                <span className="text-[13.5px] font-medium text-gray-900">${selectedPeriodPrice.toFixed(2)}</span>
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
                disabled={isLoading || !selectedPlan || !selectedPeriod}
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
