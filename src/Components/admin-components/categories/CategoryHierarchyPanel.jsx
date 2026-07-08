import React, { useState } from "react";
import { 
  ChevronRight, 
  ChevronDown, 
  Diamond, 
  Settings2, 
  Truck, 
  Wrench, 
  Briefcase, 
  Beaker, 
  Image as ImageIcon,
  MoreVertical,
  RotateCcw,
  Star,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export default function CategoryHierarchyPanel({ categories, activeCategoryId, onSelectCategory, onUpdateCategory, onDeleteCategory }) {
  // Simple state to track expanded nodes in the tree
  const [expandedNodes, setExpandedNodes] = useState({ 'cat-1': true });

  const toggleNode = (id, e) => {
    e.stopPropagation();
    setExpandedNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Find the active category details
  const activeCategory = categories.find(c => c.id === activeCategoryId) || categories[0];

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file && onUpdateCategory) {
      onUpdateCategory(activeCategory.id, { thumbnail: URL.createObjectURL(file) });
    }
  };

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file && onUpdateCategory) {
      const url = URL.createObjectURL(file);
      onUpdateCategory(activeCategory.id, { 
        icon: <img src={url} alt="icon" className="w-full h-full object-contain p-0.5" /> 
      });
    }
  };

  // Render a recursive tree node
  const renderTreeNode = (node, depth = 0) => {
    const isExpanded = expandedNodes[node.id];
    const isActive = activeCategoryId === node.id;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="select-none">
        <div 
          className={`flex items-center gap-2 py-2 px-3 rounded-md cursor-pointer transition-colors ${
            isActive ? "bg-blue-50/50 text-[#0F172A]" : "hover:bg-gray-50 text-gray-600"
          }`}
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
          onClick={() => onSelectCategory(node.id)}
        >
          {/* Chevron for children */}
          <div 
            className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-700"
            onClick={(e) => hasChildren && toggleNode(node.id, e)}
          >
            {hasChildren ? (isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />) : <span className="w-4" />}
          </div>
          
          {/* Node Icon */}
          <div className={`${isActive ? "text-[#D4AF37]" : "text-gray-400"}`}>
            {node.icon}
          </div>

          {/* Node Label */}
          <span className={`text-[13px] ${isActive ? "font-bold text-[#0F172A]" : "font-medium"}`}>
            {node.name}
          </span>
        </div>

        {/* Render Children */}
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {node.children.map(child => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      
      {/* Hierarchy Tree Panel */}
      <div className="w-full lg:w-[320px] bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
          <h3 className="text-[15px] font-extrabold text-[#0F172A]">Hierarchy Tree</h3>
          <div className="flex items-center gap-2 text-gray-400">
            <button className="hover:text-gray-700 p-1"><MoreVertical size={14} /></button>
            <button className="hover:text-gray-700 p-1"><RotateCcw size={14} /></button>
          </div>
        </div>
        
        <div className="p-3 overflow-y-auto max-h-[600px] no-scrollbar">
          {/* For the mockup, we assume 'categories' is a nested array */}
          {categories.filter(c => c.isRoot).map(rootNode => renderTreeNode(rootNode))}
        </div>
      </div>

      {/* Category Details Panel */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
        {/* Top Actions */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-[18px] font-extrabold text-[#0F172A] mb-1">Category Details</h2>
            <p className="text-[12px] font-medium text-gray-500">Viewing: {activeCategory?.name}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button 
              onClick={() => {
                if (onDeleteCategory && activeCategory) {
                  onDeleteCategory(activeCategory.id);
                }
              }}
              className="flex-1 sm:flex-none px-4 py-2 bg-white border border-red-200 rounded-md text-[13px] font-bold text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors shadow-sm"
            >
              Delete
            </button>
            <Link 
              to="/categories/create"
              className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm text-center"
            >
              Add Subcategory
            </Link>
            <Link 
              to={`/categories/edit/${activeCategory?.id}`}
              className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-[#D4AF37] border border-[#D4AF37] rounded-md text-[13px] font-bold text-[#0F172A] hover:bg-[#C2982B] transition-colors shadow-sm"
            >
              Edit Category
            </Link>
          </div>
        </div>

        {/* Details Content */}
        {activeCategory && (
          <div className="p-6 md:p-8 space-y-8 flex-1">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Left Column (Images) */}
              <div className="md:col-span-4 lg:col-span-3 space-y-6">
                <div>
                  <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">Category Thumbnail</h4>
                  <label className="block w-full aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 cursor-pointer relative group">
                    <input type="file" accept="image/*" onChange={handleThumbnailUpload} className="hidden" />
                    {activeCategory.thumbnail ? (
                      <>
                        <img src={activeCategory.thumbnail} alt={activeCategory.name} className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-[11px] font-bold">Change Thumbnail</span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 group-hover:text-gray-600 transition-colors bg-gray-50 hover:bg-gray-100">
                        <ImageIcon size={24} className="mb-2" />
                        <span className="text-[11px] font-bold">Upload</span>
                      </div>
                    )}
                  </label>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 bg-gray-50/50">
                  <div className="w-12 h-12 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center text-[#D4AF37] overflow-hidden">
                    {activeCategory.icon}
                  </div>
                  <div>
                    <h4 className="text-[12px] font-bold text-[#0F172A]">Category Icon</h4>
                    <label className="block text-[11px] font-bold text-[#D97706] hover:underline mt-0.5 cursor-pointer">
                      Change Icon
                      <input type="file" accept="image/svg+xml,image/png" onChange={handleIconUpload} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column (Form Data) */}
              <div className="md:col-span-8 lg:col-span-9">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Slug</label>
                    <div className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-[13px] font-mono text-gray-600">
                      {activeCategory.slug}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Status</label>
                    <div className="px-4 py-2.5 bg-[#F0FDF4] border border-[#DCFCE7] rounded-md flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></div>
                      <span className="text-[13px] font-bold text-[#16A34A]">{activeCategory.status}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Display Order</label>
                    <div className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-[13px] font-bold text-[#0F172A]">
                      {activeCategory.displayOrder}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Total Suppliers</label>
                    <div className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-[13px] font-bold text-[#0F172A]">
                      {activeCategory.suppliers}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Description</label>
                  <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 leading-relaxed min-h-[100px]">
                    {activeCategory.description}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Metrics Bar */}
            <div className="mt-auto pt-6">
              <div className="bg-[#F8F9FB] rounded-xl border border-gray-100 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="flex items-center gap-10">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Growth (YoY)</p>
                    <p className="text-[16px] font-extrabold text-[#10B981]">{activeCategory.growth}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Average Rating</p>
                    <div className="flex items-center gap-1 text-[16px] font-extrabold text-[#0F172A]">
                      {activeCategory.rating} <Star size={14} className="fill-[#F59E0B] text-[#F59E0B] -mt-0.5" />
                    </div>
                  </div>
                </div>
                
                <button className="flex items-center gap-1.5 text-[13px] font-bold text-[#D97706] hover:text-[#B45309] transition-colors">
                  View All {activeCategory.suppliers} Suppliers <ArrowRight size={14} />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
