import React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProfileCompletion() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col">
      <div className="mb-6">
        <h3 className="font-bold text-[16px] text-[#0F172A] mb-1">Profile Completion</h3>
        <p className="text-gray-500 text-[13px]">Stand out to buyers</p>
      </div>
      
      <div className="flex items-center gap-5 mb-8">
        <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className="text-[#D4AF37]" strokeDasharray="82, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <span className="absolute text-[13px] font-bold">82%</span>
        </div>
        <div>
          <p className="font-bold text-[14px]">Almost there!</p>
          <p className="text-[13px] text-gray-500 leading-snug mt-1">Complete tasks to reach 100%</p>
        </div>
      </div>

      <div className="space-y-3.5 mb-8 flex-1">
        <div className="flex items-center gap-3 text-[13px]">
          <CheckCircle2 size={18} className="text-[#D4AF37]" strokeWidth={2.5} />
          <span className="text-gray-500">Basic Company Details</span>
        </div>
        <div className="flex items-center gap-3 text-[13px]">
          <CheckCircle2 size={18} className="text-[#D4AF37]" strokeWidth={2.5} />
          <span className="text-gray-500">Upload Certifications</span>
        </div>
        <div className="flex items-center gap-3 text-[13px]">
          <Circle size={18} className="text-gray-300" strokeWidth={2} />
          <span className="font-bold text-[#0F172A]">Add Product Catalog <span className="text-red-500">*</span></span>
        </div>
        <div className="flex items-center gap-3 text-[13px]">
          <Circle size={18} className="text-gray-300" strokeWidth={2} />
          <span className="text-gray-500">Define Shipping Zones</span>
        </div>
      </div>

      <Link to="/profile" className="mt-auto">
        <button className="w-full py-3 bg-[#D4AF37] hover:bg-[#C29F31] transition text-[#0F172A] font-bold rounded-lg flex justify-center items-center gap-2 text-[14px]">
          Complete Profile
          <ArrowRight size={18} strokeWidth={2.5} />
        </button>
      </Link>
    </div>
  );
}
