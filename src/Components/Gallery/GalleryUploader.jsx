import React, { useRef, useState } from 'react';
import { CloudUpload, FileUp, Cloud } from 'lucide-react';

export default function GalleryUploader({ onUpload }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(Array.from(e.target.files));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div className="mb-8">
      <div className="bg-[#EFE8D0] rounded-lg p-5 mb-6 flex gap-4 items-start border border-[#E3D3A1]">
        <div className="w-10 h-10 rounded bg-[#D4AF37] flex items-center justify-center shrink-0">
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 16H5.5C3.98333 16 2.6875 15.475 1.6125 14.425C0.5375 13.375 0 12.0917 0 10.575C0 9.275 0.391667 8.11667 1.175 7.1C1.95833 6.08333 2.98333 5.43333 4.25 5.15C4.66667 3.61667 5.5 2.375 6.75 1.425C8 0.475 9.41667 0 11 0C12.95 0 14.6042 0.679167 15.9625 2.0375C17.3208 3.39583 18 5.05 18 7C19.15 7.13333 20.1042 7.62917 20.8625 8.4875C21.6208 9.34583 22 10.35 22 11.5C22 12.75 21.5625 13.8125 20.6875 14.6875C19.8125 15.5625 18.75 16 17.5 16H12V8.85L13.6 10.4L15 9L11 5L7 9L8.4 10.4L10 8.85V16Z" fill="#0F172A"/>
          </svg>
        </div>
        <div>
          <h4 className="text-[13px] font-bold text-[#D4AF37] mb-1">Boost Your Visibility</h4>
          <p className="text-[13px] text-[#0F172A] font-medium leading-relaxed">
            Suppliers with comprehensive galleries and verified certificates receive up to 3x more RFQs. Upload high-resolution assets to build trust.
          </p>
        </div>
      </div>

      <div 
        className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-colors ${
          isDragging ? 'border-[#D4AF37] bg-[#FDF9E6]' : 'border-gray-300 bg-white'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="w-16 h-16 bg-[#EEF2F6] rounded-xl flex items-center justify-center mb-4">
          <FileUp size={24} className="text-[#0F172A]" />
        </div>
        <h3 className="text-[15px] font-bold text-[#0F172A] mb-2">Drag and drop your files here</h3>
        <p className="text-[13px] text-gray-500 mb-6 font-medium">Supported formats: JPG, PNG, PDF (Max 20MB per file)</p>
        
        <input 
          type="file" 
          multiple 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
        />
        <button 
          onClick={() => fileInputRef.current.click()}
          className="px-6 py-2.5 bg-[#0F172A] text-white rounded-lg text-[13px] font-bold hover:bg-[#1E293B] transition"
        >
          Browse Files
        </button>
      </div>
    </div>
  );
}
