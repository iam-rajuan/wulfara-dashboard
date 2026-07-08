import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function ManualEntryModal({ isOpen, onClose, onSubmit, mode = "create", initialData = null }) {
  const [formData, setFormData] = useState({
    buyerName: "",
    supplierName: "",
    category: "LOGISTICS",
    status: "Responded",
    dispute: "No"
  });

  useEffect(() => {
    if (initialData && (mode === "edit" || mode === "view")) {
      setFormData({
        buyerName: initialData.buyer.name || "",
        supplierName: initialData.supplier || "",
        category: initialData.category || "LOGISTICS",
        status: initialData.status || "Responded",
        dispute: initialData.dispute || "No"
      });
    } else {
      setFormData({
        buyerName: "",
        supplierName: "",
        category: "LOGISTICS",
        status: "Responded",
        dispute: "No"
      });
    }
  }, [initialData, mode, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    setFormData({
      buyerName: "",
      supplierName: "",
      category: "LOGISTICS",
      status: "Responded",
      dispute: "No"
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-[16px] font-bold text-[#0F172A]">
            {mode === "create" ? "Manual RFQ Entry" : mode === "edit" ? "Edit RFQ" : "View RFQ"}
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {(mode === "edit" || mode === "view") && initialData && (
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-center justify-between mb-2">
              <span className="text-[12px] font-bold text-blue-900">RFQ ID</span>
              <span className="text-[13px] font-extrabold text-blue-700">{initialData.id}</span>
            </div>
          )}

          <div>
            <label className="block text-[12px] font-bold text-[#0F172A] mb-1.5">Buyer Name</label>
            <input 
              type="text" 
              name="buyerName"
              required
              disabled={mode === "view"}
              placeholder="e.g. Astra Zen Limited"
              value={formData.buyerName}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#0F172A] mb-1.5">Supplier Name</label>
            <input 
              type="text" 
              name="supplierName"
              required
              disabled={mode === "view"}
              placeholder="e.g. Global Logis-X"
              value={formData.supplierName}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-[#0F172A] mb-1.5">Category</label>
              <select 
                name="category"
                disabled={mode === "view"}
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] appearance-none focus:outline-none focus:ring-1 focus:ring-gray-300 disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="LOGISTICS">Logistics</option>
                <option value="HARDWARE">Hardware</option>
                <option value="SOFTWARE">Software</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[12px] font-bold text-[#0F172A] mb-1.5">Status</label>
              <select 
                name="status"
                disabled={mode === "view"}
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] appearance-none focus:outline-none focus:ring-1 focus:ring-gray-300 disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="Responded">Responded</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#0F172A] mb-1.5">Dispute Flag</label>
            <select 
              name="dispute"
              disabled={mode === "view"}
              value={formData.dispute}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] appearance-none focus:outline-none focus:ring-1 focus:ring-gray-300 disabled:bg-gray-50 disabled:text-gray-500"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {/* Footer */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100 mt-6">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-bold text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              {mode === "view" ? "Close" : "Cancel"}
            </button>
            {mode !== "view" && (
              <button 
                type="submit"
                className="px-4 py-2 bg-[#D4AF37] border border-[#D4AF37] rounded-md text-[13px] font-bold text-[#0F172A] hover:bg-[#C2982B] transition-colors shadow-sm"
              >
                {mode === "create" ? "Create Entry" : "Save Changes"}
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}
