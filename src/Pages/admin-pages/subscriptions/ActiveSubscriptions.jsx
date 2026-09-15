import React from "react";
import { Link } from "react-router-dom";
import { useGetActiveSubscriptionsQuery } from "../../../redux/features/subscriptions/subscriptionsApi";

const formatDate = (value) => {
  if (!value) {
    return "N/A";
  }

  return new Date(value).toLocaleDateString();
};

const formatNextRenewal = (subscription) => {
  if (subscription?.billingCycleType === "monthly" && subscription?.subscriptionEndDate && !subscription?.nextPaymentDate) {
    return "No further automatic payments";
  }

  return formatDate(subscription?.nextPaymentDate);
};

export default function ActiveSubscriptions() {
  const { data, isLoading, error } = useGetActiveSubscriptionsQuery();
  const subscriptions = data?.data || [];

  return (
    <div className="min-h-screen p-6 mt-16 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans pt-24 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">
            Active Subscriptions
          </h1>
          <p className="text-[14px] font-medium text-gray-500">
            Review suppliers whose listings are active, paid, and publicly available.
          </p>
        </div>

        <Link
          to="/subscriptions"
          className="px-4 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
        >
          Back to Packages
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading active subscriptions...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500 font-bold">Failed to load active subscriptions.</div>
        ) : subscriptions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No active subscriptions found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">Supplier</th>
                  <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">Plan</th>
                  <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">Subscription</th>
                  <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">Payment</th>
                  <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">Billing Cycle</th>
                  <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">Stripe Status</th>
                  <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">Next Renewal</th>
                  <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">Term Ends</th>
                  <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {subscriptions.map((supplier) => {
                  const currentSubscription = supplier.currentSubscription;

                  return (
                    <tr key={supplier._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{supplier.companyName}</div>
                        <div className="text-[12px] text-gray-500">{supplier.user?.email || supplier.contactEmail}</div>
                      </td>
                      <td className="px-6 py-4 text-[13px] font-medium text-gray-700">
                        {supplier.selectedPlan?.name || currentSubscription?.planName || supplier.subscriptionPlan}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700">
                          {supplier.subscriptionStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700">
                          {supplier.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[13px] text-gray-600">{supplier.selectedBillingCycle || currentSubscription?.billingCycle || "N/A"}</td>
                      <td className="px-6 py-4 text-[13px] text-gray-600 capitalize">{currentSubscription?.status?.replace(/_/g, " ") || "Legacy"}</td>
                      <td className="px-6 py-4 text-[13px] text-gray-600">{formatNextRenewal(currentSubscription)}</td>
                      <td className="px-6 py-4 text-[13px] text-gray-600">{formatDate(currentSubscription?.subscriptionEndDate)}</td>
                      <td className="px-6 py-4 text-[13px] text-gray-600">{new Date(supplier.updatedAt).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
