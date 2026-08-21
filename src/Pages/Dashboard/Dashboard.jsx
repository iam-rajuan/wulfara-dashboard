import React from "react";
import { useSelector } from "react-redux";
import AdminDashboard from "../admin-pages/admin-dashboard/AdminDashboard";
import SupplierDashboard from "./SupplierDashboard";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role || "supplier";

  if (role === "admin") {
    return <AdminDashboard />;
  }

  return <SupplierDashboard />;
}
