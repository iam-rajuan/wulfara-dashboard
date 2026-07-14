import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Info, CheckCircle2 } from 'lucide-react';

const ListingPeriod = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('16 Months');

  const periods = [
    {
      id: '16 Months',
      months: '16 Months',
      badge: 'STARTER COMMITMENT',
      badgeColor: 'bg-[#E8F0FE] text-blue-700',
      desc: 'Standard listing duration for new suppliers.'
    },
    {
      id: '25 Months',
      months: '25 Months',
      badge: 'BETTER SAVINGS',
      badgeColor: 'bg-[#E8F0FE] text-blue-700',
      desc: 'Extended visibility with moderate savings.'
    },
    {
      id: '30 Months',
      months: '30 Months',
      badge: 'GROWTH OPTION',
      badgeColor: 'bg-[#E8F0FE] text-blue-700',
      desc: 'Ideal for establishing long-term market presence.'
    },
    {
      id: '49 Months',
      months: '49 Months',
      badge: 'BEST VALUE',
      badgeColor: 'bg-blue-700 text-white',
      desc: 'Maximum return on investment and sustained priority ranking.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans flex flex-col">

      {/* Top Header */}
      <div className="w-full text-center pt-12 pb-6 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">Choose Your Listing Period</h1>
        <p className="text-[15px] text-gray-500 max-w-md mx-auto leading-relaxed">
          Select how long you want your supplier company to stay listed on WULFARA.
        </p>
      </div>

      {/* Progress Tracker */}
      <div className="relative flex justify-between items-start w-full max-w-[900px] mb-20 mx-auto px-4 md:px-8">
        {/* Connecting Lines */}
        <div className="absolute top-[40px] left-[5%] right-[5%] flex z-0">
          <div className="w-1/4 border-t-4  border-[#D4AF37]"></div>
          <div className="w-1/4 border-t-2 border-[#D4AF37]"></div>
          <div className="w-1/4 border-t-2 border-[#D4AF37]"></div>
          <div className="w-1/4 border-t-2 border-[#D4AF37]"></div>
        </div>

        {/* Step 1 */}
        <div className="flex flex-col items-center relative z-10 bg-[#F9FAFB] px-2">
          <div className="w-12 h-12 rounded-2xl bg-[#D1A635] flex items-center justify-center mb-3">
            <Check className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[13px] font-bold text-[#000000] whitespace-nowrap">Industry</span>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center relative z-10 bg-[#F9FAFB] px-2">
          <div className="w-12 h-12 rounded-2xl bg-[#D1A635] border-2 border-[#D1A635] flex items-center justify-center mb-3">
            <span className="text-[15px] font-bold text-white">2</span>
          </div>
          <span className="text-[13px] font-bold text-[#000000] whitespace-nowrap">Company Info</span>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center relative z-10 bg-[#F9FAFB] px-2">
          <div className="w-12 h-12 rounded-2xl bg-[#D1A635] border-2 border-[#D1A635] flex items-center justify-center mb-3">
            <span className="text-[15px] font-bold text-white">3</span>
          </div>
          <span className="text-[13px] font-bold text-[#000000] whitespace-nowrap">Subscription</span>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col items-center relative z-10 bg-[#F9FAFB] px-2">
          <div className="w-12 h-12 rounded-2xl bg-[#D1A635] border-2 border-[#D1A635] flex items-center justify-center mb-3">
            <span className="text-[15px] font-bold text-white">4</span>
          </div>
          <span className="text-[13px] font-bold text-[#000000] whitespace-nowrap">Subscription</span>
        </div>

        {/* Step 5 */}
        <div className="flex flex-col items-center relative z-10 bg-[#F9FAFB] px-2">
          <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#D1A635] flex items-center justify-center mb-3">
            <span className="text-[15px] font-bold text-[#9CA3AF]">5</span>
          </div>
          <span className="text-[13px] font-bold text-[#000000] whitespace-nowrap">Listed</span>
        </div>
      </div>


      {/* Main Content Layout */}
      <div className="flex-1 w-full max-w-[1000px] mx-auto px-6 lg:px-8 pb-24 flex flex-col lg:flex-row gap-6 items-start">

        {/* Left Column - Grid Options */}
        <div className="w-full lg:w-[65%] space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {periods.map((period) => {
              const isSelected = selectedPeriod === period.id;

              return (
                <div
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`bg-white rounded-xl p-6 cursor-pointer transition-all duration-200 border-2 relative ${isSelected
                    ? 'border-[#D1A635] shadow-[0_4px_12px_rgba(209,166,53,0.1)]'
                    : 'border-gray-100 hover:border-gray-300 shadow-sm'
                    }`}
                >
                  <div className="flex justify-between items-start mb-6">
                    {/* Custom Radio Button */}
                    <div className="flex items-center h-6">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#D1A635]' : 'border-gray-300'
                        }`}>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#D1A635]"></div>}
                      </div>
                    </div>
                    {/* Badge */}
                    <span className={`text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider ${period.badgeColor}`}>
                      {period.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{period.months}</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed min-h-[40px]">
                    {period.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Cancellation Policy Card */}
          <div className="bg-[#FFFBF0] p-6 rounded-xl border border-[#FBEAC4] flex gap-4 mt-6">
            <Info className="w-5 h-5 text-[#D1A635] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[13px] font-bold text-gray-900 mb-1">5-Day Cancellation Policy</h4>
              <p className="text-[12px] text-gray-600 leading-relaxed">
                You may cancel your listing commitment within 5 business days of activation for a full refund. Terms and conditions apply.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column - Your Selection */}
        <div className="w-full lg:w-[35%] sticky top-8">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8">

            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Selection</h2>

            {/* Selected Plan Details */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D1A635]" />
                <span className="text-[13.5px] font-medium text-gray-900">Premium Plan</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D1A635]" />
                <span className="text-[13.5px] font-medium text-gray-900">{selectedPeriod}</span>
              </div>
            </div>

            <div className="h-px bg-gray-100 w-full mb-6"></div>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#D1A635] shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-[13px] text-gray-700">Priority search placement</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#D1A635] shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-[13px] text-gray-700">Unlimited RFQ responses</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#D1A635] shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-[13px] text-gray-700">Verified supplier badge</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#D1A635] shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-[13px] text-gray-700">Dedicated account manager</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link to="/listed" className="block w-full">
                <button className="w-full bg-[#D1A635] hover:bg-[#C2982B] text-black font-bold text-[14px] py-3.5 px-4 rounded-md transition-colors shadow-sm">
                  Continue
                </button>
              </Link>
              <Link to="/subscription" className="block">
                <button className="w-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-medium text-[14px] py-3.5 px-4 rounded-md transition-colors shadow-sm">
                  Back to Plans
                </button>
              </Link>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default ListingPeriod;
