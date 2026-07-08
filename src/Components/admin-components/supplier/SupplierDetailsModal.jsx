import React from "react";
import { X, CheckCircle, Ban, AlertCircle, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SupplierDetailsModal({ isOpen, onClose, supplier }) {
  const navigate = useNavigate();

  if (!isOpen || !supplier) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-[16px] font-extrabold text-[#0F172A]">
            Supplier Details
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Top Info */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg bg-[#F1F5F9] border border-gray-200 flex items-center justify-center flex-shrink-0 text-gray-500">
              {/* Simple fallback icon for details */}
              <div className="text-[24px] font-bold">
                {supplier.name.charAt(0)}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0F172A]">{supplier.name}</h3>
              <p className="text-gray-500 font-medium">{supplier.company}</p>
              <p className="text-gray-400 text-sm mt-1">{supplier.email}</p>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Plan</p>
              <p className="text-[14px] font-semibold text-[#0F172A]">{supplier.plan}</p>
            </div>
            
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Verification Status</p>
              <div className="flex items-center gap-1.5">
                {supplier.verification === "Verified" && <CheckCircle size={14} className="text-blue-600" />}
                {supplier.verification === "Pending" && <AlertCircle size={14} className="text-purple-600" />}
                {supplier.verification === "Suspended" && <Ban size={14} className="text-red-600" />}
                <p className="text-[14px] font-semibold text-[#0F172A]">{supplier.verification}</p>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Listing Status</p>
              <p className="text-[14px] font-semibold text-[#0F172A]">{supplier.listingStatus}</p>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Subscription</p>
              <p className="text-[14px] font-semibold text-[#0F172A]">{supplier.subscription}</p>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Additional Info / Actions */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h4 className="text-[12px] font-bold text-gray-700 mb-2">Internal Notes</h4>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Account was created recently and is currently under {supplier.verification.toLowerCase()} status. 
              Ensure compliance checks are completed before making changes to their subscription.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50 flex-shrink-0">
          <button 
            onClick={() => {
              onClose();
              navigate(`/supplier-management/verification/${supplier.id}`);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#F1F5F9] text-[#2563EB] rounded-lg text-[13px] font-bold hover:bg-[#E2E8F0] transition-colors"
          >
            Full Verification Page
            <ExternalLink size={14} />
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
