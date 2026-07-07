import React from 'react';
import { BadgeCheck, MapPin } from 'lucide-react';

export default function ListingPreviewCard({ previewData }) {
  return (
    <div className="bg-[#F8F9FB] rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-[#F4F6F9]">
        <h3 className="font-bold text-[14px] text-[#0F172A]">Listing Preview</h3>
        <span className="bg-[#A7F3D0] text-[#065F46] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">Live</span>
      </div>
      <div className="p-5 bg-white">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 bg-[#0F172A] rounded flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#D4AF37]">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-[14px] text-[#0F172A]">{previewData.name}</h4>
              <BadgeCheck size={14} className="text-[#137847]" strokeWidth={2.5} />
            </div>
            <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-0.5 font-medium">
              <MapPin size={12} strokeWidth={2} />
              {previewData.location}
            </div>
          </div>
        </div>
        <p className="text-[12px] text-gray-600 mb-4 leading-relaxed font-medium">
          {previewData.description}
        </p>
        <div className="flex gap-2">
          {previewData.tags.map((tag, idx) => (
            <span key={idx} className="bg-[#F3F4F6] text-gray-600 text-[10px] font-bold px-2 py-1 rounded border border-gray-200">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
