import React, { useState, useEffect } from "react";
import { Eye, Edit2, Trash2, ChevronDown, Search, Filter, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

export default function CategoryRegistryTable({ categories, onDeleteCategory }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [parentFilter, setParentFilter] = useState("Filter by Parent");
  const [viewCategory, setViewCategory] = useState(null);

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
    const matchesSearch = cat.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.slug?.toLowerCase().includes(searchQuery.toLowerCase());
    // For now, parent matching is simplified since parent is an ObjectId
    const matchesParent = parentFilter === "Filter by Parent" || 
                          (parentFilter === "Root" && !cat.parentCategory);
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
          className={`w-8 h-8 flex items-center justify-center rounded-md font-medium text-[13px] transition-colors ${currentPage === i
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
    <>
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
                <tr key={category._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 pl-6 pr-4">
                    <div className="flex items-center gap-3">
                      {category.icon && category.icon !== 'no-icon.png' ? (
                        <img src={category.icon} alt={category.name} className="w-8 h-8 rounded object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-400">
                          <Eye size={14} />
                        </div>
                      )}
                      <span className="text-[13px] font-bold text-[#0F172A]">{category.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[13px] font-medium text-gray-400">
                    {category.parentCategory ? "Subcategory" : "Root"}
                  </td>
                  <td className="py-4 px-4 text-[13px] font-medium text-gray-500 font-mono text-[12px]">
                    {category.slug}
                  </td>
                  <td className="py-4 px-4 text-[13px] font-extrabold text-[#0F172A]">
                    {/* Placeholder for suppliers count since it's not in category model directly */}
                    0
                  </td>
                  <td className="py-4 px-4">
                    {category.status === 'Active' ? (
                      <span className="inline-flex px-2.5 py-1 bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0] text-[11px] font-bold rounded-full">
                        Active
                      </span>
                    ) : category.status === 'Draft' ? (
                      <span className="inline-flex px-2.5 py-1 bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] text-[11px] font-bold rounded-full">
                        Draft
                      </span>
                    ) : (
                      <span className="inline-flex px-2.5 py-1 bg-gray-100 text-gray-500 border border-gray-200 text-[11px] font-bold rounded-full">
                        {category.status || 'Hidden'}
                      </span>
                    )}
                  </td>
                  <td className="py-4 pr-6 text-right relative">
                    <button
                      onClick={() => setOpenActionId(openActionId === category._id ? null : category._id)}
                      className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {openActionId === category._id && (
                      <>
                        <div
                          className="fixed inset-0 z-50"
                          onClick={() => setOpenActionId(null)}
                        ></div>
                        <div className={`absolute right-6 w-36 bg-white rounded-md shadow-xl border border-gray-100 z-50 py-1 overflow-hidden ${index === paginatedCategories.length - 1 && paginatedCategories.length > 1 ? 'bottom-8' : 'top-10'}`}>
                          <button
                            onClick={() => {
                              setOpenActionId(null);
                              setViewCategory(category);
                            }}
                            className="w-full px-4 py-2 text-[12px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                          >
                            <Eye size={14} />
                            View
                          </button>
                          <Link
                            to={`/categories/edit/${category._id}`}
                            className="w-full px-4 py-2 text-[12px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                          >
                            <Edit2 size={14} />
                            Edit
                          </Link>
                          <button
                            onClick={() => {
                              setOpenActionId(null);
                              if (onDeleteCategory) {
                                onDeleteCategory(category._id);
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

      {/* View Modal */}
      {viewCategory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header (Banner) */}
            <div className="relative h-32 bg-gray-100 flex-shrink-0">
              {viewCategory.banner && viewCategory.banner !== 'no-banner.jpg' ? (
                <img src={viewCategory.banner} alt="Banner" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">No Banner</div>
              )}
              {/* Icon Overlay */}
              <div className="absolute -bottom-6 left-6 w-16 h-16 bg-white rounded-xl shadow-md border-2 border-white overflow-hidden flex items-center justify-center">
                {viewCategory.icon && viewCategory.icon !== 'no-icon.png' ? (
                  <img src={viewCategory.icon} alt="Icon" className="w-full h-full object-cover" />
                ) : (
                  <Eye size={24} className="text-gray-300" />
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 pt-10 overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-[#0F172A]">{viewCategory.name}</h3>
                  <div className="text-[13px] font-mono text-gray-500 mt-1">{viewCategory.slug}</div>
                </div>
                {viewCategory.status === 'Active' ? (
                  <span className="inline-flex px-2.5 py-1 bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0] text-[11px] font-bold rounded-full">
                    Active
                  </span>
                ) : viewCategory.status === 'Draft' ? (
                  <span className="inline-flex px-2.5 py-1 bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] text-[11px] font-bold rounded-full">
                    Draft
                  </span>
                ) : (
                  <span className="inline-flex px-2.5 py-1 bg-gray-100 text-gray-500 border border-gray-200 text-[11px] font-bold rounded-full">
                    {viewCategory.status || 'Hidden'}
                  </span>
                )}
              </div>

              <div className="mb-6">
                <h4 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">Description</h4>
                <p className="text-[14px] text-gray-600 leading-relaxed">
                  {viewCategory.description || "No description provided."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Display Order</div>
                  <div className="text-[14px] font-bold text-[#0F172A]">{viewCategory.displayOrder}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Parent Category ID</div>
                  <div className="text-[14px] font-bold text-[#0F172A] truncate" title={viewCategory.parentCategory}>
                    {viewCategory.parentCategory || "None (Root)"}
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Created At</div>
                  <div className="text-[14px] font-bold text-[#0F172A]">
                    {new Date(viewCategory.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50/50 flex-shrink-0">
              <button
                onClick={() => setViewCategory(null)}
                className="px-6 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
