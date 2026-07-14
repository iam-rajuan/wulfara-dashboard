import React from 'react';

export default function ProfileHeader({ 
  title = "Company Profile Details",
  subtitle = "Complete your supplier profile to increase visibility and trust in the marketplace.",
  previewText = "Preview Listing",
  saveText = "Save Profile",
  onPreview, 
  onSave 
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
      <div>
        <h1 className="text-[28px] font-bold mb-1 tracking-tight text-[#0F172A]">{title}</h1>
        <p className="text-gray-500 text-[14px]">{subtitle}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
        <button
          onClick={onPreview}
          className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 rounded-lg text-[13px] font-bold text-[#0F172A] shadow-sm hover:bg-gray-50 transition justify-center text-center"
        >
          {previewText}
        </button>
        <button
          onClick={onSave}
          className="w-full sm:w-auto px-4 py-2 bg-[#0A4A25] border border-[#0A4A25] rounded-lg text-[13px] font-bold text-white shadow-sm hover:bg-[#07361a] transition flex items-center justify-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
          {saveText}
        </button>
      </div>
    </div>
  );
}
