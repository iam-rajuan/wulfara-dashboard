import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import brandlogo from "../../assets/image/logo.png";
import {
  LayoutDashboard,
  Building2,
  Package,
  Image as ImageIcon,
  FileText,
  MessageSquare,
  CreditCard,
  LineChart,
  Settings,
  BadgeCheck,
  Users,
  LayoutList,
  Box,
  Tag,
  File,
  Globe,
  User,
  Diamond,
  LogOut
} from "lucide-react";

const Sidebar = ({ closeDrawer }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role || "supplier";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/sign-in");
  };

  // supplier route
  const supplierMenuItems = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", Link: "/" },
    { icon: <Building2 size={18} />, label: "Company Profile", Link: "/profile" },
    { icon: <Package size={18} />, label: "Products & Services", Link: "/products" },
    { icon: <ImageIcon size={18} />, label: "Gallery", Link: "/gallery" },
    { icon: <FileText size={18} />, label: "RFQs", Link: "/rfqs", badge: "12" },
    { icon: <MessageSquare size={18} />, label: "Messages", Link: "/messages" },
    { icon: <CreditCard size={18} />, label: "Subscription", Link: "/subscription" },
    { icon: <Settings size={18} />, label: "Settings", Link: "/settings" },
  ];

  // admin route
  const adminMenuItems = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", Link: "/" },
    { icon: <Users size={18} />, label: "Buyers", Link: "/buyer-management" },
    { icon: <Diamond size={18} />, label: "Suppliers", Link: "/supplier-management" },
    { icon: <LayoutList size={18} />, label: "Listings", Link: "/listings" },
    { icon: <Box size={18} />, label: "Categories", Link: "/categories" },
    { icon: <Tag size={18} />, label: "Subscriptions", Link: "/subscriptions" },
    { icon: <FileText size={18} />, label: "RFQs", Link: "/rfqs" },
    { icon: <File size={18} />, label: "Content", Link: "/content" },
    { icon: <Globe size={18} />, label: "SEO", Link: "/seo" },
    { icon: <LineChart size={18} />, label: "Revenue", Link: "/revenue" },
    { icon: <Settings size={18} />, label: "Settings", Link: "/settings" },
  ];

  const menuItems = role === "admin" ? adminMenuItems : supplierMenuItems;

  return (
    <div className="w-[285px] bg-[#0E1726] flex flex-col h-screen text-[#8892A3]">
      {/* Logo & Header */}
      <div className="px-6 pt-8 pb-8 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          {/* Custom Logo representation */}
          <div className="flex items-center justify-center">
            <img src={brandlogo} alt="Logo" className="w-auto h-8 object-contain" />
          </div>
          <span className="text-[22px] font-extrabold tracking-wider text-white">
            WULFARA
          </span>
        </div>
        {role === "admin" && (
          <div className="text-[10px] font-bold tracking-widest uppercase text-white/90">
            ADMIN PORTAL
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 mt-2">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.Link;

            return (
              <Link
                key={item.label}
                to={item.Link}
                className={`flex items-center justify-between px-4 py-3 rounded-md text-[14px] font-semibold transition-colors ${isActive
                  ? "bg-[#D4AF37] text-[#0E1726] shadow-sm"
                  : "text-[#8892A3] hover:text-white hover:bg-white/5"
                  }`}
              >
                <div className="flex items-center gap-4">
                  {React.cloneElement(item.icon, {
                    className: isActive ? "text-[#0E1726]" : "text-[#8892A3]",
                    strokeWidth: isActive ? 2.5 : 2,
                  })}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-[#DC2626] text-white text-[10px] font-bold px-2 py-[2px] rounded-full leading-none flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Settings */}
      <div className="px-4 pb-6 pt-4 border-t border-[#1C273C] mt-auto">
        {role === "admin" ? (
          <div className="bg-[#0E1726] rounded-xl p-3 flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-[10px] bg-[#D4AF37] text-[#0E1726] font-bold flex items-center justify-center">
              <User size={18} strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-white truncate">
                SIUUUU Ronaldo
              </p>
              <div className="flex items-center gap-1 text-[#D4AF37] text-[11px] mt-0.5">
                <span className="font-medium">Admin</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#152136] rounded-xl p-3 flex items-center gap-3 mb-4 border border-[#1C273C]">
            <div className="w-9 h-9 rounded-[10px] bg-[#D4AF37] text-[#0E1726] font-bold flex items-center justify-center text-[13px]">
              SC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-white truncate">
                Steel Company B
              </p>
              <div className="flex items-center gap-1 text-[#D4AF37] text-[11px] mt-0.5">
                <BadgeCheck size={12} strokeWidth={2.5} />
                <span className="font-medium">Premium Suppl</span>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 hover:bg-[#DC2626]/20 text-[#8892A3] hover:text-[#DC2626] transition-all text-[13px] font-bold"
        >
          <LogOut size={16} strokeWidth={2.5} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
