import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CreditCard, Download, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useGetSupplierDashboardQuery } from '../../redux/features/listings/listingsApi';
import {
  useCancelCurrentSubscriptionMutation,
  useGetCurrentSubscriptionQuery,
  useGetInvoicesQuery,
} from '../../redux/features/subscriptions/subscriptionsApi';
import {
  canRequestSubscriptionCancellation,
  getAccessUntilDate,
  isCancellationScheduled as getIsCancellationScheduled,
  isMonthlyRecurringSubscription,
} from './subscriptionEligibility';

const formatCurrency = (amount = 0, currency = 'usd') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: String(currency || 'usd').toUpperCase(),
  }).format(Number(amount || 0));

const formatDate = (value) => {
  if (!value) {
    return 'Not available';
  }

  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const formatNextPayment = (subscription, isMonthly) => {
  if (isMonthly && (subscription?.cancelAtPeriodEnd || (subscription?.subscriptionEndDate && !subscription?.nextPaymentDate))) {
    return 'No further automatic payments';
  }

  return formatDate(subscription?.nextPaymentDate);
};

const statusClassName = (status = '') => {
  const normalized = String(status).toLowerCase();
  if (['active', 'paid', 'completed'].includes(normalized)) {
    return 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200';
  }
  if (['past_due', 'payment_failed', 'requires_action', 'failed', 'unpaid'].includes(normalized)) {
    return 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200';
  }
  if (['pending_checkout', 'pending', 'incomplete', 'trialing'].includes(normalized)) {
    return 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200';
  }
  return 'bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-200';
};

export default function SupplierBilling() {
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const { data: dashboardData, refetch: refetchDashboard } = useGetSupplierDashboardQuery();
  const { data: invoicesData, isLoading: isLoadingInvoices, refetch: refetchInvoices } = useGetInvoicesQuery();
  const { data: subscriptionData, refetch: refetchCurrentSubscription } = useGetCurrentSubscriptionQuery();
  const [cancelCurrentSubscription, { isLoading: isCancelling }] = useCancelCurrentSubscriptionMutation();

  const profile = dashboardData?.data?.profile;
  const currentSubscription = subscriptionData?.data || invoicesData?.currentSubscription || null;
  const currentPlan =
    currentSubscription?.plan?.name ||
    currentSubscription?.planName ||
    profile?.subscriptionPlan ||
    'free';
  const billingCycle = currentSubscription?.billingCycle || profile?.selectedBillingCycle || 'No active billing cycle';
  const billingCycleType = currentSubscription?.billingCycleType || '';
  const isMonthly = isMonthlyRecurringSubscription(currentSubscription, profile);
  const isAnnual = billingCycleType === 'annual';
  const subscriptionStatus = currentSubscription?.status || profile?.subscriptionStatus || 'inactive';
  const isCancellationScheduled = getIsCancellationScheduled(currentSubscription, profile);
  const cancellationAccessUntil = getAccessUntilDate(currentSubscription);
  const canCancelSubscription = canRequestSubscriptionCancellation(currentSubscription, profile);
  const invoices = invoicesData?.data || [];

  const handleConfirmCancellation = async () => {
    try {
      await cancelCurrentSubscription().unwrap();
      setIsCancelDialogOpen(false);
      toast.success('Subscription cancellation scheduled.');
      await Promise.all([
        refetchCurrentSubscription(),
        refetchInvoices(),
        refetchDashboard(),
      ]);
    } catch (error) {
      toast.error(error?.data?.message || 'Unable to schedule cancellation right now.');
    }
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans mt-16">
      
      <div className="max-w-[1000px] mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Billing & Subscription</h1>
          <p className="text-[13px] text-gray-500">Manage your subscription plan, payment methods, and billing history.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Current Plan Card */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Current Plan</h3>
                <div className="text-3xl font-extrabold text-gray-900 capitalize flex flex-wrap items-center gap-x-3 gap-y-2">
                  {currentPlan}
                  <span className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[11px] font-extrabold leading-none capitalize shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${statusClassName(subscriptionStatus)}`}>
                    {subscriptionStatus === 'active' ? <CheckCircle2 size={13} strokeWidth={2.4} /> : <AlertCircle size={13} strokeWidth={2.4} />}
                    {subscriptionStatus.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
              {canCancelSubscription && (
                <button
                  type="button"
                  onClick={() => setIsCancelDialogOpen(true)}
                  className="bg-white hover:bg-red-50 border border-red-200 text-red-700 text-[13px] font-bold py-2 px-4 rounded-md transition-colors shadow-sm"
                >
                  Cancel Subscription
                </button>
              )}
            </div>
             
            <p className="text-[13px] text-gray-600 mb-6">
              Your listing entitlement is synced from Stripe billing events and WULFARA approval status.
            </p>

            {isCancellationScheduled && (
              <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                <div className="text-[13px] font-bold text-amber-800">Cancellation Scheduled</div>
                <div className="text-[12px] text-amber-700 mt-1">
                  Access remains active until {formatDate(cancellationAccessUntil)}. No further automatic payments are scheduled.
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-6 border-t border-gray-100">
              <div>
                <div className="text-[11px] font-bold text-gray-400 mb-1">Billing Cycle</div>
                <div className="text-[13px] font-bold text-gray-900">{billingCycle}</div>
              </div>
              <div>
                <div className="text-[11px] font-bold text-gray-400 mb-1">
                  {isAnnual ? 'Subscription End Date' : 'Next Payment Date'}
                </div>
                <div className="text-[13px] font-bold text-gray-900 flex items-center gap-1.5">
                  <Calendar size={14} className="text-gray-400" /> 
                  {isAnnual
                    ? formatDate(currentSubscription?.subscriptionEndDate)
                    : formatNextPayment(currentSubscription, isMonthly)}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-bold text-gray-400 mb-1">
                  {isMonthly ? 'Recurring Amount' : 'Payment Amount'}
                </div>
                <div className="text-[13px] font-bold text-gray-900">
                  {isMonthly
                    ? `${formatCurrency(currentSubscription?.effectiveRecurringAmount, currentSubscription?.currency)} / month`
                    : formatCurrency(currentSubscription?.totalInitialAmount || invoices[0]?.amount, currentSubscription?.currency)}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-bold text-gray-400 mb-1">Selected Duration</div>
                <div className="text-[13px] font-bold text-gray-900">
                  {currentSubscription?.durationMonths ? `${currentSubscription.durationMonths} months` : 'Not available'}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-bold text-gray-400 mb-1">Current Period</div>
                <div className="text-[13px] font-bold text-gray-900">
                  {formatDate(currentSubscription?.currentPeriodStart)} - {formatDate(currentSubscription?.currentPeriodEnd)}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-bold text-gray-400 mb-1">Term Ends</div>
                <div className="text-[13px] font-bold text-gray-900">
                  {formatDate(currentSubscription?.subscriptionEndDate)}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Payment Method</h3>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100 mb-4">
                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center shrink-0">
                  <CreditCard size={14} className="text-gray-500" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-gray-900">Managed securely by Stripe</div>
                  <div className="text-[11px] text-gray-500">Card details are not stored in WULFARA.</div>
                </div>
              </div>
            </div>
            {/* <Link to="/subscription" className="w-full text-center text-[13px] font-bold text-blue-600 hover:text-blue-700 hover:underline">
              Manage Plan
            </Link> */}
          </div>
        </div>

        {/* Invoice History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-[#FCFDFE]">
            <h2 className="text-[15px] font-bold text-gray-900">Payment History</h2>
            <button className="text-[12px] font-bold text-gray-500 hover:text-gray-700 flex items-center gap-1.5">
              <Download size={14} /> Download All
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Plan</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoadingInvoices ? (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500 text-[13px]">Loading payment history...</td></tr>
                ) : invoices.length === 0 ? (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500 text-[13px]">No payment history available.</td></tr>
                ) : (
                  invoices.map((invoice) => (
                    <tr key={invoice._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-[13px] font-medium text-gray-900">
                        {new Date(invoice.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-[13px] font-bold text-gray-900">
                        {formatCurrency(invoice.amount, invoice.currency)}
                      </td>
                      <td className="px-6 py-4 text-[13px] text-gray-600 capitalize">
                        {invoice.planName || 'Subscription'} Plan
                        {invoice.paymentType && (
                          <div className="text-[11px] text-gray-400 capitalize">{invoice.paymentType.replace(/_/g, ' ')}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${statusClassName(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a href={invoice.invoiceUrl || '#'} target="_blank" rel="noreferrer" className={`inline-flex items-center justify-center p-2 rounded-lg transition-colors ${
                          invoice.invoiceUrl
                            ? 'text-gray-400 hover:text-[#D1A635] hover:bg-[#D1A635]/10'
                            : 'text-gray-300 pointer-events-none'
                        }`}>
                          <ExternalLink size={16} />
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {isCancelDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border border-gray-200">
            <h2 className="text-lg font-extrabold text-gray-900 mb-3">Cancel Subscription</h2>
            <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
              Your subscription will remain active until the end of your current paid billing period. You will not be charged again after that date.
            </p>
            <div className="rounded-lg bg-gray-50 border border-gray-100 p-4 mb-6">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Access Until</div>
              <div className="text-[14px] font-bold text-gray-900">{formatDate(cancellationAccessUntil)}</div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsCancelDialogOpen(false)}
                disabled={isCancelling}
                className="px-4 py-2 rounded-md border border-gray-200 text-[13px] font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
              >
                Keep Subscription
              </button>
              <button
                type="button"
                onClick={handleConfirmCancellation}
                disabled={isCancelling}
                className="px-4 py-2 rounded-md bg-red-600 text-[13px] font-bold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {isCancelling ? 'Scheduling...' : 'Cancel Subscription'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
