import React, { useState, useEffect } from 'react';
import { X, Package, Settings, CloudUpload } from 'lucide-react';

export default function ProductModal({ isOpen, onClose, product, onSave }) {
  const [formData, setFormData] = useState({
    type: 'Physical Product',
    title: '',
    category: '',
    moq: '',
    description: '',
    priceVis: 'Quote Only (Requires RFQ)',
    status: 'Save as Draft'
  });

  useEffect(() => {
    if (product) {
      setFormData({
        type: product.type || 'Physical Product',
        title: product.title || '',
        category: product.category || '',
        moq: product.moq || '',
        description: product.description || '',
        // Map priceVis from table ("Quote Only") to modal options
        priceVis: product.priceVis === 'Visible' ? 'Publicly Visible' : 
                  product.priceVis === 'Quote Only' ? 'Quote Only (Requires RFQ)' : 
                  'Hidden / Logged-in Only',
        status: product.status === 'Published' ? 'Publish Immediately' : 'Save as Draft'
      });
    } else {
      setFormData({
        type: 'Physical Product',
        title: '',
        category: '',
        moq: '',
        description: '',
        priceVis: 'Quote Only (Requires RFQ)',
        status: 'Save as Draft'
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-[#0F172A]">
            {product ? 'Edit Offering' : 'Add New Offering'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 space-y-6">
          {/* Type Selector */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setFormData({ ...formData, type: 'Physical Product' })}
              className={`flex flex-col items-center justify-center py-4 rounded-lg border ${
                formData.type === 'Physical Product' 
                  ? 'border-[#D4AF37] bg-[#FDF9E6] text-[#0F172A]' 
                  : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
              } transition font-bold text-[13px] gap-2`}
            >
              <Package size={20} strokeWidth={2} />
              Physical Product
            </button>
            <button 
              onClick={() => setFormData({ ...formData, type: 'Service' })}
              className={`flex flex-col items-center justify-center py-4 rounded-lg border ${
                formData.type === 'Service' 
                  ? 'border-[#D4AF37] bg-[#FDF9E6] text-[#0F172A]' 
                  : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
              } transition font-bold text-[13px] gap-2`}
            >
              <Settings size={20} strokeWidth={2} />
              Service
            </button>
          </div>

          {/* Name / Title */}
          <div>
            <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Name / Title *</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#F8F9FB] border border-gray-200 rounded-lg text-[13px] focus:bg-white focus:outline-none focus:border-gray-300"
              placeholder="e.g. Industrial Steel Sheets (3mm)" 
            />
          </div>

          {/* Category & MOQ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Category *</label>
              <div className="relative">
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F8F9FB] border border-gray-200 rounded-lg text-[13px] focus:bg-white focus:outline-none focus:border-gray-300 cursor-pointer text-[#0F172A] font-medium appearance-none"
                >
                  <option value="">Select category...</option>
                  <option value="Raw Materials">Raw Materials</option>
                  <option value="Components">Components</option>
                  <option value="Services">Services</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Minimum Order Quantity (MOQ)</label>
              <input 
                type="text" 
                value={formData.moq}
                onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F8F9FB] border border-gray-200 rounded-lg text-[13px] focus:bg-white focus:outline-none focus:border-gray-300"
                placeholder="e.g. 5 Tons, 100 Units" 
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Description *</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full h-24 px-4 py-3 bg-[#F8F9FB] border border-gray-200 rounded-lg text-[13px] focus:bg-white focus:outline-none focus:border-gray-300 resize-none"
              placeholder="Detailed technical specifications and description..."
            ></textarea>
          </div>

          <div className="border-t border-gray-100 my-2"></div>

          {/* Price Visibility & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Price Visibility */}
            <div>
              <label className="block text-[13px] font-bold text-[#0F172A] mb-3">Price Visibility</label>
              <div className="space-y-3">
                {['Publicly Visible', 'Quote Only (Requires RFQ)', 'Hidden / Logged-in Only'].map((option) => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      formData.priceVis === option ? 'border-[#D4AF37]' : 'border-gray-300'
                    }`}>
                      {formData.priceVis === option && <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>}
                    </div>
                    <span className="text-[13px] font-medium text-[#0F172A]">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Publication Status */}
            <div>
              <label className="block text-[13px] font-bold text-[#0F172A] mb-3">Publication Status</label>
              <div className="space-y-3">
                {['Publish Immediately', 'Save as Draft'].map((option) => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      formData.status === option ? 'border-[#D4AF37]' : 'border-gray-300'
                    }`}>
                      {formData.status === option && <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>}
                    </div>
                    <span className="text-[13px] font-medium text-[#0F172A]">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Images & Technical Documents */}
          <div>
            <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Images & Technical Documents</label>
            <div className="border-2 border-dashed border-gray-200 bg-[#F8F9FB] rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition">
              <CloudUpload size={32} className="text-gray-400 mb-3" />
              <p className="text-[13px] font-bold text-[#0F172A] mb-1">Click to upload or drag and drop</p>
              <p className="text-[11px] text-gray-500 font-medium">PNG, JPG, PDF up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-white sticky bottom-0">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-md text-[13px] font-bold text-[#0F172A] hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              onSave(formData);
              onClose();
            }}
            className="px-6 py-2 bg-[#D4AF37] hover:bg-[#C29F31] transition rounded-md text-[13px] font-bold text-[#0F172A] shadow-sm"
          >
            Save Offering
          </button>
        </div>
      </div>
    </div>
  );
}
