import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function BuyerFormModal({ isOpen, onClose, onSave, buyer = null }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("Active");
  const [verification, setVerification] = useState("Verified");

  // Populate form if editing
  useEffect(() => {
    if (buyer) {
      setName(buyer.name || "");
      setEmail(buyer.email || "");
      setStatus(buyer.status || "Active");
      setVerification(buyer.verification || "Verified");
    } else {
      setName("");
      setEmail("");
      setStatus("Active");
      setVerification("Verified");
    }
  }, [buyer, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name.trim() || !email.trim()) return;

    if (buyer) {
      // Editing existing buyer
      const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
        
      onSave({
        ...buyer,
        name,
        email,
        status,
        verification,
        initials,
      });
    } else {
      // Adding new buyer
      const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
        
      const colors = ["bg-[#DBEAFE]", "bg-[#FEF3C7]", "bg-[#FCE7F3]", "bg-[#E0E7FF]", "bg-[#DCFCE7]"];
      const avatarColor = colors[Math.floor(Math.random() * colors.length)];

      const newBuyer = {
        id: Date.now(),
        name,
        email,
        status,
        verification,
        rfqs: 0,
        favs: 0,
        createdDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit" }) + ",",
        createdYear: new Date().getFullYear().toString(),
        avatarColor,
        initials,
      };

      onSave(newBuyer);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-[16px] font-extrabold text-[#0F172A]">
            {buyer ? "Edit Buyer" : "Add New Buyer"}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wider mb-2">
              Buyer Name
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Michael Carter"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. m.carter@techflow.inc"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wider mb-2">
                Status
              </label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
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
                <option value="Unverified">Unverified</option>
                <option value="TOS Violation">TOS Violation</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
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
            {buyer ? "Update Buyer" : "Save Buyer"}
          </button>
        </div>
      </div>
    </div>
  );
}
