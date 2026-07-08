import React, { useState, useMemo } from "react";
import { Download, Plus, ChevronDown } from "lucide-react";
import BuyerTable, { Pagination } from "../../../Components/admin-components/buyer/BuyerTable";
import BuyerFormModal from "../../../Components/admin-components/buyer/BuyerFormModal";

// Mock data generator
const generateBuyers = () => {
  const buyers = [
    {
      id: 1,
      name: "Michael Carter",
      email: "m.carter@techflow.inc",
      status: "Active",
      verification: "Verified",
      rfqs: 14,
      favs: 8,
      createdDate: "Oct 12,",
      createdYear: "2023",
      avatarColor: "bg-[#DBEAFE]", // light blue
      initials: "MC"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "s.johnson@globex.co",
      status: "Pending",
      verification: "Unverified",
      rfqs: 0,
      favs: 2,
      createdDate: "Nov 04,",
      createdYear: "2023",
      avatarColor: "bg-[#FEF3C7]", // light yellow
      initials: "SJ"
    },
    {
      id: 3,
      name: "David Lee",
      email: "david.lee@apexind.com",
      status: "Active",
      verification: "Verified",
      rfqs: 32,
      favs: 15,
      createdDate: "Jan 18,",
      createdYear: "2023",
      avatarColor: "bg-[#DBEAFE]", // light blue
      initials: "DL"
    },
    {
      id: 4,
      name: "David Lee",
      email: "david.lee@apexind.com",
      status: "Active",
      verification: "Verified",
      rfqs: 32,
      favs: 15,
      createdDate: "Jan 18,",
      createdYear: "2023",
      avatarColor: "bg-[#DBEAFE]", // light blue
      initials: "DL"
    },
    {
      id: 5,
      name: "David Lee",
      email: "david.lee@apexind.com",
      status: "Active",
      verification: "Verified",
      rfqs: 32,
      favs: 15,
      createdDate: "Jan 18,",
      createdYear: "2023",
      avatarColor: "bg-[#DBEAFE]", // light blue
      initials: "DL"
    },
    {
      id: 6,
      name: "Amina Yusuf",
      email: "ayusuf@unknown.net",
      status: "Suspended",
      verification: "TOS Violation",
      rfqs: 3,
      favs: 0,
      createdDate: "Oct 28,",
      createdYear: "2023",
      avatarColor: "bg-[#FCE7F3]", // light pink
      initials: "AY"
    },
    // Adding a few more for pagination testing
    {
      id: 7,
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      verification: "Verified",
      rfqs: 5,
      favs: 1,
      createdDate: "Dec 01,",
      createdYear: "2023",
      avatarColor: "bg-[#E0E7FF]",
      initials: "JD"
    },
    {
      id: 8,
      name: "Alice Smith",
      email: "alice@smith.com",
      status: "Pending",
      verification: "Unverified",
      rfqs: 0,
      favs: 0,
      createdDate: "Feb 10,",
      createdYear: "2024",
      avatarColor: "bg-[#DCFCE7]",
      initials: "AS"
    }
  ];

  // Multiply list to demonstrate larger pagination (128 items as per screenshot "1 to 4 of 128")
  let largeList = [];
  for (let i = 0; i < 16; i++) {
    largeList = [...largeList, ...buyers.map(b => ({ ...b, id: b.id + i * 100 }))];
  }
  return largeList.slice(0, 128); // Exactly 128 items
};

const MOCK_BUYERS = generateBuyers();

export default function BuyerManagement() {
  const [buyers, setBuyers] = useState(MOCK_BUYERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBuyer, setEditingBuyer] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [verificationFilter, setVerificationFilter] = useState("All");
  const pageSize = 6;

  const handleSaveBuyer = (savedBuyer) => {
    if (editingBuyer) {
      setBuyers(buyers.map((b) => (b.id === savedBuyer.id ? savedBuyer : b)));
    } else {
      setBuyers([savedBuyer, ...buyers]);
    }
    setEditingBuyer(null);
  };

  const handleDeleteBuyer = (id) => {
    setBuyers(buyers.filter((b) => b.id !== id));
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

  const handleBulkVerify = () => {
    setBuyers(buyers.map(b => selectedIds.includes(b.id) ? { ...b, verification: "Verified" } : b));
    setSelectedIds([]);
  };

  const handleBulkSuspend = () => {
    setBuyers(buyers.map(b => selectedIds.includes(b.id) ? { ...b, status: "Suspended" } : b));
    setSelectedIds([]);
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
              disabled={!hasSelection}
              className="px-4 py-2 border border-gray-200 rounded-md text-[12px] font-bold text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              Verify
            </button>
            <button
              onClick={handleBulkSuspend}
              disabled={!hasSelection}
              className="px-4 py-2 border border-gray-200 rounded-md text-[12px] font-bold text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              Suspend
            </button>
          </div>

        </div>

        {/* Table Area */}
        <BuyerTable 
          buyers={paginatedBuyers}
          selectedIds={selectedIds}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
          onEdit={openEditModal}
          onDelete={handleDeleteBuyer}
        />

        {/* Pagination Area */}
        <Pagination 
          currentPage={currentPage}
          totalItems={filteredBuyers.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />

      </div>

      <BuyerFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBuyer}
        buyer={editingBuyer}
      />
    </div>
  );
}
