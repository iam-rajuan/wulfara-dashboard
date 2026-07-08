import React, { useState, useMemo } from "react";
import { Download, Plus, ChevronDown, Search, Filter } from "lucide-react";
import SupplierTable from "../../../Components/admin-components/supplier/SupplierTable";
import SupplierFormModal from "../../../Components/admin-components/supplier/SupplierFormModal";
import SupplierDetailsModal from "../../../Components/admin-components/supplier/SupplierDetailsModal";
import { Pagination } from "../../../Components/admin-components/buyer/BuyerTable"; // Reuse pagination

// Mock data generator
const generateSuppliers = () => {
  const suppliers = [
    {
      id: 1,
      icon: "Tool", // PenTool icon represents machinery/equipment
      name: "James Miller",
      company: "Apex Machinery Ltd.",
      email: "james@apexmachinery.com",
      plan: "Premium",
      verification: "Verified",
      listingStatus: "Approved (45)",
      subscription: "Active"
    },
    {
      id: 2,
      icon: "Box",
      name: "Linda Brooks",
      company: "Global Logistics Supplies",
      email: "linda.b@globallogistics.com",
      plan: "Pro",
      verification: "Pending",
      listingStatus: "Pending Review (12)",
      subscription: "Active"
    },
    {
      id: 3,
      icon: "Box",
      name: "Linda Brooks",
      company: "Global Logistics Supplies",
      email: "linda.b@globallogistics.com",
      plan: "Pro",
      verification: "Pending",
      listingStatus: "Pending Review (12)",
      subscription: "Active"
    },
    {
      id: 4,
      icon: "Truck",
      name: "Ahmed Khan",
      company: "Khan Fleet Services",
      email: "ahmed@khanfleet.com",
      plan: "Basic",
      verification: "Suspended",
      listingStatus: "Hidden (0)",
      subscription: "Past Due"
    },
    {
      id: 5,
      icon: "Tool", // PenTool icon
      name: "Emily Rogers",
      company: "Rogers Equipment Co.",
      email: "erogers@rogerseq.net",
      plan: "Pro",
      verification: "Verified",
      listingStatus: "Approved (8)",
      subscription: "Paused"
    }
  ];

  // Multiply list to demonstrate larger pagination
  let largeList = [];
  for (let i = 0; i < 26; i++) {
    largeList = [...largeList, ...suppliers.map(s => ({ ...s, id: s.id + i * 100 }))];
  }
  return largeList.slice(0, 128); // Exactly 128 items as per design
};

const MOCK_SUPPLIERS = generateSuppliers();

export default function SupplierManagement() {
  const [suppliers, setSuppliers] = useState(MOCK_SUPPLIERS);
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
  const pageSize = 4; // Design shows 4 items per page

  const handleSaveSupplier = (savedSupplier) => {
    if (editingSupplier) {
      setSuppliers(suppliers.map((s) => (s.id === savedSupplier.id ? savedSupplier : s)));
    } else {
      setSuppliers([savedSupplier, ...suppliers]);
    }
    setEditingSupplier(null);
  };

  const handleDeleteSupplier = (id) => {
    setSuppliers(suppliers.filter((s) => s.id !== id));
  };

  const handleApproveSupplier = (supplier) => {
    setSuppliers(suppliers.map(s => s.id === supplier.id ? { ...s, verification: "Verified", listingStatus: "Approved (0)" } : s));
  };

  const openAddModal = () => {
    setEditingSupplier(null);
    setIsModalOpen(true);
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

  const handleApplyBulkAction = () => {
    if (!bulkAction || selectedIds.length === 0) return;
    
    if (bulkAction === "verify") {
      setSuppliers(suppliers.map(s => selectedIds.includes(s.id) ? { ...s, verification: "Verified" } : s));
    } else if (bulkAction === "suspend") {
      setSuppliers(suppliers.map(s => selectedIds.includes(s.id) ? { ...s, verification: "Suspended" } : s));
    } else if (bulkAction === "delete") {
      setSuppliers(suppliers.filter(s => !selectedIds.includes(s.id)));
    }
    
    setSelectedIds([]);
    setBulkAction("");
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
                disabled={!hasSelection}
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
              disabled={!hasSelection || !bulkAction}
              className="px-4 py-2 border border-gray-200 rounded-md text-[12px] font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              Apply
            </button>
          </div>

        </div>

        {/* Table Area */}
        <SupplierTable 
          suppliers={paginatedSuppliers}
          selectedIds={selectedIds}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
          onEdit={openEditModal}
          onDelete={handleDeleteSupplier}
          onApprove={handleApproveSupplier}
          onView={openViewModal}
        />

        {/* Pagination Area */}
        <Pagination 
          currentPage={currentPage}
          totalItems={filteredSuppliers.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />

      </div>

      <SupplierFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSupplier}
        supplier={editingSupplier}
      />

      <SupplierDetailsModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        supplier={viewingSupplier}
      />
    </div>
  );
}
