import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Award, Info, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useGetOnboardingStatusQuery } from '../../../redux/features/listings/listingsApi';
import { appendOnboardingContext, buildOnboardingQueryString } from '../../../utils/onboarding';

const Cart = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useSelector((state) => state.auth);
  const supplierId = user?.role === 'admin' ? searchParams.get('supplierId') : undefined;
  const { data: onboardingResponse, isLoading } = useGetOnboardingStatusQuery(supplierId, { skip: !user });
  const supplier = onboardingResponse?.data?.supplier;
  const selectedPlan = supplier?.selectedPlan;
  const basePrice = selectedPlan?.price || 0;
  const total = basePrice;

  useEffect(() => {
    if (!user) {
      navigate(`/sign-in${buildOnboardingQueryString(searchParams)}`);
    }
  }, [navigate, searchParams, user]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans flex flex-col">
      <div className="w-full text-center pt-12 pb-6 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">Your Cart</h1>
        <p className="text-[15px] text-gray-500 max-w-md mx-auto leading-relaxed">
          Review your supplier listing package before continuing to payment.
        </p>
      </div>

      <div className="flex-1 w-full max-w-[1000px] mx-auto px-6 lg:px-8 pb-24 flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:w-[60%] space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
            {isLoading ? (
              <div className="py-12 text-center text-gray-500">Loading selected plan...</div>
            ) : selectedPlan ? (
              <>
                <div className="flex justify-between items-start mb-8 pb-6 border-b border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#EBF0FA] w-10 h-10 rounded-md flex items-center justify-center shrink-0 mt-1">
                      <Award className="w-5 h-5 text-[#D1A635]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedPlan.name}</h2>
                      <p className="text-[13px] text-gray-500">{supplier?.selectedBillingCycle || selectedPlan.billingCycle || 'Supplier Listing'}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate(appendOnboardingContext('/subscription', searchParams))}
                    className="text-[13px] font-bold text-blue-600 hover:text-blue-700"
                  >
                    Edit Plan
                  </button>
                </div>

                <div className="space-y-4 mb-8">
                  {(selectedPlan.features || []).map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#D1A635] shrink-0" />
                      <span className="text-[13.5px] text-gray-800 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-[#F8F9FA] rounded-xl p-6 border border-gray-100">
                  <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Payment Notice</h3>
                  <p className="text-[13px] text-gray-600 leading-relaxed">
                    The payable total is determined by the backend pricing plan only. Optional add-ons are not part of this checkout flow.
                  </p>
                </div>
              </>
            ) : (
              <div className="py-6 text-gray-500">Select a subscription plan before continuing to checkout.</div>
            )}
          </div>

          <div className="bg-[#FCFDFE] p-6 rounded-xl border border-[#EEF2F6] flex gap-4">
            <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[13px] font-bold text-gray-900 mb-1">5-Day Cancellation Guarantee</h4>
              <p className="text-[12px] text-gray-500 leading-relaxed">
                You may cancel your listing within 5 business days for a full refund if our platform does not meet your requirements.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[40%] sticky top-8">
          <div className="bg-white border border-gray-200 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-gray-600">{selectedPlan?.name || 'Selected Plan'}</span>
                <span className="font-bold text-gray-900">${basePrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6 mb-6">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[16px] font-bold text-gray-900">Total Due Today</span>
                <span className="text-[24px] font-bold text-gray-900">${total.toFixed(2)}</span>
              </div>
              <div className="text-right text-[11px] text-gray-500">{supplier?.selectedBillingCycle || 'Billing cycle selected in previous step'}</div>
            </div>

            <button
              type="button"
              onClick={() => navigate(appendOnboardingContext('/listing-period', searchParams))}
              disabled={!selectedPlan}
              className="w-full bg-[#D1A635] hover:bg-[#C2982B] text-black font-bold text-[14px] py-3.5 px-4 rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 mb-4 disabled:opacity-60"
            >
              Continue to Payment
              <ArrowRight className="w-4 h-4 font-bold" />
            </button>

            <div className="flex flex-col items-center justify-center text-center gap-2">
              <div className="flex items-center gap-1.5 text-gray-400">
                <Lock className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Secure Checkout</span>
              </div>
              <p className="text-[11px] text-gray-400 max-w-[200px] leading-snug">
                Payments are processed securely through Stripe. We do not store your credit card information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
