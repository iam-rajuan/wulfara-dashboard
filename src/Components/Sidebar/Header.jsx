import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdNotifications } from "react-icons/io";
import { Bell } from "lucide-react";
import { useGetSupplierDashboardQuery } from "../../redux/features/listings/listingsApi";
import {
  useClearAllNotificationsMutation,
  useGetNotificationsQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from "../../redux/features/notifications/notificationsApi";

const Header = ({ showDrawer }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const userId = user?._id;
  const role = user?.role || "supplier";
  const { data: dashboardResponse } = useGetSupplierDashboardQuery(undefined, {
    skip: role !== "supplier",
  });
  const supplierProfile = dashboardResponse?.data?.profile;
  const supplierLogo = supplierProfile?.logo && supplierProfile.logo !== "no-logo.jpg" ? supplierProfile.logo : "";

  const {
    data: notificationsResponse,
    refetch: refetchNotifications,
  } = useGetNotificationsQuery(undefined, {
    skip: !userId,
    pollingInterval: 30000,
    refetchOnFocus: true,
  });
  const [markNotificationReadApi] = useMarkNotificationReadMutation();
  const [markAllNotificationsReadApi] = useMarkAllNotificationsReadMutation();
  const [clearAllNotificationsApi] = useClearAllNotificationsMutation();

  const notifications = notificationsResponse?.data || [];
  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  useEffect(() => {
    if (!showNotifications || !userId) {
      return;
    }

    refetchNotifications();
  }, [refetchNotifications, showNotifications, userId]);

  const markAllAsRead = async () => {
    try {
      await markAllNotificationsReadApi().unwrap();
    } catch (err) {
      console.error("Error marking all as read:", err);
    }
  };

  const clearAllNotifications = async () => {
    try {
      await clearAllNotificationsApi().unwrap();
    } catch (err) {
      console.error("Error clearing notifications:", err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await markNotificationReadApi(id).unwrap();
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

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
              {supplierLogo ? (
                <img
                  src={supplierLogo}
                  alt={supplierProfile?.companyName || user?.name || 'User'}
                  className="object-cover w-6 h-6 rounded-full"
                />
              ) : user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || 'User'}
                  className="object-cover w-6 h-6 rounded-full"
                />
              ) : (
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=D1A635&color=fff`}
                  alt={user?.name || 'User'}
                  className="object-cover w-6 h-6 rounded-full"
                />
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* =============================Notification Dropdown============================= */}
      {showNotifications && (
        <div className="absolute right-4 top-[72px] z-50 p-4 bg-white rounded-md shadow-xl w-72 sm:w-80">
          <div className="flex flex-col border-b pb-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#2c3e50]">
                Notifications
              </h2>
              {notifications.length > 0 && (
                <button 
                  onClick={clearAllNotifications}
                  className="text-xs text-red-600 hover:text-red-800 font-medium cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium text-left mt-1 cursor-pointer"
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
