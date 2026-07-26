import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, reset } from "../../../redux/features/categories/categorySlice";
import categoryService from "../../../redux/features/categories/categoryService";
import { 
  Info, 
  Image as ImageIcon, 
  CloudUpload, 
  Eye
} from "lucide-react";

export default function CreateCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.category
  );
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  const [bannerFile, setBannerFile] = useState(null);
  const [iconFile, setIconFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2104&auto=format&fit=crop");
  const [iconPreview, setIconPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    displayOrder: "1",
    parentCategory: "None (Main Category)",
    status: "Active"
  });

  // Auto-generate slug when name changes
  useEffect(() => {
    if (formData.name) {
      const generatedSlug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    } else {
      setFormData(prev => ({ ...prev, slug: "" }));
    }
  }, [formData.name]);

  useEffect(() => {
    if (isError) {
      setLocalError(message);
      dispatch(reset());
    }
    if (isSuccess) {
      dispatch(reset());
      navigate("/categories");
    }
  }, [isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIconFile(file);
      setIconPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setLocalLoading(true);
    setLocalError("");
    try {
      let iconUrl = "no-icon.png";
      let bannerUrl = "no-banner.jpg";

      const uploadTasks = [];

      // Upload Icon
      if (iconFile) {
        uploadTasks.push((async () => {
          const iconPresignData = await categoryService.getUploadUrl(iconFile.type);
          if (iconPresignData.success) {
            await categoryService.uploadFileToS3(iconPresignData.data.uploadUrl, iconFile);
            iconUrl = iconPresignData.data.fileUrl;
          }
        })());
      }

      // Upload Banner
      if (bannerFile) {
        uploadTasks.push((async () => {
          const bannerPresignData = await categoryService.getUploadUrl(bannerFile.type);
          if (bannerPresignData.success) {
            await categoryService.uploadFileToS3(bannerPresignData.data.uploadUrl, bannerFile);
            bannerUrl = bannerPresignData.data.fileUrl;
          }
        })());
      }

      await Promise.all(uploadTasks);

      const categoryData = {
        ...formData,
        parentCategory: formData.parentCategory === "None (Main Category)" ? null : undefined,
        icon: iconUrl,
        banner: bannerUrl
      };

      dispatch(createCategory(categoryData));
    } catch (error) {
      console.error(error);
      setLocalError("Error creating category. Please try again.");
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 mt-16 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans pt-24 pb-32">
      
      {/* Breadcrumbs */}
      <div className="flex items-center text-[10px] font-extrabold text-gray-400 mb-4 gap-2 tracking-wider uppercase">
        <Link to="/" className="hover:text-gray-600">Admin</Link>
        <span>&gt;</span>
        <Link to="/categories" className="hover:text-gray-600">Categories</Link>
        <span>&gt;</span>
        <span className="text-[#D4AF37]">Create Category</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">
          Create Category
        </h1>
        <p className="text-[14px] font-medium text-gray-500">
          Add a new supplier category or subcategory to organize WULFARA listings.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column (Form) */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          
          <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-4">
            <Info size={20} className="text-[#D4AF37]" />
            <h2 className="text-[18px] font-extrabold text-[#0F172A]">Category Information</h2>
          </div>

          <div className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Name */}
              <div>
                <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Category Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Raw Material Suppliers"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] placeholder-gray-400"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Slug</label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-[13px] font-medium">
                    wulfara.com/c/
                  </span>
                  <input 
                    type="text" 
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="flex-1 min-w-0 block w-full px-4 py-2.5 rounded-none rounded-r-md bg-white border border-gray-300 text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a brief summary of the products or services offered in this category..."
                rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] placeholder-gray-400 resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Icon Upload */}
              <div>
                <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Icon</label>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 overflow-hidden">
                    {iconPreview ? (
                      <img src={iconPreview} alt="Icon Preview" className="w-full h-full object-contain p-2" />
                    ) : (
                      <ImageIcon size={20} />
                    )}
                  </div>
                  <div>
                    <label className="text-[13px] font-bold text-[#D4AF37] hover:underline cursor-pointer">
                      Upload SVG or PNG
                      <input type="file" accept="image/svg+xml,image/png" onChange={handleIconUpload} className="hidden" />
                    </label>
                    <p className="text-[11px] font-medium text-gray-400 mt-1">Max size 500kb</p>
                  </div>
                </div>
              </div>

              {/* Display Order */}
              <div>
                <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Display Order</label>
                <input 
                  type="number" 
                  name="displayOrder"
                  value={formData.displayOrder}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Parent Category */}
              <div>
                <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Parent Category</label>
                <select 
                  name="parentCategory"
                  value={formData.parentCategory}
                  onChange={handleChange}
                  className="w-full appearance-none px-4 py-2.5 bg-white border border-gray-300 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]"
                >
                  <option>None (Main Category)</option>
                  <option>Raw Material</option>
                  <option>Component/Parts</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Status</label>
                <div className="flex bg-gray-100 p-1 rounded-md">
                  {["Active", "Hidden", "Draft"].map(status => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, status }))}
                      className={`flex-1 py-1.5 text-[12px] font-bold rounded ${
                        formData.status === status 
                          ? "bg-white text-[#D97706] shadow-sm" 
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Banner Image */}
            <div>
              <label className="block text-[13px] font-bold text-[#0F172A] mb-2">Banner Image</label>
              <label className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50/50 transition-colors cursor-pointer relative overflow-hidden group block">
                <input type="file" accept="image/*" onChange={handleBannerUpload} className="hidden" />
                <img src={bannerPreview} alt="Banner Preview" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-10 transition-opacity" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center mb-4 shadow">
                    <CloudUpload size={20} />
                  </div>
                  <h4 className="text-[14px] font-bold text-[#0F172A] mb-1">Click to upload or drag and drop</h4>
                  <p className="text-[12px] font-medium text-gray-400">SVG, PNG, JPG or WEBP (max. 1920x1080px)</p>
                </div>
              </label>
            </div>

          </div>

          {localError && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg text-[13px] font-bold">
              {localError}
            </div>
          )}

        </div>

        {/* Right Column (Preview & Admin Summary) */}
        <div className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0 space-y-6">
          
          {/* Public Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
              <Eye size={14} className="text-gray-400" />
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Public Preview</span>
            </div>
            
            <div className="p-4 bg-gray-50">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="h-32 bg-slate-800 relative">
                  <img src={bannerPreview} alt="Banner Preview" className="w-full h-full object-cover opacity-50" />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-[16px] font-extrabold text-[#0F172A] leading-tight">
                      {formData.name || "Category Name"}
                    </h3>
                    <div className="flex flex-col items-center bg-gray-50 border border-gray-100 rounded-lg px-2 py-1">
                      <span className="text-[10px] font-bold text-[#D4AF37]">148</span>
                      <span className="text-[8px] font-bold text-gray-400 uppercase">Suppliers</span>
                    </div>
                  </div>
                  <p className="text-[12px] font-medium text-gray-500 line-clamp-2 mb-6">
                    {formData.description || "High-performance industrial materials ranging from..."}
                  </p>
                  <button className="w-full py-2 bg-[#D4AF37] text-[#0F172A] rounded-md text-[13px] font-bold hover:bg-[#C2982B] transition-colors flex items-center justify-center gap-1.5">
                    View Suppliers <span>&rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-3 mb-4">
              Admin Summary
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-gray-500">Status</span>
                <span className={`text-[13px] font-bold flex items-center gap-1.5 ${
                  formData.status === 'Active' ? 'text-[#10B981]' : 
                  formData.status === 'Hidden' ? 'text-gray-400' : 'text-[#D97706]'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    formData.status === 'Active' ? 'bg-[#10B981]' : 
                    formData.status === 'Hidden' ? 'bg-gray-400' : 'bg-[#D97706]'
                  }`}></div>
                  {formData.status === 'Active' ? 'Live' : formData.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-gray-500">Public Path</span>
                <span className="px-2 py-1 bg-gray-50 border border-gray-100 text-gray-600 rounded text-[11px] font-mono max-w-[150px] truncate">
                  /c/{formData.slug || "category"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-gray-500">Search Index</span>
                <span className={`text-[12px] font-bold ${formData.status === 'Active' ? 'text-[#D97706]' : 'text-gray-400'}`}>
                  {formData.status === 'Active' ? 'Prioritized' : 'Excluded'}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Sticky Actions */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white border-t border-gray-200 p-4 flex items-center justify-center sm:justify-end gap-4 z-40 px-6 lg:px-8">
        <button 
          onClick={() => navigate("/categories")}
          className="px-6 py-2.5 text-[13px] font-bold text-gray-600 hover:text-gray-900 transition-colors"
        >
          Cancel
        </button>
        <button 
          onClick={handleSubmit}
          disabled={isLoading || localLoading}
          className="px-8 py-2.5 bg-[#D4AF37] border border-[#D4AF37] rounded-md text-[13px] font-bold text-[#0F172A] hover:bg-[#C2982B] transition-colors shadow-sm disabled:opacity-70"
        >
          {isLoading || localLoading ? "Saving..." : "Save Category"}
        </button>
      </div>

    </div>
  );
}
