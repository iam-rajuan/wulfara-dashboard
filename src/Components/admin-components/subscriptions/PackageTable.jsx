import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeletePlanMutation, useUpdatePlanMutation } from "../../../redux/features/subscriptions/subscriptionsApi";
import { Archive, CheckCircle2, ChevronDown, Edit2, MoreVertical, Filter, Trash2 } from "lucide-react";
import { toast } from 'react-toastify';
import { SubscriptionIcon } from "./subscriptionIconOptions";

const formatCurrency = (value) => {
  const amount = Number(value || 0);
  return `$${amount.toLocaleString()}`;
};

export default function PackageTable({ plans = [], statusFilter = "all", onStatusFilterChange }) {
  const navigate = useNavigate();
  const [deletePlan] = useDeletePlanMutation();
  const [updatePlan] = useUpdatePlanMutation();
  const [openActionId, setOpenActionId] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this plan?")) {
      try {
        await deletePlan(id).unwrap();
        toast.success("Plan deleted successfully");
      } catch {
        toast.error("Failed to delete plan");
      }
    }
  };

  const handleStatusChange = async (pkg, isActive) => {
    try {
      await updatePlan({
        id: pkg._id,
        planData: { isActive },
      }).unwrap();
      toast.success(isActive ? "Package marked active." : "Package archived.");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update package status.");
    }
  };

  const maxSuppliers = Math.max(...plans.map((plan) => plan.activeSuppliersCount || 0), 1);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
      
      {/* Table Header Controls */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange?.(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
          </select>
          <Filter size={14} className="absolute left-3 top-3 text-gray-400 hidden" />
          <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
        </div>
        
        <div className="text-[12px] font-bold text-gray-500 tracking-wider uppercase">
          Showing {plans.length} Packages
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-white border-b border-gray-100">
              <th className="py-4 pl-6 pr-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Package Name</th>
              <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Base Price</th>
              <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider w-48">Active Suppliers</th>
              <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="py-4 pr-6 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {plans.map((pkg) => (
              <tr key={pkg._id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-5 pl-6 pr-4">
                  <div className="flex items-center gap-4">
                    <SubscriptionIcon iconKey={pkg.iconKey} className="w-10 h-10 rounded-xl border" iconSize={18} />
                    <div>
                      <h4 className="text-[14px] font-bold text-[#0F172A] leading-tight">{pkg.name}</h4>
                      <p className="text-[12px] font-medium text-gray-500">{pkg.internalName || "N/A"}</p>
                    </div>
                  </div>
                </td>
                <td className="py-5 px-4">
                  <div className="text-[14px] font-bold text-[#0F172A]">
                    {formatCurrency(pkg.price)}<span className="text-[12px] font-medium text-gray-400">/mo</span>
                  </div>
                  <div className="text-[12px] font-medium text-gray-500">{pkg.billingCycle || "Monthly"}</div>
                </td>
                <td className="py-5 px-4">
                  <div className="text-[14px] font-bold text-[#0F172A] mb-1.5">{pkg.activeSuppliersCount || 0}</div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#0F172A] rounded-full" 
                      style={{ width: `${((pkg.activeSuppliersCount || 0) / maxSuppliers) * 100}%` }}
                    ></div>
                  </div>
                </td>
                <td className="py-5 px-4">
                  <span className={`inline-flex h-6 min-w-[60px] items-center justify-center px-2.5 ${
                    pkg.isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-[#FEF3C7] text-[#D97706]'
                  } text-[11px] font-bold rounded`}>
                    {pkg.isActive ? "Active" : "Archive"}
                  </span>
                </td>
                <td className="py-5 pr-6 text-right relative">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() =>
                        navigate(`/subscriptions/edit/${pkg._id}`, {
                          state: { plan: pkg },
                        })
                      }
                      className="text-gray-400 hover:text-[#0F172A] p-1.5 rounded-md transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => setOpenActionId(openActionId === pkg._id ? null : pkg._id)}
                      className="text-gray-400 hover:text-gray-600 p-1.5 rounded-md transition-colors focus:outline-none"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  {openActionId === pkg._id && (
                    <>
                      <div 
                        className="fixed inset-0 z-50"
                        onClick={() => setOpenActionId(null)}
                      ></div>
                      <div className="absolute right-6 top-12 w-40 bg-white rounded-md shadow-xl border border-gray-100 z-50 py-1 overflow-hidden">
                        <button
                          onClick={() => {
                            setOpenActionId(null);
                            handleStatusChange(pkg, true);
                          }}
                          disabled={pkg.isActive}
                          className="w-full h-9 px-4 text-[12px] font-bold text-emerald-700 hover:bg-emerald-50 disabled:text-gray-300 disabled:hover:bg-white disabled:cursor-not-allowed flex items-center justify-start gap-2 transition-colors"
                        >
                          <CheckCircle2 size={14} />
                          Active
                        </button>
                        <button
                          onClick={() => {
                            setOpenActionId(null);
                            handleStatusChange(pkg, false);
                          }}
                          disabled={!pkg.isActive}
                          className="w-full h-9 px-4 text-[12px] font-bold text-amber-700 hover:bg-amber-50 disabled:text-gray-300 disabled:hover:bg-white disabled:cursor-not-allowed flex items-center justify-start gap-2 transition-colors"
                        >
                          <Archive size={14} />
                          Archive
                        </button>
                        <button
                          onClick={() => {
                            setOpenActionId(null);
                            handleDelete(pkg._id);
                          }}
                          className="w-full h-9 px-4 text-[12px] font-bold text-red-600 hover:bg-red-50 flex items-center justify-start gap-2 transition-colors"
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
            {plans.length === 0 && (
              <tr>
                <td colSpan="5" className="py-8 text-center text-[13px] font-medium text-gray-500">
                  No subscription packages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
