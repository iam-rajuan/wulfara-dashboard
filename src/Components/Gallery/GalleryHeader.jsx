import React from 'react';

export default function GalleryHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div className="max-w-2xl">
        <h1 className="text-[28px] font-bold mb-1 tracking-tight text-[#0F172A]">Gallery & Business Files</h1>
        <p className="text-gray-500 text-[14px]">
          Upload product images, factory photos, and certification documents to enhance your profile.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-[13px] font-bold text-[#0F172A] shadow-sm hover:bg-gray-50 transition">
          Preview Listing
        </button>
        <button className="px-4 py-2 bg-[#D4AF37] hover:bg-[#C29F31] transition border border-[#D4AF37] rounded-lg text-[13px] font-bold text-[#0F172A] shadow-sm">
          Save Gallery
        </button>
      </div>
    </div>
  );
}
