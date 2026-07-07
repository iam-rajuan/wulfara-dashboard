import React from 'react';
import { FileIcon, Plus } from 'lucide-react';

export default function GalleryGrid({ files, activeTab, onSetPrimary, onAddNewFile }) {
  const filteredFiles = files.filter(f => activeTab === 'All Files' || f.type === activeTab);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredFiles.map((file) => (
        <div key={file.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          {file.isPdf ? (
            <div className="h-40 bg-[#EEF2F6] flex items-center justify-center">
              <div className="w-16 h-16 bg-[#D0D9E4] rounded-xl flex items-center justify-center">
                <FileIcon size={32} className="text-[#0F172A]" />
              </div>
            </div>
          ) : (
            <div className="h-40 bg-gray-900 relative overflow-hidden flex items-center justify-center">
              {file.url ? (
                <img src={file.url} alt={file.title} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900"></div>
              )}
            </div>
          )}
          
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold mb-2 ${
                file.isPdf ? 'bg-[#EEF2F6] text-[#0F172A]' : 'bg-[#EEF2F6] text-[#0F172A]'
              }`}>
                {file.isPdf ? <FileIcon size={10} className="mr-1 inline" /> : null}
                {file.type === 'Certificates' ? 'Certificate' : file.type.replace(' Images', '')}
              </span>
              <h4 className="text-[13px] font-bold text-[#0F172A] mb-1 line-clamp-2">{file.title}</h4>
              
              {file.isPdf && (
                <p className="text-[11px] text-gray-500 font-medium">{file.size}</p>
              )}
            </div>
            
            {!file.isPdf && (
              <label 
                className="flex items-center gap-2 mt-4 cursor-pointer"
                onClick={() => onSetPrimary(file.id)}
              >
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                  file.isPrimary ? 'border-[#D4AF37]' : 'border-gray-300'
                }`}>
                  {file.isPrimary && <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>}
                </div>
                <span className="text-[12px] font-bold text-gray-600">Set as Primary</span>
              </label>
            )}
          </div>
        </div>
      ))}

      {/* Add New File Card */}
      <div 
        onClick={onAddNewFile}
        className="bg-white rounded-xl shadow-sm border border-gray-200 border-dashed flex flex-col overflow-hidden cursor-pointer hover:bg-gray-50 transition"
      >
        <div className="h-40 bg-[#F8F9FB] flex items-center justify-center">
          <Plus size={24} className="text-gray-400" />
        </div>
        <div className="p-4 flex-1 flex items-center justify-center">
          <span className="text-[13px] font-medium text-gray-500">Add New File</span>
        </div>
      </div>
    </div>
  );
}
