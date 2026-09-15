import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AlertTriangle, Check, FileText, Inbox, LoaderCircle } from 'lucide-react';
import { useGetOnboardingStatusQuery } from '../../../redux/features/listings/listingsApi';
import { useLazyGetCheckoutStatusQuery } from '../../../redux/features/subscriptions/subscriptionsApi';
import { appendOnboardingContext, buildOnboardingQueryString } from '../../../utils/onboarding';

const POLL_INTERVAL_MS = 2000;
const MAX_POLL_ATTEMPTS = 15;

const Listed = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useSelector((state) => state.auth);
  const supplierId = user?.role === 'admin' ? searchParams.get('supplierId') : undefined;
  const sessionId = searchParams.get('session_id');
  const { data: onboardingResponse, isLoading, refetch } = useGetOnboardingStatusQuery(supplierId, {
    skip: !user,
    refetchOnMountOrArgChange: true,
  });
  const [checkCheckoutStatus, { data: checkoutStatusResponse }] = useLazyGetCheckoutStatusQuery();
  const onboarding = onboardingResponse?.data?.onboarding;
  const supplier = onboardingResponse?.data?.supplier;
  const [pollAttempts, setPollAttempts] = useState(0);
  const [status, setStatus] = useState(sessionId ? 'processing' : 'idle');

  const isTerminalStatus = useMemo(
    () => ['success', 'timeout', 'failed', 'expired', 'unauthorized'].includes(status),
    [status]
  );
  const isBackendPaidActive =
    (supplier?.paymentStatus === 'paid' && supplier?.subscriptionStatus === 'active') ||
    (checkoutStatusResponse?.paymentStatus === 'paid' && checkoutStatusResponse?.subscriptionStatus === 'active');

  useEffect(() => {
    if (!user) {
      navigate(`/sign-in${buildOnboardingQueryString(searchParams)}`, { replace: true });
    }
  }, [navigate, searchParams, user]);

  useEffect(() => {
    if (!user || !sessionId || isTerminalStatus) {
      return;
    }

    let pollTimer;
    let cancelled = false;

    if (pollAttempts >= MAX_POLL_ATTEMPTS) {
      setStatus('timeout');
      return;
    }

    setStatus('processing');

    checkCheckoutStatus({ sessionId, supplierId })
      .unwrap()
      .then((response) => {
        if (cancelled) {
          return;
        }

        if (response?.status === 'paid') {
          setStatus('success');
          refetch();
          return;
        }

        if (response?.status === 'failed') {
          setStatus('failed');
          return;
        }

        if (response?.status === 'expired') {
          setStatus('expired');
          return;
        }

        pollTimer = window.setTimeout(() => {
          setPollAttempts((current) => current + 1);
          refetch();
        }, POLL_INTERVAL_MS);
      })
      .catch((error) => {
        if (cancelled) {
          return;
        }

        const errorStatus = error?.data?.status;
        if (errorStatus === 'unauthorized') {
          setStatus('unauthorized');
          return;
        }

        if (errorStatus === 'invalid_session') {
          setStatus('expired');
          return;
        }

        pollTimer = window.setTimeout(() => {
          setPollAttempts((current) => current + 1);
          refetch();
        }, POLL_INTERVAL_MS);
      });

    return () => {
      cancelled = true;
      if (pollTimer) {
        window.clearTimeout(pollTimer);
      }
    };
  }, [checkCheckoutStatus, isTerminalStatus, navigate, pollAttempts, refetch, sessionId, supplierId, user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (isBackendPaidActive) {
      setStatus('success');
      navigate('/dashboard', { replace: true });
      return;
    }

    if (!sessionId && onboarding?.isComplete) {
      setStatus('success');
      navigate('/dashboard', { replace: true });
    }
  }, [isBackendPaidActive, navigate, onboarding?.isComplete, sessionId, user]);

  useEffect(() => {
    if (status !== 'success') {
      return;
    }

    const redirectTimer = window.setTimeout(() => {
      navigate(checkoutStatusResponse?.redirectTo || '/dashboard', { replace: true });
    }, 800);

    return () => window.clearTimeout(redirectTimer);
  }, [checkoutStatusResponse?.redirectTo, navigate, status]);

  useEffect(() => {
    if (!sessionId || isLoading || !user) {
      return;
    }

    if (onboarding?.isComplete === false && onboarding?.nextRoute && status === 'idle') {
      navigate(appendOnboardingContext(onboarding.nextRoute, searchParams), { replace: true });
    }
  }, [isLoading, navigate, onboarding, searchParams, sessionId, status, user]);

  if (!user) {
    return null;
  }

  const isProcessing = status === 'processing';
  const isSuccess = status === 'success' || (!sessionId && onboarding?.isComplete);
  const isTimeout = status === 'timeout';
  const isFailed = status === 'failed' || status === 'expired' || status === 'unauthorized';
  const summaryStatus = isSuccess ? 'Active' : 'Pending Confirmation';
  const paymentLabel = isSuccess ? 'Paid' : isFailed ? 'Not Confirmed' : 'Processing';
  const paymentClass = isSuccess ? 'text-emerald-700' : isFailed ? 'text-red-700' : 'text-amber-700';

  const handleRetry = () => {
    setStatus('processing');
    setPollAttempts(0);
    if (sessionId) {
      checkCheckoutStatus({ sessionId, supplierId });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans flex items-center justify-center p-6">
      <div className="w-full max-w-[950px] flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full lg:w-[60%] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className={`h-1.5 w-full ${isTimeout ? 'bg-amber-500' : 'bg-[#D1A635]'}`}></div>
          <div className="p-8 md:p-12 text-center">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 ${isTimeout ? 'bg-amber-50' : 'bg-[#F0F5FA]'}`}>
              {isProcessing ? (
                <LoaderCircle className="w-8 h-8 text-[#D1A635] animate-spin" />
              ) : isTimeout || isFailed ? (
                <AlertTriangle className="w-8 h-8 text-amber-600" />
              ) : (
                <div className="w-8 h-8 bg-[#D1A635] rounded-full flex items-center justify-center shadow-sm">
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
              )}
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-white mb-6">
              <div className={`w-1.5 h-1.5 rounded-full ${isTimeout ? 'bg-amber-500' : 'bg-blue-600'}`}></div>
              <span className={`text-[11px] font-bold uppercase tracking-wider ${isTimeout ? 'text-amber-700' : 'text-blue-600'}`}>
                {isProcessing ? 'Payment Processing' : isTimeout ? 'Verification Delayed' : 'Listing Active'}
              </span>
            </div>

            <h1 className="text-3xl md:text-[40px] font-bold text-[#111827] mb-4 leading-tight">
              {isProcessing && 'Confirming your payment and activating your listing...'}
              {isSuccess && 'Your company is now listed on WULFARA.'}
              {isTimeout && 'We are still confirming your payment.'}
              {isFailed && 'We could not confirm this checkout session.'}
            </h1>

            <p className="text-[14px] text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
              {isProcessing && 'Stripe returned successfully. We are verifying the Checkout Session with the backend and activating your supplier listing.'}
              {isSuccess && 'Your payment was successful and your supplier listing is active. Redirecting you to your Supplier Dashboard now.'}
              {isTimeout && 'Payment verification is taking longer than expected. Refresh or retry; this does not mean your payment failed.'}
              {isFailed && (checkoutStatusResponse?.message || 'Please retry with the same session or contact support if this continues.')}
            </p>

            {(isTimeout || isFailed) && (
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex items-center justify-center rounded-md bg-[#111827] px-5 py-2.5 text-sm font-bold text-white hover:bg-black transition-colors"
              >
                Retry verification
              </button>
            )}

            <div className="w-full h-px bg-gray-100 mb-8"></div>
          </div>
        </div>

        <div className="w-full lg:w-[40%] flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-gray-500" />
              <h2 className="text-[15px] font-bold text-gray-800">Listing Summary</h2>
            </div>

            {isLoading ? (
              <div className="py-6 text-gray-500">Loading listing summary...</div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                  <span className="text-[13px] text-gray-500">Company</span>
                  <span className="text-[13px] font-bold text-gray-900">{supplier?.companyName || 'Supplier Company'}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                  <span className="text-[13px] text-gray-500">Plan</span>
                  <span className="text-[13px] font-bold text-gray-900">{supplier?.selectedPlan?.name || supplier?.subscriptionPlan || 'Selected Plan'}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                  <span className="text-[13px] text-gray-500">Status</span>
                  <span className={`text-[13px] font-bold ${isTimeout ? 'text-amber-700' : 'text-[#D1A635]'}`}>
                    {summaryStatus}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Payment</span>
                  <span className={`text-[13px] font-bold ${paymentClass}`}>{paymentLabel}</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-[15px] font-bold text-gray-800 mb-6">Next steps</h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 shrink-0 rounded-full bg-[#F0F5FA] text-blue-600 flex items-center justify-center text-[11px] font-bold mt-0.5">1</div>
                <div>
                  <h3 className="text-[13px] font-bold text-gray-900 mb-1">Complete profile</h3>
                  <p className="text-[12px] text-gray-500 leading-relaxed">Add detailed specifications to attract targeted buyers.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 shrink-0 rounded-full bg-[#F0F5FA] text-blue-600 flex items-center justify-center text-[11px] font-bold mt-0.5">2</div>
                <div>
                  <h3 className="text-[13px] font-bold text-gray-900 mb-1">Upload images</h3>
                  <p className="text-[12px] text-gray-500 leading-relaxed">Showcase your facilities and product quality.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 shrink-0 rounded-full bg-[#F0F5FA] text-blue-600 flex items-center justify-center text-[11px] font-bold mt-0.5">3</div>
                <div>
                  <h3 className="text-[13px] font-bold text-gray-900 mb-1">Respond to RFQs</h3>
                  <p className="text-[12px] text-gray-500 leading-relaxed">Monitor your inbox to secure new contracts quickly.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/rfqs')}
                className="flex items-center gap-2 text-[12px] font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Inbox className="w-3.5 h-3.5" />
                Manage RFQs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listed;
