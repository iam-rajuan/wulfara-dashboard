import React, { useState, useEffect } from 'react';
import ProfileHeader from '../../Components/CompanyProfile/ProfileHeader';
import BusinessProfileForm from '../../Components/CompanyProfile/BusinessProfileForm';
import ProfileCompletionCard from '../../Components/CompanyProfile/ProfileCompletionCard';
import ListingPreviewCard from '../../Components/CompanyProfile/ListingPreviewCard';
import { toast } from 'react-toastify';
import { useGetSupplierDashboardQuery, useUpdateListingMutation, useGetSupplierUploadUrlMutation } from '../../redux/features/listings/listingsApi';

export default function CompanyProfile() {
  const { data: dashboardData, isLoading: isFetching, refetch } = useGetSupplierDashboardQuery();
  const [updateListing, { isLoading: isSaving }] = useUpdateListingMutation();
  const [getUploadUrl] = useGetSupplierUploadUrlMutation();
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  const [profileData, setProfileData] = useState({
    logo: null,
    companyName: "",
    description: "",
    coreProducts: [],
    moq: { value: "", unit: "Units" },
    businessHours: {
      weekdays: { start: "08:00", end: "18:00" },
      weekends: "Closed"
    },
    certifications: [],
    serviceAreas: [],
    shippingOptions: { fob: true, cif: true, exw: false }
  });

  const [previewData, setPreviewData] = useState({
    name: "Company Name",
    location: "Location",
    description: "Company description...",
    tags: []
  });

  // Load backend data into local state
  useEffect(() => {
    if (dashboardData?.data?.profile) {
      const p = dashboardData.data.profile;
      setProfileData(prev => ({
        ...prev,
        companyName: p.companyName || "",
        description: p.description || "",
        logo: p.logo && p.logo !== 'no-logo.jpg' ? p.logo : null,
        coreProducts: p.products ? p.products.map(prod => prod.name) : [],
        certifications: p.certifications || [],
        serviceAreas: p.serviceAreas || [],
        // We can map other fields if they exist in schema, falling back to defaults
      }));
      setPreviewData({
        name: p.companyName || "Company Name",
        location: p.contactEmail || "Email not set",
        description: p.description ? (p.description.slice(0, 100) + '...') : "No description provided...",
        tags: p.certifications && p.certifications.length > 0 ? p.certifications.slice(0, 2) : []
      });
    }
  }, [dashboardData]);

  const completionData = {
    percentage: dashboardData?.data?.stats?.profileCompletion ? parseInt(dashboardData.data.stats.profileCompletion) : 0,
    tasks: [
      { id: 1, label: "Basic Business Info", completed: !!profileData.companyName && !!profileData.description },
      { id: 2, label: "Upload Company Logo", completed: !!profileData.logo },
      { id: 3, label: "Add Core Products", completed: profileData.coreProducts.length > 0 },
    ]
  };

  const handleSave = async () => {
    if (!dashboardData?.data?.profile?._id) return;
    
    try {
      // Map frontend state to backend schema
      const payload = {
        companyName: profileData.companyName,
        description: profileData.description,
        logo: profileData.logo || 'no-logo.jpg',
        products: profileData.coreProducts.map(name => ({ name })),
        certifications: profileData.certifications,
        serviceAreas: profileData.serviceAreas
      };

      await updateListing({ 
        id: dashboardData.data.profile._id, 
        data: payload 
      }).unwrap();
      
      toast.success("Profile data saved successfully!");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to save profile");
    }
  };

  const handlePreview = () => {
    setPreviewData({
      name: profileData.companyName || "Company Name",
      location: "Preview Location",
      description: profileData.description ? (profileData.description.slice(0, 100) + '...') : "No description...",
      tags: profileData.certifications && profileData.certifications.length > 0 
        ? profileData.certifications.slice(0, 2) 
        : []
    });
    toast.info("Listing preview updated with your current form data!");
  };

  const handleLogoUpload = async (file) => {
    try {
      setIsUploadingLogo(true);
      toast.info("Uploading logo...");
      
      const res = await getUploadUrl({ folder: 'logos', contentType: file.type }).unwrap();
      const { uploadUrl, fileUrl } = res.data;
      
      await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file
      });
      
      setProfileData(prev => ({ ...prev, logo: fileUrl }));
      toast.success("Logo uploaded successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to upload logo");
    } finally {
      setIsUploadingLogo(false);
    }
  };

  if (isFetching && !dashboardData) {
    return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen p-6 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans mt-16">
      <ProfileHeader 
        onPreview={handlePreview} 
        onSave={handleSave} 
        saveText={isSaving ? "Saving..." : "Save Profile"} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <BusinessProfileForm 
          data={profileData} 
          onChange={setProfileData} 
          onLogoUpload={handleLogoUpload}
          isUploadingLogo={isUploadingLogo}
        />

        <div className="space-y-6">
          <ProfileCompletionCard completionData={completionData} />
          <ListingPreviewCard previewData={previewData} />
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-gray-500 pt-6 mt-8 pb-4 border-t border-gray-200">
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
