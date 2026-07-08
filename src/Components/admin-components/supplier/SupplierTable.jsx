import React from "react";
import { BadgeCheck, ShieldAlert, AlertCircle, Edit2, Ban, CheckCircle, Eye, Box, Truck, PenTool, LayoutDashboard, MoreHorizontal, Trash2 } from "lucide-react";
import { Pagination } from "../buyer/BuyerTable"; // Re-use pagination

export default function SupplierTable({ suppliers, selectedIds, onSelect, onSelectAll, onEdit, onDelete, onApprove, onView }) {
  const [openActionId, setOpenActionId] = React.useState(null);
  const allSelected = suppliers.length > 0 && selectedIds.length === suppliers.length;

  const renderSupplierIcon = (iconName) => {
    switch (iconName) {
      case "Box": return <Box size={20} className="text-gray-600" />;
      case "Truck": return <Truck size={20} className="text-gray-600" />;
      case "Tool": return <PenTool size={20} className="text-gray-600" />;
      default: return <LayoutDashboard size={20} className="text-gray-600" />;
    }
  };

  const getPlanBadge = (plan) => {
    switch (plan) {
      case "Premium": return <span className="px-2.5 py-1 bg-[#F3E8FF] text-[#7E22CE] text-[11px] font-bold rounded-md">Premium</span>;
      case "Pro": return <span className="px-2.5 py-1 bg-[#DBEAFE] text-[#1E40AF] text-[11px] font-bold rounded-md">Pro</span>;
      case "Basic": return <span className="px-2.5 py-1 bg-[#E2E8F0] text-[#475569] text-[11px] font-bold rounded-md">Basic</span>;
      default: return null;
    }
  };

  const getVerificationBadge = (verification) => {
    switch (verification) {
      case "Verified":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#DBEAFE] text-[#1E40AF] border border-[#BFDBFE] text-[11px] font-bold rounded-md">
            <BadgeCheck size={12} className="text-[#1E40AF]" />
            Verified
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F3E8FF] text-[#7E22CE] border border-[#E9D5FF] text-[11px] font-bold rounded-md">
            <AlertCircle size={12} className="text-[#7E22CE]" />
            Pending
          </span>
        );
      case "Suspended":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA] text-[11px] font-bold rounded-md">
            <ShieldAlert size={12} className="text-[#991B1B]" />
            Suspended
          </span>
        );
      default: return null;
    }
  };

  const getListingStatusBadge = (status) => {
    if (status.startsWith("Approved")) {
      return <span className="px-2.5 py-1 bg-[#DBEAFE] text-[#1E40AF] text-[11px] font-bold rounded-md">{status}</span>;
    }
    if (status.startsWith("Pending")) {
      return <span className="px-2.5 py-1 bg-[#F3E8FF] text-[#7E22CE] text-[11px] font-bold rounded-md">{status}</span>;
    }
    if (status.startsWith("Hidden")) {
      return <span className="px-2.5 py-1 bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA] text-[11px] font-bold rounded-md">{status}</span>;
    }
    return <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-[11px] font-bold rounded-md">{status}</span>;
  };

  const getSubscriptionStatus = (sub) => {
    let dotColor = "bg-gray-400";
    if (sub === "Active") dotColor = "bg-[#475569]"; // dark gray as per screenshot
    if (sub === "Past Due") dotColor = "bg-[#DC2626]"; // red
    if (sub === "Paused") dotColor = "bg-[#7E22CE]"; // purple

    return (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
        <span className="text-[13px] font-medium text-gray-700">{sub}</span>
      </div>
    );
  };



  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="py-4 pl-6 pr-4 w-12">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onSelectAll}
                className="w-4 h-4 text-[#D4AF37] rounded border-gray-300 focus:ring-[#D4AF37]"
              />
            </th>
            <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Supplier</th>
            <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Plan</th>
            <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Verification</th>
            <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Listing Status</th>
            <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Subscription</th>
            <th className="py-4 pr-6 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {suppliers.map((supplier) => (
            <tr key={supplier.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-4 pl-6 pr-4">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(supplier.id)}
                  onChange={() => onSelect(supplier.id)}
                  className="w-4 h-4 text-[#D4AF37] rounded border-gray-300 focus:ring-[#D4AF37]"
                />
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-[#F1F5F9] border border-gray-200 flex items-center justify-center">
                    {renderSupplierIcon(supplier.icon)}
                  </div>
                  <div>
                    <div className="text-[13.5px] font-bold text-[#0F172A]">
                      {supplier.name}
                    </div>
                    <div className="text-[12px] text-gray-500">
                      {supplier.company}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {supplier.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                {getPlanBadge(supplier.plan)}
              </td>
              <td className="py-4 px-4">
                {getVerificationBadge(supplier.verification)}
              </td>
              <td className="py-4 px-4">
                {getListingStatusBadge(supplier.listingStatus)}
              </td>
              <td className="py-4 px-4">
                {getSubscriptionStatus(supplier.subscription)}
              </td>
              <td className="py-4 pr-6 text-right relative">
                <button
                  onClick={() => setOpenActionId(openActionId === supplier.id ? null : supplier.id)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                >
                  <MoreHorizontal size={18} />
                </button>

                {openActionId === supplier.id && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setOpenActionId(null)}
                    ></div>
                    <div className="absolute right-6 top-10 w-32 bg-white rounded-md shadow-lg border border-gray-100 z-20 py-1 overflow-hidden">
                      <button
                        onClick={() => {
                          setOpenActionId(null);
                          onView && onView(supplier);
                        }}
                        className="w-full px-4 py-2 text-[12px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                      >
                        <Eye size={14} />
                        View
                      </button>
                      <button
                        onClick={() => {
                          setOpenActionId(null);
                          onEdit && onEdit(supplier);
                        }}
                        className="w-full px-4 py-2 text-[12px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                      >
                        <Edit2 size={14} />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setOpenActionId(null);
                          onDelete && onDelete(supplier.id);
                        }}
                        className="w-full px-4 py-2 text-[12px] font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
