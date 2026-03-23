import Sidebar from "./admin/Sidebar";
import { Outlet } from "react-router-dom";
import "./admin/admin.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
