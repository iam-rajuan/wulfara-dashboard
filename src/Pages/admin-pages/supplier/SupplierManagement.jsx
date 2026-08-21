import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Download, Plus, ChevronDown, Search, Filter, AlertTriangle, Trash2 } from "lucide-react";
import { Modal, message, Spin } from "antd";
import { 
  useGetListingsQuery, 
  useUpdateListingMutation 
} from "../../../redux/features/listings/listingsApi";
import { useUpdateUserMutation, useDeleteUserMutation } from "../../../redux/features/users/usersApi";
import SupplierTable from "../../../Components/admin-components/supplier/SupplierTable";
import SupplierFormModal from "../../../Components/admin-components/supplier/SupplierFormModal";
import SupplierDetailsModal from "../../../Components/admin-components/supplier/SupplierDetailsModal";
import { Pagination } from "../../../Components/admin-components/buyer/BuyerTable"; // Reuse pagination
import { hasAdminPermission } from "../../../utils/adminAccess";

export default function SupplierManagement() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { data: listingsResponse, isLoading, error, refetch } = useGetListingsQuery(undefined, { refetchOnMountOrArgChange: true });
  const [updateListing] = useUpdateListingMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  // Filter only suppliers
  const suppliers = useMemo(() => {
    const suppliersData = listingsResponse?.data || [];
    return suppliersData
      .filter(sup => sup.user !== null && sup.user !== undefined)
      .map(sup => ({
        id: sup._id,
        icon: "Box", 
        name: sup.user?.name || sup.contactEmail || "Unknown",
        company: sup.companyName || "No Company Name",
        email: sup.contactEmail || sup.user?.email || "No Email",
        plan: sup.subscriptionPlan ? `${sup.subscriptionPlan.charAt(0).toUpperCase()}${sup.subscriptionPlan.slice(1)}` : "Free",
        verification: sup.isApproved ? "Verified" : (sup.listingStatus === 'Suspended' ? "Suspended" : "Pending"),
        listingStatus: sup.listingStatus || "Pending",
        subscription: sup.subscriptionStatus ? `${sup.subscriptionStatus.charAt(0).toUpperCase()}${sup.subscriptionStatus.slice(1)}` : "Inactive",
        featuredHeroPlacementActive: Boolean(sup.featuredHeroPlacement?.enabled)
      }));
  }, [listingsResponse?.data]);

  const suppliersData = listingsResponse?.data || [];

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingSupplier, setViewingSupplier] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [planFilter, setPlanFilter] = useState("All");
  const [verificationFilter, setVerificationFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [bulkAction, setBulkAction] = useState("");
  const pageSize = 10; // Design shows 10 items per page
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const canManageSuppliers = hasAdminPermission(user, "suppliers.manage");

  const handleSaveSupplier = async (savedSupplier) => {
    try {
      if (editingSupplier) {
        const originalSup = suppliersData.find(s => s._id === savedSupplier.id);
        const userId = originalSup?.user?._id || originalSup?.user;

        let isApproved = savedSupplier.verification === 'Verified';
        let listingStatus = savedSupplier.listingStatus;
        if (listingStatus.includes("Approved")) listingStatus = "Approved";
        if (listingStatus.includes("Pending")) listingStatus = "Pending";
        if (listingStatus.includes("Hidden")) listingStatus = "Hidden";

        // Update listing
        await updateListing({ 
          id: savedSupplier.id, 
          data: { 
            companyName: savedSupplier.company,
            contactEmail: savedSupplier.email,
            isApproved,
            listingStatus
          } 
        }).unwrap();

        // Update user account (status & verification)
        if (userId) {
          let userStatus = "Active";
          if (savedSupplier.verification === "Suspended") userStatus = "Suspended";
          
          let isVerified = savedSupplier.verification === "Verified";

          await updateUser({
            id: userId,
            userData: {
              status: userStatus,
              isVerified,
              name: savedSupplier.name
            }
          }).unwrap();
        }
      }
      setEditingSupplier(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error saving supplier");
    }
  };

  const handleDeleteSupplier = (id) => {
    const originalSup = suppliersData.find(s => s._id === id);
    setSupplierToDelete(originalSup);
    setDeleteModalOpen(true);
  };

  const confirmDeleteSupplier = async () => {
    if (!supplierToDelete) return;
    setIsDeleting(true);
    try {
      const userId = supplierToDelete.user?._id || supplierToDelete.user;
      if (userId) {
        await deleteUser(userId).unwrap();
        refetch();
        message.success("Supplier deleted successfully");
      } else {
        message.error("No user account associated with this listing");
      }
      setDeleteModalOpen(false);
      setSupplierToDelete(null);
    } catch (err) {
      console.error(err);
      message.error("Error deleting supplier");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleApproveSupplier = async (supplier) => {
    try {
      await updateListing({ id: supplier.id, data: { isApproved: true, listingStatus: 'Approved' } }).unwrap();
    } catch (err) {
      console.error(err);
      alert("Error approving supplier");
    }
  };

  const openAddModal = () => {
    navigate("/sign-up?mode=admin_assisted");
  };

  const openEditModal = (supplier) => {
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };

  const openViewModal = (supplier) => {
    setViewingSupplier(supplier);
    setIsViewModalOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(supplier => {
      const matchSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          supplier.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          supplier.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPlan = planFilter === "All" || supplier.plan === planFilter;
      const matchVerification = verificationFilter === "All" || supplier.verification === verificationFilter;
      const matchStatus = statusFilter === "All" || supplier.subscription === statusFilter;
      
      return matchSearch && matchPlan && matchVerification && matchStatus;
    });
  }, [suppliers, searchQuery, planFilter, verificationFilter, statusFilter]);

  const paginatedSuppliers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredSuppliers.slice(start, start + pageSize);
  }, [currentPage, filteredSuppliers]);

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedSuppliers.map(s => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleApplyBulkAction = async () => {
    if (!bulkAction || selectedIds.length === 0) return;
    
    try {
      if (bulkAction === "verify") {
        await Promise.all(selectedIds.map(id => 
          updateListing({ id, data: { isApproved: true, listingStatus: 'Approved' } }).unwrap()
        ));
      } else if (bulkAction === "suspend") {
        await Promise.all(selectedIds.map(id => 
          updateListing({ id, data: { listingStatus: 'Suspended' } }).unwrap()
        ));
      } else if (bulkAction === "delete") {
        alert("Bulk delete is not implemented in listingsApi yet.");
      }
      setSelectedIds([]);
      setBulkAction("");
    } catch (err) {
      console.error(err);
      alert("Error applying bulk action");
    }
  };

  const hasSelection = selectedIds.length > 0;

  return (
    <div className="min-h-screen p-6 mt-16 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans pt-24">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] mb-2 tracking-tight">
            Supplier Management
          </h1>
          <p className="text-[14px] text-gray-500 font-medium">
            Manage supplier accounts, verify businesses, and monitor listing compliance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-[#0F172A] hover:bg-gray-50 transition-colors shadow-sm print:hidden"
          >
            <Download size={16} />
            Export Suppliers
          </button>
          <button 
            onClick={openAddModal}
            disabled={!canManageSuppliers}
            className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] border border-[#D4AF37] rounded-md text-[13px] font-bold text-[#0F172A] hover:bg-[#C2982B] transition-colors shadow-sm"
          >
            <Plus size={16} strokeWidth={3} />
            Add Supplier
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-8">

        {/* Filters and Bulk Actions Bar */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center p-4 border-b border-gray-100 gap-4">

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search suppliers, emails..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 pr-4 py-2 bg-[#F8F9FB] border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] min-w-[240px] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
              />
            </div>
            
            <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

            {/* Plan Filter */}
            <div className="relative">
              <select 
                value={planFilter}
                onChange={(e) => {
                  setPlanFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none flex items-center justify-between gap-2 pl-3 pr-8 py-2 bg-[#F1F5F9] rounded-md text-[12px] font-bold text-[#475569] min-w-[110px] hover:bg-[#E2E8F0] transition-colors outline-none cursor-pointer border border-gray-200"
              >
                <option value="All">Plan: All</option>
                <option value="Premium">Premium</option>
                <option value="Pro">Pro</option>
                <option value="Basic">Basic</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-2.5 text-[#475569] pointer-events-none" />
            </div>

            {/* Verification Filter */}
            <div className="relative">
              <select 
                value={verificationFilter}
                onChange={(e) => {
                  setVerificationFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none flex items-center justify-between gap-2 pl-3 pr-8 py-2 bg-[#F1F5F9] rounded-md text-[12px] font-bold text-[#475569] min-w-[130px] hover:bg-[#E2E8F0] transition-colors outline-none cursor-pointer border border-gray-200"
              >
                <option value="All">Verification: All</option>
                <option value="Verified">Verified</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-2.5 text-[#475569] pointer-events-none" />
            </div>
            
            {/* Status Filter */}
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none flex items-center justify-between gap-2 pl-3 pr-8 py-2 bg-[#F1F5F9] rounded-md text-[12px] font-bold text-[#475569] min-w-[110px] hover:bg-[#E2E8F0] transition-colors outline-none cursor-pointer border border-gray-200"
              >
                <option value="All">Status: All</option>
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
                <option value="Past Due">Past Due</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-2.5 text-[#475569] pointer-events-none" />
            </div>
            
            <button className="p-2 border border-gray-200 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50">
              <Filter size={16} />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full xl:w-auto">
            <span className="text-[12px] font-bold text-gray-500 mr-1">Bulk Actions:</span>
            
            <div className="relative">
              <select 
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                disabled={!canManageSuppliers || !hasSelection || isLoading}
                className="appearance-none flex items-center justify-between gap-2 pl-3 pr-8 py-2 bg-white rounded-md text-[12px] font-bold text-gray-700 min-w-[160px] border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed outline-none cursor-pointer"
              >
                <option value="" disabled>Select Action...</option>
                <option value="verify">Verify Selected</option>
                <option value="suspend">Suspend Selected</option>
                <option value="delete">Delete Selected</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
            </div>

            <button
              onClick={handleApplyBulkAction}
              disabled={!canManageSuppliers || !hasSelection || !bulkAction || isLoading}
              className="px-4 py-2 border border-gray-200 rounded-md text-[12px] font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              Apply
            </button>
          </div>

        </div>

        {/* Table Area */}
        {error && (
          <div className="p-8 text-center text-red-500 font-bold border border-red-200 bg-red-50 rounded-md m-4">
            <h3>Error loading suppliers</h3>
            <pre className="text-left mt-4 text-xs overflow-auto">
              {JSON.stringify(error, null, 2)}
            </pre>
          </div>
        )}
        
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading suppliers...</div>
        ) : !error && (
          <SupplierTable 
            suppliers={paginatedSuppliers}
            selectedIds={selectedIds}
            onSelect={handleSelect}
            onSelectAll={handleSelectAll}
            onEdit={canManageSuppliers ? openEditModal : undefined}
            onDelete={canManageSuppliers ? handleDeleteSupplier : undefined}
            onApprove={canManageSuppliers ? handleApproveSupplier : undefined}
            onView={openViewModal}
          />
        )}

        {/* Pagination Area */}
        {!isLoading && !error && (
          <Pagination 
            currentPage={currentPage}
            totalItems={filteredSuppliers.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            entityType="suppliers"
          />
        )}

      </div>

      {canManageSuppliers && (
        <SupplierFormModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveSupplier}
          supplier={editingSupplier}
        />
      )}

      <SupplierDetailsModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        supplier={viewingSupplier}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteModalOpen}
        onCancel={() => !isDeleting && setDeleteModalOpen(false)}
        footer={null}
        closable={!isDeleting}
        centered
        width={400}
      >
        <div className="p-4 text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Supplier</h3>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Are you sure you want to delete <span className="font-semibold text-gray-800">{supplierToDelete?.companyName || supplierToDelete?.company || "this supplier"}</span>? This will permanently delete the supplier listing and the associated user account.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              type="button"
              disabled={isDeleting}
              onClick={() => setDeleteModalOpen(false)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isDeleting}
              onClick={confirmDeleteSupplier}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold transition-colors flex items-center gap-2 disabled:opacity-50 shadow-sm"
            >
              {isDeleting ? <Spin size="small" className="text-white" /> : <Trash2 size={16} />}
              {isDeleting ? 'Deleting...' : 'Delete Supplier'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
