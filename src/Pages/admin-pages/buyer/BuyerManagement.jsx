import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Download, Plus, ChevronDown } from "lucide-react";
import { 
  useGetUsersQuery, 
  useCreateUserMutation, 
  useUpdateUserMutation, 
  useDeleteUserMutation 
} from "../../../redux/features/users/usersApi";
import BuyerTable, { Pagination } from "../../../Components/admin-components/buyer/BuyerTable";
import BuyerFormModal from "../../../Components/admin-components/buyer/BuyerFormModal";
import { hasAdminPermission } from "../../../utils/adminAccess";

export default function BuyerManagement() {
  const { user } = useSelector((state) => state.auth);
  const { data: usersResponse, isLoading } = useGetUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  // Filter only buyers
  const buyers = useMemo(() => {
    const users = usersResponse?.data || [];
    return users.filter(user => user.role === 'buyer').map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      status: user.status || "Active",
      verification: user.isVerified ? "Verified" : "Unverified",
      rfqs: 0, // Placeholder
      favs: 0, // Placeholder
      createdDate: new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) + ',',
      createdYear: new Date(user.createdAt).getFullYear().toString(),
      avatarColor: "bg-[#DBEAFE]", // default
      initials: user.name ? user.name.substring(0, 2).toUpperCase() : "NA"
    }));
  }, [usersResponse?.data]);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBuyer, setEditingBuyer] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [verificationFilter, setVerificationFilter] = useState("All");
  const pageSize = 6;
  const canManageUsers = hasAdminPermission(user, "users.manage");

  const handleSaveBuyer = async (savedBuyer) => {
    try {
      const isVerified = savedBuyer.verification === 'Verified';
      
      if (editingBuyer) {
        await updateUser({ 
          id: savedBuyer.id, 
          userData: { 
            name: savedBuyer.name, 
            email: savedBuyer.email, 
            status: savedBuyer.status,
            isVerified
          } 
        }).unwrap();
      } else {
        await createUser({
          name: savedBuyer.name,
          email: savedBuyer.email,
          password: "DefaultPassword123!", // Require strong default for now
          role: "buyer",
          status: savedBuyer.status,
          isVerified
        }).unwrap();
      }
      setEditingBuyer(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error saving buyer");
    }
  };

  const handleDeleteBuyer = async (id) => {
    if (window.confirm("Are you sure you want to delete this buyer?")) {
      try {
        await deleteUser(id).unwrap();
      } catch (err) {
        console.error(err);
        alert("Error deleting buyer");
      }
    }
  };

  const openAddModal = () => {
    setEditingBuyer(null);
    setIsModalOpen(true);
  };

  const openEditModal = (buyer) => {
    setEditingBuyer(buyer);
    setIsModalOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredBuyers = useMemo(() => {
    return buyers.filter(buyer => {
      const matchStatus = statusFilter === "All" || buyer.status === statusFilter;
      const matchVerification = verificationFilter === "All" || buyer.verification === verificationFilter;
      return matchStatus && matchVerification;
    });
  }, [buyers, statusFilter, verificationFilter]);

  const paginatedBuyers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredBuyers.slice(start, start + pageSize);
  }, [currentPage, filteredBuyers]);

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedBuyers.map(b => b.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleBulkVerify = async () => {
    try {
      await Promise.all(selectedIds.map(id => 
        updateUser({ id, userData: { isVerified: true } }).unwrap()
      ));
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
      alert("Error verifying buyers");
    }
  };

  const handleBulkSuspend = async () => {
    try {
      await Promise.all(selectedIds.map(id => 
        updateUser({ id, userData: { status: 'Suspended' } }).unwrap()
      ));
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
      alert("Error suspending buyers");
    }
  };

  const hasSelection = selectedIds.length > 0;

  return (
    <div className="min-h-screen p-6 mt-16 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans pt-24">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] mb-2 tracking-tight">
            Buyer Management
          </h1>
          <p className="text-[14px] text-gray-500 font-medium">
            Manage public buyers, monitor activity, and handle verifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-[#0F172A] hover:bg-gray-50 transition-colors shadow-sm print:hidden"
          >
            <Download size={16} />
            Print Data
          </button>
          <button 
            onClick={openAddModal}
            disabled={!canManageUsers}
            className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] border border-[#D4AF37] rounded-md text-[13px] font-bold text-[#0F172A] hover:bg-[#C2982B] transition-colors shadow-sm"
          >
            <Plus size={16} strokeWidth={3} />
            Add Buyer
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-8">

        {/* Filters and Bulk Actions Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-4 border-b border-gray-100 gap-4">

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none flex items-center justify-between gap-2 pl-3 pr-8 py-2 bg-[#F1F5F9] rounded-md text-[12px] font-bold text-[#475569] min-w-[120px] hover:bg-[#E2E8F0] transition-colors outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-2.5 text-[#475569] pointer-events-none" />
            </div>

            <div className="relative">
              <select 
                value={verificationFilter}
                onChange={(e) => {
                  setVerificationFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none flex items-center justify-between gap-2 pl-3 pr-8 py-2 bg-[#E0E7FF] rounded-md text-[12px] font-bold text-[#4338CA] min-w-[140px] hover:bg-[#C7D2FE] transition-colors outline-none cursor-pointer"
              >
                <option value="All">Verification: All</option>
                <option value="Verified">Verified</option>
                <option value="Unverified">Unverified</option>
                <option value="TOS Violation">TOS Violation</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-2.5 text-[#4338CA] pointer-events-none" />
            </div>

            <button className="flex items-center justify-between gap-2 px-3 py-2 bg-[#E0E7FF] rounded-md text-[12px] font-bold text-[#4338CA] min-w-[160px] hover:bg-[#C7D2FE] transition-colors">
              Activity: Last 30 Days
              <ChevronDown size={14} />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <span className="text-[12px] font-bold text-gray-500 mr-1">Bulk Actions:</span>
            <button
              onClick={handleBulkVerify}
              disabled={!canManageUsers || !hasSelection || isLoading}
              className="px-4 py-2 border border-gray-200 rounded-md text-[12px] font-bold text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              Verify
            </button>
            <button
              onClick={handleBulkSuspend}
              disabled={!canManageUsers || !hasSelection || isLoading}
              className="px-4 py-2 border border-gray-200 rounded-md text-[12px] font-bold text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              Suspend
            </button>
          </div>

        </div>

        {/* Table Area */}
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading buyers...</div>
        ) : (
          <BuyerTable 
            buyers={paginatedBuyers}
            selectedIds={selectedIds}
            onSelect={handleSelect}
            onSelectAll={handleSelectAll}
            onEdit={canManageUsers ? openEditModal : undefined}
            onDelete={canManageUsers ? handleDeleteBuyer : undefined}
          />
        )}

        {/* Pagination Area */}
        {!isLoading && (
          <Pagination 
            currentPage={currentPage}
            totalItems={filteredBuyers.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}

      </div>

      {canManageUsers && (
        <BuyerFormModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveBuyer}
          buyer={editingBuyer}
        />
      )}
    </div>
  );
}
