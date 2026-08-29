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
import { SubscriptionIcon } from '../../../Components/admin-components/subscriptions/subscriptionIconOptions';

const BILLING_FILTERS = {
  ALL: 'all',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
};

const formatListingPeriodLabel = (durationMonths) => {
  const duration = Number(durationMonths);

  if (!Number.isInteger(duration) || duration <= 0) {
    return '';
  }

  return `${duration} ${duration === 1 ? 'Month' : 'Months'}`;
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
      durationMonths: Number(period.durationMonths),
      label: formatListingPeriodLabel(period.durationMonths),
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

const normalizeListingPeriodLabel = (value = '') =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ');

const resolvePlanListingPeriod = (plan, preferredValue = '') => {
  const options = getPlanListingPeriodOptions(plan);

  if (options.length > 0) {
    const normalizedPreferred = normalizeListingPeriodLabel(preferredValue);
    const matchedOption = options.find((option) => {
      const canonical = normalizeListingPeriodLabel(option.label);
      const singular = normalizeListingPeriodLabel(`${option.durationMonths} month`);
      const plural = normalizeListingPeriodLabel(`${option.durationMonths} months`);

      return normalizedPreferred && (
        normalizedPreferred === canonical ||
        normalizedPreferred === singular ||
        normalizedPreferred === plural
      );
    });

    return matchedOption?.label || options[0].label;
  }

  return preferredValue || '';
};

const resolvePlanListingPeriodOption = (plan, preferredValue = '') => {
  const options = getPlanListingPeriodOptions(plan);

  if (options.length > 0) {
    const normalizedPreferred = normalizeListingPeriodLabel(preferredValue);
    const matchedOption = options.find((option) => {
      const canonical = normalizeListingPeriodLabel(option.label);
      const singular = normalizeListingPeriodLabel(`${option.durationMonths} month`);
      const plural = normalizeListingPeriodLabel(`${option.durationMonths} months`);

      return normalizedPreferred && (
        normalizedPreferred === canonical ||
        normalizedPreferred === singular ||
        normalizedPreferred === plural
      );
    });

    return matchedOption || options[0];
  }

  return {
    durationMonths: null,
    label: preferredValue || '',
    discountPercent: 0,
    customLabel: '',
  };
};

const classifyBillingCycle = (billingCycle = '') => {
  const normalizedBillingCycle = String(billingCycle || '').trim().toLowerCase();

  if (normalizedBillingCycle.includes('month')) {
    return BILLING_FILTERS.MONTHLY;
  }

  if (
    normalizedBillingCycle.includes('annual') ||
    normalizedBillingCycle.includes('year') ||
    normalizedBillingCycle.includes('12')
  ) {
    return BILLING_FILTERS.YEARLY;
  }

  return BILLING_FILTERS.ALL;
};

const getPriceLabel = (billingCycle = '') => {
  const billingGroup = classifyBillingCycle(billingCycle);

  if (billingGroup === BILLING_FILTERS.MONTHLY) {
    return '/month';
  }

  if (billingGroup === BILLING_FILTERS.YEARLY) {
    return '/year';
  }

  return '/plan';
};

const Subscription = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useSelector((state) => state.auth);
  const supplierId = user?.role === 'admin' ? searchParams.get('supplierId') : undefined;
  const isCancelled = searchParams.get('cancelled') === '1';

  const { data: plansResponse, isLoading: isLoadingPlans } = useGetPlansQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: onboardingResponse, isLoading: isLoadingOnboarding } = useGetOnboardingStatusQuery(supplierId, { skip: !user });
  const [saveSubscription, { isLoading: isSaving }] = useSaveOnboardingSubscriptionMutation();
  const [createCheckoutSession, { isLoading: isCheckingOut }] = useCreateCheckoutSessionMutation();

  const supplier = onboardingResponse?.data?.supplier;
  const selectedPlanId = supplier?.selectedPlan?._id || supplier?.selectedPlan || '';
  const plans = useMemo(() => plansResponse?.data || [], [plansResponse?.data]);
  const availableAddons = useMemo(() => plansResponse?.addons || [], [plansResponse?.addons]);
  const [currentPlanId, setCurrentPlanId] = useState('');
  const [billingFilter, setBillingFilter] = useState(BILLING_FILTERS.ALL);
  const [selectedAddonCodes, setSelectedAddonCodes] = useState([]);

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

  useEffect(() => {
    if (!selectedPlanId) {
      return;
    }

    const selectedPlan = plans.find((plan) => plan._id === selectedPlanId);
    if (!selectedPlan) {
      return;
    }

    const nextFilter = classifyBillingCycle(selectedPlan.billingCycle);
    setBillingFilter(nextFilter === BILLING_FILTERS.ALL ? BILLING_FILTERS.ALL : nextFilter);
  }, [plans, selectedPlanId]);

  useEffect(() => {
    const supplierAddonCodes = Array.isArray(supplier?.selectedAddons)
      ? supplier.selectedAddons.filter(Boolean)
      : [];
    setSelectedAddonCodes(supplierAddonCodes);
  }, [supplier?.selectedAddons]);

  const currentPlan = useMemo(
    () => plans.find((plan) => plan._id === currentPlanId) || null,
    [currentPlanId, plans]
  );
  const featuredHeroAddon = useMemo(
    () => availableAddons.find((addon) => addon.code === 'featured_hero_placement') || null,
    [availableAddons]
  );
  const hasFeaturedHeroPlacementSelected =
    featuredHeroAddon !== null && selectedAddonCodes.includes(featuredHeroAddon.code);

  const filteredPlans = useMemo(() => {
    if (billingFilter === BILLING_FILTERS.ALL) {
      return plans;
    }

    return plans.filter((plan) => classifyBillingCycle(plan.billingCycle) === billingFilter);
  }, [billingFilter, plans]);

  const resolvedBillingCycle =
    currentPlan?.billingCycle || supplier?.selectedBillingCycle || 'One-time payment';
  const resolvedListingPeriodOption = resolvePlanListingPeriodOption(
    currentPlan,
    supplier?.selectedListingPeriod
  );
  const resolvedListingPeriod =
    resolvedListingPeriodOption.label ||
    supplier?.selectedListingPeriod ||
    'Included in selected plan';
  const basePlanPrice = calculateDiscountedPlanPrice(
    currentPlan?.price || 0,
    resolvedListingPeriodOption.discountPercent
  );
  const addonTotal = hasFeaturedHeroPlacementSelected ? Number(featuredHeroAddon?.price || 0) : 0;
  const totalDueToday = basePlanPrice + addonTotal;
  const selectedPlanBillingGroup = classifyBillingCycle(currentPlan?.billingCycle);
  const isSubmitting = isSaving || isCheckingOut;

  const toggleAddon = (addonCode) => {
    setSelectedAddonCodes((currentCodes) =>
      currentCodes.includes(addonCode)
        ? currentCodes.filter((code) => code !== addonCode)
        : [...currentCodes, addonCode]
    );
  };

  const handleContinueToPayment = async () => {
    if (!currentPlanId || !currentPlan) {
      toast.error('Please select a subscription plan to continue');
      return;
    }

    const payload = {
      supplierId,
      planId: currentPlanId,
      listingPeriod: resolvedListingPeriod,
      addons: selectedAddonCodes,
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
    <div className="min-h-screen lg:h-screen lg:max-h-screen bg-slate-50/50 font-sans flex flex-col relative overflow-hidden">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[250px] bg-gradient-to-b from-[#D1A635]/8 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-slate-200/30 to-transparent blur-3xl pointer-events-none" />

      {/* Compact Header */}
      <div className="w-full text-center py-4 lg:py-6 px-4 relative z-10 shrink-0">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-800 tracking-tight">Choose Your Subscription</h1>
        <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">Select the listing plan that best fits your business goals.</p>
      </div>

      {isCancelled && (
        <div className="w-full max-w-[1250px] mx-auto px-4 md:px-8 shrink-0 mb-4">
          <div className="rounded-xl border border-amber-200 bg-amber-50/60 backdrop-blur px-4 py-3 text-amber-900 flex items-start gap-2.5 shadow-sm">
            <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5 text-amber-600" />
            <div>
              <div className="text-xs font-bold">Payment was cancelled.</div>
              <div className="text-[11px] text-amber-800">No charge was made. Your selected plan is still saved below.</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Height Constrained on Desktop */}
      <div className="flex-1 w-full max-w-[1250px] mx-auto px-4 md:px-8 pb-6 lg:pb-8 min-h-0 lg:min-h-0 overflow-y-auto lg:overflow-hidden relative z-10 flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
        {/* Left Column: Toggles, Plans, Add-ons */}
        <div className="flex-1 flex flex-col justify-between gap-4 lg:overflow-hidden min-w-0 min-h-0">
          {isLoadingPlans || isLoadingOnboarding ? (
            <div className="flex-1 flex flex-col items-center justify-center py-16 text-slate-500 gap-3 font-medium">
              <span className="w-6 h-6 border-2 border-slate-200 border-t-[#D1A635] rounded-full animate-spin" />
              <span className="text-xs">Loading subscription options...</span>
            </div>
          ) : plans.length === 0 ? (
            <div className="flex-1 flex items-center justify-center py-12">
              <div className="rounded-2xl border border-amber-200 bg-amber-50/50 backdrop-blur px-6 py-6 text-amber-800 max-w-md text-center font-medium shadow-sm">
                No active pricing plans are available. Create a pricing package in the admin dashboard first.
              </div>
            </div>
          ) : (
            <>
              {/* Billing Period Toggle & Label */}
              <div className="flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Billing Period</span>
                  <div className="bg-slate-100 p-0.5 rounded-full flex gap-1 border border-slate-200/50">
                    {[
                      { value: BILLING_FILTERS.ALL, label: 'All' },
                      { value: BILLING_FILTERS.MONTHLY, label: 'Monthly' },
                      { value: BILLING_FILTERS.YEARLY, label: 'Yearly' },
                    ].map((filterOption) => {
                      const isActive = billingFilter === filterOption.value;

                      return (
                        <button
                          key={filterOption.value}
                          type="button"
                          onClick={() => setBillingFilter(filterOption.value)}
                          className={`rounded-full px-3 py-1 text-[11px] font-bold transition-all duration-200 ${
                            isActive
                              ? 'bg-gradient-to-r from-[#D1A635] to-[#B08620] text-white shadow-sm'
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          {filterOption.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Plans Grid */}
              <div className="flex-1 lg:overflow-y-auto pr-1 -mr-1">
                {filteredPlans.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200 bg-white px-6 py-8 text-center text-slate-500 shadow-sm">
                    No {billingFilter} pricing plans are available right now.
                  </div>
                ) : (
                  <div className={`grid grid-cols-1 gap-5 py-2 ${
                    filteredPlans.length === 1
                      ? 'md:grid-cols-1 max-w-md'
                      : 'md:grid-cols-2'
                  }`}>
                    {filteredPlans.map((plan) => {
                      const isSelected = currentPlanId === plan._id;
                      const planListingPeriodOption = resolvePlanListingPeriodOption(
                        plan,
                        plan._id === currentPlanId ? supplier?.selectedListingPeriod : ''
                      );
                      const planListingPeriod = planListingPeriodOption.label;
                      const planPrice = calculateDiscountedPlanPrice(
                        plan.price,
                        planListingPeriodOption.discountPercent
                      );
                      const priceLabel = getPriceLabel(plan.billingCycle);
                      const accentColor = plan.accentColor || '#D1A635';

                      return (
                        <button
                          key={plan._id}
                          type="button"
                          onClick={() => setCurrentPlanId(plan._id)}
                          className={`w-full bg-white rounded-2xl p-4 sm:p-5 flex flex-col text-left transition-all duration-300 relative group cursor-pointer hover:-translate-y-0.5 ${
                            isSelected
                              ? 'border-2 z-10'
                              : 'border border-slate-200/60 shadow-sm hover:shadow-md hover:border-[#D1A635]/30'
                          }`}
                          style={
                            isSelected
                              ? {
                                  borderColor: accentColor,
                                  boxShadow: `0 12px 30px ${accentColor}1A`,
                                }
                              : undefined
                          }
                        >
                          {/* Upper Label Row */}
                          <div className="flex items-center justify-between mb-2.5 w-full gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <SubscriptionIcon iconKey={plan.iconKey} className="w-8 h-8 rounded-lg border shrink-0" iconSize={14} />
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 group-hover:text-[#D1A635] transition-colors truncate">
                                {plan.billingCycle || 'Plan'}
                              </span>
                            </div>
                            {(plan.badgeText || isSelected) && (
                              <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full border shrink-0 whitespace-nowrap ${
                                isSelected 
                                  ? 'bg-white' 
                                  : 'bg-slate-100 border-slate-200 text-slate-500'
                              }`}
                              style={isSelected ? { borderColor: accentColor, color: accentColor } : undefined}>
                                {plan.badgeText || 'Selected'}
                              </span>
                            )}
                          </div>

                          {/* Title & Description */}
                          <h2 className="text-lg font-black text-slate-800 tracking-tight leading-tight mb-1">{plan.name}</h2>
                          <p className="text-[11px] text-slate-400 leading-normal min-h-[34px] line-clamp-2 mb-2.5">
                            {plan.description || 'Supplier listing plan'}
                          </p>

                          {/* Price Details */}
                          <div className="border-t border-slate-100 pt-3 mb-2.5 w-full flex items-baseline gap-1">
                            <span className="text-3xl font-black text-slate-900 tracking-tight">${planPrice}</span>
                            <span className="text-[11px] text-slate-400 font-semibold">{priceLabel}</span>
                          </div>
                          {planListingPeriod && (
                            <p className="text-[10px] text-slate-500 font-bold mb-3">
                              Listing period: {planListingPeriod}
                            </p>
                          )}
                          {Number(planListingPeriodOption.discountPercent || 0) > 0 && (
                            <p className="text-[10px] text-emerald-600 font-semibold mb-3 -mt-1">
                              {planListingPeriodOption.discountPercent}% discount applied
                            </p>
                          )}

                          {/* Feature List */}
                          <div className="space-y-2 flex-1 mb-3 w-full">
                            {(plan.features || []).length > 0 ? (
                              (plan.features || []).slice(0, 4).map((feature) => (
                                <div key={feature} className="flex items-start gap-2">
                                  <div 
                                    className="rounded-full p-0.5 shrink-0 mt-0.5"
                                    style={isSelected ? { backgroundColor: `${accentColor}1A` } : { backgroundColor: '#f1f5f9' }}
                                  >
                                    <Check className={`w-3 h-3 ${isSelected ? '' : 'text-slate-500'}`} strokeWidth={3} style={isSelected ? { color: accentColor } : undefined} />
                                  </div>
                                  <span className={`text-xs leading-tight ${isSelected ? 'text-slate-800 font-bold' : 'text-slate-500'}`}>
                                    {feature}
                                  </span>
                                </div>
                              ))
                            ) : (
                              <div className="text-[11px] text-slate-400 italic">No feature highlights.</div>
                            )}
                          </div>

                          {/* Interactive Pill */}
                          <div className={`w-full py-2 px-3 rounded-xl text-center text-[10px] font-bold tracking-wider uppercase transition-all duration-200 mt-auto ${
                            isSelected 
                              ? 'text-white shadow-sm shadow-[#D1A635]/10' 
                              : 'bg-slate-50 text-slate-500 group-hover:bg-slate-100 border border-slate-200/40'
                          }`}
                          style={isSelected ? { backgroundColor: accentColor } : undefined}>
                            {isSelected ? 'Active Plan' : 'Choose Plan'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Compact Add-on Bar */}
              {currentPlan && featuredHeroAddon && (
                <div className="shrink-0 rounded-2xl border border-slate-200 bg-white shadow-sm p-4 mt-auto">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="addon-featured-hero"
                        checked={hasFeaturedHeroPlacementSelected}
                        onChange={() => toggleAddon(featuredHeroAddon.code)}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-[#D1A635] focus:ring-[#D1A635]/40 transition-colors cursor-pointer"
                      />
                      <div>
                        <label htmlFor="addon-featured-hero" className="text-xs sm:text-sm font-bold text-slate-800 cursor-pointer flex flex-wrap items-center gap-2">
                          {featuredHeroAddon.name}
                          <span className="bg-amber-100 text-[#D1A635] text-[8px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                            Recommended Add-on
                          </span>
                        </label>
                        <p className="text-[11px] text-slate-400 leading-normal mt-0.5">
                          {featuredHeroAddon.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <span className="text-sm font-black text-slate-900">+${Number(featuredHeroAddon.price || 0).toFixed(2)}</span>
                      <span className="text-[10px] text-slate-400 block leading-tight">one-time addon</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Column: Order Summary Sidebar */}
        <div className="w-full lg:w-[380px] shrink-0 flex flex-col justify-between bg-white border border-slate-200 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-5 lg:p-6 lg:h-full lg:max-h-full">
          <div>
            <h2 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#D1A635]" />
              Order Summary
            </h2>

            <div className="py-4 space-y-3.5">
              <div className="flex justify-between gap-4 text-xs">
                <span className="text-slate-400 font-medium">Selected Plan</span>
                <span className="font-bold text-slate-800 text-right">{currentPlan?.name || 'Choose a plan'}</span>
              </div>
              <div className="flex justify-between gap-4 text-xs">
                <span className="text-slate-400 font-medium">Billing Cycle</span>
                <span className="font-bold text-slate-800 text-right">{resolvedBillingCycle}</span>
              </div>
              <div className="flex justify-between gap-4 text-xs">
                <span className="text-slate-400 font-medium">Listing Duration</span>
                <span className="font-bold text-slate-800 text-right">{resolvedListingPeriod}</span>
              </div>
              <div className="flex justify-between gap-4 text-xs">
                <span className="text-slate-400 font-medium">Base Price</span>
                <span className="font-bold text-slate-800 text-right">
                  {currentPlan ? `$${basePlanPrice.toFixed(2)}` : 'Select a plan'}
                </span>
              </div>
              {featuredHeroAddon && hasFeaturedHeroPlacementSelected && (
                <div className="flex justify-between gap-4 text-xs pt-2.5 border-t border-dashed border-slate-100">
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    {featuredHeroAddon.name}
                  </span>
                  <span className="font-bold text-slate-800 text-right">
                    +${Number(featuredHeroAddon.price || 0).toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div>
              <div className="flex justify-between items-end mb-1">
                <span className="text-xs font-bold text-slate-800">Total Due Today</span>
                <span className="text-xl lg:text-2xl font-black text-slate-900">${totalDueToday.toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-normal">
                {selectedPlanBillingGroup === BILLING_FILTERS.MONTHLY
                  ? 'Charged as the selected monthly plan plus any enabled add-ons.'
                  : selectedPlanBillingGroup === BILLING_FILTERS.YEARLY
                    ? 'Charged as the selected annual plan plus any enabled add-ons.'
                    : 'Stripe charges the backend-selected plan amount and any enabled add-ons.'}
              </p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={handleContinueToPayment}
                disabled={isSubmitting || !currentPlan}
                className="w-full bg-gradient-to-r from-[#D1A635] to-[#B08620] hover:from-[#C2982B] hover:to-[#A0761B] text-white font-bold text-xs py-3 px-4 rounded-xl transition-all duration-200 shadow-md shadow-[#D1A635]/10 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <CreditCard className="w-3.5 h-3.5" />
                )}
                {isSubmitting ? 'Preparing Checkout...' : 'Continue to Payment'}
              </button>

              <button
                type="button"
                onClick={() => navigate(appendOnboardingContext('/company-info', searchParams))}
                className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-bold text-xs py-3 px-4 rounded-xl transition-all duration-200 cursor-pointer"
              >
                Back to Company Info
              </button>
            </div>

            <div className="space-y-2.5 pt-2 text-[10px] text-slate-400">
              <div className="flex items-start gap-2">
                <Lock className="w-3.5 h-3.5 text-[#D1A635] shrink-0 mt-0.5" />
                <span>Secure checkout. All transactions are encrypted by Stripe.</span>
              </div>
              <div className="flex items-start gap-2">
                <HeadphonesIcon className="w-3.5 h-3.5 text-[#D1A635] shrink-0 mt-0.5" />
                <span>Instant activation after payment verification.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;

