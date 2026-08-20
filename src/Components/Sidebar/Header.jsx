import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdNotifications } from "react-icons/io";
import { Bell, Check } from "lucide-react";
import { io } from "socket.io-client";
import { API_BASE_URL, SOCKET_BASE_URL } from "../../config/urls";

const Header = ({ showDrawer }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role || "supplier";

  const adminProfile = {
    name: "James",
    role: "admin",
  };

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user || !user._id) return;
    
    // Fetch initial notifications
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/notifications`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setNotifications(data.data);
          setUnreadCount(data.data.filter(n => !n.isRead).length);
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    
    fetchNotifications();

    // Socket.io connection
    const socket = io(SOCKET_BASE_URL);
    
    socket.emit("join_room", user._id);
    
    socket.on("new_notification", (newNotification) => {
      setNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/notifications/read-all`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        setUnreadCount(0);
      }
    } catch (err) {
      console.error("Error marking all as read:", err);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  const isMessagesActive = location.pathname === "/messages";

  return (
    <div className="relative mt-2 border-b-2">
      <div className="flex items-center justify-between p-4 ">
        {/* =============================Left Section============================= */}
        <div className="flex items-center gap-3 sm:gap-4">
          <RxHamburgerMenu
            className="text-2xl text-blue-800 cursor-pointer lg:hidden flex-shrink-0"
            onClick={showDrawer}
          />
          <div className="min-w-0">
            <h2 className="font-bold text-[#202326] text-[16px] sm:text-xl md:text-2xl uppercase truncate">
              {role === "admin" ? "ADMIN PORTAL" : "SUPPLIER PORTAL"}
            </h2>
            <p className="text-[11px] sm:text-sm text-gray-500 truncate">Platform Overview</p>
          </div>
        </div>

        {/* =============================Right Section============================= */}
        <div className="flex items-center gap-4">


          {/* =============================Notification Icon============================= */}
          <button
            className="relative p-2 transition hover:bg-blue-50"
            onClick={() => setShowNotifications((prev) => !prev)}
          >
            <IoMdNotifications className="text-xl" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] flex items-center justify-center font-bold h-[14px] min-w-[14px] px-1 rounded-full border border-white">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>

          {/* =============================Profile Icon============================= */}
          <Link to="/settings">
            <div className="p-2 text-blue-700 transition border border-blue-500 rounded-full hover:bg-blue-50">
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=D1A635&color=fff"
                alt="Admin"
                className="object-cover w-6 h-6 rounded-full"
              />
            </div>
          </Link>
        </div>
      </div>

      {/* =============================Notification Dropdown============================= */}
      {showNotifications && (
        <div className="absolute right-4 top-[72px] z-50 p-4 bg-white rounded-md shadow-xl w-72 sm:w-80">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-lg font-semibold text-[#2c3e50]">
              Notifications
            </h2>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="mt-4 space-y-4 max-h-[350px] overflow-y-auto pr-1">
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No notifications yet.</p>
            ) : (
              notifications.map((item) => (
                <div 
                  key={item._id} 
                  className={`flex items-start gap-3 p-2 rounded-lg transition-colors ${!item.isRead ? 'bg-blue-50/50' : ''}`}
                  onClick={() => !item.isRead && markAsRead(item._id)}
                >
                  <div className={`p-2 rounded-full flex-shrink-0 ${!item.isRead ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                    <Bell size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!item.isRead ? 'font-semibold text-gray-900' : 'font-medium text-gray-600'}`}>
                      {item.title}
                    </p>
                    <p className={`text-xs mt-0.5 ${!item.isRead ? 'text-gray-600' : 'text-gray-500'}`}>
                      {item.message}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {!item.isRead && (
                    <div className="flex-shrink-0 mt-1">
                      <span className="w-2 h-2 bg-blue-600 rounded-full block"></span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
