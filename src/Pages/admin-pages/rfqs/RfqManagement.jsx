import React, { useState, useMemo } from "react";
import { Download, Plus } from "lucide-react";
import RfqMetrics from "../../../Components/admin-components/rfqs/RfqMetrics";
import RfqFilters from "../../../Components/admin-components/rfqs/RfqFilters";
import RfqTable from "../../../Components/admin-components/rfqs/RfqTable";
import ManualEntryModal from "../../../Components/admin-components/rfqs/ManualEntryModal";

const INITIAL_RFQS = [
  { id: "#RFQ-2024-8842", buyer: { name: "Astra Zen Limited", logo: "AZ", color: "bg-gray-200 text-gray-700" }, supplier: "Global Logis-X", category: "HARDWARE", status: "Responded", statusColor: "bg-[#D4AF37]", created: "Oct 12, 2024", dispute: "No" },
  { id: "#RFQ-2024-8843", buyer: { name: "TechCorp Inc", logo: "TC", color: "bg-blue-100 text-blue-700" }, supplier: "Silicon Valley Parts", category: "SOFTWARE", status: "Closed", statusColor: "bg-gray-400", created: "Oct 11, 2024", dispute: "No" },
  { id: "#RFQ-2024-8844", buyer: { name: "Mega Build", logo: "MB", color: "bg-green-100 text-green-700" }, supplier: "BuildMat Pro", category: "LOGISTICS", status: "Responded", statusColor: "bg-[#D4AF37]", created: "Oct 10, 2024", dispute: "Yes" },
  { id: "#RFQ-2024-8845", buyer: { name: "Astra Zen Limited", logo: "AZ", color: "bg-gray-200 text-gray-700" }, supplier: "Tech Systems", category: "HARDWARE", status: "Closed", statusColor: "bg-gray-400", created: "Oct 09, 2024", dispute: "No" },
  { id: "#RFQ-2024-8846", buyer: { name: "Eco Energy", logo: "EE", color: "bg-green-100 text-green-700" }, supplier: "Solar Panels Inc", category: "HARDWARE", status: "Responded", statusColor: "bg-[#D4AF37]", created: "Oct 08, 2024", dispute: "Yes" },
  { id: "#RFQ-2024-8847", buyer: { name: "TechCorp Inc", logo: "TC", color: "bg-blue-100 text-blue-700" }, supplier: "Cloud Services LLC", category: "SOFTWARE", status: "Responded", statusColor: "bg-[#D4AF37]", created: "Oct 07, 2024", dispute: "No" },
  { id: "#RFQ-2024-8848", buyer: { name: "Fast Track", logo: "FT", color: "bg-purple-100 text-purple-700" }, supplier: "Global Logis-X", category: "LOGISTICS", status: "Closed", statusColor: "bg-gray-400", created: "Oct 06, 2024", dispute: "No" },
];

export default function RfqManagement() {
  const [rfqsList, setRfqsList] = useState(INITIAL_RFQS);
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

  const handleCreateEntry = (entryData) => {
    if (modalMode === "edit" && selectedRfq) {
      const updatedList = rfqsList.map(rfq => {
        if (rfq.id === selectedRfq.id) {
          return {
            ...rfq,
            buyer: {
              ...rfq.buyer,
              name: entryData.buyerName || "Unknown Buyer",
              logo: entryData.buyerName ? entryData.buyerName.substring(0, 2).toUpperCase() : "UK"
            },
            supplier: entryData.supplierName || "Unknown Supplier",
            category: entryData.category || "LOGISTICS",
            status: entryData.status || "Responded",
            statusColor: entryData.status === "Closed" ? "bg-gray-400" : "bg-[#D4AF37]",
            dispute: entryData.dispute || "No"
          };
        }
        return rfq;
      });
      setRfqsList(updatedList);
    } else {
      const newId = `#RFQ-2024-${8848 + rfqsList.length + 1}`;
      const newRfq = {
        id: newId,
        buyer: { 
          name: entryData.buyerName || "Unknown Buyer", 
          logo: entryData.buyerName ? entryData.buyerName.substring(0, 2).toUpperCase() : "UK", 
          color: "bg-blue-100 text-blue-700" 
        },
        supplier: entryData.supplierName || "Unknown Supplier",
        category: entryData.category || "LOGISTICS",
        status: entryData.status || "Responded",
        statusColor: entryData.status === "Closed" ? "bg-gray-400" : "bg-[#D4AF37]",
        created: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        dispute: entryData.dispute || "No"
      };
      setRfqsList([newRfq, ...rfqsList]);
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
  }, [searchTerm, statusFilter, categoryFilter, disputeToggle]);

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
