import React, { useState } from "react";
import logo from "../assets/ptc.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ navOpen, toggleNav }) => {
  return (
    <div className="fixed  w-full h-20 z-100 border-[#66ad14] border-b-6 lg:px-10 px-5  py-0 bg-[#F5F7F8] shadow-lg">
      <nav className="flex h-full items-center">
        <img
          src={logo}
          alt=""
          className=" w-auto h-15 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <h1 className="lg:text-2xl text-sm font-bold text-[#45474B]">
          PTCian's Choice
        </h1>
      </nav>

      <div
        className={`
      absolute right-5 top-5 lg:hidden block 
        transition-transform duration-300 ease-in-out
        ${navOpen ? "translate-x-0 " : "-translate-x-full"}
      `}
      ></div>
    </div>
  );
};

export default Navbar;
