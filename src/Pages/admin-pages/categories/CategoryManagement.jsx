import React, { useState } from "react";
import {
  Folder,
  Network,
  Eye,
  EyeOff,
  Download,
  Plus,
  Diamond,
  Settings2,
  Truck,
  Wrench,
  Briefcase,
  Beaker,
  Factory
} from "lucide-react";
import CategoryHierarchyPanel from "../../../Components/admin-components/categories/CategoryHierarchyPanel";
import CategoryRegistryTable from "../../../Components/admin-components/categories/CategoryRegistryTable";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery, useDeleteCategoryMutation } from "../../../redux/features/categories/categoryApi";

// Helper to build tree from flat list
const buildCategoryTree = (flatCats) => {
  const categoryMap = new Map();
  flatCats.forEach(c => categoryMap.set(c._id, {
    ...c,
    id: c._id,
    isRoot: !c.parentCategory,
    children: []
  }));

  const rootNodes = [];
  flatCats.forEach(c => {
    if (c.parentCategory && categoryMap.has(c.parentCategory)) {
      categoryMap.get(c.parentCategory).children.push(categoryMap.get(c._id));
    } else {
      rootNodes.push(categoryMap.get(c._id));
    }
  });
  return rootNodes;
};

export default function CategoryManagement() {
  const { data: categoriesResponse, isLoading } = useGetCategoriesQuery();
  const categories = categoriesResponse?.data || [];
  const [deleteCategory] = useDeleteCategoryMutation();
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const handleUpdateCategory = (categoryId, updates) => {
    // For now, this is mock UI update. Proper implementation needs PUT API.
    console.log("Update requested for", categoryId, updates);
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteCategory(categoryId).unwrap();
      if (activeCategoryId === categoryId) {
        setActiveCategoryId(null);
      }
    } catch (err) {
      console.error("Failed to delete category", err);
    }
  };

  const categoryTree = buildCategoryTree(categories);
  const flatCategories = categories;

  // Calculate dynamic stats
  const mainCategories = categories.filter(c => !c.parentCategory);
  const subCategories = categories.filter(c => c.parentCategory);
  
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const newMainCategoriesCount = mainCategories.filter(c => c.createdAt && new Date(c.createdAt) > oneWeekAgo).length;
  
  const activeSubcategoriesCount = subCategories.filter(c => c.status === 'Active').length;
  
  const activeCategoriesCount = categories.filter(c => c.status === 'Active').length;
  const activeRatio = categories.length > 0 ? Math.round((activeCategoriesCount / categories.length) * 100) : 0;
  
  const hiddenCategoriesCount = categories.filter(c => c.status === 'Hidden').length;
  const draftCategoriesCount = categories.filter(c => c.status === 'Draft').length;

  return (
    <div className="min-h-screen p-6 mt-16 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans pt-24">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-1">
            Category Management
          </h1>
          <p className="text-[13px] font-medium text-gray-500 max-w-md leading-relaxed">
            Create, organize, edit, and manage WULFARA supplier categories and subcategories.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <Download size={16} />
            Export Data
          </button>
          <Link
            to="/categories/create"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37] border border-[#D4AF37] rounded-md text-[13px] font-bold text-[#0F172A] hover:bg-[#C2982B] transition-colors shadow-sm"
          >
            <Plus size={16} className="text-[#0F172A]" />
            New Category
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
              <Folder size={20} />
            </div>
            <span className={`text-[11px] font-bold ${newMainCategoriesCount > 0 ? 'text-[#10B981]' : 'text-gray-400'}`}>
              +{newMainCategoriesCount} New
            </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A]">{mainCategories.length}</div>
            <div className="text-[12px] font-medium text-gray-400">Main Categories</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-lg bg-[#F0FDF4] flex items-center justify-center text-[#10B981]">
              <Network size={20} />
            </div>
            <span className="text-[11px] font-bold text-[#10B981]">{activeSubcategoriesCount} Active</span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A]">{subCategories.length}</div>
            <div className="text-[12px] font-medium text-gray-400">Subcategories</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-lg bg-[#ECFDF5] flex items-center justify-center text-[#10B981]">
              <Eye size={20} />
            </div>
            <span className={`text-[11px] font-bold ${activeRatio >= 50 ? 'text-[#10B981]' : 'text-[#D97706]'}`}>
              {activeRatio}% Ratio
            </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A]">{activeCategoriesCount}</div>
            <div className="text-[12px] font-medium text-gray-400">Active Categories</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] flex items-center justify-center text-[#EF4444]">
              <EyeOff size={20} />
            </div>
            {draftCategoriesCount > 0 ? (
              <span className="text-[11px] font-bold text-[#D97706]">{draftCategoriesCount} Draft</span>
            ) : (
              <span className="text-[11px] font-bold text-gray-400">Review Done</span>
            )}
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A]">{hiddenCategoriesCount}</div>
            <div className="text-[12px] font-medium text-gray-400">Hidden Categories</div>
          </div>
        </div>

      </div>

      <div className="space-y-8">
        {/* Red Box 1: Hierarchy Tree & Category Details */}
        {/* <CategoryHierarchyPanel 
            categories={categoryTree} 
            activeCategoryId={activeCategoryId} 
            onSelectCategory={setActiveCategoryId} 
            onUpdateCategory={handleUpdateCategory}
            onDeleteCategory={handleDeleteCategory}
          /> */}

        {/* Red Box 2: All Categories Registry */}
        <CategoryRegistryTable
          categories={flatCategories}
          onDeleteCategory={handleDeleteCategory}
        />
      </div>

    </div>
  );
}
