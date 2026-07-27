import React from "react";
import { CreditCard, PlusCircle, X } from "lucide-react";

export default function PricingPeriodsForm({ data = {}, onChange }) {
  const handleChange = (e) => {
    if (onChange) onChange(e.target.name, e.target.value);
  };

  return (
    <div id="Pricing" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 scroll-mt-48">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
        <CreditCard size={16} className="text-gray-400" />
        <h2 className="text-[14px] font-extrabold text-[#0F172A]">Pricing & Listing Periods</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        {/* Base Price */}
        <div className="md:col-span-1">
          <label className="block text-[12px] font-bold text-[#0F172A] mb-1.5">Base Price</label>
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-bold text-gray-400">$</span>
            <input 
              type="text" 
              name="basePrice"
              value={data.basePrice || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
        </div>

        {/* Billing Type */}
        <div className="md:col-span-1">
          <label className="block text-[12px] font-bold text-[#0F172A] mb-1.5">Billing Cycle</label>
          <select 
            name="billingCycle"
            value={data.billingCycle || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300"
          >
            <option value="">Select Billing Cycle...</option>
            <option value="Annual (Paid Upfront)">Annual (Paid Upfront)</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        {/* Tax Rate */}
        <div className="md:col-span-1">
          <label className="block text-[12px] font-bold text-[#0F172A] mb-1.5">Tax Category</label>
          <select 
            name="taxCategory"
            value={data.taxCategory || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300"
          >
            <option value="">Select Tax Category...</option>
            <option value="Standard Digital Service">Standard Digital Service</option>
            <option value="Exempt">Exempt</option>
          </select>
        </div>

        {/* Coupon Codes */}
        <div className="md:col-span-1 flex items-end">
          <div className="flex items-center justify-between p-2 w-full h-[38px]">
            <span className="text-[12px] font-bold text-[#0F172A]">Coupon Codes</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0F172A]"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Listing Periods Table */}
        <div className="flex-1 w-full border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-2.5 px-4 text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-2.5 px-4 text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">Duration (Months)</th>
                <th className="py-2.5 px-4 text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">Base Price</th>
                <th className="py-2.5 px-4 text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">Discount Applied</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 px-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-7 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#D97706]"></div>
                  </label>
                </td>
                <td className="py-3 px-4 text-[12px] font-bold text-[#0F172A]">12 Months</td>
                <td className="py-3 px-4 text-[12px] font-medium text-gray-500">$4,900</td>
                <td className="py-3 px-4 text-[12px] font-medium text-gray-400">0%</td>
              </tr>
              <tr className="bg-orange-50/30">
                <td className="py-3 px-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-7 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#D97706]"></div>
                  </label>
                </td>
                <td className="py-3 px-4 text-[12px] font-bold text-[#0F172A]">24 Months</td>
                <td className="py-3 px-4 text-[12px] font-medium text-gray-500">$7,900</td>
                <td className="py-3 px-4 text-[12px] font-bold text-[#D97706]">15%</td>
              </tr>
              <tr>
                <td className="py-3 px-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-7 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#D97706]"></div>
                  </label>
                </td>
                <td className="py-3 px-4 text-[12px] font-bold text-[#0F172A]">48 Months</td>
                <td className="py-3 px-4 text-[12px] font-medium text-gray-500">$15,000</td>
                <td className="py-3 px-4 text-[12px] font-bold text-[#D97706]">25%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Edit Period Box */}
        <div className="w-full lg:w-64 border border-gray-200 rounded-lg p-4 relative bg-gray-50/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[12px] font-bold text-[#0F172A]">Edit Period: 24 Mo</h3>
            <X size={14} className="text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>

          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Duration (Months)</label>
              <input 
                type="text" 
                defaultValue="24"
                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-md text-[12px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Discount (%)</label>
              <input 
                type="text" 
                defaultValue="15"
                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-md text-[12px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Custom Label</label>
              <input 
                type="text" 
                placeholder="Optional"
                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-md text-[12px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>
          </div>
          
          <div className="flex justify-end border-t border-gray-200 pt-3">
             <button className="text-[11px] font-bold text-[#0F172A] flex items-center gap-1 hover:underline">
               <PlusCircle size={12} />
               Add Listing Period
             </button>
          </div>
        </div>
      </div>

    </div>
  );
}
