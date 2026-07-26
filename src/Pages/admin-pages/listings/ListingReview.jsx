import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListings, reviewListing } from "../../../redux/features/listings/listingsSlice";
import { ChevronRight, Filter, Download, Search, Hourglass, CheckCircle2, XCircle, Star, TrendingUp } from "lucide-react";
import ListingTable from "../../../Components/admin-components/listings/ListingTable";

export default function ListingReview() {
  const dispatch = useDispatch();
  const { listings, isLoading } = useSelector((state) => state.listings);

  useEffect(() => {
    dispatch(getListings());
  }, [dispatch]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  // Calculate profile completeness for quality score
  const calculateQualityScore = (listing) => {
    let score = 0;
    if (listing.companyName) score += 20;
    if (listing.description) score += 20;
    if (listing.contactEmail) score += 20;
    if (listing.logo && listing.logo !== 'no-logo.jpg') score += 20;
    if (listing.categories && listing.categories.length > 0) score += 20;
    return score;
  };

  const mappedListings = useMemo(() => {
    return listings.map(l => ({
      id: l._id,
      companyName: l.companyName,
      category: l.categories && l.categories.length > 0 ? l.categories[0].name : "Uncategorized",
      submitted: new Date(l.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      supplier: l.user ? (l.user.name || "Unknown") : "Unknown", // user is populated if possible, otherwise we might need to rely on companyName
      plan: l.subscriptionPlan === 'premium' ? 'Pro' : 'Basic',
      status: l.listingStatus || 'Pending',
      quality: calculateQualityScore(l)
    }));
  }, [listings]);

  const filteredListings = mappedListings.filter(l =>
    l.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.supplier?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (id) => {
    dispatch(reviewListing({ id, listingStatus: 'Approved' }));
  };

  const handleReject = (id) => {
    dispatch(reviewListing({ id, listingStatus: 'Rejected' }));
  };

  const handleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredListings.map(l => l.id));
    } else {
      setSelectedIds([]);
    }
  };

  const pendingCount = mappedListings.filter(l => l.status === 'Pending').length;
  const approvedCount = mappedListings.filter(l => l.status === 'Approved').length;
  const rejectedCount = mappedListings.filter(l => l.status === 'Rejected').length;

  return (
    <div className="min-h-screen p-6 mt-16 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans pt-24">


      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Listing Review
        </h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] border border-[#D4AF37] rounded-md text-[13px] font-bold text-[#0F172A] hover:bg-[#C2982B] transition-colors shadow-sm">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        {/* Pending Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[14px] font-bold text-gray-500">Pending Review</h3>
            <Hourglass size={20} className="text-[#D97706]" />
          </div>
          <div className="text-4xl font-extrabold text-[#0F172A] mb-3">{pendingCount}</div>
          <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#10B981]">
            <TrendingUp size={14} />
            +3 today
          </div>
        </div>

        {/* Approved Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[14px] font-bold text-gray-500">Approved</h3>
            <CheckCircle2 size={20} className="text-[#10B981]" />
          </div>
          <div className="text-4xl font-extrabold text-[#0F172A] mb-3">{approvedCount}</div>
          <div className="text-[12px] font-medium text-gray-400">
            Last 7 days
          </div>
        </div>

        {/* Rejected Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[14px] font-bold text-gray-500">Rejected</h3>
            <XCircle size={20} className="text-[#EF4444]" />
          </div>
          <div className="text-4xl font-extrabold text-[#0F172A] mb-3">{rejectedCount}</div>
          <div className="text-[12px] font-medium text-gray-400">
            Last 7 days
          </div>
        </div>

        {/* Featured Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[14px] font-bold text-gray-500">Featured</h3>
            <Star size={20} className="text-[#F59E0B]" />
          </div>
          <div className="text-4xl font-extrabold text-[#0F172A] mb-3">12</div>
          <div className="text-[12px] font-medium text-gray-400">
            Active promotions
          </div>
        </div>

      </div>

      {/* Main Table Area */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

        {/* Table Header */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-[18px] font-extrabold text-[#0F172A]">
            Pending Listings Directory
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search table..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-[#F8F9FB] border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] w-[240px] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
            />
          </div>
        </div>

        {/* Table Component */}
        <ListingTable
          listings={filteredListings}
          selectedIds={selectedIds}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
          onApprove={handleApprove}
          onReject={handleReject}
        />

      </div>
    </div>
  );
}
