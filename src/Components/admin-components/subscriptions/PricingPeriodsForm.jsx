import React, { useEffect, useMemo, useState } from "react";
import { CreditCard, Pencil, PlusCircle, Trash2, X, Clock, CalendarRange } from "lucide-react";

const createEmptyListingPeriod = () => ({
  durationMonths: "",
  isActive: true,
  discountPercent: 0,
  customLabel: "",
});

const formatMoney = (value) => {
  const amount = Number(value || 0);
  if (Number.isNaN(amount)) {
    return "$0";
  }

  return `$${amount.toLocaleString()}`;
};

const calculateDiscountedPrice = (basePrice, discountPercent) => {
  const base = Number(basePrice || 0);
  const discount = Number(discountPercent || 0);

  if (Number.isNaN(base) || Number.isNaN(discount)) {
    return "$0";
  }

  const discounted = Math.max(base - (base * discount) / 100, 0);
  return formatMoney(discounted);
};

export default function PricingPeriodsForm({ data = {}, onChange, errors = {} }) {
  const listingPeriods = useMemo(
    () => (Array.isArray(data.listingPeriods) && data.listingPeriods.length > 0 ? data.listingPeriods : [createEmptyListingPeriod()]),
    [data.listingPeriods]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (selectedIndex > listingPeriods.length - 1) {
      setSelectedIndex(Math.max(0, listingPeriods.length - 1));
    }
  }, [listingPeriods.length, selectedIndex]);

  const handleChange = (e) => {
    if (onChange) onChange(e.target.name, e.target.value);
  };

  const updateListingPeriods = (nextListingPeriods) => {
    if (onChange) {
      onChange("listingPeriods", nextListingPeriods);
    }
  };

  const handlePeriodChange = (index, field, value) => {
    const nextListingPeriods = listingPeriods.map((period, periodIndex) =>
      periodIndex === index
        ? {
            ...period,
            [field]: value,
          }
        : period
    );

    updateListingPeriods(nextListingPeriods);
  };

  const handleAddListingPeriod = () => {
    const nextListingPeriods = [...listingPeriods, createEmptyListingPeriod()];
    updateListingPeriods(nextListingPeriods);
    setSelectedIndex(nextListingPeriods.length - 1);
  };

  const handleRemoveListingPeriod = (index) => {
    if (listingPeriods.length === 1) {
      return;
    }

    const nextListingPeriods = listingPeriods.filter((_, periodIndex) => periodIndex !== index);
    updateListingPeriods(nextListingPeriods);
    setSelectedIndex((currentIndex) => {
      if (currentIndex > index) {
        return currentIndex - 1;
      }

      return Math.min(currentIndex, nextListingPeriods.length - 1);
    });
  };

  const selectedPeriod = listingPeriods[selectedIndex] || createEmptyListingPeriod();
  const activePeriodsCount = listingPeriods.filter((period) => period.isActive !== false).length;
  const sortedDurations = listingPeriods
    .map((period) => Number(period.durationMonths || 0))
    .filter((duration) => Number.isFinite(duration) && duration > 0)
    .sort((a, b) => a - b);
  const shortestDuration = sortedDurations[0] || 0;

  return (
    <div id="Pricing" className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-6 md:p-8 scroll-mt-48 transition-all hover:shadow-md">
      <div className="flex items-center gap-2.5 mb-6 border-b border-gray-100 pb-4">
        <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
          <CreditCard size={16} strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-[15px] font-black text-[#0E1726] tracking-tight">Pricing & Listing Periods</h2>
          <p className="text-[11px] text-gray-400 mt-0.5">Set the base price, billing cycle, and listing durations suppliers can choose from.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_0.9fr] gap-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Base Price</label>
            <div className="relative flex items-center w-full">
              <span className="absolute left-4 text-[13px] font-bold text-gray-400">$</span>
              <input
                type="text"
                name="basePrice"
                placeholder="0.00"
                value={data.basePrice || ""}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-extrabold text-[#0E1726] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>
          </div>

          <div className="md:col-span-1">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Billing Cycle</label>
            <select
              name="billingCycle"
              value={data.billingCycle || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-[#0E1726] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
            >
              <option value="">Select Billing Cycle...</option>
              <option value="Annual (Paid Upfront)">Annual (Paid Upfront)</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          <div className="md:col-span-1">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Tax Category</label>
            <select
              name="taxCategory"
              value={data.taxCategory || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-[#0E1726] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
            >
              <option value="">Select Tax Category...</option>
              <option value="Standard Digital Service">Standard Digital Service</option>
              <option value="Exempt">Exempt</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-200 bg-[#FCFCFD] p-4 relative flex flex-col justify-between overflow-hidden shadow-2xs hover:shadow-xs transition-all duration-200">
            <div className="flex justify-between items-start">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-400">Active Periods</p>
              <div className="w-6 h-6 rounded-md bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                <CalendarRange size={13} strokeWidth={2.5} />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-[24px] font-black text-[#0E1726] leading-none">{activePeriodsCount}</p>
              <p className="text-[10px] text-gray-400 mt-1.5 leading-tight">Visible durations enabled</p>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-[#FCFCFD] p-4 relative flex flex-col justify-between overflow-hidden shadow-2xs hover:shadow-xs transition-all duration-200">
            <div className="flex justify-between items-start">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-400">Starting Term</p>
              <div className="w-6 h-6 rounded-md bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                <Clock size={13} strokeWidth={2.5} />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-[24px] font-black text-[#0E1726] leading-none">
                {shortestDuration ? `${shortestDuration} mo` : "--"}
              </p>
              <p className="text-[10px] text-gray-400 mt-1.5 leading-tight">Shortest term duration</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 w-full border border-gray-200/80 rounded-xl overflow-hidden shadow-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100">
                <th className="py-3 px-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Duration (Months)</th>
                <th className="py-3 px-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Supplier Pays</th>
                <th className="py-3 px-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Discount Applied</th>
                <th className="py-3 px-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {listingPeriods.map((period, index) => {
                const isSelected = index === selectedIndex;
                const durationLabel = period.durationMonths ? `${period.durationMonths} Months` : "New Listing Period";

                return (
                  <tr
                    key={`${period.durationMonths || "new"}-${index}`}
                    className={`cursor-pointer transition-all border-l-4 ${
                      isSelected
                        ? "bg-[#D4AF37]/5 border-l-4 border-l-[#D4AF37]"
                        : "border-l-transparent hover:bg-gray-50/50"
                    }`}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <td className="py-3.5 px-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={period.isActive !== false}
                          onChange={(e) => handlePeriodChange(index, "isActive", e.target.checked)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="w-8 h-4.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2.5px] after:left-[2.5px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                      </label>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        onClick={() => setSelectedIndex(index)}
                        className={`text-[13px] font-extrabold transition-colors ${
                          isSelected ? "text-[#D4AF37]" : "text-[#0E1726] hover:text-[#D4AF37]"
                        }`}
                      >
                        {durationLabel}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-[13px] font-semibold text-gray-500">
                      {calculateDiscountedPrice(data.basePrice, period.discountPercent)}
                    </td>
                    <td className="py-3.5 px-4 text-[13px] font-bold text-[#D4AF37]">
                      {Number(period.discountPercent || 0)}%
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIndex(index);
                          }}
                          className={`inline-flex items-center gap-1.5 text-[11px] font-bold transition-all px-2.5 py-1.5 rounded-md ${
                            isSelected ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "text-gray-500 hover:text-[#0E1726] hover:bg-gray-50"
                          }`}
                        >
                          <Pencil size={11} strokeWidth={2.5} />
                          {isSelected ? "Editing" : "Edit"}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveListingPeriod(index);
                          }}
                          disabled={listingPeriods.length === 1}
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-red-500 disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-red-50 px-2.5 py-1.5 rounded-md transition-colors"
                        >
                          <Trash2 size={11} strokeWidth={2.5} />
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {errors.listingPeriods ? (
            <div className="border-t border-red-100 bg-red-50 px-4 py-3 text-[12px] font-medium text-red-700">
              {errors.listingPeriods}
            </div>
          ) : null}
        </div>

        <div className="w-full lg:w-80 border border-gray-200/80 rounded-xl p-5 bg-gray-50/50 shadow-xs relative">
          <div className="flex justify-between items-center mb-4 border-b border-gray-200/60 pb-3">
            <h3 className="text-[13px] font-black text-[#0E1726] tracking-tight">
              Edit Period: {selectedPeriod.durationMonths ? `${selectedPeriod.durationMonths} Mo` : "New"}
            </h3>
            <button
              type="button"
              onClick={() => setSelectedIndex(0)}
              className="text-gray-400 hover:text-[#0E1726] p-1 hover:bg-gray-100 rounded-md transition-all"
            >
              <X size={14} />
            </button>
          </div>
          <p className="mb-5 text-[11px] text-gray-400 leading-normal">
            Select a listing period row on the left to edit its duration, discount, or label.
          </p>

          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Duration (Months)</label>
              <div className="relative flex items-center w-full">
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={selectedPeriod.durationMonths ?? ""}
                  onChange={(e) => handlePeriodChange(selectedIndex, "durationMonths", e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-[12px] font-bold text-[#0E1726] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Discount (%)</label>
              <div className="relative flex items-center w-full">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={selectedPeriod.discountPercent ?? 0}
                  onChange={(e) => handlePeriodChange(selectedIndex, "discountPercent", e.target.value)}
                  className="w-full pr-8 pl-3 py-2 bg-white border border-gray-200 rounded-lg text-[12px] font-bold text-[#0E1726] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                />
                <span className="absolute right-3.5 text-[12px] font-bold text-gray-400">%</span>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Custom Label</label>
              <input
                type="text"
                value={selectedPeriod.customLabel || ""}
                onChange={(e) => handlePeriodChange(selectedIndex, "customLabel", e.target.value)}
                placeholder="Optional, e.g. Best Value"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-[12px] font-medium text-[#0E1726] placeholder:text-gray-300 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>
          </div>

          <div className="border-t border-gray-200/60 pt-4 mt-5">
            <button
              type="button"
              onClick={handleAddListingPeriod}
              className="w-full py-2 bg-white border border-gray-200 hover:border-[#D4AF37] hover:bg-gray-50 text-[#0E1726] text-[12px] font-bold rounded-lg transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-[0.98]"
            >
              <PlusCircle size={14} className="text-[#D4AF37]" strokeWidth={2.5} />
              Add Listing Period
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
