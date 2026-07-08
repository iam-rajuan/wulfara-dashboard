import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  ChevronRight, 
  MessageCircle, 
  Factory, 
  MapPin, 
  Clock, 
  FileText, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Ban, 
  PauseCircle,
  Check
} from "lucide-react";

export default function SupplierVerificationDetail() {
  const { id } = useParams(); // Could use this to fetch data
  const [activeTab, setActiveTab] = useState("Company Documents");
  
  // Checklist State
  const [checklist, setChecklist] = useState({
    identity: false,
    business: false,
    tax: false
  });

  // Document Status State
  const [docStatus, setDocStatus] = useState({
    license: "Pending Review",
    tax: "Pending Review"
  });

  // Verification Status State
  const [verificationStatus, setVerificationStatus] = useState("Pending Verification");

  const toggleChecklist = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDocAction = (doc, action) => {
    setDocStatus(prev => ({
      ...prev,
      [doc]: action
    }));
  };

  return (
    <div className="min-h-screen p-6 mt-16 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans pt-24">
      {/* Breadcrumbs */}
      <div className="flex items-center text-[13px] font-medium text-gray-500 mb-6 gap-2">
        <Link to="/" className="hover:text-gray-700">Admin</Link>
        <ChevronRight size={14} />
        <Link to="/supplier-management" className="hover:text-gray-700">Suppliers</Link>
        <ChevronRight size={14} />
        <span>Verification</span>
        <ChevronRight size={14} />
        <span className="text-[#0F172A] font-bold">Steel Company B</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Verification Detail
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-[#0F172A] hover:bg-gray-50 transition-colors shadow-sm">
          <MessageCircle size={16} />
          Contact Supplier
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column (Main Content) */}
        <div className="flex-1 space-y-8">
          
          {/* Supplier Info Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative">
            <div className="absolute top-6 right-6">
              {verificationStatus === "Pending Verification" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A] text-[11px] font-bold rounded-full">
                  <Clock size={12} />
                  Pending Verification
                </span>
              )}
              {verificationStatus === "Approved" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0] text-[11px] font-bold rounded-full">
                  <CheckCircle size={12} />
                  Approved Supplier
                </span>
              )}
              {verificationStatus === "Rejected" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA] text-[11px] font-bold rounded-full">
                  <Ban size={12} />
                  Application Rejected
                </span>
              )}
              {verificationStatus === "Suspended" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F3E8FF] text-[#7E22CE] border border-[#E9D5FF] text-[11px] font-bold rounded-full">
                  <PauseCircle size={12} />
                  Suspended
                </span>
              )}
            </div>

            <div className="flex items-start gap-5">
              <div className="w-[72px] h-[72px] rounded-xl bg-[#F8F9FB] border border-gray-200 flex items-center justify-center flex-shrink-0">
                <Factory size={28} className="text-[#475569]" />
              </div>
              <div className="pt-1">
                <h2 className="text-[22px] font-extrabold text-[#0F172A] mb-1">Steel Company B</h2>
                <div className="flex items-center text-gray-500 text-[13px] font-medium gap-1">
                  <MapPin size={14} />
                  New Jersey, USA
                </div>
              </div>
            </div>

            <hr className="my-6 border-gray-100" />

            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Owner / Primary Contact</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#DBEAFE] text-[#1E40AF] flex items-center justify-center text-[10px] font-bold">
                    MG
                  </div>
                  <span className="text-[14px] font-bold text-[#0F172A]">Michael Girmaye</span>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Submission Date</p>
                <p className="text-[14px] font-semibold text-[#0F172A]">Oct 24, 2023</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 flex items-center gap-6 overflow-x-auto no-scrollbar">
            {["Account Details", "Company Documents", "Contact Information", "Payment Status", "Listing"].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-[14px] font-bold whitespace-nowrap transition-colors relative ${
                  activeTab === tab ? "text-[#2563EB]" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#2563EB] rounded-t-md"></div>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "Company Documents" ? (
            <div className="space-y-4">
              <h3 className="text-[18px] font-bold text-[#0F172A] mb-4">Required Documentation</h3>

              {/* Document Card 1 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#F8F9FB] border border-gray-200 flex items-center justify-center text-gray-400 flex-shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#0F172A]">Business License.pdf</h4>
                    <p className="text-[12px] font-medium text-gray-400">Uploaded 2 days ago • 2.4 MB</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:ml-auto">
                  <span className={`px-2.5 py-1 text-[11px] font-bold rounded-md whitespace-nowrap ${
                    docStatus.license === "Approved" ? "bg-[#DCFCE7] text-[#166534]" :
                    docStatus.license === "Rejected" ? "bg-[#FEE2E2] text-[#991B1B]" :
                    "bg-[#FEF3C7] text-[#D97706]"
                  }`}>
                    {docStatus.license}
                  </span>
                  
                  <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => handleDocAction("license", "Approved")}
                      className={`p-1 ${docStatus.license === "Approved" ? "text-green-600" : "text-gray-400 hover:text-green-600"}`}
                    >
                      <CheckCircle size={18} />
                    </button>
                    <button 
                      onClick={() => handleDocAction("license", "Rejected")}
                      className={`p-1 ${docStatus.license === "Rejected" ? "text-red-600" : "text-gray-400 hover:text-red-600"}`}
                    >
                      <XCircle size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Document Card 2 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#F8F9FB] border border-gray-200 flex items-center justify-center text-gray-400 flex-shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#0F172A]">Tax Certificate.pdf</h4>
                    <p className="text-[12px] font-medium text-gray-400">Uploaded 2 days ago • 1.1 MB</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:ml-auto">
                  <span className={`px-2.5 py-1 text-[11px] font-bold rounded-md whitespace-nowrap ${
                    docStatus.tax === "Approved" ? "bg-[#DCFCE7] text-[#166534]" :
                    docStatus.tax === "Rejected" ? "bg-[#FEE2E2] text-[#991B1B]" :
                    "bg-[#FEF3C7] text-[#D97706]"
                  }`}>
                    {docStatus.tax}
                  </span>
                  
                  <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => handleDocAction("tax", "Approved")}
                      className={`p-1 ${docStatus.tax === "Approved" ? "text-green-600" : "text-gray-400 hover:text-green-600"}`}
                    >
                      <CheckCircle size={18} />
                    </button>
                    <button 
                      onClick={() => handleDocAction("tax", "Rejected")}
                      className={`p-1 ${docStatus.tax === "Rejected" ? "text-red-600" : "text-gray-400 hover:text-red-600"}`}
                    >
                      <XCircle size={18} />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex items-center justify-center text-gray-400">
              <p>Content for {activeTab} is not available in this mockup.</p>
            </div>
          )}

        </div>

        {/* Right Column (Sidebar) */}
        <div className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0 space-y-6">
          
          {/* Verification Checklist */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-[13px] font-bold text-[#0F172A] tracking-wider mb-6">VERIFICATION CHECKLIST</h3>
            
            <div className="space-y-5">
              
              <div 
                className="flex items-start gap-3 cursor-pointer group"
                onClick={() => toggleChecklist("identity")}
              >
                <div className={`mt-0.5 w-[18px] h-[18px] rounded flex items-center justify-center border transition-colors flex-shrink-0 ${checklist.identity ? "bg-[#2563EB] border-[#2563EB]" : "border-gray-300 bg-white group-hover:border-gray-400"}`}>
                  {checklist.identity && <Check size={12} className="text-white" />}
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#0F172A] leading-none mb-1.5">Identity Verified</p>
                  <p className="text-[12px] font-medium text-gray-400 leading-snug">Match owner ID<br/>with records</p>
                </div>
              </div>
              
              <div 
                className="flex items-start gap-3 cursor-pointer group"
                onClick={() => toggleChecklist("business")}
              >
                <div className={`mt-0.5 w-[18px] h-[18px] rounded flex items-center justify-center border transition-colors flex-shrink-0 ${checklist.business ? "bg-[#2563EB] border-[#2563EB]" : "border-gray-300 bg-white group-hover:border-gray-400"}`}>
                  {checklist.business && <Check size={12} className="text-white" />}
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#0F172A] leading-none mb-1.5">Business Registration Valid</p>
                  <p className="text-[12px] font-medium text-gray-400 leading-snug">Check state registry</p>
                </div>
              </div>

              <div 
                className="flex items-start gap-3 cursor-pointer group"
                onClick={() => toggleChecklist("tax")}
              >
                <div className={`mt-0.5 w-[18px] h-[18px] rounded flex items-center justify-center border transition-colors flex-shrink-0 ${checklist.tax ? "bg-[#2563EB] border-[#2563EB]" : "border-gray-300 bg-white group-hover:border-gray-400"}`}>
                  {checklist.tax && <Check size={12} className="text-white" />}
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#0F172A] leading-none mb-1.5">Tax Status Confirmed</p>
                  <p className="text-[12px] font-medium text-gray-400 leading-snug">Review uploaded<br/>certificates</p>
                </div>
              </div>

            </div>
          </div>

          {/* Admin Decision */}
          <div className="bg-white rounded-xl shadow-sm border-2 border-[#2563EB]/20 p-6">
            <h3 className="text-[13px] font-bold text-[#0F172A] tracking-wider mb-4">ADMIN DECISION</h3>
            
            <p className="text-[13px] font-medium text-gray-500 mb-6 leading-relaxed">
              Finalize verification status for Steel Company B.<br/>
              This action will notify the user.
            </p>

            <div className="space-y-3">
              <button 
                onClick={() => setVerificationStatus("Approved")}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#D4AF37] rounded-md text-[13px] font-bold text-[#0F172A] hover:bg-[#C2982B] transition-colors shadow-sm"
              >
                <CheckCircle size={16} className="fill-[#0F172A] text-[#D4AF37]" strokeWidth={1} />
                Approve Supplier
              </button>
              
              <button 
                onClick={() => setVerificationStatus("Rejected")}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-[#EF4444] rounded-md text-[13px] font-bold text-[#EF4444] hover:bg-red-50 transition-colors shadow-sm"
              >
                <Ban size={16} />
                Reject Application
              </button>
              
              <button 
                onClick={() => setVerificationStatus("Suspended")}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-[#475569] hover:bg-gray-50 transition-colors shadow-sm"
              >
                <PauseCircle size={16} />
                Suspend / Request Info
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
