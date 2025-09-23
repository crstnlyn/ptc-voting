import React from "react";
import logo from "../../assets/ptc.png";
import { auth } from "../config/Firebase";
import { signOut } from "firebase/auth";
import SideMenu from "./SideMenu";

const AdminNav = () => {
  const handleSignout = () => {
    signOut(auth);
  };
  return (
    <div className="navbar h-full bg-base-100 shadow-sm  border-[#66ad14] border-b-6 relative">
      <div className="flex">
        <img
          src={logo}
          alt=""
          className=" w-auto h-15 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl lg:text-2xl font-bold">
          PTCian's Choice
        </a>
      </div>
    </div>
  );
};

export default AdminNav;
