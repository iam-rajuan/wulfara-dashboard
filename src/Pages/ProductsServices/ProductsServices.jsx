import React, { useState, useMemo } from 'react';
import ProductsHeader from '../../Components/ProductsServices/ProductsHeader';
import ProductsSummaryCards from '../../Components/ProductsServices/ProductsSummaryCards';
import ProductsDataGrid from '../../Components/ProductsServices/ProductsDataGrid';
import ProductModal from '../../Components/ProductsServices/ProductModal';

export default function ProductsServices() {
  const [filters, setFilters] = useState({
    search: '',
    category: 'All Categories',
    status: 'All Statuses'
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Industrial Steel Sheets (3mm)",
      description: "High-tensile cold-rolled steel...",
      category: "Raw Materials",
      moq: "5 Tons",
      priceVis: "Quote Only",
      status: "Published"
    },
    {
      id: 2,
      title: "Seamless Steel Pipes (Sch 40)",
      description: "Corrosion-resistant carbon steel..",
      category: "Raw Materials",
      moq: "1000 Meters",
      priceVis: "Visible",
      status: "Published"
    },
    {
      id: 3,
      title: "Precision Machined Metal Parts",
      description: "CNC milled aluminum and titanium",
      category: "Components",
      moq: "50 Units",
      priceVis: "Quote Only",
      status: "Draft"
    },
    {
      id: 4,
      title: "Custom Laser Cutting Service",
      description: "High-precision laser cutting for...",
      category: "Services",
      moq: "N/A",
      priceVis: "Quote Only",
      status: "Published"
    }
  ]);

  const summaryData = useMemo(() => {
    return {
      total: products.length,
      published: products.filter(p => p.status === 'Published').length,
      drafts: products.filter(p => p.status === 'Draft').length,
      quoteEnabled: products.filter(p => p.priceVis === 'Quote Only').length
    };
  }, [products]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Setting to 3 so we can see pagination in action with 4 items

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(filters.search.toLowerCase()) || 
                            p.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === 'All Categories' || p.category === filters.category;
      const matchesStatus = filters.status === 'All Statuses' || p.status === filters.status;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, filters.search, filters.category, filters.status]);

  const totalFiltered = filteredProducts.length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const pagination = {
    start: totalFiltered === 0 ? 0 : startIndex + 1,
    end: Math.min(startIndex + itemsPerPage, totalFiltered),
    total: totalFiltered,
    currentPage: currentPage,
    totalPages: totalPages
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (productData) => {
    const formattedPriceVis = productData.priceVis === 'Publicly Visible' ? 'Visible' : 
                              productData.priceVis === 'Quote Only (Requires RFQ)' ? 'Quote Only' : 'Hidden';
    const formattedStatus = productData.status === 'Publish Immediately' ? 'Published' : 'Draft';

    if (editingProduct) {
      // Edit existing product
      const updatedProducts = products.map(p => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            title: productData.title,
            description: productData.description,
            category: productData.category,
            moq: productData.moq,
            image: productData.image,
            priceVis: formattedPriceVis,
            status: formattedStatus
          };
        }
        return p;
      });
      setProducts(updatedProducts);
    } else {
      // Add new product
      const newProduct = {
        id: Date.now(),
        title: productData.title,
        description: productData.description,
        category: productData.category,
        moq: productData.moq,
        image: productData.image,
        priceVis: formattedPriceVis,
        status: formattedStatus
      };
      setProducts([newProduct, ...products]);
    }
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans mt-16">
      <ProductsHeader onAddProduct={handleAddProduct} />
      
      <ProductsSummaryCards summaryData={summaryData} />

      <ProductsDataGrid 
        products={paginatedProducts} 
        filters={filters} 
        onFilterChange={handleFilterChange}
        pagination={pagination}
        onPageChange={handlePageChange}
        onEditProduct={handleEditProduct}
      />

      <ProductModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={editingProduct}
        onSave={handleSaveProduct}
      />

      {/* Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-gray-500 pt-4 pb-4 border-t border-gray-200">
        <p>© 2024 WULFARA Industrial Marketplace. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0 text-gray-500">
          <a href="#" className="hover:text-gray-900 transition">Support</a>
          <a href="#" className="hover:text-gray-900 transition">Privacy Policy</a>
          <a href="#" className="hover:text-gray-900 transition">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}
