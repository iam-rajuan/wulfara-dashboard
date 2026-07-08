import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Eye, MapPin, Factory, PenTool, FileText, Globe, Send, Zap } from 'lucide-react';

const CompanyInfo = () => {
  const [formData, setFormData] = useState({
    companyName: 'Steel Company B',
    location: 'New Jersey, USA',
    companyType: 'Steel Manufacturing',
    keyServices: 'Industrial steel, metal parts',
    phone: '+1 (555) 000-0000',
    email: 'contact@steelcompanyb.com',
    website: 'https://www.steelcompanyb.com'
  });

  const [pricingStrategy, setPricingStrategy] = useState('Negotiable Rate');
  const [rfqEnabled, setRfqEnabled] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans flex flex-col">
      
      {/* Top Progress Tracker & Header */}
      <div className="w-full max-w-[1200px] mx-auto pt-10 px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Company Contact Information</h1>
        <p className="text-[15px] text-gray-500 mb-10">Add your company details so customers can contact you and send RFQs.</p>

        {/* Progress Tracker */}
        <div className="relative flex justify-between items-center w-full max-w-[900px] mb-12">
          {/* Connecting Lines */}
          <div className="absolute top-[14px] left-[5%] right-[75%] h-[2px] bg-[#D1A635] -z-10"></div>
          <div className="absolute top-[14px] left-[25%] right-[5%] h-[2px] bg-gray-200 -z-10"></div>
          
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-2 relative z-10 bg-[#F9FAFB] px-2">
            <div className="w-7 h-7 rounded-full bg-[#D1A635] flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-[11px] font-bold text-gray-800 absolute top-9 whitespace-nowrap">Industry</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-2 relative z-10 bg-[#F9FAFB] px-2">
            <div className="w-7 h-7 rounded-full bg-white border-2 border-[#D1A635] flex items-center justify-center">
              <span className="text-[12px] font-bold text-[#D1A635]">2</span>
            </div>
            <span className="text-[11px] font-bold text-gray-900 absolute top-9 whitespace-nowrap">Company Info</span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-2 relative z-10 bg-[#F9FAFB] px-2">
            <div className="w-7 h-7 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
              <span className="text-[12px] font-bold text-gray-400">3</span>
            </div>
            <span className="text-[11px] font-bold text-gray-400 absolute top-9 whitespace-nowrap">Subscription</span>
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

      {/* Main Content Layout */}
      <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 lg:px-8 pb-24 flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Column - Forms */}
        <div className="w-full lg:w-[60%] space-y-6">
          
          {/* Company Details Card */}
          <div className="bg-[#FAFAFA] p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-[20px] font-bold text-gray-900 mb-6">Company Details</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] focus:outline-none focus:border-[#D1A635] focus:ring-1 focus:ring-[#D1A635] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] focus:outline-none focus:border-[#D1A635] focus:ring-1 focus:ring-[#D1A635] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Company Type</label>
                  <select
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] text-gray-800 focus:outline-none focus:border-[#D1A635] focus:ring-1 focus:ring-[#D1A635] transition-colors appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[right_12px_center] bg-no-repeat pr-10"
                  >
                    <option value="Steel Manufacturing">Steel Manufacturing</option>
                    <option value="Plastic Manufacturing">Plastic Manufacturing</option>
                    <option value="Logistics">Logistics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">Key Services</label>
                <input
                  type="text"
                  name="keyServices"
                  value={formData.keyServices}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] focus:outline-none focus:border-[#D1A635] focus:ring-1 focus:ring-[#D1A635] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] focus:outline-none focus:border-[#D1A635] focus:ring-1 focus:ring-[#D1A635] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] text-gray-500 focus:outline-none focus:border-[#D1A635] focus:ring-1 focus:ring-[#D1A635] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] text-gray-500 focus:outline-none focus:border-[#D1A635] focus:ring-1 focus:ring-[#D1A635] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Listing Preferences Card */}
          <div className="bg-[#FAFAFA] p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-[20px] font-bold text-gray-900 mb-6">Listing Preferences</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">Pricing Strategy</label>
                <div className="flex bg-[#EEF2F6] rounded-md p-1 w-full max-w-[400px]">
                  <button
                    onClick={() => setPricingStrategy('Negotiable Rate')}
                    className={`flex-1 text-[13px] font-bold py-2 px-4 rounded-md transition-colors ${
                      pricingStrategy === 'Negotiable Rate' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Negotiable Rate
                  </button>
                  <button
                    onClick={() => setPricingStrategy('Non-Negotiable')}
                    className={`flex-1 text-[13px] font-bold py-2 px-4 rounded-md transition-colors ${
                      pricingStrategy === 'Non-Negotiable' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Non-Negotiable
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white border border-gray-200 p-4 rounded-md">
                <div>
                  <div className="text-[13px] font-bold text-gray-900">Request Quote Enabled</div>
                  <div className="text-[12px] text-gray-500">Allow buyers to send direct RFQs to your inbox.</div>
                </div>
                {/* Custom Toggle Switch */}
                <button
                  onClick={() => setRfqEnabled(!rfqEnabled)}
                  className={`w-11 h-6 rounded-full relative transition-colors duration-200 ease-in-out flex-shrink-0 ${
                    rfqEnabled ? 'bg-[#D1A635]' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-transform duration-200 ease-in-out ${
                    rfqEnabled ? 'translate-x-[22px]' : 'translate-x-0.5'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column - Live Preview */}
        <div className="w-full lg:w-[40%] sticky top-8">
          <div className="bg-[#FAFBFC] border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            
            {/* Live Preview Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-white">
              <span className="text-[11px] font-bold text-gray-600 tracking-wider">LIVE PREVIEW</span>
              <Eye className="w-4 h-4 text-gray-400" />
            </div>

            {/* Preview Card Body */}
            <div className="p-5">
              <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 relative overflow-hidden">
                
                {/* Subtle gradient background effect from screenshot */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50/50 rounded-bl-full -z-0"></div>

                {/* Company Header */}
                <div className="flex items-start gap-4 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded bg-[#EEF2F6] flex items-center justify-center shrink-0 border border-gray-100">
                    <Factory className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-gray-900 leading-tight">
                      {formData.companyName || 'Company Name'}
                    </h3>
                    <div className="inline-flex items-center gap-1 bg-[#E8F0FE] text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold mt-1">
                      <div className="w-3 h-3 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-2 h-2 text-white stroke-[3]" />
                      </div>
                      Premium Supplier
                    </div>
                  </div>
                </div>

                {/* Info List */}
                <div className="space-y-3 mb-6 relative z-10">
                  <div className="flex items-start gap-3 text-[12px] text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <span>{formData.location || 'Location'}</span>
                  </div>
                  <div className="flex items-start gap-3 text-[12px] text-gray-600">
                    <Factory className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <span>{formData.companyType || 'Company Type'}</span>
                  </div>
                  <div className="flex items-start gap-3 text-[12px] text-gray-600">
                    <PenTool className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <span>{formData.keyServices || 'Key Services'}</span>
                  </div>
                </div>

                {/* Status Panels */}
                <div className="flex gap-3 mb-6 relative z-10">
                  <div className="flex-1 bg-[#EEF2F6] rounded p-3">
                    <div className="text-[10px] font-bold text-gray-500 mb-1 uppercase">Rate Structure</div>
                    <div className="text-[12px] font-bold text-gray-900">{pricingStrategy}</div>
                  </div>
                  <div className="flex-1 bg-[#EEF2F6] rounded p-3">
                    <div className="text-[10px] font-bold text-gray-500 mb-1 uppercase">RFQ Status</div>
                    <div className={`text-[12px] font-bold flex items-center gap-1 ${rfqEnabled ? 'text-amber-600' : 'text-gray-500'}`}>
                      <Zap className={`w-3.5 h-3.5 ${rfqEnabled ? 'fill-current' : ''}`} />
                      {rfqEnabled ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3 relative z-10">
                  {rfqEnabled && (
                    <button className="w-full flex items-center justify-center gap-2 bg-black text-white font-medium text-[13px] py-2.5 rounded-md hover:bg-gray-800 transition-colors">
                      <FileText className="w-4 h-4" />
                      Request Quote
                    </button>
                  )}
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-800 font-medium text-[12px] py-2.5 rounded-md hover:bg-gray-50 transition-colors">
                      <Globe className="w-3.5 h-3.5" />
                      Website
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-800 font-medium text-[12px] py-2.5 rounded-md hover:bg-gray-50 transition-colors">
                      <Send className="w-3.5 h-3.5" />
                      Send RFQ Now
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Sticky Bottom Footer */}
      <div className="border-t border-gray-200 bg-[#F9FAFB] py-4 px-6 lg:px-8 w-full sticky bottom-0 z-20">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <Link to="/choose-industry">
            <button className="flex items-center gap-2 px-6 py-2.5 rounded border border-gray-300 bg-white text-gray-800 font-bold text-[13px] hover:bg-gray-50 transition-colors shadow-sm">
              Back
            </button>
          </Link>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded bg-[#D1A635] hover:bg-[#C2982B] text-black font-bold text-[13px] transition-colors shadow-sm">
            Save & Continue
            <span className="font-bold text-lg leading-none ml-1">→</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default CompanyInfo;
