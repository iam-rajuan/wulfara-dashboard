import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Smile, Paperclip, Send, FileText, Image as ImageIcon, File, X } from 'lucide-react';
import { useGetMessagesQuery, useSendMessageMutation } from '../../redux/features/messages/messagesApi';
import { useLazyGetRfqAttachmentDownloadUrlQuery } from '../../redux/features/rfqs/rfqsApi';
import { useSelector } from 'react-redux';
import { createAppSocket } from '../../utils/socket';

export default function MessageActiveChat({ chatId }) {
  const { user } = useSelector(state => state.auth || { user: { _id: "admin" } });
  const isNewChat = String(chatId).startsWith('new-');
  const queryId = isNewChat ? "skip" : String(chatId);
  const { data: messagesResponse } = useGetMessagesQuery(queryId, { skip: !chatId || isNewChat });
  const [sendMessageApi] = useSendMessageMutation();
  const [triggerDownload] = useLazyGetRfqAttachmentDownloadUrlQuery();

  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [socketMessages, setSocketMessages] = useState([]);
  const socketRef = useRef(null);

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

  const rawMessages = useMemo(() => messagesResponse?.data || [], [messagesResponse?.data]);
  
  // Connect to socket when chat opens
  useEffect(() => {
    if (!chatId) {
      return undefined;
    }

    const socket = createAppSocket();
    if (!socket) {
      return undefined;
    }

    socketRef.current = socket;
    socket.connect();

    socket.on('connect', () => {
      socket.emit('join_room', chatId);
    });

    socket.on('receive_message', (newMsg) => {
      setSocketMessages(prev => [...prev, newMsg]);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [chatId]);

  // Combine database messages and real-time socket messages (with inline filtering to prevent duplicate messages)
  const chatHistory = useMemo(() => {
    const uniqueSocketMessages = socketMessages.filter(
      (sockMsg) => !rawMessages.some((dbMsg) => dbMsg._id === sockMsg._id)
    );

    return [...rawMessages, ...uniqueSocketMessages].map((msg, index) => {
      // Check if it's already formatted from mock data (graceful fallback)
      if (msg.type) return msg;

      const isIncoming = msg.sender?.role === 'buyer' || (msg.sender?._id && user?._id && msg.sender._id !== user._id) || (msg.sender?.id && user?.id && msg.sender.id !== user.id) || (msg.sender !== 'me' && typeof msg.sender === 'string');
      const msgTime = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      let msgAttachments = [];
      if (msg.isFile) {
        msgAttachments.push({
          id: msg._id,
          name: msg.fileName,
          size: 'Unknown',
          ext: msg.fileName?.split('.').pop()?.toUpperCase() || 'FILE',
          type: msg.fileUrl?.match(/\.(jpeg|jpg|gif|png)$/) ? 'image' : 'doc',
          url: msg.fileUrl
        });
      }

      const senderInitials = msg.sender?.name ? `${msg.sender.name.charAt(0).toUpperCase()}` : (msg.sender?.role === 'buyer' ? 'B' : 'U');

      return {
        id: msg._id || index,
        type: isIncoming ? 'incoming' : 'outgoing',
        text: msg.text,
        time: msgTime,
        attachments: msgAttachments,
        avatarInitials: senderInitials,
      };
    });
  }, [rawMessages, socketMessages, user]);
  
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const commonEmojis = ['😀', '😂', '🥰', '😎', '👍', '🙏', '🔥', '✨', '🎉', '💡', '✅', '👀'];

  useEffect(() => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 50);
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!message.trim() && attachments.length === 0) return;

    try {
      // If there are attachments, normally we'd upload to S3 first. For now, we simulate.
      const isFile = attachments.length > 0;
      const fileName = isFile ? attachments[0].name : null;
      const fileUrl = isFile ? attachments[0].url : null;

      const payload = {
        text: message,
        isFile,
        fileName,
        fileUrl,
        ...(isNewChat ? { recipientId: String(chatId).split('-')[1] } : {})
      };

      const res = await sendMessageApi({ conversationId: isNewChat ? "new" : chatId, data: payload }).unwrap();
      const savedMsg = res.data;

      // Broadcast to socket
      socketRef.current?.emit('send_message', { roomId: savedMsg.conversation || chatId, message: savedMsg });

      // Add to local real-time state instantly
      setSocketMessages(prev => [...prev, savedMsg]);
      
      setMessage("");
      setAttachments([]);
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  const removeAttachment = (id) => {
    setAttachments(attachments.filter(a => a.id !== id));
  };

  const handleFileAttach = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const ext = file.name.split('.').pop().toLowerCase();
      let type = 'doc';
      if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) type = 'image';
      else if (ext === 'pdf') type = 'pdf';
      
      const newAttachment = {
        id: Date.now(),
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        ext: ext.toUpperCase(),
        type: type,
        url: type === 'image' ? URL.createObjectURL(file) : null
      };
      
      setAttachments([...attachments, newAttachment]);
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-0">

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#F8F9FB] flex flex-col gap-6 min-h-0">

        {chatHistory.map((msg) => {
          return (
            <React.Fragment key={msg.id}>
              {/* Date Divider (Only shown if specified) */}
              {msg.showDate && (
                <div className="flex justify-center">
                  <span className="px-4 py-1.5 bg-gray-200 text-gray-500 rounded-full text-[11px] font-bold">
                    {msg.showDate}
                  </span>
                </div>
              )}

              {/* Message Bubble */}
              {msg.type === 'incoming' ? (
                <div className="flex items-start gap-3 max-w-[85%]">
                  {msg.avatar ? (
                    <img
                      src={msg.avatar}
                      alt="Buyer"
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <span className="text-blue-700 font-bold text-[11px]">{msg.avatarInitials}</span>
                    </div>
                  )}
                  <div>
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2 justify-start">
                        {msg.attachments.map(att => (
                          att.type === 'image' ? (
                            <button key={att.id} onClick={() => handleDownload(att.url)} className="focus:outline-none cursor-pointer">
                              <img src={att.url} alt={att.name} className="max-w-[240px] rounded-2xl border border-gray-200 shadow-sm hover:opacity-90 transition" />
                            </button>
                          ) : (
                            <button key={att.id} onClick={() => handleDownload(att.url)} className="bg-white border border-gray-200 p-3 rounded-xl flex items-center gap-3 shadow-sm min-w-[200px] text-left hover:bg-gray-50 transition cursor-pointer focus:outline-none">
                              <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${att.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                                {att.type === 'pdf' ? <FileText size={16} /> : <File size={16} />}
                              </div>
                              <div className="min-w-0">
                                <p className="text-[12px] font-bold text-[#0F172A] truncate">{att.name}</p>
                                <p className="text-[10px] text-gray-500">{att.size || 'Attachment'}</p>
                              </div>
                            </button>
                          )
                        ))}
                      </div>
                    )}
                    
                    {msg.text && (
                      <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-sm shadow-sm">
                        <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
                          {msg.text}
                        </p>
                      </div>
                    )}
                    <span className="text-[10px] text-gray-400 font-bold mt-1 ml-1">{msg.time}</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-end w-full">
                  <div className="flex items-start justify-end gap-3 w-full">
                    <div className="flex flex-col items-end max-w-[85%]">
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2 justify-end">
                          {msg.attachments.map(att => (
                            att.type === 'image' ? (
                              <button key={att.id} onClick={() => handleDownload(att.url)} className="focus:outline-none cursor-pointer">
                                <img src={att.url} alt={att.name} className="max-w-[240px] rounded-2xl border border-gray-200 shadow-sm hover:opacity-90 transition" />
                              </button>
                            ) : (
                              <button key={att.id} onClick={() => handleDownload(att.url)} className="bg-white border border-gray-200 p-3 rounded-xl flex items-center gap-3 shadow-sm min-w-[200px] text-left hover:bg-gray-50 transition cursor-pointer focus:outline-none">
                                <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${att.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                                  {att.type === 'pdf' ? <FileText size={16} /> : <File size={16} />}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-[12px] font-bold text-[#0F172A] truncate">{att.name}</p>
                                  <p className="text-[10px] text-gray-500">{att.size || 'Attachment'}</p>
                                </div>
                              </button>
                            )
                          ))}
                        </div>
                      )}
                      
                      {msg.text && (
                        <div className="bg-[#5B6270] text-white p-4 rounded-2xl rounded-tr-sm shadow-sm inline-block">
                          <p className="text-[13px] leading-relaxed font-medium">
                            {msg.text}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold mt-1 mr-1">{msg.time}</span>
                </div>
              )}
            </React.Fragment>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-gray-200 bg-white">

        {/* Attachments Preview */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-4">
            {attachments.map(file => (
              <div key={file.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-gray-300 transition cursor-pointer w-[240px] relative group">
                <button
                  onClick={() => removeAttachment(file.id)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={12} />
                </button>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 overflow-hidden ${
                  file.type === 'pdf' ? 'bg-red-50 text-red-500' : 
                  file.type === 'doc' ? 'bg-blue-50 text-blue-500' : ''
                }`}>
                  {file.type === 'image' ? (
                    <img src={file.url || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop"} alt="Preview" className="w-full h-full object-cover" />
                  ) : file.type === 'pdf' ? (
                    <FileText size={20} />
                  ) : (
                    <File size={20} />
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-[13px] font-bold text-[#0F172A] truncate">{file.name}</h4>
                  <p className="text-[11px] font-bold text-gray-500">{file.size} · {file.ext}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Text Input */}
        <div className="bg-[#F8F9FB] rounded-xl border border-gray-100 focus-within:border-gray-300 transition shrink-0 relative z-10">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type your message here... (Press Enter to send)"
            className="w-full h-20 p-4 bg-transparent resize-none outline-none text-[13px] font-medium placeholder:text-gray-400"
          ></textarea>

          <div className="px-4 pb-3 flex justify-between items-center text-gray-400">
            <div className="flex items-center gap-4 relative">
              <button 
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="hover:text-gray-700 transition"
              >
                <Smile size={18} strokeWidth={2.5} />
              </button>
              
              {showEmojiPicker && (
                <div className="absolute bottom-8 left-0 bg-white border border-gray-200 shadow-lg rounded-xl p-3 grid grid-cols-4 gap-2 z-10 w-[160px]">
                  {commonEmojis.map(emoji => (
                    <button 
                      key={emoji}
                      onClick={() => handleEmojiClick(emoji)}
                      className="hover:bg-gray-100 rounded text-lg p-1 transition flex items-center justify-center"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}

              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileAttach}
                className="hidden"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="hover:text-gray-700 transition"
              >
                <Paperclip size={18} strokeWidth={2.5} />
              </button>
            </div>
            <span className="text-[10px] font-bold tracking-wider">{message.length} characters</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-4">
          <button className="px-6 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 transition rounded-full text-[13px] font-bold text-[#0F172A]">
            Save Draft
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() && attachments.length === 0}
            className="px-6 py-2.5 bg-[#0F172A] hover:bg-black disabled:opacity-50 transition rounded-full text-[13px] font-bold text-white shadow-sm flex items-center gap-2"
          >
            Send Message
            <Send size={14} strokeWidth={2.5} className="ml-1" />
          </button>
        </div>

      </div>
    </div>
  );
}
