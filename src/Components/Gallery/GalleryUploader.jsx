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
          <Cloud size={20} className="text-[#0F172A] fill-[#0F172A]" />
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
