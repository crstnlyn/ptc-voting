import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/Firebase";
import {
  ChartColumnBig,
  CircleUserRound,
  House,
  UserLock,
  UserRoundSearch,
  UsersRound,
} from "lucide-react";

const SideMenu = () => {
  const handleSignout = () => {
    signOut(auth);
  };
  return (
    <div className="w-full h-full bg-[#66ad14] text-white p-4 shadow-lg z-1 flex flex-col gap-5">
      <div className="flex">
        <a className="flex items-center w-full gap-2 text-xl lg:text-3xl font-bold text-base-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
          Admin
        </a>
      </div>
      <div className="pt-2 bg-base-200 text-base-content rounded-box">
        <ul className="menu w-auto">
          <li className="menu-title">
            <h2> Menu </h2>
            <ul className=" text-base-content">
              <li>
                <NavLink
                  to="dash"
                  className={({ isActive }) =>
                    ` ${
                      isActive ? "bg-green-100 text-green-700 font-medium" : ""
                    }`
                  }
                >
                  <House className="h-8 w-5" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="candidates"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-green-100 text-green-700 font-medium" : ""
                    }`
                  }
                >
                  <CircleUserRound className="h-8 w-5" />
                  Candidates
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="applicants"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-green-100 text-green-700 font-medium" : ""
                    }`
                  }
                >
                  <UserRoundSearch className="h-8 w-5 " />
                  Applicants
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="partialresult"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-green-100 text-green-700 font-medium" : ""
                    }`
                  }
                >
                  <ChartColumnBig className="h-8 w-5" />
                  Partial Result
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
        <ul className="menu text-base-content w-auto ">
          <li className="menu-title">
            <h2>User Management</h2>

            <ul className="text-base-content">
              <li>
                <NavLink
                  to="voters"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-green-100 text-green-700 font-medium" : ""
                    }`
                  }
                >
                  <UsersRound className="h-8 w-5" />
                  Voters
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="manageadmins"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-green-100 text-green-700 font-medium" : ""
                    }`
                  }
                >
                  <UserLock className="h-8 w-5" />
                  Admins
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="w-full ">
        <button
          className="btn btn-soft btn-error w-full "
          onClick={handleSignout}
        >
          {" "}
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
