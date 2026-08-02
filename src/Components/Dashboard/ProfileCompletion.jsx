import React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProfileCompletion({ profile, stats }) {
  const compStr = stats?.profileCompletion || '0%';
  const compVal = parseInt(compStr.replace('%', ''), 10) || 0;
  const hasBasicDetails = !!profile?.companyName && !!profile?.description;
  const hasCerts = profile?.certifications?.length > 0;
  const hasProducts = profile?.products?.length > 0;
  const hasShipping = profile?.serviceAreas?.length > 0 || (profile?.shippingOptions && Object.values(profile.shippingOptions).some(Boolean));
  
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
            <path className="text-[#D4AF37]" strokeDasharray={`${compVal}, 100`} strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <span className="absolute text-[13px] font-bold">{compStr}</span>
        </div>
        <div>
          <p className="font-bold text-[14px]">{compVal === 100 ? 'Profile Complete!' : 'Almost there!'}</p>
          <p className="text-[13px] text-gray-500 leading-snug mt-1">{compVal === 100 ? 'Great job filling out your profile.' : 'Complete tasks to reach 100%'}</p>
        </div>
      </div>

      <div className="space-y-3.5 mb-8 flex-1">
        <div className="flex items-center gap-3 text-[13px]">
          {hasBasicDetails ? <CheckCircle2 size={18} className="text-[#D4AF37]" strokeWidth={2.5} /> : <Circle size={18} className="text-gray-300" strokeWidth={2} />}
          <span className={hasBasicDetails ? "text-gray-500" : "font-bold text-[#0F172A]"}>Basic Company Details</span>
        </div>
        <div className="flex items-center gap-3 text-[13px]">
          {hasCerts ? <CheckCircle2 size={18} className="text-[#D4AF37]" strokeWidth={2.5} /> : <Circle size={18} className="text-gray-300" strokeWidth={2} />}
          <span className={hasCerts ? "text-gray-500" : "font-bold text-[#0F172A]"}>Upload Certifications</span>
        </div>
        <div className="flex items-center gap-3 text-[13px]">
          {hasProducts ? <CheckCircle2 size={18} className="text-[#D4AF37]" strokeWidth={2.5} /> : <Circle size={18} className="text-gray-300" strokeWidth={2} />}
          <span className={hasProducts ? "text-gray-500" : "font-bold text-[#0F172A]"}>Add Product Catalog</span>
        </div>
        <div className="flex items-center gap-3 text-[13px]">
          {hasShipping ? <CheckCircle2 size={18} className="text-[#D4AF37]" strokeWidth={2.5} /> : <Circle size={18} className="text-gray-300" strokeWidth={2} />}
          <span className={hasShipping ? "text-gray-500" : "font-bold text-[#0F172A]"}>Define Shipping Zones</span>
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
