import React from 'react';
import { Mail, FileText, Clock } from 'lucide-react';
import MessageActiveChat from './MessageActiveChat';

export default function MessageContent({ selectedChat }) {
  if (selectedChat) {
    return <MessageActiveChat chatId={selectedChat} />;
  }

  return (
    <div className="h-full flex flex-col gap-6">
      
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
              <Mail size={20} />
            </div>
            <span className="text-[11px] font-bold text-[#D4AF37]">+2 today</span>
          </div>
          <p className="text-[11px] font-bold text-gray-500 tracking-wider mb-1">UNREAD MESSAGES</p>
          <h2 className="text-[28px] font-bold text-[#0F172A]">4</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center">
              <FileText size={20} />
            </div>
            <span className="text-[11px] font-bold text-[#D4AF37]">Active</span>
          </div>
          <p className="text-[11px] font-bold text-gray-500 tracking-wider mb-1">OPEN RFQ CHATS</p>
          <h2 className="text-[28px] font-bold text-[#0F172A]">7</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
              <Clock size={20} />
            </div>
            <span className="text-[11px] font-bold text-[#0F172A]">Top 10%</span>
          </div>
          <p className="text-[11px] font-bold text-gray-500 tracking-wider mb-1">AVG RESPONSE TIME</p>
          <h2 className="text-[28px] font-bold text-[#0F172A]">2h</h2>
        </div>
      </div>

      {/* Main Content Area (Empty State) */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
        
        {/* 3D Illustration */}
        <div className="w-[300px] h-[300px] mb-6 flex items-center justify-center relative">
          <img 
            src="/messages-empty-state.png" 
            alt="Select a conversation" 
            className="w-full h-full object-contain drop-shadow-md"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="hidden absolute inset-0 items-center justify-center bg-[#F8F9FB] rounded-2xl">
            <Mail size={80} className="text-gray-300" />
          </div>
        </div>

        <h2 className="text-[24px] font-bold text-[#0F172A] mb-3">
          Select a conversation
        </h2>
        
        <p className="text-[14px] text-gray-500 font-medium max-w-[380px] mb-8 leading-relaxed">
          Choose a buyer or inquiry from the list on the left to start responding and negotiating contracts.
        </p>
        
        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 bg-[#0F172A] hover:bg-[#1E293B] transition rounded-md text-[13px] font-bold text-white shadow-sm">
            View RFQ Dashboard
          </button>
          <button className="px-6 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 transition rounded-md text-[13px] font-bold text-[#0F172A]">
            Help Center
          </button>
        </div>

      </div>

    </div>
  );
}
