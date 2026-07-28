import React from 'react';
import { Link } from 'react-router-dom';
import { Edit } from 'lucide-react';

const SectionCard = ({ title, description, badgeText, badgeType = "success", icon, editLink, onEdit }) => {
  const badgeStyles = {
    success: "bg-green-100 text-green-700",
    warning: "bg-orange-100 text-orange-700",
    info: "bg-blue-100 text-blue-700",
    default: "bg-gray-100 text-gray-700"
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-[#F8F9FA] rounded-lg text-yellow-600">
          {icon}
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${badgeStyles[badgeType] || badgeStyles.default}`}>
          {badgeText}
        </span>
      </div>
      
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 line-clamp-3 mb-6">
          {description}
        </p>
      </div>

      {onEdit ? (
        <button 
          onClick={onEdit} 
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Edit size={16} />
          Edit
        </button>
      ) : (
        <Link 
          to={editLink} 
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Edit size={16} />
          Edit
        </Link>
      )}
    </div>
  );
};

export default SectionCard;
