import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import MessageSidebar from '../../Components/Messages/MessageSidebar';
import MessageContent from '../../Components/Messages/MessageContent';
import { Plus } from 'lucide-react';
import { useGetConversationsQuery } from '../../redux/features/messages/messagesApi';

export default function Messages() {
  const [searchParams] = useSearchParams();
  const newUserId = searchParams.get('new');
  const newUserName = searchParams.get('name');

  const [activeTab, setActiveTab] = useState('Inbox');
  const [selectedChat, setSelectedChat] = useState(newUserId ? `new-${newUserId}` : null);
  
  const { data: conversationsResponse, isLoading } = useGetConversationsQuery(undefined, { pollingInterval: 30000 });
  const rawConversations = conversationsResponse?.data || [];

  const conversations = useMemo(() => {
    let list = [...rawConversations];
    
    if (newUserId && newUserName) {
      const exists = list.some((c) => c.participants?.some((p) => p._id === newUserId));
      if (!exists) {
        list.unshift({
          _id: `new-${newUserId}`,
          participants: [{ _id: newUserId, firstName: newUserName, lastName: '', role: 'buyer' }],
          lastMessage: { text: "Start a new conversation..." },
          lastMessageAt: new Date().toISOString(),
          hasUnread: false
        });
      }
    }
    
    return list;
  }, [rawConversations, newUserId, newUserName]);

  const tabs = [
    { id: 'Inbox', label: 'Inbox' },
    { id: 'Sourcing', label: 'Sourcing' },
    { id: 'RFQ', label: 'RFQ Conversations' },
    { id: 'Unread', label: 'Unread', badge: conversations.filter(c => c.hasUnread).length || null }
  ];

  return (
    <div className="min-h-screen p-6 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans mt-10">

      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[#0F172A] mb-1">Messages</h1>
          <p className="text-[13px] font-medium text-gray-500">
            Manage conversations with buyers, RFQs, sourcing requests, and supplier inquiries.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#C29F31] transition rounded-md text-[13px] font-bold text-[#0F172A] shadow-sm flex items-center justify-center gap-2 shrink-0">
          <Plus size={16} strokeWidth={2.5} />
          New Broadcast
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6 flex gap-6 overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-[13px] font-bold whitespace-nowrap transition border-b-2 flex items-center gap-2 ${activeTab === tab.id
                ? 'border-[#0F172A] text-[#0F172A]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
          >
            {tab.label}
            {tab.badge && (
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === tab.id ? 'bg-[#DC2626] text-white' : 'bg-[#DC2626] text-white'
                }`}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-220px)] min-h-0">
        {/* Left Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3 h-full min-h-0">
          <MessageSidebar
            conversations={conversations}
            isLoading={isLoading}
            activeTab={activeTab}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        </div>

        {/* Right Content */}
        <div className="lg:col-span-8 xl:col-span-9 h-full min-h-0">
          <MessageContent selectedChat={selectedChat} />
        </div>
      </div>

    </div>
  );
}
