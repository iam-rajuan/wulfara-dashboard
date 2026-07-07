import React, { useState } from 'react';
import { Lightbulb, CheckCircle2, Circle } from 'lucide-react';

export default function GalleryTips() {
  const initialTips = [
    {
      id: 1,
      title: "High-Quality Resolution",
      desc: "Ensure images are at least 1080×1080px for optimal viewing on high-DPI displays.",
      completed: true
    },
    {
      id: 2,
      title: "Consistent Backgrounds",
      desc: "Use white or neutral grey backgrounds for standalone product shots to maintain a catalog feel.",
      completed: false
    },
    {
      id: 3,
      title: "Verify Certificates",
      desc: "Ensure all uploaded PDF certificates clearly show the issuing body and expiration date.",
      completed: false
    },
    {
      id: 4,
      title: "Facility Scale",
      desc: "Include at least one wide shot of your manufacturing floor to demonstrate operational capacity.",
      completed: false
    }
  ];

  const [tips, setTips] = useState(initialTips);

  const toggleTip = (id) => {
    setTips(tips.map(tip => 
      tip.id === id ? { ...tip, completed: !tip.completed } : tip
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb size={20} className="text-[#D4AF37]" strokeWidth={2.5} />
        <h3 className="text-[16px] font-bold text-[#0F172A]">Gallery Tips</h3>
      </div>
      
      <div className="space-y-6">
        {tips.map((tip) => (
          <div 
            key={tip.id} 
            className="flex items-start gap-3 cursor-pointer group"
            onClick={() => toggleTip(tip.id)}
          >
            <div className="mt-0.5 shrink-0 transition-transform group-hover:scale-110">
              {tip.completed ? (
                <CheckCircle2 size={18} className="text-[#D4AF37]" strokeWidth={2.5} />
              ) : (
                <Circle size={18} className="text-gray-400 group-hover:text-gray-500 transition-colors" strokeWidth={2.5} />
              )}
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-[#0F172A] mb-1">{tip.title}</h4>
              <p className="text-[12px] text-gray-500 leading-relaxed font-medium">{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
