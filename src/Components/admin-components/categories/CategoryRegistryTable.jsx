import React, { useState, useEffect } from "react";
import { Eye, Edit2, Trash2, ChevronDown, Search, Filter, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

export default function CategoryRegistryTable({ categories, onDeleteCategory }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [parentFilter, setParentFilter] = useState("Filter by Parent");
  
  // Pagination and Actions State
  const [currentPage, setCurrentPage] = useState(1);
  const [openActionId, setOpenActionId] = useState(null);
  const itemsPerPage = 5;

  // Reset to page 1 on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, parentFilter]);

  // Filtering Logic
  const filteredCategories = categories.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cat.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesParent = parentFilter === "Filter by Parent" || cat.parent === parentFilter;
    return matchesSearch && matchesParent;
  });

  // Pagination Logic
  const totalItems = filteredCategories.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button 
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`w-8 h-8 flex items-center justify-center rounded-md font-medium text-[13px] transition-colors ${
            currentPage === i 
              ? "bg-[#D4AF37] text-[#0F172A] font-bold" 
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      
      {/* Table Header Controls */}
      <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/30">
        <h2 className="text-[16px] font-extrabold text-[#0F172A]">
          All Categories Registry
        </h2>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Parent Filter Dropdown */}
          <div className="relative flex-1 md:flex-none">
            <select 
              className="w-full appearance-none pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]"
              value={parentFilter}
              onChange={(e) => setParentFilter(e.target.value)}
            >
              <option>Filter by Parent</option>
              <option>Root</option>
              <option>Raw Material</option>
              <option>Component/Parts</option>
              <option>Logistics</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
          </div>

          {/* Search Input */}
          <div className="relative flex-1 md:flex-none">
            <Filter className="absolute left-3 top-2.5 text-gray-400" size={14} />
            <input 
              type="text" 
              placeholder="Filter..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] md:w-[200px] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-white border-b border-gray-100">
              <th className="py-4 pl-6 pr-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Category Name</th>
              <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Parent</th>
              <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Slug</th>
              <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Suppliers</th>
              <th className="py-4 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="py-4 pr-6 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {paginatedCategories.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-gray-500 text-[13px]">
                  No categories found matching your filters.
                </td>
              </tr>
            ) : (
              paginatedCategories.map((category, index) => (
                <tr key={category.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 pl-6 pr-4">
                    <div className="flex items-center gap-3">
                      {category.icon && (
                        <div className="text-[#D4AF37]">
                          {category.icon}
                        </div>
                      )}
                      <span className="text-[13px] font-bold text-[#0F172A]">{category.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[13px] font-medium text-gray-400">
                    {category.parent}
                  </td>
                  <td className="py-4 px-4 text-[13px] font-medium text-gray-500 font-mono text-[12px]">
                    {category.slug}
                  </td>
                  <td className="py-4 px-4 text-[13px] font-extrabold text-[#0F172A]">
                    {category.suppliers}
                  </td>
                  <td className="py-4 px-4">
                    {category.status === 'Active' ? (
                      <span className="inline-flex px-2.5 py-1 bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0] text-[11px] font-bold rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex px-2.5 py-1 bg-gray-100 text-gray-500 border border-gray-200 text-[11px] font-bold rounded-full">
                        Hidden
                      </span>
                    )}
                  </td>
                  <td className="py-4 pr-6 text-right relative">
                    <button
                      onClick={() => setOpenActionId(openActionId === category.id ? null : category.id)}
                      className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {openActionId === category.id && (
                      <>
                        <div 
                          className="fixed inset-0 z-50"
                          onClick={() => setOpenActionId(null)}
                        ></div>
                        <div className={`absolute right-6 w-36 bg-white rounded-md shadow-xl border border-gray-100 z-50 py-1 overflow-hidden ${index === paginatedCategories.length - 1 && paginatedCategories.length > 1 ? 'bottom-8' : 'top-10'}`}>
                          <button
                            onClick={() => {
                              setOpenActionId(null);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="w-full px-4 py-2 text-[12px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                          >
                            <Eye size={14} />
                            View
                          </button>
                          <Link
                            to={`/categories/edit/${category.id}`}
                            className="w-full px-4 py-2 text-[12px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                          >
                            <Edit2 size={14} />
                            Edit
                          </Link>
                          <button
                            onClick={() => {
                              setOpenActionId(null);
                              if (onDeleteCategory) {
                                onDeleteCategory(category.id);
                              }
                            }}
                            className="w-full px-4 py-2 text-[12px] font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
        <div className="text-[12px] font-medium text-gray-500">
          Showing {totalItems === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} entries
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-200 transition-colors disabled:opacity-50" 
          >
            <ChevronLeft size={16} />
          </button>
          
          {renderPageNumbers()}
          
          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

    </div>
  );
}
