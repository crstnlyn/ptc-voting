import React from "react";
import AdminNav from "./AdminNav";
import Dashboard from "./Dashboard";
import SideMenu from "./SideMenu";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="h-screen min-h-screen flex">
      <div className="w-64 h-full  shadow-lg z-1 ">
        <SideMenu />
      </div>

      {/* Right side (Navbar + Content) */}
      <div className="flex flex-col flex-1">
        <div className="w-full"></div>
        <AdminNav></AdminNav>
        {/* Main content */}
        <div className="flex-1 w-full bg-base-200 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
