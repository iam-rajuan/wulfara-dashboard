import React, { useEffect, useMemo, useState } from 'react';
import { Upload, Clock, Check, Globe, ChevronDown, Plus, X } from 'lucide-react';

export default function BusinessProfileForm({ data, onChange, onLogoUpload, isUploadingLogo }) {
  const [newProduct, setNewProduct] = useState('');
  const [newCert, setNewCert] = useState('');
  const [newArea, setNewArea] = useState('');
  const [logoLoadFailed, setLogoLoadFailed] = useState(false);

  const resolvedLogo = useMemo(() => {
    if (!data.logo || data.logo === 'no-logo.jpg') {
      return '';
    }

    return data.logo;
  }, [data.logo]);

  useEffect(() => {
    setLogoLoadFailed(false);
  }, [resolvedLogo]);

  const handleProductAdd = (e) => {
    if (e.key === 'Enter' && newProduct.trim()) {
      e.preventDefault();
      onChange({ ...data, coreProducts: [...(data.coreProducts || []), newProduct.trim()] });
      setNewProduct('');
    }
  };

  const removeProduct = (idx) => {
    const updated = (data.coreProducts || []).filter((_, i) => i !== idx);
    onChange({ ...data, coreProducts: updated });
  };

  const handleCertAdd = (e) => {
    if (e.key === 'Enter' && newCert.trim()) {
      e.preventDefault();
      onChange({ ...data, certifications: [...(data.certifications || []), newCert.trim()] });
      setNewCert('');
    }
  };

  const removeCert = (idx) => {
    const updated = (data.certifications || []).filter((_, i) => i !== idx);
    onChange({ ...data, certifications: updated });
  };

  const handleAreaAdd = (e) => {
    if (e.key === 'Enter' && newArea.trim()) {
      e.preventDefault();
      onChange({ ...data, serviceAreas: [...(data.serviceAreas || []), newArea.trim()] });
      setNewArea('');
    }
  };

  const removeArea = (idx) => {
    const updated = (data.serviceAreas || []).filter((_, i) => i !== idx);
    onChange({ ...data, serviceAreas: updated });
  };

  const toggleShipping = (key) => {
    onChange({ 
      ...data, 
      shippingOptions: { 
        ...(data.shippingOptions || {}), 
        [key]: !data.shippingOptions?.[key] 
      } 
    });
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (onLogoUpload) {
        await onLogoUpload(file);
      } else {
        const url = URL.createObjectURL(file);
        onChange({ ...data, logo: url });
      }
    }
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
            <div className="w-24 h-24 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center p-1.5 overflow-hidden relative shrink-0">
              {resolvedLogo && !logoLoadFailed ? (
                <img
                  src={resolvedLogo}
                  alt="Company Logo"
                  className="w-full h-full object-cover rounded"
                  onError={() => setLogoLoadFailed(true)}
                />
              ) : (
                <div className="w-full h-full bg-[#0F172A] flex items-center justify-center rounded">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#D4AF37]">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              )}
            </div>
            <div>
              <p className="text-[13px] text-gray-500 mb-3 max-w-sm font-medium">
                Upload your corporate logo. Recommended size: 500×500px (JPG, PNG).
              </p>
              <label className={`flex items-center justify-center sm:justify-start gap-2 px-4 py-2 border border-gray-300 rounded-lg text-[13px] font-bold text-gray-700 bg-white transition w-full sm:w-max ${isUploadingLogo ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'}`}>
                <Upload size={16} className="text-gray-500" />
                {isUploadingLogo ? 'Uploading...' : resolvedLogo && !logoLoadFailed ? 'Replace Logo' : 'Upload Logo'}
                <input type="file" accept="image/png, image/jpeg" className="hidden" disabled={isUploadingLogo} onChange={handleLogoUpload} />
              </label>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-[13px] font-bold text-[#0F172A] mb-2">
            Company Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={data.description || ''}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            className="w-full h-32 p-4 border border-gray-200 rounded-lg text-[14px] bg-[#F9FAFB] focus:bg-white focus:outline-none focus:border-gray-300 resize-none placeholder-gray-400"
            placeholder="Describe your manufacturing capabilities, history, and core competencies..."
          ></textarea>
          <div className="flex justify-between items-center mt-2">
            <span className="text-[11px] text-gray-400 font-medium">Markdown supported.</span>
            <span className="text-[11px] text-gray-400 font-medium">{(data.description || '').length}/1000 characters</span>
          </div>
        </div>

        {/* General Details: Contact, Address, Type, Response Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Business Contact Email</label>
            <input
              type="email"
              value={data.contactEmail || ''}
              onChange={(e) => onChange({ ...data, contactEmail: e.target.value })}
              placeholder="e.g. sales@company.com"
              className="w-full p-2.5 border border-gray-200 rounded-lg text-[13px] bg-[#F9FAFB] focus:bg-white focus:outline-none focus:border-gray-300 transition"
            />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Business Contact Phone</label>
            <input
              type="text"
              value={data.contactPhone || ''}
              onChange={(e) => onChange({ ...data, contactPhone: e.target.value })}
              placeholder="e.g. +1 555 123 4567"
              className="w-full p-2.5 border border-gray-200 rounded-lg text-[13px] bg-[#F9FAFB] focus:bg-white focus:outline-none focus:border-gray-300 transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Physical Address</label>
            <input 
              type="text" 
              value={data.address || ''} 
              onChange={(e) => onChange({ ...data, address: e.target.value })}
              placeholder="e.g. 123 Industrial Way, NY" 
              className="w-full p-2.5 border border-gray-200 rounded-lg text-[13px] bg-[#F9FAFB] focus:bg-white focus:outline-none focus:border-gray-300 transition" 
            />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Supplier Type</label>
            <div className="relative flex items-center">
              <select 
                value={data.supplierType || 'Manufacturer'}
                onChange={(e) => onChange({ ...data, supplierType: e.target.value })}
                className="w-full appearance-none border border-gray-200 rounded-lg pl-3 pr-8 py-2.5 text-[13px] bg-[#F9FAFB] focus:bg-white focus:outline-none focus:border-gray-300 transition cursor-pointer"
              >
                <option value="Manufacturer">Manufacturer</option>
                <option value="Distributor">Distributor</option>
                <option value="Wholesaler">Wholesaler</option>
                <option value="Broker">Broker</option>
                <option value="Service Provider">Service Provider</option>
              </select>
              <ChevronDown size={14} className="text-gray-500 absolute right-3 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Avg. Response Time</label>
            <input 
              type="text" 
              value={data.avgResponseTime || ''} 
              onChange={(e) => onChange({ ...data, avgResponseTime: e.target.value })}
              placeholder="e.g. ~2 Hours" 
              className="w-full p-2.5 border border-gray-200 rounded-lg text-[13px] bg-[#F9FAFB] focus:bg-white focus:outline-none focus:border-gray-300 transition" 
            />
          </div>
        </div>

        {/* Business Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Established Year</label>
            <input 
              type="text" 
              value={data.establishedYear || ''} 
              onChange={(e) => onChange({ ...data, establishedYear: e.target.value })}
              placeholder="e.g. 1998" 
              className="w-full p-2.5 border border-gray-200 rounded-lg text-[13px] bg-[#F9FAFB] focus:bg-white focus:outline-none focus:border-gray-300 transition" 
            />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Employee Count</label>
            <input 
              type="text" 
              value={data.employeeCount || ''} 
              onChange={(e) => onChange({ ...data, employeeCount: e.target.value })}
              placeholder="e.g. 50-100" 
              className="w-full p-2.5 border border-gray-200 rounded-lg text-[13px] bg-[#F9FAFB] focus:bg-white focus:outline-none focus:border-gray-300 transition" 
            />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Annual Turnover</label>
            <input 
              type="text" 
              value={data.annualTurnover || ''} 
              onChange={(e) => onChange({ ...data, annualTurnover: e.target.value })}
              placeholder="e.g. $5M - $10M" 
              className="w-full p-2.5 border border-gray-200 rounded-lg text-[13px] bg-[#F9FAFB] focus:bg-white focus:outline-none focus:border-gray-300 transition" 
            />
          </div>
        </div>

        {/* Products & MOQ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Core Products / Services</label>
            <div className="w-full p-2 border border-gray-200 rounded-lg bg-[#F9FAFB] min-h-[46px] flex flex-wrap gap-2 items-center focus-within:bg-white focus-within:border-gray-300 transition">
              {(data.coreProducts || []).map((product, idx) => (
                <div key={idx} className="flex items-center gap-1 bg-white border border-gray-200 px-2.5 py-1 rounded-md text-[13px] font-semibold text-[#0F172A]">
                  {product} 
                  <button onClick={() => removeProduct(idx)} className="text-gray-400 hover:text-gray-700 ml-1"><X size={14}/></button>
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
                type="number" 
                value={data.moq?.value || ''}
                onChange={(e) => onChange({ ...data, moq: { ...(data.moq || {}), value: e.target.value } })}
                placeholder="e.g. 500" 
                className="w-full p-2.5 border border-r-0 border-gray-200 rounded-l-lg text-[13px] bg-[#F9FAFB] focus:bg-white focus:outline-none" 
              />
              <div className="relative flex items-center">
                <select 
                  value={data.moq?.unit || 'Units'}
                  onChange={(e) => onChange({ ...data, moq: { ...(data.moq || {}), unit: e.target.value } })}
                  className="appearance-none border border-gray-200 bg-[#EEF2F6] rounded-r-lg pl-3 pr-8 py-2.5 border-l-0 text-[13px] font-medium text-gray-700 focus:outline-none h-full cursor-pointer"
                >
                  <option value="Units">Units</option>
                  <option value="Pieces">Pieces</option>
                  <option value="Kilograms">Kilograms</option>
                  <option value="Tons">Tons</option>
                  <option value="Liters">Liters</option>
                </select>
                <ChevronDown size={14} className="text-gray-500 absolute right-3 pointer-events-none" />
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
                  type="time" 
                  value={data.businessHours?.weekdays?.start || ''} 
                  onChange={(e) => onChange({ ...data, businessHours: { ...(data.businessHours || {}), weekdays: { ...(data.businessHours?.weekdays || {}), start: e.target.value } } })}
                  className="w-[110px] p-2 border border-gray-200 rounded text-[13px] text-center font-medium bg-white outline-none focus:border-gray-400" 
                />
                <span className="text-[13px] text-gray-500 font-medium">to</span>
                <input 
                  type="time" 
                  value={data.businessHours?.weekdays?.end || ''} 
                  onChange={(e) => onChange({ ...data, businessHours: { ...(data.businessHours || {}), weekdays: { ...(data.businessHours?.weekdays || {}), end: e.target.value } } })}
                  className="w-[110px] p-2 border border-gray-200 rounded text-[13px] text-center font-medium bg-white outline-none focus:border-gray-400" 
                />
              </div>
            </div>
            <div className="flex items-center flex-wrap gap-4 pt-1">
              <span className="w-20 text-[13px] text-gray-400 font-medium">Sat - Sun</span>
              <input 
                type="text" 
                value={data.businessHours?.weekends || ''} 
                onChange={(e) => onChange({ ...data, businessHours: { ...(data.businessHours || {}), weekends: e.target.value } })}
                placeholder="e.g. Closed"
                className="w-[245px] max-w-full p-2 border border-gray-200 rounded text-[13px] font-medium bg-white outline-none focus:border-gray-400" 
              />
            </div>
          </div>
        </div>

        {/* Certifications & Service Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[13px] font-bold text-[#0F172A] mb-3">Certifications</label>
            <div className="w-full p-2 border border-gray-200 rounded-lg bg-[#F9FAFB] min-h-[46px] flex flex-wrap gap-2 items-center focus-within:bg-white focus-within:border-gray-300 transition">
              {(data.certifications || []).map((cert, idx) => (
                <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 border border-green-200 bg-[#F0FDF4] text-green-700 rounded-md text-[12px] font-bold">
                  <Check size={14} strokeWidth={3} /> {cert}
                  <button onClick={() => removeCert(idx)} className="text-green-700 hover:text-green-900 ml-1"><X size={14}/></button>
                </div>
              ))}
              <input 
                type="text" 
                value={newCert}
                onChange={(e) => setNewCert(e.target.value)}
                onKeyDown={handleCertAdd}
                placeholder="Add certification... (Press Enter)" 
                className="bg-transparent text-[13px] outline-none flex-1 min-w-[140px] p-1" 
              />
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-bold text-[#0F172A] mb-3">Global Service Areas</label>
            <div className="w-full p-2 border border-gray-200 rounded-lg bg-[#F9FAFB] min-h-[46px] flex flex-wrap gap-2 items-center focus-within:bg-white focus-within:border-gray-300 transition">
              {(data.serviceAreas || []).map((area, idx) => (
                <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 bg-[#F3F4F6] text-gray-700 rounded-md text-[12px] font-bold">
                  <Globe size={14} strokeWidth={2} /> {area}
                  <button onClick={() => removeArea(idx)} className="text-gray-500 hover:text-gray-700 ml-1"><X size={14}/></button>
                </div>
              ))}
              <input 
                type="text" 
                value={newArea}
                onChange={(e) => setNewArea(e.target.value)}
                onKeyDown={handleAreaAdd}
                placeholder="Add service area... (Press Enter)" 
                className="bg-transparent text-[13px] outline-none flex-1 min-w-[140px] p-1" 
              />
            </div>
          </div>
        </div>

        {/* Shipping Options */}
        <div>
          <label className="block text-[13px] font-bold text-[#0F172A] mb-4">Shipping & Freight Options</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-start gap-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition" onClick={() => toggleShipping('fob')}>
              <div className={`w-[18px] h-[18px] rounded flex items-center justify-center shrink-0 mt-[2px] ${data.shippingOptions?.fob ? 'bg-[#137847] text-white border-transparent' : 'border border-gray-300 bg-white'}`}>
                {data.shippingOptions?.fob && <Check size={14} strokeWidth={3} />}
              </div>
              <span className="text-[13px] text-gray-700 leading-snug font-medium">FOB (Free on<br />Board)</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition" onClick={() => toggleShipping('cif')}>
              <div className={`w-[18px] h-[18px] rounded flex items-center justify-center shrink-0 mt-[2px] ${data.shippingOptions?.cif ? 'bg-[#137847] text-white border-transparent' : 'border border-gray-300 bg-white'}`}>
                {data.shippingOptions?.cif && <Check size={14} strokeWidth={3} />}
              </div>
              <span className="text-[13px] text-gray-700 leading-snug font-medium">CIF (Cost, Insurance,<br />Freight)</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition" onClick={() => toggleShipping('exw')}>
              <div className={`w-[18px] h-[18px] rounded flex items-center justify-center shrink-0 mt-[2px] ${data.shippingOptions?.exw ? 'bg-[#137847] text-white border-transparent' : 'border border-gray-300 bg-white'}`}>
                {data.shippingOptions?.exw && <Check size={14} strokeWidth={3} />}
              </div>
              <span className="text-[13px] text-gray-700 leading-snug font-medium">EXW (Ex<br />Works)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
