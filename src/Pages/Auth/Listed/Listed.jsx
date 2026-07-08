import React from 'react';
import { Link } from 'react-router-dom';
import { Check, FileText, Pencil, Inbox } from 'lucide-react';

const Listed = () => {
  // Mock dynamic data that would normally come from context/state
  const companyName = "Steel Company B";
  const planName = "Premium Plan";

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans flex items-center justify-center p-6">
      
      <div className="w-full max-w-[950px] flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Column - Main Success Card */}
        <div className="w-full lg:w-[60%] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Top Yellow Border */}
          <div className="h-1.5 w-full bg-[#D1A635]"></div>
          
          <div className="p-8 md:p-12 text-center">
            
            {/* Success Icon */}
            <div className="w-20 h-20 bg-[#F0F5FA] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <div className="w-8 h-8 bg-[#D1A635] rounded-full flex items-center justify-center shadow-sm">
                <Check className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
            </div>

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-white mb-6">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Listing Active</span>
            </div>

            {/* Title & Description */}
            <h1 className="text-3xl md:text-[40px] font-bold text-[#111827] mb-4 leading-tight">
              Your company is now listed on WULFARA.
            </h1>
            <p className="text-[14px] text-gray-500 mb-10 max-w-sm mx-auto leading-relaxed">
              Your payment was successful and your supplier listing is now active. Buyers can now find your company and send RFQs.
            </p>

            {/* Divider */}
            <div className="w-full h-px bg-gray-100 mb-10"></div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="flex-1 max-w-[220px] mx-auto sm:mx-0 py-3 px-6 bg-[#D1A635] hover:bg-[#C2982B] text-black font-bold text-[13px] rounded-md transition-colors shadow-sm">
                View Listing
              </button>
              <button className="flex-1 max-w-[220px] mx-auto sm:mx-0 py-3 px-6 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-bold text-[13px] rounded-md transition-colors shadow-sm">
                Go to Supplier Dashboard
              </button>
            </div>

            {/* Footer Links */}
            <div className="flex justify-center gap-12">
              <button className="flex items-center gap-2 text-[12px] font-medium text-gray-500 hover:text-gray-900 transition-colors">
                <Pencil className="w-3.5 h-3.5" />
                Edit Company
              </button>
              <button className="flex items-center gap-2 text-[12px] font-medium text-gray-500 hover:text-gray-900 transition-colors">
                <Inbox className="w-3.5 h-3.5" />
                Manage RFQs
              </button>
            </div>

          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[40%] flex flex-col gap-6">
          
          {/* Listing Summary Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-gray-500" />
              <h2 className="text-[15px] font-bold text-gray-800">Listing Summary</h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                <span className="text-[13px] text-gray-500">Company</span>
                <span className="text-[13px] font-bold text-gray-900">{companyName}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                <span className="text-[13px] text-gray-500">Plan</span>
                <span className="text-[13px] font-bold text-gray-900">{planName}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                <span className="text-[13px] text-gray-500">Status</span>
                <div className="flex items-center gap-1 text-[#D1A635]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span className="text-[13px] font-bold">Active</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-gray-500">Payment</span>
                <span className="text-[13px] font-bold text-gray-900">Paid</span>
              </div>
            </div>
          </div>

          {/* Next Steps Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-[15px] font-bold text-gray-800 mb-6">Next steps</h2>
            
            <div className="space-y-6">
              
              {/* Step 1 */}
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 shrink-0 rounded-full bg-[#F0F5FA] text-blue-600 flex items-center justify-center text-[11px] font-bold mt-0.5">
                  1
                </div>
                <div>
                  <h3 className="text-[13px] font-bold text-gray-900 mb-1">Complete profile</h3>
                  <p className="text-[12px] text-gray-500 leading-relaxed">
                    Add detailed specifications to attract targeted buyers.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 shrink-0 rounded-full bg-[#F0F5FA] text-blue-600 flex items-center justify-center text-[11px] font-bold mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="text-[13px] font-bold text-gray-900 mb-1">Upload images</h3>
                  <p className="text-[12px] text-gray-500 leading-relaxed">
                    Showcase your facilities and product quality.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 shrink-0 rounded-full bg-[#F0F5FA] text-blue-600 flex items-center justify-center text-[11px] font-bold mt-0.5">
                  3
                </div>
                <div>
                  <h3 className="text-[13px] font-bold text-gray-900 mb-1">Respond to RFQs</h3>
                  <p className="text-[12px] text-gray-500 leading-relaxed">
                    Monitor your inbox to secure new contracts quickly.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Listed;
