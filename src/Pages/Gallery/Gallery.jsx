import React, { useState } from 'react';
import GalleryHeader from '../../Components/Gallery/GalleryHeader';
import GalleryUploader from '../../Components/Gallery/GalleryUploader';
import GalleryTabs from '../../Components/Gallery/GalleryTabs';
import GalleryGrid from '../../Components/Gallery/GalleryGrid';
import GalleryTips from '../../Components/Gallery/GalleryTips';
import GalleryModal from '../../Components/Gallery/GalleryModal';
import { toast } from 'react-toastify';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All Files');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState([
    {
      id: 1,
      title: 'Premium Steel Roll 304',
      type: 'Product Images',
      isPdf: false,
      isPrimary: true,
      size: '2.4 MB'
    },
    {
      id: 2,
      title: 'Main Production Line A',
      type: 'Factory Images',
      isPdf: false,
      isPrimary: false,
      size: '3.1 MB'
    },
    {
      id: 3,
      title: 'ISO 9001:2015 Cert',
      type: 'Certificates',
      isPdf: true,
      isPrimary: false,
      size: 'PDF • 1.2 MB'
    }
  ]);

  const handleUpload = (newFiles) => {
    console.log("Uploaded files:", newFiles);
    const uploaded = newFiles.map((file, idx) => {
      const isPdf = file.type.includes('pdf');
      return {
        id: Date.now() + idx,
        title: file.name,
        type: isPdf ? 'Certificates' : 'Product Images', // naive assignment
        isPdf: isPdf,
        isPrimary: false,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        url: isPdf ? null : URL.createObjectURL(file)
      };
    });
    setFiles([...files, ...uploaded]);
  };

  const handleSetPrimary = (id) => {
    setFiles(files.map(file => {
      if (file.isPdf) return file; // Certificates cannot be primary images
      
      // If this file matches the ID, set it to true, else false.
      return {
        ...file,
        isPrimary: file.id === id
      };
    }));
  };

  const handleSaveModalFile = (data) => {
    const newFile = {
      id: Date.now(),
      title: data.title,
      type: data.type,
      isPdf: data.isPdf,
      isPrimary: false,
      size: `${(data.file.size / (1024 * 1024)).toFixed(1)} MB`,
      url: data.isPdf ? null : URL.createObjectURL(data.file)
    };
    setFiles([...files, newFile]);
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success(`Gallery saved successfully! You currently have ${files.length} items in your gallery.`);
    }, 1000);
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
