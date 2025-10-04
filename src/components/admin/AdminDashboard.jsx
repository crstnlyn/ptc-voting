import React from "react";
import AdminNav from "./AdminNav";
import Dashboard from "./Dashboard";
import SideMenu from "./SideMenu";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="drawer lg:drawer-open h-auto">
      {/* Drawer Toggle (checkbox) */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col w-full ">
        <div className="sticky top-0  z-50">
          <AdminNav />
        </div>

        {/* Main page content (Outlet) */}
        <div className="flex-1 p-4  ">
          <Outlet />
        </div>
      </div>

      {/* Sidebar Drawer */}
      <div className="drawer-side z-50">
        {/* Drawer overlay (for mobile click outside to close) */}
        <label htmlFor="my-drawer" className="drawer-overlay"></label>

        {/* ✅ Keep your original SideMenu design */}
        <div className="w-72 bg-[#66ad14] text-white h-full shadow-lg">
          <SideMenu />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
