import React from "react";
import { CheckCircle, ShieldCheck, MessageSquare, BarChart2, Headphones } from "lucide-react";

export default function FeatureAccessForm({ data = {}, onChange }) {
  const activeFeatures = data.features || [1, 2, 3, 4];

  const handleToggle = (id) => {
    if (!onChange) return;
    if (activeFeatures.includes(id)) {
      onChange("features", activeFeatures.filter(f => f !== id));
    } else {
      onChange("features", [...activeFeatures, id]);
    }
  };

  const features = [
    {
      id: 1,
      icon: <ShieldCheck size={18} className="text-[#3B82F6]" />,
      title: "Verified Supplier Badge",
      description: "Ensure trust with indicator on listings",
      checked: true
    },
    {
      id: 2,
      icon: <MessageSquare size={18} className="text-[#3B82F6]" />,
      title: "Direct Messaging (RFP)",
      description: "Allow buyers to initiate chat window",
      checked: true
    },
    {
      id: 3,
      icon: <BarChart2 size={18} className="text-[#3B82F6]" />,
      title: "Advanced Analytics Dashboard",
      description: "Complete listing traffic insights",
      checked: true
    },
    {
      id: 4,
      icon: <Headphones size={18} className="text-[#3B82F6]" />,
      title: "Priority Support",
      description: "24/5 response time guaranteed",
      checked: true
    }
  ];

  return (
    <div id="Features" className="h-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 scroll-mt-48">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
        <CheckCircle size={16} className="text-gray-400" />
        <h2 className="text-[14px] font-extrabold text-[#0F172A]">Feature Access</h2>
      </div>

      <div className="space-y-3">
        {features.map((feature) => {
          const isChecked = activeFeatures.includes(feature.id);
          return (
            <div 
              key={feature.id} 
              onClick={() => handleToggle(feature.id)}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#0F172A]">{feature.title}</h4>
                  <p className="text-[11px] font-medium text-gray-400 leading-snug">{feature.description}</p>
                </div>
              </div>
              
              <div className={`rounded p-0.5 shadow-sm transition-colors ${isChecked ? 'bg-[#0F172A]' : 'bg-gray-200 border border-gray-300'}`}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
