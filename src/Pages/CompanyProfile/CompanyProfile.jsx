import React, { useState } from 'react';
import ProfileHeader from '../../Components/CompanyProfile/ProfileHeader';
import BusinessProfileForm from '../../Components/CompanyProfile/BusinessProfileForm';
import ProfileCompletionCard from '../../Components/CompanyProfile/ProfileCompletionCard';
import ListingPreviewCard from '../../Components/CompanyProfile/ListingPreviewCard';

export default function CompanyProfile() {
  const [profileData, setProfileData] = useState({
    logo: null,
    description: "",
    coreProducts: ["Steel Sheets", "Metal Parts"],
    moq: { value: "", unit: "Units" },
    businessHours: {
      weekdays: { start: "08:00 AM", end: "06:00 PM" },
      weekends: "Closed"
    },
    certifications: ["ISO 9001", "AS9100"],
    serviceAreas: ["North America", "Europe"],
    shippingOptions: { fob: true, cif: true, exw: false }
  });

  const completionData = {
    percentage: 72,
    tasks: [
      { id: 1, label: "Upload Company Logo", completed: true },
      { id: 2, label: "Basic Business Info", completed: true },
      { id: 3, label: "Add 3+ Core Products", completed: false },
      { id: 4, label: "Upload Facility Photos", completed: false }
    ]
  };

  const [previewData, setPreviewData] = useState({
    name: "Wulfara Steel Corp",
    location: "Frankfurt, Germany",
    description: "Leading manufacturer of high-grade steel sheets and precision metal...",
    tags: ["ISO 9001", "OEM/ODM"]
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate network request
    setTimeout(() => {
      setIsSaving(false);
      alert("Profile data saved successfully!\n\nYour changes have been recorded.");
    }, 1000);
  };

  const handlePreview = () => {
    setPreviewData({
      name: "Wulfara Steel Corp",
      location: "Frankfurt, Germany",
      description: profileData.description ? (profileData.description.slice(0, 100) + '...') : "Leading manufacturer of high-grade steel sheets and precision metal...",
      tags: profileData.certifications && profileData.certifications.length > 0 
        ? profileData.certifications.slice(0, 2) 
        : ["ISO 9001", "OEM/ODM"]
    });
    alert("Listing preview updated with your current form data (see the card on the right)!");
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans mt-16">
      <ProfileHeader 
        onPreview={handlePreview} 
        onSave={handleSave} 
        saveText={isSaving ? "Saving..." : "Save Profile"} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <BusinessProfileForm data={profileData} onChange={setProfileData} />

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
