import React from 'react';

export default function GalleryTabs({ activeTab, onTabChange }) {
  const tabs = ["All Files", "Product Images", "Factory Images", "Certificates"];

  return (
    <div className="flex items-center gap-6 border-b border-gray-200 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`pb-3 text-[13px] font-bold transition ${
            activeTab === tab
              ? 'text-[#0A4A25] border-b-2 border-[#0A4A25]'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
