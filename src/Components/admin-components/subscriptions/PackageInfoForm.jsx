import React from "react";
import { Info } from "lucide-react";

export default function PackageInfoForm({ data = {}, onChange }) {
  const handleChange = (e) => {
    if (onChange) onChange(e.target.name, e.target.value);
  };

  return (
    <div id="Overview" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 scroll-mt-48">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
        <Info size={16} className="text-gray-400" />
        <h2 className="text-[14px] font-extrabold text-[#0F172A]">Package Information</h2>
      </div>

      <div className="space-y-5">
        
        {/* Package Name */}
        <div>
          <label className="block text-[12px] font-bold text-[#0F172A] mb-1.5">Package Name</label>
          <input 
            type="text" 
            name="name"
            value={data.name || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Slug */}
          <div>
            <label className="block text-[12px] font-bold text-[#0F172A] mb-1.5">Slug</label>
            <input 
              type="text" 
              name="slug"
              value={data.slug || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] font-medium text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-[12px] font-bold text-[#0F172A] mb-1.5">Status</label>
            <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300">
              <option>Published</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-[12px] font-bold text-[#0F172A] mb-1.5">Description</label>
          <textarea 
            rows={3}
            name="description"
            value={data.description || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
          {/* Badge Selection */}
          <div>
            <label className="block text-[12px] font-bold text-[#0F172A] mb-1.5">Badge Selection</label>
            <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-gray-300">
              <option>Popular</option>
              <option>Best Value</option>
              <option>None</option>
            </select>
          </div>

          {/* Public Visibility Toggle */}
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
            <span className="text-[12px] font-bold text-[#0F172A]">Public Visibility</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D97706]"></div>
            </label>
          </div>
        </div>

      </div>
    </div>
  );
}
