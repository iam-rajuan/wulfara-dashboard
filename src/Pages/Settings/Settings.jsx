import React, { useState } from 'react';

const Settings = () => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'Sarah',
    lastName: 'Jenkins',
    phoneNumber: '+1 (555) 019-2834',
    jobTitle: 'Director of Operations'
  });

  const [emailInfo, setEmailInfo] = useState({
    currentEmail: 's.jenkins@wulfara-supplier.com'
  });

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-sm font-sans pt-12 md:pt-16">
      <div className="max-w-[1100px] mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-[32px] font-bold text-gray-900 mb-2">Account Settings</h1>
          <p className="text-gray-500 text-[14px]">Manage your supplier account, business email, password, and security.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-56 shrink-0">
            <nav className="flex flex-col space-y-5 text-[15px]">
              <a href="#personal-info" className="text-gray-900 font-semibold">Personal Info</a>
              <a href="#business-email" className="text-gray-500 hover:text-gray-900">Business Email</a>
              <a href="#password" className="text-gray-500 hover:text-gray-900">Password</a>
              <a href="#security" className="text-gray-500 hover:text-gray-900">Security</a>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            
            {/* Personal Information */}
            <div id="personal-info" className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-8">
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={personalInfo.firstName}
                    onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAFBFC] border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={personalInfo.lastName}
                    onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAFBFC] border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="text"
                    value={personalInfo.phoneNumber}
                    onChange={(e) => handlePersonalInfoChange('phoneNumber', e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAFBFC] border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-2">Job Title</label>
                  <input
                    type="text"
                    value={personalInfo.jobTitle}
                    onChange={(e) => handlePersonalInfoChange('jobTitle', e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAFBFC] border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                  />
                </div>
              </div>
              <button className="bg-black text-white px-6 py-2.5 rounded text-sm font-medium hover:bg-gray-800 transition-colors">
                Save Changes
              </button>
            </div>

            {/* Business Email */}
            <div id="business-email" className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Business Email</h2>
              
              <div className="mb-4">
                <label className="block text-[13px] font-medium text-gray-700 mb-2">Current Email Address</label>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="relative flex-1 w-full sm:w-auto">
                    <input
                      type="text"
                      readOnly
                      value={emailInfo.currentEmail}
                      className="w-full px-3 py-2.5 bg-[#F0F4F8] border border-gray-100 rounded-md text-gray-700 pr-24 focus:outline-none"
                    />
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center">
                      <span className="bg-[#1D4ED8] text-white text-[11px] font-medium px-2.5 py-1 rounded-[4px] flex items-center gap-1.5 shadow-sm">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                        Verified
                      </span>
                    </div>
                  </div>
                  <button className="px-6 py-2.5 border border-gray-300 rounded text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors whitespace-nowrap bg-white shadow-sm">
                    Change Email
                  </button>
                </div>
              </div>
              <p className="text-[13px] text-gray-500">Changing your email will require re-verification to maintain marketplace access.</p>
            </div>

            {/* Password */}
            <div id="password" className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Password</h2>
              
              <div className="space-y-6 max-w-[450px]">
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={passwordInfo.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAFBFC] border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordInfo.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAFBFC] border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                  />
                  
                  {/* Password Strength */}
                  <div className="mt-3 flex gap-1 h-1.5 w-full">
                    <div className="w-1/4 bg-yellow-500 rounded-sm"></div>
                    <div className="w-1/4 bg-yellow-500 rounded-sm"></div>
                    <div className="w-1/4 bg-gray-200 rounded-sm"></div>
                    <div className="w-1/4 bg-gray-200 rounded-sm"></div>
                  </div>
                  <p className="text-[12px] text-gray-600 mt-2">
                    Password strength: <span className="text-yellow-600 font-semibold">Good</span>. Add special characters to improve.
                  </p>
                </div>

                <div className="pt-1">
                  <label className="block text-[13px] font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordInfo.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAFBFC] border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                  />
                </div>
                
                <div className="pt-2">
                  <button className="bg-black text-white px-6 py-2.5 rounded text-sm font-medium hover:bg-gray-800 transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
            </div>

            {/* Security */}
            <div id="security" className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Security</h2>
              
              <div>
                <h3 className="text-[15px] font-bold text-gray-900 mb-1">Two-Factor Authentication (2FA)</h3>
                <p className="text-[13px] text-gray-500">Add an extra layer of security to your account using an authenticator app.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 pb-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-[13px] text-gray-500 gap-4">
          <div>
            © 2024 WULFARA Industrial Marketplace. All rights reserved.
          </div>
          <div className="flex gap-6 font-medium">
            <a href="#" className="hover:text-gray-900 transition-colors">Support</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;