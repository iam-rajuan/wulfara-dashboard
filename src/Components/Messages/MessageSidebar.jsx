import React from 'react';
import { Filter } from 'lucide-react';

export default function MessageSidebar({ conversations = [], isLoading, activeTab, selectedChat, setSelectedChat }) {
  const allChats = conversations.map((conv, idx) => {
    // Determine the other participant
    const otherUser = conv.participants?.find(p => p.role !== 'admin' && p.role !== 'supplier') || conv.participants?.[0] || {};
    
    // Create random background colors for avatars based on id
    const bgColors = ["bg-blue-100 text-blue-700", "bg-gray-200 text-gray-700", "bg-orange-100 text-orange-800", "bg-yellow-100 text-yellow-700"];
    const avatarBg = bgColors[idx % bgColors.length];
    
    const tags = [];
    if (conv.rfq) tags.push({ label: `RFQ #${conv.rfq.rfqNumber || '...' }`, color: "bg-orange-100 text-orange-700" });
    if (conv.status === 'closed') tags.push({ label: "Closed", color: "bg-gray-100 text-gray-500" });
    else tags.push({ label: "Open", color: "bg-blue-50 text-blue-600" });
    
    return {
      id: conv._id,
      buyerInitials: otherUser.name ? otherUser.name.charAt(0).toUpperCase() : "U",
      buyerName: otherUser.name || "Unknown User",
      avatarBg,
      time: new Date(conv.lastMessageAt || Date.now()).toLocaleDateString(),
      tags,
      preview: conv.lastMessage?.text || "Started a new conversation...",
    };
  });

  // For dynamic filtering (mocking)
  const filteredChats = activeTab === 'Unread' 
    ? allChats.filter(c => c.tags.some(t => t.label === 'Unread'))
    : activeTab === 'RFQ'
    ? allChats.filter(c => c.tags.some(t => t.label === 'RFQ'))
    : allChats;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#F8F9FB]">
        <span className="text-[11px] font-bold text-gray-500 tracking-wider">RECENT CHATS</span>
        <button className="text-gray-400 hover:text-gray-700 transition">
          <Filter size={18} />
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {filteredChats.map(chat => {
          const isSelected = selectedChat === chat.id || (!selectedChat && chat.isActive);

          return (
            <div 
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`p-4 border-b border-gray-50 cursor-pointer transition relative ${
                isSelected ? 'bg-[#F8F9FB]' : 'hover:bg-gray-50 bg-white'
              }`}
            >
              {isSelected && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37]"></div>
              )}
              
              <div className="flex gap-3">
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-md shrink-0 flex items-center justify-center text-[13px] font-bold ${
                  chat.isLogo ? 'bg-[#0F172A]' : chat.avatarBg
                }`}>
                  {chat.isLogo ? (
                    <div className="w-4 h-4 bg-[#D4AF37] rotate-45 flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#0F172A]"></div>
                    </div>
                  ) : chat.buyerInitials}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-[13px] font-bold text-[#0F172A] truncate pr-2">{chat.buyerName}</h3>
                    <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap pt-0.5">{chat.time}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {chat.tags.map((tag, idx) => (
                      <span key={idx} className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${tag.color}`}>
                        {tag.label}
                      </span>
                    ))}
                  </div>
                  
                  <p className={`text-[12px] text-gray-500 leading-snug line-clamp-2 ${chat.isItalic ? 'italic' : 'font-medium'}`}>
                    {chat.preview}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
