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

// Mock Data structure for Categories
const MOCK_CATEGORIES = [
  {
    id: "cat-1",
    name: "Raw Material",
    isRoot: true,
    icon: <Diamond size={16} />,
    slug: "raw-material-suppliers",
    status: "Active",
    displayOrder: 1,
    suppliers: 148,
    description: "Suppliers providing basic materials such as unrefined metals, chemicals, plastics, and minerals used in the manufacturing of finished components. This category represents the core of the industrial supply chain.",
    growth: "+12.4%",
    rating: "4.8",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2104&auto=format&fit=crop",
    parent: "Root",
    children: [
      {
        id: "cat-1-1",
        name: "Metallic Alloys",
        isRoot: false,
        icon: <div className="w-2 h-2 rounded bg-gray-300"></div>,
        slug: "metallic-alloys",
        status: "Active",
        displayOrder: 1,
        suppliers: 45,
        description: "Various metallic alloys for industrial use.",
        growth: "+5.2%",
        rating: "4.6",
        thumbnail: null,
        parent: "Raw Material"
      },
      {
        id: "cat-1-2",
        name: "Industrial Polymers",
        isRoot: false,
        icon: <div className="w-2 h-2 rounded bg-gray-300"></div>,
        slug: "industrial-polymers",
        status: "Active",
        displayOrder: 2,
        suppliers: 32,
        description: "High grade industrial polymers and plastics.",
        growth: "+8.1%",
        rating: "4.7",
        thumbnail: null,
        parent: "Raw Material"
      },
      {
        id: "cat-1-3",
        name: "Chemical Reagents",
        isRoot: false,
        icon: <div className="w-2 h-2 rounded bg-gray-300"></div>,
        slug: "chemical-reagents",
        status: "Active",
        displayOrder: 3,
        suppliers: 71,
        description: "Chemical reagents for processing and manufacturing.",
        growth: "+15.3%",
        rating: "4.9",
        thumbnail: null,
        parent: "Raw Material"
      }
    ]
  },
  {
    id: "cat-2",
    name: "Component/Parts",
    isRoot: true,
    icon: <Settings2 size={16} />,
    slug: "component-parts",
    status: "Active",
    displayOrder: 2,
    suppliers: 312,
    description: "Pre-fabricated components and machinery parts.",
    growth: "+22.1%",
    rating: "4.7",
    thumbnail: null,
    parent: "Root",
    children: []
  },
  {
    id: "cat-3",
    name: "Service",
    isRoot: true,
    icon: <Briefcase size={16} />,
    slug: "service-providers",
    status: "Active",
    displayOrder: 3,
    suppliers: 105,
    description: "B2B service providers and consultancy.",
    growth: "+4.1%",
    rating: "4.5",
    thumbnail: null,
    parent: "Root",
    children: []
  },
  {
    id: "cat-4",
    name: "Manufacturing",
    isRoot: true,
    icon: <Factory size={16} />,
    slug: "manufacturing-services",
    status: "Active",
    displayOrder: 4,
    suppliers: 215,
    description: "Contract manufacturing and assembly services.",
    growth: "+18.9%",
    rating: "4.8",
    thumbnail: null,
    parent: "Root",
    children: []
  },
  {
    id: "cat-5",
    name: "Logistics",
    isRoot: true,
    icon: <Truck size={16} />,
    slug: "logistics-services",
    status: "Hidden",
    displayOrder: 5,
    suppliers: 89,
    description: "Freight forwarding, shipping, and supply chain logistics.",
    growth: "-2.1%",
    rating: "4.2",
    thumbnail: null,
    parent: "Root",
    children: []
  },
  {
    id: "cat-6",
    name: "Utility",
    isRoot: true,
    icon: <Wrench size={16} />,
    slug: "utility-infra",
    status: "Active",
    displayOrder: 6,
    suppliers: 12,
    description: "Utility and infrastructure providers.",
    growth: "+1.1%",
    rating: "4.1",
    thumbnail: null,
    parent: "Root",
    children: []
  },
  {
    id: "cat-7",
    name: "Office",
    isRoot: true,
    icon: <Briefcase size={16} />,
    slug: "office-supplies",
    status: "Active",
    displayOrder: 7,
    suppliers: 43,
    description: "Office supplies and equipment.",
    growth: "+5.1%",
    rating: "4.4",
    thumbnail: null,
    parent: "Root",
    children: []
  },
  {
    id: "cat-8",
    name: "Specialized",
    isRoot: true,
    icon: <Beaker size={16} />,
    slug: "specialized-services",
    status: "Active",
    displayOrder: 8,
    suppliers: 24,
    description: "Highly specialized and niche services.",
    growth: "+9.1%",
    rating: "4.9",
    thumbnail: null,
    parent: "Root",
    children: []
  }
];

