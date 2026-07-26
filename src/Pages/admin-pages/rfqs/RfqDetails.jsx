import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetRfqQuery, useGetRfqMessagesQuery, useUpdateRfqStatusMutation } from "../../../redux/features/rfqs/rfqsApi";
import { ChevronRight, FileText, Check } from "lucide-react";
import DisputeMetrics from "../../../Components/admin-components/rfqs/dispute/DisputeMetrics";
import DisputeProfiles from "../../../Components/admin-components/rfqs/dispute/DisputeProfiles";
import DisputeScope from "../../../Components/admin-components/rfqs/dispute/DisputeScope";
import DisputeTimeline from "../../../Components/admin-components/rfqs/dispute/DisputeTimeline";
import DisputeAdminPanel from "../../../Components/admin-components/rfqs/dispute/DisputeAdminPanel";
import DisputeQuickActions from "../../../Components/admin-components/rfqs/dispute/DisputeQuickActions";

export default function RfqDetails() {
  const { id } = useParams();
  
  const { data: rfqResponse, isLoading: rfqLoading } = useGetRfqQuery(id, { skip: !id });
  const { data: messagesResponse, isLoading: messagesLoading } = useGetRfqMessagesQuery(id, { skip: !id });
  const [updateRfqStatus] = useUpdateRfqStatusMutation();
  
  const rfq = rfqResponse?.data;
  const messages = messagesResponse?.data || [];
  const isLoading = rfqLoading || messagesLoading;

  const [resolution, setResolution] = useState({
    status: "In Progress",
    priority: "Medium",
    notes: ""
  });

  const handleResolutionChange = (field, value) => {
    setResolution(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      await updateRfqStatus({ id, status: newStatus }).unwrap();
    } catch (err) {
      console.error(err);
      alert("Error updating RFQ status");
    }
  };

  if (isLoading || !rfq) {
    return <div className="min-h-screen pt-32 pb-32 flex justify-center text-gray-500">Loading RFQ details...</div>;
  }

  const displayId = `RFQ-${rfq._id.substring(0, 8).toUpperCase()}`;

  // Map backend RFQ data to the existing Dispute UI structure
  const disputeData = {
    id: displayId,
    status: rfq.status.charAt(0).toUpperCase() + rfq.status.slice(1),
    createdDate: new Date(rfq.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    lastUpdate: new Date(rfq.updatedAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    buyer: {
      name: rfq.buyerName || (rfq.buyerUser ? rfq.buyerUser.name : "Unknown"),
      role: rfq.buyerUser ? rfq.buyerUser.role : "Guest Buyer",
      company: "Company N/A",
      rating: "N/A",
      avatar: ""
    },
    supplier: {
      name: rfq.supplier?.companyName || "Unknown",
      role: "Supplier",
      contact: rfq.supplier?.contactEmail || "",
      rating: "N/A",
      initials: (rfq.supplier?.companyName || "UK").substring(0, 2).toUpperCase()
    },
    scope: {
      quote: "TBD",
      cargo: `Quantity: ${rfq.quantity}`,
      incident: rfq.details,
      route: "N/A",
      images: rfq.attachments || []
    },
    resolution: resolution,
    timeline: messages.map(msg => ({
      id: msg._id,
      type: msg.sender?.role === 'admin' ? 'admin' : (msg.sender?.role === 'supplier' ? 'supplier' : 'buyer'),
      author: msg.sender?.name || "Unknown",
      time: new Date(msg.createdAt).toLocaleString(),
      content: msg.text
    }))
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#0F172A] font-sans pt-24 pb-32">
      
      {/* Breadcrumbs */}
      <div className="px-6 lg:px-8 max-w-[1200px] mx-auto mb-4 flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
        <Link to="/rfqs" className="hover:text-blue-600 transition-colors">RFQs</Link>
        <ChevronRight size={12} />
        <span>{displayId}</span>
        <ChevronRight size={12} />
        <span className="text-[#D4AF37]">Details</span>
      </div>

      {/* Header */}
      <div className="px-6 lg:px-8 max-w-[1200px] mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight mb-1">
              RFQ Details: {displayId}
            </h1>
            <p className="text-[14px] text-gray-500 font-medium">
              {rfq.subject}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {rfq.status !== 'closed' && (
               <button 
                 onClick={() => handleUpdateStatus('closed')}
                 className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#D4AF37] border border-[#D4AF37] rounded-md text-[13px] font-extrabold text-[#0F172A] hover:bg-[#C2982B] transition-colors shadow-sm">
                 <Check size={16} />
                 Mark Closed
               </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="px-6 lg:px-8 max-w-[1200px] mx-auto">
        <DisputeMetrics data={disputeData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (2/3) */}
          <div className="lg:col-span-2">
            <DisputeProfiles buyer={disputeData.buyer} supplier={disputeData.supplier} />
            <DisputeScope scope={disputeData.scope} />
            <DisputeTimeline events={disputeData.timeline} />
          </div>

          {/* Right Column (1/3) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <DisputeAdminPanel 
                resolution={disputeData.resolution} 
                onChange={handleResolutionChange} 
              />
              <DisputeQuickActions />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
