import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Award, Info, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

const Cart = () => {
  const [addons, setAddons] = useState({
    heroPlacement: false,
    payPerLead: false
  });

  const basePrice = 38.99;
  const tax = 5.00;
  const heroPrice = 15.00;
  
  const total = basePrice + tax + (addons.heroPlacement ? heroPrice : 0);

  const handleAddonChange = (addonName) => {
    setAddons(prev => ({
      ...prev,
      [addonName]: !prev[addonName]
    }));
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans flex flex-col">
      
      {/* Top Header */}
      <div className="w-full text-center pt-12 pb-6 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">Your Cart</h1>
        <p className="text-[15px] text-gray-500 max-w-md mx-auto leading-relaxed">
          Review your Premium plan and listing period before continuing to payment.
        </p>
      </div>

      {/* Progress Tracker */}
      <div className="w-full max-w-[900px] mx-auto px-6 lg:px-8 mb-12">
        <div className="relative flex justify-between items-center w-full">
          {/* Connecting Lines */}
          <div className="absolute top-[14px] left-[5%] right-[25%] h-[2px] bg-[#D1A635] -z-10"></div>
          <div className="absolute top-[14px] left-[75%] right-[5%] h-[2px] bg-gray-200 -z-10"></div>
          
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
            <div className="w-7 h-7 rounded-full bg-[#D1A635] flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-[11px] font-bold text-gray-800 absolute top-9 whitespace-nowrap">Subscription</span>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center gap-2 relative z-10 bg-[#F9FAFB] px-2">
            <div className="w-7 h-7 rounded-full bg-white border-2 border-[#D1A635] flex items-center justify-center">
              <span className="text-[12px] font-bold text-[#D1A635]">4</span>
            </div>
            <span className="text-[11px] font-bold text-gray-900 absolute top-9 whitespace-nowrap">Payment</span>
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

      {/* Main Content Layout */}
      <div className="flex-1 w-full max-w-[1000px] mx-auto px-6 lg:px-8 pb-24 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Column */}
        <div className="w-full lg:w-[60%] space-y-6">
          
          {/* Plan Details Card */}
          <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
            
            <div className="flex justify-between items-start mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="bg-[#EBF0FA] w-10 h-10 rounded-md flex items-center justify-center shrink-0 mt-1">
                  <Award className="w-5 h-5 text-[#D1A635]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Premium Plan</h2>
                  <p className="text-[13px] text-gray-500">12-Month Featured Listing</p>
                </div>
              </div>
              <a href="/subscription" className="text-[13px] font-bold text-blue-600 hover:text-blue-700">Edit Plan</a>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D1A635] shrink-0" />
                <span className="text-[13.5px] text-gray-800 leading-relaxed">Top-tier visibility in relevant industrial directories.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D1A635] shrink-0" />
                <span className="text-[13.5px] text-gray-800 leading-relaxed">Unlimited RFQ responses and priority matching.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D1A635] shrink-0" />
                <span className="text-[13.5px] text-gray-800 leading-relaxed">Advanced analytics dashboard for buyer insights.</span>
              </div>
            </div>

            {/* Optional Add-ons */}
            <div className="bg-[#F8F9FA] rounded-xl p-6 border border-gray-100">
              <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-5">Optional Listing Add-ons</h3>
              
              <div className="space-y-5">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      type="checkbox"
                      checked={addons.heroPlacement}
                      onChange={() => handleAddonChange('heroPlacement')}
                      className="w-4 h-4 text-[#D1A635] bg-white border-gray-300 rounded focus:ring-[#D1A635]"
                    />
                  </div>
                  <div>
                    <div className="text-[13.5px] font-bold text-gray-900 group-hover:text-black transition-colors">Featured Hero Placement (+$15.00/mo)</div>
                    <div className="text-[12.5px] text-gray-500 mt-1">Pin your listing to the top of category searches.</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      type="checkbox"
                      checked={addons.payPerLead}
                      onChange={() => handleAddonChange('payPerLead')}
                      className="w-4 h-4 text-[#D1A635] bg-white border-gray-300 rounded focus:ring-[#D1A635]"
                    />
                  </div>
                  <div>
                    <div className="text-[13.5px] font-bold text-gray-900 group-hover:text-black transition-colors">Pay-per-Lead Guarantee</div>
                    <div className="text-[12.5px] text-gray-500 mt-1">Only pay additional fees when verified RFQs are received.</div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Guarantee Card */}
          <div className="bg-[#FCFDFE] p-6 rounded-xl border border-[#EEF2F6] flex gap-4">
            <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[13px] font-bold text-gray-900 mb-1">5-Day Cancellation Guarantee</h4>
              <p className="text-[12px] text-gray-500 leading-relaxed">
                You may cancel your listing within 5 business days for a full refund if our platform does not meet your industrial sourcing requirements.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column - Order Summary */}
        <div className="w-full lg:w-[40%] sticky top-8">
          <div className="bg-white border border-gray-200 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8">
            
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-gray-600">Premium Plan (12 Months)</span>
                <span className="font-bold text-gray-900">${basePrice.toFixed(2)} <span className="font-normal text-[12px] text-gray-500">/mo</span></span>
              </div>
              
              {addons.heroPlacement && (
                <div className="flex justify-between items-center text-[14px]">
                  <span className="text-gray-600">Featured Hero Placement</span>
                  <span className="font-bold text-gray-900">${heroPrice.toFixed(2)} <span className="font-normal text-[12px] text-gray-500">/mo</span></span>
                </div>
              )}

              <div className="flex justify-between items-center text-[14px]">
                <span className="text-gray-600">Setup Fee</span>
                <span className="font-medium text-gray-900">Waived</span>
              </div>
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-gray-600">Taxes</span>
                <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6 mb-6">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[16px] font-bold text-gray-900">Total Due Today</span>
                <span className="text-[24px] font-bold text-gray-900">${total.toFixed(2)}</span>
              </div>
              <div className="text-right text-[11px] text-gray-500">Billed monthly thereafter.</div>
            </div>

            <button className="w-full bg-[#D1A635] hover:bg-[#C2982B] text-black font-bold text-[14px] py-3.5 px-4 rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 mb-4">
              Continue to Payment
              <ArrowRight className="w-4 h-4 font-bold" />
            </button>

            <div className="text-center mb-6">
              <button className="text-[12.5px] font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all">
                Have a promotional code?
              </button>
            </div>

            {/* Promo Box */}
            <div className="bg-[#F0F5FA] rounded-lg p-5 text-center mb-6 border border-[#E1EBF5]">
              <div className="text-[13px] font-bold text-gray-900 mb-1">Looking for better value?</div>
              <div className="text-[12px] text-gray-600 leading-relaxed">
                Switch to the 24-month plan and save 15% annually. 
                <button className="text-blue-600 font-bold ml-1 hover:underline">Switch Plan</button>
              </div>
            </div>

            {/* Secure Checkout Note */}
            <div className="flex flex-col items-center justify-center text-center gap-2">
              <div className="flex items-center gap-1.5 text-gray-400">
                <Lock className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Secure Checkout</span>
              </div>
              <p className="text-[11px] text-gray-400 max-w-[200px] leading-snug">
                Payments processed securely. We do not store your credit card information.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Cart;
