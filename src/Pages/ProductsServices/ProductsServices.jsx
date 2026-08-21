import React, { useState, useMemo } from 'react';
import ProductsHeader from '../../Components/ProductsServices/ProductsHeader';
import ProductsSummaryCards from '../../Components/ProductsServices/ProductsSummaryCards';
import ProductsDataGrid from '../../Components/ProductsServices/ProductsDataGrid';
import ProductModal from '../../Components/ProductsServices/ProductModal';

import { toast } from 'react-toastify';
import { useGetSupplierDashboardQuery, useUpdateListingMutation, useGetSupplierUploadUrlMutation } from '../../redux/features/listings/listingsApi';
import { SUPPORT_URL, PRIVACY_URL, TERMS_URL } from '../../config/urls';

export default function ProductsServices() {
  const { data: dashboardData, refetch } = useGetSupplierDashboardQuery();
  const [updateListing] = useUpdateListingMutation();
  const [getUploadUrl] = useGetSupplierUploadUrlMutation();

  const [filters, setFilters] = useState({
    search: '',
    category: 'All Categories',
    status: 'All Statuses'
  });

  const products = useMemo(() => dashboardData?.data?.profile?.products || [], [dashboardData]);

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
  const itemsPerPage = 3;

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const pTitle = p.title || p.name || '';
      const pDesc = p.description || '';
      const matchesSearch = pTitle.toLowerCase().includes(filters.search.toLowerCase()) || 
                            pDesc.toLowerCase().includes(filters.search.toLowerCase());
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
    setCurrentPage(1); 
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

  const handleSaveProduct = async (productData) => {
    let finalImageUrl = productData.image;

    // Handle new image upload to S3 if a file was selected
    if (productData.imageFile) {
      toast.info("Uploading product image...");
      try {
        const file = productData.imageFile;
        const res = await getUploadUrl({ folder: 'galleries', contentType: file.type }).unwrap();
        const { uploadUrl, fileUrl } = res.data;
        
        await fetch(uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': file.type },
          body: file
        });
        
        finalImageUrl = fileUrl;
      } catch {
        toast.error("Failed to upload product image, proceeding without it.");
      }
    }

    const formattedPriceVis = productData.priceVis === 'Publicly Visible' ? 'Visible' : 
                              productData.priceVis === 'Quote Only (Requires RFQ)' ? 'Quote Only' : 'Hidden';
    const formattedStatus = productData.status === 'Publish Immediately' ? 'Published' : 'Draft';
    
    let updatedProducts = [...products];

    if (editingProduct) {
      updatedProducts = updatedProducts.map(p => {
        if (p._id === editingProduct._id) {
          return {
            ...p,
            title: productData.title,
            description: productData.description,
            category: productData.category,
            moq: productData.moq,
            image: finalImageUrl,
            priceVis: formattedPriceVis,
            status: formattedStatus
          };
        }
        return p;
      });
    } else {
      const newProduct = {
        title: productData.title,
        description: productData.description,
        category: productData.category,
        moq: productData.moq,
        image: finalImageUrl,
        priceVis: formattedPriceVis,
        status: formattedStatus
      };
      updatedProducts = [newProduct, ...updatedProducts];
    }
    
    try {
      await updateListing({ 
        id: dashboardData.data.profile._id, 
        data: { products: updatedProducts } 
      }).unwrap();
      
      toast.success(editingProduct ? "Product updated successfully!" : "Product added successfully!");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to save product");
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
          <a href={SUPPORT_URL} className="hover:text-gray-900 transition">Support</a>
          <a href={PRIVACY_URL} className="hover:text-gray-900 transition">Privacy Policy</a>
          <a href={TERMS_URL} className="hover:text-gray-900 transition">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}
