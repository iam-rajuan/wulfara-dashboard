import React, { useState } from 'react';
import { Check, Store, Star, TrendingUp, HeadphonesIcon, Lock, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Subscription = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

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
      <div className="w-full max-w-[900px] mx-auto px-6 lg:px-8 mb-12">
        <div className="relative flex justify-between items-center w-full">
          {/* Connecting Lines */}
          <div className="absolute top-[14px] left-[5%] right-[50%] h-[2px] bg-[#D1A635] -z-10"></div>
          <div className="absolute top-[14px] left-[50%] right-[5%] h-[2px] bg-gray-200 -z-10"></div>
          
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-2 relative z-10 bg-[#F9FAFB] px-2">
            <div className="w-7 h-7 rounded-full bg-[#D1A635] flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-[11px] font-bold text-gray-800 absolute top-9 whitespace-nowrap">Industry</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-2 relative z-10 bg-[#F9FAFB] px-2">
            <div className="w-7 h-7 rounded-full bg-[#D1A635] flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-[11px] font-bold text-gray-800 absolute top-9 whitespace-nowrap">Company Info</span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-2 relative z-10 bg-[#F9FAFB] px-2">
            <div className="w-7 h-7 rounded-full bg-white border-2 border-[#D1A635] flex items-center justify-center">
              <span className="text-[12px] font-bold text-[#D1A635]">3</span>
            </div>
            <span className="text-[11px] font-bold text-gray-900 absolute top-9 whitespace-nowrap">Subscription</span>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center gap-2 relative z-10 bg-[#F9FAFB] px-2">
            <div className="w-7 h-7 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
              <span className="text-[12px] font-bold text-gray-400">4</span>
            </div>
            <span className="text-[11px] font-bold text-gray-400 absolute top-9 whitespace-nowrap">Payment</span>
          </div>

          {/* Step 5 */}
          <div className="flex flex-col items-center gap-2 relative z-10 bg-[#F9FAFB] px-2">
            <div className="w-7 h-7 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
              <span className="text-[12px] font-bold text-gray-400">5</span>
            </div>
            <span className="text-[11px] font-bold text-gray-400 absolute top-9 whitespace-nowrap">Listed</span>
          </div>
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
          <div className="flex-1 bg-white rounded-xl border border-gray-200 p-8 flex flex-col shadow-sm">
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
                <Check className="w-4 h-4 text-[#D1A635] shrink-0 mt-0.5" />
                <span className="text-[13px] text-gray-700">Standard Company Profile</span>
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
            
            <Link to="/cart">
              <button className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-800 font-medium text-[13px] rounded-md hover:bg-gray-50 transition-colors">
                Choose Basic
              </button>
            </Link>
          </div>

          {/* Premium Plan (Highlighted) */}
          <div className="flex-1 bg-white rounded-xl border-2 border-[#D1A635] p-8 flex flex-col relative shadow-[0_8px_30px_rgb(0,0,0,0.08)] md:-mt-8 md:mb-8">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D1A635] text-gray-900 text-[11px] font-bold px-4 py-1 rounded-full whitespace-nowrap shadow-sm">
              RECOMMENDED
            </div>
            
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
                <Check className="w-4 h-4 text-[#D1A635] shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-[13px] text-gray-900 font-bold">Featured Company Profile</span>
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
            
            <Link to="/cart">
              <button className="w-full py-3 px-4 bg-[#D1A635] hover:bg-[#C2982B] text-gray-900 font-bold text-[13px] rounded-md transition-colors shadow-sm">
                Choose Premium
              </button>
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="flex-1 bg-white rounded-xl border border-gray-200 p-8 flex flex-col shadow-sm">
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
                <Check className="w-4 h-4 text-[#D1A635] shrink-0 mt-0.5" />
                <span className="text-[13px] text-gray-700">Enhanced Company Profile</span>
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
            
            <Link to="/cart">
              <button className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-800 font-medium text-[13px] rounded-md hover:bg-gray-50 transition-colors">
                Choose Pro
              </button>
            </Link>
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
