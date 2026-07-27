import React from 'react';
import {
  User, Building2, Shield, Bell, Plus, Download, Save,
  CheckCircle2, AlertCircle, Banknote
} from 'lucide-react';
import { Input, Select, Switch, Button, Checkbox, Tag } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const GeneralConfiguration = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">General Configuration</h2>
      </div>

      <div className="p-8 space-y-8">
        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Platform Name</label>
            <Input defaultValue="WULFARA B2B Marketplace" className="px-4 py-2.5 rounded-md border-gray-200 text-sm font-medium" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Primary URL</label>
            <Input defaultValue="https://app.wulfara.com" className="px-4 py-2.5 rounded-md border-gray-200 text-sm font-medium" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Support Email Address</label>
            <Input defaultValue="support@wulfara.com" className="px-4 py-2.5 rounded-md border-gray-200 text-sm font-medium" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Default Language</label>
            <Select
              defaultValue="English (US)"
              className="w-full h-[42px]"
              options={[{ value: 'English (US)', label: 'English (US)' }]}
            />
          </div>
        </div>

        {/* Platform Access Controls */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-4">Platform Access Controls</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50/50">
              <div>
                <h4 className="text-[13px] font-bold text-gray-900">Enable Public Browsing</h4>
                <p className="text-[12px] text-gray-500">Allow non-authenticated users to view the supplier directory.</p>
              </div>
              <Switch defaultChecked className="bg-gray-200 [&.ant-switch-checked]:bg-[#dcb14b]" />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50/50">
              <div>
                <h4 className="text-[13px] font-bold text-gray-900">Allow Guest RFQ Submission</h4>
                <p className="text-[12px] text-gray-500">Guests can submit Request for Quotes without an account.</p>
              </div>
              <Switch className="bg-gray-200 [&.ant-switch-checked]:bg-[#dcb14b]" />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50/50">
              <div>
                <h4 className="text-[13px] font-bold text-gray-900">Open Supplier Registration</h4>
                <p className="text-[12px] text-gray-500">Suppliers can sign up autonomously via the platform.</p>
              </div>
              <Switch defaultChecked className="bg-gray-200 [&.ant-switch-checked]:bg-[#dcb14b]" />
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Cards Row */}
      <div className="px-8 pb-8 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 border border-gray-100 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute right-[-20px] top-[-20px] opacity-5">
            <Shield size={140} />
          </div>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">TOTAL PLATFORM ADMINS</h3>
          <div className="text-5xl font-black text-gray-900 mb-2">5</div>
          <p className="text-[12px] text-gray-500 font-medium">1 Super Admin, 4 Staff</p>
        </div>

        <div className="flex-[2] border border-gray-100 rounded-xl p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Recent Audit Log</h3>
          <div className="space-y-4 pt-2">
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-[#dcb14b] mt-1.5 shrink-0"></div>
              <div>
                <p className="text-[13px] text-gray-800"><span className="font-bold">Super Admin</span> updated Security Settings.</p>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5">2 hours ago</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0"></div>
              <div>
                <p className="text-[13px] text-gray-800"><span className="font-bold">System</span> backed up database.</p>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5">Yesterday, 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RolesAndPermissions = () => {
  const roles = [
    { title: 'Super Admin', desc: 'Unrestricted full access to all platform settings and data.', users: 2, icon: <Shield size={16} />, default: true },
    { title: 'Admin', desc: 'Broad management access, excluding billing and core security.', users: 5, icon: <User size={16} />, default: false },
    { title: 'Finance Admin', desc: 'Access to billing, invoices, and financial reporting only.', users: 3, icon: <Banknote size={16} />, default: false },
    { title: 'Support Admin', desc: 'Manage tickets, user queries, and view-only profiles.', users: 8, icon: <Bell size={16} />, default: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Roles & Permissions</h2>
          <p className="text-sm text-gray-500 font-medium">Manage what users can see and do within the IndustrialLink platform.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#0E1726] text-white px-4 py-2.5 rounded-lg text-[13px] font-bold hover:bg-gray-800 transition-colors shadow-sm">
          <Plus size={16} /> Create Custom Role
        </button>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {roles.map((role, idx) => (
          <div key={idx} className={`p-5 rounded-xl border ${role.default ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200 bg-white'} relative`}>
            {role.default && (
              <div className="absolute top-[-1px] left-8 right-8 h-1 bg-blue-500 rounded-b-md"></div>
            )}
            <div className="flex justify-between items-start mb-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${role.default ? 'bg-[#dcb14b] text-white' : 'bg-gray-100 text-gray-500'}`}>
                {role.icon}
              </div>
              {role.default && <Tag color="blue" className="font-bold border-0 bg-blue-100 text-blue-600 m-0 text-[10px] tracking-wider">DEFAULT</Tag>}
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{role.title}</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed mb-6 min-h-[40px]">{role.desc}</p>
            <p className="text-[11px] font-bold text-blue-600">{role.users} Users</p>
          </div>
        ))}
      </div>

      {/* Permission Matrix */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mt-8">
        <div className="p-5 flex justify-between items-center border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Permission Matrix</h3>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-[13px] font-bold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">Export CSV</button>
            <button className="px-4 py-2 text-[13px] font-bold text-white bg-[#0E1726] rounded-lg hover:bg-gray-800">Save Changes</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest w-[30%]">Permission</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Super Admin</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Admin</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Finance</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Support</th>
              </tr>
            </thead>
            <tbody>
              {/* Category 1 */}
              <tr className="bg-gray-50/80"><td colSpan={5} className="px-6 py-3 text-[11px] font-bold text-gray-900">General & Dashboard</td></tr>
              <tr className="border-b border-gray-100">
                <td className="px-6 py-4 text-[13px] font-medium text-gray-700">View Main Dashboard</td>
                <td className="px-4 py-4 text-center"><CheckCircle2 size={18} className="text-[#dcb14b] mx-auto" /></td>
                <td className="px-4 py-4 text-center"><CheckCircle2 size={18} className="text-[#dcb14b] mx-auto" /></td>
                <td className="px-4 py-4 text-center"><CheckCircle2 size={18} className="text-[#dcb14b] mx-auto" /></td>
                <td className="px-4 py-4 text-center"><CheckCircle2 size={18} className="text-[#dcb14b] mx-auto" /></td>
              </tr>
              {/* Category 2 */}
              <tr className="bg-gray-50/80"><td colSpan={5} className="px-6 py-3 text-[11px] font-bold text-gray-900">Supplier & Buyer Management</td></tr>
              <tr className="border-b border-gray-100">
                <td className="px-6 py-4 text-[13px] font-medium text-gray-700">Manage Buyers/Suppliers</td>
                <td className="px-4 py-4 text-center"><Switch defaultChecked disabled className="bg-gray-300 [&.ant-switch-checked]:bg-gray-300" /></td>
                <td className="px-4 py-4 text-center"><Switch defaultChecked className="bg-gray-200 [&.ant-switch-checked]:bg-[#dcb14b]" /></td>
                <td className="px-4 py-4 text-center text-gray-300">—</td>
                <td className="px-4 py-4 text-center"><Switch className="bg-gray-200" /></td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-6 py-4 text-[13px] font-medium text-gray-700">Approve/Reject Listings</td>
                <td className="px-4 py-4 text-center"><CheckCircle2 size={18} className="text-[#dcb14b] mx-auto" /></td>
                <td className="px-4 py-4 text-center"><CheckCircle2 size={18} className="text-[#dcb14b] mx-auto" /></td>
                <td className="px-4 py-4 text-center text-gray-300">—</td>
                <td className="px-4 py-4 text-center text-gray-300">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const NotificationsSettings = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Notifications Settings</h2>
          <p className="text-[13px] text-gray-500 font-medium">Configure how and when your team is alerted for platform events.</p>
        </div>
        <button className="text-[12px] font-bold text-blue-600 uppercase tracking-widest hover:text-blue-800">RESET DEFAULTS</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#fcfcfc] border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest w-[40%]">Event Category / Type</th>
              <th className="px-4 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">In-App</th>
              <th className="px-4 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Email</th>
              <th className="px-4 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Critical Alert</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Recipients</th>
            </tr>
          </thead>
          <tbody>
            {/* Supplier Mgmt */}
            <tr className="bg-white"><td colSpan={5} className="px-6 py-4 text-[12px] font-bold text-gray-900 border-b border-gray-50">Supplier Management</td></tr>
            <tr className="border-b border-gray-50">
              <td className="px-6 py-4">
                <div className="font-bold text-[13px] text-gray-800">New Supplier Signup</div>
                <div className="text-[11px] text-gray-500 mt-1">When a new supplier registers on the platform.</div>
              </td>
              <td className="px-4 py-4 text-center"><Checkbox defaultChecked className="checked-yellow" /></td>
              <td className="px-4 py-4 text-center"><Checkbox /></td>
              <td className="px-4 py-4 text-center"><Checkbox /></td>
              <td className="px-6 py-4"><Tag className="text-[10px] font-bold bg-gray-100 text-gray-600 border-gray-200">Procurement Team</Tag></td>
            </tr>
            <tr className="border-b border-gray-50">
              <td className="px-6 py-4">
                <div className="font-bold text-[13px] text-gray-800">Supplier Verified</div>
                <div className="text-[11px] text-gray-500 mt-1">KYC and compliance checks completed.</div>
              </td>
              <td className="px-4 py-4 text-center"><Checkbox defaultChecked /></td>
              <td className="px-4 py-4 text-center"><Checkbox defaultChecked /></td>
              <td className="px-4 py-4 text-center"><Checkbox /></td>
              <td className="px-6 py-4"><Tag className="text-[10px] font-bold bg-blue-50 text-blue-600 border-blue-100">Compliance Leads</Tag></td>
            </tr>

            {/* Inventory */}
            <tr className="bg-white"><td colSpan={5} className="px-6 py-4 text-[12px] font-bold text-gray-900 border-b border-gray-50">Inventory & Listings</td></tr>
            <tr className="border-b border-gray-50">
              <td className="px-6 py-4">
                <div className="font-bold text-[13px] text-gray-800">Listing Submitted for Review</div>
                <div className="text-[11px] text-gray-500 mt-1">New product/material pending admin approval.</div>
              </td>
              <td className="px-4 py-4 text-center"><Checkbox defaultChecked /></td>
              <td className="px-4 py-4 text-center"><Checkbox defaultChecked /></td>
              <td className="px-4 py-4 text-center"><Checkbox /></td>
              <td className="px-6 py-4"><Tag className="text-[10px] font-bold bg-gray-100 text-gray-600 border-gray-200">Catalog Admins</Tag></td>
            </tr>
            <tr className="border-b border-gray-50">
              <td className="px-6 py-4">
                <div className="font-bold text-[13px] text-gray-800">Listing Rejected</div>
                <div className="text-[11px] text-gray-500 mt-1">QA flagged issues with a submission.</div>
              </td>
              <td className="px-4 py-4 text-center"><Checkbox defaultChecked /></td>
              <td className="px-4 py-4 text-center"><Checkbox /></td>
              <td className="px-4 py-4 text-center"><Checkbox className="ant-checkbox-red" defaultChecked /></td>
              <td className="px-6 py-4 flex flex-col gap-1 items-start">
                <Tag className="text-[10px] font-bold bg-gray-100 text-gray-600 border-gray-200">Catalog Admins</Tag>
                <Tag className="text-[10px] font-bold bg-red-50 text-red-600 border-red-100">QA Team</Tag>
              </td>
            </tr>

            {/* RFQs */}
            <tr className="bg-white"><td colSpan={5} className="px-6 py-4 text-[12px] font-bold text-gray-900 border-b border-gray-50">Transactions (RFQs)</td></tr>
            <tr className="border-b border-gray-50">
              <td className="px-6 py-4">
                <div className="font-bold text-[13px] text-gray-800">RFQ Submitted</div>
                <div className="text-[11px] text-gray-500 mt-1">High-value Request for Quote initiated.</div>
              </td>
              <td className="px-4 py-4 text-center"><Checkbox defaultChecked /></td>
              <td className="px-4 py-4 text-center"><Checkbox defaultChecked /></td>
              <td className="px-4 py-4 text-center"><Checkbox className="ant-checkbox-red" defaultChecked /></td>
              <td className="px-6 py-4"><Tag className="text-[10px] font-bold bg-[#dcb14b] text-[#5a4616] border-0">Account Execs</Tag></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="p-6 bg-gray-50/50 flex justify-end gap-3 border-t border-gray-100">
        <button className="px-6 py-2.5 bg-white border border-gray-200 rounded-md text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm">Cancel</button>
        <button className="px-6 py-2.5 bg-[#dcb14b] text-gray-900 rounded-md text-sm font-bold hover:bg-[#c9a040] shadow-sm">Save Configuration</button>
      </div>

      {/* Global overrides for Ant Design Checkbox specific to this view */}
      <style jsx global>{`
        .ant-checkbox-checked .ant-checkbox-inner {
          background-color: #dcb14b;
          border-color: #dcb14b;
        }
        .ant-checkbox-red.ant-checkbox-wrapper .ant-checkbox-checked .ant-checkbox-inner {
          background-color: #dc2626 !important;
          border-color: #dc2626 !important;
        }
      `}</style>
    </div>
  );
};

const Settings = () => {
  const location = useLocation();

  const getActiveTab = () => {
    if (location.pathname === '/settings/roles') return 'Roles & Permissions';
    if (location.pathname === '/settings/notifications') return 'Notifications';
    if (location.pathname === '/settings/company') return 'Company Details';
    return 'My Profile';
  };

  const activeTab = getActiveTab();

  const tabs = [
    { id: 'My Profile', path: '/settings', icon: <User size={16} /> },
    { id: 'Company Details', path: '/settings/company', icon: <Building2 size={16} /> },
    { id: 'Roles & Permissions', path: '/settings/roles', icon: <Shield size={16} /> },
    { id: 'Notifications', path: '/settings/notifications', icon: <Bell size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-12 md:pt-16 pb-20">
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar */}
          <div className="w-full md:w-[240px] shrink-0">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-black text-gray-900 px-4 mb-4">Settings</h2>
              <nav className="flex flex-col space-y-1">
                {tabs.map(tab => (
                  <Link
                    key={tab.id}
                    to={tab.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === tab.id
                        ? 'bg-[#dcb14b] text-gray-900'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                  >
                    {tab.icon}
                    {tab.id}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === 'My Profile' && <GeneralConfiguration />}
            {activeTab === 'Company Details' && <GeneralConfiguration />}
            {activeTab === 'Roles & Permissions' && <RolesAndPermissions />}
            {activeTab === 'Notifications' && <NotificationsSettings />}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;