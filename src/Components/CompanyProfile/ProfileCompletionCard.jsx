import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

export default function ProfileCompletionCard({ completionData }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-[14px] text-[#0F172A]">Profile Completion</h3>
        <span className="text-2xl font-bold text-[#137847]">{completionData.percentage}%</span>
      </div>
      <div className="w-full h-2 bg-[#EEF2F6] rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-[#137847] rounded-full transition-all duration-500 ease-out" style={{ width: `${completionData.percentage}%` }}></div>
      </div>

      <div className="space-y-4">
        {completionData.tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3">
            {task.completed ? (
              <CheckCircle2 size={16} className="text-[#137847] shrink-0" strokeWidth={2.5} />
            ) : (
              <Circle size={16} className="text-gray-500 shrink-0" strokeWidth={2.5} />
            )}
            <span className={`text-[13px] ${task.completed ? 'text-gray-400 font-bold line-through decoration-gray-300' : 'text-[#0F172A] font-bold'}`}>
              {task.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
