import React, { useState } from 'react';
import { Upload, Clock, Check, Globe, ChevronDown, Plus } from 'lucide-react';

export default function BusinessProfileForm({ data, onChange }) {
  const [newProduct, setNewProduct] = useState('');

  const handleProductAdd = (e) => {
    if (e.key === 'Enter' && newProduct.trim()) {
      onChange({ ...data, coreProducts: [...data.coreProducts, newProduct.trim()] });
      setNewProduct('');
    }
  };

  const removeProduct = (idx) => {
    const updated = data.coreProducts.filter((_, i) => i !== idx);
    onChange({ ...data, coreProducts: updated });
  };

  const toggleShipping = (key) => {
    onChange({ 
      ...data, 
      shippingOptions: { 
        ...data.shippingOptions, 
        [key]: !data.shippingOptions[key] 
      } 
    });
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-gray-100">
        <h2 className="text-[20px] font-bold text-[#0F172A]">Business Profile Information</h2>
      </div>

      <div className="p-6 md:p-8 space-y-10">
        {/* Logo */}
        <div>
          <label className="block text-[13px] font-bold text-[#0F172A] mb-3">Company Logo</label>
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="w-24 h-24 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center p-1.5 overflow-hidden relative">
              <div className="w-full h-full bg-[#0F172A] flex items-center justify-center rounded">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#D4AF37]">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-[13px] text-gray-500 mb-3 max-w-sm font-medium">
                Upload your corporate logo. Recommended size: 500×500px (JPG, PNG).
              </p>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-[13px] font-bold text-gray-700 bg-white hover:bg-gray-50 transition">
                <Upload size={16} className="text-gray-500" />
                Replace Logo
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-[13px] font-bold text-[#0F172A] mb-2">
            Company Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            className="w-full h-32 p-4 border border-gray-200 rounded-lg text-[14px] bg-[#F9FAFB] focus:bg-white focus:outline-none focus:border-gray-300 resize-none placeholder-gray-400"
            placeholder="Describe your manufacturing capabilities, history, and core competencies..."
          ></textarea>
          <div className="flex justify-between items-center mt-2">
            <span className="text-[11px] text-gray-400 font-medium">Markdown supported.</span>
            <span className="text-[11px] text-gray-400 font-medium">{data.description.length}/1000 characters</span>
          </div>
        </div>

        {/* Products & MOQ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Core Products / Services</label>
            <div className="w-full p-2 border border-gray-200 rounded-lg bg-[#F9FAFB] min-h-[46px] flex flex-wrap gap-2 items-center focus-within:bg-white focus-within:border-gray-300 transition">
              {data.coreProducts.map((product, idx) => (
                <div key={idx} className="flex items-center gap-1 bg-white border border-gray-200 px-2.5 py-1 rounded-md text-[13px] font-semibold text-[#0F172A]">
                  {product} 
                  <button onClick={() => removeProduct(idx)} className="text-gray-400 hover:text-gray-700 ml-1">×</button>
                </div>
              ))}
              <input 
                type="text" 
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                onKeyDown={handleProductAdd}
                placeholder="Add product... (Press Enter)" 
                className="bg-transparent text-[13px] outline-none flex-1 min-w-[140px] p-1" 
              />
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Minimum Order Quantity (MOQ)</label>
            <div className="flex">
              <input 
                type="text" 
                value={data.moq.value}
                onChange={(e) => onChange({ ...data, moq: { ...data.moq, value: e.target.value } })}
                placeholder="e.g. 500" 
                className="w-full p-2.5 border border-r-0 border-gray-200 rounded-l-lg text-[13px] bg-[#F9FAFB] focus:bg-white focus:outline-none" 
              />
              <div className="border border-gray-200 bg-[#EEF2F6] rounded-r-lg px-3 flex items-center gap-2 cursor-pointer border-l-0 text-[13px] font-medium text-gray-700">
                {data.moq.unit} <ChevronDown size={14} className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="border border-gray-200 rounded-xl p-5 bg-[#FAFBFC]">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} className="text-gray-800" strokeWidth={2.5} />
            <h3 className="text-[14px] font-bold text-[#0F172A]">Business Hours</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center flex-wrap gap-4">
              <span className="w-20 text-[13px] text-gray-600 font-medium">Mon - Fri</span>
              <div className="flex items-center gap-3">
                <input 
                  type="text" 
                  value={data.businessHours.weekdays.start} 
                  onChange={(e) => onChange({ ...data, businessHours: { ...data.businessHours, weekdays: { ...data.businessHours.weekdays, start: e.target.value } } })}
                  className="w-[100px] p-2 border border-gray-200 rounded text-[13px] text-center font-medium bg-white" 
                />
                <span className="text-[13px] text-gray-500 font-medium">to</span>
                <input 
                  type="text" 
                  value={data.businessHours.weekdays.end} 
                  onChange={(e) => onChange({ ...data, businessHours: { ...data.businessHours, weekdays: { ...data.businessHours.weekdays, end: e.target.value } } })}
                  className="w-[100px] p-2 border border-gray-200 rounded text-[13px] text-center font-medium bg-white" 
                />
              </div>
            </div>
            <div className="flex items-center gap-4 pt-1">
              <span className="w-20 text-[13px] text-gray-400 font-medium">Sat - Sun</span>
              <span className="text-[13px] text-gray-400 italic">{data.businessHours.weekends}</span>
            </div>
          </div>
        </div>

        {/* Certifications & Service Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[13px] font-bold text-[#0F172A] mb-3">Certifications</label>
            <div className="flex flex-wrap gap-2">
              {data.certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 border border-green-200 bg-[#F0FDF4] text-green-700 rounded-md text-[12px] font-bold">
                  <Check size={14} strokeWidth={3} /> {cert}
                </div>
              ))}
              <button className="flex items-center gap-1 px-3 py-1.5 border border-dashed border-gray-300 text-gray-500 rounded-md text-[12px] font-bold hover:bg-gray-50 transition">
                <Plus size={14} /> Add
              </button>
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-bold text-[#0F172A] mb-3">Global Service Areas</label>
            <div className="flex flex-wrap gap-2">
              {data.serviceAreas.map((area, idx) => (
                <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 bg-[#F3F4F6] text-gray-700 rounded-md text-[12px] font-bold">
                  <Globe size={14} strokeWidth={2} /> {area}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shipping Options */}
        <div>
          <label className="block text-[13px] font-bold text-[#0F172A] mb-4">Shipping & Freight Options</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-start gap-3 cursor-pointer" onClick={() => toggleShipping('fob')}>
              <div className={`w-[18px] h-[18px] rounded flex items-center justify-center shrink-0 mt-[2px] ${data.shippingOptions.fob ? 'bg-[#137847] text-white' : 'border border-gray-300 bg-white'}`}>
                {data.shippingOptions.fob && <Check size={14} strokeWidth={3} />}
              </div>
              <span className="text-[13px] text-gray-700 leading-snug font-medium">FOB (Free on<br />Board)</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer" onClick={() => toggleShipping('cif')}>
              <div className={`w-[18px] h-[18px] rounded flex items-center justify-center shrink-0 mt-[2px] ${data.shippingOptions.cif ? 'bg-[#137847] text-white' : 'border border-gray-300 bg-white'}`}>
                {data.shippingOptions.cif && <Check size={14} strokeWidth={3} />}
              </div>
              <span className="text-[13px] text-gray-700 leading-snug font-medium">CIF (Cost, Insurance,<br />Freight)</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer" onClick={() => toggleShipping('exw')}>
              <div className={`w-[18px] h-[18px] rounded flex items-center justify-center shrink-0 mt-[2px] ${data.shippingOptions.exw ? 'bg-[#137847] text-white' : 'border border-gray-300 bg-white'}`}>
                {data.shippingOptions.exw && <Check size={14} strokeWidth={3} />}
              </div>
              <span className="text-[13px] text-gray-700 leading-snug font-medium">EXW (Ex<br />Works)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