// Helper to flatten categories for the table
const flattenCategories = (cats) => {
  let result = [];
  cats.forEach(c => {
    result.push(c);
    if (c.children) {
      result = result.concat(flattenCategories(c.children));
    }
  });
  return result;
};

export default function CategoryManagement() {
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [activeCategoryId, setActiveCategoryId] = useState("cat-1");

  const handleUpdateCategory = (categoryId, updates) => {
    const updateNodes = (nodes) => {
      return nodes.map(node => {
        if (node.id === categoryId) {
          return { ...node, ...updates };
        }
        if (node.children) {
          return { ...node, children: updateNodes(node.children) };
        }
        return node;
      });
    };
    setCategories(updateNodes(categories));
  };

  const handleDeleteCategory = (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    
    const deleteNode = (nodes) => {
      return nodes.filter(node => {
        if (node.id === categoryId) return false;
        if (node.children) {
          node.children = deleteNode(node.children);
        }
        return true;
      });
    };
    
    setCategories(prevCategories => {
      const newCategories = deleteNode([...prevCategories]);
      if (activeCategoryId === categoryId) {
        setActiveCategoryId(newCategories[0]?.id || null);
      }
      return newCategories;
    });
  };

  const flatCategories = flattenCategories(categories);

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
            <span className="text-[11px] font-bold text-[#10B981]">+2 New</span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A]">8</div>
            <div className="text-[12px] font-medium text-gray-400">Main Categories</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-lg bg-[#F0FDF4] flex items-center justify-center text-[#10B981]">
              <Network size={20} />
            </div>
            <span className="text-[11px] font-bold text-gray-400">42 Active</span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A]">42</div>
            <div className="text-[12px] font-medium text-gray-400">Subcategories</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-lg bg-[#ECFDF5] flex items-center justify-center text-[#10B981]">
              <Eye size={20} />
            </div>
            <span className="text-[11px] font-bold text-[#10B981]">96% Ratio</span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A]">48</div>
            <div className="text-[12px] font-medium text-gray-400">Active Categories</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] flex items-center justify-center text-[#EF4444]">
              <EyeOff size={20} />
            </div>
            <span className="text-[11px] font-bold text-[#EF4444]">Review Needed</span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A]">2</div>
            <div className="text-[12px] font-medium text-gray-400">Hidden Categories</div>
          </div>
        </div>

      </div>

      <div className="space-y-8">
        {/* Red Box 1: Hierarchy Tree & Category Details */}
        <CategoryHierarchyPanel 
          categories={categories} 
          activeCategoryId={activeCategoryId} 
          onSelectCategory={setActiveCategoryId} 
          onUpdateCategory={handleUpdateCategory}
          onDeleteCategory={handleDeleteCategory}
        />

        {/* Red Box 2: All Categories Registry */}
        <CategoryRegistryTable 
          categories={flatCategories} 
          onDeleteCategory={handleDeleteCategory}
        />
      </div>

    </div>
  );
}
