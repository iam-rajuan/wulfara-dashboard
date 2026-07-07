import React, { useState } from 'react';
import { Smile, Paperclip, Send, FileText, Image as ImageIcon, File } from 'lucide-react';

export default function MessageActiveChat({ chatId }) {
  const [message, setMessage] = useState("Hello, I attached our quote document and product specification sheet...");

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#F8F9FB] flex flex-col gap-6">
        
        {/* Date Divider */}
        <div className="flex justify-center">
          <span className="px-4 py-1.5 bg-gray-200 text-gray-500 rounded-full text-[11px] font-bold">
            Yesterday, 4:12 PM
          </span>
        </div>

        {/* Incoming Message */}
        <div className="flex items-start gap-3 max-w-[85%]">
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop" 
            alt="Buyer" 
            className="w-8 h-8 rounded-full object-cover shrink-0" 
          />
          <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-sm shadow-sm">
            <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
              Can you confirm if the primary carbon steel sheets meet the ASTM A36 standard for the upcoming Q3 shipment?
            </p>
          </div>
        </div>

        {/* Outgoing Message */}
        <div className="flex items-start justify-end gap-3 w-full">
          <div className="bg-[#5B6270] text-white p-4 rounded-2xl rounded-tr-sm shadow-sm max-w-[85%]">
            <p className="text-[13px] leading-relaxed font-medium">
              Yes, absolutely. All our structural components are ASTM certified. I'll get the documentation over to you shortly.
            </p>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-gray-200 bg-white">
        
        {/* Attachments Preview */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-gray-300 transition cursor-pointer w-[240px]">
            <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
              <FileText size={20} />
            </div>
            <div className="min-w-0">
              <h4 className="text-[13px] font-bold text-[#0F172A] truncate">quote-document.pdf</h4>
              <p className="text-[11px] font-bold text-gray-500">1.2 MB · PDF</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-gray-300 transition cursor-pointer w-[240px]">
            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop" alt="Steel" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[13px] font-bold text-[#0F172A] truncate">factory-product-photo.jpg</h4>
              <p className="text-[11px] font-bold text-gray-500">4.8 MB · JPG</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-gray-300 transition cursor-pointer w-[240px]">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
              <File size={20} />
            </div>
            <div className="min-w-0">
              <h4 className="text-[13px] font-bold text-[#0F172A] truncate">steel-spec-sheet.docx</h4>
              <p className="text-[11px] font-bold text-gray-500">856 KB · DOCX</p>
            </div>
          </div>
        </div>

        {/* Text Input */}
        <div className="bg-[#F8F9FB] rounded-xl overflow-hidden border border-gray-100">
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full h-24 p-4 bg-transparent resize-none outline-none text-[13px] font-medium placeholder:text-gray-400"
          ></textarea>
          
          <div className="px-4 pb-3 flex justify-between items-center text-gray-400">
            <div className="flex items-center gap-4">
              <button className="hover:text-gray-700 transition"><Smile size={18} strokeWidth={2.5} /></button>
              <button className="hover:text-gray-700 transition"><Paperclip size={18} strokeWidth={2.5} /></button>
            </div>
            <span className="text-[10px] font-bold tracking-wider">{message.length} characters</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-4">
          <button className="px-6 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 transition rounded-full text-[13px] font-bold text-[#0F172A]">
            Save Draft
          </button>
          <button className="px-6 py-2.5 bg-[#0F172A] hover:bg-black transition rounded-full text-[13px] font-bold text-white shadow-sm flex items-center gap-2">
            Send Message
            <Send size={14} strokeWidth={2.5} className="ml-1" />
          </button>
        </div>

      </div>
    </div>
  );
}
