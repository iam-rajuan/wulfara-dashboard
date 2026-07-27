import React from 'react';
import { Search, ChevronDown, AlignJustify, LayoutGrid, Image as ImageIcon, Pencil } from 'lucide-react';

export default function ProductsDataGrid({ 
  products, 
  filters, 
  onFilterChange, 
  pagination,
  onPageChange,
  onEditProduct
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center bg-white rounded-t-xl">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-[#F8F9FB] border border-gray-200 rounded-md text-[13px] focus:bg-white focus:outline-none focus:border-gray-300" 
            placeholder="Search products, services, SKUs..."
          />
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex gap-4 flex-1 md:flex-none">
            <div className="relative border border-gray-200 rounded-md px-3 py-2 bg-[#F8F9FB] flex items-center min-w-[140px]">
              <select 
                value={filters.category}
                onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
                className="appearance-none bg-transparent w-full outline-none text-[13px] font-bold text-[#0F172A] cursor-pointer pr-6"
              >
                <option value="All Categories">All Categories</option>
                <option value="Raw Materials">Raw Materials</option>
                <option value="Components">Components</option>
                <option value="Services">Services</option>
              </select>
              <ChevronDown size={14} className="text-gray-500 absolute right-3 pointer-events-none" />
            </div>
            <div className="relative border border-gray-200 rounded-md px-3 py-2 bg-[#F8F9FB] flex items-center min-w-[130px]">
              <select 
                value={filters.status}
                onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
                className="appearance-none bg-transparent w-full outline-none text-[13px] font-bold text-[#0F172A] cursor-pointer pr-6"
              >
                <option value="All Statuses">All Statuses</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
              <ChevronDown size={14} className="text-gray-500 absolute right-3 pointer-events-none" />
            </div>
          </div>
          
          <div className="flex border border-gray-200 rounded-md overflow-hidden bg-[#F8F9FB]">
            <button className="px-3 py-2 bg-[#E2E8F0] text-[#0F172A] border-r border-gray-200">
              <AlignJustify size={16} strokeWidth={2.5} />
            </button>
            <button className="px-3 py-2 text-gray-400 hover:text-gray-600 transition">
              <LayoutGrid size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-[#F3F5F9] text-gray-500 text-[11px] font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">ITEM DETAILS</th>
              <th className="px-6 py-4">CATEGORY</th>
              <th className="px-6 py-4">MOQ</th>
              <th className="px-6 py-4">PRICE VIS.</th>
              <th className="px-6 py-4">STATUS</th>
              <th className="px-6 py-4">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {products.length > 0 ? products.map((product) => (
              <tr key={product._id || product.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#F8F9FB] rounded border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                      {product.image ? (
                        <img src={product.image} alt="Product" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon size={20} className="text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-[13px] text-[#0F172A] mb-0.5">{product.title}</h4>
                      <p className="text-[12px] text-gray-500">{product.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-600 font-medium">{product.category}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-600 font-medium">{product.moq}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold ${
                    product.priceVis === 'Quote Only' ? 'bg-blue-100 text-blue-800' : 'bg-[#E2E8F0] text-gray-700'
                  }`}>
                    {product.priceVis}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold ${
                    product.status === 'Published' ? 'bg-[#0066FF] text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => onEditProduct(product)}
                    className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition"
                  >
                    <Pencil size={16} />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-white rounded-b-xl">
        <div className="text-[13px] text-gray-500">
          Showing <span className="font-bold text-[#0F172A]">{pagination.start}</span> to <span className="font-bold text-[#0F172A]">{pagination.end}</span> of <span className="font-bold text-[#0F172A]">{pagination.total}</span> results
        </div>
        
        <div className="flex gap-1 text-[13px] font-bold">
          <button 
            onClick={() => onPageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="px-3 py-1.5 border border-gray-200 text-gray-600 rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:text-gray-400"
          >
            Prev
          </button>
          
          {[...Array(pagination.totalPages)].map((_, i) => {
            const pageNum = i + 1;
            // Only show a few pages around the current page
            if (
              pageNum === 1 || 
              pageNum === pagination.totalPages || 
              (pageNum >= pagination.currentPage - 1 && pageNum <= pagination.currentPage + 1)
            ) {
              return (
                <button 
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`px-3 py-1.5 rounded ${
                    pagination.currentPage === pageNum 
                      ? 'bg-[#D4AF37] text-[#0F172A] border border-transparent' 
                      : 'border border-gray-200 text-gray-600 bg-white hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            }
            if (pageNum === pagination.currentPage - 2 || pageNum === pagination.currentPage + 2) {
              return <span key={pageNum} className="px-2 py-1.5 text-gray-400">...</span>;
            }
            return null;
          })}
          
          <button 
            onClick={() => onPageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-3 py-1.5 border border-gray-200 text-gray-600 rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:text-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
