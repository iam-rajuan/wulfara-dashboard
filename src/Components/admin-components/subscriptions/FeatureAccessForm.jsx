import React from "react";
import { CheckCircle, Palette, PlusCircle, Trash2 } from "lucide-react";

const createEmptyFeature = () => "";

const normalizeFeatures = (features) =>
  Array.isArray(features) && features.length > 0
    ? features.map((feature) => String(feature ?? ""))
    : [createEmptyFeature()];

export default function FeatureAccessForm({ data = {}, onChange }) {
  const features = normalizeFeatures(data.features);

  const handleFieldChange = (e) => {
    onChange?.(e.target.name, e.target.value);
  };

  const updateFeatures = (nextFeatures) => {
    onChange?.("features", nextFeatures);
  };

  const handleFeatureChange = (index, value) => {
    updateFeatures(features.map((feature, featureIndex) => (featureIndex === index ? value : feature)));
  };

  const handleAddFeature = () => {
    updateFeatures([...features, createEmptyFeature()]);
  };

  const handleRemoveFeature = (index) => {
    if (features.length === 1) {
      updateFeatures([createEmptyFeature()]);
      return;
    }

    updateFeatures(features.filter((_, featureIndex) => featureIndex !== index));
  };

  return (
    <div id="Features" className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-6 md:p-8 scroll-mt-48 transition-all hover:shadow-md">
      <div className="flex items-center gap-2.5 mb-6 border-b border-gray-100 pb-4">
        <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
          <CheckCircle size={16} strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-[15px] font-black text-[#0E1726] tracking-tight">Subscription Card Content</h2>
          <p className="text-[11px] text-gray-400 mt-0.5">Control the badge, accent color, and feature bullets suppliers see before checkout.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6">
        <div className="space-y-5">
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Badge Text</label>
            <input
              type="text"
              name="badgeText"
              value={data.badgeText || ""}
              onChange={handleFieldChange}
              placeholder="e.g. Best Value"
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-[#0E1726] placeholder:text-gray-300 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Accent Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                name="accentColor"
                value={data.accentColor || "#D4AF37"}
                onChange={handleFieldChange}
                className="h-10 w-12 rounded-lg border border-gray-200 bg-white p-1 cursor-pointer"
              />
              <div className="relative flex-1">
                <Palette size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="accentColor"
                  value={data.accentColor || ""}
                  onChange={handleFieldChange}
                  placeholder="#D4AF37"
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-[#0E1726] placeholder:text-gray-300 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200/80 bg-gray-50/50 p-4">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-[13px] font-black text-[#0E1726]">Feature Bullets</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">These lines appear directly on the subscription card.</p>
            </div>
            <button
              type="button"
              onClick={handleAddFeature}
              className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-[12px] font-bold text-[#0E1726] hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all flex items-center gap-1.5"
            >
              <PlusCircle size={14} className="text-[#D4AF37]" strokeWidth={2.5} />
              Add
            </button>
          </div>

          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="h-8 w-8 shrink-0 rounded-lg bg-white border border-gray-200 text-[11px] font-black text-gray-400 flex items-center justify-center">
                  {index + 1}
                </span>
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder="e.g. Verified supplier badge"
                  className="min-w-0 flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-[12px] font-medium text-[#0E1726] placeholder:text-gray-300 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
                  className="h-8 w-8 rounded-lg text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center"
                  aria-label={`Remove feature ${index + 1}`}
                >
                  <Trash2 size={14} strokeWidth={2.5} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
