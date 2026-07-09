import React from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, FileText, Check } from "lucide-react";
import DisputeMetrics from "../../../Components/admin-components/rfqs/dispute/DisputeMetrics";
import DisputeProfiles from "../../../Components/admin-components/rfqs/dispute/DisputeProfiles";
import DisputeScope from "../../../Components/admin-components/rfqs/dispute/DisputeScope";
import DisputeTimeline from "../../../Components/admin-components/rfqs/dispute/DisputeTimeline";
import DisputeAdminPanel from "../../../Components/admin-components/rfqs/dispute/DisputeAdminPanel";
import DisputeQuickActions from "../../../Components/admin-components/rfqs/dispute/DisputeQuickActions";

export default function RfqDetails() {
  const { id } = useParams();
  
  // Use the ID from the URL if available, otherwise fallback
  const displayId = id ? id.replace('#', '') : "RFQ-10476";

  const [disputeData, setDisputeData] = React.useState({
    id: displayId,
    status: "Disputed",
    createdDate: "Oct 12, 2023",
    lastUpdate: "2 hours ago",
    buyer: {
      name: "Robert Kim",
      role: "Strategic Procurement Manager",
      company: "Apex Manufacturing",
      rating: "4.8 / 5.0",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    supplier: {
      name: "Rapid Logistics USA",
      role: "Fleet Operations Lead",
      contact: "Sarah Jenkins",
      rating: "4.2 / 5.0",
      initials: "RL"
    },
    scope: {
      quote: "$42,500.00",
      cargo: "3x Industrial CNC Mills, 4500kg total. Oversized load requirements. Temperature sensitive components included.",
      incident: "Delayed arrival (48h) + Minor scratches reported on Unit B enclosure. Buyer claims packaging violation.",
      route: "Detroit, MI → Houston, TX",
      images: [
        "https://images.unsplash.com/photo-1587302484606-44439eb4c2f8?auto=format&fit=crop&q=80&w=100&h=100",
        "https://images.unsplash.com/photo-1596700057218-0902c3b88b2f?auto=format&fit=crop&q=80&w=100&h=100"
      ]
    },
    resolution: {
      status: "In Progress",
      priority: "Medium",
      notes: ""
    },
    timeline: [
      {
        id: 1,
        type: "buyer",
        author: "Robert Kim",
        time: "Oct 14, 09:12 AM",
        content: "Dispute formally filed. The shipment arrived 48 hours late and Unit B has visible surface damage. This is not the service level agreed upon in the $42.5k contract."
      },
      {
        id: 2,
        type: "system",
        author: "System",
        time: "",
        content: "RFQ Status updated to \"Disputed\". Admin notified. Dispute ticket #D-9003 created."
      },
      {
        id: 3,
        type: "supplier",
        author: "Rapid Logistics USA (Sarah)",
        time: "Oct 14, 11:45 AM",
        content: "We acknowledge the delay due to the weather advisory in the Midwest. Regarding the scratch, our pre-load photos (attached in RFQ vault) show the unit was pristine. We believe this occurred during the client's own offloading process."
      },
      {
        id: 4,
        type: "admin",
        author: "System Admin",
        time: "Today, 08:30 AM",
        content: "Reviewing cargo insurance logs and Midwest meteorological data. Both parties please standby for final resolution proposal by EOD."
      }
    ]
  });

  const handleResolutionChange = (field, value) => {
    setDisputeData(prev => ({
      ...prev,
      resolution: {
        ...prev.resolution,
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#0F172A] font-sans pt-24 pb-32">
      
      {/* Breadcrumbs */}
      <div className="px-6 lg:px-8 max-w-[1200px] mx-auto mb-4 flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
        <Link to="/rfqs" className="hover:text-blue-600 transition-colors">RFQs</Link>
        <ChevronRight size={12} />
        <span>{displayId}</span>
        <ChevronRight size={12} />
        <span className="text-[#D4AF37]">Dispute Detail</span>
      </div>

      {/* Header */}
      <div className="px-6 lg:px-8 max-w-[1200px] mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight mb-1">
              Dispute Investigation: #{displayId}
            </h1>
            <p className="text-[14px] text-gray-500 font-medium">
              Heavy Machinery Logistics - Q4 Operations
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <FileText size={14} />
              Generate Report
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#D4AF37] border border-[#D4AF37] rounded-md text-[13px] font-extrabold text-[#0F172A] hover:bg-[#C2982B] transition-colors shadow-sm">
              <Check size={16} />
              Mark Resolved
            </button>
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
