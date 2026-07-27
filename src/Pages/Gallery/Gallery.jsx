import React, { useState, useEffect } from 'react';
import GalleryHeader from '../../Components/Gallery/GalleryHeader';
import GalleryUploader from '../../Components/Gallery/GalleryUploader';
import GalleryTabs from '../../Components/Gallery/GalleryTabs';
import GalleryGrid from '../../Components/Gallery/GalleryGrid';
import GalleryTips from '../../Components/Gallery/GalleryTips';
import GalleryModal from '../../Components/Gallery/GalleryModal';
import { toast } from 'react-toastify';
import { useGetSupplierDashboardQuery, useUpdateListingMutation, useGetSupplierUploadUrlMutation } from '../../redux/features/listings/listingsApi';

export default function Gallery() {
  const { data: dashboardData, isLoading: isFetching, refetch } = useGetSupplierDashboardQuery();
  const [updateListing] = useUpdateListingMutation();
  const [getUploadUrl] = useGetSupplierUploadUrlMutation();

  const [activeTab, setActiveTab] = useState('All Files');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (dashboardData?.data?.profile?.gallery) {
      // Map the MongoDB objects (which have _id) to ensure they have an id for the frontend
      const mappedFiles = dashboardData.data.profile.gallery.map(f => ({
        ...f,
        id: f._id || f.id || Date.now() + Math.random()
      }));
      setFiles(mappedFiles);
    }
  }, [dashboardData]);

  const handleUpload = async (newFiles) => {
    toast.info(`Uploading ${newFiles.length} file(s)...`);
    setIsSaving(true);
    try {
      const uploaded = await Promise.all(newFiles.map(async (file, idx) => {
        const isPdf = file.type.includes('pdf');
        const folder = isPdf ? 'documents' : 'galleries';
        
        const res = await getUploadUrl({ folder, contentType: file.type }).unwrap();
        const { uploadUrl, fileUrl } = res.data;
        
        await fetch(uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': file.type },
          body: file
        });
        
        return {
          id: Date.now() + idx,
          title: file.name,
          type: isPdf ? 'Certificates' : 'Product Images',
          isPdf: isPdf,
          isPrimary: false,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          url: fileUrl
        };
      }));
      setFiles(prev => [...prev, ...uploaded]);
      toast.success("Files uploaded successfully. Click Save Gallery to persist.");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to upload files.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSetPrimary = (id) => {
    setFiles(files.map(file => {
      if (file.isPdf) return file; 
      return {
        ...file,
        isPrimary: file.id === id || file._id === id
      };
    }));
  };

  const handleSaveModalFile = async (data) => {
    setIsSaving(true);
    toast.info("Uploading file...");
    try {
      const isPdf = data.isPdf;
      const folder = isPdf ? 'documents' : 'galleries';
      
      const res = await getUploadUrl({ folder, contentType: data.file.type }).unwrap();
      const { uploadUrl, fileUrl } = res.data;
      
      await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': data.file.type },
        body: data.file
      });
      
      const newFile = {
        id: Date.now(),
        title: data.title,
        type: data.type,
        isPdf: data.isPdf,
        isPrimary: false,
        size: `${(data.file.size / (1024 * 1024)).toFixed(1)} MB`,
        url: fileUrl
      };
      setFiles(prev => [...prev, newFile]);
      toast.success("File uploaded successfully.");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to upload file.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    if (!dashboardData?.data?.profile?._id) return;
    setIsSaving(true);
    try {
      await updateListing({ 
        id: dashboardData.data.profile._id, 
        data: { gallery: files } 
      }).unwrap();
      toast.success(`Gallery saved successfully! You currently have ${files.length} items in your gallery.`);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to save gallery.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    const primaryImage = files.find(f => f.isPrimary);
    if (primaryImage) {
      toast.info(`Previewing Listing: Primary Image is "${primaryImage.title}" (Total Files: ${files.length})`);
    } else {
      toast.info(`Previewing Listing: Total Files: ${files.length}. No primary image set yet!`);
    }
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans mt-16">
      <GalleryHeader 
        onPreview={handlePreview}
        onSave={handleSave}
        saveText={isSaving ? "Saving..." : "Save Gallery"}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          <GalleryUploader onUpload={handleUpload} />
          
          <div>
            <GalleryTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <GalleryGrid 
              files={files} 
              activeTab={activeTab} 
              onSetPrimary={handleSetPrimary} 
              onAddNewFile={() => setIsModalOpen(true)}
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div>
          <GalleryTips />
        </div>
      </div>
      
      <GalleryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModalFile}
      />

      {/* Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-gray-500 pt-6 mt-12 pb-4 border-t border-gray-200">
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
