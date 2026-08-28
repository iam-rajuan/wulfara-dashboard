import { Link, useParams } from "react-router-dom";
import { Save, RotateCcw } from "lucide-react";

export default function EditPackageHeader({
  activeTab,
  setActiveTab,
  handleSave,
  handleDiscard,
  title,
  saveLabel = "Save Changes",
  discardLabel = "Discard Changes",
}) {
  const { id } = useParams();
  const isCreating = !id;
  const pageTitle = title || (isCreating ? "Create Package" : "Edit Premium Plan");

  return (
    <div className="bg-white border-b border-gray-200/80 pt-6 rounded-lg px-6 pb-4 lg:px-8 mb-8 sticky top-16 z-30 shadow-sm backdrop-blur-md bg-white/95">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center text-[10px] font-extrabold text-gray-400 mb-2 gap-2 tracking-wider uppercase">
            <Link to="/subscriptions" className="hover:text-[#D4AF37] transition-colors">Packages</Link>
            <span className="text-gray-300">&gt;</span>
            <span className="text-[#D4AF37]">{pageTitle}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0E1726] tracking-tight">
            {pageTitle}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleDiscard} 
            className="flex items-center gap-1.5 px-4 py-2 text-[12px] font-bold text-gray-500 hover:text-[#0E1726] hover:bg-gray-50 border border-gray-200 rounded-lg transition-all active:scale-[0.98]"
          >
            <RotateCcw size={14} />
            {discardLabel}
          </button>
          <button 
            onClick={handleSave} 
            className="flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-[#0E1726] to-[#1F2E4A] hover:from-[#1F2E4A] hover:to-[#0E1726] text-[12px] font-bold text-white rounded-lg transition-all shadow-md hover:shadow-lg active:scale-[0.98] border border-[#0E1726]"
          >
            <Save size={14} />
            {saveLabel}
          </button>
        </div>
      </div>

    </div>
  );
}
