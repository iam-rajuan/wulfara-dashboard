import React from "react";
import AdminDashboard from "../admin-pages/admin-dashboard/AdminDashboard";
import SupplierDashboard from "./SupplierDashboard";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role || "supplier";

  if (role === "admin") {
    return <AdminDashboard />;
  }

  return <SupplierDashboard />;
}