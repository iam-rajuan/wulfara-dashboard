import React from 'react';

const StatCard = ({ title, value, icon, badgeColor = "bg-gray-100", badgeTextColor = "text-gray-600", borderColor = "border-gray-200" }) => {
  return (
    <div className={`bg-white rounded-xl border ${borderColor} p-4 flex items-center gap-4`}>
      <div className={`p-3 rounded-lg ${badgeColor} ${badgeTextColor}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
