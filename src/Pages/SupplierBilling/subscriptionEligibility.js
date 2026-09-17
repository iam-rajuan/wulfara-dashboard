const CANCELLABLE_SUBSCRIPTION_STATUSES = new Set([
  'active',
  'trialing',
  'past_due',
  'payment_failed',
  'requires_action',
]);

const TERMINAL_SUBSCRIPTION_STATUSES = new Set([
  'canceled',
  'cancelled',
  'completed',
  'expired',
  'incomplete_expired',
]);

export const normalizeBillingValue = (value = '') =>
  String(value || '').trim().toLowerCase();

export const isMonthlyRecurringSubscription = (subscription = {}, profile = {}) => {
  if (typeof subscription?.isMonthlyRecurring === 'boolean') {
    return subscription.isMonthlyRecurring;
  }

  const billingCycleType = normalizeBillingValue(subscription?.billingCycleType);
  const billingCycle = normalizeBillingValue(
    subscription?.billingCycle ||
      subscription?.plan?.billingCycle ||
      profile?.selectedBillingCycle
  );

  return billingCycleType === 'monthly' || /month|monthly/.test(billingCycle);
};

export const isCancellationScheduled = (subscription = {}, profile = {}) =>
  typeof subscription?.cancellationScheduled === 'boolean'
    ? subscription.cancellationScheduled
    : isMonthlyRecurringSubscription(subscription, profile) && Boolean(subscription?.cancelAtPeriodEnd);

export const getAccessUntilDate = (subscription = {}) =>
  subscription?.accessUntil ||
  subscription?.currentPeriodEnd ||
  subscription?.cancelAt ||
  subscription?.subscriptionEndDate ||
  null;

export const canRequestSubscriptionCancellation = (subscription = {}, profile = {}) => {
  if (!subscription) {
    return false;
  }

  if (subscription.canCancelAtPeriodEnd === true) {
    return true;
  }

  const normalizedStatus = normalizeBillingValue(subscription?.status || profile?.subscriptionStatus);
  if (TERMINAL_SUBSCRIPTION_STATUSES.has(normalizedStatus)) {
    return false;
  }

  return (
    isMonthlyRecurringSubscription(subscription, profile) &&
    CANCELLABLE_SUBSCRIPTION_STATUSES.has(normalizedStatus) &&
    !isCancellationScheduled(subscription, profile)
  );
};
