import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

const industries = [
  { 
    id: 'raw-material', 
    title: 'RAW MATERIAL SUPPLIERS', 
    desc: 'Providers of unrefined or minimally processed materials for manufacturing.', 
    img: 'https://images.unsplash.com/photo-1518557984649-7b161c230cfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' // Using an industrial metal photo
  },
  { 
    id: 'components', 
    title: 'Component / Parts Suppliers', 
    desc: 'Manufacturers of specific mechanical, electrical, or structural parts.', 
    img: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' // Using parts/gears photo
  },
  { 
    id: 'service', 
    title: 'Service Suppliers', 
    desc: 'Industrial maintenance, engineering consulting, and specialized contracting.', 
    img: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' // Engineers looking at plans
  },
  { 
    id: 'manufacturing', 
    title: 'Manufacturing Suppliers', 
    desc: 'Full-scale production facilities and contract manufacturing partners.', 
    img: 'https://images.unsplash.com/photo-1565439387609-b755dbdbd087?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' // Factory floor
  },
  { 
    id: 'logistics', 
    title: 'Logistics / Shipping Suppliers', 
    desc: 'Freight forwarding, warehousing, and global supply chain management.', 
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' // Cargo ship / containers
  },
  { 
    id: 'utility', 
    title: 'Utility Suppliers', 
    desc: 'Energy, water, and essential infrastructure resource providers.', 
    img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' // Solar panels
  },
  { 
    id: 'office', 
    title: 'Office & Operational Suppliers', 
    desc: 'Consumables, facility management supplies, and corporate equipment.', 
    img: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' // Warehouse shelves
  },
  { 
    id: 'specialized', 
    title: 'Specialized Industry Suppliers', 
    desc: 'Niche providers for aerospace, medical devices, or high-tech sectors.', 
    img: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' // Tech/laser cutting
  },
];

const subCategoriesMap = {
  'raw-material': ['Steel Manufacturing', 'Oil and Gas', 'Forestry and Lumber', 'Cotton Farming', 'Rubber'],
  'components': ['Fasteners', 'Valves', 'Gears', 'Electrical Panels', 'Motors'],
  'service': ['Maintenance', 'Consulting', 'Engineering', 'Inspections', 'Logistics'],
  'manufacturing': ['CNC Machining', 'Injection Molding', 'Sheet Metal', '3D Printing', 'Assembly'],
  'logistics': ['Freight', 'Warehousing', 'Distribution', 'Customs Brokerage', 'Packaging'],
  'utility': ['Power', 'Water', 'Gas', 'Waste Management', 'Telecommunications'],
  'office': ['Stationery', 'Furniture', 'IT Equipment', 'Janitorial', 'Pantry'],
  'specialized': ['Aerospace', 'Medical', 'Defense', 'Semiconductors', 'Robotics']
};

const ChooseIndustry = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('raw-material');
  const [selectedSubCategory, setSelectedSubCategory] = useState('Steel Manufacturing');

  const currentSubCategories = subCategoriesMap[selectedIndustry] || [];

  // Helper to format the title for the subcategory section
  const selectedIndustryObj = industries.find(i => i.id === selectedIndustry);
  const subCategorySectionTitle = selectedIndustryObj 
    ? `Select ${selectedIndustryObj.title.replace(' SUPPLIERS', '').replace(' Suppliers', '')} Industry Type`
    : 'Select Industry Type';

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center pt-12 pb-24 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-[40px] font-bold text-black mb-4 leading-tight">
            Choose Your Company<br/>Industry
          </h1>
          <p className="text-gray-500 text-[15px]">
            Select the supplier category that best matches your company so customers can find you easily.
          </p>
        </div>

        {/* Industry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full mb-10">
          {industries.map((industry) => {
            const isSelected = selectedIndustry === industry.id;
            
            return (
              <div 
                key={industry.id}
                onClick={() => {
                  setSelectedIndustry(industry.id);
                  setSelectedSubCategory(subCategoriesMap[industry.id]?.[0] || '');
                }}
                className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-200 border-2 ${
                  isSelected 
                    ? 'border-[#D1A635] bg-[#FFFBF4] shadow-[0_4px_12px_rgba(209,166,53,0.15)]' 
                    : 'border-transparent bg-white hover:border-gray-300 shadow-sm'
                }`}
              >
                {/* Image Section */}
                <div className="h-[140px] w-full overflow-hidden">
                  <img 
                    src={industry.img} 
                    alt={industry.title} 
                    className={`w-full h-full object-cover transition-transform duration-500 ${isSelected ? 'scale-105' : 'grayscale-[20%]'}`}
                  />
                  {/* Selection Badge */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center shadow-md z-10">
                      <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Text Section */}
                <div className="p-4 md:p-5">
                  <h3 className={`font-bold text-[13px] md:text-[14px] mb-2 uppercase ${
                    isSelected ? 'text-[#D1A635]' : 'text-gray-900'
                  }`}>
                    {industry.title}
                  </h3>
                  <p className="text-gray-500 text-[12px] leading-relaxed line-clamp-3">
                    {industry.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sub-category Panel */}
        {selectedIndustry && (
          <div className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl overflow-hidden shadow-sm relative">
            {/* Top Green Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#34D399]"></div>
            
            <div className="p-6 md:p-8 pt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex flex-wrap gap-[2px] w-5 h-5 text-[#D1A635]">
                   <LayoutGrid className="w-5 h-5 fill-current" />
                </div>
                <h2 className="text-[20px] font-bold text-black">{subCategorySectionTitle}</h2>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {currentSubCategories.map((sub) => {
                  const isSubSelected = selectedSubCategory === sub;
                  return (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubCategory(sub)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-medium transition-colors border ${
                        isSubSelected
                          ? 'border-[#D1A635] bg-[#FFFBF4] text-[#D1A635]'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {isSubSelected && <Check className="w-4 h-4 text-[#D1A635]" strokeWidth={3} />}
                      {sub}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer Navigation */}
      <div className="border-t border-gray-200 bg-[#F9FAFB] py-4 px-6 md:px-12 w-full flex justify-between items-center sticky bottom-0 z-20">
        <Link to="/verify-email">
          <button className="flex items-center gap-2 px-6 py-2.5 rounded border border-gray-300 bg-white text-gray-800 font-medium text-[14px] hover:bg-gray-50 transition-colors shadow-sm">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </Link>
        <Link to="/company-info">
          <button className="flex items-center gap-2 px-6 py-2.5 rounded bg-[#D1A635] hover:bg-[#C2982B] text-black font-bold text-[14px] transition-colors shadow-sm">
            Continue
            <ArrowRight className="w-4 h-4 font-bold" />
          </button>
        </Link>
      </div>

    </div>
  );
};

export default ChooseIndustry;
