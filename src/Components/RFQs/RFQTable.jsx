import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export default function RFQTable() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: '',
    status: 'All Statuses',
    date: 'Last 30 Days'
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [rfqs] = useState([
    {
      id: "RFQ-1048",
      buyerInitials: "DC",
      buyerName: "David Carter",
      buyerColor: "bg-[#4B6A7F]",
      product: "Steel sheets",
      quantity: "500 units",
      deadline: "May 24",
      status: "New",
      statusColor: "bg-[#E5F0FF] text-[#0066FF] border-[#B3D4FF]",
      dotColor: "bg-[#0066FF]"
    },
    {
      id: "RFQ-1047",
      buyerInitials: "NB",
      buyerName: "Nova Build LLC",
      buyerColor: "bg-[#7C8FA6]",
      product: "Metal pipes",
      quantity: "1,200 units",
      deadline: "May 28",
      status: "Responded",
      statusColor: "bg-[#0052CC] text-white border-[#0052CC]",
      dotColor: "bg-white"
    },
    {
      id: "RFQ-1046",
      buyerInitials: "AI",
      buyerName: "Apex Industrial",
      buyerColor: "bg-[#0F172A]",
      product: "Raw materials",
      quantity: "3 tons",
      deadline: "June 02",
      status: "Pending",
      statusColor: "bg-[#E2E8F0] text-[#475569] border-[#CBD5E1]",
      dotColor: "bg-[#94A3B8]"
    },
    {
      id: "RFQ-1045",
      buyerInitials: "AI",
      buyerName: "Apex Industrial",
      buyerColor: "bg-[#0F172A]",
      product: "Raw materials",
      quantity: "3 tons",
      deadline: "June 02",
      status: "Pending",
      statusColor: "bg-[#E2E8F0] text-[#475569] border-[#CBD5E1]",
      dotColor: "bg-[#94A3B8]"
    },
    {
      id: "RFQ-1044",
      buyerInitials: "AI",
      buyerName: "Apex Industrial",
      buyerColor: "bg-[#0F172A]",
      product: "Raw materials",
      quantity: "3 tons",
      deadline: "June 02",
      status: "Pending",
      statusColor: "bg-[#E2E8F0] text-[#475569] border-[#CBD5E1]",
      dotColor: "bg-[#94A3B8]"
    }
  ]);

  const filteredRfqs = useMemo(() => {
    return rfqs.filter(r => {
      const matchesSearch = r.id.toLowerCase().includes(filters.search.toLowerCase()) || 
                            r.buyerName.toLowerCase().includes(filters.search.toLowerCase()) ||
                            r.product.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === 'All Statuses' || r.status === filters.status;
      
      return matchesSearch && matchesStatus;
    });
  }, [rfqs, filters.search, filters.status]);

  const totalFiltered = filteredRfqs.length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRfqs = filteredRfqs.slice(startIndex, startIndex + itemsPerPage);

  const startCount = totalFiltered === 0 ? 0 : startIndex + 1;
  const endCount = Math.min(startIndex + itemsPerPage, totalFiltered);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-80">
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-md text-[13px] focus:outline-none focus:border-gray-300 shadow-sm placeholder:text-gray-400" 
            placeholder="Filter by ID, Buyer, or Product..."
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative border border-gray-200 rounded-md px-3 py-2 bg-white flex items-center min-w-[140px] shadow-sm">
            <select 
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="appearance-none bg-transparent w-full outline-none text-[13px] font-bold text-[#0F172A] cursor-pointer pr-6"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="New">New</option>
              <option value="Responded">Responded</option>
              <option value="Pending">Pending</option>
            </select>
            <ChevronDown size={14} className="text-gray-500 absolute right-3 pointer-events-none" />
          </div>
          
          <div className="relative border border-gray-200 rounded-md px-3 py-2 bg-white flex items-center min-w-[140px] shadow-sm">
            <select 
              value={filters.date}
              onChange={(e) => handleFilterChange('date', e.target.value)}
              className="appearance-none bg-transparent w-full outline-none text-[13px] font-bold text-[#0F172A] cursor-pointer pr-6"
            >
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="This Year">This Year</option>
            </select>
            <ChevronDown size={14} className="text-gray-500 absolute right-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8F9FB] border-b border-gray-100">
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wider">RFQ ID</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wider">BUYER</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wider">PRODUCT</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wider">QUANTITY</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wider">DEADLINE</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wider">STATUS</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wider text-right">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRfqs.length > 0 ? paginatedRfqs.map((rfq, idx) => (
              <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <span className="text-[13px] font-bold text-[#0F172A]">{rfq.id}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded flex items-center justify-center text-[10px] font-bold text-white ${rfq.buyerColor}`}>
                      {rfq.buyerInitials}
                    </div>
                    <span className="text-[13px] text-gray-600 font-medium">{rfq.buyerName}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[13px] text-gray-600">{rfq.product}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[13px] text-gray-600">{rfq.quantity}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[13px] text-gray-600">{rfq.deadline}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${rfq.statusColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${rfq.dotColor}`}></span>
                    {rfq.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {rfq.status === 'Pending' ? (
                    <button 
                      onClick={() => navigate(`/rfqs/${rfq.id}/reply`)}
                      className="px-4 py-1.5 bg-[#D4AF37] hover:bg-[#C29F31] transition rounded text-[12px] font-bold text-[#0F172A]"
                    >
                      Reply
                    </button>
                  ) : (
                    <button 
                      onClick={() => navigate(`/rfqs/${rfq.id}`)}
                      className="px-4 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 transition rounded text-[12px] font-bold text-gray-700"
                    >
                      View
                    </button>
                  )}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  No RFQs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#F8F9FB]">
        <div className="text-[12px] text-gray-500">
          Showing <span className="font-bold text-[#0F172A]">{startCount}</span> to <span className="font-bold text-[#0F172A]">{endCount}</span> of <span className="font-bold text-[#0F172A]">{totalFiltered}</span> results
        </div>
        
        <div className="flex gap-1 text-[13px] font-medium">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-gray-500 hover:text-gray-800 disabled:opacity-50 disabled:hover:text-gray-500 bg-white border border-gray-200 rounded-l"
          >
            Prev
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3.5 py-1.5 border-y border-r ${
                currentPage === i + 1 
                  ? 'bg-[#D4AF37] text-[#0F172A] border-[#D4AF37] font-bold' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
          
          {totalPages > 3 && (
            <button className="px-3.5 py-1.5 bg-white border-y border-r border-gray-200 text-gray-600">
              <MoreHorizontal size={16} />
            </button>
          )}

          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1.5 text-gray-700 bg-white border-y border-r border-gray-200 hover:bg-gray-50 disabled:opacity-50 rounded-r"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
