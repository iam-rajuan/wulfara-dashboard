import React from "react";

export default function DisputeAdminPanel({ resolution = {}, onChange }) {
  const handleChange = (field, value) => {
    if (onChange) onChange(field, value);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <h3 className="text-[16px] font-bold text-[#0F172A] mb-6">Admin Resolution Panel</h3>
      
      <div className="space-y-6">
        
        {/* Dispute Status */}
        <div>
          <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-2">Dispute Status</label>
          <div className="relative">
            <select 
              value={resolution.status || "In Progress"}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0F172A] appearance-none focus:outline-none focus:border-gray-300"
            >
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Escalated">Escalated</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Priority Level */}
        <div>
          <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-2">Priority Level</label>
          <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100">
            {['Low', 'Medium', 'Critical'].map(level => (
              <button 
                key={level}
                onClick={() => handleChange("priority", level)}
                className={`flex-1 py-1.5 text-[12px] font-bold rounded-md transition-colors ${
                  resolution.priority === level 
                    ? "text-[#0F172A] bg-white shadow-sm border border-gray-200" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Internal Admin Notes */}
        <div>
          <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-2">Internal Admin Notes</label>
          <textarea 
            rows={4}
            value={resolution.notes || ""}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="Enter findings or internal deliberation details..."
            className="w-full px-3 py-3 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-[#0F172A] focus:outline-none focus:border-gray-300 resize-none placeholder:text-gray-400 placeholder:font-normal"
          ></textarea>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <button className="w-full py-3 bg-[#D4AF37] text-[#0F172A] rounded-md text-[14px] font-extrabold hover:bg-[#C2982B] transition-colors shadow-sm">
            Mark Resolved
          </button>
          <button className="w-full py-3 bg-red-50 text-red-600 border border-red-100 rounded-md text-[13px] font-bold hover:bg-red-100 transition-colors">
            Escalate to Legal
          </button>
        </div>

      </div>
    </div>
  );
}
