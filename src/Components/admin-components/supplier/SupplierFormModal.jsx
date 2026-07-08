import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function SupplierFormModal({ isOpen, onClose, onSave, supplier = null }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("Basic");
  const [verification, setVerification] = useState("Pending");
  const [listingStatus, setListingStatus] = useState("Pending Review (0)");
  const [subscription, setSubscription] = useState("Active");
  const [icon, setIcon] = useState("Box");

  useEffect(() => {
    if (supplier) {
      setName(supplier.name || "");
      setCompany(supplier.company || "");
      setEmail(supplier.email || "");
      setPlan(supplier.plan || "Basic");
      setVerification(supplier.verification || "Pending");
      setListingStatus(supplier.listingStatus || "Pending Review (0)");
      setSubscription(supplier.subscription || "Active");
      setIcon(supplier.icon || "Box");
    } else {
      setName("");
      setCompany("");
      setEmail("");
      setPlan("Basic");
      setVerification("Pending");
      setListingStatus("Pending Review (0)");
      setSubscription("Active");
      setIcon("Box");
    }
  }, [supplier, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name.trim() || !email.trim() || !company.trim()) return;

    if (supplier) {
      onSave({
        ...supplier,
        name,
        company,
        email,
        plan,
        verification,
        listingStatus,
        subscription,
        icon,
      });
    } else {
      const newSupplier = {
        id: Date.now(),
        name,
        company,
        email,
        plan,
        verification,
        listingStatus,
        subscription,
        icon,
      };

      onSave(newSupplier);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-[16px] font-extrabold text-[#0F172A]">
            {supplier ? "Edit Supplier" : "Add New Supplier"}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wider mb-2">
                Supplier Name
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. James Miller"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wider mb-2">
                Company Name
              </label>
              <input 
                type="text" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Apex Machinery Ltd."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. james@apexmachinery.com"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wider mb-2">
                Plan
              </label>
              <select 
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
              >
                <option value="Basic">Basic</option>
                <option value="Pro">Pro</option>
                <option value="Premium">Premium</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wider mb-2">
                Verification
              </label>
              <select 
                value={verification}
                onChange={(e) => setVerification(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
              >
                <option value="Verified">Verified</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wider mb-2">
                Listing Status
              </label>
              <select 
                value={listingStatus}
                onChange={(e) => setListingStatus(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
              >
                <option value="Approved (0)">Approved</option>
                <option value="Pending Review (0)">Pending Review</option>
                <option value="Hidden (0)">Hidden</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wider mb-2">
                Subscription
              </label>
              <select 
                value={subscription}
                onChange={(e) => setSubscription(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
              >
                <option value="Active">Active</option>
                <option value="Past Due">Past Due</option>
                <option value="Paused">Paused</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wider mb-2">
              Icon
            </label>
            <select 
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
            >
              <option value="Box">Box</option>
              <option value="Truck">Truck</option>
              <option value="Tool">Tool</option>
              <option value="LayoutDashboard">Dashboard</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 flex-shrink-0">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-[13px] font-bold text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-[#D4AF37] rounded-lg text-[13px] font-bold text-[#0F172A] hover:bg-[#C2982B] transition-colors shadow-sm"
          >
            {supplier ? "Update Supplier" : "Save Supplier"}
          </button>
        </div>
      </div>
    </div>
  );
}
