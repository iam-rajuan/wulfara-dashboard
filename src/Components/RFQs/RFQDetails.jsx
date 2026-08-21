import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Printer, X, FileText, Image as ImageIcon, File, Paperclip, Send, MapPin, CheckCircle, Clock, Star } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useGetRfqQuery, useGetRfqMessagesQuery, useReplyToRfqMutation, useUpdateRfqStatusMutation, useGetRfqUploadUrlMutation, useLazyGetRfqAttachmentDownloadUrlQuery } from '../../redux/features/rfqs/rfqsApi';
import { useCreateReviewMutation } from '../../redux/features/reviews/reviewsApi';
import { SUPPORT_URL, PRIVACY_URL, TERMS_URL } from '../../config/urls';

export default function RFQDetails() {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const { data: rfqResponse } = useGetRfqQuery(id);
  const { data: messagesResponse } = useGetRfqMessagesQuery(id);
  const [replyToRfq] = useReplyToRfqMutation();
  const [updateStatus] = useUpdateRfqStatusMutation();
  const [createReview, { isLoading: isReviewing }] = useCreateReviewMutation();
  const [getRfqUploadUrl] = useGetRfqUploadUrlMutation();
  const [triggerDownload] = useLazyGetRfqAttachmentDownloadUrlQuery();
  
  const { user } = useSelector((state) => state.auth);

  const handleDownload = async (url) => {
    try {
      const res = await triggerDownload(url).unwrap();
      if (res?.downloadUrl) {
        window.open(res.downloadUrl, '_blank');
      }
    } catch (err) {
      console.error('Failed to get download URL:', err);
    }
  };
  
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const rawRfq = rfqResponse?.data;
  const messages = messagesResponse?.data || [];

  const rfq = rawRfq ? {
    id: `RFQ-${rawRfq._id.substring(rawRfq._id.length - 4).toUpperCase()}`,
    rawId: rawRfq._id,
    status: rawRfq.status === 'pending' ? 'NEW' : rawRfq.status === 'responded' ? 'RESPONDED' : rawRfq.status === 'closed' ? 'CLOSED' : rawRfq.status.toUpperCase(),
    category: rawRfq.subject || "Not specified", 
    quantity: `${rawRfq.quantity}`,
    deadline: "N/A", 
    location: "N/A",
    notes: rawRfq.details || '',
    attachments: rawRfq.attachments?.map(url => ({ name: url.split('/').pop(), url, type: 'file' })) || [],
    buyer: {
      name: rawRfq.buyerUser?.name || rawRfq.buyerName,
      title: "Buyer",
      company: "Company", 
      location: "Location",
      isVerified: !!rawRfq.buyerUser
    },
    activity: [
      { date: new Date(rawRfq.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }), title: "RFQ Created", desc: "Request submitted by buyer" },
      ...messages.map(msg => {
        const isSupplier = msg.sender?._id === rawRfq.supplier || msg.sender?._id === rawRfq.supplier?._id || msg.sender?.role === 'supplier';
        return {
          date: new Date(msg.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }),
          title: isSupplier ? "Proposal Sent" : "Message Received",
          desc: msg.text
        };
      })
    ]
  } : null;

  const handleReplySubmit = async () => {
    if ((message.trim() || attachedFile) && rfq) {
      setIsUploading(true);
      try {
        const attachmentUrls = [];
        if (attachedFile) {
          const res = await getRfqUploadUrl({ contentType: attachedFile.type }).unwrap();
          const { uploadUrl, fileUrl } = res.data;
          
          await axios.put(uploadUrl, attachedFile, {
            headers: {
              'Content-Type': attachedFile.type
            }
          });
          
          if (fileUrl) {
            attachmentUrls.push(fileUrl);
          }
        }

        await replyToRfq({
          id: rfq.rawId,
          data: {
            text: message,
            attachments: attachmentUrls
          }
        }).unwrap();
        
        if (rfq.status !== 'RESPONDED') {
          await updateStatus({ id: rfq.rawId, status: 'responded' }).unwrap();
        }
        
        setMessage('');
        setAttachedFile(null);
        setIsUploading(false);
        alert("Reply sent successfully!");
      } catch (err) {
        console.error(err);
        setIsUploading(false);
        alert("Failed to send reply");
      }
    }
  };

  const handleFileAttach = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const handleComplete = async () => {
    if (rfq) {
      if (window.confirm("Are you sure you want to mark this RFQ as completed?")) {
        try {
          await updateStatus({ id: rfq.rawId, status: 'resolved' }).unwrap();
          alert("RFQ marked as completed.");
        } catch {
          alert("Failed to complete RFQ");
        }
      }
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewText.trim()) {
      alert("Please enter a review comment.");
      return;
    }
    try {
      await createReview({
        supplierId: rawRfq.supplier._id || rawRfq.supplier,
        rfqId: rfq.rawId,
        rating: reviewRating,
        comment: reviewText
      }).unwrap();
      alert("Review submitted successfully!");
      setReviewText('');
    } catch (err) {
      alert(err.data?.message || "Failed to submit review");
    }
  };

  const handleDecline = async () => {
    if (rfq) {
      if (window.confirm("Are you sure you want to decline this RFQ?")) {
        try {
          await updateStatus({ id: rfq.rawId, status: 'closed' }).unwrap();
          alert("RFQ declined.");
        } catch {
          alert("Failed to decline RFQ");
        }
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const renderAttachmentIcon = (type) => {
    switch (type) {
      case 'pdf': return <div className="w-8 h-8 rounded bg-red-50 text-red-500 flex items-center justify-center shrink-0"><FileText size={16} /></div>;
      case 'image': return <div className="w-8 h-8 rounded bg-blue-50 text-blue-500 flex items-center justify-center shrink-0"><ImageIcon size={16} /></div>;
      case 'doc': return <div className="w-8 h-8 rounded bg-gray-100 text-gray-500 flex items-center justify-center shrink-0"><File size={16} /></div>;
      default: return <div className="w-8 h-8 rounded bg-gray-100 text-gray-500 flex items-center justify-center shrink-0"><File size={16} /></div>;
    }
  };

  if (!rfq) return null;

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
              rfq.status === 'NEW' ? 'bg-[#0066FF]' : 
              rfq.status === 'RESPONDED' ? 'bg-[#D4AF37] text-[#0F172A]' : 
              rfq.status === 'DECLINED' ? 'bg-[#DC2626]' : 'bg-gray-500'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${rfq.status === 'RESPONDED' ? 'bg-[#0F172A]' : 'bg-white'}`}></div>
              {rfq.status}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={handlePrint} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-[13px] font-bold text-[#0F172A] shadow-sm hover:bg-gray-50 transition flex items-center gap-2">
              <Printer size={16} strokeWidth={2.5} />
              Print
            </button>
            {user?.role === 'buyer' && rfq.status !== 'RESOLVED' && rfq.status !== 'CLOSED' && rfq.status !== 'DECLINED' && (
              <button 
                onClick={handleComplete} 
                className="px-4 py-2 bg-[#D1FAE5] hover:bg-[#A7F3D0] text-[#065F46] transition rounded-md text-[13px] font-bold shadow-sm flex items-center gap-2"
              >
                <CheckCircle size={16} strokeWidth={2.5} />
                Complete
              </button>
            )}
            <button 
              onClick={handleDecline} 
              disabled={rfq.status === 'DECLINED'}
              className="px-4 py-2 bg-[#FEE2E2] hover:bg-[#FECACA] disabled:opacity-50 text-[#DC2626] transition rounded-md text-[13px] font-bold shadow-sm flex items-center gap-2"
            >
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
              <div className="bg-[#F8F9FB] border border-gray-100 rounded-lg p-5 whitespace-pre-wrap">
                <p className="text-[13px] text-gray-700 leading-relaxed font-medium">{rfq.notes}</p>
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
                  <button 
                    key={idx} 
                    onClick={() => handleDownload(file.url)} 
                    className="w-full flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition cursor-pointer text-left focus:outline-none"
                  >
                    {renderAttachmentIcon(file.type)}
                    <div>
                      <h4 className="text-[13px] font-bold text-[#0F172A] mb-0.5">{file.name}</h4>
                      <p className="text-[11px] font-bold text-gray-500">Attachment</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reply to Request */}
          {rfq.status === 'RESOLVED' && user?.role === 'buyer' ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-[20px] font-bold text-[#0F172A] mb-4">Leave a Review</h2>
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-[#F8F9FB] p-4">
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} onClick={() => setReviewRating(star)}>
                      <Star size={24} className={star <= reviewRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                    </button>
                  ))}
                </div>
                <textarea 
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full h-24 p-3 bg-white border border-gray-200 rounded-lg resize-none outline-none text-[13px] font-medium placeholder:text-gray-400 mb-4"
                  placeholder="Share your experience working with this supplier..."
                ></textarea>
                <div className="flex justify-end">
                  <button 
                    onClick={handleSubmitReview}
                    disabled={isReviewing}
                    className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#C29F31] disabled:bg-[#e4ce84] transition rounded-md text-[13px] font-bold text-[#0F172A] shadow-sm flex items-center gap-2"
                  >
                    <Star size={16} strokeWidth={2.5} />
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-[20px] font-bold text-[#0F172A] mb-4">Reply to Request</h2>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-[#F8F9FB]">
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-32 p-4 bg-transparent resize-none outline-none text-[13px] font-medium placeholder:text-gray-400"
                  placeholder="Type your response or quote details here..."
                ></textarea>
                
                {attachedFile && (
                  <div className="px-4 pb-3 flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1.5 rounded-md text-[12px] font-bold">
                      <FileText size={14} />
                      <span className="truncate max-w-[200px]">{attachedFile.name}</span>
                      <button 
                        onClick={() => setAttachedFile(null)}
                        className="ml-1 hover:text-blue-900 transition"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="bg-white border-t border-gray-200 p-3 flex justify-between items-center">
                  <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleFileAttach}
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 text-[13px] font-bold text-gray-600 hover:text-gray-900 transition px-2"
                  >
                    <Paperclip size={16} />
                    Attach Quote
                  </button>
                  <button 
                    onClick={handleReplySubmit}
                    disabled={(!message.trim() && !attachedFile) || isUploading}
                    className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#C29F31] disabled:bg-[#e4ce84] transition rounded-md text-[13px] font-bold text-[#0F172A] shadow-sm flex items-center gap-2 disabled:opacity-75 cursor-pointer"
                  >
                    <Send size={16} strokeWidth={2.5} />
                    {isUploading ? 'Sending...' : 'Send Proposal'}
                  </button>
                </div>
              </div>
            </div>
          )}

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
                <img src={rawRfq?.buyerUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(rfq.buyer.name)}&background=D1A635&color=fff`} alt="Buyer" className="w-full h-full object-cover" />
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
                  <p className="text-[12px] text-gray-500 font-medium whitespace-pre-wrap">{act.desc}</p>
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
          <a href={SUPPORT_URL} className="hover:text-gray-900 transition">Support</a>
          <a href={PRIVACY_URL} className="hover:text-gray-900 transition">Privacy Policy</a>
          <a href={TERMS_URL} className="hover:text-gray-900 transition">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}
