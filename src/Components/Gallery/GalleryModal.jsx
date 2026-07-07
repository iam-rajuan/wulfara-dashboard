import React, { useState, useRef } from 'react';
import { X, CloudUpload, Trash2 } from 'lucide-react';

export default function GalleryModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Product Images',
    file: null,
    isPdf: false
  });
  
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        file: file,
        isPdf: file.type.includes('pdf'),
        title: formData.title || file.name // Auto-fill title if empty
      });
    }
  };

  const removeFile = () => {
    setFormData({ ...formData, file: null, isPdf: false });
  };

  const handleSave = () => {
    onSave(formData);
    setFormData({ title: '', type: 'Product Images', file: null, isPdf: false });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-[#0F172A]">Add New File</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* File Upload Area */}
          <div>
            <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Upload File *</label>
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept=".jpg,.jpeg,.png,.pdf"
            />
            {formData.file ? (
              <div className="relative rounded-xl border border-gray-200 overflow-hidden w-full h-32 bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-[13px] font-bold text-[#0F172A] truncate max-w-[90%] mb-1">{formData.file.name}</span>
                <span className="text-[11px] text-gray-500">{(formData.file.size / (1024 * 1024)).toFixed(2)} MB</span>
                <button 
                  onClick={removeFile}
                  className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition"
                  title="Remove File"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <div 
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-gray-200 bg-[#F8F9FB] rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition"
              >
                <CloudUpload size={28} className="text-gray-400 mb-2" />
                <p className="text-[12px] font-bold text-[#0F172A] mb-1">Click to browse file</p>
                <p className="text-[11px] text-gray-500 font-medium">JPG, PNG, PDF up to 20MB</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Title *</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#F8F9FB] border border-gray-200 rounded-lg text-[13px] focus:bg-white focus:outline-none focus:border-gray-300"
              placeholder="e.g. ISO 9001 Certificate" 
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-[#0F172A] mb-2">File Type *</label>
            <div className="relative">
              <select 
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F8F9FB] border border-gray-200 rounded-lg text-[13px] focus:bg-white focus:outline-none focus:border-gray-300 cursor-pointer text-[#0F172A] font-medium appearance-none"
              >
                <option value="Product Images">Product Images</option>
                <option value="Factory Images">Factory Images</option>
                <option value="Certificates">Certificates</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
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
            onClick={handleSave}
            disabled={!formData.file || !formData.title}
            className="px-6 py-2 bg-[#D4AF37] hover:bg-[#C29F31] disabled:bg-[#e4ce84] transition rounded-md text-[13px] font-bold text-[#0F172A] shadow-sm"
          >
            Save File
          </button>
        </div>
      </div>
    </div>
  );
}
