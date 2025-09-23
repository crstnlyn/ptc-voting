import React from "react";
import AdminNav from "./AdminNav";
import Dashboard from "./Dashboard";
import SideMenu from "./SideMenu";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="h-screen min-h-screen lg:grid lg:grid-cols-6 grid-rows-8 flex flex-col">
      <div className="row-span-8 shadow-lg ">
        <SideMenu />
      </div>

      {/* Right side (Navbar + Content) */}
      <div className="flex flex-col col-span-5 ">
        <AdminNav></AdminNav>
      </div>

      {/* Main content */}
      <div className="w-full h-full col-span-5 row-span-8 col-start-2 row-start-2 overflow-y-scroll ">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
