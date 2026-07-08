import React from "react";
import { Search } from "lucide-react";

export default function RfqFilters({ 
  searchTerm, setSearchTerm, 
  statusFilter, setStatusFilter, 
  categoryFilter, setCategoryFilter, 
  disputeToggle, setDisputeToggle, 
  onClear 
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col md:flex-row items-center gap-4">
      
      {/* Search Input */}
      <div className="relative flex-1 w-full md:w-auto">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search size={14} className="text-gray-400" />
        </div>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter by ID, Name..."
          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-md text-[13px] text-[#0F172A] focus:outline-none focus:border-gray-300 placeholder:text-gray-400"
        />
      </div>

      <div className="flex flex-wrap md:flex-nowrap items-center gap-4 w-full md:w-auto">
        
        {/* Status Filter */}
        <div className="relative w-full md:w-auto">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-32 px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] appearance-none focus:outline-none focus:border-gray-300"
          >
            <option value="All">Status: All</option>
            <option value="Responded">Responded</option>
            <option value="Closed">Closed</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Category Filter */}
        <div className="relative w-full md:w-auto">
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full md:w-40 px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] appearance-none focus:outline-none focus:border-gray-300"
          >
            <option value="All">Category: All</option>
            <option value="Logistics">Category: Logistics</option>
            <option value="Hardware">Category: Hardware</option>
            <option value="Software">Category: Software</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Dispute Toggle */}
        <div className="flex items-center gap-2 px-2">
          <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">Dispute Toggle</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={disputeToggle}
              onChange={(e) => setDisputeToggle(e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0F172A]"></div>
          </label>
        </div>

        <div className="w-px h-6 bg-gray-200 hidden md:block"></div>

        {/* Clear All */}
        <button 
          onClick={onClear}
          className="text-[12px] font-bold text-[#D4AF37] hover:text-[#C2982B] transition-colors whitespace-nowrap"
        >
          Clear All
        </button>

      </div>
    </div>
  );
}
