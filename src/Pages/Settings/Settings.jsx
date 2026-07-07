import React, { useState } from 'react';
import { Save, ExternalLink } from 'lucide-react';
import adminImage from "../../assets/image/adminkickclick.jpg";


const Settings = () => {
  const [platformInfo, setPlatformInfo] = useState({
    name: 'YardWork Pro',
    email: 'support@yardworkpro.com',
    phone: '+1 (555) 123-4567'
  });

  const [paymentSettings, setPaymentSettings] = useState({
    platformFee: 12,
    minimumServiceAmount: 25,
    paymentProcessor: 'Stripe'
  });

  const [adminProfile, setAdminProfile] = useState({
    name: 'John Administrator',
    email: 'admin@yardworkpro.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    newUserRegistrations: true,
    serviceCompletions: true,
    paymentIssues: true
  });

  const [legalDocs] = useState([
    { name: 'Terms of Service', status: 'Active' },
    { name: 'Privacy Policy', status: 'Active' },
    { name: 'Cookie Policy', status: 'Active' },
    { name: 'GDPR Compliance', status: 'Active' }
  ]);

  const handlePlatformChange = (field, value) => {
    setPlatformInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field, value) => {
    setPaymentSettings(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setAdminProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleUpdatePassword = () => {
    if (adminProfile.newPassword !== adminProfile.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Password updated successfully!');
    setAdminProfile(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleSaveSettings = () => {
    alert('All settings saved successfully!');
  };

  return (
    <div className="min-h-screen p-6 mt-16 bg-gray-50">
      <div className="mx-auto ">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Platform Information */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">Platform Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Platform Name
                  </label>
                  <input
                    type="text"
                    value={platformInfo.name}
                    onChange={(e) => handlePlatformChange('name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={platformInfo.email}
                    onChange={(e) => handlePlatformChange('email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={platformInfo.phone}
                    onChange={(e) => handlePlatformChange('phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Payment Settings */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">Payment Settings</h2>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gray-50">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-medium">Platform Fee</h3>
                      <p className="text-sm text-gray-600">Commission charged on completed services</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{paymentSettings.platformFee}%</div>
                      <div className="text-xs text-gray-500">Read-only</div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Platform Fee
                  </label>
                  <div className="relative">
                    <span className="absolute text-gray-500 -translate-y-1/2 left-4 top-1/2">$</span>
                    <input
                      type="number"
                      value={paymentSettings.platformFee}
                      onChange={(e) => handlePaymentChange('platformFee', parseFloat(e.target.value))}
                      className="w-full py-2 pl-8 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Minimum Service Amount
                  </label>
                  <div className="relative">
                    <span className="absolute text-gray-500 -translate-y-1/2 left-4 top-1/2">$</span>
                    <input
                      type="number"
                      value={paymentSettings.minimumServiceAmount}
                      onChange={(e) => handlePaymentChange('minimumServiceAmount', parseFloat(e.target.value))}
                      className="w-full py-2 pl-8 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Payment Processing
                  </label>
                  <select
                    value={paymentSettings.paymentProcessor}
                    onChange={(e) => handlePaymentChange('paymentProcessor', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="Stripe">Stripe</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Square">Square</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">Notification Preferences</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">New User Registrations</h3>
                    <p className="text-sm text-gray-600">Notify when new users join the platform</p>
                  </div>
                  <button
                    onClick={() => toggleNotification('newUserRegistrations')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications.newUserRegistrations ? 'bg-emerald-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.newUserRegistrations ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Service Completions</h3>
                    <p className="text-sm text-gray-600">Notify when services are marked as complete</p>
                  </div>
                  <button
                    onClick={() => toggleNotification('serviceCompletions')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications.serviceCompletions ? 'bg-emerald-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.serviceCompletions ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Payment Issues</h3>
                    <p className="text-sm text-gray-600">Notify about failed payments or disputes</p>
                  </div>
                  <button
                    onClick={() => toggleNotification('paymentIssues')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications.paymentIssues ? 'bg-emerald-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.paymentIssues ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Admin Profile */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">Admin Profile</h2>
              
              <div className="flex flex-col items-center mb-6">
                <div className="flex items-center justify-center w-24 h-24 mb-3 text-3xl font-bold text-white rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
                 <img src={adminImage} alt="Admin" className='rounded-full' />
                </div>
                <h3 className="text-lg font-semibold">{adminProfile.name}</h3>
                <p className="text-sm text-gray-600">{adminProfile.email}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={adminProfile.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={adminProfile.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={adminProfile.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={handleUpdatePassword}
                  className="w-full py-3 font-medium text-white transition-colors rounded-lg bg-emerald-700 hover:bg-emerald-800"
                >
                  Update Password
                </button>
              </div>
            </div>

            {/* Legal & Compliance */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">Legal & Compliance</h2>
              
              <div className="space-y-3">
                {legalDocs.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                    <span className="font-medium">{doc.name}</span>
                    <button className="flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-800">
                      Edit
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                ))}
                
                <div className="flex items-center justify-between py-3">
                  <span className="font-medium">GDPR Compliance</span>
                  <span className="flex items-center text-sm font-medium text-emerald-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSaveSettings}
            className="flex items-center px-8 py-3 font-medium text-white transition-colors rounded-lg bg-emerald-700 hover:bg-emerald-800"
          >
            <Save className="w-5 h-5 mr-2" />
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;