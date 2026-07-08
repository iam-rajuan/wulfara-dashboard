import React from "react";
import { Megaphone, Check } from "lucide-react";

export default function PublicMarketingForm({ data = {}, onChange }) {
  const handleChange = (e) => {
    if (onChange) onChange(e.target.name, e.target.value);
  };

  const name = data.name || "Premium Plan";
  const price = data.basePrice || "4,900";

  return (
    <div id="Visibility" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 scroll-mt-48">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
        <Megaphone size={16} className="text-gray-400" />
        <h2 className="text-[14px] font-extrabold text-[#0F172A]">Public Marketing Configuration</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Side Form */}
        <div className="flex-1 space-y-5">
          <div>
            <label className="block text-[12px] font-bold text-[#0F172A] mb-1.5">Marketing Headline</label>
            <input 
              type="text" 
              name="marketingHeadline"
              value={data.marketingHeadline || ""}
              onChange={handleChange}
              placeholder="The Ultimate Manufacturer Growth Tool"
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#0F172A] mb-1.5">CTA Button Label</label>
            <input 
              type="text" 
              name="ctaLabel"
              value={data.ctaLabel || ""}
              onChange={handleChange}
              placeholder="Choose Plan"
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
              <span className="text-[12px] font-bold text-[#0F172A]">Show Savings Badge</span>
              <div className="bg-[#0F172A] rounded p-0.5 shadow-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
              <span className="text-[12px] font-bold text-[#0F172A]">Strike-through Price</span>
              <div className="bg-[#0F172A] rounded p-0.5 shadow-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Preview */}
        <div id="Preview" className="w-full lg:w-80 flex flex-col items-center justify-center bg-gray-50/50 border border-gray-100 border-dashed rounded-xl p-8 scroll-mt-48">
          <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-4">External Marketplace Preview</p>
          
          <div className="w-full bg-white rounded-xl shadow-lg border-2 border-[#0F172A] overflow-hidden relative">
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#0F172A] text-white text-[9px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-b-md">
              Most Popular
            </div>

            <div className="p-6 pt-8 text-center">
              <h3 className="text-lg font-extrabold text-[#0F172A] mb-2">{name}</h3>
              <div className="flex items-end justify-center gap-1 mb-6">
                <span className="text-3xl font-extrabold text-[#0F172A]">${price}</span>
                <span className="text-[12px] font-bold text-gray-400 mb-1">/ 12 months</span>
              </div>

              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-start gap-2">
                  <Check size={14} className="text-[#D97706] mt-0.5 flex-shrink-0" />
                  <span className="text-[12px] font-bold text-gray-700">Verified Supplier Status</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={14} className="text-[#D97706] mt-0.5 flex-shrink-0" />
                  <span className="text-[12px] font-bold text-gray-700">Priority in Searches</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={14} className="text-[#D97706] mt-0.5 flex-shrink-0" />
                  <span className="text-[12px] font-bold text-gray-700">15 Multi-user Seats</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={14} className="text-[#D97706] mt-0.5 flex-shrink-0" />
                  <span className="text-[12px] font-bold text-gray-700">24/7 Dedicated Support</span>
                </div>
              </div>

              <button className="w-full py-2.5 bg-[#0F172A] text-white rounded-md text-[13px] font-bold hover:bg-gray-800 transition-colors">
                {data.ctaLabel || "Choose Plan"}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
