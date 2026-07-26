import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListings } from "../../../redux/features/listings/listingsSlice";
import { X } from "lucide-react";

export default function ManualEntryModal({ isOpen, onClose, onSubmit, mode = "create", initialData = null }) {
  const dispatch = useDispatch();
  const { listings } = useSelector((state) => state.listings);

  useEffect(() => {
    if (isOpen && listings.length === 0) {
      dispatch(getListings());
    }
  }, [isOpen, dispatch, listings.length]);

  const [formData, setFormData] = useState({
    supplierId: "",
    buyerName: "",
    buyerEmail: "",
    subject: "",
    details: "",
    quantity: 1
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        supplierId: listings.length > 0 ? listings[0]._id : "",
        buyerName: "Admin Tester",
        buyerEmail: "admin@test.com",
        subject: "Manual Entry RFQ",
        details: "Testing the RFQ creation flow manually from the admin panel.",
        quantity: 10
      });
    }
  }, [isOpen, listings]);

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
          
          <div>
            <label className="block text-[12px] font-bold text-[#0F172A] mb-1.5">Select Supplier</label>
            <select 
              name="supplierId"
              required
              value={formData.supplierId}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300"
            >
              <option value="">-- Choose Supplier --</option>
              {listings.map(supplier => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.companyName}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-[#0F172A] mb-1.5">Buyer Name</label>
              <input 
                type="text" 
                name="buyerName"
                required
                value={formData.buyerName}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-[#0F172A] mb-1.5">Buyer Email</label>
              <input 
                type="email" 
                name="buyerEmail"
                required
                value={formData.buyerEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#0F172A] mb-1.5">Subject</label>
            <input 
              type="text" 
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#0F172A] mb-1.5">Details</label>
            <textarea 
              name="details"
              required
              rows="3"
              value={formData.details}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#0F172A] mb-1.5">Quantity</label>
            <input 
              type="number" 
              name="quantity"
              required
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>

          {/* Footer */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100 mt-6">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-bold text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-[#D4AF37] border border-[#D4AF37] rounded-md text-[13px] font-bold text-[#0F172A] hover:bg-[#C2982B] transition-colors shadow-sm"
            >
              Create RFQ Entry
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
