import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Printer, X, FileText, Image as ImageIcon, File, Paperclip, Send, MapPin, CheckCircle, Clock } from 'lucide-react';

export default function RFQDetails() {
  const { id } = useParams();
  const [message, setMessage] = useState('');

  // Dynamically generate mock data based on the ID to simulate a real database fetch
  const rfq = useMemo(() => {
    const currentId = id || "RFQ-1027";
    
    // Simulate dynamic buyer data depending on the ID
    const isNova = currentId === 'RFQ-1047';
    const isApex = currentId === 'RFQ-1046' || currentId === 'RFQ-1045' || currentId === 'RFQ-1044';
    
    return {
      id: currentId,
      status: currentId === 'RFQ-1048' ? "NEW" : (isNova ? "RESPONDED" : "PENDING"),
      category: isNova ? "Metal pipes" : (isApex ? "Raw materials" : "Steel sheets"),
      quantity: isNova ? "1,200 units" : (isApex ? "3 tons" : "500 units"),
      deadline: isNova ? "May 28, 2026" : (isApex ? "June 02, 2026" : "May 24, 2026"),
      location: "New York Port, USA",
      notes: `Looking for industrial-grade ${isNova ? 'metal pipes' : 'materials'} for warehouse construction. Need detailed specs on tensile strength and corrosion resistance coatings. Prefer suppliers with ISO 9001 certification.`,
      attachments: [
        { name: "specification.pdf", size: "2.4 MB", type: "pdf" },
        { name: "layout-diagram.png", size: "4.1 MB", type: "image" },
        { name: "requirements.docx", size: "1.1 MB", type: "doc" }
      ],
      buyer: {
        name: isNova ? "Nova Build Team" : (isApex ? "Apex Industrial" : "David Carter"),
        title: "Procurement Director",
        company: isNova ? "Nova Build LLC" : (isApex ? "Apex Industrial Corp" : "Carter Industrial Group"),
        location: "New York, USA",
        isVerified: true
      },
      activity: [
        { date: "Today, 09:42 AM", title: "RFQ Created", desc: "Request submitted by buyer" }
      ]
    };
  }, [id]);

  const handleReplySubmit = () => {
    if (message.trim()) {
      console.log("Sending reply for", rfq.id, ":", message);
      alert(`Reply sent for ${rfq.id}`);
      setMessage('');
    }
  };

  const renderAttachmentIcon = (type) => {
    switch (type) {
      case 'pdf': return <div className="w-8 h-8 rounded bg-red-50 text-red-500 flex items-center justify-center shrink-0"><FileText size={16} /></div>;
      case 'image': return <div className="w-8 h-8 rounded bg-blue-50 text-blue-500 flex items-center justify-center shrink-0"><ImageIcon size={16} /></div>;
      case 'doc': return <div className="w-8 h-8 rounded bg-gray-100 text-gray-500 flex items-center justify-center shrink-0"><File size={16} /></div>;
      default: return <div className="w-8 h-8 rounded bg-gray-100 text-gray-500 flex items-center justify-center shrink-0"><File size={16} /></div>;
    }
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans mt-16">
      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500 mb-4">
          <Link to="/rfqs" className="hover:text-gray-900 transition">RFQs</Link>
          <ChevronRight size={14} />
          <span className="text-[#0F172A]">{rfq.id}</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-[32px] font-bold tracking-tight text-[#0F172A]">{rfq.id}</h1>
            <span className={`px-3 py-1 text-white rounded-full text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 ${
              rfq.status === 'NEW' ? 'bg-[#0066FF]' : (rfq.status === 'RESPONDED' ? 'bg-[#0052CC]' : 'bg-gray-500')
            }`}>
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              {rfq.status}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-[13px] font-bold text-[#0F172A] shadow-sm hover:bg-gray-50 transition flex items-center gap-2">
              <Printer size={16} strokeWidth={2.5} />
              Print
            </button>
            <button className="px-4 py-2 bg-[#FEE2E2] hover:bg-[#FECACA] text-[#DC2626] transition rounded-md text-[13px] font-bold shadow-sm flex items-center gap-2">
              <X size={16} strokeWidth={2.5} />
              Decline
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Request Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="flex items-center gap-2 text-[18px] font-bold text-[#0F172A] mb-6">
              <FileText size={20} className="text-gray-700" strokeWidth={2} />
              Request Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-[11px] font-bold text-gray-500 tracking-wider mb-1">PRODUCT CATEGORY</p>
                <p className="text-[14px] text-gray-800 font-medium">{rfq.category}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500 tracking-wider mb-1">QUANTITY REQUESTED</p>
                <p className="text-[14px] text-gray-800 font-medium">{rfq.quantity}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500 tracking-wider mb-1">TARGET DEADLINE</p>
                <p className="text-[14px] text-gray-800 font-medium flex items-center gap-1.5">
                  <span className="text-red-500"><Clock size={14} /></span>
                  {rfq.deadline}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500 tracking-wider mb-1">DELIVERY LOCATION</p>
                <p className="text-[14px] text-gray-800 font-medium">{rfq.location}</p>
              </div>
            </div>
            
            <div>
              <p className="text-[11px] font-bold text-gray-500 tracking-wider mb-2">BUYER NOTES</p>
              <div className="bg-[#F8F9FB] border border-gray-100 rounded-lg p-5">
                <p className="text-[13px] text-gray-700 leading-relaxed font-medium">"{rfq.notes}"</p>
              </div>
            </div>
          </div>

          {/* Attachments */}
          {rfq.attachments && rfq.attachments.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="flex items-center gap-2 text-[18px] font-bold text-[#0F172A] mb-6">
                <Paperclip size={20} className="text-gray-700" strokeWidth={2} />
                Attachments
              </h2>
              
              <div className="space-y-3">
                {rfq.attachments.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                    {renderAttachmentIcon(file.type)}
                    <div>
                      <h4 className="text-[13px] font-bold text-[#0F172A] mb-0.5">{file.name}</h4>
                      <p className="text-[11px] font-bold text-gray-500">{file.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reply to Request */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-[20px] font-bold text-[#0F172A] mb-4">Reply to Request</h2>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-[#F8F9FB]">
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-40 p-4 bg-transparent resize-none outline-none text-[13px] font-medium placeholder:text-gray-400"
                placeholder="Type your response or quote details here..."
              ></textarea>
              <div className="bg-white border-t border-gray-200 p-3 flex justify-between items-center">
                <button className="flex items-center gap-2 text-[13px] font-bold text-gray-600 hover:text-gray-900 transition px-2">
                  <Paperclip size={16} />
                  Attach Quote
                </button>
                <button 
                  onClick={handleReplySubmit}
                  disabled={!message.trim()}
                  className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#C29F31] disabled:bg-[#e4ce84] transition rounded-md text-[13px] font-bold text-[#0F172A] shadow-sm flex items-center gap-2"
                >
                  <Send size={16} strokeWidth={2.5} />
                  Send Proposal
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Sidebar Content) */}
        <div className="space-y-6">
          
          {/* Buyer Profile */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="flex items-center gap-2 text-[18px] font-bold text-[#0F172A] mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Buyer Profile
            </h2>
            
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="w-14 h-14 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop" alt="Buyer" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-[#0F172A] mb-0.5">{rfq.buyer.name}</h3>
                <p className="text-[12px] font-bold text-gray-500">{rfq.buyer.title}</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-gray-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 tracking-wider mb-0.5">COMPANY</p>
                  <p className="text-[13px] font-medium text-[#0F172A]">{rfq.buyer.company}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-gray-400">
                  <MapPin size={16} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 tracking-wider mb-0.5">LOCATION</p>
                  <p className="text-[13px] font-medium text-[#0F172A]">{rfq.buyer.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-gray-400">
                  <CheckCircle size={16} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 tracking-wider mb-0.5">STATUS</p>
                  <p className="text-[13px] font-bold text-[#0066FF]">{rfq.buyer.isVerified ? "Verified Buyer" : "Unverified Buyer"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="flex items-center gap-2 text-[18px] font-bold text-[#0F172A] mb-6 pb-6 border-b border-gray-100">
              <Clock size={20} className="text-gray-700" strokeWidth={2} />
              Activity
            </h2>
            
            <div className="relative border-l-2 border-gray-100 ml-2 pl-4 py-1">
              <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#0066FF] ring-4 ring-white"></div>
              {rfq.activity.map((act, idx) => (
                <div key={idx}>
                  <p className="text-[11px] font-bold text-gray-500 mb-1">{act.date}</p>
                  <h4 className="text-[13px] font-bold text-[#0F172A] mb-1">{act.title}</h4>
                  <p className="text-[12px] text-gray-500 font-medium">{act.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      {/* Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-gray-500 pt-6 mt-12 pb-4 border-t border-gray-200">
        <p>© 2024 WULFARA Industrial Marketplace. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0 text-gray-500">
          <a href="#" className="hover:text-gray-900 transition">Support</a>
          <a href="#" className="hover:text-gray-900 transition">Privacy Policy</a>
          <a href="#" className="hover:text-gray-900 transition">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}
