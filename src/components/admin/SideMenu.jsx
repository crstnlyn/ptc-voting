import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/Firebase";

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
            stroke-width="1.5"
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class=" h-8 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="candidate"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-green-100 text-green-700 font-medium" : ""
                    }`
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="h-8 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  Candidate
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="analytics"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-green-100 text-green-700 font-medium" : ""
                    }`
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Analytics
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
        <ul className="menu text-base-content w-auto">
          <li className="menu-title">
            <h2>User Management</h2>

            <ul className="text-base-content">
              <li>
                <a href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="h-8 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  Voters
                </a>
              </li>
              <li>
                <NavLink to="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="h-8 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                    />
                  </svg>
                  Add Admin
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
