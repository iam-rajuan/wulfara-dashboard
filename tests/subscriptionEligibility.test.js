import assert from 'node:assert/strict';
import test from 'node:test';

import {
  canRequestSubscriptionCancellation,
  getAccessUntilDate,
  isCancellationScheduled,
  isMonthlyRecurringSubscription,
} from '../src/Pages/SupplierBilling/subscriptionEligibility.js';

const activeMonthlySubscription = {
  status: 'active',
  billingCycleType: 'monthly',
  billingCycle: 'Monthly',
  cancelAtPeriodEnd: false,
  currentPeriodEnd: '2026-10-17T00:00:00.000Z',
  effectiveRecurringAmount: 999,
};

test('active monthly subscription can request cancellation', () => {
  assert.equal(isMonthlyRecurringSubscription(activeMonthlySubscription), true);
  assert.equal(canRequestSubscriptionCancellation(activeMonthlySubscription), true);
});

test('active monthly subscription with presentation billing cycle can request cancellation', () => {
  assert.equal(
    canRequestSubscriptionCancellation({
      ...activeMonthlySubscription,
      billingCycleType: '',
      billingCycle: 'Monthly',
    }),
    true
  );
});

test('scheduled active monthly hides cancel action and shows scheduled state', () => {
  const subscription = {
    ...activeMonthlySubscription,
    cancelAtPeriodEnd: true,
  };

  assert.equal(canRequestSubscriptionCancellation(subscription), false);
  assert.equal(isCancellationScheduled(subscription), true);
  assert.equal(getAccessUntilDate(subscription), '2026-10-17T00:00:00.000Z');
});

test('terminal monthly subscriptions cannot request cancellation', () => {
  ['canceled', 'completed', 'expired'].forEach((status) => {
    assert.equal(
      canRequestSubscriptionCancellation({
        ...activeMonthlySubscription,
        status,
      }),
      false
    );
  });
});

test('annual and missing subscriptions cannot request cancellation', () => {
  assert.equal(
    canRequestSubscriptionCancellation({
      status: 'active',
      billingCycleType: 'annual',
      billingCycle: 'Annual',
      cancelAtPeriodEnd: false,
    }),
    false
  );
  assert.equal(canRequestSubscriptionCancellation(null), false);
});
