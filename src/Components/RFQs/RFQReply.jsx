import React, { useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, FileText, Clock, CloudUpload, Send, CheckCircle2, Circle, X } from 'lucide-react';
import { useGetRfqQuery, useReplyToRfqMutation, useUpdateRfqStatusMutation } from '../../redux/features/rfqs/rfqsApi';
import { SUPPORT_URL, PRIVACY_URL, TERMS_URL } from '../../config/urls';

export default function RFQReply() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const { data: rfqResponse, isLoading } = useGetRfqQuery(id);
  const [replyToRfq] = useReplyToRfqMutation();
  const [updateStatus] = useUpdateRfqStatusMutation();
  
  const rawRfq = rfqResponse?.data;
  
  const [formData, setFormData] = useState({
    price: '',
    isNegotiable: false,
    timeline: '',
    shippingNotes: '',
    message: ''
  });
  
  const [attachedFile, setAttachedFile] = useState(null);

  const rfq = rawRfq ? {
    id: `RFQ-${rawRfq._id.substring(rawRfq._id.length - 4).toUpperCase()}`,
    rawId: rawRfq._id,
    product: rawRfq.subject || rawRfq.productDetails || 'Unknown',
    quantity: `${rawRfq.quantity}`,
    targetDate: 'N/A', // Assuming targetDate isn't directly on RFQ yet
    buyerName: rawRfq.buyerUser?.name || rawRfq.buyerName || 'Unknown Buyer'
  } : null;

  if (isLoading || !rfq) {
    return <div className="p-8 mt-16 text-center text-gray-500 font-bold">Loading RFQ details...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const handleSendReply = async () => {
    if (!formData.price.trim() || !formData.timeline.trim() || !formData.message.trim()) {
      alert("Please fill in all required fields (Price, Timeline, and Message).");
      return;
    }
    
    if (rfq) {
      try {
        const textMessage = `[QUOTE DETAILS]
Price: $${formData.price} ${formData.isNegotiable ? '(Negotiable)' : '(Fixed)'}
Timeline: ${formData.timeline}
Shipping Notes: ${formData.shippingNotes || 'None'}

[MESSAGE]
${formData.message}`;

        await replyToRfq({
          id: rfq.rawId,
          data: {
            text: textMessage,
            attachments: [] // Skip attachments for now, or implement S3 upload
          }
        }).unwrap();
        
        await updateStatus({ id: rfq.rawId, status: 'responded' }).unwrap();
        
        alert(`Quote Response sent successfully for ${rfq.id}!`);
        navigate(`/rfqs/${rfq.rawId}`);
      } catch {
        alert("Failed to send quote response");
      }
    }
  };

  const handleSaveDraft = () => {
    alert(`Draft saved for ${rfq.id}.`);
    navigate(`/rfqs`);
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans mt-16">
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500 mb-4">
          <Link to="/rfqs" className="hover:text-gray-900 transition">RFQs</Link>
          <ChevronRight size={14} />
          <Link to={`/rfqs/${rfq.id}`} className="hover:text-gray-900 transition">{rfq.id}</Link>
          <ChevronRight size={14} />
          <span className="text-[#0F172A]">Reply</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Form) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center gap-3">
              <FileText className="text-emerald-600" size={24} />
              <h1 className="text-[24px] font-bold text-[#0F172A]">Quote Response</h1>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[13px] font-bold text-[#0F172A] mb-2">
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-500 font-medium text-[15px]">$</span>
                    </div>
                    <input 
                      type="text" 
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 bg-[#F8F9FB] border border-gray-200 rounded-lg text-[14px] font-medium focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="isNegotiable"
                      name="isNegotiable"
                      checked={formData.isNegotiable}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <label htmlFor="isNegotiable" className="text-[12px] font-bold text-gray-600 cursor-pointer">
                      Price is negotiable
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#0F172A] mb-2">
                    Delivery Timeline <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Clock className="text-gray-400" size={16} />
                    </div>
                    <input 
                      type="text" 
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      placeholder="e.g., 10-15 business days"
                      className="w-full pl-11 pr-4 py-3 bg-[#F8F9FB] border border-gray-200 rounded-lg text-[14px] font-medium focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#0F172A] mb-2">
                  Shipping Notes <span className="text-gray-400 font-medium">(Optional)</span>
                </label>
                <textarea 
                  name="shippingNotes"
                  value={formData.shippingNotes}
                  onChange={handleInputChange}
                  placeholder="FOB, CIF, or any specific logistics constraints..."
                  className="w-full h-24 p-4 bg-[#F8F9FB] border border-gray-200 rounded-lg text-[14px] font-medium resize-none focus:outline-none focus:border-blue-500 transition"
                ></textarea>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#0F172A] mb-2">
                  Message to Buyer <span className="text-red-500">*</span>
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Detail your offering, terms, and any variations from the original request..."
                  className="w-full h-32 p-4 bg-[#F8F9FB] border border-gray-200 rounded-lg text-[14px] font-medium resize-none focus:outline-none focus:border-blue-500 transition"
                ></textarea>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#0F172A] mb-2">
                  Attach Quote Document
                </label>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                {!attachedFile ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center bg-[#F8F9FB] hover:bg-gray-50 transition cursor-pointer"
                  >
                    <CloudUpload className="text-gray-400 mb-3" size={32} />
                    <p className="text-[14px] font-bold text-[#0F172A] mb-1">Drag and drop your file here</p>
                    <p className="text-[12px] font-bold text-gray-500 mb-4">Supported formats: PDF, DOCX (Max 10MB)</p>
                    <button className="px-6 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-[#0F172A] hover:bg-gray-50 transition pointer-events-none">
                      Browse Files
                    </button>
                  </div>
                ) : (
                  <div className="border border-blue-100 bg-blue-50 rounded-xl p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <FileText className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-[#0F172A]">{attachedFile.name}</p>
                        <p className="text-[11px] font-bold text-gray-500">{(attachedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setAttachedFile(null)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t border-gray-100 bg-[#F8F9FB] flex justify-end gap-3">
              <button 
                onClick={handleSaveDraft}
                className="px-6 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 transition rounded-md text-[13px] font-bold text-[#0F172A]"
              >
                Save Draft
              </button>
              <button 
                onClick={handleSendReply}
                className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#C29F31] transition rounded-md text-[13px] font-bold text-[#0F172A] shadow-sm flex items-center gap-2"
              >
                <Send size={16} strokeWidth={2.5} />
                Send Reply
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-6">
          
          {/* RFQ Summary Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-[#1E293B] p-4 flex items-center gap-2 text-white">
              <FileText size={18} />
              <h2 className="text-[14px] font-bold">RFQ Summary</h2>
            </div>
            
            <div className="p-5">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-[12px] font-bold text-gray-500">RFQ ID</span>
                  <span className="text-[13px] font-bold text-[#0F172A]">{rfq.id}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-[12px] font-bold text-gray-500">Buyer</span>
                  <div className="flex items-center gap-2">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop" alt="Buyer" className="w-5 h-5 rounded-full object-cover" />
                    <span className="text-[13px] font-bold text-[#0F172A]">{rfq.buyerName}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-[12px] font-bold text-gray-500">Product</span>
                  <span className="text-[13px] font-bold text-[#0F172A] text-right">{rfq.product}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-[12px] font-bold text-gray-500">Quantity</span>
                  <span className="text-[13px] font-bold text-[#0F172A]">{rfq.quantity}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-[12px] font-bold text-gray-500">Target Date</span>
                  <span className="text-[13px] font-bold text-[#0F172A]">{rfq.targetDate}</span>
                </div>
              </div>
              
              <div className="mt-5 text-center">
                <Link to={`/rfqs/${rfq.id}`} className="text-[13px] font-bold text-[#0066FF] hover:underline">
                  View Full RFQ Details
                </Link>
              </div>
            </div>
          </div>

          {/* Before sending Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4 text-[#0F172A]">
              <CheckCircle2 size={18} className="text-gray-700" />
              <h2 className="text-[14px] font-bold">Before sending</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-[12px] font-bold text-gray-600 leading-tight">Verify pricing aligns with current market indices.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-[12px] font-bold text-gray-600 leading-tight">Confirm lead times include realistic buffer for logistics.</p>
              </div>
              <div className="flex items-start gap-3">
                {attachedFile ? (
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <Circle size={16} className="text-gray-400 shrink-0 mt-0.5" />
                )}
                <p className="text-[12px] font-bold text-gray-600 leading-tight">Attach detailed spec sheet if proposing an alternative grade.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-gray-500 pt-6 mt-12 pb-4 border-t border-gray-200">
        <p>© 2024 WULFARA Industrial Marketplace. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0 text-gray-500">
          <a href={SUPPORT_URL} className="hover:text-gray-900 transition">Support</a>
          <a href={PRIVACY_URL} className="hover:text-gray-900 transition">Privacy Policy</a>
          <a href={TERMS_URL} className="hover:text-gray-900 transition">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}
