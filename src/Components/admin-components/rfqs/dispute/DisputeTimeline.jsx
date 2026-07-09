import React from "react";
import { MessageSquare, Settings } from "lucide-react";

export default function DisputeTimeline({ events = [] }) {
  return (
    <div className="bg-[#F8FAFC] rounded-xl border border-gray-200 overflow-hidden">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2 text-gray-500 bg-gray-50/50">
        <MessageSquare size={16} />
        <h3 className="text-[13px] font-bold text-[#0F172A]">Dispute Communication Timeline</h3>
      </div>

      {/* Timeline Content */}
      <div className="p-6">
        <div className="relative pl-4 border-l-2 border-gray-100 space-y-8">
          
          {events.map((event) => (
            <div key={event.id} className="relative">
              {event.type === "buyer" && (
                <>
                  <div className="absolute -left-[27px] w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold border-4 border-white shadow-sm">
                    <span className="opacity-70">{event.author.charAt(0)}</span>
                  </div>
                  <div className="pl-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[12px] font-bold text-[#0F172A]">{event.author}</span>
                      <span className="text-[11px] text-gray-400">• {event.time}</span>
                    </div>
                    <div className="bg-gray-100/80 rounded-lg p-4 text-[13px] font-medium text-[#0F172A] leading-relaxed border border-gray-200/60">
                      {event.content}
                    </div>
                  </div>
                </>
              )}

              {event.type === "system" && (
                <>
                  <div className="absolute -left-[23px] w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center border-4 border-white">
                    <Settings size={12} />
                  </div>
                  <div className="pl-6">
                    <p className="text-[12px] italic text-gray-500 font-medium">
                      System: {event.content}
                    </p>
                  </div>
                </>
              )}

              {event.type === "supplier" && (
                <>
                  <div className="absolute -left-[27px] w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] font-bold border-4 border-white shadow-sm">
                    <span className="opacity-70">{event.author.charAt(0)}</span>
                  </div>
                  <div className="pl-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[12px] font-bold text-[#0F172A]">{event.author}</span>
                      <span className="text-[11px] text-gray-400">• {event.time}</span>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-[13px] font-medium text-[#0F172A] leading-relaxed border border-gray-200">
                      {event.content}
                    </div>
                  </div>
                </>
              )}

              {event.type === "admin" && (
                <>
                  <div className="absolute -left-[27px] w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold border-4 border-white shadow-sm">
                    <span>{event.author.charAt(0)}</span>
                  </div>
                  <div className="pl-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[12px] font-bold text-blue-600">{event.author}</span>
                      <span className="text-[11px] text-gray-400">• {event.time}</span>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-[13px] font-medium text-blue-700 leading-relaxed border border-blue-100">
                      {event.content}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
