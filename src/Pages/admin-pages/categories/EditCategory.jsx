import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { 
  useGetCategoriesQuery, 
  useGetCategoryQuery, 
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryUploadUrlMutation 
} from "../../../redux/features/categories/categoryApi";
import axios from "axios";
import { 
  Info, 
  Image as ImageIcon, 
  CloudUpload, 
  Eye
} from "lucide-react";

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: categoriesResponse } = useGetCategoriesQuery();
  const categories = categoriesResponse?.data || [];
  const { data: categoryResponse, isLoading: isLoadingCategory } = useGetCategoryQuery(id);
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [getUploadUrl] = useGetCategoryUploadUrlMutation();
  
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState("");
  const [initialName, setInitialName] = useState("");

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

  // Populate data when query returns
  useEffect(() => {
    if (categoryResponse?.data) {
      const cat = categoryResponse.data;
      setInitialName(cat.name);
      setFormData({
        name: cat.name || "",
        slug: cat.slug || "",
        description: cat.description || "",
        displayOrder: cat.displayOrder?.toString() || "1",
        parentCategory: cat.parentCategory || "None (Main Category)",
        status: cat.status || "Active"
      });
      if (cat.banner && cat.banner !== 'no-banner.jpg') setBannerPreview(cat.banner);
      if (cat.icon && cat.icon !== 'no-icon.png') setIconPreview(cat.icon);
    }
  }, [categoryResponse]);

  // Auto-generate slug when name changes (only if name changed from initial)
  useEffect(() => {
    if (formData.name && formData.name !== initialName) {
      const generatedSlug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    } else if (!formData.name) {
      setFormData(prev => ({ ...prev, slug: "" }));
    }
  }, [formData.name, initialName]);

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

  const uploadFileToS3 = async (uploadUrl, file) => {
    return axios.put(uploadUrl, file, {
      headers: {
        'Content-Type': file.type
      }
    });
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id).unwrap();
        navigate("/categories");
      } catch (err) {
        console.error(err);
        setLocalError("Failed to delete category.");
      }
    }
  };

  const handleSubmit = async () => {
    setLocalLoading(true);
    setLocalError("");
    try {
      let iconUrl = iconPreview; // Keep existing or default
      let bannerUrl = bannerPreview;

      const uploadTasks = [];

      // Upload Icon if changed
      if (iconFile) {
        uploadTasks.push((async () => {
          const iconPresignData = await getUploadUrl(iconFile.type).unwrap();
          if (iconPresignData.success) {
            await uploadFileToS3(iconPresignData.data.uploadUrl, iconFile);
            iconUrl = iconPresignData.data.fileUrl;
          }
        })());
      }

      // Upload Banner if changed
      if (bannerFile) {
        uploadTasks.push((async () => {
          const bannerPresignData = await getUploadUrl(bannerFile.type).unwrap();
          if (bannerPresignData.success) {
            await uploadFileToS3(bannerPresignData.data.uploadUrl, bannerFile);
            bannerUrl = bannerPresignData.data.fileUrl;
          }
        })());
      }

      await Promise.all(uploadTasks);

      const categoryData = {
        ...formData,
        parentCategory: formData.parentCategory === "None (Main Category)" ? null : formData.parentCategory,
        icon: iconUrl,
        banner: bannerUrl
      };

      // Strip blob URLs if they weren't uploaded (fallback to defaults if needed, but we keep existing URLs mostly)
      if (typeof categoryData.icon === 'string' && categoryData.icon.startsWith('blob:')) {
         delete categoryData.icon; // Don't send blob urls
      }
      if (typeof categoryData.banner === 'string' && categoryData.banner.startsWith('blob:')) {
         delete categoryData.banner;
      }

      await updateCategory({ id, categoryData }).unwrap();
      navigate("/categories");
    } catch (error) {
      console.error(error);
      setLocalError(error?.data?.message || "Error updating category. Please try again.");
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
        <span className="text-[#D4AF37]">Edit Category</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
        {/* Top Actions */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-[20px] font-extrabold text-[#0F172A] mb-1">Edit Category Details</h2>
            <p className="text-[12px] font-medium text-gray-500">Editing: {initialName || "Category"}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button 
              onClick={handleDelete}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-red-200 rounded-md text-[13px] font-bold text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors shadow-sm"
            >
              Delete
            </button>
            <Link 
              to={`/categories/create?parent=${id}`}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm text-center"
            >
              Add Subcategory
            </Link>
            <button 
              onClick={handleSubmit}
              disabled={isUpdating || localLoading || isLoadingCategory}
              className="flex-1 sm:flex-none flex items-center justify-center px-8 py-2.5 bg-[#D4AF37] border border-[#D4AF37] rounded-md text-[13px] font-bold text-[#0F172A] hover:bg-[#C2982B] transition-colors shadow-sm disabled:opacity-50"
            >
              {isUpdating || localLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {localError && (
          <div className="m-6 mb-0 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md text-[13px] font-medium">
            {localError}
          </div>
        )}

        {/* Details Content */}
        <div className="p-6 md:p-8 space-y-8 flex-1">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Column (Images) */}
            <div className="md:col-span-4 lg:col-span-3 space-y-6">
              <div>
                <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">Category Thumbnail</h4>
                <label className="block w-full aspect-video bg-gray-50 rounded-lg overflow-hidden border border-gray-200 cursor-pointer relative group transition-colors hover:bg-gray-100">
                  <input type="file" accept="image/*" onChange={handleBannerUpload} className="hidden" />
                  {bannerPreview && bannerPreview !== 'no-banner.jpg' ? (
                    <>
                      <img src={bannerPreview} alt="Banner Preview" className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-[11px] font-bold">Change Thumbnail</span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 group-hover:text-gray-600 transition-colors">
                      <ImageIcon size={24} className="mb-2" />
                      <span className="text-[11px] font-bold">Upload</span>
                    </div>
                  )}
                </label>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 bg-gray-50/50">
                <div className="w-12 h-12 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center text-[#D4AF37] overflow-hidden p-1">
                  {iconPreview && iconPreview !== 'no-icon.png' ? (
                    <img src={iconPreview} alt="Icon Preview" className="w-full h-full object-contain" />
                  ) : (
                    <ImageIcon size={20} />
                  )}
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-[#0F172A]">Category Icon</h4>
                  <label className="block text-[11px] font-bold text-[#D97706] hover:underline mt-0.5 cursor-pointer">
                    Change Icon
                    <input type="file" accept="image/svg+xml,image/png" onChange={handleIconUpload} className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column (Form Data) */}
            <div className="md:col-span-8 lg:col-span-9">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* Slug */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Slug</label>
                  <input 
                    type="text" 
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[13px] font-mono text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]"
                  />
                </div>
                {/* Status */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Status</label>
                  <div className="flex bg-gray-50 p-1 rounded-md border border-gray-200">
                    {["Active", "Hidden", "Draft"].map(status => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, status }))}
                        className={`flex-1 py-1.5 text-[12px] font-bold rounded flex items-center justify-center gap-1.5 ${
                          formData.status === status 
                            ? (status === 'Active' ? "bg-[#F0FDF4] text-[#16A34A] shadow-sm border border-[#DCFCE7]" : "bg-white text-[#D97706] shadow-sm border border-gray-200") 
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {formData.status === status && status === 'Active' && <div className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></div>}
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Display Order */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Display Order</label>
                  <input 
                    type="number" 
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]"
                  />
                </div>
                {/* Total Suppliers (Readonly) */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Total Suppliers</label>
                  <div className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-[13px] font-bold text-gray-400 cursor-not-allowed">
                    0
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-[13px] text-gray-600 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] resize-none"
                ></textarea>
              </div>

              {/* Parent Category */}
              <div className="mt-6">
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Parent Category</label>
                <select 
                  name="parentCategory"
                  value={formData.parentCategory}
                  onChange={handleChange}
                  className="w-full sm:w-1/2 appearance-none px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]"
                >
                  <option value="None (Main Category)">None (Main Category)</option>
                  {categories.filter(c => c._id !== id).map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* Bottom Metrics Bar */}
          <div className="pt-6 border-t border-gray-100">
            <div className="bg-[#F8F9FB] rounded-xl border border-gray-100 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex items-center gap-10">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Growth (YoY)</p>
                  <p className="text-[16px] font-extrabold text-[#10B981]">+0%</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Average Rating</p>
                  <div className="flex items-center gap-1 text-[16px] font-extrabold text-[#0F172A]">
                    0.0 <span className="text-[#F59E0B] -mt-0.5">★</span>
                  </div>
                </div>
              </div>
              
              <button className="flex items-center gap-1.5 text-[13px] font-bold text-[#D97706] hover:text-[#B45309] transition-colors">
                View All Suppliers &rarr;
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
