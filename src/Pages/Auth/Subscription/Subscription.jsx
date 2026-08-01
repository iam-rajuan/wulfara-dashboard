import React, { useState } from 'react';
import { Check, Store, Star, TrendingUp, HeadphonesIcon, Lock, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Subscription = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState('premium');

  const pricingData = {
    'monthly': {
      basic: 49,
      premium: 299,
      pro: 129,
      suffix: '/mo'
    },
    'multi-month': {
      basic: 39,
      premium: 249,
      pro: 99,
      suffix: '/mo (billed annually)'
    }
  };

  const currentPricing = pricingData[billingCycle];

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans flex flex-col">

      {/* Top Header */}
      <div className="w-full text-center pt-12 pb-6 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">Plans and Pricing</h1>
        <p className="text-[15px] text-gray-500">Pick the plan that checks your boxes.</p>
      </div>

      {/* Progress Tracker */}
      {/* Progress Tracker */}
      <div className="relative flex justify-between items-start w-full max-w-[900px] mb-20 mx-auto px-4 md:px-8">
        {/* Connecting Lines */}
        <div className="absolute top-[40px] left-[5%] right-[5%] flex z-0">
          <div className="w-1/4 border-t-4  border-[#D4AF37]"></div>
          <div className="w-1/4 border-t-4 border-[#D4AF37]"></div>
          <div className="w-1/4 border-t-2 border-[#C5C6CD]"></div>
          <div className="w-1/4 border-t-2 border-[#C5C6CD]"></div>
        </div>

        {/* Step 1 */}
        <div className="flex flex-col items-center relative z-10 bg-[#F9FAFB] px-2">
          <div className="w-12 h-12 rounded-2xl bg-[#D1A635] flex items-center justify-center mb-3">
            <span className="text-[15px] font-bold text-white">1</span>
          </div>
          <span className="text-[13px] font-bold text-[#000000] whitespace-nowrap">Industry</span>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center relative z-10 bg-[#F9FAFB] px-2">
          <div className="w-12 h-12 rounded-2xl bg-[#D1A635] border-2 border-[#D1A635] flex items-center justify-center mb-3">
            <span className="text-[15px] font-bold text-white">2</span>
          </div>
          <span className="text-[13px] font-extrabold text-[#000000] whitespace-nowrap">Company Info</span>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center relative z-10 bg-[#F9FAFB] px-2">
          <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#C5C6CD] flex items-center justify-center mb-3">
            <span className="text-[15px] font-bold text-[#D1A635]">3</span>
          </div>
          <span className="text-[13px] font-bold text-[#000000] whitespace-nowrap">Subscription</span>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col items-center relative z-10 bg-[#F9FAFB] px-2">
          <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#C5C6CD] flex items-center justify-center mb-3">
            <span className="text-[15px] font-bold text-[#9CA3AF]">4</span>
          </div>
          <span className="text-[13px] font-bold text-[#000000] whitespace-nowrap">Payment</span>
        </div>

        {/* Step 5 */}
        <div className="flex flex-col items-center relative z-10 bg-[#F9FAFB] px-2">
          <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#C5C6CD] flex items-center justify-center mb-3">
            <span className="text-[15px] font-bold text-[#9CA3AF]">5</span>
          </div>
          <span className="text-[13px] font-bold text-[#000000] whitespace-nowrap">Listed</span>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-16">
        <div className="flex items-center bg-[#EBF0FA] p-1 rounded-md border border-[#D1E0F5]">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-8 py-2 rounded text-[13px] font-medium transition-all ${billingCycle === 'monthly' ? 'bg-white shadow-sm text-[#111827]' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('multi-month')}
            className={`px-8 py-2 rounded text-[13px] font-medium transition-all ${billingCycle === 'multi-month' ? 'bg-white shadow-sm text-[#111827]' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Multi-month listing
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 w-full mb-20">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-stretch md:items-center justify-center">

          {/* Basic Plan */}
          <div 
            onClick={() => setSelectedPlan('basic')}
            className={`flex-1 bg-white rounded-xl p-8 flex flex-col cursor-pointer transition-all duration-300 relative ${
              selectedPlan === 'basic'
                ? 'border-2 border-[#D1A635] shadow-[0_8px_30px_rgb(0,0,0,0.08)] md:-mt-8 md:mb-8 z-10'
                : 'border border-gray-200 shadow-sm hover:border-[#D1A635]/50 z-0'
            }`}
          >
            {selectedPlan === 'basic' && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D1A635] text-gray-900 text-[11px] font-bold px-4 py-1 rounded-full whitespace-nowrap shadow-sm">
                SELECTED
              </div>
            )}
            <div className="bg-[#EBF0FA] w-10 h-10 rounded-md flex items-center justify-center mb-6">
              <Store className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Basic</h2>
            <p className="text-[13px] text-gray-500 mb-6 min-h-[40px]">Standard directory listing for regional visibility.</p>
            <div className="flex items-end gap-1 mb-8">
              <span className="text-4xl font-bold text-gray-900">${currentPricing.basic}</span>
              <span className="text-[13px] text-gray-500 font-medium mb-1">{currentPricing.suffix}</span>
            </div>

            <div className="space-y-4 flex-1 mb-8">
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#D1A635] shrink-0 mt-0.5" strokeWidth={selectedPlan === 'basic' ? 3 : 2} />
                <span className={`text-[13px] ${selectedPlan === 'basic' ? 'text-gray-900 font-bold' : 'text-gray-700'}`}>Standard Company Profile</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#D1A635] shrink-0 mt-0.5" />
                <span className="text-[13px] text-gray-700">Up to 5 Product Listings</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#D1A635] shrink-0 mt-0.5" />
                <span className="text-[13px] text-gray-700">Basic Search Visibility</span>
              </div>
            </div>

            {selectedPlan === 'basic' ? (
              <Link to="/cart" state={{ planId: selectedPlan, billingCycle }} className="mt-auto">
                <button className="w-full py-3 px-4 bg-[#D1A635] hover:bg-[#C2982B] text-gray-900 font-bold text-[13px] rounded-md transition-colors shadow-sm">
                  Continue with Basic
                </button>
              </Link>
            ) : (
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedPlan('basic'); }}
                className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-800 font-medium text-[13px] rounded-md hover:bg-gray-50 transition-colors mt-auto"
              >
                Choose Basic
              </button>
            )}
          </div>

          {/* Premium Plan (Highlighted) */}
          <div 
            onClick={() => setSelectedPlan('premium')}
            className={`flex-1 bg-white rounded-xl p-8 flex flex-col cursor-pointer transition-all duration-300 relative ${
              selectedPlan === 'premium'
                ? 'border-2 border-[#D1A635] shadow-[0_8px_30px_rgb(0,0,0,0.08)] md:-mt-8 md:mb-8 z-10'
                : 'border border-gray-200 shadow-sm hover:border-[#D1A635]/50 z-0'
            }`}
          >
            {selectedPlan === 'premium' ? (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D1A635] text-gray-900 text-[11px] font-bold px-4 py-1 rounded-full whitespace-nowrap shadow-sm">
                RECOMMENDED
              </div>
            ) : (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gray-200 text-gray-600 text-[11px] font-bold px-4 py-1 rounded-full whitespace-nowrap shadow-sm">
                POPULAR
              </div>
            )}

            <div className="bg-[#FFF9E6] w-10 h-10 rounded-md flex items-center justify-center mb-6">
              <Star className="w-5 h-5 text-[#D1A635] fill-current" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Premium</h2>
            <p className="text-[13px] text-gray-500 mb-6 min-h-[40px]">Top placement and featured listing for maximum global reach.</p>
            <div className="flex items-end gap-1 mb-8">
              <span className="text-4xl font-bold text-gray-900">${currentPricing.premium}</span>
              <span className="text-[13px] text-gray-500 font-medium mb-1">{currentPricing.suffix}</span>
            </div>

            <div className="space-y-4 flex-1 mb-8">
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#D1A635] shrink-0 mt-0.5" strokeWidth={selectedPlan === 'premium' ? 3 : 2} />
                <span className={`text-[13px] ${selectedPlan === 'premium' ? 'text-gray-900 font-bold' : 'text-gray-700'}`}>Featured Company Profile</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#D1A635] shrink-0 mt-0.5" />
                <span className="text-[13px] text-gray-700">Unlimited Product Listings</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#D1A635] shrink-0 mt-0.5" />
                <span className="text-[13px] text-gray-700">Priority Search Placement</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#D1A635] shrink-0 mt-0.5" />
                <span className="text-[13px] text-gray-700">Dedicated Account Manager</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#D1A635] shrink-0 mt-0.5" />
                <span className="text-[13px] text-gray-700">Advanced Analytics</span>
              </div>
            </div>

            {selectedPlan === 'premium' ? (
              <Link to="/cart" state={{ planId: selectedPlan, billingCycle }} className="mt-auto">
                <button className="w-full py-3 px-4 bg-[#D1A635] hover:bg-[#C2982B] text-gray-900 font-bold text-[13px] rounded-md transition-colors shadow-sm">
                  Continue with Premium
                </button>
              </Link>
            ) : (
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedPlan('premium'); }}
                className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-800 font-medium text-[13px] rounded-md hover:bg-gray-50 transition-colors mt-auto"
              >
                Choose Premium
              </button>
            )}
          </div>

          {/* Pro Plan */}
          <div 
            onClick={() => setSelectedPlan('pro')}
            className={`flex-1 bg-white rounded-xl p-8 flex flex-col cursor-pointer transition-all duration-300 relative ${
              selectedPlan === 'pro'
                ? 'border-2 border-[#D1A635] shadow-[0_8px_30px_rgb(0,0,0,0.08)] md:-mt-8 md:mb-8 z-10'
                : 'border border-gray-200 shadow-sm hover:border-[#D1A635]/50 z-0'
            }`}
          >
            {selectedPlan === 'pro' && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D1A635] text-gray-900 text-[11px] font-bold px-4 py-1 rounded-full whitespace-nowrap shadow-sm">
                SELECTED
              </div>
            )}
            <div className="bg-[#EBF0FA] w-10 h-10 rounded-md flex items-center justify-center mb-6">
              <TrendingUp className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Pro</h2>
            <p className="text-[13px] text-gray-500 mb-6 min-h-[40px]">Better visibility for growing industrial suppliers.</p>
            <div className="flex items-end gap-1 mb-8">
              <span className="text-4xl font-bold text-gray-900">${currentPricing.pro}</span>
              <span className="text-[13px] text-gray-500 font-medium mb-1">{currentPricing.suffix}</span>
            </div>

            <div className="space-y-4 flex-1 mb-8">
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#D1A635] shrink-0 mt-0.5" strokeWidth={selectedPlan === 'pro' ? 3 : 2} />
                <span className={`text-[13px] ${selectedPlan === 'pro' ? 'text-gray-900 font-bold' : 'text-gray-700'}`}>Enhanced Company Profile</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#D1A635] shrink-0 mt-0.5" />
                <span className="text-[13px] text-gray-700">Up to 25 Product Listings</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#D1A635] shrink-0 mt-0.5" />
                <span className="text-[13px] text-gray-700">Better Search Visibility</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#D1A635] shrink-0 mt-0.5" />
                <span className="text-[13px] text-gray-700">RFQ Lead Generation</span>
              </div>
            </div>

            {selectedPlan === 'pro' ? (
              <Link to="/cart" state={{ planId: selectedPlan, billingCycle }} className="mt-auto">
                <button className="w-full py-3 px-4 bg-[#D1A635] hover:bg-[#C2982B] text-gray-900 font-bold text-[13px] rounded-md transition-colors shadow-sm">
                  Continue with Pro
                </button>
              </Link>
            ) : (
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedPlan('pro'); }}
                className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-800 font-medium text-[13px] rounded-md hover:bg-gray-50 transition-colors mt-auto"
              >
                Choose Pro
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Footer Features */}
      <div className="mt-auto py-10 w-full flex flex-col md:flex-row justify-center items-start md:items-center gap-8 md:gap-16 px-6 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <div className="bg-[#FFF9E6] p-2 rounded-md">
            <HeadphonesIcon className="w-5 h-5 text-[#D1A635]" />
          </div>
          <div>
            <div className="text-[12px] font-bold text-gray-900">24/7 Support</div>
            <div className="text-[11px] text-gray-500">Dedicated industrial care</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-[#FFF9E6] p-2 rounded-md">
            <Lock className="w-5 h-5 text-[#D1A635]" />
          </div>
          <div>
            <div className="text-[12px] font-bold text-gray-900">Secure Payment</div>
            <div className="text-[11px] text-gray-500">Powered by Stripe</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-[#FFF9E6] p-2 rounded-md">
            <XCircle className="w-5 h-5 text-[#D1A635]" />
          </div>
          <div>
            <div className="text-[12px] font-bold text-gray-900">Cancel Anytime</div>
            <div className="text-[11px] text-gray-500">No long-term contracts</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Subscription;
