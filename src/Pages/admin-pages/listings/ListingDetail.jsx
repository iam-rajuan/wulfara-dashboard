import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListing, reviewListing } from "../../../redux/features/listings/listingsSlice";
import {
  ChevronRight,
  XCircle,
  CheckCircle,
  Eye,
  Monitor,
  MapPin,
  Factory,
  Award,
  Check,
  X
} from "lucide-react";

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { listing, isLoading } = useSelector((state) => state.listings);

  useEffect(() => {
    if (id) {
      dispatch(getListing(id));
    }
  }, [id, dispatch]);

  const [checklist, setChecklist] = useState({
    companyInfo: true,
    mediaAssets: true,
    certifications: false
  });

  const toggleChecklist = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApprove = () => {
    dispatch(reviewListing({ id, listingStatus: 'Approved' }));
  };

  const handleReject = () => {
    dispatch(reviewListing({ id, listingStatus: 'Rejected' }));
  };

  const status = listing ? listing.listingStatus : "Pending";

  const getStatusBadge = () => {
    if (status === "Approved") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0] text-[12px] font-bold rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-[#166534]"></div>
          Approved
        </span>
      );
    }
    if (status === "Rejected") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA] text-[12px] font-bold rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-[#991B1B]"></div>
          Rejected
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A] text-[12px] font-bold rounded-full">
        <div className="w-1.5 h-1.5 rounded-full bg-[#D97706]"></div>
        Pending Review
      </span>
    );
  };

  if (isLoading || !listing) {
    return <div className="min-h-screen p-6 mt-16 lg:p-8 flex items-center justify-center">Loading...</div>;
  }

  // Calculate quality score
  let qualityScore = 0;
  if (listing.companyName) qualityScore += 20;
  if (listing.description) qualityScore += 20;
  if (listing.contactEmail) qualityScore += 20;
  if (listing.logo && listing.logo !== 'no-logo.jpg') qualityScore += 20;
  if (listing.categories && listing.categories.length > 0) qualityScore += 20;

  return (
    <div className="min-h-screen p-6 mt-16 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans pt-24">
      {/* Breadcrumbs */}
      <div className="flex items-center text-[13px] font-medium text-gray-500 mb-6 gap-2">
        <Link to="/listings" className="hover:text-gray-700">Listings</Link>
        <ChevronRight size={14} />
        <span className="text-[#D4AF37] font-bold">Review</span>
      </div>

      {/* Top Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-[#0F172A] rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
             {listing.logo && listing.logo !== 'no-logo.jpg' ? (
                <img src={listing.logo} alt="Logo" className="w-full h-full object-cover" />
             ) : (
                <div className="text-white opacity-80 font-bold text-xl">{listing.companyName.charAt(0)}</div>
             )}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[#0F172A] mb-2">{listing.companyName}</h1>
            <div className="flex items-center gap-3">
              {getStatusBadge()}
              <div className="flex items-center gap-1 text-[13px] font-medium text-[#2563EB]">
                <CheckCircle size={14} />
                Quality Score: <strong>{qualityScore}%</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {status !== "Rejected" && (
            <button
              onClick={handleReject}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-[#EF4444] rounded-md text-[13px] font-bold text-[#EF4444] hover:bg-red-50 transition-colors shadow-sm"
            >
              <XCircle size={16} />
              Reject
            </button>
          )}
          {status !== "Approved" && (
            <button
              onClick={handleApprove}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#D4AF37] border border-[#D4AF37] rounded-md text-[13px] font-bold text-[#0F172A] hover:bg-[#C2982B] transition-colors shadow-sm"
            >
              <CheckCircle size={16} className="text-[#0F172A]" strokeWidth={1} />
              Approve
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* Left Column (Live Preview Canvas) */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2 text-[16px] font-extrabold text-gray-700">
            <Eye size={20} />
            <h2>Live Preview Canvas</h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
            {/* Cover Image */}
            <div className="h-48 md:h-64 bg-slate-300 relative">
              <img
                src="https://images.unsplash.com/photo-1533422902779-babd49fb294e?q=80&w=2070&auto=format&fit=crop"
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-white/20 rounded-md text-[12px] font-bold text-gray-700 shadow-sm hover:bg-white transition-colors">
                  <Monitor size={14} />
                  Desktop View
                </button>
              </div>
            </div>

            {/* Profile Content */}
            <div className="px-6 md:px-10 pb-10">

              {/* Avatar & Contact Button Row */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 relative">
                <div className="w-28 h-28 bg-[#0F172A] rounded-xl border-4 border-white shadow-lg -mt-14 relative z-10 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1563906267088-b029e7101114?q=80&w=2070&auto=format&fit=crop"
                    alt="Logo"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>

                <button className="mt-4 sm:mt-0 px-6 py-2.5 bg-[#818CF8] text-white text-[13px] font-bold rounded-md hover:bg-[#6366F1] transition-colors shadow-sm">
                  Contact Supplier
                </button>
              </div>

              {/* Main Detail Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* About & Products */}
                <div className="lg:col-span-2 space-y-10">

                  <section>
                    <h3 className="text-[18px] font-extrabold text-[#0F172A] mb-4 border-b border-gray-100 pb-2">About Us</h3>
                    <p className="text-[14px] text-[#64748B] leading-relaxed font-medium whitespace-pre-line">
                      {listing.description || "No description provided."}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-[18px] font-extrabold text-[#0F172A] mb-4 border-b border-gray-100 pb-2">Core Products</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {listing.products && listing.products.length > 0 ? (
                        listing.products.map((product, index) => (
                          <div key={index} className="bg-[#F8F9FB] rounded-xl border border-gray-200 overflow-hidden group">
                            <div className="h-32 bg-gray-200 overflow-hidden flex items-center justify-center">
                              {/* Placeholder for product image since it's not in the model yet */}
                              <span className="text-gray-400 font-bold">No Image</span>
                            </div>
                            <div className="p-4">
                              <h4 className="text-[14px] font-bold text-[#0F172A] mb-1">{product.name}</h4>
                              <p className="text-[12px] text-[#64748B] leading-relaxed">{product.description || "No description."}</p>
                              {product.price && <p className="text-[13px] font-bold text-[#2563EB] mt-2">${product.price}</p>}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-[13px] text-gray-500 col-span-2">No products added yet.</p>
                      )}
                    </div>
                  </section>

                </div>

                {/* Quick Facts */}
                <div className="lg:col-span-1">
                  <div className="bg-[#F8F9FB] rounded-xl border border-gray-200 p-5 space-y-6">
                    <h3 className="text-[16px] font-extrabold text-[#0F172A]">Quick Facts</h3>

                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-[#D4AF37] mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Contact</p>
                        <p className="text-[13px] font-bold text-[#0F172A] leading-snug">{listing.contactEmail || "N/A"}<br />{listing.contactPhone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Factory size={16} className="text-[#D4AF37] mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Website</p>
                        <p className="text-[13px] font-bold text-[#2563EB] leading-snug overflow-hidden text-ellipsis">{listing.website || "N/A"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Award size={16} className="text-[#D4AF37] mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Categories</p>
                        <div className="flex flex-wrap gap-2">
                          {listing.categories && listing.categories.length > 0 ? (
                             listing.categories.map(cat => (
                               <span key={cat._id} className="px-2 py-1 bg-white border border-gray-200 text-[11px] font-bold text-gray-600 rounded">{cat.name}</span>
                             ))
                          ) : (
                             <span className="text-[11px] text-gray-400">None</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Sidebars) */}
        <div className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0 space-y-6 mt-10 lg:mt-0">

          {/* Admin Checklist */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-[#FEF3C7] rounded text-[#D97706] flex items-center justify-center">
                <Check size={14} strokeWidth={3} />
              </div>
              <h3 className="text-[16px] font-extrabold text-[#0F172A]">Admin Checklist</h3>
            </div>

            <div className="space-y-4">
              {/* Check 1 */}
              <div
                className="bg-[#F8F9FB] rounded-lg border border-gray-100 p-4 flex items-start gap-3 cursor-pointer group hover:border-gray-300 transition-colors"
                onClick={() => toggleChecklist("companyInfo")}
              >
                <div className={`mt-0.5 w-[20px] h-[20px] rounded flex items-center justify-center border transition-colors flex-shrink-0 ${checklist.companyInfo ? "bg-[#D97706] border-[#D97706]" : "border-gray-300 bg-white group-hover:border-gray-400"}`}>
                  {checklist.companyInfo && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#0F172A] leading-none mb-1.5">Company Info Complete</p>
                  <p className="text-[11px] font-medium text-gray-500 leading-snug">All required text fields populated.</p>
                </div>
              </div>

              {/* Check 2 */}
              <div
                className="bg-[#F8F9FB] rounded-lg border border-gray-100 p-4 flex items-start gap-3 cursor-pointer group hover:border-gray-300 transition-colors"
                onClick={() => toggleChecklist("mediaAssets")}
              >
                <div className={`mt-0.5 w-[20px] h-[20px] rounded flex items-center justify-center border transition-colors flex-shrink-0 ${checklist.mediaAssets ? "bg-[#D97706] border-[#D97706]" : "border-gray-300 bg-white group-hover:border-gray-400"}`}>
                  {checklist.mediaAssets && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#0F172A] leading-none mb-1.5">Media Assets Validated</p>
                  <p className="text-[11px] font-medium text-gray-500 leading-snug">High-res logo and gallery images present.</p>
                </div>
              </div>

              {/* Check 3 */}
              <div
                className="bg-[#F8F9FB] rounded-lg border border-gray-100 p-4 flex items-start gap-3 cursor-pointer group hover:border-gray-300 transition-colors"
                onClick={() => toggleChecklist("certifications")}
              >
                <div className={`mt-0.5 w-[20px] h-[20px] rounded flex items-center justify-center border transition-colors flex-shrink-0 ${checklist.certifications ? "bg-[#D97706] border-[#D97706]" : "border-gray-300 bg-white group-hover:border-gray-400"}`}>
                  {checklist.certifications && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#0F172A] leading-none mb-1.5">Certifications Verified</p>
                  <p className="text-[11px] font-medium text-gray-500 leading-snug">Check ISO documents against external database.</p>
                </div>
              </div>

            </div>
          </div>

          {/* System Data */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-[11px] font-extrabold text-gray-500 tracking-wider uppercase border-b border-gray-100 pb-3 mb-4">
              System Data
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-gray-500">Submitted:</span>
                <span className="text-[13px] font-bold text-[#0F172A]">{new Date(listing.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-gray-500">Submitted By:</span>
                <span className="text-[13px] font-bold text-[#D97706]">{listing.user?.name || "Unknown"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-gray-500">Listing ID:</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-[11px] font-bold">{listing._id.substring(0, 8).toUpperCase()}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
