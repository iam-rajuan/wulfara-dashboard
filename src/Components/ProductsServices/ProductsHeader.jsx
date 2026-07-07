import React from 'react';
import { Plus } from 'lucide-react';

export default function ProductsHeader({ onAddProduct }) {
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
      <div>
        <h1 className="text-[32px] font-bold mb-1 tracking-tight text-[#0F172A]">Products & Services</h1>
        <p className="text-gray-500 text-[14px]">Manage the products and services you offer on the WULFARA marketplace.</p>
      </div>
      <button 
        onClick={onAddProduct}
        className="px-4 py-2 bg-[#D4AF37] hover:bg-[#C29F31] transition rounded-md text-[13px] font-bold text-[#0F172A] shadow-sm flex items-center gap-2"
      >
        <Plus size={16} strokeWidth={2.5} />
        Add Product/Service
      </button>
    </div>
  );
}
