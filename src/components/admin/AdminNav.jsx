import React from "react";
import logo from "../../assets/ptc.png";
import { auth } from "../config/Firebase";
import { signOut } from "firebase/auth";
import SideMenu from "./SideMenu";

const AdminNav = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm border-b-4 border-[#66ad14] relative z-50 px-4">
      {/* ✅ Drawer toggle (visible only on small screens) */}
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer" className="btn btn-ghost btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-[#66ad14]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
      </div>

      <div className="flex-1 flex items-center justify-center gap-3">
        <img src={logo} alt="PTC Logo" className="h-12 w-auto" />
        <a className="text-lg sm:text-xl lg:text-2xl font-bold text-[#66ad14] whitespace-nowrap">
          PTCian's Choice
        </a>
      </div>
    </div>
  );
};

export default AdminNav;
