import React, { useState, useMemo } from "react";
import { Download, Plus } from "lucide-react";
import { toast } from "react-toastify";
import { useGetRfqsQuery, useCreateRfqMutation } from "../../../redux/features/rfqs/rfqsApi";
import RfqMetrics from "../../../Components/admin-components/rfqs/RfqMetrics";
import RfqFilters from "../../../Components/admin-components/rfqs/RfqFilters";
import RfqTable from "../../../Components/admin-components/rfqs/RfqTable";
import ManualEntryModal from "../../../Components/admin-components/rfqs/ManualEntryModal";

export default function RfqManagement() {
  const { data: rfqsResponse, isLoading } = useGetRfqsQuery();
  const [createRfq] = useCreateRfqMutation();
  
  const rfqs = rfqsResponse?.data || [];

  const rfqsList = useMemo(() => {
    return rfqs.map(rfq => ({
      id: rfq._id,
      displayId: `#RFQ-${rfq._id.substring(0, 8).toUpperCase()}`,
      buyer: { 
        name: rfq.buyerName || (rfq.buyerUser ? rfq.buyerUser.name : "Unknown Buyer"), 
        logo: (rfq.buyerName || rfq.buyerUser?.name || "UK").substring(0, 2).toUpperCase(), 
        color: "bg-blue-100 text-blue-700" 
      },
      supplier: rfq.supplier ? rfq.supplier.companyName : "Unknown Supplier",
      category: "GENERAL",
      status: rfq.status.charAt(0).toUpperCase() + rfq.status.slice(1), // e.g., 'pending' -> 'Pending'
      statusColor: rfq.status === "closed" ? "bg-gray-400" : (rfq.status === 'responded' ? "bg-green-500" : "bg-[#D4AF37]"),
      created: new Date(rfq.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      dispute: rfq.status === 'disputed' ? "Yes" : "No"
    }));
  }, [rfqs]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedRfq, setSelectedRfq] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [disputeToggle, setDisputeToggle] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setCategoryFilter("All");
    setDisputeToggle(false);
    setCurrentPage(1);
  };

  const handleCreateEntry = async (entryData) => {
    try {
      await createRfq({
        supplierId: entryData.supplierId, 
        buyerName: entryData.buyerName,
        buyerEmail: entryData.buyerEmail,
        subject: entryData.subject,
        details: entryData.details,
        quantity: entryData.quantity || 1
      }).unwrap();
      setIsModalOpen(false);
      toast.success("Manual RFQ entry created successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.message || "Failed to create manual entry");
    }
  };

  const handleOpenCreate = () => {
    setModalMode("create");
    setSelectedRfq(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (rfq) => {
    setModalMode("edit");
    setSelectedRfq(rfq);
    setIsModalOpen(true);
  };

  const handleOpenView = (rfq) => {
    setModalMode("view");
    setSelectedRfq(rfq);
    setIsModalOpen(true);
  };

  const filteredRfqs = useMemo(() => {
    return rfqsList.filter(rfq => {
      const matchesSearch = 
        rfq.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        rfq.buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rfq.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "All" || rfq.status === statusFilter;
      const matchesCategory = categoryFilter === "All" || rfq.category.toLowerCase() === categoryFilter.toLowerCase();
      const matchesDispute = !disputeToggle || rfq.dispute === "Yes";

      return matchesSearch && matchesStatus && matchesCategory && matchesDispute;
    });
  }, [rfqsList, searchTerm, statusFilter, categoryFilter, disputeToggle]);

  const totalPages = Math.ceil(filteredRfqs.length / itemsPerPage);
  const paginatedRfqs = filteredRfqs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#0F172A] font-sans pt-24 pb-32">
      
      {/* Header */}
      <div className="px-6 lg:px-8 max-w-[1400px] mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight mb-1">
              RFQ Monitoring
            </h1>
            <p className="text-[14px] text-gray-500">
              Real-time procurement oversight & dispute management
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <Download size={14} />
              Export Matrix
            </button>
            <button 
              onClick={handleOpenCreate}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#D4AF37] border border-[#D4AF37] rounded-md text-[13px] font-bold text-[#0F172A] hover:bg-[#C2982B] transition-colors shadow-sm"
            >
              <Plus size={16} />
              Manual Entry
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-6 lg:px-8 max-w-[1400px] mx-auto">
        <RfqMetrics />
        <RfqFilters 
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
          disputeToggle={disputeToggle} setDisputeToggle={setDisputeToggle}
          onClear={handleClearFilters}
        />
        <RfqTable 
          rfqs={paginatedRfqs}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalItems={filteredRfqs.length}
          itemsPerPage={itemsPerPage}
          onView={handleOpenView}
          onEdit={handleOpenEdit}
        />
      </div>

      <ManualEntryModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRfq(null);
        }}
        onSubmit={handleCreateEntry}
        mode={modalMode}
        initialData={selectedRfq}
      />

    </div>
  );
}
