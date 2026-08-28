import React from "react";
import { Info, Sparkles } from "lucide-react";
import {
  SUBSCRIPTION_ICON_OPTIONS,
  SubscriptionIcon,
  getSubscriptionIconOption,
} from "./subscriptionIconOptions";

export default function PackageInfoForm({ data = {}, onChange }) {
  const handleChange = (e) => {
    if (onChange) onChange(e.target.name, e.target.value);
  };

  const selectedIcon = getSubscriptionIconOption(data.iconKey);

  return (
    <div id="Overview" className="grid grid-cols-1 xl:grid-cols-[1.5fr_0.9fr] gap-6 scroll-mt-48">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-6 md:p-8 transition-all hover:shadow-md h-full flex flex-col">
        <div className="flex items-center gap-2.5 mb-6 border-b border-gray-100 pb-4">
          <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
            <Info size={16} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-[15px] font-black text-[#0E1726] tracking-tight">Package Information</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">Basic details and metadata for the subscription package.</p>
          </div>
        </div>

        <div className="space-y-5 flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Internal Name</label>
              <input
                type="text"
                name="internalName"
                placeholder="e.g. basic_plan"
                value={data.internalName || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-[#0E1726] placeholder:text-gray-300 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Display Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Premium Supplier"
                value={data.name || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-[#0E1726] placeholder:text-gray-300 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Slug</label>
              <input
                type="text"
                name="slug"
                placeholder="e.g. premium-supplier"
                value={data.slug || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Status</label>
              <select
                name="status"
                value={data.status || "Draft"}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-[#0E1726] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="flex-1 flex flex-col mt-5">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Description</label>
            <textarea
              rows={4}
              name="description"
              placeholder="Describe the plan benefits and terms..."
              value={data.description || ""}
              onChange={handleChange}
              className="w-full flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-[#0E1726] placeholder:text-gray-300 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all resize-none min-h-[120px]"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-6 transition-all hover:shadow-md h-full flex flex-col justify-between">
        <div className="flex items-start gap-4 mb-5 border-b border-gray-100 pb-4">
          <SubscriptionIcon iconKey={selectedIcon.key} className="w-14 h-14 rounded-2xl border flex-shrink-0" iconSize={26} />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">Plan Identity</p>
            <h3 className="text-[18px] font-black text-[#0E1726] mt-0.5">{data.name || "Untitled Plan"}</h3>
            <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
              {selectedIcon.label} icon selected. This icon will appear anywhere this subscription package is shown.
            </p>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <Sparkles size={14} className="text-[#D4AF37]" strokeWidth={2.5} />
          <p className="text-[12px] font-bold text-[#0E1726]">Choose Subscription Icon</p>
        </div>
        <div className="grid grid-cols-2 gap-3 flex-1">
          {SUBSCRIPTION_ICON_OPTIONS.map((option) => {
            const isSelected = option.key === data.iconKey;

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => onChange?.("iconKey", option.key)}
                className={`rounded-xl border p-3.5 text-left transition-all relative flex flex-col justify-between hover:-translate-y-0.5 active:translate-y-0 duration-200 ${
                  isSelected
                    ? "border-[#D4AF37] bg-[#D4AF37]/5 shadow-xs ring-1 ring-[#D4AF37]/20"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 w-4 h-4 bg-[#D4AF37] text-white rounded-full flex items-center justify-center shadow-xs">
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <div className="flex flex-col gap-3">
                  <SubscriptionIcon iconKey={option.key} className="w-9 h-9 rounded-xl border flex-shrink-0" iconSize={16} />
                  <div>
                    <p className="text-[12px] font-extrabold text-[#0E1726]">{option.label}</p>
                    <p className="text-[10px] text-gray-400 mt-1 leading-normal">{option.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
