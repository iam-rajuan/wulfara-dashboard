import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Info, Eye, EyeOff, ArrowRight, Search, Mail, Settings, Network, UserPlus, Building2, FileText, Users, Handshake } from 'lucide-react';
import { CustomNetworkIcon, CustomSettingsIcon, CustomMailIcon } from "../../../svglogos/SvgIcons";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans">
      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 bg-[#F8F9FA] flex flex-col justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-[480px]">
          <h1 className="text-[28px] font-bold text-[#111827] mb-2">Create Supplier Account</h1>
          <p className="text-[15px] text-gray-600 mb-8 leading-relaxed">
            Create a supplier account to add your company profile, receive RFQs, and connect with customers searching for your services.
          </p>

          <div className="bg-white p-6 md:p-8 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100">
            <form className="space-y-5">

              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">Business Email</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full px-4 py-2.5 bg-[#FAFBFC] border border-gray-200 rounded-md text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
                <div className="flex items-center gap-1.5 mt-2 text-[12px] text-gray-500">
                  <Info className="w-3.5 h-3.5" />
                  <span>Use your company email for faster verification</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-10 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-10 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Company Name</label>
                  <input
                    type="text"
                    placeholder="Legal company name"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="text-[14px] text-gray-600">
                    I agree to the <a href="#" className="text-[#0052CC] font-medium hover:underline">Terms</a> and <a href="#" className="text-[#0052CC] font-medium hover:underline">Supplier Listing Policy</a>.
                  </div>
                </label>
              </div>

              <div className="pt-4">
                <Link to="/verify-email" className="block w-full">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 bg-[#D1A635] hover:bg-[#C2982B] text-gray-900 font-bold py-3.5 px-4 rounded-md transition-colors"
                  >
                    Create Supplier Account
                    <ArrowRight className="w-4 h-4 font-bold" />
                  </button>
                </Link>
              </div>

              <div className="text-center pt-2">
                <p className="text-[14px] text-gray-600">
                  Already have an account? <Link to="/sign-in" className="text-[#0052CC] font-medium hover:underline">Login</Link>
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>

      {/* Right Column - Info */}
      <div className="w-full md:w-1/2 bg-[#2B3543] p-6 md:p-12 flex justify-center items-center relative overflow-hidden">
        <div className="w-full max-w-[440px] relative z-10">
          <h2 className="text-[26px] font-bold text-white text-center mb-10">Grow your supplier business online</h2>

          <div className="space-y-4 mb-14">

            {/* Card 1 */}
            <div className="bg-white rounded-lg p-4 flex items-start gap-4">
              <div className="bg-[#f8f9ff] p-2 rounded-md shrink-0 mt-0.5">
                <Search className="w-5 h-5 text-[#D1A635]" />
              </div>
              <div>
                <h3 className="font-bold text-[14px] text-gray-900 mb-1">Get discovered by buyers</h3>
                <p className="text-[13px] text-gray-600">List your capabilities in the global industrial directory.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg p-4 flex items-start gap-4">
              <div className="bg-[#f8f9ff] p-2 rounded-md shrink-0 mt-0.5">
                <CustomMailIcon className="w-5 h-5 text-[#D1A635]" />
              </div>
              <div>
                <h3 className="font-bold text-[14px] text-gray-900 mb-1">Receive RFQs directly</h3>
                <p className="text-[13px] text-gray-600">Get requests for quotes directly to your inbox.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg p-4 flex items-start gap-4">
              <div className="bg-[#f8f9ff] p-2 rounded-md shrink-0 mt-0.5">
                <CustomSettingsIcon className="w-5 h-5 text-[#D1A635]" />
              </div>
              <div>
                <h3 className="font-bold text-[14px] text-gray-900 mb-1">Manage your company listing</h3>
                <p className="text-[13px] text-gray-600">Control your public profile and certifications.</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-lg p-4 flex items-start gap-4">
              <div className="bg-[#f8f9ff] p-2 rounded-md shrink-0 mt-0.5">
                <CustomNetworkIcon className="w-5 h-5 text-[#D1A635]" />
              </div>
              <div>
                <h3 className="font-bold text-[14px] text-gray-900 mb-1">Grow your business network</h3>
                <p className="text-[13px] text-gray-600">Connect with high-value B2B partners.</p>
              </div>
            </div>

          </div>

          {/* Bottom Progress Steps */}
          <div className="bg-white rounded-xl p-5 flex justify-between items-center relative shadow-sm">

            {/* Connecting lines container */}
            <div className="absolute inset-0 flex items-center px-10 pointer-events-none">
              <div className="w-full flex h-[2px]">
                <div className="w-1/3 border-t-2  border-[#C5C6CD] mt-[-25px]"></div>
                <div className="w-1/3 border-t-2  border-[#C5C6CD] mt-[-25px]"></div>
                <div className="w-1/3 border-t-2 border-dashed border-[#10B981] mt-[-25px]"></div>
              </div>
            </div>

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
              <div className="bg-[#1f2937] w-12 h-12 rounded-2xl flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-[13px] font-extrabold text-[#1f2937]">Account</span>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
              <div className="bg-[#e9f0f8] border border-[#d1d5db] w-12 h-12 rounded-2xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#1f2937]" strokeWidth={2.5} />
              </div>
              <span className="text-[13px] font-bold text-[#4b5563]">Profile</span>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
              <div className="bg-[#e9f0f8] border border-[#d1d5db] w-12 h-12 rounded-2xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#1f2937]" strokeWidth={2.5} />
              </div>
              <span className="text-[13px] font-bold text-[#4b5563]">RFQs</span>
            </div>

            {/* Step 4 */}
            <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
              <div className="bg-[#d4af37] border-2 border-black w-12 h-12 rounded-2xl flex items-center justify-center">
                <Handshake className="w-6 h-6 text-black" strokeWidth={2.5} />
              </div>
              <span className="text-[13px] font-extrabold text-black">Customers</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
